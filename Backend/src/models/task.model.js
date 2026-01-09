import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    status: String,
    userId: String,
    priority: String,
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
