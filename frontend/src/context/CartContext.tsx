import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product } from '../types/Product';
import type { CartItem } from '../types/Cart';
import { authService } from '../services/authService';
import { cartApiService } from '../services/CartService';

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isLoading: boolean;
    error: string | null;
    addToCart: (product: Product, quantity: number) => Promise<void>;
    removeFromCart: (productCode: string) => Promise<void>;
    updateQuantity: (productCode: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    checkout: () => Promise<boolean>;
    syncCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'belle-ile-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fonctions pour obtenir l'état d'auth à jour (pas de cache)
    const getIsAuthenticated = () => authService.isAuthenticated();
    const getUserEmail = () => authService.getUserEmail();

    // Convertir les items du backend en CartItem frontend
    const convertBackendItems = (backendItems: { productCode: string; productName: string; brand: string; unitPrice: number; quantity: number; stock: number; imageUrl?: string; concentrationType: string; size: number; gender: string; }[]): CartItem[] => {
        return backendItems.map(item => ({
            product: {
                productCode: item.productCode,
                name: item.productName,
                brand: item.brand,
                price: item.unitPrice,
                stock: item.stock,
                imageUrl: item.imageUrl,
                concentrationType: item.concentrationType,
                size: item.size,
                gender: item.gender,
                description: '',
                createdAt: ''
            },
            quantity: item.quantity
        }));
    };

    // Charger le panier au démarrage
    useEffect(() => {
        const loadCart = async () => {
            const isAuth = getIsAuthenticated();
            const email = getUserEmail();

            if (isAuth && email) {
                setIsLoading(true);
                try {
                    const backendCart = await cartApiService.getCart(email);
                    if (backendCart && backendCart.items && backendCart.items.length > 0) {
                        setItems(convertBackendItems(backendCart.items));
                    } else {
                        // Pas de panier backend, charger depuis localStorage
                        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
                        if (savedCart) {
                            setItems(JSON.parse(savedCart));
                        }
                    }
                } catch (err) {
                    console.error('Erreur chargement panier:', err);
                    // Fallback vers localStorage
                    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
                    if (savedCart) {
                        setItems(JSON.parse(savedCart));
                    }
                } finally {
                    setIsLoading(false);
                }
            } else {
                // Non connecté - utiliser localStorage
                const savedCart = localStorage.getItem(CART_STORAGE_KEY);
                setItems(savedCart ? JSON.parse(savedCart) : []);
            }
        };

        loadCart();
    }, []);

    // Sauvegarder dans localStorage quand non connecté
    useEffect(() => {
        if (!getIsAuthenticated()) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const addToCart = useCallback(async (product: Product, quantity: number) => {
        setError(null);
        const isAuth = getIsAuthenticated();
        const email = getUserEmail();

        if (isAuth && email) {
            setIsLoading(true);
            try {
                const updatedCart = await cartApiService.addItem(email, {
                    productCode: product.productCode,
                    quantity
                });
                setItems(convertBackendItems(updatedCart.items));
            } catch (err) {
                setError('Erreur lors de l\'ajout au panier');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Mode localStorage
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
        }
    }, []);

    const removeFromCart = useCallback(async (productCode: string) => {
        setError(null);
        const isAuth = getIsAuthenticated();
        const email = getUserEmail();

        if (isAuth && email) {
            setIsLoading(true);
            try {
                const updatedCart = await cartApiService.removeItem(email, productCode);
                setItems(convertBackendItems(updatedCart.items));
            } catch (err) {
                setError('Erreur lors de la suppression');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        } else {
            setItems(prevItems => prevItems.filter(item => item.product.productCode !== productCode));
        }
    }, []);

    const updateQuantity = useCallback(async (productCode: string, quantity: number) => {
        setError(null);

        if (quantity <= 0) {
            return removeFromCart(productCode);
        }

        const isAuth = getIsAuthenticated();
        const email = getUserEmail();

        if (isAuth && email) {
            setIsLoading(true);
            try {
                const updatedCart = await cartApiService.updateItem(email, productCode, quantity);
                setItems(convertBackendItems(updatedCart.items));
            } catch (err) {
                setError('Erreur lors de la mise à jour');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        } else {
            setItems(prevItems =>
                prevItems.map(item =>
                    item.product.productCode === productCode
                        ? { ...item, quantity: Math.min(quantity, item.product.stock) }
                        : item
                )
            );
        }
    }, [removeFromCart]);

    const clearCart = useCallback(async () => {
        setError(null);
        const isAuth = getIsAuthenticated();
        const email = getUserEmail();

        if (isAuth && email) {
            setIsLoading(true);
            try {
                await cartApiService.clearCart(email);
                setItems([]);
            } catch (err) {
                setError('Erreur lors du vidage du panier');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        } else {
            setItems([]);
        }
    }, []);

    const checkout = useCallback(async (): Promise<boolean> => {
        const isAuth = getIsAuthenticated();
        const email = getUserEmail();

        if (!isAuth || !email) {
            setError('Veuillez vous connecter pour passer commande');
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            await cartApiService.checkout(email);
            setItems([]);
            localStorage.removeItem(CART_STORAGE_KEY);
            return true;
        } catch (err) {
            setError('Erreur lors de la validation de la commande');
            console.error(err);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Synchroniser le panier localStorage vers le backend après connexion
    const syncCart = useCallback(async () => {
        const isAuth = getIsAuthenticated();
        const email = getUserEmail();

        if (!isAuth || !email) return;

        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (!savedCart) return;

        const localItems: CartItem[] = JSON.parse(savedCart);
        if (localItems.length === 0) return;

        setIsLoading(true);
        try {
            // Ajouter chaque item local au panier backend
            for (const item of localItems) {
                await cartApiService.addItem(email, {
                    productCode: item.product.productCode,
                    quantity: item.quantity
                });
            }

            // Vider le localStorage après synchronisation
            localStorage.removeItem(CART_STORAGE_KEY);

            // Recharger le panier depuis le backend
            const backendCart = await cartApiService.getCart(email);
            setItems(convertBackendItems(backendCart.items));
        } catch (err) {
            console.error('Erreur synchronisation panier:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <CartContext.Provider value={{
            items,
            totalItems,
            totalPrice,
            isLoading,
            error,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            checkout,
            syncCart
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
