import SkillPath from "../models/SkillPath.js";
import Step from "../models/Step.js";

/**
 * Create new skill path
 */
export const createSkillPath = async (req, res, next) => {
  try {
    const { title, description, difficulty, tags } = req.body;

    if (!title || !description || !difficulty) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPath = await SkillPath.create({
      title,
      description,
      difficulty,
      tags,
      creator: req.user._id
    });

    res.status(201).json({
      message: "Skill path created",
      path: newPath
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get skill path with steps + resources (populated)
 * Also increments views count
 */
export const getSkillPath = async (req, res, next) => {
  try {
    const path = await SkillPath.findById(req.params.id)
      .populate({
        path: "steps",
        populate: { path: "resources", model: "Resource" },
        options: { sort: { stepNumber: 1 } }
      })
      .populate("creator", "username avatar");

    if (!path) {
      return res.status(404).json({ message: "Skill path not found" });
    }

    // increment views non-blocking
    SkillPath.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }).catch(() => {});

    res.status(200).json(path);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all skill paths (basic list)
 */
export const getAllSkillPaths = async (req, res, next) => {
  try {
    const paths = await SkillPath.find()
      .select("title description difficulty tags coverImage likes views price isPublished createdAt")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(paths);
  } catch (error) {
    next(error);
  }
};

/**
 * Search skill paths
 * Query params:
 * q, tags, difficulty, page, limit
 */
export const searchSkillPaths = async (req, res, next) => {
  try {
    const { q = "", tags = "", difficulty, page = 1, limit = 10 } = req.query;

    const filters = {};

    if (q) {
      filters.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];
    }

    if (tags) {
      const tagArr = tags.split(",").map(t => t.trim()).filter(Boolean);
      if (tagArr.length) filters.tags = { $in: tagArr };
    }

    if (difficulty) filters.difficulty = difficulty;

    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      SkillPath.find(filters)
        .select("title description difficulty tags coverImage likes views price")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      SkillPath.countDocuments(filters)
    ]);

    res.status(200).json({
      items,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Discover a random skill path
 */
export const getRandomSkillPath = async (req, res, next) => {
  try {
    const count = await SkillPath.countDocuments();
    if (count === 0)
      return res.status(200).json({ message: "No skill paths available" });

    const rand = Math.floor(Math.random() * count);
    let item = await SkillPath.findOne()
      .skip(rand)
      .select("title description difficulty tags coverImage");

    // Fallback if null
    if (!item) {
      item = await SkillPath.findOne().select(
        "title description difficulty tags coverImage"
      );
    }

    return res.status(200).json(item);
  } catch (error) {
    console.log("Random skill error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


/**
 * Like a skill path
 */
export const likeSkillPath = async (req, res, next) => {
  try {
    const pathId = req.params.id;
    const path = await SkillPath.findByIdAndUpdate(
      pathId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!path) {
      return res.status(404).json({ message: "Skill path not found" });
    }

    res.status(200).json({ message: "Liked", likes: path.likes });
  } catch (error) {
    next(error);
  }
};
