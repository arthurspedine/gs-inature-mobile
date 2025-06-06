import { useAuth } from "@/context/AuthContext"
import { request } from "@/helprer/request"
import * as ImagePicker from "expo-image-picker"
import { router } from "expo-router"
import { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native"

export default function CreatePage() {
  const { token } = useAuth()
  const [titulo, setTitulo] = useState("")
  const [resumo, setResumo] = useState("")
  const [corpo, setCorpo] = useState("")
  const [imagem, setImagem] = useState<ImagePicker.ImagePickerAsset>()
  const [isLoading, setIsLoading] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    })
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagem(result.assets[0])
    }
  }

  const handleSubmit = async () => {
    if (!token) {
      Alert.alert("Erro", "Você precisa estar logado para criar uma notícia.")
      return
    }
    if (!titulo || !resumo || !corpo || !imagem) {
      Alert.alert("Erro", "Preencha todos os campos e selecione uma imagem.")
      return
    }
    setIsLoading(true)
    const formData = new FormData()
    formData.append("titulo", titulo)
    formData.append("resumo", resumo)
    formData.append("corpo", corpo)
    formData.append("imagem", {
      uri: imagem.uri,
      name: imagem.fileName || "imagem.jpg",
      type: imagem.mimeType || "image/jpeg",
      // biome-ignore lint/suspicious/noExplicitAny:
    } as any)

    try {
      await request("/noticias", "post", formData, {
        authToken: token,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      Alert.alert("Sucesso", "Notícia criada com sucesso!")
      setTitulo("")
      setResumo("")
      setCorpo("")
      setImagem(undefined)
      router.replace("/news?refresh=true")
    } catch (e) {
      Alert.alert("Erro", "Não foi possível criar a notícia.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-center font-bold text-2xl text-green-700">
        Criar Notícia
      </Text>
      <Text className="mb-1 font-semibold">Título</Text>
      <TextInput
        className="mb-2 rounded border border-gray-300 px-3 py-2"
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título"
      />

      <Text className="mb-1 font-semibold">Resumo</Text>
      <TextInput
        className="mb-2 rounded border border-gray-300 px-3 py-2"
        value={resumo}
        onChangeText={setResumo}
        placeholder="Digite o resumo"
      />

      <Text className="mb-1 font-semibold">Corpo</Text>
      <TextInput
        className="mb-2 rounded border border-gray-300 px-3 py-2"
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
        className="mb-4 items-center rounded bg-green-600 px-4 py-2"
      >
        <Text className="text-white">
          {imagem ? "Trocar Imagem" : "Selecionar Imagem"}
        </Text>
      </TouchableOpacity>
      {imagem && (
        <Image
          source={{ uri: imagem.uri }}
          className="mb-4 h-48 w-full rounded"
          resizeMode="center"
        />
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading}
        className="items-center rounded bg-green-700 px-4 py-3"
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="font-bold text-white">Criar Notícia</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}
