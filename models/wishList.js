const mongoose = require("mongoose");

const wishListSchema = mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  userId: {
    type: String,
  },
  productId: {
    type: String,
  },
});

module.exports =
  mongoose?.models?.wishlist || mongoose.model("wishlist", wishListSchema);
