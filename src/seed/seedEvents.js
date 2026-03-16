import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "../models/Event.js"; // adjust path if needed

dotenv.config();

const events = [
  {
    title: "Sipping Strokes",
    date: "2025-10-08",
    type: "Cultural",
    category:"Explore",
    image: "/images/sippingstrokes.png",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScV-yhGdx0AU906sh6QRneNA8zB4LLdbnnvRB9wD8UECO_Drg/viewform",
  },
  {
    title: "ML Hunt",
    date: "2025-10-11",
    type: "Technical",
    category:"Explore",
    image: "/images/ml_hunt.png",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScn298iR4WFIVQZDabEnY2c2E1QPDZDusGN-LY9xxi6jkPxig/viewform",
  },
  {
    title: "Capture The Flag",
    date: "2025-10-17",
    type: "Hackathon",
    category:"Explore",
    image: "/images/ctf.png",
    link: "https://forms.gle/ixfFQwMZTzWGXGVU8",
  },
  {
    title: "Develop for Her 6.0",
    date: "2025-11-08",
    type: "Hackathon",
    category:"Event",
    image: "/images/Develop_for_her.png",
    link: "https://forms.gle/BGvEr7avTGWoHZDw5",
  },
  {
    title: "The Elon Who Quiz",
    date: "2025-11-12",
    type: "Technical",
    category:"Event",
    image: "/images/Elon_quiz.png",
    link: "https://forms.gle/tJrpzfZT36idXPLw5",
  },
  {
    title: "Into The Cloud",
    date: "2025-11-12",
    type: "Workshop",
    category:"Event",
    image: "/images/Into_the_cloud.png",
    link: "https://forms.gle/MLyfNce7GnqDzHxF7",
  },
  {
    title: "Japanese Language Workshop",
    date: "2025-11-07",
    type: "Workshop",
    category:"Event",
    image: "/images/Japanese.png",
    link: "https://meet.google.com/drc-incw-jqz",
  },
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected!");

    await Event.deleteMany();
    console.log("🧹 Cleared existing events.");

    await Event.insertMany(events);
    console.log("🌱 Events seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding events:", error);
    process.exit(1);
  }
};

seedEvents();
