import express from "express";
import { env } from "./config/env.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import { corsOptions } from "./config/cors.config.js";
import { connectDB } from "./config/db.config.js";
import { createAdmin } from "./utils/createAdmin.js";

import authRoute from "./routes/auth.Route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Basic Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome To Task Forge API!",
  });
});

// App Routes
app.use("/api/v1/auth", authRoute);

// Connect with Database
await connectDB();

// Create Admin Account
await createAdmin();

// Server Listen
app.listen(env.port, () => {
  console.log(`Server is Running on PORT ${env.port}`);
});
