import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  stepNumber: { type: Number, required: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  skillPath: { type: mongoose.Schema.Types.ObjectId, ref: "SkillPath", required: true }
}, { timestamps: true });

export default mongoose.model("Step", stepSchema);
