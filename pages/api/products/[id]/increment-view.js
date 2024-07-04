// path : pages/api/products/[id]/increment-view.js
import connectToDB from "@/utils/db";
import StickerModel from "@/models/stickerModel";
import FlooringModel from "@/models/flooringModel";
import PersonalItemModel from "@/models/personalItemModel";
import KitchenwareModel from "@/models/kitchenwareModel";
import Mobile from "@/models/mobileModel";
import Watch from "@/models/watchModel";

const modelMapping = {
  stickers: StickerModel,
  floorings: FlooringModel,
  personalItems: PersonalItemModel,
  kitchenwares: KitchenwareModel,
  mobiles: Mobile,
  watches: Watch,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;
  const { nameCategory } = req.body;

  if (!modelMapping[nameCategory]) {
    return res.status(400).json({ error: "Invalid category name" });
  }

  try {
    await connectToDB();
    const Model = modelMapping[nameCategory];
    await Model.findByIdAndUpdate(id, { $inc: { view: 1 } });
    res.status(200).json({ message: "View incremented successfully" });
  } catch (error) {
    console.error(
      `Error incrementing view count for product with ID ${id}: ${error}`
    );
    res
      .status(500)
      .json({ error: "Error incrementing view count", details: error.message });
  }
}
