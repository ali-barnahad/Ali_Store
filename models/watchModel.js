// models/watchModel.js
import mongoose from "mongoose";

const watchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  additionalPhotos: [{ type: String }],
  nameCategory: { type: String, required: true },
  branch: { type: String, required: true },
  offer: { type: Number, default: 0 },
  adminId: { type: String, required: true },
  view: { type: Number, default: 0 },
  longDescription: { type: String, default: "" },
  score: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  tags: { type: String, default: "watch" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  stockQuantity: { type: Number, default: 0 },
  dimensions: {
    height: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
  },
  materials: { type: String, default: "" },
  sku: { type: String, default: "" },
  dateAdded: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  discountedPrice: { type: Number, default: 0 },
});

const Watch =
  mongoose.models.watchlab || mongoose.model("watchlab", watchSchema);
export default Watch;
