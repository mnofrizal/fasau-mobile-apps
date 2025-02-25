import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function SepedaScreen({ navigation }) {
  const { colors } = useTheme();

  const bicycles = [
    {
      id: 1,
      number: "SPD-001",
      user: "Ahmad Supriadi",
      department: "Engineering",
      status: "In Use",
      lastInspection: "2024-02-15",
    },
    {
      id: 2,
      number: "SPD-002",
      user: "Budi Santoso",
      department: "Maintenance",
      status: "In Use",
      lastInspection: "2024-02-10",
    },
    {
      id: 3,
      number: "SPD-003",
      user: "Available",
      department: "-",
      status: "Available",
      lastInspection: "2024-02-20",
    },
    {
      id: 4,
      number: "SPD-004",
      user: "Dedi Kurniawan",
      department: "Operations",
      status: "In Use",
      lastInspection: "2024-02-12",
    },
    {
      id: 5,
      number: "SPD-005",
      user: "Under Repair",
      department: "-",
      status: "Maintenance",
      lastInspection: "2024-02-01",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Use":
        return colors.isDarkMode
          ? { bg: "#064e3b", text: "#6ee7b7" }
          : { bg: "#dcfce7", text: "#059669" };
      case "Available":
        return colors.isDarkMode
          ? { bg: "#1e3a8a", text: "#93c5fd" }
          : { bg: "#dbeafe", text: "#2563eb" };
      default:
        return colors.isDarkMode
          ? { bg: "#78350f", text: "#fbbf24" }
          : { bg: "#fef3c7", text: "#d97706" };
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      {/* Header */}
      <View style={{ backgroundColor: colors.card }} className="p-4">
        <View className="flex-row items-center mb-2">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text
            style={{ color: colors.text }}
            className="text-xl font-semibold ml-2"
          >
            Sepeda
          </Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>
          Company Bicycle Management
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Bicycles List */}
          {bicycles.map((bicycle) => (
            <TouchableOpacity
              key={bicycle.id}
              style={{ backgroundColor: colors.card }}
              className="p-4 rounded-lg mb-3 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text
                      style={{ color: colors.text }}
                      className="text-lg font-semibold"
                    >
                      {bicycle.number}
                    </Text>
                    <View
                      style={{
                        backgroundColor: getStatusColor(bicycle.status).bg,
                      }}
                      className="px-3 py-1 rounded-full ml-3"
                    >
                      <Text
                        style={{ color: getStatusColor(bicycle.status).text }}
                        className="text-sm"
                      >
                        {bicycle.status}
                      </Text>
                    </View>
                  </View>
                  <View className="mt-2">
                    <Text style={{ color: colors.text }}>
                      User:{" "}
                      <Text
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        {bicycle.user}
                      </Text>
                    </Text>
                    <Text style={{ color: colors.text }}>
                      Department:{" "}
                      <Text style={{ color: colors.textSecondary }}>
                        {bicycle.department}
                      </Text>
                    </Text>
                    <Text
                      style={{ color: colors.textSecondary }}
                      className="mt-1 text-sm"
                    >
                      Last Inspection: {bicycle.lastInspection}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="p-2">
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Bicycle Button */}
      <View
        className="p-4 border-t"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: colors.primary }}
          className="py-3 rounded-lg"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="add" size={24} color="white" />
            <Text className="text-white font-semibold ml-2">Add Bicycle</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
