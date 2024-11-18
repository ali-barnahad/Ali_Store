// models\productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  img: {
    type: String, // You can store the image URL or file path as a string
    required: true,
  },
  nameCategory: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  offer: {
    type: String,
    required: false,
  },
  adminId: {
    type: String,
    required: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  longDescription: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  category: {
    type: String,
    enum: ["flooring", "kitchenware", "sticker", "personalItem"],
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
