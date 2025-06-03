import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { NewsType } from "../../../types";
import axios from "axios";
import { NewsCard } from "../../../components/news-card";
import { FlatList } from "react-native-gesture-handler";

export default function NewsPage() {
  const MOCKED_NEWS: NewsType[] = [
    {
      id: 1,
      titulo: "Chuva forte atinge a cidade",
      imagemCapa:
        "https://st.depositphotos.com/2117297/2721/i/450/depositphotos_27213391-stock-photo-woman-with-umbrella-checking-for.jpg",
      dataPublicacao: "2024-06-01",
      autor: "Ele mesmo",
      corpo:
        "Uma forte chuva atingiu a cidade na manhã de hoje, causando alagamentos em várias ruas e avenidas. A Defesa Civil está em alerta e recomenda que os moradores evitem sair de casa se não for necessário.",
      resumo: "Chuva forte causa alagamentos e alerta Defesa Civil.",
    },
    {
      id: 2,
      titulo: "Novo parque é inaugurado",
      imagemCapa:
        "https://st.depositphotos.com/2117297/2721/i/450/depositphotos_27213391-stock-photo-woman-with-umbrella-checking-for.jpg",
      dataPublicacao: "2024-06-02",
      autor: "Ele mesmo",
      corpo:
        "Uma forte chuva atingiu a cidade na manhã de hoje, causando alagamentos em várias ruas e avenidas. A Defesa Civil está em alerta e recomenda que os moradores evitem sair de casa se não for necessário.",
      resumo: "Chuva forte causa alagamentos e alerta Defesa Civil.",
    },
    {
      id: 3,
      titulo: "Campanha de vacinação",
      imagemCapa:
        "https://st.depositphotos.com/2117297/2721/i/450/depositphotos_27213391-stock-photo-woman-with-umbrella-checking-for.jpg",
      dataPublicacao: "2024-06-03",
      autor: "Ele mesmo",
      corpo:
        "Uma forte chuva atingiu a cidade na manhã de hoje, causando alagamentos em várias ruas e avenidas. A Defesa Civil está em alerta e recomenda que os moradores evitem sair de casa se não for necessário.",
      resumo: "Chuva forte causa alagamentos e alerta Defesa Civil.",
    },
    {
      id: 4,
      titulo: "Feira de orgânicos",
      imagemCapa:
        "https://st.depositphotos.com/2117297/2721/i/450/depositphotos_27213391-stock-photo-woman-with-umbrella-checking-for.jpg",
      dataPublicacao: "2024-06-04",
      autor: "Ele mesmo",
      corpo:
        "Uma forte chuva atingiu a cidade na manhã de hoje, causando alagamentos em várias ruas e avenidas. A Defesa Civil está em alerta e recomenda que os moradores evitem sair de casa se não for necessário.",
      resumo: "Chuva forte causa alagamentos e alerta Defesa Civil.",
    },
    {
      id: 5,
      titulo: "Projeto de reciclagem",
      imagemCapa:
        "https://st.depositphotos.com/2117297/2721/i/450/depositphotos_27213391-stock-photo-woman-with-umbrella-checking-for.jpg",
      dataPublicacao: "2024-06-05",
      autor: "Ele mesmo",
      corpo:
        "Uma forte chuva atingiu a cidade na manhã de hoje, causando alagamentos em várias ruas e avenidas. A Defesa Civil está em alerta e recomenda que os moradores evitem sair de casa se não for necessário.",
      resumo: "Chuva forte causa alagamentos e alerta Defesa Civil.",
    },
    {
      id: 6,
      titulo: "Novo aplicativo de transporte",
      imagemCapa:
        "https://st.depositphotos.com/2117297/2721/i/450/depositphotos_27213391-stock-photo-woman-with-umbrella-checking-for.jpg",
      dataPublicacao: "2024-06-06",
      autor: "Ele mesmo",
      corpo:
        "Uma forte chuva atingiu a cidade na manhã de hoje, causando alagamentos em várias ruas e avenidas. A Defesa Civil está em alerta e recomenda que os moradores evitem sair de casa se não for necessário.",
      resumo: "Chuva forte causa alagamentos e alerta Defesa Civil.",
    },
    {
      id: 7,
      titulo: "Oficina de jardinagem",
      imagemCapa:
        "https://st.depositphotos.com/2117297/2721/i/450/depositphotos_27213391-stock-photo-woman-with-umbrella-checking-for.jpg",
      dataPublicacao: "2024-06-07",
      autor: "Ele mesmo",
      corpo:
        "Uma forte chuva atingiu a cidade na manhã de hoje, causando alagamentos em várias ruas e avenidas. A Defesa Civil está em alerta e recomenda que os moradores evitem sair de casa se não for necessário.",
      resumo: "Chuva forte causa alagamentos e alerta Defesa Civil.",
    },
    {
      id: 8,
      titulo: "Semana do Meio Ambiente",
      imagemCapa:
        "https://st.depositphotos.com/2117297/2721/i/450/depositphotos_27213391-stock-photo-woman-with-umbrella-checking-for.jpg",
      dataPublicacao: "2024-06-08",
      autor: "Ele mesmo",
      corpo:
        "Uma forte chuva atingiu a cidade na manhã de hoje, causando alagamentos em várias ruas e avenidas. A Defesa Civil está em alerta e recomenda que os moradores evitem sair de casa se não for necessário.",
      resumo: "Chuva forte causa alagamentos e alerta Defesa Civil.",
    },
  ];

  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://10.3.26.20:8080/noticias");
        setNews(response.data.content);
        setNews(MOCKED_NEWS);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

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
