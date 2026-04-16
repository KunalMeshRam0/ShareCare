const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    roles: {
      type: [String],
      enum: ["donor", "ngo", "admin"],
      default: []
    },

    /* 🔥 NGO DETAILS */
    ngoDetails: {
      darpanId: String,
      registrationNo: String,
      document: String,
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      }
    },

    /* 🔐 EMAIL VERIFICATION */
    emailVerified: {
      type: Boolean,
      default: false
    },

    otp: String,
    otpExpiry: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);