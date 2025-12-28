import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

    const handleQuantityChange = (productCode: string, newQuantity: number) => {
        updateQuantity(productCode, newQuantity);
    };

    if (items.length === 0) {
        return (
            <div>
                <Header />
                <div className="cart-container">
                    <div className="cart-empty">
                        <div className="cart-empty-icon">🛒</div>
                        <h2>Votre panier est vide</h2>
                        <p>Découvrez nos parfums et ajoutez vos favoris au panier</p>
                        <button className="continue-shopping-btn" onClick={() => navigate('/')}>
                            Continuer mes achats
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Mon Panier</h1>
                    <span className="cart-count">{totalItems} article{totalItems > 1 ? 's' : ''}</span>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {items.map(item => (
                            <div key={item.product.productCode} className="cart-item">
                                <div className="cart-item-image">
                                    {item.product.imageUrl ? (
                                        <img src={item.product.imageUrl} alt={item.product.name} />
                                    ) : (
                                        <div className="cart-item-placeholder">🧴</div>
                                    )}
                                </div>

                                <div className="cart-item-details">
                                    <div className="cart-item-info">
                                        <p className="cart-item-brand">{item.product.brand}</p>
                                        <h3 className="cart-item-name">{item.product.name}</h3>
                                        <p className="cart-item-variant">
                                            {item.product.size} ml - {item.product.concentrationType}
                                        </p>
                                    </div>

                                    <div className="cart-item-actions">
                                        <div className="cart-quantity-selector">
                                            <button
                                                className="cart-qty-btn"
                                                onClick={() => handleQuantityChange(item.product.productCode, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="cart-qty-value">{item.quantity}</span>
                                            <button
                                                className="cart-qty-btn"
                                                onClick={() => handleQuantityChange(item.product.productCode, item.quantity + 1)}
                                                disabled={item.quantity >= item.product.stock}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="cart-remove-btn"
                                            onClick={() => removeFromCart(item.product.productCode)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-price">
                                    <span className="cart-item-total">
                                        {(item.product.price * item.quantity).toFixed(2)} €
                                    </span>
                                    {item.quantity > 1 && (
                                        <span className="cart-item-unit-price">
                                            {item.product.price.toFixed(2)} € / unité
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Récapitulatif</h2>

                        <div className="cart-summary-details">
                            <div className="cart-summary-row">
                                <span>Sous-total</span>
                                <span>{totalPrice.toFixed(2)} €</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Livraison</span>
                                <span>{totalPrice >= 50 ? 'Gratuite' : '4.90 €'}</span>
                            </div>
                            {totalPrice < 50 && (
                                <p className="cart-free-shipping-hint">
                                    Plus que {(50 - totalPrice).toFixed(2)} € pour la livraison gratuite
                                </p>
                            )}
                        </div>

                        <div className="cart-summary-total">
                            <span>Total</span>
                            <span>{(totalPrice + (totalPrice >= 50 ? 0 : 4.90)).toFixed(2)} €</span>
                        </div>

                        <button className="checkout-btn">
                            Passer commande
                        </button>

                        <button className="continue-shopping-btn-outline" onClick={() => navigate('/')}>
                            Continuer mes achats
                        </button>

                        <button className="clear-cart-btn" onClick={clearCart}>
                            Vider le panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;