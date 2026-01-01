import { api } from './api';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/Account';

// Cache pour éviter les appels répétés à /me
let authCache: { email: string; role: string } | null = null;

export const authService = {
    // Login (client ou admin)
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/accounts/login', credentials);
        // Sauvegarder dans le cache et localStorage
        authCache = { email: response.data.email, role: response.data.role };
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userRole', response.data.role);
        return response.data;
    },

    // Register (inscription client)
    register: async (data: RegisterRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/accounts/register', data);
        // Sauvegarder dans le cache et localStorage
        authCache = { email: response.data.email, role: response.data.role };
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userRole', response.data.role);
        return response.data;
    },

    // Logout - appeler l'API pour supprimer le cookie
    logout: async (): Promise<void> => {
        try {
            await api.post('/accounts/logout');
        } catch (error) {
            console.error('Erreur lors du logout:', error);
        }
        authCache = null;
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
    },

    // Vérifier l'authentification via l'API
    checkAuth: async (): Promise<LoginResponse | null> => {
        try {
            const response = await api.get<LoginResponse>('/accounts/me');
            authCache = { email: response.data.email, role: response.data.role };
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userRole', response.data.role);
            return response.data;
        } catch {
            authCache = null;
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userRole');
            return null;
        }
    },

    // Vérifier si email existe
    emailExists: async (email: string): Promise<boolean> => {
        const response = await api.get<boolean>(`/accounts/exists/${email}`);
        return response.data;
    },

    // Récupérer l'email de l'utilisateur (depuis le cache ou localStorage)
    getUserEmail: (): string | null => {
        return authCache?.email || localStorage.getItem('userEmail');
    },

    // Récupérer le rôle de l'utilisateur
    getUserRole: (): string | null => {
        return authCache?.role || localStorage.getItem('userRole');
    },

    // Vérifier si l'utilisateur est connecté (vérifie le cache local)
    isAuthenticated: (): boolean => {
        return !!(authCache?.email || localStorage.getItem('userEmail'));
    },

    // Méthodes dépréciées (pour compatibilité)
    saveToken: (_token: string) => {
        console.warn('saveToken est déprécié - le token est maintenant dans un cookie httpOnly');
    },
    getToken: (): string | null => {
        console.warn('getToken est déprécié - le token est maintenant dans un cookie httpOnly');
        return null;
    },
    removeToken: () => {
        console.warn('removeToken est déprécié - utilisez logout() à la place');
        authService.logout();
    },
    saveUserEmail: (email: string) => {
        localStorage.setItem('userEmail', email);
    },
};