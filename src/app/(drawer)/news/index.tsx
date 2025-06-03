import { useCallback, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NewsType } from "../../../types";
import axios from "axios";
import { NewsCard } from "../../../components/news-card";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "expo-router";

export default function NewsPage() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchNews() {
    setLoading(true);
    try {
      const response = await axios.get("http://10.3.33.19:8080/noticias");
      setNews(response.data.content);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNews();
    }, [])
  );

  return (
    <View className="flex-1 py-4 bg-white">
      <Text className="text-3xl font-extrabold text-green-700 mb-2 text-center">
        Notícias
      </Text>
	  <View className="bg-gray-400 h-0.5 w-full"/>

      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" />
      ) : news.length === 0 ? (
        <Text className="text-center text-gray-500 mt-8">
          Nenhuma notícia postada até agora...
        </Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <NewsCard {...item} />}
        />
      )}
    </View>
  );
}
