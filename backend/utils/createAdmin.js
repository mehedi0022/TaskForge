import { UserModel } from "../models/user.Model.js";
import { env } from "../config/env.js";
import { hashPassword } from "./hashPassword.js";

export const createAdmin = async () => {
  const existingAdmin = await UserModel.findOne({
    email: env.admin.email,
  });

  const password = await hashPassword(env.admin.password);

  if (!existingAdmin) {
    const newAdmin = new UserModel({
      name: env.admin.name,
      email: env.admin.email,
      password: password,
      role: env.admin.role,
    });
    await newAdmin.save();
    console.log("Admin created:", env.admin.email);
  } else {
    console.log("Admin already exists:", env.admin.email);
  }
};
