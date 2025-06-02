import { View, Text, Image, ScrollView } from "react-native";

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
];

export default function DevsPage() {
	return (
		<ScrollView contentContainerClassName="flex-1 items-center p-4">
			<Text className="text-3xl font-extrabold text-green-700 mb-4 text-center">
				Desenvolvedores
			</Text>

			<View className="flex flex-col items-center gap-6 w-full">
				{developers.map((dev) => (
					<View
						key={dev.rm}
						className="items-center bg-white p-4 rounded-xl shadow-md w-80 gap-2"
						style={{ shadowColor: "#aaa" }}
					>
						<Image
							source={{ uri: dev.imageUrl }}
							className="size-20 rounded-full"
						/>
						<View className="items-center">
							<Text className="text-lg font-semibold">{dev.name}</Text>
							<Text className="text-sm text-zinc-800">RM: {dev.rm}</Text>
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	);
}
