import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { NewsType } from "../../../types";

export default function NewsDetailPage() {
  const { id } = useLocalSearchParams();
  const [news, setNews] = useState<NewsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`http://10.3.33.19:8080/noticias/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar notícia");
        const data: NewsType = await res.json();
        setNews(data);
      } catch {
        setNews(null);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, [id]);

  return (
    <ScrollView className="flex-1 bg-white py-4">
      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      )}
      {!loading && !news && (
        <View className="flex-1 py-8 items-center bg-white">
          <Text className="text-lg font-semibold">Notícia não encontrada.</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-green-600 px-4 py-2 rounded"
          >
            <Text className="text-white">Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
      {news && (
        <>
          <Text className="text-3xl font-extrabold text-green-700 mb-2 text-center">
            {news.titulo}
          </Text>
          <View className="px-4 flex-row items-center justify-between">
            <Text className="font-semibold text-gray-700">Por: {news.autor}</Text>
            <Text className="text-gray-500 text-sm">{news.dataPublicacao}</Text>
          </View>
          <Image
            source={{ uri: news.imagemCapa }}
            className="w-full h-72 my-2"
            resizeMode="cover"
          />
          <Text className="text-lg px-4">
            {news.corpo}
          </Text>
        </>
      )}      
    </ScrollView>
  );
}