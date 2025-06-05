import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

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
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="leaf" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="devs"
				options={{
					title: "Desenvolvedores",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="code" color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}
