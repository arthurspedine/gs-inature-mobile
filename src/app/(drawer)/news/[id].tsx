import { request } from "@/helper/request"
import type { NewsType } from "@/types"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

export default function NewsDetailPage() {
  const { id } = useLocalSearchParams()
  const [news, setNews] = useState<NewsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNews() {
      if (!id) return
      setLoading(true)
      try {
        const res: NewsType | null = await request(`/noticias/${id}`)
        if (res) {
          setNews(res)
        }
      } catch {
        setNews(null)
      } finally {
        setLoading(false)
      }
    }
    loadNews()
  }, [id])

  return (
    <ScrollView className="flex-1 bg-white py-4">
      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      )}
      {!loading && !news && (
        <View className="flex-1 items-center bg-white py-8">
          <Text className="font-semibold text-lg">Notícia não encontrada.</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 rounded bg-green-600 px-4 py-2"
          >
            <Text className="text-white">Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
      {news && (
        <>
          <Text className="mb-2 text-center font-extrabold text-2xl text-green-700">
            {news.titulo}
          </Text>
          <View className="flex-row items-center justify-between px-4">
            <Text className="font-semibold text-gray-700">
              Por: {news.autor}
            </Text>
            <Text className="text-gray-500 text-sm">{news.dataPublicacao}</Text>
          </View>
          <Image
            source={{ uri: news.imagemCapa }}
            className="my-2 h-72 w-full"
            resizeMode="center"
          />
          <Text className="mb-12 px-4 text-lg">{news.corpo}</Text>
        </>
      )}
    </ScrollView>
  )
}
