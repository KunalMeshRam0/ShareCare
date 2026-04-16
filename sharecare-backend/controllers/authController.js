const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

/* ================= SEND OTP ================= */
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const emailLower = email.toLowerCase();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    let user = await User.findOne({ email: emailLower });

    if (!user) {
      user = new User({ email: emailLower });
    }

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: emailLower,
      subject: "OTP Verification - ShareCare",
      text: `Your OTP is ${otp}`
    });

    console.log("OTP SENT:", otp);

    res.json({ message: "OTP sent" });

  } catch (err) {
    console.log("OTP ERROR:", err);
    res.status(500).json({ message: "OTP failed" });
  }
};

/* ================= VERIFY OTP ================= */
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const emailLower = email.toLowerCase();

    const user = await User.findOne({ email: emailLower });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.emailVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Email verified" });

  } catch (error) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};

/* ================= REGISTER ================= */
const register = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      name,
      email,
      password,
      role,
      adminKey,
      darpanId,
      registrationNo
    } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const emailLower = email.toLowerCase();

    let user = await User.findOne({ email: emailLower });

    const validRoles = ["donor", "ngo", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    /* ================= ADMIN SECURITY ================= */
    if (role === "admin" && adminKey !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    /* ================= EXISTING USER ================= */
    if (user) {

      /* FIX: SET PASSWORD IF NOT EXISTS */
      if (!user.password) {
        user.password = await bcrypt.hash(password, 10);
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      }

      if (!user.roles.includes(role)) {
        user.roles.push(role);
      }

      if (role === "ngo") {

        if (!user.emailVerified) {
          return res.status(400).json({ message: "Verify email first" });
        }

        if (!darpanId || !registrationNo) {
          return res.status(400).json({ message: "NGO details required" });
        }

        user.ngoDetails = {
          darpanId,
          registrationNo,
          document: req.file?.path || "",
          status: "pending"
        };
      }

      await user.save();

      return res.json({ message: "Account updated successfully" });
    }

    /* ================= NEW USER ================= */
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email: emailLower,
      password: hashedPassword,
      roles: [role],
      emailVerified: true
    });

    if (role === "ngo") {
      if (!darpanId || !registrationNo) {
        return res.status(400).json({ message: "NGO details required" });
      }

      user.ngoDetails = {
        darpanId,
        registrationNo,
        document: req.file?.path || "",
        status: "pending"
      };
    }

    await user.save();

    res.status(201).json({
      message: "Account created successfully"
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({
      message: error.message || "Server error"
    });
  }
};

/* ================= LOGIN ================= */
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const emailLower = email.toLowerCase();

    const user = await User.findOne({ email: emailLower });

    console.log("LOGIN USER:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.roles.includes(role)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Set password first" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ message: "Verify email first" });
    }

    if (role === "ngo" && user.ngoDetails?.status !== "approved") {
      return res.status(403).json({ message: "NGO not approved yet" });
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= EXPORT ================= */
module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP
};