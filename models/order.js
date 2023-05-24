import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
    },
    userId: {
      type: String,
    },
    customer: {
      type: String,
    },
    address: {
      type: String,
    },
    productname: {
      type: Array,
    },
    cartId: {
      type: Array,
    },
    price: {
      type: Array,
    },
    image: {
      type: Array,
    },
    total: {
      type: Number,
    },
    status: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose?.models?.order || mongoose.model("order", orderSchema);
