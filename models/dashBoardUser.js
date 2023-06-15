const mongoose = require("mongoose");

const dashboardUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose?.models?.dashboardUser ||
  mongoose.model("dashboardUser", dashboardUserSchema);
