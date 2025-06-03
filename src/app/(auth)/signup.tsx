import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Alert,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";

export default function SignupPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { signup } = useAuth();

	const handleSignup = async () => {
		if (!name || !email || !password || !confirmPassword) {
			Alert.alert("Erro", "Por favor, preencha todos os campos");
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert("Erro", "As senhas não coincidem");
			return;
		}

		if (password.length < 6) {
			Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
			return;
		}

		setIsLoading(true);
		const success = await signup(name, email, password);
		setIsLoading(false);

		if (success) {
			router.replace("/(auth)/login?signUpCompleted=true");
		} else {
			Toast.show({
				type: "error",
				text1: "Falha ao criar conta.",
				text2: "Se o problema persistir, entre em contato com o suporte.",
			});
		}
	};

	function handleGoToLogin() {
		if (!isLoading) {
			// If the router can go back, navigate back to the previous screen
			router.canGoBack() ? router.back() : router.replace("/(auth)/login");
		}
	}

	return (
		<View className="flex-1 justify-center px-6">
			<Toast topOffset={56} />
			<View className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md gap-2">
				<Text className="text-3xl font-extrabold text-center text-green-600 mb-2">
					Cadastrar
				</Text>
				<Text className="text-center text-base font-medium mb-4">
					Junte-se ao <Text className="font-bold">iNature</Text>! 🌱
				</Text>

				<View className="mb-4 gap-4">
					<View>
						<Text className="text-sm font-medium text-gray-700 mb-1">Nome</Text>
						<TextInput
							className="border border-gray-300 rounded-lg px-4 h-12 pb-1 text-base bg-white"
							placeholder="Digite seu nome"
							value={name}
							onChangeText={setName}
							editable={!isLoading}
							placeholderTextColor="#94a3b8"
							returnKeyType="next"
						/>
					</View>

					<View>
						<Text className="text-sm font-medium text-gray-700 mb-1">
							Email
						</Text>
						<TextInput
							className="border border-gray-300 rounded-lg px-4 h-12 pb-1 text-base bg-white"
							placeholder="Digite seu email"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
							editable={!isLoading}
							placeholderTextColor="#94a3b8"
							returnKeyType="next"
						/>
					</View>

					<View>
						<Text className="text-sm font-medium text-gray-700 mb-1">
							Senha
						</Text>
						<TextInput
							className="border border-gray-300 rounded-lg px-4 h-12 pb-1 text-base bg-white"
							placeholder="Digite sua senha"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							editable={!isLoading}
							placeholderTextColor="#94a3b8"
							returnKeyType="next"
							autoComplete="off"
							importantForAutofill="no"
						/>
					</View>

					<View>
						<Text className="text-sm font-medium text-gray-700 mb-1">
							Confirmar Senha
						</Text>
						<TextInput
							className="border border-gray-300 rounded-lg px-4 h-12 pb-1 text-base bg-white"
							placeholder="Confirme sua senha"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry
							editable={!isLoading}
							onSubmitEditing={handleSignup}
							placeholderTextColor="#94a3b8"
							returnKeyType="done"
							autoComplete="off"
							importantForAutofill="no"
						/>
					</View>
				</View>

				{isLoading ? (
					<ActivityIndicator size="small" color="#22c55e" className="mb-5" />
				) : (
					<CustomButton title="Cadastrar" onPress={handleSignup} />
				)}

				<View className="flex-row justify-center mt-2">
					<Text className="text-gray-600">Já tem uma conta? </Text>
					<Pressable onPress={handleGoToLogin} disabled={isLoading}>
						<Text className="text-green-600 font-bold">Entrar</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
