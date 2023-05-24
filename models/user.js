const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  alternateNumber: {
    type: Number,
  },

  email: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose?.models?.user || mongoose.model("user", userSchema);
