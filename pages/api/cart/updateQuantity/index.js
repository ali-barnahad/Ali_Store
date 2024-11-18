// pages/api/cart/updateQuantity.js
import connectToDB from "@/utils/db";
import shoppingCartModel from "@/models/shoppingCartModel";
import { verifyAccessToken } from "@/utils/auth";

export default async function handler(req, res) {
  console.log("Received request to update quantity in cart");

  if (req.method !== "PUT") {
    console.log("Method not allowed");
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  await connectToDB();
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

  // Extract additional userId if your logic requires it
  const { productId, quantity } = req.body;
  const userId = decoded.userId;
  console.log(
    `Received request to update quantity of ${productId} to ${quantity} for user ${userId}`
  );

  try {
    // Ensure your query correctly identifies the item to update
    const updatedItem = await shoppingCartModel.findOneAndUpdate(
      { _id: productId, userId }, // Example query by _id and userId for security
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedItem) {
      console.log("Item not found");
      return res.status(404).json({ error: "Item not found" });
    }

    console.log("Successfully updated item in cart");
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log("Error updating item in cart", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
