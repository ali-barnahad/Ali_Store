import connectToDB from "@/utils/db";
import StickersModel from "@/models/stickerModel";
import Flooring from "@/models/flooringModel";
import PersonalItem from "@/models/personalItemModel";
import Kitchenware from "@/models/kitchenwareModel";
import Mobile from "@/models/mobileModel";
import Watch from "@/models/watchModel";

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    await connectToDB();

    const searchRegex = new RegExp(query, "i");

    const [stickers, floorings, personalItems, kitchenwares, mobiles, watches] =
      await Promise.all([
        StickersModel.find({ title: searchRegex }),
        Flooring.find({ title: searchRegex }),
        PersonalItem.find({ title: searchRegex }),
        Kitchenware.find({ title: searchRegex }),
        Mobile.find({ title: searchRegex }),
        Watch.find({ title: searchRegex }),
      ]);

    const results = {
      stickers,
      floorings,
      personalItems,
      kitchenwares,
      mobiles,
      watches,
    };

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
