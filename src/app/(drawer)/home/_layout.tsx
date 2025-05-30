import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeTabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#22c55e",
                tabBarInactiveTintColor: "#94a3b8",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="leaf" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}