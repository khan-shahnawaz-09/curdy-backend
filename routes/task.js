const express = require("express");
const {
  addTask,
  showTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");
const taskRoute = express.Router();

taskRoute.get("/task", showTask);
taskRoute.post("/add", addTask);
taskRoute.delete("/remove/:id", deleteTask);
taskRoute.put("/update/:id", updateTask);

module.exports = { taskRoute };
