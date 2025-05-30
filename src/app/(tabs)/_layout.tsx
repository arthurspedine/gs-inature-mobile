import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "blue",
				tabBarInactiveTintColor: "gray",
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={size} />
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
