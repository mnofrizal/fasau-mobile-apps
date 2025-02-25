import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();

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

  const statCards = [
    { title: "Total Tasks", count: 12, color: "#3b82f6", icon: "list" },
    {
      title: "Completed",
      count: 5,
      color: "#10b981",
      icon: "checkmark-circle",
    },
    { title: "Pending", count: 7, color: "#f59e0b", icon: "time" },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Design UI/UX",
      deadline: "2024-02-28",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 2,
      title: "Develop Backend API",
      deadline: "2024-03-05",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Testing Phase",
      deadline: "2024-03-10",
      status: "Not Started",
      priority: "Low",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return colors.isDarkMode ? "#ef4444" : "#dc2626";
      case "Medium":
        return colors.isDarkMode ? "#f59e0b" : "#d97706";
      case "Low":
        return colors.isDarkMode ? "#10b981" : "#059669";
      default:
        return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <ScrollView className="flex-1">
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
                className="text-2xl font-bold"
              >
                PT PLN UIW SULSELRABAR
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              className="w-10 h-10 rounded-full overflow-hidden"
            >
              <Image
                source={require("../../assets/icon.png")}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
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
        </View>

        {/* Stats Grid */}
        <View className="px-4">
          <View className="flex-row justify-between">
            {statCards.map((stat, index) => (
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

        {/* Menu Grid */}
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
                  backgroundColor: colors.isDarkMode ? colors.card : "#ffffff",
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
                    className="text-sm"
                  >
                    Due: {task.deadline}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <View
                    style={{
                      backgroundColor: colors.isDarkMode
                        ? `${getPriorityColor(task.priority)}20`
                        : `${getPriorityColor(task.priority)}15`,
                    }}
                    className="px-3 py-1 rounded-full mr-2"
                  >
                    <Text
                      style={{ color: getPriorityColor(task.priority) }}
                      className="text-xs font-medium"
                    >
                      {task.priority}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textSecondary}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
