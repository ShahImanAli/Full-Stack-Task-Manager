import { Router } from "express";
import {
  addNewTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/add").post(addNewTask);

router.route("/all").get(getAllTasks);
router.route("/delete/:taskId").delete(deleteTask);
router.route("/update/:taskId").patch(updateTask);

export default router;
