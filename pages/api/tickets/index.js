import connectToDB from "@/utils/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/authUser";

export async function POST(req) {
  try {
    await connectToDB();
    const user = await authUser(req);
    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority } = reqBody;

    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user.userId,
    });

    return new Response(
      JSON.stringify({ message: "Ticket saved successfully :))" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in POST /tickets:", err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
