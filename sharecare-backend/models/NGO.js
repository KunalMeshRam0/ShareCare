const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: String,
  location: String,
  registrationNo: String,
  status: {
    type: String,
    default: "pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("NGO", ngoSchema);