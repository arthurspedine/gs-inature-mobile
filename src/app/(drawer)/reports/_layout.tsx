import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ReportsTabsLayout() {
  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: "#22c55e",
      tabBarInactiveTintColor: "#94a3b8",
      headerShown: false,
      }}
    >
      <Tabs.Screen
      key="index"
      name="index"
      options={{
        title: "Hoje",
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="globe-outline" color={color} size={size} />
        ),
      }}
      />
      <Tabs.Screen
      key="me"
      name="me"
      options={{
        title: "Seus Alertas",
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" color={color} size={size} />
        ),
      }}
      />
    </Tabs>
  );
}
