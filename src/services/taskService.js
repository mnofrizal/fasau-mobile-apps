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

  // Add more task-related API calls here as needed, for example:
  // getTaskById: async (id) => {
  //   try {
  //     const response = await api.get(`/tasks/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error fetching task ${id}:`, error);
  //     throw error;
  //   }
  // },
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
