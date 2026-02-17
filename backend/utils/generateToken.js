import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateToken = (payload) => {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export { generateToken, verifyToken };
