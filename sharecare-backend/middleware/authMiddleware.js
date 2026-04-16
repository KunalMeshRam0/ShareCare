/**
 * ============================================
 * AUTH MIDDLEWARE
 * ============================================
 * Verifies JWT token
 */

const jwt = require("jsonwebtoken");

/* ================= VERIFY TOKEN ================= */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= ROLE CHECK ================= */
const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

/* ✅ EXPORT BOTH PROPERLY */
module.exports = {
  verifyToken,
  allowRoles
};