import connectToDB from "@/utils/db";
import WishListModel from "@/models/wishListModel";
import { verifyAccessToken } from "@/utils/auth"; // Make sure this path is correct

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end("Method Not Allowed");
  }

  await connectToDB();

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  // Assuming  is an asynchronous function. Adjust if it's not.
  let decoded;
  try {
    decoded = verifyAccessToken(token); // Adjust this line if  is not async
  } catch (error) {
    console.log("Unauthorized or Token is invalid", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized or Token is invalid" });
  }

  const userId = decoded.userId;
  const { productId } = req.query; // Extract productId from the URL

  try {
    // Adjust your query if necessary. Ensure it matches your schema.
    const deletedItem = await WishListModel.findOneAndDelete({
      _id: productId, // Ensure this matches your MongoDB document structure
      userId,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
