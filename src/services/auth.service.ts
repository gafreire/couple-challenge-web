import type { AuthResponse } from "../types/auth.types";
import api from "./api";

export const authService = {
    login: async (email: string, password: string) => {
        const response = await api.post(`/auth/login`, {
            email,
            password
        });
        return response.data as AuthResponse;
    },
    signup: async (name: string, email: string, password: string) => {
        const response = await api.post(`/auth/signup`, {
            name,
            email,
            password
        });
        return response.data as AuthResponse;
    }
};
