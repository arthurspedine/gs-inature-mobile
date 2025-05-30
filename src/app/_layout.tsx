import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
} from "@expo-google-fonts/inter";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { router, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../styles/globals.css";

function InitialLayout() {
	const { token, isLoading } = useAuth();
	const segments = useSegments();

	useEffect(() => {
		if (!isLoading) {
			const inAuthGroup = segments[0] === "(auth)";

			if (!token && !inAuthGroup) {
				// Redirect to login if not authenticated
				router.replace("/(auth)/login");
			} else if (token && inAuthGroup) {
				// Redirect to home if authenticated
				router.replace("/(drawer)/home");
			}
		}
	}, [token, isLoading, segments]);

	if (isLoading) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" color="#22c55e" />
			</View>
		);
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(drawer)" options={{ headerShown: false }} />
		</Stack>
	);
}

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<AuthProvider>
			<InitialLayout />
		</AuthProvider>
	);
}
