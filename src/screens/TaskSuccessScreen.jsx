import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function TaskSuccessScreen({ navigation }) {
  const { colors } = useTheme();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Main");
      return true; // Prevents default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [navigation]);

  const handleGoHome = () => {
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <View
        style={{ backgroundColor: colors.card }}
        className="flex-1 items-center justify-center p-8"
      >
        <View
          style={{ backgroundColor: colors.isDarkMode ? "#1e3a8a" : "#dbeafe" }}
          className="w-24 h-24 rounded-full items-center justify-center mb-6"
        >
          <Ionicons
            name="checkmark-circle"
            size={64}
            color={colors.isDarkMode ? "#60a5fa" : "#3b82f6"}
          />
        </View>

        <Text
          style={{ color: colors.text }}
          className="text-2xl font-bold text-center mb-3"
        >
          Tugas Selesai! 🎉
        </Text>

        <Text
          style={{ color: colors.textSecondary }}
          className="text-center mb-8 text-base"
        >
          Kerja bagus! Tugas Anda telah ditandai sebagai selesai dan detailnya
          telah disimpan.
        </Text>

        <TouchableOpacity
          onPress={handleGoHome}
          style={{
            backgroundColor: colors.isDarkMode ? "#1e3a8a" : "#3b82f6",
          }}
          className="w-full py-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Kembali ke Beranda
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
