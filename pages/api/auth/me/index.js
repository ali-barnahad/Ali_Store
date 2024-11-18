import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/userModel";
import connectToDB from "@/utils/db";
import { parseCookies } from "nookies";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await connectToDB();

  const cookies = parseCookies({ req });
  const token = cookies["refresh-token"]; // Replace with your actual cookie name
  let user = null;

  if (token) {
    try {
      const tokenPayload = verifyAccessToken(token);
      if (tokenPayload) {
        user = await UserModel.findOne(
          { email: tokenPayload.email },
          "-password -refreshToken -__v"
        );
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(401).json({ data: null, message: "No access !!" });
  }
}
