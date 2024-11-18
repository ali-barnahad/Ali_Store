// models/kitchenwareModel.js
import mongoose from "mongoose";

const kitchenwareSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  additionalPhotos: [{ type: String }], // Array of additional image URLs
  nameCategory: { type: String, required: true },
  branch: { type: String, required: true },
  offer: { type: Number, default: 0 },
  adminId: { type: String, required: true },
  view: { type: Number, default: 0 },
  longDescription: { type: String, default: "" },
  score: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 }, // Number of ratings
  tags: { type: String, default: "sticker" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  stockQuantity: { type: Number, default: 0 }, // Stock quantity
  dimensions: {
    height: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
  },
  materials: { type: String, default: "" }, // Materials used
  sku: { type: String, default: "" }, // Stock Keeping Unit
  dateAdded: { type: Date, default: Date.now }, // Date when added
  lastUpdated: { type: Date, default: Date.now }, // Date of last update
  discountedPrice: { type: Number, default: 0 }, // Discounted price
});

const Kitchenware =
  mongoose.models.kitchenwarelab ||
  mongoose.model("kitchenwarelab", kitchenwareSchema);
export default Kitchenware;
