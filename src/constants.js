import { TaskCategory, TaskStatus } from "./services/taskService";

// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: "dajrhxyfu",
  apiKey: "318327463344866",
  apiSecret: "rKx2EROQieTNiR0CwPxq5813ZUI",
  uploadPreset: "FasPoint",
};

export const getCategoryColor = (category) => {
  switch (category) {
    case TaskCategory.TASK:
      return "#10b981"; // green
    case TaskCategory.TEMUAN:
      return "#f59e0b"; // blue
    case TaskCategory.LAPORAN:
      return "#8b5cf6"; // purple
    default:
      return "#f59e0b"; // amber
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return "#10b981"; // green
    case TaskStatus.INPROGRESS:
      return "#3b82f6"; // blue
    case TaskStatus.CANCEL:
      return "#ef4444"; // red
    case TaskStatus.BACKLOG:
      return "#14b8a6"; // teal
    default:
      return "#f59e0b"; // amber
  }
};
