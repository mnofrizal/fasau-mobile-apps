import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

export default function TasksScreen({ navigation }) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const taskCategories = [
    { id: 1, title: "All Tasks", count: 12 },
    { id: 2, title: "In Progress", count: 5 },
    { id: 3, title: "Completed", count: 4 },
    { id: 4, title: "Pending", count: 3 },
  ];

  const allTasks = [
    {
      id: 1,
      title: "Design UI/UX",
      deadline: "2024-02-28",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Develop Backend API",
      deadline: "2024-03-05",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 3,
      title: "Testing Phase",
      deadline: "2024-03-10",
      priority: "Low",
      status: "Not Started",
    },
  ];

  const getPriorityColors = (priority) => {
    const baseColors = {
      High: {
        bg: "bg-red-100",
        text: "text-red-700",
        dark: { bg: "bg-slate-700", text: "text-red-300" },
      },
      Medium: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        dark: { bg: "bg-slate-700", text: "text-yellow-300" },
      },
      Low: {
        bg: "bg-green-100",
        text: "text-green-700",
        dark: { bg: "bg-slate-700", text: "text-green-300" },
      },
    };

    const colorSet = baseColors[priority] || baseColors.Low;
    return colors.isDarkMode
      ? `${colorSet.dark.bg} ${colorSet.dark.text}`
      : `${colorSet.bg} ${colorSet.text}`;
  };

  // Filter tasks based on search query
  const filteredTasks = allTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item: task }) => (
    <TouchableOpacity
      style={{ backgroundColor: colors.card }}
      className="p-4 rounded-lg mb-3 mx-4 shadow-sm"
      onPress={() => navigation.navigate("TaskDetail", { taskId: task.id })}
    >
      <View className="flex-row justify-between items-start">
        <Text
          style={{ color: colors.text }}
          className="text-lg font-semibold flex-1"
        >
          {task.title}
        </Text>
        <View
          className={`px-2 py-1 rounded ${getPriorityColors(task.priority)}`}
        >
          <Text className="text-sm">{task.priority}</Text>
        </View>
      </View>
      <View className="flex-row justify-between mt-2">
        <Text style={{ color: colors.textSecondary }}>
          Due: {task.deadline}
        </Text>
        <Text
          style={{ color: colors.isDarkMode ? "#93c5fd" : "#3b82f6" }}
          className={task.status === "In Progress" ? "font-medium" : ""}
        >
          {task.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => (
    <View className="items-center justify-center py-8">
      <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
      <Text
        style={{ color: colors.textSecondary }}
        className="mt-4 text-center text-base"
      >
        No tasks found matching "{searchQuery}"
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      {/* Search Bar */}
      <View style={{ backgroundColor: colors.card }} className="p-4">
        <View
          className="flex-row items-center px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: colors.isDarkMode ? "#1e293b" : "#f8fafc",
            borderColor: colors.border,
          }}
        >
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
            style={{ color: colors.text }}
            className="flex-1 ml-2 text-base"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="p-4"
      >
        {taskCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={{ backgroundColor: colors.card }}
            className="mr-4 px-6 py-3 rounded-full shadow-sm"
          >
            <Text style={{ color: colors.text }} className="font-medium">
              {category.title}
            </Text>
            <Text
              style={{ color: colors.textSecondary }}
              className="text-center"
            >
              {category.count}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tasks List */}
      <View className="flex-1">
        <FlashList
          data={filteredTasks}
          renderItem={renderItem}
          estimatedItemSize={100}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
