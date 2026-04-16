// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

/* ================= DONOR ================= */
router.get(
  "/donor-dashboard",
  verifyToken,
  allowRoles("donor"),
  (req, res) => {
    res.json({
      message: "Welcome Donor",
      user: req.user
    });
  }
);

/* ================= NGO ================= */
router.get(
  "/ngo-dashboard",
  verifyToken,
  allowRoles("ngo"),
  (req, res) => {
    res.json({
      message: "Welcome NGO",
      user: req.user
    });
  }
);

/* ================= ADMIN ================= */
router.get(
  "/admin-dashboard",
  verifyToken,
  allowRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user
    });
  }
);

module.exports = router;