// pages/api/auth/signup
import UserModel from "@/models/userModel";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth";
import connectToDB from "@/utils/db";
import { roles } from "@/utils/constants";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectToDB();
    const { name, phone, email, password } = req.body;

    const isUserExist = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (isUserExist) {
      return res.status(422).json({
        message: "The username or email or phone exist already !!",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: roles.USER,
    });

    const userId = user._id.toString();
    const accessToken = generateAccessToken({ userId });
    const refreshToken = generateRefreshToken({ userId });

    // Save the refresh token in the user's record
    user.refreshToken = refreshToken;
    await user.save();

    res.setHeader("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`);
    res.setHeader(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true`
    );

    return res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    console.error("Sign-up error:", error.message);
    return res.status(500).json({ message: error.message });
  }
}
