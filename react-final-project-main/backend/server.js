import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

dotenv.config();

const app = express();

/* ========== MIDDLEWARE ========== */
app.use(cors());
app.use(express.json());

/* ========== ROUTES ========== */
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

app.get("/", (req, res) => {
    res.send("API is working");
});

/* ========== DATABASE CONNECTION ========== */
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("🟢 MongoDB Connected"))
    .catch((err) => console.log("❌ DB Error:", err));

/* ========== SERVER START ========== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));