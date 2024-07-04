import connectToDB from "@/utils/db";
import { parseCookies, setCookie } from "nookies";
import UserModel from "@/models/userModel";
import { verify } from "jsonwebtoken";
import { generateAccessToken } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await connectToDB();

    const cookies = parseCookies({ req });
    const refreshToken = cookies["refresh-token"];

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided!" });
    }

    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token!" });
    }

    verify(refreshToken, process.env.RefreshTokenSecretKey);

    const newAccessToken = generateAccessToken({ email: user.email });

    setCookie({ res }, "token", newAccessToken, {
      httpOnly: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "New access token generated successfully :))" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
