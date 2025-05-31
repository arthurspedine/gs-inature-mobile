import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
	sub: string;
	nome: string;
	email: string;
	role: string;
	exp: number;
}

interface AuthContextType {
	token: string | null;
	role: string | null;
	login: (email: string, password: string) => Promise<boolean>;
	signup: (name: string, email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);
	const [role, setRole] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		checkAuthState();
	}, []);

	const checkAuthState = async () => {
		try {
			const storedToken = await AsyncStorage.getItem("jwt_token");

			if (storedToken && isValidJwt(storedToken)) {
				setToken(storedToken);
				const decodedToken = jwtDecode<JwtPayload>(storedToken);
				setRole(decodedToken.role);
			} else {
				setToken(null);
				setRole(null);
			}
		} catch (error) {
			console.error("Error checking auth state:", error);
			setToken(null);
			setRole(null);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (email: string, password: string): Promise<boolean> => {
		try {
			// Simulate API call
			const response: { success: boolean; token?: string } =
				await simulateLogin(email, password);

			if (response.success && response.token) {
				await AsyncStorage.setItem("jwt_token", response.token);
				setToken(response.token);
				const decodedToken = jwtDecode<JwtPayload>(response.token);
				setRole(decodedToken.role);
				return true;
			}
			return false;
		} catch (error) {
			console.error("Login error:", error);
			return false;
		}
	};

	const signup = async (
		name: string,
		email: string,
		password: string,
	): Promise<boolean> => {
		try {
			console.log("Signing up with:", { name, email, password });

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			return true;
		} catch (error) {
			console.error("Signup error:", error);
			return false;
		}
	};

	const logout = async () => {
		try {
			await AsyncStorage.removeItem("jwt_token");
			setToken(null);
			setRole(null);
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ token, role, login, signup, logout, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

function isValidJwt(token: string): boolean {
	try {
		const decoded = jwtDecode<JwtPayload>(token);
		if (decoded.exp && Date.now() >= decoded.exp * 1000) {
			return false;
		}
		return true;
	} catch {
		return false;
	}
}

// Simulate API calls - replace with your actual API endpoints
const simulateLogin = async (
	email: string,
	password: string,
): Promise<{ success: boolean; token?: string }> => {
	await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

	// Simple validation for demo
	if (email === "user@example.com" && password === "password") {
		return {
			success: true,
			token:
				// test JWT token for demo
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Iiwibm9tZSI6IlRlc3RlIiwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJyb2xlIjoiVVNVQVJJTyIsImV4cCI6MTc0OTMyMTExOX0.zk5geEu5wg1eCn6N5m3nH8NtphlJTca-43iNZnBHyAs",
		};
	}
	return { success: false };
};
