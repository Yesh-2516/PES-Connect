import express from "express";
import { getClubs, getClubById, applyToClub } from "../controllers/clubController.js";

const router = express.Router();

router.get("/", getClubs);
router.get("/:id", getClubById);
router.post("/:id/apply", applyToClub);

export default router;
