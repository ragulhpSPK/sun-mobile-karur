const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  number: {
    type: Number,
  },
  alternatenumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  workinghours: {
    type: String,
  },
  image: {
    type: String,
  },
  primary: {
    type: String,
  },
  secondary: {
    type: String,
  },
  fblink: {
    type: String,
  },
  wplink: {
    type: String,
  },
  twlink: {
    type: String,
  },
  inlink: {
    type: String,
  },
  coverphto: {
    type: String,
  },
});

module.exports =
  mongoose?.models?.dasProfile || mongoose.model("dasProfile", profileSchema);
