import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function InventoryScreen({ navigation }) {
  const { colors } = useTheme();

  const inventoryItems = [
    {
      id: 1,
      name: "Safety Helmet",
      stock: 50,
      unit: "pcs",
      location: "Warehouse A",
      status: "Available",
    },
    {
      id: 2,
      name: "Work Gloves",
      stock: 100,
      unit: "pairs",
      location: "Warehouse B",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Safety Boots",
      stock: 30,
      unit: "pairs",
      location: "Warehouse A",
      status: "Available",
    },
    {
      id: 4,
      name: "Safety Vest",
      stock: 20,
      unit: "pcs",
      location: "Warehouse C",
      status: "Low Stock",
    },
  ];

  const getStatusColor = (status) => {
    return status === "Available"
      ? colors.isDarkMode
        ? "text-green-400"
        : "text-green-600"
      : colors.isDarkMode
      ? "text-orange-400"
      : "text-orange-600";
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
            Inventory
          </Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>
          Manage and track inventory items
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Inventory List */}
          {inventoryItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{ backgroundColor: colors.card }}
              className="p-4 rounded-lg mb-3 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View>
                  <Text
                    style={{ color: colors.text }}
                    className="text-lg font-semibold"
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{ color: colors.textSecondary }}
                    className="mt-1"
                  >
                    Stock: {item.stock} {item.unit}
                  </Text>
                  <Text style={{ color: colors.textSecondary }}>
                    Location: {item.location}
                  </Text>
                </View>
                <Text className={`${getStatusColor(item.status)}`}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Item Button */}
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
            <Text className="text-white font-semibold ml-2">Add New Item</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
