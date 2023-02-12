const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: String,
    description: String,
    due_date: Date,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { collection: "project" }
);

module.exports = mongoose.model("project", projectSchema);
