import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types/Product';
import type { CartItem } from '../types/Cart';

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productCode: string) => void;
    updateQuantity: (productCode: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'belle-ile-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const addToCart = (product: Product, quantity: number) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.productCode === product.productCode);

            if (existingItem) {
                return prevItems.map(item =>
                    item.product.productCode === product.productCode
                        ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                        : item
                );
            }

            return [...prevItems, { product, quantity }];
        });
    };

    const removeFromCart = (productCode: string) => {
        setItems(prevItems => prevItems.filter(item => item.product.productCode !== productCode));
    };

    const updateQuantity = (productCode: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productCode);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.product.productCode === productCode
                    ? { ...item, quantity: Math.min(quantity, item.product.stock) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{
            items,
            totalItems,
            totalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};