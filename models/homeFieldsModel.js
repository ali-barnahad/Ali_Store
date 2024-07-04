// models/homeFieldsModel.js
import mongoose from "mongoose";

const homeFields = {
  title: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  additionalPhotos: [{ type: String }],
  nameCategory: { type: String, required: true },
  branch: { type: String, required: true },
  offer: { type: Number, default: 0 },
  adminId: { type: String, required: true },
  view: { type: Number, default: 0 },
  longDescription: { type: String, default: "" },
  score: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  tags: { type: String, default: "sticker" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  stockQuantity: { type: Number, default: 0 },
  dimensions: {
    height: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
  },
  materials: { type: String, default: "" },
  sku: { type: String, default: "" },
  dateAdded: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  discountedPrice: { type: Number, default: 0 },
};

const stickerSchema = new mongoose.Schema({ ...homeFields });
const flooringSchema = new mongoose.Schema({ ...homeFields });
const kitchenwareSchema = new mongoose.Schema({ ...homeFields });
const personalItemSchema = new mongoose.Schema({ ...homeFields });
const mobileSchema = new mongoose.Schema({ ...homeFields });
const watchSchema = new mongoose.Schema({ ...homeFields });
const Sticker =
  mongoose.models.stickerlab || mongoose.model("stickerlab", stickerSchema);
const Flooring =
  mongoose.models.flooringlab || mongoose.model("flooringlab", flooringSchema);
const Kitchenware =
  mongoose.models.kitchenwarelab ||
  mongoose.model("kitchenwarelab", kitchenwareSchema);
const PersonalItem =
  mongoose.models.personalItemlab ||
  mongoose.model("personalItemlab", personalItemSchema);
const Mobile =
  mongoose.models.mobilelab || mongoose.model("mobilelab", mobileSchema);
const Watch =
  mongoose.models.watchlab || mongoose.model("watchlab", watchSchema);

const getModel = (productType) => {
  switch (productType) {
    case "stickers":
      return Sticker;
    case "floorings":
      return Flooring;
    case "kitchenwares":
      return Kitchenware;
    case "personalItems":
      return PersonalItem;
    case "mobiles":
      return Mobile;
    case "watches":
      return Watch;
    default:
      throw new Error(`Unknown product type: ${productType}`);
  }
};

export {
  Sticker,
  Flooring,
  Kitchenware,
  PersonalItem,
  Mobile,
  Watch,
  getModel,
};
