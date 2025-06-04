import { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { ReportType } from "../../../types";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { ReportCard } from "../../../components/report-card";

export const fakeReports: ReportType[] = [
  {
    id: 1,
    titulo: "Enchente no centro",
    corpo: "A rua principal está completamente alagada após fortes chuvas.",
    tipo: "ENCHENTE",
    data: "2025-06-01",
    usuarioNome: "João Silva",
    localizacao: {
      cidade: "São Paulo",
      bairro: "Centro",
      logradouro: "Rua das Flores",
      numero: "123",
    },
    podeConfirmar: true,
    quantidadeConfirmacoes: 12,
  },
  {
    id: 2,
    titulo: "Desabamento em obra",
    corpo: "Parede de construção desabou e bloqueou a rua.",
    tipo: "DESABAMENTO",
    data: "2025-05-29",
    usuarioNome: "Maria Oliveira",
    localizacao: {
      cidade: "Rio de Janeiro",
      bairro: "Copacabana",
      logradouro: "Avenida Atlântica",
      numero: "456",
    },
    podeConfirmar: false,
    quantidadeConfirmacoes: 7,
  },
  {
    id: 3,
    titulo: "Fogo em vegetação",
    corpo: "Incêndio atingiu área de mata próxima ao bairro.",
    tipo: "QUEIMADA",
    data: "2025-06-03",
    usuarioNome: "Carlos Mendes",
    localizacao: {
      cidade: "Belo Horizonte",
      bairro: "Pampulha",
      logradouro: "Rua Verde",
      numero: "789",
    },
    podeConfirmar: true,
    quantidadeConfirmacoes: 20,
  },
  {
    id: 4,
    titulo: "Enchente em zona norte",
    corpo: "Alagamento em vias principais causa lentidão no trânsito.",
    tipo: "ENCHENTE",
    data: "2025-06-02",
    usuarioNome: "Ana Souza",
    localizacao: {
      cidade: "Fortaleza",
      bairro: "Aldeota",
      logradouro: "Rua Azul",
      numero: "321",
    },
    podeConfirmar: false,
    quantidadeConfirmacoes: 15,
  },
  {
    id: 5,
    titulo: "Fumaça densa",
    corpo: "Fumaça de queimada afeta visibilidade e saúde dos moradores.",
    tipo: "QUEIMADA",
    data: "2025-06-04",
    usuarioNome: "Ricardo Lima",
    localizacao: {
      cidade: "Manaus",
      bairro: "Centro",
      logradouro: "Travessa da Paz",
      numero: "654",
    },
    podeConfirmar: true,
    quantidadeConfirmacoes: 33,
  }
];


export default function ReportsPage() {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchReports() {
    setLoading(true);
    try {
      const response = await axios.get("http://10.3.33.19:8080/reports/hoje");
      setReports(response.data.content);
      setReports(fakeReports); // Use fake data for testing
    } catch (error) {
      console.error("Erro ao buscar os reports:", error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchReports();
    }, [])
  );

  return (
    <View className="flex-1 py-4 bg-white">
      <Text className="text-3xl font-extrabold text-green-700 mb-2 text-center">
        Alertas
      </Text>
      <View className="bg-gray-400 h-0.5 w-full" />

      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" />
      ) : reports.length === 0 ? (
        <Text className="text-center text-gray-500 mt-8">
          Nenhum alerta postado até agora...
        </Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReportCard report={item} fetchReports={fetchReports}/>}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}
    </View>
  );
}
