// pages/api/cart/count.js
import connectToDB from "@/utils/db";
import shoppingCartModel from "@/models/shoppingCartModel";

export default async (req, res) => {
  await connectToDB();

  const { userId } = req.query;

  try {
    const cartItems = await shoppingCartModel.find({ userId });
    const count = cartItems.length;
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart count" });
  }
};
