import { create } from "zustand";
import { taskService, TaskStatus, TaskCategory } from "../services/taskService";
import useAuthStore from "./authStore";

const ALLOWED_PM_CATEGORIES = [
  TaskCategory.TASK,
  TaskCategory.TEMUAN,
  TaskCategory.LAPORAN,
  TaskCategory.BACKLOG,
];

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    try {
      set({ isLoading: true, error: null });
      console.log("🚀 Fetching tasks...");
      const response = await taskService.getAllTasks();
      // console.log("📦 Raw API Response:", response);

      // The response is already transformed by axios interceptor to return response.data
      // So now we can directly access the data array
      let tasks = Array.isArray(response.data) ? response.data : [];
      // console.log("🔍 Response data array:", tasks);

      // Filter tasks based on user role
      const user = useAuthStore.getState().user;
      if (user?.role !== "ADMIN") {
        // console.log("👤 Filtering tasks for PM user");
        tasks = tasks.filter((task) =>
          ALLOWED_PM_CATEGORIES.includes(task.category)
        );
        // console.log("✅ Filtered tasks:", tasks);
      }

      set({
        tasks,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
      set({
        error: error.message || "Failed to fetch tasks",
        isLoading: false,
        tasks: [],
      });
    }
  },

  getTasksByStatus: (status) => {
    const tasks = get().tasks || [];
    return tasks.filter((task) => task.status === status);
  },

  getTaskStats: () => {
    const tasks = get().tasks || [];
    // console.log("📊 Calculating stats from", tasks.length, "tasks");

    const stats = {
      total: tasks.length,
      completed: tasks.filter((task) => task.status === TaskStatus.COMPLETED)
        .length,
      inProgress: tasks.filter((task) => task.status === TaskStatus.INPROGRESS)
        .length,
      canceled: tasks.filter((task) => task.status === TaskStatus.CANCEL)
        .length,
      backlog: tasks.filter((task) => task.status === TaskStatus.BACKLOG)
        .length,
    };

    // console.log("📈 Current task stats:", stats);
    return stats;
  },

  getActiveTaskCount: () => {
    const tasks = get().tasks || [];
    return tasks.filter(
      (task) =>
        task.status !== TaskStatus.COMPLETED &&
        task.status !== TaskStatus.CANCEL
    ).length;
  },

  getTaskById: (id) => {
    const tasks = get().tasks || [];
    return tasks.find((task) => task.id === id);
  },

  // Reset store
  reset: () => {
    console.log("🔄 Resetting task store");
    set({ tasks: [], isLoading: false, error: null });
  },
}));

export default useTaskStore;
