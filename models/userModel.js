// models\userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: false },
    name: { type: String, required: false, default: "user" },
    surname: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    address: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
  },
  { timestamps: true }
);

let UserModel;
try {
  UserModel = mongoose.model("User");
} catch (error) {
  UserModel = mongoose.model("User", userSchema);
}

export default UserModel;
