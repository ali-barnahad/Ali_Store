import connectToDB from "@/utils/db";
import TicketModel from "@/models/Ticket";
import { authUser } from "@/utils/authUser";

export async function POST(req) {
  try {
    await connectToDB();
    const user = await authUser(req);
    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority, ticketID } =
      reqBody;

    await TicketModel.findOneAndUpdate(
      { _id: ticketID },
      {
        $set: {
          hasAnswer: true,
        },
      }
    );

    await TicketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user.userId,
      hasAnswer: false,
      isAnswer: true,
      mainTicket: ticketID,
    });

    return new Response(
      JSON.stringify({ message: "Answer saved successfully :))" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in POST /tickets/answer:", err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
