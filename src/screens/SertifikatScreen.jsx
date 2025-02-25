import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function SertifikatScreen({ navigation }) {
  const { colors } = useTheme();

  const certificates = [
    {
      id: 1,
      number: "SHM-001-2024",
      type: "Sertifikat Hak Milik",
      location: "Jalan Raya Utama No. 123",
      area: "500 m2",
      issuedDate: "2024-01-15",
      expiryDate: "None",
      status: "Active",
      description: "Sertifikat tanah untuk area kantor utama",
    },
    {
      id: 2,
      number: "ISO-9001-2023",
      type: "ISO Certificate",
      location: "Main Office",
      area: "N/A",
      issuedDate: "2023-06-20",
      expiryDate: "2026-06-19",
      status: "Active",
      description: "Quality Management System Certification",
    },
    {
      id: 3,
      number: "IMB-2024-003",
      type: "Izin Mendirikan Bangunan",
      location: "Komplek Industri Blok B8",
      area: "350 m2",
      issuedDate: "2024-02-01",
      expiryDate: "None",
      status: "Processing",
      description: "IMB untuk pembangunan gedung baru",
    },
    {
      id: 4,
      number: "K3-2023-045",
      type: "Safety Certificate",
      location: "All Facilities",
      area: "N/A",
      issuedDate: "2023-12-01",
      expiryDate: "2024-11-30",
      status: "Active",
      description: "Health and Safety Management System",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return colors.isDarkMode
          ? { bg: "#064e3b", text: "#6ee7b7" }
          : { bg: "#dcfce7", text: "#059669" };
      case "Processing":
        return colors.isDarkMode
          ? { bg: "#1e3a8a", text: "#93c5fd" }
          : { bg: "#dbeafe", text: "#2563eb" };
      default:
        return colors.isDarkMode
          ? { bg: "#78350f", text: "#fbbf24" }
          : { bg: "#fef3c7", text: "#d97706" };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Sertifikat Hak Milik":
        return "document-text";
      case "ISO Certificate":
        return "shield-checkmark";
      case "Izin Mendirikan Bangunan":
        return "business";
      case "Safety Certificate":
        return "fitness";
      default:
        return "document";
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
            Sertifikat
          </Text>
        </View>
        <Text style={{ color: colors.textSecondary }}>
          Certificate Management System
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Certificates List */}
          {certificates.map((certificate) => (
            <TouchableOpacity
              key={certificate.id}
              style={{ backgroundColor: colors.card }}
              className="p-4 rounded-lg mb-3 shadow-sm"
            >
              <View className="flex-row items-start">
                <View
                  style={{
                    backgroundColor: colors.isDarkMode
                      ? colors.card
                      : `${colors.primary}15`,
                  }}
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                >
                  <Ionicons
                    name={getTypeIcon(certificate.type)}
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text
                      style={{ color: colors.text }}
                      className="text-lg font-semibold flex-1 mr-3"
                    >
                      {certificate.type}
                    </Text>
                    <View
                      style={{
                        backgroundColor: getStatusColor(certificate.status).bg,
                      }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{
                          color: getStatusColor(certificate.status).text,
                        }}
                        className="text-sm"
                      >
                        {certificate.status}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{ color: colors.textSecondary }}
                    className="mt-1"
                  >
                    {certificate.number}
                  </Text>
                  <Text
                    style={{ color: colors.textSecondary }}
                    numberOfLines={2}
                    className="mt-1"
                  >
                    {certificate.description}
                  </Text>
                  <View className="mt-3 space-y-1">
                    {certificate.location !== "N/A" && (
                      <Text style={{ color: colors.text }}>
                        Location:{" "}
                        <Text style={{ color: colors.textSecondary }}>
                          {certificate.location}
                        </Text>
                      </Text>
                    )}
                    {certificate.area !== "N/A" && (
                      <Text style={{ color: colors.text }}>
                        Area:{" "}
                        <Text style={{ color: colors.textSecondary }}>
                          {certificate.area}
                        </Text>
                      </Text>
                    )}
                    <Text style={{ color: colors.text }}>
                      Issued Date:{" "}
                      <Text style={{ color: colors.textSecondary }}>
                        {certificate.issuedDate}
                      </Text>
                    </Text>
                    <Text style={{ color: colors.text }}>
                      Expiry Date:{" "}
                      <Text style={{ color: colors.textSecondary }}>
                        {certificate.expiryDate}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add Certificate Button */}
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
              Add Certificate
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
