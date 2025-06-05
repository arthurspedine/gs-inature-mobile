import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import Toast from "react-native-toast-message"
import CustomButton from "../../components/CustomButton"
import { useAuth } from "../../context/AuthContext"

export default function LoginPage() {
  const params = useLocalSearchParams()
  const signUpCompleted = params?.signUpCompleted === "true"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  useEffect(() => {
    if (signUpCompleted) {
      Toast.show({
        type: "success",
        text1: "Cadastro realizado com sucesso!",
        text2: "Agora você pode fazer login.",
        position: "top",
      })
    }
  }, [signUpCompleted])

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos")
      return
    }

    setIsLoading(true)
    const success = await login(email, password)
    setIsLoading(false)

    if (success) {
      router.replace("/(drawer)/home")
    } else {
      Toast.show({
        type: "error",
        text1: "Falha no login",
        text2: "Verifique suas credenciais e tente novamente.",
      })
    }
  }

  function handleGoToSignUp() {
    if (!isLoading) {
      router.push("/(auth)/signup")
    }
  }

  return (
    // Dismiss keyboard when tapping outside of TextInput
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 justify-center px-6">
        <Toast topOffset={56} />
        <View className="w-full max-w-md gap-2 rounded-2xl bg-white p-8 shadow-lg">
          <Text className="text-center font-extrabold text-3xl text-green-500">
            Entrar
          </Text>
          <Text className="mb-4 text-center font-medium text-base">
            Bem-vindo ao{" "}
            <Text className="font-bold text-green-600">iNature</Text> 🌱
          </Text>

          <View className="mb-4 gap-4">
            <View>
              <Text className="mb-1 font-semibold text-base text-gray-700">
                Email
              </Text>
              <TextInput
                className="h-12 rounded-lg border border-gray-300 bg-white px-4 pb-1.5 text-base"
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
                placeholderTextColor="#94a3b8"
                returnKeyType="next"
                autoCorrect={false}
                importantForAutofill="no"
              />
            </View>

            <View>
              <Text className="mb-1 font-semibold text-base text-gray-700">
                Senha
              </Text>
              <TextInput
                className="h-12 rounded-lg border border-gray-300 bg-white px-4 text-base"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
                placeholderTextColor="#94a3b8"
                onSubmitEditing={handleLogin}
                returnKeyType="done"
                autoCorrect={false}
                autoComplete="off"
                importantForAutofill="no"
              />
            </View>
          </View>

          {isLoading ? (
            <ActivityIndicator size="small" color="#22c55e" className="mb-5" />
          ) : (
            <CustomButton title="Entrar" onPress={handleLogin} />
          )}

          <View className="mt-2 flex-row justify-center">
            <Text className="text-gray-600">Não tem uma conta? </Text>
            <Pressable onPress={handleGoToSignUp} disabled={isLoading}>
              <Text className="font-bold text-green-600">Cadastre-se</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
