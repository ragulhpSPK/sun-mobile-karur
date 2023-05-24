const mongoose = require("mongoose");

const subCatSchema = new mongoose.Schema(
  {
    subcategoryname: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    categoryname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose?.models?.subCategory || mongoose.model("subCategory", subCatSchema);
