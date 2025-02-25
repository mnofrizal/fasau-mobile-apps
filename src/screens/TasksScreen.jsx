import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import useTaskStore from "../store/taskStore";
import { TaskStatus } from "../services/taskService";
import { format } from "date-fns";

export default function TasksScreen({ navigation }) {
  const { colors } = useTheme();
  const { tasks, isLoading, error, fetchTasks } = useTaskStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const statusFilters = [
    { label: "All", value: null },
    { label: "Backlog", value: TaskStatus.BACKLOG },
    { label: "In Progress", value: TaskStatus.INPROGRESS },
    { label: "Completed", value: TaskStatus.COMPLETED },
    { label: "Canceled", value: TaskStatus.CANCEL },
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskReport?.pelapor
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus = !selectedStatus || task.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, selectedStatus]);

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center py-8">
      <Ionicons
        name="document-text-outline"
        size={48}
        color={colors.textSecondary}
      />
      <Text style={{ color: colors.text }} className="text-lg font-medium mt-4">
        No tasks found
      </Text>
      <Text style={{ color: colors.textSecondary }} className="mt-2">
        {searchQuery || selectedStatus
          ? "Try adjusting your filters"
          : "Pull to refresh"}
      </Text>
    </View>
  );

  const renderTask = ({ item: task }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TaskDetail", { taskId: task.id })}
      style={{ backgroundColor: colors.card }}
      className="mx-4 mb-3 p-4 rounded-xl"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text
            style={{ color: colors.text }}
            className="text-lg font-semibold mb-1"
          >
            {task.title}
          </Text>
          <Text
            style={{ color: colors.textSecondary }}
            className="text-sm mb-2"
          >
            {task.taskReport?.pelapor} • {task.category}
          </Text>
          <View className="flex-row items-center">
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
        <Text style={{ color: colors.textSecondary }} className="text-xs">
          {format(new Date(task.createdAt), "MMM d, yyyy")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <SafeAreaView
        style={{ backgroundColor: colors.background }}
        className="flex-1 justify-center items-center p-4"
      >
        <Text
          style={{ color: colors.text }}
          className="text-lg text-center mb-4"
        >
          {error}
        </Text>
        <TouchableOpacity
          onPress={fetchTasks}
          style={{ backgroundColor: colors.primary }}
          className="px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      {/* Fixed Header */}
      <View>
        <View className="flex-row justify-between items-center space-x-2 p-4">
          <View
            style={{
              backgroundColor: colors.isDarkMode ? "#1f2937" : "#f8fafc",
              borderColor: colors.border,
            }}
            className="flex-row items-center px-4  rounded-full border flex-1"
          >
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search tasks..."
              placeholderTextColor={colors.textSecondary}
              style={{ color: colors.text }}
              className="flex-1 ml-2 text-base"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              /* Add new task */
            }}
            style={{ backgroundColor: colors.primary }}
            className="p-2.5 rounded-full"
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Status Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 mb-4 py-1"
        >
          {statusFilters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedStatus(filter.value)}
              style={{
                backgroundColor:
                  selectedStatus === filter.value
                    ? colors.primary
                    : colors.isDarkMode
                    ? "#1f2937"
                    : "#f8fafc",
              }}
              className="px-4 py-2 rounded-full mr-2"
            >
              <Text
                style={{
                  color:
                    selectedStatus === filter.value
                      ? "white"
                      : colors.textSecondary,
                }}
                className="font-medium"
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading && filteredTasks.length === 0 ? (
        <View className="flex-1 justify-center items-center py-8">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.textSecondary }} className="mt-4">
            Loading tasks...
          </Text>
        </View>
      ) : (
        <FlashList
          data={filteredTasks}
          renderItem={renderTask}
          estimatedItemSize={100}
          ListEmptyComponent={renderEmpty}
          onRefresh={fetchTasks}
          refreshing={isLoading}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}
