const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const model = mongoose.models.Contact || mongoose.model("Contact", schema);

export default model;
