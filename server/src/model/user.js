const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    otp: {
      type: String,
      default: "null",
    },
  },
  { timestamps: true }
);

const USER = mongoose.model("user", userSchema);

module.exports = USER;
