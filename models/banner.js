const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },

    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    productid: {
      type: String,
      require: true,
    },
    productname: {
      type: String,
      require: true,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose?.models?.banner || mongoose.model("banner", bannerSchema);
