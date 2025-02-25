import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/LoginScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import TaskCompleteScreen from "../screens/TaskCompleteScreen";
import TaskSuccessScreen from "../screens/TaskSuccessScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ManPowerScreen from "../screens/ManPowerScreen";
import InventarisScreen from "../screens/InventarisScreen";
import SepedaScreen from "../screens/SepedaScreen";
import ListKontrakScreen from "../screens/ListKontrakScreen";
import BeyondKwhScreen from "../screens/BeyondKwhScreen";
import SertifikatScreen from "../screens/SertifikatScreen";
import useAuthStore from "../store/authStore";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return null; // Or a loading screen component
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen name="TaskComplete" component={TaskCompleteScreen} />
          <Stack.Screen name="TaskSuccess" component={TaskSuccessScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="ManPower" component={ManPowerScreen} />
          <Stack.Screen name="Inventaris" component={InventarisScreen} />
          <Stack.Screen name="Sepeda" component={SepedaScreen} />
          <Stack.Screen name="ListKontrak" component={ListKontrakScreen} />
          <Stack.Screen name="BeyondKwh" component={BeyondKwhScreen} />
          <Stack.Screen name="Sertifikat" component={SertifikatScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
