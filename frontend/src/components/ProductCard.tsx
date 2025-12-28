import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.productCode}`);
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="product-image">
                <div className="product-badge" data-gender={product.gender}>{product.gender}</div>
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                ) : (
                    <div className="product-placeholder">🧴</div>
                )}
            </div>

            <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">{product.price.toFixed(2)} €</div>
                <div className="product-stock">
                    {product.stock > 0 ? (
                        <span className="stock-available">✓ En stock</span>
                    ) : (
                        <span className="stock-unavailable">✗ Rupture de stock</span>
                    )}
                </div>
                <button className="product-btn">Voir le produit</button>
            </div>
        </div>
    );
};

export default ProductCard;