// pages/api/comments/accept/index.js
import connectToDB from "@/utils/db";
import { authUser } from "@/utils/authUser";
import CommentModel from "@/models/commentModel";

export async function PUT(req) {
  try {
    const user = await authUser(req); // Authenticate user and get user info
    if (!user.isAdmin) {
      return new Response(
        JSON.stringify({
          message: "This api is protected and you don't have access!",
        }),
        { status: 403 }
      );
    }

    await connectToDB();
    const body = await req.json();
    const { id } = body;
    // Add additional validation as needed

    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: true,
        },
      }
    );
    return new Response(
      JSON.stringify({ message: "Comment accepted successfully :))" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error accepting comment:", err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
