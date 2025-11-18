import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["youtube", "article", "paper", "github", "prompt", "pdf"], 
    required: true 
  },
  url: { type: String },
  isPremium: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Resource", resourceSchema);
