import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { useAuth } from "../../context/AuthContext"
import { request } from "../../helprer/request"

export default function AccountPage() {
  const { token, logout } = useAuth()
  const [user, setUser] = useState<{
    id: number
    nome: string
    email: string
    role: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [editNome, setEditNome] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!token) {
      return
    }
    const fetchUser = async () => {
      setLoading(true)
      const data = await request<{
        id: number
        nome: string
        email: string
        role: string
      }>("/users/me", "get", undefined, { authToken: token })
      setUser(data)
      setEditNome(data?.nome ?? "")
      setEditEmail(data?.email ?? "")
      setLoading(false)
    }
    fetchUser()
  }, [token])

  const handleSave = async () => {
    if (!token) {
      return
    }
    setSaving(true)
    try {
      await request(
        "/users/me",
        "put",
        { nome: editNome, email: editEmail },
        { authToken: token }
      )
      setUser(u => (u ? { ...u, nome: editNome, email: editEmail } : u))
      Alert.alert("Sucesso", "Dados atualizados com sucesso!")
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os dados.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!token) {
      return
    }
    Alert.alert(
      "Excluir conta",
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await request("/users/me", "delete", undefined, {
                authToken: token,
              })
              router.replace("/(drawer)/logout")
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a conta.")
            }
          },
        },
      ]
    )
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    )
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-600">Usuário não encontrado.</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 items-center bg-white py-4">
      <Text className="mb-2 text-center font-extrabold text-2xl text-green-700">
        Conta
      </Text>
      <View className="h-0.5 w-full bg-gray-400" />
      <View className="w-full max-w-md gap-4 px-4 pt-6">
        <View>
          <Text className="mb-1 font-medium text-gray-700">Nome</Text>
          <TextInput
            className="mb-2 rounded-lg border border-gray-300 bg-white px-4 py-2"
            value={editNome}
            onChangeText={setEditNome}
            returnKeyType="none"
          />
        </View>

        <View>
          <Text className="mb-1 font-medium text-gray-700">Email</Text>
          <TextInput
            className="mb-2 rounded-lg border border-gray-300 bg-white px-4 py-2"
            value={editEmail}
            onChangeText={setEditEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="none"
          />
        </View>

        <View>
          <Text className="mb-1 font-medium text-gray-700">Função</Text>
          <Text className="mb-4 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500">
            {user.role}
          </Text>
        </View>

        <Pressable
          className="mb-2 items-center rounded-lg bg-green-600 py-3"
          onPress={handleSave}
          disabled={saving}
        >
          <Text className="font-bold text-lg text-white">
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </Pressable>

        <Pressable
          className="items-center rounded-lg bg-red-600 py-3"
          onPress={handleDelete}
        >
          <Text className="font-bold text-lg text-white">Excluir Conta</Text>
        </Pressable>
      </View>
    </View>
  )
}
