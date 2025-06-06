import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"
import type { NewsType } from "@/types"

export function NewsCard({
  id,
  resumo,
  imagemCapa,
  dataPublicacao,
  autor,
}: NewsType) {
  return (
    <View className="w-full flex-col gap-2 border-gray-300 border-b-8 bg-white py-4">
      <Text className="px-4 font-semibold text-gray-700">Por: {autor}</Text>
      <Image
        source={{ uri: imagemCapa }}
        className="h-60 w-full"
        resizeMode="center"
        alt="Imagem da notícia"
      />
      <Text className="px-4 font-bold text-lg">{resumo}</Text>
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
  )
}
