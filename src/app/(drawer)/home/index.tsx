import { Text, View } from "react-native"

export default function HomePage() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="mb-4 font-bold text-2xl text-gray-800">
        Bem-vindo ao <Text className="font-bold text-green-600">iNature</Text>!
      </Text>
    </View>
  )
}
