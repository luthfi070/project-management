const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { collection: "user" }
);

module.exports = mongoose.model("user", userSchema);
