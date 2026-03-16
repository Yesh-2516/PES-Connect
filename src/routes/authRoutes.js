/*Handles user authentication
POST /login - User login with SRN & password
Returns JWT token valid for 1 hour
Uses bcrypt for password comparison*/
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { srn, password } = req.body;

    const user = await User.findOne({ srn });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    // Use JWT_SECRET from .env
    const token = jwt.sign(
      { id: user._id, srn: user.srn },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
