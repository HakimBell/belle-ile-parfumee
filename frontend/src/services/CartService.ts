import { api } from './api';
import type { CartResponseDTO, CartItemRequest } from '../types/CartApi';

export const cartApiService = {
    getCart: async (email: string): Promise<CartResponseDTO> => {
        const response = await api.get<CartResponseDTO>('/orders/cart', {
            params: { email }
        });
        return response.data;
    },

    addItem: async (email: string, item: CartItemRequest): Promise<CartResponseDTO> => {
        const response = await api.post<CartResponseDTO>('/orders/cart/items', item, {
            params: { email }
        });
        return response.data;
    },

    updateItem: async (email: string, productCode: string, quantity: number): Promise<CartResponseDTO> => {
        const response = await api.put<CartResponseDTO>(
            `/orders/cart/items/${productCode}`,
            { productCode, quantity },
            { params: { email } }
        );
        return response.data;
    },

    removeItem: async (email: string, productCode: string): Promise<CartResponseDTO> => {
        const response = await api.delete<CartResponseDTO>(
            `/orders/cart/items/${productCode}`,
            { params: { email } }
        );
        return response.data;
    },

    clearCart: async (email: string): Promise<void> => {
        await api.delete('/orders/cart', {
            params: { email }
        });
    },

    checkout: async (email: string): Promise<CartResponseDTO> => {
        const response = await api.post<CartResponseDTO>('/orders/cart/checkout', null, {
            params: { email }
        });
        return response.data;
    }
};
