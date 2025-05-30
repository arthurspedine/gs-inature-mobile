import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
	token: string | null;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		checkAuthState();
	}, []);

	const checkAuthState = async () => {
		try {
			const storedToken = await AsyncStorage.getItem("jwt_token");

			if (storedToken) {
				setToken(storedToken);
			}
		} catch (error) {
			console.error("Error checking auth state:", error);
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
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<AuthContext.Provider value={{ token, login, signup, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

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
			token: `fake-jwt-token-${Date.now()}`,
		};
	}
	return { success: false };
};
