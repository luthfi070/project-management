const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: String,
    description: String,
    due_date: Date,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  },
  { collection: "task" }
);

module.exports = mongoose.model("task", taskSchema);
