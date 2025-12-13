const cron = require("node-cron");
const Task = require("../models/taskModel");
const sendMail = require("../utils/sendEmail");

// Runs every hour
const startCronJobs = () => {
  cron.schedule("0 * * * *", async () => {
    // console.log("Running deadline check cron job...");

    try {
      const now = new Date();
      const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      // Find tasks whose deadline is within next 24 hours and email not sent yet
      const tasks = await Task.find({
        deadline: { $gte: now, $lte: next24Hours },
        isDeadlineMailSent: false,
      }).populate("userId");

      for (const task of tasks) {
        const userEmail = task.userId.email;
        const subject = `Task Deadline Approaching: ${task.title}`;
        const text = `Hi ${task.userId.name},\nYour task "${
          task.title
        }" is due on ${task.deadline.toDateString()}.`;
        const html = `<p>Hi <strong>${task.userId.name}</strong>,</p>
                    <p>Your task "<strong>${
                      task.title
                    }</strong>" is due on ${task.deadline.toDateString()}.</p>`;

        await sendMail({ to: userEmail, subject, text, html });

        task.isDeadlineMailSent = true;
        await task.save();
      }

      //   console.log("Deadline check completed.");
    } catch (err) {
      console.error("Cron job error:", err);
    }
  });
};

module.exports = startCronJobs;
