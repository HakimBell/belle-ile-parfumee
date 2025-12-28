import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();
    const { totalItems } = useCart();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        authService.removeToken();
        window.location.href = '/';
    };

    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="logo">Belle Île Parfumée</a>

                <nav className="nav">
                    <a href="/">Accueil</a>
                    <a href="/parfums/hommes">Parfums Hommes</a>
                    <a href="/parfums/femmes">Parfums Femmes</a>
                    <a href="/parfums/mixtes">Parfums Mixtes</a>
                    <a href="/nouveautes">Nouveautés</a>
                </nav>

                <div className="header-icons">
                    {isAuthenticated ? (
                        <>
                            <button className="icon-btn">♡</button>
                            <button className="icon-btn" onClick={() => navigate('/cart')}>
                                🛒
                                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                            </button>
                            <button className="login-btn" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="icon-btn">♡</button>
                            <button className="icon-btn" onClick={() => navigate('/cart')}>
                                🛒
                                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                            </button>
                            <button className="login-btn" onClick={handleLoginClick}>
                                Se connecter
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;