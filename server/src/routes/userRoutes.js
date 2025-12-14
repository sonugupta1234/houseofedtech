const express = require("express");

const { auth } = require("../middleware/authmiddleware");
const { registerUser, loginUser } = require("../Controllers/userController");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

module.exports = userRoutes;
