import { View, Text, Alert } from "react-native";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { useAuth } from "../../../context/AuthContext";

export default function HomePage() {
	const { logout } = useAuth();

	const handleLogout = async () => {
		Alert.alert("Sair", "Tem certeza que deseja sair?", [
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Sair",
				style: "destructive",
				onPress: async () => {
					await logout();
					router.replace("/(auth)/login");
				},
			},
		]);
	};

	return (
		<View className="flex-1 items-center justify-center bg-white p-4">
			<Text className="text-2xl font-bold text-gray-800 mb-4">
				Bem-vindo ao <Text className="font-bold text-green-600">iNature</Text>!
			</Text>
		</View>
	);
}
