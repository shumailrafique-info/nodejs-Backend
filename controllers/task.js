const { ErrorHandler } = require("../middlewares/error.js");
const { Task } = require("../models/task.js");

//Create User
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return next(new ErrorHandler("Required fields missing", 400));

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

//get logged in user tasks
const getUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

//Deleete user tasks
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const idArray = id.split("");

    if (idArray.length < 24 || idArray.length > 24) {
      return next(new ErrorHandler("Invalid Id", 404));
    }

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    task.deleteOne();

    res.status(201).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};

//Update user tasks
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const idArray = id.split("");

    if (idArray.length < 24 || idArray.length > 24) {
      return next(new ErrorHandler("Invalid Id", 404));
    }

    const task = await Task.findOne({ _id: id });

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getUserTasks, deleteTask, updateTask };
