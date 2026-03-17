import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*JWT protection middleware

Verifies tokens on protected routes

Adds user data to req.user for controllers

Blocks unauthorized access with 401 errors*/

export const protect = async (req, res, next) => {
  let token = null;

  // Check token format
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token found → STOP here
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user without password
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
