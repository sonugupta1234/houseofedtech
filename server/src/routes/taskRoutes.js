const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { auth } = require("../middleware/authmiddleware");
const optionalauth = require("../middleware/optionalauth");

const taskRoutes = express.Router();

taskRoutes.post("/", auth, createTask);

taskRoutes.get("/", optionalauth, getTasks);

taskRoutes.get("/:id", auth, getTaskById);

taskRoutes.put("/:id", auth, updateTask);

taskRoutes.delete("/:id", auth, deleteTask);

module.exports = taskRoutes;
