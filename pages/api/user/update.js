// pages/api/user/update.js
import connectToDB from "@/utils/db";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDB();

    const { name, surname, address, city, phone } = req.body;
    if (!name || !surname || !address || !city || !phone) {
      return res.status(400).json({
        error: "Missing fields",
        details:
          "Ensure all fields are provided: name, surname, address, city, phone",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { name, surname, address, city, phone },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
