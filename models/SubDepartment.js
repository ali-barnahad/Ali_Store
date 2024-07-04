const mongoose = require("mongoose");
require("./Department");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const subDepartmentModel =
  mongoose.models.SubDepartment || mongoose.model("SubDepartment", schema);

export default subDepartmentModel;
