import { request } from "@/helprer/request"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface JwtPayload {
  sub: string
  nome: string
  email: string
  role: string
  exp: number
}

interface AuthContextType {
  token: string | null
  role: string | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("jwt_token")

      if (storedToken && isValidJwt(storedToken)) {
        setToken(storedToken)
        const decodedToken = jwtDecode<JwtPayload>(storedToken)
        setRole(decodedToken.role)
      } else {
        setToken(null)
        setRole(null)
      }
    } catch (error) {
      console.error("Error checking auth state:", error)
      setToken(null)
      setRole(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await request<{ token: string } | null>(
        "/login",
        "post",
        {
          username: email,
          password,
        }
      )
      if (!response) {
        console.error("Login failed: No response from server")
        return false
      }

      const receivedToken = response.token

      if (receivedToken && isValidJwt(receivedToken)) {
        await AsyncStorage.setItem("jwt_token", receivedToken)
        setToken(receivedToken)
        const decodedToken = jwtDecode<JwtPayload>(receivedToken)
        setRole(decodedToken.role)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const body = { nome: name, email, senha: password }
      await request("/users", "post", body)
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("jwt_token")
      setToken(null)
      setRole(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, role, login, signup, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function isValidJwt(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return false
    }
    return true
  } catch {
    return false
  }
}
