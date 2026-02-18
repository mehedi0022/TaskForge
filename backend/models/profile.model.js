import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileImage: {
      url: String,
      public_id: String,
    },
    title: String,
    skills: [String],
    bio: String,
    portfolioLink: String,
    hourlyRate: Number,
  },
  { timestamps: true, versionKey: false },
);

export const ProfileModel = mongoose.model("Profile", ProfileSchema);
