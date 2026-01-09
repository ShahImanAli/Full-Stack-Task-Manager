import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addNewTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority } = req.body;
  const userId = req.user._id;

  if (!title?.trim() || !description?.trim() || !status || !priority) {
    throw new ApiError(400, "All fields are required");
  }

  const newTask = await Task.create({
    title,
    description,
    status,
    userId,
    priority,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newTask, "Task created successfully"));
});

const getAllTasks = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  const tasks = await Task.find({ userId });

  if (tasks.length === 0) {
    throw new ApiError(404, "No tasks found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, priority } = req.body;

  const task = await Task.findByIdAndUpdate(
    taskId,
    {
      title,
      description,
      status,
      priority,
    },
    { new: true }
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});


const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task deleted successfully"));
});
export { addNewTask, getAllTasks, updateTask, deleteTask };
