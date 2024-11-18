import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Ensure there's a Product model
  nameCategory: String,
  img: String,
  title: String,
  price: Number,
});

let wishListItem;
try {
  wishListItem = mongoose.model("WishListItem");
} catch (error) {
  wishListItem = mongoose.model("WishListItem", wishListSchema);
}

export default wishListItem;
