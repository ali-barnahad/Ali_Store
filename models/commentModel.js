// models\commentModel.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
  email: { type: String, required: false },
  score: { type: Number, required: true, default: 4 },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  }, // Assuming a Product model exists
  productType: {
    type: String,
    required: true,
    enum: [
      "stickers",
      "floorings",
      "kitchenwares",
      "personalItems",
      "mobiles",
      "watches",
    ],
  },
  isAccept: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
});

const CommentModel =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default CommentModel;
