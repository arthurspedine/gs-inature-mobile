import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";

export default function NewsTabsLayout() {
	const { role } = useAuth();

	const screens = [
		<Tabs.Screen
			key="index"
			name="index"
			options={{
				title: "Notícias",
				tabBarIcon: ({ color, size }) => (
					<Ionicons name="globe-outline" color={color} size={size} />
				),
			}}
		/>,
		<Tabs.Screen
			key="[id]"
			name="[id]"
			options={{
				href: null, 
			}}
		/>,
	];

	if (role === "JORNALISTA") {
		// If JORNALISTA, add "Minhas Notícias" and "Criar Notícia" tabs
		screens.push(
			<Tabs.Screen
				key="create"
				name="create"
				options={{
					title: "Criar Notícia",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="add-circle-outline" color={color} size={size} />
					),
				}}
			/>,
		);
	} else {
		// If not JORNALISTA, hide "Minhas Notícias" and "Criar Notícia"
		screens.push(
			<Tabs.Screen
				key="create"
				name="create"
				options={{
					href: null,
				}}
			/>,
		);
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#22c55e",
				tabBarInactiveTintColor: "#94a3b8",
				headerShown: false,
			}}
		>
			{screens}
		</Tabs>
	);
}
