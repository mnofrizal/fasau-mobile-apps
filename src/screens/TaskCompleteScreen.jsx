import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { taskService, TaskStatus } from "../services/taskService";
import { cloudinaryService } from "../services/cloudinaryService";
import useAuthStore from "../store/authStore";

export default function TaskCompleteScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { taskId, title } = route.params;

  const requestPermission = async (type) => {
    try {
      if (type === "camera") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        console.log("Camera permission status:", status);
        if (status !== "granted") {
          Alert.alert(
            "Izin Diperlukan",
            "Mohon izinkan akses kamera untuk mengambil foto",
            [
              { text: "Batal", style: "cancel" },
              {
                text: "Buka Pengaturan",
                onPress: () => ImagePicker.openSettings(),
              },
            ]
          );
          return false;
        }
      } else {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log("Media Library permission status:", status);
        if (status !== "granted") {
          Alert.alert(
            "Izin Diperlukan",
            "Mohon izinkan akses galeri untuk memilih foto",
            [
              { text: "Batal", style: "cancel" },
              {
                text: "Buka Pengaturan",
                onPress: () => ImagePicker.openSettings(),
              },
            ]
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error(`Error requesting ${type} permission:`, error);
      Alert.alert("Error", `Gagal meminta izin ${type}: ${error.message}`);
      return false;
    }
  };

  const pickImage = async () => {
    try {
      if (!(await requestPermission("gallery"))) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log("Image picker result:", result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Gagal memilih gambar: " + error.message);
    }
  };

  const takePhoto = async () => {
    try {
      if (!(await requestPermission("camera"))) return;

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log("Camera result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error Kamera", "Gagal mengambil foto: " + error.message, [
        { text: "OK" },
      ]);
    }
  };

  const handleSubmit = async () => {
    if (!notes.trim()) {
      Alert.alert("Diperlukan", "Mohon tambahkan catatan penyelesaian");
      return;
    }

    try {
      setIsSubmitting(true);

      let imageUrl = null;
      if (image) {
        // Only upload image if one was selected
        imageUrl = await cloudinaryService.uploadImage(image);
        console.log("Image uploaded successfully:", imageUrl);
      }

      // Update the task with or without image URL
      await taskService.updateTask(taskId, {
        title,
        status: TaskStatus.COMPLETED,
        notes: notes,
        changedBy: user.username,
        evidenceDone: imageUrl,
      });

      navigation.navigate("TaskSuccess");
    } catch (error) {
      console.error("Error completing task:", error);
      Alert.alert(
        "Error",
        error.message || "Gagal menyelesaikan tugas. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <View style={{ backgroundColor: colors.card }} className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center mb-6">
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
            Selesaikan Tugas
          </Text>
        </View>

        {/* Notes Input */}
        <Text
          style={{ color: colors.text }}
          className="text-lg font-semibold mb-2"
        >
          Catatan Penyelesaian
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Tambahkan catatan tentang penyelesaian tugas..."
          placeholderTextColor={colors.textSecondary}
          style={{
            backgroundColor: colors.isDarkMode ? "#1e293b" : "#f8fafc",
            color: colors.text,
            borderColor: colors.border,
          }}
          className="p-3 rounded-lg border mb-6 text-base min-h-[120px]"
        />

        {/* Image Upload/Camera Section */}
        <Text
          style={{ color: colors.text }}
          className="text-lg font-semibold mb-2"
        >
          Lampiran
        </Text>
        {!image && (
          <View className="flex-row mb-6">
            <TouchableOpacity
              onPress={pickImage}
              style={{
                backgroundColor: colors.isDarkMode ? "#1e293b" : "#f8fafc",
                borderColor: colors.border,
              }}
              className="flex-1 mr-2 border rounded-lg p-4 items-center"
            >
              <Ionicons
                name="image-outline"
                size={24}
                color={colors.primary}
                className="mb-2"
              />
              <Text style={{ color: colors.text }}>Pilih Gambar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePhoto}
              style={{
                backgroundColor: colors.isDarkMode ? "#1e293b" : "#f8fafc",
                borderColor: colors.border,
              }}
              className="flex-1 ml-2 border rounded-lg p-4 items-center"
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color={colors.primary}
                className="mb-2"
              />
              <Text style={{ color: colors.text }}>Ambil Foto</Text>
            </TouchableOpacity>
          </View>
        )}

        {image && (
          <View className="mb-6">
            <Image
              source={{ uri: image }}
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
              onPress={() => setImage(null)}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {/* Submit Button */}
        <View className="mt-auto">
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: colors.isDarkMode ? "#1e3a8a" : "#3b82f6",
            }}
            className="py-4 rounded-lg"
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                Kirim
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
