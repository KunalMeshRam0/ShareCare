const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    itemName: String,

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    from: String,
    to: String,

    status: {
      type: String,
      enum: ["pending", "in_transit", "delivered"],
      default: "pending"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Transport", transportSchema);