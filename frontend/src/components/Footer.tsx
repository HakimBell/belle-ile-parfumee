import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-logo">Belle Île Parfumée</h3>
                    <p className="footer-description">
                        Votre destination pour les plus belles fragrances des grandes maisons de parfumerie.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Navigation</h4>
                    <nav className="footer-nav">
                        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Accueil</a>
                        <a href="/parfums/hommes" onClick={(e) => { e.preventDefault(); navigate('/parfums/hommes'); }}>Hommes</a>
                        <a href="/parfums/femmes" onClick={(e) => { e.preventDefault(); navigate('/parfums/femmes'); }}>Femmes</a>
                        <a href="/nouveautes" onClick={(e) => { e.preventDefault(); navigate('/nouveautes'); }}>Nouveautés</a>
                    </nav>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Contact</h4>
                    <div className="footer-contact">
                        <a href="mailto:belle.ile.parfumee@gmail.com">
                            belle.ile.parfumee@gmail.com
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Suivez-nous</h4>
                    <div className="footer-social">
                        <a href="#" aria-label="Instagram">Instagram</a>
                        <a href="#" aria-label="Facebook">Facebook</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} Belle Île Parfumée. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
