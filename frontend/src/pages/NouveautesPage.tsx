import React from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import { useNewArrivals } from '../hooks/useNewArrivals';

const NouveautesPage: React.FC = () => {
    const { products, loading, error } = useNewArrivals();

    return (
        <div>
            <Header />
            <ProductList
                products={products}
                loading={loading}
                error={error}
                title="Nouveautés"
                description="Découvrez nos parfums ajoutés cette semaine"
            />
        </div>
    );
};

export default NouveautesPage;
