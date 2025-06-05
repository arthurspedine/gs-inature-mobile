import axios from "axios";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ReportCard } from "../../../components/report-card";
import { useAuth } from "../../../context/AuthContext";
import type { ReportType } from "../../../types";

export default function ReportsPage() {
	const { token } = useAuth();
	const [reports, setReports] = useState<ReportType[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchReports = useCallback(async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				"http://192.168.0.113:8080/reports/hoje",
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setReports(response.data.content);
		} catch (error) {
			console.error("Erro ao buscar os reports:", error);
		} finally {
			setLoading(false);
		}
	}, [token]);

	useFocusEffect(
		useCallback(() => {
			fetchReports();
		}, [fetchReports]),
	);

	return (
		<View className="flex-1 py-4 bg-white">
			<Text className="text-3xl font-extrabold text-green-700 mb-2 text-center">
				Alertas
			</Text>
			<View className="bg-gray-400 h-0.5 w-full" />

			{loading ? (
				<ActivityIndicator size="large" color="#22c55e" className="pt-20" />
			) : reports.length === 0 ? (
				<Text className="text-center text-gray-500 mt-8">
					Nenhum alerta postado até agora...
				</Text>
			) : (
				<FlatList
					data={reports}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<ReportCard report={item} fetchReports={fetchReports} />
					)}
					contentContainerStyle={{ paddingHorizontal: 16 }}
				/>
			)}
		</View>
	);
}
