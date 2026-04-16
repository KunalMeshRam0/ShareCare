const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

/* ================= GET ALL NGO REQUESTS ================= */
router.get("/ngos", async (req, res) => {
    try {
      const ngos = await User.find({
        roles: { $in: ["ngo"] },
        "ngoDetails.status": { $exists: true }
      });
      
      console.log("NGOS:", ngos);

      res.json(ngos);
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching NGOs" });
    }
  });

/* ================= APPROVE / REJECT ================= */
router.put(
  "/ngo/:id",
  verifyToken,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { status } = req.body;

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "NGO not found" });
      }

      user.ngoDetails.status = status;
      await user.save();

      res.json({ message: "NGO updated" });

    } catch (error) {
      res.status(500).json({ message: "Error updating NGO" });
    }
  }
);

module.exports = router;