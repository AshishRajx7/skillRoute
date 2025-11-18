import mongoose from "mongoose";

const skillPathSchema = new mongoose.Schema({
  
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
  tags: [{ type: String }],
  steps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Step" }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  coverImage: { type: String, default: "" },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  price: { type: Number, default: 0 },  
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("SkillPath", skillPathSchema);
