import { sendEmail } from "../lib/nodemailer.js";
import { UserModel } from "../models/user.Model.js";
import { thankYouEmail } from "../utils/emailTemplates.js";
import { generateToken } from "../utils/generateToken.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await comparePassword(password, userExist.password);

    if (!isValidPassword) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: userExist._id, role: userExist.role });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, Email and password are required" });
    }

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Account Already Exist With This Email",
      });
    }

    const hashedPassword = await hashPassword(password);

    const createUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    await sendEmail(email, "Create Account", thankYouEmail(name));

    res.status(201).json({ success: true, message: "Signup successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Wrong!",
    });
  }
};
