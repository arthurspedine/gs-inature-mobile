import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { NewsCard } from "../../../components/news-card"
import { request } from "../../../helprer/request"
import type { NewsType } from "../../../types"

export default function NewsPage() {
  const [news, setNews] = useState<NewsType[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    try {
      const response = await request<{ content: NewsType[] } | null>(
        "/noticias"
      )
      if (response) {
        setNews(response.content)
      }
    } catch (error) {
      console.error("Erro ao buscar notícias:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchNews()
    }, [fetchNews])
  )

  return (
    <View className="flex-1 bg-white py-4">
      <Text className="mb-2 text-center font-extrabold text-3xl text-green-700">
        Notícias
      </Text>
      <View className="h-0.5 w-full bg-gray-400" />

      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" />
      ) : news.length === 0 ? (
        <Text className="mt-8 text-center text-gray-500">
          Nenhuma notícia postada até agora...
        </Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <NewsCard {...item} />}
        />
      )}
    </View>
  )
}
