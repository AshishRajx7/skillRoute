import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addResource } from "../controllers/resourceController.js";

const router = express.Router();

router.post("/add", authMiddleware, addResource);

export default router;
