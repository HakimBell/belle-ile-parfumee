import { useState, useEffect, useCallback } from 'react';
import { clientService } from '../services/ClientService';
import type { Client } from '../types/Client';

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await clientService.getAll();
            setClients(data);
        } catch (err) {
            setError('Erreur lors du chargement des clients');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const deleteClient = async (email: string): Promise<boolean> => {
        try {
            await clientService.delete(email);
            return true;
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
            return false;
        }
    };

    return {
        clients,
        loading,
        error,
        refetch: fetchClients,
        deleteClient
    };
};
