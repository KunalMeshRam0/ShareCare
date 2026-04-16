const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    message: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Request || mongoose.model("Request", requestSchema);