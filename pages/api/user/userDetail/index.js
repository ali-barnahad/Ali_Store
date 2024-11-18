// pages/api/cart/count.js
import UserModel from "@/models/userModel";
import connectToDB from "@/utils/db";

export default async (req, res) => {
  await connectToDB();

  const { userId } = req.query;
  try {
    const user = await UserModel.findById(userId).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart count" });
  }
};
