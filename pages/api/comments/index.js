import connectToDB from "@/utils/db";
import {
  Sticker,
  Flooring,
  Kitchenware,
  PersonalItem,
  Mobile,
  Watch,
} from "@/models/homeFieldsModel";
import CommentModel from "@/models/commentModel";
import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/userModel";

// Helper function to get the correct model
const getModel = (type) => {
  const types = {
    stickers: Sticker,
    floorings: Flooring,
    kitchenwares: Kitchenware,
    personalItems: PersonalItem,
    mobiles: Mobile,
    watches: Watch,
  };
  return types[type] || null;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "No token provided, authorization denied" });
  }

  let user;
  try {
    const decoded = verifyAccessToken(token);

    user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token, authorization failed",
      error: error.message,
    });
  }

  const { body, score, productID, productType } = req.body;
  if (
    !body ||
    !score ||
    !productID ||
    !productType ||
    !user ||
    !user.name ||
    !user.phone ||
    !user._id
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const ProductModel = getModel(productType);
  if (!ProductModel) {
    return res.status(400).json({ message: "Invalid product type" });
  }

  try {
    await connectToDB();

    const comment = await CommentModel.create({
      name: user.name,
      phone: user.phone,
      body,
      score,
      productID,
      productType,
      user: user._id,
    });

    const product = await ProductModel.findByIdAndUpdate(
      productID,
      { $push: { comments: comment._id } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(201)
      .json({ message: "Comment successfully added", product });
  } catch (err) {
    console.error("Error in request:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      details: err.stack,
    });
  }
}
