import { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	Alert,
	ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

export default function CreatePage() {
	const { token } = useAuth();
	const [titulo, setTitulo] = useState("");
	const [resumo, setResumo] = useState("");
	const [corpo, setCorpo] = useState("");
	const [imagem, setImagem] = useState<ImagePicker.ImagePickerAsset>();
	const [isLoading, setIsLoading] = useState(false);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			quality: 0.7,
		});
		if (!result.canceled && result.assets && result.assets.length > 0) {
			setImagem(result.assets[0]);
		}
	};

	const handleSubmit = async () => {
		if (!titulo || !resumo || !corpo || !imagem) {
			Alert.alert("Erro", "Preencha todos os campos e selecione uma imagem.");
			return;
		}
		setIsLoading(true);
		const formData = new FormData();
		formData.append("titulo", titulo);
		formData.append("resumo", resumo);
		formData.append("corpo", corpo);
		formData.append("imagem", {
			uri: imagem.uri,
			name: imagem.fileName || "imagem.jpg",
			type: imagem.mimeType || "image/jpeg",
		} as any);

		try {		
			const res = await axios.post(
				"http://10.3.33.19:8080/noticias",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if (res.status < 200 || res.status >= 300) throw new Error("Erro ao criar notícia");
			Alert.alert("Sucesso", "Notícia criada com sucesso!");
			setTitulo("");
			setResumo("");
			setCorpo("");
			setImagem(undefined);
			router.replace("/news?refresh=true");
		} catch (e) {
			Alert.alert("Erro", "Não foi possível criar a notícia.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ScrollView className="flex-1 bg-white p-4">
			<Text className="text-center text-3xl font-bold text-green-700 mb-4">
				Criar Notícia
			</Text>
			<Text className="mb-1 font-semibold">Título</Text>
			<TextInput
				className="border border-gray-300 rounded px-3 py-2 mb-2"
				value={titulo}
				onChangeText={setTitulo}
				placeholder="Digite o título"
			/>

			<Text className="mb-1 font-semibold">Resumo</Text>
			<TextInput
				className="border border-gray-300 rounded px-3 py-2 mb-2"
				value={resumo}
				onChangeText={setResumo}
				placeholder="Digite o resumo"
			/>
		
			<Text className="mb-1 font-semibold">Corpo</Text>
			<TextInput
				className="border border-gray-300 rounded px-3 py-2 mb-2"
				value={corpo}
				onChangeText={setCorpo}
				placeholder="Digite o corpo da notícia"
				multiline
				numberOfLines={5}
				style={{ textAlignVertical: "top" }}
			/>
		
			<Text className="mb-1 font-semibold">Imagem</Text>
			<TouchableOpacity
				onPress={pickImage}
				className="bg-green-600 rounded px-4 py-2 mb-4 items-center"
			>
				<Text className="text-white">
					{imagem ? "Trocar Imagem" : "Selecionar Imagem"}
				</Text>
			</TouchableOpacity>
			{imagem && (
				<Image
					source={{ uri: imagem.uri }}
					className="w-full h-48 rounded mb-4"
					resizeMode="center"
				/>
			)}
			
			<TouchableOpacity
				onPress={handleSubmit}
				disabled={isLoading}
				className="bg-green-700 rounded px-4 py-3 items-center"
			>
				{isLoading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text className="text-white font-bold">Criar Notícia</Text>
				)}
			</TouchableOpacity>
		</ScrollView>
	);
}
