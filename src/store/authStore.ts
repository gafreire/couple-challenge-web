import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    name: string;
    couple_id: string | null
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

const getInitialToken = (): string | null => {
    try {
        return localStorage.getItem('token');
    } catch {
        return null;
    }
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: getInitialToken(),
    isAuthenticated: !!getInitialToken(),
    
    setAuth: (user: User, token: string) => {
        localStorage.setItem('token', token);
        set({
            user,
            token,
            isAuthenticated: true,
        });
    },
    
    logout: () => {
        localStorage.removeItem('token');
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },
}));