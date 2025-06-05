import { Ionicons } from "@expo/vector-icons"
import type { DrawerNavigationProp } from "@react-navigation/drawer"
import { useNavigation } from "@react-navigation/native"
import { useRouter } from "expo-router"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { useAuth } from "../context/AuthContext"

type RootDrawerParamList = {
  Home: undefined
}

export function Header() {
  const { logout } = useAuth()
  const router = useRouter()
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>()

  const handleLogout = async () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout()
          router.replace("/(auth)/login")
        },
      },
    ])
  }

  return (
    <View className="h-28 flex-row items-center justify-between bg-white px-4 py-3 pt-14 shadow-sm">
      {/* Botão para abrir o Drawer */}
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Título centralizado */}
      <Text className="font-bold text-green-700 text-xl">iNature</Text>

      {/* Botão de logout à direita */}
      <TouchableOpacity onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={26} color="#ef4444" />
      </TouchableOpacity>
    </View>
  )
}
