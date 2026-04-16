const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
  register,
  login,
  sendOTP,
  verifyOTP
} = require("../controllers/authController");

/* ROUTES */
router.post("/register", upload.single("document"), register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;