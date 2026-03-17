// routes/scheduleRoutes.js
import express from "express";
import Schedule from "../models/Schedule.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { userId, event } = req.body;
    if (!userId || !event || !event._id) {
      return res.status(400).json({ error: "userId and event._id required" });
    }

    const exists = await Schedule.findOne({ userId, eventId: event._id });
    if (exists) return res.status(200).json({ message: "Already added", schedule: exists });

    const newSchedule = await Schedule.create({
      userId,
      eventId: event._id,
      title: event.title,
      category: event.category,
      date: event.date
    });

    return res.status(201).json({ success: true, schedule: newSchedule });
  } catch (err) {
    console.error("schedule/add error:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.params.userId }).sort({ date: 1 });
    return res.json(schedules);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
