//Authentication handling
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup-Creates new user with hashed password,returns JWT token
export const signup = async (req, res) => {
  try {
    const { name, srn, password } = req.body;

    const exists = await User.findOne({ srn });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, srn, password: hashedPassword });

    const token = generateToken(user._id); //Creates JWT with user ID

    res.status(201).json({
      token,
      user: { ...user._doc, password: undefined }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login-Authenticates user, returns JWT token
export const login = async (req, res) => {
  try {
    const { srn, password } = req.body;
    const user = await User.findOne({ srn });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({
      token,
      user: { ...user._doc, password: undefined }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
