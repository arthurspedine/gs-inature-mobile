import { Ionicons } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import type { DrawerNavigationProp } from "@react-navigation/drawer";

type RootDrawerParamList = {
	Home: undefined;
};

export function Header() {
	const { logout } = useAuth();
	const router = useRouter();
	const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

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
		<View className="flex-row items-center justify-between px-4 py-3 bg-white shadow-sm pt-14 h-28">
			{/* Botão para abrir o Drawer */}
			<View>
				<TouchableOpacity onPress={() => navigation.openDrawer()}>
					<Ionicons name="menu" size={28} color="#000000" />
				</TouchableOpacity>
			</View>

			{/* Título centralizado */}
			<Text className="text-xl font-bold text-green-700">iNature</Text>

			{/* Botão de logout à direita */}
			<TouchableOpacity onPress={handleLogout}>
				<Ionicons name="log-out-outline" size={26} color="#ef4444" />
			</TouchableOpacity>
		</View>
	);
}
