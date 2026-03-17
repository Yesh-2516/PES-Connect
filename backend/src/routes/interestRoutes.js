import express from "express";
import Interest from "../models/Interest.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   POST /api/interests
 * @desc    Add an event to user’s interests
 */
router.post("/", async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event)
      return res.status(404).json({ message: "User or Event not found" });

    const existingInterest = await Interest.findOne({ userId, eventId });
    if (existingInterest)
      return res.status(400).json({ message: "Already in interests" });

    const interest = await Interest.create({ userId, eventId });
    res.status(201).json({
      message: `${event.title} added to interests!`,
      interest,
    });
  } catch (err) {
    console.error("Error adding to interests:", err);
    res.status(500).json({ message: "Failed to add to interests" });
  }
});

/**
 * @route   GET /api/interests/my/:userId
 * @desc    Get all interested events for a user
 */
router.get("/my/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId || userId === "null") {
      // return empty array (frontend expects an array)
      return res.status(200).json([]);
    }

    const interests = await Interest.find({ userId }).populate("eventId");
    res.status(200).json(interests);
  } catch (err) {
    console.error("Error fetching interests:", err);
    res.status(500).json({ message: "Failed to fetch interests" });
  }
});

/**
 * @route   DELETE /api/interests/:id
 * @desc    Remove an event from user’s interests
 */
router.delete("/:id", async (req, res) => {
  try {
    await Interest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Removed from interests" });
  } catch (err) {
    console.error("Error removing from interests:", err);
    res.status(500).json({ message: "Failed to remove from interests" });
  }
});

export default router;
