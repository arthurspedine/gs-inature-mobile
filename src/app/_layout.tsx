import { AuthProvider, useAuth } from "@/context/AuthContext"
import { Stack } from "expo-router"
import { router, useSegments } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import "@/styles/globals.css"

function InitialLayout() {
  const { token, isLoading } = useAuth()
  const segments = useSegments()

  useEffect(() => {
    if (!isLoading) {
      const inAuthGroup = segments[0] === "(auth)"

      if (!token && !inAuthGroup) {
        // Redirect to login if not authenticated
        router.replace("/(auth)/login")
      } else if (token && inAuthGroup) {
        // Redirect to home if authenticated
        router.replace("/(drawer)/home")
      }
    }
  }, [token, isLoading, segments])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    )
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  )
}
