import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addStep } from "../controllers/stepController.js";

const router = express.Router();

// Add a step (protected)
router.post("/add", authMiddleware, addStep);

export default router;
