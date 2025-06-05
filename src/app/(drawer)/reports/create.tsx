import axios from "axios";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";

const tipos = [
	{ label: "Enchente", value: "ENCHENTE" },
	{ label: "Desabamento", value: "DESABAMENTO" },
	{ label: "Queimada", value: "QUEIMADA" },
];

export default function MePage() {
	const { token } = useAuth();
	const [titulo, setTitulo] = useState("");
	const [corpo, setCorpo] = useState("");
	const [tipoReport, setTipoReport] = useState("ENCHENTE");
	const [cidade, setCidade] = useState("");
	const [bairro, setBairro] = useState("");
	const [logradouro, setLogradouro] = useState("");
	const [numero, setNumero] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		if (!titulo || !corpo || !cidade || !bairro || !logradouro || !numero) {
			Alert.alert("Preencha todos os campos!");
			return;
		}
		setLoading(true);
		try {
			await axios.post(
				"http://192.168.0.113:8080/reports",
				{
					titulo,
					corpo,
					tipoReport,
					localizacao: {
						cidade,
						bairro,
						logradouro,
						numero,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			Alert.alert("Sucesso", "Alerta enviado com sucesso!");
			setTitulo("");
			setCorpo("");
			setTipoReport("ENCHENTE");
			setCidade("");
			setBairro("");
			setLogradouro("");
			setNumero("");
		} catch (error) {
			console.error(error);
			Alert.alert("Erro ao enviar alerta");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView className="flex-1 bg-white px-6 py-4">
			<Text className="text-3xl font-bold text-green-700 mb-2 text-center">
				Novo Alerta
			</Text>

			<Text className="text-base font-medium text-gray-700 mb-1">Título</Text>
			<TextInput
				className="border border-gray-300 rounded-lg px-4 py-2 mb-3 bg-white"
				placeholder="Título do alerta"
				value={titulo}
				onChangeText={setTitulo}
				returnKeyType="next"
			/>

			<Text className="text-base font-medium text-gray-700 mb-1">
				Descrição
			</Text>
			<TextInput
				className="border border-gray-300 rounded-lg px-4 py-2 mb-3 bg-white"
				placeholder="Descreva o alerta"
				value={corpo}
				onChangeText={setCorpo}
				multiline
				numberOfLines={4}
				style={{ textAlignVertical: "top" }}
				returnKeyType="next"
			/>

			<Text className="text-base font-medium text-gray-700 mb-1">Tipo</Text>
			<View className="flex-row mb-3">
				{tipos.map((tipo) => (
					<Pressable
						key={tipo.value}
						className={`px-3 py-2 mr-2 rounded-lg border ${tipoReport === tipo.value ? "bg-green-200 border-green-600" : "bg-gray-100 border-gray-300"}`}
						onPress={() => setTipoReport(tipo.value)}
					>
						<Text
							className={`font-medium ${tipoReport === tipo.value ? "text-green-700" : "text-gray-700"}`}
						>
							{tipo.label}
						</Text>
					</Pressable>
				))}
			</View>

			<Text className="text-base font-medium text-gray-700 mb-1">Cidade</Text>
			<TextInput
				className="border border-gray-300 rounded-lg px-4 py-2 mb-3 bg-white"
				placeholder="Cidade"
				value={cidade}
				onChangeText={setCidade}
				returnKeyType="next"
			/>

			<Text className="text-base font-medium text-gray-700 mb-1">Bairro</Text>
			<TextInput
				className="border border-gray-300 rounded-lg px-4 py-2 mb-3 bg-white"
				placeholder="Bairro"
				value={bairro}
				onChangeText={setBairro}
				returnKeyType="next"
			/>

			<Text className="text-base font-medium text-gray-700 mb-1">
				Logradouro
			</Text>
			<TextInput
				className="border border-gray-300 rounded-lg px-4 py-2 mb-3 bg-white"
				placeholder="Rua, avenida, etc."
				value={logradouro}
				onChangeText={setLogradouro}
				returnKeyType="next"
			/>

			<Text className="text-base font-medium text-gray-700 mb-1">Número</Text>
			<TextInput
				className="border border-gray-300 rounded-lg px-4 py-2 mb-6 bg-white"
				placeholder="Número"
				value={numero}
				onChangeText={setNumero}
				keyboardType="numeric"
				returnKeyType="done"
				onSubmitEditing={handleSubmit}
			/>

			<Pressable
				className="bg-green-600 rounded-lg py-3 items-center mb-4"
				onPress={handleSubmit}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text className="text-white font-bold text-lg">Enviar Alerta</Text>
				)}
			</Pressable>
		</ScrollView>
	);
}
