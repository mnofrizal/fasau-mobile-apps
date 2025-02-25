import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function InventarisScreen({ navigation }) {
  const { colors } = useTheme();

  const assets = [
    {
      id: 1,
      name: "Generator Set 500KVA",
      code: "GEN-001",
      location: "Power House 1",
      condition: "Good",
      lastMaintenance: "2024-01-15",
    },
    {
      id: 2,
      name: "Air Conditioning Unit",
      code: "AC-045",
      location: "Main Office",
      condition: "Needs Service",
      lastMaintenance: "2023-12-20",
    },
    {
      id: 3,
      name: "Water Pump System",
      code: "WP-102",
      location: "Pump Room",
      condition: "Good",
      lastMaintenance: "2024-02-01",
    },
    {
      id: 4,
      name: "Forklift 3-Ton",
      code: "FL-007",
      location: "Warehouse",
      condition: "Under Repair",
      lastMaintenance: "2024-01-30",
    },
    {
      id: 5,
      name: "CCTV System",
      code: "SEC-012",
      location: "Security Room",
      condition: "Good",
      lastMaintenance: "2024-02-10",
    },
  ];

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Good":
        return colors.isDarkMode
          ? { bg: "#064e3b", text: "#6ee7b7" }
          : { bg: "#dcfce7", text: "#059669" };
      case "Needs Service":
        return colors.isDarkMode
          ? { bg: "#78350f", text: "#fbbf24" }
          : { bg: "#fef3c7", text: "#d97706" };
      default:
        return colors.isDarkMode
          ? { bg: "#7f1d1d", text: "#fca5a5" }
          : { bg: "#fee2e2", text: "#dc2626" };
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
            Inventaris
          </Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>
          Asset Management System
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Assets List */}
          {assets.map((asset) => (
            <TouchableOpacity
              key={asset.id}
              style={{ backgroundColor: colors.card }}
              className="p-4 rounded-lg mb-3 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text
                    style={{ color: colors.text }}
                    className="text-lg font-semibold"
                  >
                    {asset.name}
                  </Text>
                  <Text
                    style={{ color: colors.textSecondary }}
                    className="mt-1"
                  >
                    Code: {asset.code}
                  </Text>
                  <Text style={{ color: colors.textSecondary }}>
                    Location: {asset.location}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <View
                      style={{
                        backgroundColor: getConditionColor(asset.condition).bg,
                      }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{
                          color: getConditionColor(asset.condition).text,
                        }}
                      >
                        {asset.condition}
                      </Text>
                    </View>
                    <Text
                      style={{ color: colors.textSecondary }}
                      className="ml-3"
                    >
                      Last Service: {asset.lastMaintenance}
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

      {/* Add Asset Button */}
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
            <Text className="text-white font-semibold ml-2">Add Asset</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
