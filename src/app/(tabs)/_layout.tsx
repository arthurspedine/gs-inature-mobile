import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Header } from "../../components/Header";

export default function TabsLayout() {
	return (
		<View className="flex-1 bg-white">
			<Header />
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
		</View>
	);
}
