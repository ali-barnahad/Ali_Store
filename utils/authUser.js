import { verifyAccessToken } from "@/utils/auth";
import UserModel from "@/models/userModel";
import connectToDB from "@/utils/db";

export const authUser = async (req) => {
  try {
    await connectToDB();
    const { cookies } = req;
    const token = cookies["refresh-token"];
    if (!token) {
      return null;
    }

    const decoded = verifyAccessToken(token);
    const user = await UserModel.findById(decoded.userId).lean();
    if (!user) {
      return null;
    }

    return {
      userId: user._id.toString(),
      email: user.email,
      phone: user.phone,
    };
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
  }
};
