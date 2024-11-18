import connectToDB from "@/utils/db";
import UserModel from "@/models/userModel";
import { authUser } from "@/utils/authUser";

export default async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    const body = await req.json();
    const { name, email, phone } = body;

    // Validation (You)

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation (You)

    await UserModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "User removed successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
