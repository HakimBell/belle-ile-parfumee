import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import { useNewArrivals } from '../hooks/useNewArrivals';

const NouveautesPage: React.FC = () => {
    const { products, loading, error } = useNewArrivals();

    return (
        <div className="page-wrapper">
            <Header />
            <ProductList
                products={products}
                loading={loading}
                error={error}
                title="Nouveautés"
                description="Découvrez nos parfums ajoutés cette semaine"
            />
            <Footer />
        </div>
    );
};

export default NouveautesPage;
