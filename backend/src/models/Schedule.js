// models/Schedule.js
import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventId: { type: String, required: true },
  title: String,
  category: String,
  date: String
}, { timestamps: true });

export default mongoose.model("Schedule", ScheduleSchema);
