import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";

export default function TaskCompleteScreen({ navigation }) {
  const { colors } = useTheme();
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const requestPermission = async (type) => {
    if (type === "camera") {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant camera access to take photos"
        );
        return false;
      }
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant gallery access to select photos"
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    if (!(await requestPermission("gallery"))) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (!(await requestPermission("camera"))) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!notes.trim()) {
      Alert.alert("Required", "Please add completion notes");
      return;
    }

    // In a real app, you would upload the image and notes to your backend
    navigation.navigate("TaskSuccess");
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
            Complete Task
          </Text>
        </View>

        {/* Notes Input */}
        <Text
          style={{ color: colors.text }}
          className="text-lg font-semibold mb-2"
        >
          Completion Notes
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any notes about task completion..."
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
          Attachments
        </Text>
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
            <Text style={{ color: colors.text }}>Choose Image</Text>
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
            <Text style={{ color: colors.text }}>Take Photo</Text>
          </TouchableOpacity>
        </View>

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
            <Text className="text-white text-center font-semibold text-lg">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
