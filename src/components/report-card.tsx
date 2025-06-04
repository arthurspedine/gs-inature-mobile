import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ReportType } from "../types";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const typeColors: Record<ReportType["tipo"], string> = {
  ENCHENTE: "text-blue-700 bg-blue-100",
  DESABAMENTO: "text-yellow-800 bg-yellow-100",
  QUEIMADA: "text-red-700 bg-red-100",
};

export function ReportCard({
  report,
  fetchReports,
}: {
  report: ReportType;
  fetchReports: () => void;
}) {
  const { token } = useAuth();

  async function handleConfirm() {
    console.log('confirmando');
    try {
        const response = await axios.post(
          `http://http://10.3.33.19:8080/reports/${report.id}/confirmar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        
        if (response.status === 200) {
          fetchReports();
        }
        console.log(response.status, response.data);
    } catch (error) {
      console.error("Erro ao confirmar o alerta:", error);
    }
    
  }

  return (
    <View className="bg-white rounded-xl p-4 my-2 shadow flex flex-col">
      <Text className="text-lg font-bold mb-1">{report.titulo}</Text>
      <Text
        className={`text-xs font-semibold px-2 py-1 rounded-full self-start mb-2 ${
          typeColors[report.tipo]
        }`}
      >
        {report.tipo}
      </Text>
      <Text className="text-base mb-2">{report.corpo}</Text>
      <Text className="text-sm text-gray-600 mb-1">
        {report.localizacao.cidade}, {report.localizacao.bairro} -{" "}
        {report.localizacao.logradouro}, {report.localizacao.numero}
      </Text>
      <View className="flex-row justify-between items-center mt-1">
        <Text className="text-xs text-gray-500">Data: {report.data}</Text>
        <Text className="text-xs text-gray-500">Por: {report.usuarioNome}</Text>
      </View>
      <Text className="text-sm text-gray-700 mt-2">
        Confirmações:{" "}
        <Text className="font-semibold">{report.quantidadeConfirmacoes}</Text>
      </Text>
      {report.podeConfirmar && (
        <TouchableOpacity onPress={handleConfirm}>
          <Text className="text-green-700 font-bold mt-2">
            Você pode confirmar este relatório
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
