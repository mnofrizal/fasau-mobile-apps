import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import useTaskStore from "../store/taskStore";
import { format } from "date-fns";

export default function TaskDetailScreen({ route, navigation }) {
  const { colors } = useTheme();
  const task = useTaskStore((state) => state.getTaskById(route.params?.taskId));

  if (!task) {
    return (
      <SafeAreaView
        style={{ backgroundColor: colors.background }}
        className="flex-1 justify-center items-center"
      >
        <Text style={{ color: colors.text }} className="text-lg">
          Task not found
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-4 px-6 py-3 bg-blue-500 rounded-lg"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return colors.isDarkMode
          ? "bg-green-700 text-green-300"
          : "bg-green-100 text-green-800";
      case "INPROGRESS":
        return colors.isDarkMode
          ? "bg-blue-700 text-blue-200"
          : "bg-blue-100 text-blue-800";
      case "CANCEL":
        return colors.isDarkMode
          ? "bg-slate-700 text-red-300"
          : "bg-red-100 text-red-800";
      case "BACKLOG":
        return colors.isDarkMode
          ? "bg-slate-700 text-orange-300"
          : "bg-orange-100 text-orange-800";
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
              <Text className={`font-medium ${getStatusColor(task.status)}`}>
                {task.status}
              </Text>
            </View>
          </View>

          <Text
            style={{ color: colors.text }}
            className="text-2xl font-bold mt-4"
          >
            {task.title}
          </Text>
        </View>

        {/* Task Details */}
        <View style={{ backgroundColor: colors.card }} className="mt-4 p-4">
          <View className="mb-4">
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold mb-2"
            >
              Category
            </Text>
            <View className="flex-row items-center">
              <Ionicons
                name="bookmark-outline"
                size={20}
                color={colors.textSecondary}
              />
              <Text style={{ color: colors.textSecondary }} className="ml-2">
                {task.category}
              </Text>
            </View>
          </View>

          {task.keterangan && (
            <View className="mb-4">
              <Text
                style={{ color: colors.text }}
                className="text-lg font-semibold mb-2"
              >
                Description
              </Text>
              <Text style={{ color: colors.textSecondary }}>
                {task.keterangan}
              </Text>
            </View>
          )}

          <View className="mb-4">
            <Text
              style={{ color: colors.text }}
              className="text-lg font-semibold mb-2"
            >
              Created
            </Text>
            <View className="flex-row items-center">
              <Ionicons
                name="calendar-outline"
                size={20}
                color={colors.textSecondary}
              />
              <Text style={{ color: colors.textSecondary }} className="ml-2">
                {format(new Date(task.createdAt), "PPP")}
              </Text>
            </View>
          </View>

          {task.isUrgent && (
            <View
              style={{ backgroundColor: "#fee2e2" }}
              className="p-3 rounded-lg mb-4"
            >
              <View className="flex-row items-center">
                <Ionicons name="alert-circle" size={20} color="#dc2626" />
                <Text className="ml-2 font-medium text-red-600">
                  Urgent Task
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Status History */}
        <View style={{ backgroundColor: colors.card }} className="mt-4 p-4">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold mb-4"
          >
            Status History
          </Text>
          {!task.statusHistory?.length ? (
            <Text
              style={{ color: colors.textSecondary }}
              className="text-center py-4"
            >
              No status history available
            </Text>
          ) : (
            task.statusHistory.map((history, index) => (
              <View
                key={index}
                style={{ borderColor: colors.border }}
                className={`pb-4 ${
                  index !== task.statusHistory.length - 1 ? "border-l ml-2" : ""
                }`}
              >
                <View className="flex-row items-start">
                  <View
                    className={`w-4 h-4 rounded-full ${
                      colors.isDarkMode ? "bg-slate-700" : "bg-slate-200"
                    } -ml-2`}
                  />
                  <View className="ml-4">
                    <View
                      className={`px-2 py-1 rounded ${getStatusColor(
                        history.status
                      )}`}
                    >
                      <Text className="text-sm font-medium">
                        {history.status}
                      </Text>
                    </View>
                    <Text
                      style={{ color: colors.textSecondary }}
                      className="text-sm mt-1"
                    >
                      {history.notes}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text
                        style={{ color: colors.textSecondary }}
                        className="text-xs"
                      >
                        {format(new Date(history.createdAt), "PPp")}
                      </Text>
                      <Text
                        style={{ color: colors.textSecondary }}
                        className="text-xs ml-2"
                      >
                        • {history.changedBy}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
        className="p-4 border-t"
      >
        {task.status !== "COMPLETED" && task.status !== "CANCEL" && (
          <View className="flex-row space-x-4">
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-red-500"
              onPress={() => {
                /* Handle cancel task */
              }}
            >
              <Text className="text-white text-center font-semibold">
                Cancel Task
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-blue-500"
              onPress={() =>
                navigation.navigate("TaskComplete", { taskId: task.id })
              }
            >
              <Text className="text-white text-center font-semibold">
                Complete Task
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
