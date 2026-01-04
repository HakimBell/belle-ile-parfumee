import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/ProductService';
import type { Product } from '../types/Product';
import './SearchResults.css';

const SearchResults: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const searchProducts = async () => {
            if (!query.trim()) {
                setProducts([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const allProducts = await productService.getAllProducts();

                const searchLower = query.toLowerCase();
                const filtered = allProducts.filter(product =>
                    product.name.toLowerCase().includes(searchLower) ||
                    product.brand.toLowerCase().includes(searchLower) ||
                    product.description?.toLowerCase().includes(searchLower)
                );

                setProducts(filtered);
            } catch (err) {
                setError('Erreur lors de la recherche');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        searchProducts();
    }, [query]);

    return (
        <div className="page-wrapper">
            <Header />
            <div className="search-results-container">
                <div className="search-results-header">
                    <h1>Résultats de recherche</h1>
                    {query && (
                        <p className="search-query">
                            pour "<strong>{query}</strong>"
                        </p>
                    )}
                    <span className="results-count">
                        {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
                    </span>
                </div>

                {loading ? (
                    <div className="search-loading">Recherche en cours...</div>
                ) : error ? (
                    <div className="search-error">{error}</div>
                ) : products.length === 0 ? (
                    <div className="no-results">
                        <p>Aucun produit trouvé pour "{query}"</p>
                        <p className="no-results-hint">Essayez avec d'autres mots-clés</p>
                    </div>
                ) : (
                    <div className="search-results-grid">
                        {products.map((product) => (
                            <ProductCard key={product.productCode} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
