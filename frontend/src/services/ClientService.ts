import { api } from './api';
import type { Client } from '../types/Client';

export const clientService = {
    getAll: async (): Promise<Client[]> => {
        const response = await api.get<Client[]>('/clients');
        return response.data;
    },

    getByEmail: async (email: string): Promise<Client> => {
        const response = await api.get<Client>(`/clients/${email}`);
        return response.data;
    },

    delete: async (email: string): Promise<void> => {
        await api.delete(`/clients/${email}`);
    }
};
