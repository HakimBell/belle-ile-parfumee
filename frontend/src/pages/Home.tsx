import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import './Home.css';

const Home: React.FC = () => {
    const { products, loading, error } = useProducts();

    return (
        <div className="page-wrapper">
            <Header />
            <main className="home-container">
                <div className="page-header">
                    <h1>Collection Parfums</h1>
                    <p>Découvrez notre sélection de parfums pour hommes et femmes</p>
                </div>

                {loading && <p>Chargement des produits...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.productCode} product={product} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;