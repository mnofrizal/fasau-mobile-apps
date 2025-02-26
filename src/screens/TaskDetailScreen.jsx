import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import useTaskStore from "../store/taskStore";
import { format } from "date-fns";
import { TaskCategory } from "../services/taskService";

export default function TaskDetailScreen({ route, navigation }) {
  const { colors } = useTheme();
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const task = useTaskStore((state) => state.getTaskById(route.params?.taskId));
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  if (!task) {
    return (
      <SafeAreaView
        style={{ backgroundColor: colors.background }}
        className="flex-1 items-center justify-center"
      >
        <Text style={{ color: colors.text }} className="text-lg">
          Task not found
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-4 rounded-lg bg-blue-500 px-6 py-3"
        >
          <Text className="font-semibold text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return colors.isDarkMode
          ? "bg-green-700 text-white"
          : "bg-green-100 text-green-800";
      case "INPROGRESS":
        return colors.isDarkMode
          ? "bg-blue-700 text-white"
          : "bg-blue-100 text-blue-800";
      case "CANCEL":
        return colors.isDarkMode
          ? "bg-red-700 text-white"
          : "bg-red-100 text-red-800";
      case "BACKLOG":
        return colors.isDarkMode
          ? "bg-orange-700 text-white"
          : "bg-orange-100 text-orange-800";
      default:
        return colors.isDarkMode
          ? "bg-slate-700 text-slate-300"
          : "bg-slate-100 text-slate-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case TaskCategory.TASK:
        return colors.isDarkMode
          ? "bg-red-700 text-white"
          : "bg-red-100 text-red-800";
      case TaskCategory.TEMUAN:
        return colors.isDarkMode
          ? "bg-yellow-700 text-white"
          : "bg-yellow-100 text-yellow-800";
      case TaskCategory.LAPORAN:
        return colors.isDarkMode
          ? "bg-teal-700 text-white"
          : "bg-teal-100 text-teal-800";
      default:
        return colors.isDarkMode
          ? "bg-pink-700 text-white"
          : "bg-pink-100 text-pink-800";
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
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2"
            >
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
            <View className="flex-row items-center space-x-2">
              <View
                className={`px-3 py-1 rounded-full ${getCategoryColor(
                  task.category
                )}`}
              >
                <Text
                  className={`font-medium ${getCategoryColor(task.category)}`}
                >
                  {task.category}
                </Text>
              </View>
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
          </View>

          <Text
            style={{ color: colors.text }}
            className="mt-3 text-2xl font-bold"
          >
            {task.title}
          </Text>
        </View>

        {/* Task Details */}
        <View style={{ backgroundColor: colors.card }} className="mt-3 p-4">
          <View className="flex-row justify-between">
            {task.keterangan && (
              <View className="flex-1">
                <Text
                  style={{ color: colors.text }}
                  className="mb-2 text-base font-semibold"
                >
                  Keterangan
                </Text>
                <Text
                  style={{ color: colors.textSecondary }}
                  className="text-sm"
                >
                  {task.keterangan}
                </Text>
              </View>
            )}
            {task.taskReport?.evidence && (
              <View className="">
                <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                  <Image
                    source={{ uri: task.taskReport?.evidence }}
                    style={{ width: 100, height: 100 }}
                    className="rounded"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {task.isUrgent && (
            <View
              style={{ backgroundColor: "#fee2e2" }}
              className="mb-4 rounded-lg p-3"
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

        <View
          style={{ backgroundColor: colors.card }}
          className="border-t border-t-slate-700 p-4"
        >
          <View className="">
            <Text
              style={{ color: colors.text }}
              className="mb-2 text-base font-semibold"
            >
              Dilaporkan Oleh
            </Text>
            <View className="flex-row items-center">
              <Ionicons
                name="person-outline"
                size={15}
                color={colors.textSecondary}
              />
              <Text style={{ color: colors.textSecondary }} className="ml-2">
                {task.taskReport?.pelapor}
              </Text>
            </View>
            <View className="mt-2 flex-row items-center">
              <Ionicons
                name="calendar-outline"
                size={15}
                color={colors.textSecondary}
              />
              <Text style={{ color: colors.textSecondary }} className="ml-2">
                {format(new Date(task.createdAt), "PPP")}
              </Text>
            </View>
          </View>
        </View>

        {task.taskReport?.tindakan && (
          <View
            style={{ backgroundColor: colors.card }}
            className="border-t border-t-slate-700 p-4"
          >
            <View className="mb-4">
              <Text
                style={{ color: colors.text }}
                className="mb-2 text-base font-semibold"
              >
                Tindakan
              </Text>
              <View className="flex-row items-center">
                <Text style={{ color: colors.textSecondary }} className="ml-2">
                  {task.taskReport?.tindakan}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Status History */}
        <View style={{ backgroundColor: colors.card }} className="mt-3 p-4">
          <Text
            style={{ color: colors.text }}
            className="mb-4 text-lg font-semibold"
          >
            Riwayat Status
          </Text>
          {!task.statusHistory?.length ? (
            <Text
              style={{ color: colors.textSecondary }}
              className="py-4 text-center"
            >
              No status history available
            </Text>
          ) : (
            task.statusHistory
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((history, index) => (
                <View
                  key={index}
                  style={{ borderColor: colors.border }}
                  className={`pb-4 ${
                    index !== task.statusHistory.length - 1
                      ? "border-l ml-2"
                      : "ml-2"
                  }`}
                >
                  <View className="flex-row items-start">
                    <View
                      className={`w-4 h-4 rounded-full ${
                        colors.isDarkMode ? "bg-slate-700" : "bg-slate-200"
                      } -ml-2`}
                    />
                    <View className="ml-4 flex-1">
                      <View
                        className={`rounded ${
                          colors.isDarkMode ? "bg-slate-700" : "bg-slate-200"
                        } px-2 py-1 w-full`}
                      >
                        <Text
                          className={`text-sm font-medium ${
                            colors.isDarkMode ? "text-white" : ""
                          }`}
                        >
                          {history.status}
                        </Text>
                      </View>
                      <Text
                        style={{ color: colors.textSecondary }}
                        className="mt-1 w-full text-sm"
                      >
                        {history.notes}
                      </Text>
                      <View className="mt-1 w-full flex-row items-center">
                        <Text
                          style={{ color: colors.textSecondary }}
                          className="text-xs"
                        >
                          {format(new Date(history.createdAt), "PPp")}
                        </Text>
                        <Text
                          style={{ color: colors.textSecondary }}
                          className="ml-2 text-xs"
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
        className="border-t p-4"
      >
        {task.status !== "COMPLETED" && task.status !== "CANCEL" && (
          <View className="flex-row space-x-4">
            <TouchableOpacity
              className="flex-1 rounded-lg bg-red-500 py-3"
              onPress={() => {
                /* Handle cancel task */
              }}
            >
              <Text className="text-center font-semibold text-white">
                Batalkan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 rounded-lg bg-blue-500 py-3"
              onPress={() =>
                navigation.navigate("TaskComplete", { taskId: task.id })
              }
            >
              <Text className="text-center font-semibold text-white">
                Selesaikan
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setImageModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              zIndex: 1,
            }}
            onPress={() => setImageModalVisible(false)}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <View style={{ width: windowWidth * 0.9, alignItems: "center" }}>
            <Image
              source={{ uri: task.taskReport?.evidence }}
              style={{
                width: windowWidth * 0.9,
                height: windowHeight * 0.6,
                resizeMode: "contain",
              }}
            />
            {task.keterangan && (
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  padding: 16,
                  borderRadius: 8,
                  marginTop: 16,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    marginBottom: 8,
                    fontWeight: "600",
                  }}
                >
                  Keterangan
                </Text>
                <Text style={{ color: "white", fontSize: 14 }}>
                  {task.keterangan}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
