import { useAuth } from "@/context/AuthContext"
import CustomButton from "@components/CustomButton"
import { router } from "expo-router"
import { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native"
import Toast from "react-native-toast-message"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)
    const success = await signup(name, email, password)
    setIsLoading(false)

    if (success) {
      router.replace("/(auth)/login?signUpCompleted=true")
    } else {
      Toast.show({
        type: "error",
        text1: "Falha ao criar conta.",
        text2: "Se o problema persistir, entre em contato com o suporte.",
      })
    }
  }

  function handleGoToLogin() {
    if (!isLoading) {
      // If the router can go back, navigate back to the previous screen
      router.canGoBack() ? router.back() : router.replace("/(auth)/login")
    }
  }

  return (
    <View className="flex-1 justify-center px-6">
      <Toast topOffset={56} />
      <View className="w-full max-w-md gap-2 rounded-2xl bg-white p-8 shadow-lg">
        <Text className="mb-2 text-center font-extrabold text-2xl text-green-600">
          Cadastrar
        </Text>
        <Text className="mb-4 text-center font-medium text-base">
          Junte-se ao <Text className="font-bold">iNature</Text>! 🌱
        </Text>

        <View className="mb-4 gap-4">
          <View>
            <Text className="mb-1 font-medium text-gray-700 text-sm">Nome</Text>
            <TextInput
              className="h-12 rounded-lg border border-gray-300 bg-white px-4 pb-1 text-base"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              editable={!isLoading}
              placeholderTextColor="#94a3b8"
              returnKeyType="next"
            />
          </View>

          <View>
            <Text className="mb-1 font-medium text-gray-700 text-sm">
              Email
            </Text>
            <TextInput
              className="h-12 rounded-lg border border-gray-300 bg-white px-4 pb-1 text-base"
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
            <Text className="mb-1 font-medium text-gray-700 text-sm">
              Senha
            </Text>
            <TextInput
              className="h-12 rounded-lg border border-gray-300 bg-white px-4 pb-1 text-base"
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
            <Text className="mb-1 font-medium text-gray-700 text-sm">
              Confirmar Senha
            </Text>
            <TextInput
              className="h-12 rounded-lg border border-gray-300 bg-white px-4 pb-1 text-base"
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

        <View className="mt-2 flex-row justify-center">
          <Text className="text-gray-600">Já tem uma conta? </Text>
          <Pressable onPress={handleGoToLogin} disabled={isLoading}>
            <Text className="font-bold text-green-600">Entrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
