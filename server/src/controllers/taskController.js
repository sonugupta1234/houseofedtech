const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const filter = req.user?.id ? { userId: req.user.id } : {};
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Task updated Sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const updated = await Task.findById(req.params.id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted Sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
