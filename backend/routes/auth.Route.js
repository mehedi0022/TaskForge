import express from "express";
import {
  signIn,
  signUp,
  createProfile,
  updateProfile,
  updateUser,
} from "../controllers/auth.controller.js";
import { checkRole } from "../middlewares/role.middleware.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.config.js";
const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.post(
  "/create-profile",
  checkAuth,
  upload.single("profileImage"),
  createProfile,
);
router.put("/update-profile", checkAuth, updateProfile);
router.put("/update-user/:id", checkAuth, checkRole("admin"), updateUser);

export default router;
