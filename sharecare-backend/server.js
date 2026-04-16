require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const requestRoutes = require("./routes/requestRoutes");
const protectedRoutes = require("./routes/protectedRoutes"); 
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const transportRoutes = require("./routes/transportRoutes");

const app = express();

/* ================= MIDDLEWARES ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/items", itemRoutes);
/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transport", transportRoutes);

// 🔐 PROTECTED ROUTES (IMPORTANT)
app.use("/api", protectedRoutes); 

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ================= SERVER ================= */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});