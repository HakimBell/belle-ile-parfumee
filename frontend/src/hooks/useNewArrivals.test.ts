import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNewArrivals } from './useNewArrivals';
import { productService } from '../services/ProductService';
import type { Product } from '../types/Product';

// Mock du service
vi.mock('../services/ProductService', () => ({
    productService: {
        getNewArrivals: vi.fn(),
    },
}));

describe('useNewArrivals', () => {
    const mockProducts: Product[] = [
        {
            productCode: 'PROD-001',
            name: 'Parfum Test 1',
            brand: 'Marque Test',
            price: 99.99,
            stock: 10,
            description: 'Description test',
            imageUrl: 'https://example.com/image.jpg',
            createdAt: new Date().toISOString(),
            concentrationType: 'Eau de Parfum',
            gender: 'Mixte',
            size: 100,
        },
        {
            productCode: 'PROD-002',
            name: 'Parfum Test 2',
            brand: 'Autre Marque',
            price: 149.99,
            stock: 5,
            description: 'Autre description',
            imageUrl: 'https://example.com/image2.jpg',
            createdAt: new Date().toISOString(),
            concentrationType: 'Eau de Toilette',
            gender: 'Homme',
            size: 50,
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('doit retourner les nouveautés avec succès', async () => {
        // Given
        vi.mocked(productService.getNewArrivals).mockResolvedValue(mockProducts);

        // When
        const { result } = renderHook(() => useNewArrivals());

        // Then - Vérifier l'état initial (loading)
        expect(result.current.loading).toBe(true);
        expect(result.current.products).toEqual([]);
        expect(result.current.error).toBeNull();

        // Attendre que le chargement soit terminé
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Vérifier les résultats
        expect(result.current.products).toEqual(mockProducts);
        expect(result.current.products).toHaveLength(2);
        expect(result.current.error).toBeNull();
        expect(productService.getNewArrivals).toHaveBeenCalledTimes(1);
    });

    it('doit gérer les erreurs correctement', async () => {
        // Given
        vi.mocked(productService.getNewArrivals).mockRejectedValue(new Error('Network error'));

        // When
        const { result } = renderHook(() => useNewArrivals());

        // Attendre que le chargement soit terminé
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Then
        expect(result.current.products).toEqual([]);
        expect(result.current.error).toBe('Erreur lors du chargement des nouveautés');
    });

    it('doit retourner une liste vide si aucune nouveauté', async () => {
        // Given
        vi.mocked(productService.getNewArrivals).mockResolvedValue([]);

        // When
        const { result } = renderHook(() => useNewArrivals());

        // Attendre que le chargement soit terminé
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Then
        expect(result.current.products).toEqual([]);
        expect(result.current.products).toHaveLength(0);
        expect(result.current.error).toBeNull();
    });
});
