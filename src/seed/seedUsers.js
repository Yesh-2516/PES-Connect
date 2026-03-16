import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


dotenv.config({ path: "./.env" }); // make sure .env loads from root

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found. Check your .env file!");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await User.deleteMany({});

    const users = [
      { name: "Yeshaswinie D", srn: "PES2UG24CS619", password: await bcrypt.hash("12345", 10) },
      { name: "Sri Kruthi", srn: "PES2UG24CS574", password: await bcrypt.hash("abc123", 10) },
      { name: "Uma", srn: "PES2UG24CS573", password: await bcrypt.hash("abc12345", 10) }
    ];

    await User.insertMany(users);
    console.log("🎉 Users seeded successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  });
