import { env } from "./env.js";

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (env.clientUrls.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
