import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resource: { type: mongoose.Schema.Types.ObjectId, ref: "Resource", default: null },
  skillPath: { type: mongoose.Schema.Types.ObjectId, ref: "SkillPath", default: null },
  price: { type: Number, required: true },
  paymentId: { type: String },
  status: { type: String, enum: ["success", "failed"], default: "success" }
}, { timestamps: true });

export default mongoose.model("Purchase", purchaseSchema);
