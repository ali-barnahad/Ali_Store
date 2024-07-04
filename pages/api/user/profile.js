// pages/api/user/profile.js
import connectToDB from "@/utils/db";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).end("Unauthorized");
  }

  const token = authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).end("Unauthorized - Token missing");
  }

  await connectToDB();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).end("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal Server Error");
  }
}
