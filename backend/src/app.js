import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";
import clubRoutes from "./routes/clubRoutes.js"; 
import scheduleRoutes from "./routes/scheduleRoutes.js";  

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/schedule", scheduleRoutes);

// Default route
app.get("/", (req, res) => res.send("PES Connect backend running 🚀"));

export default app;
