const express = require("express");
const {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

const router = express.Router();

router.post("/create", isAuthenticated, createTask);

router.get("/mytasks", isAuthenticated, getUserTasks);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

module.exports = router;
