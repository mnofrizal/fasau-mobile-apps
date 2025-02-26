import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  Animated,
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
  const [scrollY] = useState(new Animated.Value(0));

  const headerHeight = 200;
  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.5, 1, 0.9],
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight - 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

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

  const renderHeader = () => (
    <Animated.View
      style={{
        transform: [{ scale: headerScale }],
        opacity: headerOpacity,
        height: headerHeight,
        backgroundColor: colors.card,
        padding: 20,
        justifyContent: "flex-end",
      }}
    >
      <View className="flex-row items-center space-x-2 mb-4">
        <View
          className={`px-3 py-1 rounded-full ${getCategoryColor(
            task.category
          )}`}
        >
          <Text
            className={`text-sm font-medium ${getCategoryColor(task.category)}`}
          >
            {task.category}
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full ${getStatusColor(task.status)}`}
        >
          <Text
            className={`text-sm font-medium ${getStatusColor(task.status)}`}
          >
            {task.status}
          </Text>
        </View>
        {task.isUrgent && (
          <View className="px-3 py-1 rounded-full bg-red-500">
            <Text className="text-sm font-medium text-white">Urgent</Text>
          </View>
        )}
      </View>
      <Text style={{ color: colors.text }} className="text-3xl font-bold">
        {task.title}
      </Text>
    </Animated.View>
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      {/* Back Button */}
      <View className="absolute top-0 left-0 z-10 m-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: colors.card }}
          className="p-2 rounded-full shadow-md"
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        className="flex-1"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {renderHeader()}

        {/* Content Cards */}
        {/* Task Info Card */}
        <View
          style={{ backgroundColor: colors.card }}
          className="mx-4 my-4 p-5 rounded-xl shadow-sm"
        >
          {/* Reporter Info */}
          <View
            className="flex-row items-center mb-4 pb-4 border-b"
            style={{ borderColor: colors.border }}
          >
            <View className="h-10 w-10 rounded-full bg-blue-500 items-center justify-center">
              <Ionicons name="person" size={20} color="white" />
            </View>
            <View className="ml-3">
              <Text style={{ color: colors.textSecondary }} className="text-sm">
                Dilaporkan oleh
              </Text>
              <Text style={{ color: colors.text }} className="font-semibold">
                {task.taskReport?.pelapor}
              </Text>
            </View>
            <View className="ml-auto">
              <Text
                style={{ color: colors.textSecondary }}
                className="text-right text-sm"
              >
                {format(new Date(task.createdAt), "dd MMM yyyy")}
              </Text>
            </View>
          </View>

          {/* Description */}
          {task.keterangan && (
            <View className="mb-4">
              <Text
                style={{ color: colors.text }}
                className="text-base font-semibold mb-2"
              >
                Keterangan
              </Text>
              <Text
                style={{ color: colors.textSecondary }}
                className="text-base leading-6"
              >
                {task.keterangan}
              </Text>
            </View>
          )}

          {/* Evidence Image */}
          {task.taskReport?.evidence && (
            <TouchableOpacity
              onPress={() => setImageModalVisible(true)}
              className="mt-2"
            >
              <Image
                source={{ uri: task.taskReport?.evidence }}
                style={{ width: "100%", height: 200 }}
                className="rounded-lg"
              />
              <View className="absolute bottom-2 right-2 bg-black/50 px-3 py-1 rounded-full">
                <Text className="text-white text-xs">View Full</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Action Card */}
        {task.taskReport?.tindakan && (
          <View
            style={{ backgroundColor: colors.card }}
            className="mx-4 mb-4 p-5 rounded-xl shadow-sm"
          >
            <View className="flex-row items-center mb-3">
              <Ionicons name="construct" size={20} color={colors.primary} />
              <Text
                style={{ color: colors.text }}
                className="ml-2 text-base font-semibold"
              >
                Tindakan
              </Text>
            </View>
            <Text
              style={{ color: colors.textSecondary }}
              className="text-base leading-6"
            >
              {task.taskReport?.tindakan}
            </Text>
          </View>
        )}

        {/* Status History Card */}
        <View
          style={{ backgroundColor: colors.card }}
          className="mx-4 mb-4 p-5 rounded-xl shadow-sm"
        >
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold mb-4"
          >
            Riwayat Status
          </Text>
          {!task.statusHistory?.length ? (
            <View className="py-8 items-center">
              <Ionicons
                name="time-outline"
                size={40}
                color={colors.textSecondary}
              />
              <Text
                style={{ color: colors.textSecondary }}
                className="mt-2 text-base"
              >
                No status history available
              </Text>
            </View>
          ) : (
            task.statusHistory
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((history, index) => (
                <View key={index} className="mb-4 last:mb-0">
                  <View className="flex-row">
                    {/* Status Badge */}
                    <View className="w-2 rounded-full bg-blue-500 mr-4" />
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-1">
                        <Text
                          style={{ color: colors.text }}
                          className="font-semibold"
                        >
                          {history.status}
                        </Text>
                        <Text
                          style={{ color: colors.textSecondary }}
                          className="text-xs"
                        >
                          {format(
                            new Date(history.createdAt),
                            "dd MMM yyyy, HH:mm"
                          )}
                        </Text>
                      </View>
                      {history.notes && (
                        <Text
                          style={{ color: colors.textSecondary }}
                          className="mb-1"
                        >
                          {history.notes}
                        </Text>
                      )}
                      <Text
                        style={{ color: colors.textSecondary }}
                        className="text-xs"
                      >
                        Changed by {history.changedBy}
                      </Text>
                    </View>
                  </View>
                  {index !== task.statusHistory.length - 1 && (
                    <View
                      className="w-0.5 h-4 bg-blue-500/20 ml-1"
                      style={{ marginVertical: 4 }}
                    />
                  )}
                </View>
              ))
          )}
        </View>
      </Animated.ScrollView>

      {/* Action Buttons */}
      {task.status !== "COMPLETED" && task.status !== "CANCEL" && (
        <View
          style={{ backgroundColor: colors.card }}
          className="p-4 shadow-lg"
        >
          <View className="flex-row space-x-4">
            <TouchableOpacity
              className="flex-1 rounded-xl bg-red-500/10 py-4"
              onPress={() => {
                /* Handle cancel task */
              }}
            >
              <Text className="text-center font-semibold text-red-500">
                Batalkan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 rounded-xl bg-blue-500 py-4"
              onPress={() =>
                navigation.navigate("TaskComplete", { taskId: task.id })
              }
            >
              <Text className="text-center font-semibold text-white">
                Selesaikan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
