import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
	const { token, isLoading } = useAuth();

	if (isLoading) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#22c55e" />
			</View>
		);
	}

	// Redirect based on authentication status
	if (token) {
		return <Redirect href="/(tabs)/home" />;
	}
	return <Redirect href="/(auth)/login" />;
}
