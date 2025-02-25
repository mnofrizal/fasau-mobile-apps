import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import useAuthStore from "../store/authStore";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const userStats = [
    { id: 1, title: "Completed", count: 45, icon: "checkmark-circle" },
    { id: 2, title: "In Progress", count: 5, icon: "time" },
    { id: 3, title: "Total Tasks", count: 52, icon: "list" },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Completed task",
      task: "Mobile App Design",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Started task",
      task: "API Integration",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "Updated task",
      task: "Database Schema",
      time: "1 day ago",
    },
  ];

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      // Navigation will automatically redirect to Login due to auth state change
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View
          style={{ backgroundColor: colors.card }}
          className="p-6 items-center"
        >
          <Image
            source={require("../../assets/icon.png")}
            className="w-24 h-24 rounded-full"
          />
          <Text
            style={{ color: colors.text }}
            className="text-xl font-bold mt-4"
          >
            {user?.username}
          </Text>
          <Text style={{ color: colors.textSecondary }}>{user?.role}</Text>
          <Text style={{ color: colors.primary }} className="mt-1">
            {user?.username.toLowerCase()}@pln.co.id
          </Text>

          <View className="flex-row mt-6 w-full justify-around">
            {userStats.map((stat) => (
              <View key={stat.id} className="items-center">
                <View
                  style={{
                    backgroundColor: colors.isDarkMode ? "#1e3a8a" : "#dbeafe",
                  }}
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                >
                  <Ionicons name={stat.icon} size={24} color={colors.primary} />
                </View>
                <Text
                  style={{ color: colors.text }}
                  className="text-2xl font-bold"
                >
                  {stat.count}
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                  {stat.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ backgroundColor: colors.card }} className="mt-6 p-4">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold mb-4"
          >
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              style={{
                backgroundColor: colors.isDarkMode ? "#374151" : "#f9fafb",
              }}
              className="flex-row items-center px-4 py-3 rounded-lg flex-1 mr-2"
            >
              <Ionicons name="create" size={20} color={colors.primary} />
              <Text style={{ color: colors.text }} className="ml-2">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.isDarkMode ? "#374151" : "#f9fafb",
              }}
              className="flex-row items-center px-4 py-3 rounded-lg flex-1 ml-2"
            >
              <Ionicons name="settings" size={20} color={colors.primary} />
              <Text style={{ color: colors.text }} className="ml-2">
                Settings
              </Text>
            </TouchableOpacity>
          </View>

          {/* Theme Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              backgroundColor: colors.isDarkMode ? "#374151" : "#f9fafb",
            }}
            className="flex-row items-center justify-between mt-4 px-4 py-3 rounded-lg"
          >
            <View className="flex-row items-center">
              <Ionicons
                name={isDarkMode ? "moon" : "sunny"}
                size={20}
                color={colors.primary}
              />
              <Text style={{ color: colors.text }} className="ml-2">
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Text>
            </View>
            <View
              className={`w-12 h-6 rounded-full flex-row items-center px-1 ${
                isDarkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <View
                className={`w-4 h-4 rounded-full bg-white ${
                  isDarkMode ? "ml-6" : "ml-0"
                }`}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Activities */}
        <View style={{ backgroundColor: colors.card }} className="mt-6 p-4">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold mb-4"
          >
            Recent Activities
          </Text>
          {recentActivities.map((activity) => (
            <View
              key={activity.id}
              className="flex-row items-center py-3 border-b last:border-b-0"
              style={{ borderColor: colors.border }}
            >
              <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
              <View>
                <Text style={{ color: colors.text }}>{activity.action}</Text>
                <Text
                  style={{ color: colors.textSecondary }}
                  className="text-sm"
                >
                  {activity.task} • {activity.time}
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity className="mt-4">
            <Text style={{ color: colors.primary }} className="text-center">
              View All Activities
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="m-6 bg-red-500 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
