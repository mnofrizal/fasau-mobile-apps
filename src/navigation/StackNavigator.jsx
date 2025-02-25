import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
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

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
    </Stack.Navigator>
  );
}
