import { useAuth } from "@/context/AuthContext"
import { request } from "@/helper/request"
import type { ReportType } from "@/types"
import { Text, TouchableOpacity, View } from "react-native"

const typeColors: Record<ReportType["tipo"], string> = {
  ENCHENTE: "text-blue-700 bg-blue-100",
  DESABAMENTO: "text-yellow-800 bg-yellow-100",
  QUEIMADA: "text-red-700 bg-red-100",
}

export function ReportCard({
  report,
  fetchReports,
}: {
  report: ReportType
  fetchReports: () => void
}) {
  const { token } = useAuth()

  async function handlePressSubmit() {
    if (!token) {
      console.error("Usuário não autenticado")
      return
    }
    try {
      const url = `/reports/${report.id}/${report.usuarioConfirmou ? "remocao" : "confirmacao"}`
      const method = report.usuarioConfirmou ? "delete" : "post"
      const data = method === "post" ? {} : undefined
      await request(url, method, data, {
        authToken: token,
      })
      fetchReports()
    } catch (error) {
      console.error("Erro ao confirmar o alerta:", error)
    }
  }

  return (
    <View className="my-2 flex flex-col rounded-xl bg-white p-4 shadow">
      <Text className="mb-1 font-bold text-lg">{report.titulo}</Text>
      <Text
        className={`mb-2 self-start rounded-full px-2 py-1 font-semibold text-xs ${
          typeColors[report.tipo]
        }`}
      >
        {report.tipo}
      </Text>
      <Text className="mb-2 text-base">{report.corpo}</Text>
      <Text className="mb-1 text-gray-600 text-sm">
        {report.localizacao.cidade}, {report.localizacao.bairro} -{" "}
        {report.localizacao.logradouro}, {report.localizacao.numero}
      </Text>
      <View className="mt-1 flex-row items-center justify-between">
        <Text className="text-gray-500 text-xs">
          Data:{" "}
          {report.data ? new Date(report.data).toLocaleDateString("pt-BR") : ""}
        </Text>
        <Text className="text-gray-500 text-xs">Por: {report.usuarioNome}</Text>
      </View>
      <Text className="mt-2 text-gray-700 text-sm">
        Confirmações:{" "}
        <Text className="font-semibold">{report.quantidadeConfirmacoes}</Text>
      </Text>

      <TouchableOpacity onPress={handlePressSubmit}>
        <Text className="mt-2 font-bold text-green-700">
          {report.usuarioConfirmou
            ? "Remover confirmação"
            : "Confirmar este alerta"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
