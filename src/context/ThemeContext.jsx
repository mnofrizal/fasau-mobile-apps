import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();
const THEME_STORAGE_KEY = "@theme_preference";

export function ThemeProvider({ children }) {
  const deviceTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Save theme preference whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveThemePreference(isDarkMode);
    }
  }, [isDarkMode, isLoading]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      } else {
        setIsDarkMode(deviceTheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
      setIsDarkMode(deviceTheme === "dark");
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (value) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode
      ? {
          background: "#0f172a", // dark blue (slate-900)
          card: "#1e293b", // slate-800
          text: "#f8fafc", // slate-50
          textSecondary: "#94a3b8", // slate-400
          primary: "#3b82f6", // blue-500
          border: "#334155", // slate-700
          isDarkMode: true,
        }
      : {
          background: "#f8fafc", // slate-50
          card: "#ffffff",
          text: "#0f172a", // slate-900
          textSecondary: "#64748b", // slate-500
          primary: "#3b82f6", // blue-500
          border: "#e2e8f0", // slate-200
          isDarkMode: false,
        },
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
