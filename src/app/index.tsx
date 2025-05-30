import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
	const [token, setToken] = useState<string | null | undefined>(undefined);

	useEffect(() => {
		AsyncStorage.getItem("jwt_token").then(setToken);
	}, []);

	if (token === undefined) return null; // loading

	return token ? (
		<Redirect href="/(tabs)/home" />
	) : (
		<Redirect href="/(auth)/login" />
	);
}
