import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedSolverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["open", "assigned", "in_progress", "completed"],
      default: "open",
    },

    budget: Number,

    deadline: Date,
  },
  { timestamps: true, versionKey: false },
);

export const ProjectModel = mongoose.model("Project", ProjectSchema);
