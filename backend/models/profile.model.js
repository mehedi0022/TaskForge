import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,
    skills: [String],
    experienceLevel: String,
    bio: String,

    portfolioLinks: [String],

    hourlyRate: Number,
  },
  { timestamps: true, versionKey: false },
);

export const ProfileModel = mongoose.model("Profile", ProfileSchema);
