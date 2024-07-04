// path : models\shoppingCartModel.js
import mongoose from "mongoose";

const shoppingCartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Correct reference to the User model
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  nameCategory: String,
  img: String,
  title: String,
  text: String,
  price: Number, // Consider using Number if price is numeric
});

let ShoppingCartItem;
try {
  ShoppingCartItem = mongoose.model("ShoppingCartItem");
} catch (error) {
  ShoppingCartItem = mongoose.model("ShoppingCartItem", shoppingCartItemSchema);
}

export default ShoppingCartItem;
