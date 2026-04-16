/**
 * ============================================
 * PROTECTED ROUTES
 * ============================================
 * These routes require:
 * 1. Valid JWT token
 * 2. Proper role authorization
 */

const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");


/**
 * ============================================
 * ADMIN ROUTE
 * Only accessible by admin users
 * ============================================
 */
router.get(
  "/admin-dashboard",
  verifyToken,
  allowRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome to Admin Dashboard",
      user: req.user
    });
  }
);


/**
 * ============================================
 * DONOR ROUTE
 * ============================================
 */
router.get(
  "/donor-dashboard",
  verifyToken,
  allowRoles("donor"),
  (req, res) => {
    res.json({
      message: "Welcome to Donor Dashboard",
      user: req.user
    });
  }
);


/**
 * ============================================
 * NGO ROUTE
 * ============================================
 */
router.get(
  "/ngo-dashboard",
  verifyToken,
  allowRoles("ngo"),
  (req, res) => {
    res.json({
      message: "Welcome to NGO Dashboard",
      user: req.user
    });
  }
);


/**
 * ============================================
 * MULTI-ROLE ROUTE (COMMON)
 * ============================================
 */
router.get(
  "/common-dashboard",
  verifyToken,
  allowRoles("donor", "ngo", "admin"),
  (req, res) => {
    res.json({
      message: "Welcome to Common Dashboard",
      user: req.user
    });
  }
);

module.exports = router;