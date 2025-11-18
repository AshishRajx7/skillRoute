import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createSkillPath,
  getSkillPath,
  getAllSkillPaths,
  searchSkillPaths,
  getRandomSkillPath,
  likeSkillPath
} from "../controllers/skillPathController.js";

const router = express.Router();

router.post("/create", authMiddleware, createSkillPath);
router.get("/:id", getSkillPath);
router.get("/", getAllSkillPaths);

// new endpoints
router.get("/search/all", searchSkillPaths);    // /api/paths/search/all?q=...
router.get("/random", getRandomSkillPath);
router.post("/:id/like", authMiddleware, likeSkillPath);

export default router;
