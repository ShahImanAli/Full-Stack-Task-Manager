import axios from "axios";

export const callRegisterUserApi = async (userData) => {
  try {
    const response = await axios.post("/api/v1/users/register", userData, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Network error" };
  }
};

export const callLoginUserApi = async (loginData) => {
  try {
    const response = await axios.post("/api/v1/users/login", loginData, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Network error" };
  }
};

export const verifyAuth = async () => {
  try {
    const response = await axios.get("/api/v1/users/current-user", {
      withCredentials: true,
    });
    return response?.data?.success;
  } catch (error) {
    return false;
  }
};

export const callLogoutUserApi = async () => {
  try {
    const response = await axios.post(
      "/api/v1/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Network error" };
  }
};

export const callAddNewTaskApi = async (taskData) => {
  try {
    const response = await axios.post("/api/v1/tasks/add", taskData, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Network error" };
  }
};

export const callGetAllTasksApi = async () => {
  try {
    const response = await axios.get("/api/v1/tasks/all", {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Network error" };
  }
};

export const callDeleteTaskApi = async (taskId) => { 
  try {
    const response = await axios.delete(`/api/v1/tasks/delete/${taskId}`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Network error" };
  }
};

export const callUpdateTaskApi = async (taskId, updatedData) => {
  try {
    const response = await axios.patch(`/api/v1/tasks/update/${taskId}`, updatedData, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return error.response?.data || { success: false, message: "Network error" };
  }
};