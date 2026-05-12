import express from "express";
import {
  registerUser,
  Login,
  Logout,
  profile,
  verifyUser,
} from "../controllers/userController.js";
import {
  createTask,
  updateTask,
  DeleteTask,
  getAllTasks,
  getTaskById,
  toggleTaskStatus,
} from "../controllers/TaskController.js";
import { verifyJWT } from "../middleware/authmiddleware.js";
import { updateAvatar } from "../controllers/userController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// User routes
//public routes
router.route("/register").post(registerUser);
router.route("/login").post(Login);
router.route("/logout").post(Logout);
//private routes
router.route("/profile").get(verifyJWT, profile);

// Task routes // private routes
router.route("/createTask").post(verifyJWT, createTask);
router.route("/updateTask/:_id").put(verifyJWT, updateTask);
router.route("/deleteTask/:_id").delete(verifyJWT, DeleteTask);
router.route("/getTasks").get(verifyJWT, getAllTasks);
router.route("/getTaskById/:_id").get(verifyJWT, getTaskById);
router.route("/toggleTaskStatus/:_id").post(verifyJWT, toggleTaskStatus);
router.route("/verify").get(verifyJWT, verifyUser);
router.route("/update-avatar").post(verifyJWT,upload.single("avatar"), updateAvatar);

export default router;
