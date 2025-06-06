import type { OpenMeteoResponse, ViaCepResponse } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { TextInput } from "react-native-gesture-handler"

export default function HomePage() {
  const [cep, setCep] = useState("")
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState<ViaCepResponse | null>(null)
  const [weatherData, setWeatherData] = useState<OpenMeteoResponse | null>(null)
  const [floodRisk, setFloodRisk] = useState<string | null>(null)

  const searchCEP = async () => {
    if (cep.length !== 8) return
    const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const cepData: ViaCepResponse = await cepResponse.json()

    if (cepData.erro) {
      Alert.alert("CEP não encontrado", "O CEP informado não foi encontrado")
      setLoading(false)
      return
    }

    setAddress(cepData)
    setLoading(true)
    try {
      const locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${cepData.localidade}&state=${cepData.uf}&country=Brasil&format=json`,
        { headers: { "User-Agent": "MeuAppAlagamento/1.0" } }
      )
      const locationData = await locationResponse.json()

      if (!locationData || locationData.length === 0) {
        Alert.alert("Erro", "Não foi possível localizar a cidade no mapa.")
        setLoading(false)
        return
      }

      const { lat, lon } = locationData[0]

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=precipitation,temperature_2m,relative_humidity_2m,rain,weather_code&daily=precipitation_sum`
      )

      const weather: OpenMeteoResponse = await weatherResponse.json()
      setWeatherData(weather)

      evaluateFloodRisk(weather)
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar os dados")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const evaluateFloodRisk = (weather: OpenMeteoResponse) => {
    if (!weather || !weather.current) {
      setFloodRisk("Dados meteorológicos indisponíveis")
      return
    }

    const dailyPrecipitationSum =
      weather.daily.precipitation_sum &&
      weather.daily.precipitation_sum.length > 0
        ? weather.daily.precipitation_sum[0]
        : 0

    const currentPrecipitation = weather.current.precipitation || 0
    const currentRain = weather.current.rain || 0

    if (currentPrecipitation > 10 || currentRain > 10) {
      setFloodRisk("Alto risco de alagamento! Precipitação intensa registrada.")
    } else if (currentPrecipitation > 5 || currentRain > 5) {
      setFloodRisk("Risco moderado de alagamento. Fique atento.")
    } else if (currentPrecipitation > 0 || currentRain > 0) {
      setFloodRisk("Baixo risco de alagamento, mas há precipitação.")
    } else if (dailyPrecipitationSum > 20) {
      setFloodRisk("Risco moderado. Volume alto de chuva previsto para hoje.")
    } else {
      setFloodRisk(
        "Sem risco de alagamento. Não há previsão de chuva significativa."
      )
    }
  }

  return (
    <View className="flex-1 items-center bg-white p-4">
      <Text className="mb-4 font-bold text-2xl text-gray-800">
        Bem-vindo ao <Text className="font-bold text-green-600">iNature</Text>!
      </Text>
      <View className="m-4 rounded-xl bg-white p-5 shadow">
        <Text className="mb-4 text-center font-bold text-gray-800 text-lg">
          Consulte o risco de alagamento na sua região
        </Text>

        <View className="mb-5 flex-row items-center">
          <TextInput
            className="h-12 flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 pb-2 text-base"
            placeholder="Digite seu CEP (somente números)"
            keyboardType="numeric"
            value={cep}
            onChangeText={setCep}
            maxLength={8}
            onSubmitEditing={searchCEP}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            className="ml-2 h-12 w-12 items-center justify-center rounded-lg bg-green-600"
            onPress={searchCEP}
            disabled={loading}
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {loading && (
          <Text className="mx-auto py-4 text-center">
            <ActivityIndicator size="large" color="#22c55e" />{" "}
          </Text>
        )}

        {address && weatherData && (
          <View className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <Text className="mb-1 font-bold text-gray-800 text-lg">
              {address.logradouro}, {address.bairro}
            </Text>
            <Text className="mb-4 text-base text-gray-600">
              {address.localidade} - {address.uf}
            </Text>

            <View className="mb-5 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="font-bold text-2xl text-gray-800">
                  {Math.round(weatherData.current.temperature_2m)}°C
                </Text>
                <Text className="text-gray-700 text-sm">
                  Umidade: {weatherData.current.relative_humidity_2m}%
                </Text>
                <Text className="text-gray-700 text-sm">
                  Precipitação: {weatherData.current.precipitation || 0}mm
                </Text>
                {weatherData.current.rain > 0 && (
                  <Text className="text-gray-700 text-sm">
                    Chuva: {weatherData.current.rain}mm
                  </Text>
                )}
              </View>
              <View className="h-20 w-20 items-center justify-center">
                <Ionicons
                  name={
                    weatherData.current.precipitation > 0 ||
                    weatherData.current.rain > 0
                      ? "rainy"
                      : "sunny"
                  }
                  size={60}
                  color="#0066CC"
                />
              </View>
            </View>

            <View
              className={[
                "mt-2 rounded-lg p-4",
                floodRisk?.includes("Alto")
                  ? "border border-red-200 bg-red-50"
                  : floodRisk?.includes("moderado")
                    ? "border border-yellow-200 bg-yellow-50"
                    : "border border-green-200 bg-green-50",
              ].join(" ")}
            >
              <Text className="text-center font-bold text-base">
                {floodRisk}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
