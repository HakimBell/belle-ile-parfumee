import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLoginClick = () => {
        setIsMenuOpen(false);
        navigate('/login');
    };

    const handleLogout = () => {
        authService.removeToken();
        window.location.href = '/';
    };

    const handleNavClick = (path: string) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="logo">Belle Île Parfumée</a>

                {/* Hamburger button for mobile */}
                <button
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Navigation */}
                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    {/* Mobile menu header */}
                    <div className="nav-header">
                        <span className="nav-title">Belle Île Parfumée</span>
                        <button className="nav-close" onClick={() => setIsMenuOpen(false)} aria-label="Fermer">
                            ✕
                        </button>
                    </div>
                    <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}>Accueil</a>
                    <a href="/parfums/hommes" onClick={(e) => { e.preventDefault(); handleNavClick('/parfums/hommes'); }}>Parfums Hommes</a>
                    <a href="/parfums/femmes" onClick={(e) => { e.preventDefault(); handleNavClick('/parfums/femmes'); }}>Parfums Femmes</a>
                    <a href="/parfums/mixtes" onClick={(e) => { e.preventDefault(); handleNavClick('/parfums/mixtes'); }}>Parfums Mixtes</a>
                    <a href="/nouveautes" onClick={(e) => { e.preventDefault(); handleNavClick('/nouveautes'); }}>Nouveautés</a>

                    {/* Mobile only: auth buttons in nav */}
                    <div className="nav-mobile-auth">
                        {isAuthenticated ? (
                            <button className="nav-auth-btn" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        ) : (
                            <button className="nav-auth-btn" onClick={handleLoginClick}>
                                Se connecter
                            </button>
                        )}
                    </div>
                </nav>

                {/* Overlay for mobile menu */}
                {isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)}></div>}

                <div className="header-icons">
                    <button className="icon-btn">♡</button>
                    <button className="icon-btn" onClick={() => navigate('/cart')}>
                        🛒
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </button>
                    {isAuthenticated ? (
                        <button className="login-btn desktop-only" onClick={handleLogout}>
                            Déconnexion
                        </button>
                    ) : (
                        <button className="login-btn desktop-only" onClick={handleLoginClick}>
                            Se connecter
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
