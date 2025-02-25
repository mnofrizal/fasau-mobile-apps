import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import useAuthStore from "../store/authStore";

export default function LoginScreen() {
  const { colors } = useTheme();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert("Error", "Please enter a username");
      return;
    }

    setLoading(true);
    const success = await login(username, password);
    setLoading(false);

    if (!success) {
      Alert.alert("Error", "Failed to login. Please try again.");
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          {/* Logo/Header */}
          <View className="items-center mb-8">
            <Image
              source={require("../../assets/splash.png")}
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text style={{ color: colors.text }} className="text-2xl font-bold">
              Welcome to FASAU
            </Text>
            <Text
              style={{ color: colors.textSecondary }}
              className="text-base mt-1"
            >
              Sign in to continue
            </Text>
          </View>

          {/* Login Form */}
          <View
            style={{ backgroundColor: colors.card }}
            className="rounded-2xl p-6 shadow-sm"
          >
            <View className="mb-4">
              <Text style={{ color: colors.text }} className="text-base mb-2">
                Username
              </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                placeholderTextColor={colors.textSecondary}
                style={{
                  backgroundColor: colors.isDarkMode ? "#1f2937" : "#f8fafc",
                  color: colors.text,
                  borderColor: colors.border,
                }}
                className="px-4 py-3 rounded-xl border text-base"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <Text style={{ color: colors.text }} className="text-base mb-2">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
                style={{
                  backgroundColor: colors.isDarkMode ? "#1f2937" : "#f8fafc",
                  color: colors.text,
                  borderColor: colors.border,
                }}
                className="px-4 py-3 rounded-xl border text-base"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={{ backgroundColor: colors.primary }}
              className="py-4 rounded-xl items-center"
            >
              <Text className="text-white font-semibold text-base">
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
