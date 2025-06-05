import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import type { NewsType } from "../types";

export function NewsCard({
	id,
	resumo,
	imagemCapa,
	dataPublicacao,
	autor,
}: NewsType) {
	return (
		<View className="w-full flex-col py-4 gap-2 bg-white border-b-8 border-gray-300">
			<Text className="font-semibold text-gray-700 px-4">Por: {autor}</Text>
			<Image
				source={{ uri: imagemCapa }}
				className="w-full h-60"
				resizeMode="center"
				alt="Imagem da notícia"
			/>
			<Text className="font-bold text-lg px-4">{resumo}</Text>
			<View className="flex-row items-center justify-between px-8">
				<Text className="text-gray-500 text-sm">{dataPublicacao}</Text>
				<View className="flex-row items-center gap-4">
					<Pressable
						onPress={() => router.push(`/news/${id}`)}
						className="flex-row items-center gap-2"
					>
						<Ionicons name="eye-outline" size={24} color="#4A5568" />
						<Text>Ler notícia</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
