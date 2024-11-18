import connectToDB from "@/utils/db";
import shoppingCartModel from "../../../../models/shoppingCartModel";
import StickerModel from "../../../../models/stickerModel";
import FlooringModel from "../../../../models/flooringModel";
import PersonalItemModel from "../../../../models/personalItemModel";
import KitchenwareModel from "../../../../models/kitchenwareModel";
import { verifyAccessToken } from "@/utils/auth";
import Mobile from "@/models/mobileModel";
import Watch from "@/models/watchModel";

const modelMapping = {
  stickers: StickerModel,
  floorings: FlooringModel,
  personalItems: PersonalItemModel,
  kitchenwares: KitchenwareModel,
  mobiles: Mobile,
  watches: Watch,
};

export default async function handler(req, res) {
  console.log("Add to cart request received");
  if (req.method !== "POST") {
    console.log("Method not allowed");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  console.log("Connecting to database");
  await connectToDB().catch(() => {
    console.log("Failed to connect to the database");
    return res
      .status(500)
      .json({ message: "Failed to connect to the database" });
  });

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    console.log("Unauthorized or Token is invalid");
    return res
      .status(401)
      .json({ message: "Unauthorized or Token is invalid" });
  }

  try {
    const userId = decoded.userId;
    const {
      productId,
      nameCategory,
      img,
      title,
      text,
      price,
      quantity,
      adminId,
    } = req.body;
    const ProductModel = modelMapping[nameCategory];

    if (!ProductModel) {
      console.log("Invalid product type");
      return res.status(400).json({ message: "Invalid product type" });
    }

    const productExists = await ProductModel.findById(productId);
    if (!productExists) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await shoppingCartModel.findOne({
      productId,
      userId,
    });

    if (existingCartItem) {
      console.log("Updating existing cart item");
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res
        .status(200)
        .json({ message: "Quantity updated", item: existingCartItem });
    } else {
      console.log("Creating new cart item");
      const newItem = new shoppingCartModel({
        userId,
        productId,
        quantity,
        nameCategory,
        img,
        title,
        text,
        price,
        adminId,
      });
      await newItem.save();
      return res
        .status(201)
        .json({ message: "Item added to cart", item: newItem });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res
      .status(500)
      .json({ message: error.message || "Error adding item to cart" });
  }
}
