import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/ShareCare-Logo.png";
import "../styles/auth.css";

function Register() {

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    darpanId: "",
    registrationNo: "",
    otp: "",
    adminKey: ""
  });

  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* SEND OTP */
  const sendOTP = async () => {
    try {
      setLoading(true);

      await API.post("/auth/send-otp", {
        email: form.email
      });

      alert("OTP sent");
      setStep(2);

    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* VERIFY OTP */
  const verifyOTP = async () => {
    try {
      setLoading(true);

      await API.post("/auth/verify-otp", {
        email: form.email,
        otp: form.otp
      });

      alert("Email verified");
      setStep(3);

    } catch {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* REGISTER */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("role", form.role);

      /* NGO */
      if (form.role === "ngo") {
        data.append("darpanId", form.darpanId);
        data.append("registrationNo", form.registrationNo);
        if (file) data.append("document", file);
      }

      /* ADMIN */
      if (form.role === "admin") {
        data.append("adminKey", form.adminKey);
      }

      await API.post("/auth/register", data);

      alert("Account created successfully");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="logo-box">
          <img src={logo} alt="ShareCare" />
          <h2>ShareCare</h2>
        </div>

        <h3>Create Account</h3>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <button className="primary-btn" onClick={sendOTP}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
            />
            <button className="primary-btn" onClick={verifyOTP}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>

            {/* ROLE */}
            <div className="role-buttons">
              <button type="button" className={form.role==="donor"?"active":""} onClick={()=>setForm({...form, role:"donor"})}>Donor</button>
              <button type="button" className={form.role==="ngo"?"active":""} onClick={()=>setForm({...form, role:"ngo"})}>NGO</button>
              <button type="button" className={form.role==="admin"?"active":""} onClick={()=>setForm({...form, role:"admin"})}>Admin</button>
            </div>

            <input name="name" placeholder="Full Name" onChange={handleChange} />

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <span onClick={() => setShowPassword(!showPassword)}>👁️</span>
            </div>

            {/* NGO */}
            {form.role === "ngo" && (
              <>
                <input name="darpanId" placeholder="Darpan ID" onChange={handleChange} />
                <input name="registrationNo" placeholder="Registration No" onChange={handleChange} />
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
              </>
            )}

            {/* ADMIN */}
            {form.role === "admin" && (
              <input
                name="adminKey"
                placeholder="Enter Admin Secret Key"
                onChange={handleChange}
              />
            )}

            <button className="primary-btn" type="submit">
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>
        )}

        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;