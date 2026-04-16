const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  category: String,
  quantity: Number,
  condition: String,
  location: String,
  description: String,

  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["available", "requested", "assigned"],
    default: "available"
  }

}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);