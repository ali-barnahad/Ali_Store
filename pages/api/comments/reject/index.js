// pages/api/comments/reject/index.js
import CommentModel from "@/models/commentModel";
import connectToDB from "@/utils/db";

export async function PUT(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation (You)

    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: false,
        },
      }
    );
    return Response.json({ message: "Comment accepted successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
