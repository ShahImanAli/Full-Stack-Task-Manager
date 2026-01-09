import React, { useState, useEffect } from "react";
import { callGetAllTasksApi, callUpdateTaskApi } from "@/services";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const STATUSES = [
  { id: "todo", label: "To Do", color: "bg-gray-100 border-gray-300" },
  {
    id: "in-progress",
    label: "In Progress",
    color: "bg-blue-100 border-blue-300",
  },
  { id: "review", label: "Review", color: "bg-purple-100 border-purple-300" },
  { id: "blocked", label: "Blocked", color: "bg-red-100 border-red-300" },
  { id: "done", label: "Done", color: "bg-green-100 border-green-300" },
];

function ScrumBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);

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

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();

    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null);
      return;
    }

    // Optimistic update
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === draggedTask._id ? { ...task, status: newStatus } : task
      )
    );

    try {
      const response = await callUpdateTaskApi(draggedTask._id, {
        status: newStatus,
      });

      if (response.success) {
        toast.success("Task status updated successfully");
        fetchTasks();
      } else {
        toast.error(response.message || "Failed to update task status");
        fetchTasks();
      }
    } catch (error) {
      toast.error("An error occurred while updating task status");
      fetchTasks();
    } finally {
      setDraggedTask(null);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-xl">Loading Tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Kanban Board with 5 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 w-screen relative left-1/2 -ml-[50vw] -mr-[50vw] px-2 md:px-4 lg:px-6">
        {STATUSES.map((status) => (
          <div
            key={status.id}
            className={`rounded-lg border-2 ${status.color} p-4 min-h-150`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status.id)}
          >
            <div className="mb-4">
              <div
                className="bg-black border-5 border-solid border-black text-white -mx-4 -mt-4 mb-2 p-1 rounded-t-lg"
                style={{ width: "calc(100% + 2rem)" }}
              >
                <h2 className="font-semibold text-lg">{status.label}</h2>
              </div>

              <span className="text-sm text-gray-600">
                {getTasksByStatus(status.id).length} tasks
              </span>
            </div>

            <div className="space-y-3">
              {getTasksByStatus(status.id).map((task) => (
                <Card
                  key={task._id}
                  className="p-5 cursor-move hover:shadow-lg transition-shadow bg-white"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-base line-clamp-2">
                        {task.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {task.description}
                    </p>
                  </div>
                </Card>
              ))}

              {getTasksByStatus(status.id).length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrumBoard;
