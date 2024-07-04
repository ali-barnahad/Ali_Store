// pages/api/upload/index.js
import connectToDB from "@/utils/db";
import {
  Sticker,
  Flooring,
  Kitchenware,
  PersonalItem,
  Mobile,
  Watch,
} from "../../../models/homeFieldsModel"; // Adjust path as needed
import upload from "@/utils/upload";

const modelMapping = {
  stickers: Sticker,
  floorings: Flooring,
  personalItems: PersonalItem,
  kitchenwares: Kitchenware,
  mobiles: Mobile,
  watches: Watch,
};

connectToDB();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    upload.single("img")(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ error: "Upload failed" });
      }

      try {
        // Extract file path from req.file
        const filePath = req.file ? `/uploads/${req.file.filename}` : null;

        // Extract form data from req.body
        const {
          title,
          text,
          price,
          nameCategory,
          branch,
          offer,
          adminId,
          dimensionsHeight,
          dimensionsWidth,
          materials,
          sku,
          stockQuantity,
        } = req.body;

        // Validate required fields
        if (!title || !text || !price || !nameCategory || !branch || !adminId) {
          console.error("Missing required fields:", {
            title,
            text,
            price,
            nameCategory,
            branch,
            adminId,
          });
          return res
            .status(400)
            .json({ error: "All required fields must be provided" });
        }

        // Use the model based on the provided category
        const Model = modelMapping[nameCategory];
        if (!Model) {
          return res.status(400).json({ error: "Invalid category" });
        }

        const newProduct = new Model({
          title,
          text,
          price,
          nameCategory,
          branch,
          offer,
          adminId,
          img: filePath,
          dimensions: {
            height: dimensionsHeight,
            width: dimensionsWidth,
          },
          materials,
          sku,
          stockQuantity,
        });

        await newProduct.save();

        return res.status(201).json({ success: true, product: newProduct });
      } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
          success: false,
          message:
            "An error occurred while creating the product. Please try again.",
        });
      }
    });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
