const Task = require("../models/taskModel");

async function createTask(req, res, next) {
  try {
    const { title, category, dueDate } = req.body;

    // Create a new task document
    const newTask = new Task({
      title,
      category,
      dueDate,
      userId: req.user._id,
    });
    // Save  new task to  DB
    await newTask.save();

    res.json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    next(error);
  }
}

//Get Tasks
async function getAllTasks(req, res, next) {
  try {
    // Find tasks for auth user
    const tasks = await Task.find({ userId: req.user._id });

    res.json({ tasks });
  } catch (error) {
    next(error);
  }
}

//Get task by id
async function getTaskById(req, res, next) {
  const taskId = req.params.id;

  try {
    // Find the task by ID
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  const taskId = req.params.id;
  const { title, category, dueDate } = req.body;

  try {
    // Find the task by ID
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task properties
    if (title) {
      task.title = title;
    }
    if (category) {
      task.category = category;
    }
    if (dueDate) {
      task.dueDate = dueDate;
    }

    // Save the updated task
    await task.save();

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    next(error);
  }
}

//Delete task
async function deleteTask(req, res, next) {
  const taskId = req.params.id;

  try {
    // Find the task by ID
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task
    await task.remove();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
