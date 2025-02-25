import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  initialize: async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        set({ user: JSON.parse(userData) });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (username, password) => {
    try {
      const user = {
        username,
        role: username.toLowerCase() === "admin" ? "ADMIN" : "PM",
      };
      await AsyncStorage.setItem("user", JSON.stringify(user));
      set({ user });
      return true;
    } catch (error) {
      console.error("Error saving user data:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("user");
      set({ user: null });
      return true;
    } catch (error) {
      console.error("Error removing user data:", error);
      return false;
    }
  },
}));

export default useAuthStore;
