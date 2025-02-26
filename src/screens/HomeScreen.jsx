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
import { getCategoryColor, getStatusColor } from "../constants";

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

  const headerHeight = user?.role === "ADMIN" ? 160 : 85; // Adjust based on whether search bar is shown

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      {/* Fixed Header */}
      <View
        style={{
          backgroundColor: colors.background,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: headerHeight,
          borderBottomWidth: 0,
          borderBottomColor: colors.border,
        }}
      >
        <View className="p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                style={{ color: colors.textSecondary }}
                className="mb-1 text-base"
              >
                Welcome back 👋
              </Text>
              <Text
                style={{ color: colors.text }}
                className="text-2xl font-semibold uppercase"
              >
                {user?.username}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              className="h-12 w-12 overflow-hidden rounded-full"
            >
              <Image
                source={require("../../assets/icon.png")}
                className="h-full w-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar - Only for ADMIN */}
          {user?.role === "ADMIN" && (
            <View
              style={{
                backgroundColor: colors.isDarkMode ? "#1f2937" : "#f8fafc",
                borderColor: colors.border,
              }}
              className="mt-4 flex-row items-center rounded-xl border px-4 py-3"
            >
              <Ionicons name="search" size={20} color={colors.textSecondary} />
              <TextInput
                placeholder="Search for tasks..."
                placeholderTextColor={colors.textSecondary}
                style={{ color: colors.text }}
                className="ml-2 flex-1 text-base"
              />
            </View>
          )}
        </View>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchTasks} />
        }
        contentContainerStyle={{
          paddingTop: headerHeight, // Add padding to account for fixed header
        }}
      >
        {/* Stats Grid */}
        <View className="px-4 ">
          <View className="flex-row justify-between">
            {taskStats.map((stat, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: colors.isDarkMode ? colors.card : "#ffffff",
                }}
                className="w-[31%] rounded-2xl p-4 shadow-sm"
              >
                <View
                  style={{ backgroundColor: `${stat.color}20` }}
                  className="mb-2 h-10 w-10 items-center justify-center rounded-full"
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
                  className="mt-1 text-sm"
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
              className="mb-4 text-lg font-semibold"
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
                  className="mb-4 items-center rounded-2xl p-3 shadow-sm"
                  onPress={() => navigation.navigate(item.route)}
                >
                  <View
                    style={{ backgroundColor: `${item.color}20` }}
                    className="mb-2 h-12 w-12 items-center justify-center rounded-full"
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
          <View className="mb-4 flex-row items-center justify-between">
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold"
            >
              Tugas Terbaru
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
              <Text style={{ color: colors.primary }} className="text-base">
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>

          {recentTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={{
                backgroundColor: colors.isDarkMode ? colors.card : "#ffffff",
              }}
              className="mb-3 rounded-xl p-4 shadow-sm"
              onPress={() =>
                navigation.navigate("TaskDetail", { taskId: task.id })
              }
            >
              <View className="flex-row justify-between space-x-4">
                {task.taskReport?.evidence && (
                  <View className="flex items-center justify-center">
                    <View className="">
                      <TouchableOpacity>
                        <Image
                          source={{ uri: task.taskReport?.evidence }}
                          style={{ width: 60, height: 90 }}
                          className="rounded-lg"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View className="flex-1">
                  <Text
                    style={{ color: colors.text }}
                    className="mb-1 text-base font-semibold capitalize"
                  >
                    {task.title}
                  </Text>
                  <View className="flex-row pb-2 items-center">
                    <Text
                      style={{ color: colors.textSecondary }}
                      className="text-xs"
                    >
                      {format(new Date(task.createdAt), "MMM d, yyyy")}{" "}
                    </Text>
                    <View className="mx-2 h-4 w-[1px] rotate-12 bg-gray-500" />
                    <Text
                      style={{ color: colors.textSecondary }}
                      className="text-xs"
                    >
                      {task.taskReport?.pelapor}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <View
                      style={{
                        backgroundColor: `${getCategoryColor(task.category)}20`,
                      }}
                      className="mr-2 rounded-full px-3 py-1"
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
                      className="mr-2 rounded-full px-3 py-1"
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
                        className="rounded-full px-3 py-1"
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
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
