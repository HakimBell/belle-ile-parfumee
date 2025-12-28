import { useState, useEffect, useCallback } from 'react';
import { orderService } from '../services/OrderService';
import type { Order } from '../types/Order';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await orderService.getAll();
            setOrders(data);
        } catch (err) {
            setError('Erreur lors du chargement des commandes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const deleteOrder = async (commandNumber: string): Promise<boolean> => {
        try {
            await orderService.delete(commandNumber);
            return true;
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
            return false;
        }
    };

    return {
        orders,
        loading,
        error,
        refetch: fetchOrders,
        deleteOrder
    };
};
