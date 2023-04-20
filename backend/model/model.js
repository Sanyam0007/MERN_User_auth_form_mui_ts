const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    // accessToken: {
    //    type: String, default: null },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
