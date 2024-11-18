import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  img: {
    type: String, // You can store the image URL or file path as a string
    required: true, // Depending on your requirements, the image field may not be required
  },
  nameCategory: {
    type: String, // You can store the image URL or file path as a string
    required: true, // Depending on your requirements, the image field may not be required
  },
  branch: {
    type: String, // You can store the image URL or file path as a string
    required: true, // Depending on your requirements, the image field may not be required
  },
});
const productsModel =
  mongoose.models.homelab || mongoose.model("homelab", schema);

export default productsModel;
