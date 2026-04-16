const express = require("express");
const router = express.Router();

const Transport = require("../models/Transport");
const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

/**
 * ============================================
 * NGO → VIEW TRANSPORT (TRACK DELIVERY)
 * ============================================
 */
router.get(
  "/ngo",
  verifyToken,
  allowRoles("ngo"),
  async (req, res) => {
    try {

      const data = await Transport.find({ to: req.user.id }) // 🔥 FIX
        .populate("from", "name")
        .populate("item")
        .sort({ createdAt: -1 });

      res.json(data);

    } catch (error) {
      res.status(500).json({
        message: "Error fetching NGO transport data"
      });
    }
  }
);

/**
 * ============================================
 * DONOR → GET MY TRANSPORT
 * ============================================
 */
router.get(
  "/donor",
  verifyToken,
  allowRoles("donor"),
  async (req, res) => {
    try {

      const data = await Transport.find({ from: req.user.id }) // ✅ correct
        .populate("to", "name")
        .populate("item")
        .sort({ createdAt: -1 });

      res.json(data);

    } catch (error) {
      res.status(500).json({
        message: "Error fetching donor transport"
      });
    }
  }
);

/**
 * ============================================
 * DONOR → UPDATE DELIVERY STATUS
 * ============================================
 */
router.put(
  "/:id",
  verifyToken,
  allowRoles("donor"),
  async (req, res) => {
    try {

      const { status } = req.body;

      const transport = await Transport.findById(req.params.id);

      if (!transport) {
        return res.status(404).json({
          message: "Transport not found"
        });
      }

      /* OPTIONAL: SECURITY CHECK */
      if (transport.from.toString() !== req.user.id) {
        return res.status(403).json({
          message: "Not authorized"
        });
      }

      transport.status = status;
      await transport.save();

      res.json(transport);

    } catch (error) {
      res.status(500).json({
        message: "Error updating transport"
      });
    }
  }
);

module.exports = router;