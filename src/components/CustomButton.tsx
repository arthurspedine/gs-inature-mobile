import { Text, TouchableOpacity } from "react-native"

interface CustomButtonProps {
  title: string
  onPress?: () => void
  style?: string
  textStyle?: string
}

export default function CustomButton({
  title,
  onPress,
  style = "bg-blue-500",
  textStyle = "text-white",
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      className={`rounded-lg px-6 py-3 ${style}`}
      onPress={onPress}
    >
      <Text className={`text-center font-medium ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}
