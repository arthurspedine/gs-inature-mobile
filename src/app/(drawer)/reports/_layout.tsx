import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

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
        key="create"
        name="create"
        options={{
          title: "Criar Alerta",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}
