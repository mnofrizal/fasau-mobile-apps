import api from "../api/axios";

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await api.get("/tasks");
      // The response is already handled by axios interceptor to return response.data
      // So we just need to return it directly
      return response;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  updateTask: async (taskId, updateData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, updateData);
      return response;
    } catch (error) {
      console.error(`Error updating task ${taskId}:`, error);
      throw error;
    }
  },
};

// Task status constants
export const TaskStatus = {
  COMPLETED: "COMPLETED",
  CANCEL: "CANCEL",
  INPROGRESS: "INPROGRESS",
  BACKLOG: "BACKLOG",
};

// Task category constants
export const TaskCategory = {
  MEMO: "MEMO",
  TASK: "TASK",
  LAPORAN: "LAPORAN",
  JASA: "JASA",
  MATERIAL: "MATERIAL",
  TEMUAN: "TEMUAN",
};
