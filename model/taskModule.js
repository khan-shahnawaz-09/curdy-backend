const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    status: {
      type: String,
      enum: {
        values: ["pending", "in_progress", "completed"],
        message: ` status is not valid `,
      },
      default: "pending",
    },

    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: " that priority is not valid",
      },
      default: "medium",
    },
    dueDate: { type: Date },
    
  },
  { timestamps: true }
);
const taskModel = mongoose.model("Task", taskSchema);
module.exports = { taskModel };
