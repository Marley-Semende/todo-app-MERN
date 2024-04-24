const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  category: String,
  dueDate: Date,
  createdAt: {
    type: Date,
    default: Date,
  },
  updatedAt: {
    type: Date,
    default: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//model creation
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
