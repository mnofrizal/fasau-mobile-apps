import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function BeyondKwhScreen({ navigation }) {
  const { colors } = useTheme();

  const contracts = [
    {
      id: 1,
      number: "BKW/2024/001",
      type: "Land Rental",
      location: "Jalan Raya Utama No. 123",
      owner: "PT Tanah Makmur",
      startDate: "2024-01-01",
      endDate: "2029-12-31",
      value: "Rp 100.000.000/year",
      status: "Active",
      area: "500 m²",
    },
    {
      id: 2,
      number: "BKW/2024/002",
      type: "Building Rental",
      location: "Komplek Industri Blok A5",
      owner: "CV Properti Jaya",
      startDate: "2024-03-01",
      endDate: "2026-02-28",
      value: "Rp 150.000.000/year",
      status: "Active",
      area: "200 m²",
    },
    {
      id: 3,
      number: "BKW/2024/003",
      type: "Land Rental",
      location: "Jalan Industri Raya No. 45",
      owner: "PT Lahan Sentosa",
      startDate: "2024-06-01",
      endDate: "2028-05-31",
      value: "Rp 85.000.000/year",
      status: "Pending",
      area: "350 m²",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return colors.isDarkMode
          ? { bg: "#064e3b", text: "#6ee7b7" }
          : { bg: "#dcfce7", text: "#059669" };
      case "Pending":
        return colors.isDarkMode
          ? { bg: "#78350f", text: "#fbbf24" }
          : { bg: "#fef3c7", text: "#d97706" };
      default:
        return colors.isDarkMode
          ? { bg: "#7f1d1d", text: "#fca5a5" }
          : { bg: "#fee2e2", text: "#dc2626" };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Land Rental":
        return "earth";
      case "Building Rental":
        return "business";
      default:
        return "business";
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
            Beyond kWh
          </Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>
          Beyond kWh Contract Management
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Contracts List */}
          {contracts.map((contract) => (
            <TouchableOpacity
              key={contract.id}
              style={{ backgroundColor: colors.card }}
              className="p-4 rounded-lg mb-3 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View
                      style={{
                        backgroundColor: colors.isDarkMode
                          ? colors.card
                          : `${colors.primary}15`,
                      }}
                      className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    >
                      <Ionicons
                        name={getTypeIcon(contract.type)}
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        style={{ color: colors.text }}
                        className="text-lg font-semibold"
                      >
                        {contract.type}
                      </Text>
                      <Text style={{ color: colors.textSecondary }}>
                        {contract.number}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: getStatusColor(contract.status).bg,
                      }}
                      className="px-3 py-1 rounded-full ml-2"
                    >
                      <Text
                        style={{ color: getStatusColor(contract.status).text }}
                        className="text-sm"
                      >
                        {contract.status}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-2">
                    <Text style={{ color: colors.text }} numberOfLines={2}>
                      Location:{" "}
                      <Text style={{ color: colors.textSecondary }}>
                        {contract.location}
                      </Text>
                    </Text>
                    <Text style={{ color: colors.text }}>
                      Owner:{" "}
                      <Text style={{ color: colors.textSecondary }}>
                        {contract.owner}
                      </Text>
                    </Text>
                    <Text style={{ color: colors.text }}>
                      Area:{" "}
                      <Text style={{ color: colors.textSecondary }}>
                        {contract.area}
                      </Text>
                    </Text>
                    <View className="flex-row justify-between mt-2">
                      <Text style={{ color: colors.text }}>
                        Period:{" "}
                        <Text style={{ color: colors.textSecondary }}>
                          {contract.startDate} - {contract.endDate}
                        </Text>
                      </Text>
                      <Text
                        style={{ color: colors.primary }}
                        className="font-semibold"
                      >
                        {contract.value}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Contract Button */}
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
            <Text className="text-white font-semibold ml-2">
              Add Beyond kWh Contract
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
