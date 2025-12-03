import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ msg: "All fields required" });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "User exists" });

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hash });
        await newUser.save();

        res.json({ msg: "User registered!" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Wrong password" });

        res.json({ msg: "Login success", user });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

export default router;