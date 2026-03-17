import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  name: String,
  type:String,
  category:String,
  description: String,
  image: String,
  link: String,
});

export default mongoose.model("Club", clubSchema);
