const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const taskRoutes = require("./src/routes/taskRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const connectDB = require("./src/Config/db.js");
const startCronJobs = require("./src/cron/checkDeadlines.js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

connectDB();
startCronJobs();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
