import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function TaskDetailScreen({ route, navigation }) {
  const { colors } = useTheme();

  // Dummy task data - in a real app, you would fetch this based on taskId
  const task = {
    id: route.params?.taskId || 1,
    title: "Design UI/UX",
    description:
      "Create a modern and user-friendly interface for the mobile application. This includes wireframes, mockups, and interactive prototypes.",
    deadline: "2024-02-28",
    priority: "High",
    status: "In Progress",
    assignedTo: "John Doe",
    progress: 65,
    subtasks: [
      { id: 1, title: "Create Wireframes", completed: true },
      { id: 2, title: "Design System", completed: true },
      { id: 3, title: "Interactive Prototype", completed: false },
      { id: 4, title: "User Testing", completed: false },
    ],
  };

  const handleComplete = () => {
    navigation.navigate("TaskComplete");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return colors.isDarkMode
          ? "bg-slate-700 text-green-300"
          : "bg-green-100 text-green-800";
      case "In Progress":
        return colors.isDarkMode
          ? "bg-slate-700 text-blue-300"
          : "bg-blue-100 text-blue-800";
      case "Not Started":
        return colors.isDarkMode
          ? "bg-slate-700 text-slate-300"
          : "bg-slate-100 text-slate-800";
      default:
        return colors.isDarkMode
          ? "bg-slate-700 text-slate-300"
          : "bg-slate-100 text-slate-800";
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View style={{ backgroundColor: colors.card }} className="p-4">
          <View className="flex-row justify-between items-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2"
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <View
              className={`px-3 py-1 rounded-full ${getStatusColor(
                task.status
              )}`}
            >
              <Text className="font-medium">{task.status}</Text>
            </View>
          </View>

          <Text
            style={{ color: colors.text }}
            className="text-2xl font-bold mt-4"
          >
            {task.title}
          </Text>

          <View className="flex-row items-center mt-2">
            <Ionicons
              name="person-circle"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={{ color: colors.textSecondary }} className="ml-1">
              {task.assignedTo}
            </Text>
          </View>
        </View>

        {/* Task Details */}
        <View style={{ backgroundColor: colors.card }} className="mt-4 p-4">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold"
          >
            Description
          </Text>
          <Text style={{ color: colors.textSecondary }} className="mt-2">
            {task.description}
          </Text>

          <View className="mt-4">
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold"
            >
              Due Date
            </Text>
            <View className="flex-row items-center mt-2">
              <Ionicons
                name="calendar"
                size={20}
                color={colors.textSecondary}
              />
              <Text style={{ color: colors.textSecondary }} className="ml-2">
                {task.deadline}
              </Text>
            </View>
          </View>

          <View className="mt-4">
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold"
            >
              Priority
            </Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="flag" size={20} color="#EF4444" />
              <Text className="text-red-600 ml-2">{task.priority}</Text>
            </View>
          </View>

          <View className="mt-4">
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold"
            >
              Progress
            </Text>
            <View
              className={`h-2 ${
                colors.isDarkMode ? "bg-slate-700" : "bg-slate-200"
              } rounded-full mt-2`}
            >
              <View
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${task.progress}%` }}
              />
            </View>
            <Text style={{ color: colors.textSecondary }} className="mt-1">
              {task.progress}% Complete
            </Text>
          </View>
        </View>

        {/* Subtasks */}
        <View style={{ backgroundColor: colors.card }} className="mt-4 p-4">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold mb-2"
          >
            Subtasks
          </Text>
          {task.subtasks.map((subtask) => (
            <View
              key={subtask.id}
              style={{ borderColor: colors.border }}
              className="flex-row items-center py-3 border-b last:border-b-0"
            >
              <View
                style={{ borderColor: colors.border }}
                className={`w-6 h-6 rounded-full border-2 ${
                  subtask.completed ? "bg-blue-500 border-blue-500" : ""
                } mr-3 items-center justify-center`}
              >
                {subtask.completed && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
              <Text
                style={{
                  color: subtask.completed ? colors.textSecondary : colors.text,
                }}
                className={subtask.completed ? "line-through" : ""}
              >
                {subtask.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Complete Button */}
      <View
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
        className="p-4 border-t"
      >
        <TouchableOpacity
          className="py-3 rounded-lg bg-blue-500"
          onPress={handleComplete}
        >
          <Text className="text-white text-center font-semibold">
            Complete Task
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
