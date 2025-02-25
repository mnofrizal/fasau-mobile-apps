import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function ManPowerScreen({ navigation }) {
  const { colors } = useTheme();

  const companies = [
    {
      id: 1,
      name: "PT Maju Jaya Abadi",
      employeeCount: 45,
      department: "Engineering",
      status: "Active",
    },
    {
      id: 2,
      name: "CV Karya Mandiri",
      employeeCount: 30,
      department: "Maintenance",
      status: "Active",
    },
    {
      id: 3,
      name: "PT Sukses Sejahtera",
      employeeCount: 25,
      department: "Operations",
      status: "Active",
    },
    {
      id: 4,
      name: "PT Cemerlang Utama",
      employeeCount: 20,
      department: "Security",
      status: "Active",
    },
    {
      id: 5,
      name: "CV Bersama Maju",
      employeeCount: 15,
      department: "Cleaning",
      status: "Active",
    },
  ];

  const totalEmployees = companies.reduce(
    (sum, company) => sum + company.employeeCount,
    0
  );

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
            Man Power
          </Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>
          Total Employees: {totalEmployees}
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Companies List */}
          {companies.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={{ backgroundColor: colors.card }}
              className="p-4 rounded-lg mb-3 shadow-sm"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text
                    style={{ color: colors.text }}
                    className="text-lg font-semibold"
                  >
                    {company.name}
                  </Text>
                  <Text
                    style={{ color: colors.textSecondary }}
                    className="mt-1"
                  >
                    Department: {company.department}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <View
                      style={{
                        backgroundColor: colors.isDarkMode
                          ? colors.card
                          : "#e0e7ff",
                      }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{
                          color: colors.isDarkMode ? "#818cf8" : "#4f46e5",
                        }}
                      >
                        {company.employeeCount} Employees
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: colors.isDarkMode
                          ? "#064e3b"
                          : "#dcfce7",
                      }}
                      className="px-3 py-1 rounded-full ml-2"
                    >
                      <Text
                        style={{
                          color: colors.isDarkMode ? "#6ee7b7" : "#059669",
                        }}
                      >
                        {company.status}
                      </Text>
                    </View>
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

      {/* Add Company Button */}
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
            <Text className="text-white font-semibold ml-2">Add Company</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
