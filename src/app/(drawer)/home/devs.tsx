import { Image, ScrollView, Text, View } from "react-native"

const developers = [
  {
    name: "Matheus Esteves",
    rm: "554769",
    imageUrl: "https://github.com/matheus-esteves10.png",
  },
  {
    name: "Gabriel Falanga",
    rm: "555061",
    imageUrl: "https://github.com/gabrielfalanga.png",
  },
  {
    name: "Arthur Spedine",
    rm: "554489",
    imageUrl: "https://github.com/arthurspedine.png",
  },
]

export default function DevsPage() {
  return (
    <ScrollView contentContainerClassName="flex-1 items-center p-4">
      <Text className="mb-4 text-center font-extrabold text-2xl text-green-700">
        Desenvolvedores
      </Text>

      <View className="flex w-full flex-col items-center gap-6">
        {developers.map(dev => (
          <View
            key={dev.rm}
            className="w-80 items-center gap-2 rounded-xl bg-white p-4 shadow-md"
            style={{ shadowColor: "#aaa" }}
          >
            <Image
              source={{ uri: dev.imageUrl }}
              className="size-20 rounded-full"
            />
            <View className="items-center">
              <Text className="font-semibold text-lg">{dev.name}</Text>
              <Text className="text-sm text-zinc-800">RM: {dev.rm}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
