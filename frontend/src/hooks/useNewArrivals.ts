import { useState, useEffect } from 'react';
import { productService } from '../services/ProductService';
import type { Product } from '../types/Product';

export const useNewArrivals = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getNewArrivals();
                setProducts(data);
            } catch (err) {
                setError('Erreur lors du chargement des nouveautés');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts().catch(console.error);
    }, []);

    return { products, loading, error };
};
