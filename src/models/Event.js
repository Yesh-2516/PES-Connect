import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  type: String,     
  category: String,
  image: String,
  link: String,
});

export default mongoose.model("Event", eventSchema);
