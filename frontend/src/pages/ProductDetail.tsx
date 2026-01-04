import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProduct } from '../hooks/useProduct';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
    const { productCode } = useParams<{ productCode: string }>();
    const navigate = useNavigate();
    const { product, loading, error } = useProduct(productCode || '');
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleIncrement = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    const getGenderRoute = (gender: string) => {
        switch (gender) {
            case 'Homme': return '/parfums/hommes';
            case 'Femme': return '/parfums/femmes';
            case 'Mixte': return '/parfums/mixtes';
            default: return '/';
        }
    };

    const getGenderLabel = (gender: string) => {
        switch (gender) {
            case 'Homme': return 'Hommes';
            case 'Femme': return 'Femmes';
            case 'Mixte': return 'Mixtes';
            default: return gender;
        }
    };

    if (loading) {
        return (
            <div className="page-wrapper">
                <Header />
                <div className="product-loading">
                    <div className="loading-spinner"></div>
                    <p>Chargement...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="page-wrapper">
                <Header />
                <div className="product-error">
                    <h2>Produit non trouvé</h2>
                    <p>Le produit que vous recherchez n'existe pas.</p>
                    <button onClick={() => navigate('/')} className="btn-back-home">
                        Retour à l'accueil
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Header />
            <div className="product-page">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Accueil</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to={getGenderRoute(product.gender)}>Parfums {getGenderLabel(product.gender)}</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{product.name}</span>
                </nav>

                <div className="product-main">
                    {/* Image Section */}
                    <div className="product-gallery">
                        <div className="product-image-main">
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} />
                            ) : (
                                <div className="product-image-placeholder">
                                    <span>Image non disponible</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="product-info">
                        <div className="product-header">
                            <span className="product-brand">{product.brand}</span>
                            <h1 className="product-title">{product.name}</h1>
                            <div className="product-meta">
                                <span className="product-size">{product.size} ml</span>
                                <span className="product-meta-separator">•</span>
                                <span className="product-type">{product.concentrationType}</span>
                            </div>
                        </div>

                        <div className="product-price-section">
                            <span className="product-price">{product.price.toFixed(2)} €</span>
                            <div className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                {product.stock > 0 ? (
                                    <>
                                        <span className="stock-dot"></span>
                                        En stock
                                    </>
                                ) : (
                                    <>
                                        <span className="stock-dot"></span>
                                        Rupture de stock
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Add to Cart Section */}
                        <div className="product-purchase">
                            <div className="quantity-control">
                                <span className="quantity-label">Quantité</span>
                                <div className="quantity-selector">
                                    <button
                                        className="qty-btn"
                                        onClick={handleDecrement}
                                        disabled={quantity <= 1}
                                    >
                                        −
                                    </button>
                                    <span className="qty-value">{quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={handleIncrement}
                                        disabled={product.stock <= quantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="product-buttons">
                                <button
                                    className={`btn-add-cart ${addedToCart ? 'added' : ''}`}
                                    disabled={product.stock === 0}
                                    onClick={handleAddToCart}
                                >
                                    {addedToCart ? 'Ajouté au panier ✓' : 'Ajouter au panier'}
                                </button>
                                <button className="btn-wishlist" aria-label="Ajouter aux favoris">
                                    ♡
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description || 'Aucune description disponible.'}</p>
                        </div>

                        {/* Caractéristiques */}
                        <div className="product-specs">
                            <h3>Caractéristiques</h3>
                            <div className="specs-tags">
                                <div className="spec-tag">
                                    <span className="spec-tag-label">Marque</span>
                                    <span className="spec-tag-value">{product.brand}</span>
                                </div>
                                <div className="spec-tag">
                                    <span className="spec-tag-label">Concentration</span>
                                    <span className="spec-tag-value">{product.concentrationType}</span>
                                </div>
                                <div className="spec-tag">
                                    <span className="spec-tag-label">Contenance</span>
                                    <span className="spec-tag-value">{product.size} ml</span>
                                </div>
                                <div className="spec-tag">
                                    <span className="spec-tag-label">Genre</span>
                                    <span className="spec-tag-value">{product.gender}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
