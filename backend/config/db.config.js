import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Database Connected!");
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};
