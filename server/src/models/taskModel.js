const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    // },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    progress: {
      type: Number,
    },
    isDeadlineMailSent: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
