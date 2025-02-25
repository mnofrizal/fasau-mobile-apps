import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";
import { TaskCategory, TaskStatus } from "../services/taskService";
import { format } from "date-fns";

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const user = useAuthStore((state) => state.user);
  const { tasks, isLoading, error, fetchTasks, getTaskStats } = useTaskStore();

  useEffect(() => {
    console.log("🔄 Fetching initial tasks...");
    fetchTasks();
  }, []);

  useEffect(() => {
    // console.log("📱 Current tasks in HomeScreen:", tasks);
  }, [tasks]);

  const menuItems = [
    { id: 1, title: "Tasks", icon: "list", color: "#3b82f6", route: "Tasks" },
    {
      id: 2,
      title: "Inventory",
      icon: "cube",
      color: "#8b5cf6",
      route: "Inventory",
    },
    {
      id: 3,
      title: "Man Power",
      icon: "people",
      color: "#ec4899",
      route: "ManPower",
    },
    {
      id: 4,
      title: "Inventaris",
      icon: "file-tray-full",
      color: "#f59e0b",
      route: "Inventaris",
    },
    {
      id: 5,
      title: "Sepeda",
      icon: "bicycle",
      color: "#10b981",
      route: "Sepeda",
    },
    {
      id: 6,
      title: "List Kontrak",
      icon: "document-text",
      color: "#6366f1",
      route: "ListKontrak",
    },
    {
      id: 7,
      title: "Beyond kWh",
      icon: "flash",
      color: "#ef4444",
      route: "BeyondKwh",
    },
    {
      id: 8,
      title: "Sertifikat",
      icon: "ribbon",
      color: "#0ea5e9",
      route: "Sertifikat",
    },
  ];

  // Get task stats
  const taskStats = useMemo(() => {
    const stats = getTaskStats();
    console.log("🏠 HomeScreen stats:", stats);

    return [
      {
        title: "Total Tasks",
        count: stats.total,
        color: "#3b82f6",
        icon: "list",
      },
      {
        title: "Active Tasks",
        count: stats.inProgress + stats.backlog,
        color: "#f59e0b",
        icon: "time",
      },
      {
        title: "Completed",
        count: stats.completed,
        color: "#10b981",
        icon: "checkmark-circle",
      },
    ];
  }, [tasks]); // Recalculate when tasks change

  // Get 3 most recent tasks
  const recentTasks = useMemo(() => {
    if (!tasks?.length) return [];
    console.log("🔄 Calculating recent tasks from:", tasks.length, "tasks");

    return [...tasks]
      .filter(
        (task) =>
          task.status !== TaskStatus.COMPLETED &&
          task.status !== TaskStatus.CANCEL
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 7);
  }, [tasks]);

  const getStatusColor = (status) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return "#10b981"; // green
      case TaskStatus.INPROGRESS:
        return "#3b82f6"; // blue
      case TaskStatus.CANCEL:
        return "#ef4444"; // red
      case TaskStatus.BACKLOG:
      default:
        return "#f59e0b"; // amber
    }
  };

  const getCategoryColor = (category) => {
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

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchTasks} />
        }
      >
        {/* Header Section */}
        <View className="p-4 mb-2">
          <View className="flex-row justify-between items-center">
            <View>
              <Text
                style={{ color: colors.textSecondary }}
                className="text-base mb-1"
              >
                Welcome back 👋
              </Text>
              <Text
                style={{ color: colors.text }}
                className="text-2xl uppercase font-semibold"
              >
                {user?.username}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              className="w-12 h-12 rounded-full overflow-hidden"
            >
              <Image
                source={require("../../assets/icon.png")}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          {user?.role === "ADMIN" && (
            <View
              style={{
                backgroundColor: colors.isDarkMode ? "#1f2937" : "#f8fafc",
                borderColor: colors.border,
              }}
              className="flex-row items-center px-4 py-3 rounded-xl mt-4 border"
            >
              <Ionicons name="search" size={20} color={colors.textSecondary} />
              <TextInput
                placeholder="Search for tasks..."
                placeholderTextColor={colors.textSecondary}
                style={{ color: colors.text }}
                className="flex-1 ml-2 text-base"
              />
            </View>
          )}
        </View>

        {/* Stats Grid */}
        <View className="px-4">
          <View className="flex-row justify-between">
            {taskStats.map((stat, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: colors.isDarkMode ? colors.card : "#ffffff",
                }}
                className="w-[31%] p-4 rounded-2xl shadow-sm"
              >
                <View
                  style={{ backgroundColor: `${stat.color}20` }}
                  className="w-10 h-10 rounded-full items-center justify-center mb-2"
                >
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text
                  style={{ color: colors.text }}
                  className="text-2xl font-bold"
                >
                  {stat.count}
                </Text>
                <Text
                  style={{ color: colors.textSecondary }}
                  className="text-sm mt-1"
                >
                  {stat.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu Grid - Only visible for ADMIN */}
        {user?.role === "ADMIN" && (
          <View className="p-4">
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold mb-4"
            >
              Quick Menu
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    backgroundColor: colors.isDarkMode
                      ? colors.card
                      : "#ffffff",
                    width: "23%",
                  }}
                  className="mb-4 p-3 rounded-2xl shadow-sm items-center"
                  onPress={() => navigation.navigate(item.route)}
                >
                  <View
                    style={{ backgroundColor: `${item.color}20` }}
                    className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  >
                    <Ionicons name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text
                    style={{ color: colors.text }}
                    className="text-center text-xs"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Recent Tasks */}
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold"
            >
              Recent Tasks
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
              <Text style={{ color: colors.primary }} className="text-base">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {recentTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={{
                backgroundColor: colors.isDarkMode ? colors.card : "#ffffff",
              }}
              className="p-4 rounded-xl mb-3 shadow-sm"
              onPress={() =>
                navigation.navigate("TaskDetail", { taskId: task.id })
              }
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text
                    style={{ color: colors.text }}
                    className="text-base font-semibold mb-1"
                  >
                    {task.title}
                  </Text>
                  <Text
                    style={{ color: colors.textSecondary }}
                    className="text-sm mb-2"
                  >
                    {task.taskReport?.pelapor
                      ? task.taskReport?.pelapor
                      : "Admin"}{" "}
                    • {task.keterangan}
                  </Text>
                  <View className="flex-row items-center">
                    <View
                      style={{
                        backgroundColor: `${getCategoryColor(task.category)}20`,
                      }}
                      className="px-3 py-1 rounded-full mr-2"
                    >
                      <Text
                        style={{ color: getCategoryColor(task.category) }}
                        className="text-xs font-medium"
                      >
                        {task.category}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: `${getStatusColor(task.status)}20`,
                      }}
                      className="px-3 py-1 rounded-full mr-2"
                    >
                      <Text
                        style={{ color: getStatusColor(task.status) }}
                        className="text-xs font-medium"
                      >
                        {task.status}
                      </Text>
                    </View>
                    {task.isUrgent && (
                      <View
                        style={{ backgroundColor: "#ef444420" }}
                        className="px-3 py-1 rounded-full"
                      >
                        <Text
                          style={{ color: "#ef4444" }}
                          className="text-xs font-medium"
                        >
                          Urgent
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text
                  style={{ color: colors.textSecondary }}
                  className="text-xs"
                >
                  {format(new Date(task.createdAt), "MMM d, yyyy")}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
