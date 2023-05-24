const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose?.models?.catagory || mongoose.model("catagory", catSchema);
