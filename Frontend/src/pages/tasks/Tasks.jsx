import React, { useState, useEffect } from "react";
import AddNewTask from "@/components/AddNewTask/AddNewTask";
import EditTask from "@/components/EditTask/EditTask";
import {
  callGetAllTasksApi,
  callAddNewTaskApi,
  callDeleteTaskApi,
  callUpdateTaskApi,
} from "@/services";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await callGetAllTasksApi();
      if (response.success) {
        setTasks(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (formData) => {
    try {
      const response = await callAddNewTaskApi(formData);

      if (response.success) {
        toast.success("Task created successfully");
        fetchTasks();
        return true;
      } else {
        toast.error(response.message || "Failed to create task");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while creating the task");
      return false;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await callDeleteTaskApi(taskId);

      if (response.success) {
        toast.success("Task deleted successfully");
        fetchTasks();
        return true;
      } else {
        toast.error(response.message || "Failed to delete task");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while deleting the task");
      return false;
    }
  };

  const handleEditTask = async (taskId, formData) => {
    try {
      const response = await callUpdateTaskApi(taskId, formData);

      if (response.success) {
        toast.success("Task updated successfully");
        fetchTasks();
        return true;
      } else {
        toast.error(response.message || "Failed to update task");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while updating the task");
      return false;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "review":
        return "text-purple-600 bg-purple-100";
      case "blocked":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-xl">Loading Tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-9">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold ">Tasks</h1>
        <AddNewTask onSubmit={handleAddTask} />
      </div>

      <div className="mt-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No tasks yet. Create your first task!
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Card key={task._id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-400">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-3"
                        onClick={() => {
                          setEditingTask(task);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 px-3 bg-black hover:bg-gray-800 text-white"
                        onClick={() => {
                          handleDeleteTask(task._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Task Dialog */}
      {editingTask && (
        <EditTask
          task={editingTask}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleEditTask}
        />
      )}
    </div>
  );
}

export default Tasks;
