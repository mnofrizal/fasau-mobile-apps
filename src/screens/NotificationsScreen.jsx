import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function NotificationsScreen() {
  const { colors } = useTheme();

  const notifications = [
    {
      id: 1,
      title: "New Task Assigned",
      message: "You have been assigned to 'Design UI/UX' task",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Task Completed",
      message: "Backend API Development has been marked as completed",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      title: "Deadline Reminder",
      message: "Testing Phase task is due tomorrow",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      title: "Task Updated",
      message: "Changes have been made to 'Mobile App Development' task",
      time: "2 days ago",
      read: true,
    },
  ];

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View style={{ backgroundColor: colors.card }} className="p-4">
          <Text style={{ color: colors.text }} className="text-2xl font-bold">
            Notifications
          </Text>
          <Text style={{ color: colors.textSecondary }}>
            Stay updated with your tasks
          </Text>
        </View>

        {/* Notifications List */}
        <View className="p-4">
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={{ backgroundColor: colors.card }}
              className={`p-4 rounded-lg mb-3 shadow-sm ${
                !notification.read
                  ? colors.isDarkMode
                    ? "border-l-4 border-blue-400"
                    : "border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <View className="flex-row items-start">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3`}
                  style={{
                    backgroundColor: !notification.read
                      ? colors.isDarkMode
                        ? colors.card
                        : "#dbeafe"
                      : colors.isDarkMode
                      ? "#1e293b"
                      : "#f3f4f6",
                    borderWidth: colors.isDarkMode ? 1 : 0,
                    borderColor: colors.border,
                  }}
                >
                  <Ionicons
                    name={
                      notification.title.includes("Assigned")
                        ? "person-add"
                        : notification.title.includes("Completed")
                        ? "checkmark-circle"
                        : notification.title.includes("Reminder")
                        ? "alarm"
                        : "create"
                    }
                    size={20}
                    color={
                      !notification.read ? "#60a5fa" : colors.textSecondary
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: !notification.read ? "600" : "normal",
                    }}
                  >
                    {notification.title}
                  </Text>
                  <Text
                    style={{ color: colors.textSecondary }}
                    className="mt-1"
                  >
                    {notification.message}
                  </Text>
                  <Text
                    style={{ color: colors.textSecondary }}
                    className="text-sm mt-2"
                  >
                    {notification.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
