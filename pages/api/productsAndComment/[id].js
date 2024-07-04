// pages/api/products/[id].js

import connectToDB from "@/utils/db";
import { getModel } from "@/models/homeFieldsModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectToDB();
    const { id, productType } = req.query;
    const ProductModel = getModel(productType);

    const product = await ProductModel.findById(id).populate("comments");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}
