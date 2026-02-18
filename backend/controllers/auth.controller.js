import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.Model.js";
import { sendEmail } from "../lib/nodemailer.js";
import { thankYouEmail } from "../utils/emailTemplates.js";
import { generateToken } from "../utils/generateToken.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { deleteImage, uploadImage } from "../utils/uploadAndDeleteFiles.js";

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

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, isActive } = req.body;

    const userExist = await UserModel.findById(id);

    if (!userExist) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    if (req.user.id === id) {
      return res.status(400).json({
        message: "You cannot change your own role",
      });
    }

    if (role !== undefined) userExist.role = role;
    if (isActive !== undefined) userExist.isActive = isActive;

    await userExist.save();

    res.status(200).json({ success: true, message: "User Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Wrong!",
    });
  }
};

export const createProfile = async (req, res) => {
  let uploadedImagePublicId = null;
  try {
    const { title, skills, bio, portfolioLink, hourlyRate } = req.body;
    const { id } = req.user;

    if (!title || !bio || !hourlyRate) {
      return res.status(400).json({
        success: false,
        message: "Required field Missing",
      });
    }

    const profileAlreadyExist = await ProfileModel.findOne({ userId: id });

    if (profileAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User Profile Already Exist",
      });
    }

    let profileImage = {};

    if (req.file) {
      const result = await uploadImage(req.file.buffer, "Profile Image");

      uploadedImagePublicId = result.public_id;

      profileImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    await ProfileModel.create({
      userId: id,
      title,
      skills,
      profileImage,
      bio,
      portfolioLink,
      hourlyRate,
    });

    res.status(201).json({ success: true, message: "Profile Created" });
  } catch (error) {
    if (uploadedImagePublicId) {
      try {
        await deleteImage(uploadedImagePublicId);
      } catch (deleteError) {
        console.error("Cloudinary Delete Error:", deleteError);
      }
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message}`,
    });
  }
};
