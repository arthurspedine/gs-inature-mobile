import { useAuth } from "@/context/AuthContext"
import { request } from "@/helprer/request"
import type { ReportType } from "@/types"
import { ReportCard } from "@components/report-card"
import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"

export default function ReportsPage() {
  const { token } = useAuth()
  const [reports, setReports] = useState<ReportType[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReports = useCallback(async () => {
    if (!token) {
      console.error("Token não encontrado. Usuário não está autenticado.")
      return
    }
    setLoading(true)
    try {
      const response: { content: ReportType[] } | null = await request<{
        content: ReportType[]
      }>("/reports/hoje", "get", undefined, {
        authToken: token,
        withBearer: false,
      })
      if (response) {
        setReports(response.content)
      }
    } catch (error) {
      console.error("Erro ao buscar os reports:", error)
    } finally {
      setLoading(false)
    }
  }, [token])

  useFocusEffect(
    useCallback(() => {
      fetchReports()
    }, [fetchReports])
  )

  return (
    <View className="flex-1 bg-white py-4">
      <Text className="mb-2 text-center font-extrabold text-2xl text-green-700">
        Alertas
      </Text>
      <View className="h-0.5 w-full bg-gray-400" />

      {loading ? (
        <ActivityIndicator size="large" color="#22c55e" className="pt-20" />
      ) : reports.length === 0 ? (
        <Text className="mt-8 text-center text-gray-500">
          Nenhum alerta postado até agora...
        </Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ReportCard report={item} fetchReports={fetchReports} />
          )}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      )}
    </View>
  )
}
