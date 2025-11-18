import Resource from "../models/Resource.js";
import Step from "../models/Step.js";

// Add resource to a step
export const addResource = async (req, res, next) => {
  try {
    const { stepId, title, type, url, isPremium, price } = req.body;

    if (!stepId || !title || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResource = await Resource.create({
      title,
      type,
      url,
      isPremium,
      price,
      createdBy: req.user._id
    });

    // Attach to step
    await Step.findByIdAndUpdate(
      stepId,
      { $push: { resources: newResource._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Resource added",
      resource: newResource
    });

  } catch (error) {
    next(error);
  }
};
