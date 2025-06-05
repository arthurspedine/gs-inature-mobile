import { Text, View } from "react-native";

export default function HomePage() {
	return (
		<View className="flex-1 items-center justify-center bg-white p-4">
			<Text className="text-2xl font-bold text-gray-800 mb-4">
				Bem-vindo ao <Text className="font-bold text-green-600">iNature</Text>!
			</Text>
		</View>
	);
}
