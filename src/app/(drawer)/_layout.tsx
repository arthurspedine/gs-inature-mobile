import { Ionicons } from "@expo/vector-icons"
import { Drawer } from "expo-router/drawer"
import { Header } from "@components/Header"

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        header: () => <Header />,
        drawerActiveTintColor: "blue",
        drawerInactiveTintColor: "gray",
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          title: "Notícias",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="reports"
        options={{
          title: "Alertas",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="alert-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  )
}
