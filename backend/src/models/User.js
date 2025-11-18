import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatar: { type: String, default: "" },
  googleId: { type: String, default: null },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdPaths: [{ type: mongoose.Schema.Types.ObjectId, ref: "SkillPath" }],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchase" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
