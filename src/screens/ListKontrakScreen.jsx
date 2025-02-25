import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function ListKontrakScreen({ navigation }) {
  const { colors } = useTheme();

  const contracts = [
    {
      id: 1,
      number: "KTR/2024/001",
      title: "Pemeliharaan Jaringan Listrik",
      vendor: "PT Elektrik Jaya",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      value: "Rp 500.000.000",
      status: "Active",
    },
    {
      id: 2,
      number: "KTR/2024/002",
      title: "Cleaning Service",
      vendor: "CV Bersih Sejahtera",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      value: "Rp 300.000.000",
      status: "Active",
    },
    {
      id: 3,
      number: "KTR/2024/003",
      title: "Security Services",
      vendor: "PT Aman Sentosa",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      value: "Rp 450.000.000",
      status: "Pending",
    },
    {
      id: 4,
      number: "KTR/2023/045",
      title: "Maintenance AC",
      vendor: "PT Dingin Nyaman",
      startDate: "2023-12-01",
      endDate: "2024-11-30",
      value: "Rp 250.000.000",
      status: "Active",
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
            List Kontrak
          </Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>
          Work Contract Management
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
                  <View className="flex-row items-center justify-between">
                    <Text
                      style={{ color: colors.text }}
                      className="text-lg font-semibold flex-1 mr-3"
                    >
                      {contract.title}
                    </Text>
                    <View
                      style={{
                        backgroundColor: getStatusColor(contract.status).bg,
                      }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{ color: getStatusColor(contract.status).text }}
                        className="text-sm"
                      >
                        {contract.status}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{ color: colors.textSecondary }}
                    className="mt-1"
                  >
                    Contract No: {contract.number}
                  </Text>
                  <Text style={{ color: colors.textSecondary }}>
                    Vendor: {contract.vendor}
                  </Text>
                  <View className="mt-2 flex-row justify-between">
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
            <Text className="text-white font-semibold ml-2">Add Contract</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
