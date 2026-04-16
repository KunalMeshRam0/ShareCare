const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  itemName: String,

  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  category: String,

  status: {
    type: String,
    enum: ["pending", "approved", "assigned"],
    default: "pending"
  },

  // 🔥 LINK NGO
  assignedNGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  // 🔥 LINK ORIGINAL ITEM
  itemRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Donation", donationSchema);