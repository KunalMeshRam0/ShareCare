const express = require("express");
const router = express.Router();

const Item = require("../models/Item"); // ✅ ADD THIS
const { createItem, getItems } = require("../controllers/itemController");

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const upload = require("../config/multer");

/* GET ALL DONATIONS */
router.get("/", verifyToken, getItems);

/* CREATE NEW DONATION */
router.post("/", verifyToken, upload.array("images", 5), createItem);

/* GET MY DONATIONS (DONOR) */
router.get("/", verifyToken, allowRoles("donor"), async (req, res) => {
  try {
    const items = await Item.find({ donor: req.user.id });

    res.json(items);

  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

module.exports = router;