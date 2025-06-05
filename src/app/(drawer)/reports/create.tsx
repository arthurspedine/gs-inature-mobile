import { router } from "expo-router"
import { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native"
import { useAuth } from "../../../context/AuthContext"
import { request } from "../../../helprer/request"

const tipos = [
  { label: "Enchente", value: "ENCHENTE" },
  { label: "Desabamento", value: "DESABAMENTO" },
  { label: "Queimada", value: "QUEIMADA" },
]

export default function MePage() {
  const { token } = useAuth()
  const [titulo, setTitulo] = useState("")
  const [corpo, setCorpo] = useState("")
  const [tipoReport, setTipoReport] = useState("ENCHENTE")
  const [cidade, setCidade] = useState("")
  const [bairro, setBairro] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [numero, setNumero] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!token) {
      Alert.alert("Erro", "Você precisa estar logado para enviar um alerta.")
      return
    }
    if (!titulo || !corpo || !cidade || !bairro || !logradouro || !numero) {
      Alert.alert("Preencha todos os campos!")
      return
    }
    setLoading(true)
    try {
      const body = {
        titulo,
        corpo,
        tipoReport,
        localizacao: {
          cidade,
          bairro,
          logradouro,
          numero,
        },
      }
      await request("/reports", "post", body, {
        authToken: token,
      })
      Alert.alert("Sucesso", "Alerta enviado com sucesso!")
      setTitulo("")
      setCorpo("")
      setTipoReport("ENCHENTE")
      setCidade("")
      setBairro("")
      setLogradouro("")
      setNumero("")
      router.replace("/reports?refresh=true")
    } catch (error) {
      console.error(error)
      Alert.alert("Erro ao enviar alerta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-white px-6 py-4">
      <Text className="mb-2 text-center font-bold text-3xl text-green-700">
        Novo Alerta
      </Text>

      <Text className="mb-1 font-medium text-base text-gray-700">Título</Text>
      <TextInput
        className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-2"
        placeholder="Título do alerta"
        value={titulo}
        onChangeText={setTitulo}
        returnKeyType="next"
      />

      <Text className="mb-1 font-medium text-base text-gray-700">
        Descrição
      </Text>
      <TextInput
        className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-2"
        placeholder="Descreva o alerta"
        value={corpo}
        onChangeText={setCorpo}
        multiline
        numberOfLines={4}
        style={{ textAlignVertical: "top" }}
        returnKeyType="next"
      />

      <Text className="mb-1 font-medium text-base text-gray-700">Tipo</Text>
      <View className="mb-3 flex-row">
        {tipos.map(tipo => (
          <Pressable
            key={tipo.value}
            className={`mr-2 rounded-lg border px-3 py-2 ${tipoReport === tipo.value ? "border-green-600 bg-green-200" : "border-gray-300 bg-gray-100"}`}
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

      <Text className="mb-1 font-medium text-base text-gray-700">Cidade</Text>
      <TextInput
        className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-2"
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
        returnKeyType="next"
      />

      <Text className="mb-1 font-medium text-base text-gray-700">Bairro</Text>
      <TextInput
        className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-2"
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
        returnKeyType="next"
      />

      <Text className="mb-1 font-medium text-base text-gray-700">
        Logradouro
      </Text>
      <TextInput
        className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-2"
        placeholder="Rua, avenida, etc."
        value={logradouro}
        onChangeText={setLogradouro}
        returnKeyType="next"
      />

      <Text className="mb-1 font-medium text-base text-gray-700">Número</Text>
      <TextInput
        className="mb-6 rounded-lg border border-gray-300 bg-white px-4 py-2"
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      <Pressable
        className="mb-4 items-center rounded-lg bg-green-600 py-3"
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="font-bold text-lg text-white">Enviar Alerta</Text>
        )}
      </Pressable>
    </ScrollView>
  )
}
