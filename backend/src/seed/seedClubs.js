import mongoose from "mongoose";
import dotenv from "dotenv";
import Club from "../models/Club.js";

dotenv.config();

const clubs = [
  {
    name: "Parallax",
    type: "Technical",
    category: "Explore",
    description: "Game Development & AR/VR Club",
    image: "/images/Parallax.png",
    link: "https://forms.gle/pjjqhUujQeaMy4tZ7",
  },
  {
    name: "Terpsichore",
    type: "Cultural",
    category: "Explore",
    description: "Desi Dance Club - Dance. Express. Inspire.",
    image: "/images/Terpsichore.png",
    link: "https://forms.gle/L1ifsERfoH4hnAYo7",
  },
  {
    name: "Equinox",
    type: "Technical",
    category: "Club",
    description: "Astronomy Club",
    image: "/images/Equinox.png",
    link: "https://forms.gle/7zUxGubpjE1bdDMN9",
  },
  {
    name: "Neural Hive",
    type: "Technical",
    category: "Club",
    description: "AI & ML Club - Collaborate. Innovate.",
    image: "/images/neuralhive.png",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScn298iR4WFIVQZDabEnY2c2E1QPDZDusGN-LY9xxi6jkPxig/viewform",
  },
  {
    name: "Vegavath",
    type: "Technical",
    category: "Club",
    description: "Motorsports and Robotics Club",
    image: "/images/Vegavath.png",
    link: "https://forms.gle/NxsYn9sAY4voF4XZ9",
  },
  {
    name: "Mango Bites",
    type: "Cultural",
    category: "Explore",
    description: "Drama Society",
    image: "/images/Mangobites.png",
    link: "https://forms.gle/DeWHVyCV3mt7dvyw9",
  }
];

const seedClubs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected!");

    await Club.deleteMany();
    console.log("🧹 Old clubs removed.");

    await Club.insertMany(clubs);
    console.log("🌱 Clubs seeded!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding clubs:", error);
    process.exit(1);
  }
};

seedClubs();
