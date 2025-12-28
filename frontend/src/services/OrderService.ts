import { api } from './api';
import type { Order, OrderLine } from '../types/Order';

export const orderService = {
    getAll: async (): Promise<Order[]> => {
        const response = await api.get<Order[]>('/orders');
        return response.data;
    },

    getByCommandNumber: async (commandNumber: string): Promise<Order> => {
        const response = await api.get<Order>(`/orders/${commandNumber}`);
        return response.data;
    },

    getByClientEmail: async (email: string): Promise<Order[]> => {
        const response = await api.get<Order[]>(`/orders/client/${email}`);
        return response.data;
    },

    getOrderLines: async (commandNumber: string): Promise<OrderLine[]> => {
        const response = await api.get<OrderLine[]>(`/orderlines/order/${commandNumber}`);
        return response.data;
    },

    delete: async (commandNumber: string): Promise<void> => {
        await api.delete(`/orders/${commandNumber}`);
    }
};
