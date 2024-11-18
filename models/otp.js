// path : models\otp.js
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    phone: {
      type: "Number",
      required: true,
      unique: true,
    },

    code: {
      type: "Number",
      required: true,
    },

    expTime: {
      type: Number,
      required: true,
    },
    times: {
      // You
      type: Number,
      default: 0, // 3
    },
  },
  { timestamps: true }
);

let Otp;
try {
  // Attempt to retrieve the existing model (if it has already been defined elsewhere)
  Otp = mongoose.model("Otp");
} catch (error) {
  // If the model hasn't been defined yet, define it now
  Otp = mongoose.model("Otp", schema);
}

export default Otp;
