import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    deadline: Date,

    status: {
      type: String,
      enum: ["todo", "in_progress", "submitted", "completed"],
      default: "todo",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false },
);

export const TaskModel = mongoose.model("Task", TaskSchema);
