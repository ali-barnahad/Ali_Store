// pages/api/auth/signin.js
import { useAuth } from "@/context/AuthContext";
import UserModel from "@/models/userModel";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  validatePhone,
  verifyPassword,
} from "@/utils/auth";
import connectToDB from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectToDB();
    const { phoneOrEmail, password } = req.body;

    const isValidEmail = validateEmail(phoneOrEmail);
    const isValidPhone = validatePhone(phoneOrEmail);
    const isValidPassword = validatePassword(password);

    if ((!isValidEmail && !isValidPhone) || !isValidPassword) {
      return res
        .status(419)
        .json({ message: "Email, phone number or password is invalid" });
    }

    const query = isValidEmail
      ? { email: phoneOrEmail }
      : { phone: phoneOrEmail };
    const user = await UserModel.findOne(query);

    if (!user) {
      return res.status(422).json({ message: "User not found" });
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPasswordWithHash) {
      return res
        .status(401)
        .json({ message: "Email, phone number or password is not correct" });
    }

    const userId = user._id.toString();
    const accessToken = generateAccessToken({ userId });
    const refreshToken = generateRefreshToken({ userId });

    await UserModel.findOneAndUpdate(query, { $set: { refreshToken } });

    res.setHeader("Set-Cookie", `token=${accessToken};path=/;httpOnly=true;`);
    res.setHeader(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true;`
    );

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (err) {
    console.error("Error during sign-in:", err.message);
    return res.status(500).json({ message: err.message });
  }
}
