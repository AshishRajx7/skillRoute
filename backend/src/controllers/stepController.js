import Step from "../models/Step.js";
import SkillPath from "../models/SkillPath.js";

// Create a step and attach to skill path
export const addStep = async (req, res, next) => {
  try {
    const { skillPathId, title, description, stepNumber } = req.body;

    if (!skillPathId || !title || !stepNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the step
    const newStep = await Step.create({
      title,
      description,
      stepNumber,
      skillPath: skillPathId
    });

    // Attach to path
    await SkillPath.findByIdAndUpdate(
      skillPathId,
      { $push: { steps: newStep._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Step added",
      step: newStep
    });
  } catch (error) {
    next(error);
  }
};
