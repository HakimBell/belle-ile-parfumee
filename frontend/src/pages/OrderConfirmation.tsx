import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './OrderConfirmation.css';

const OrderConfirmation: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="confirmation-container">
                <div className="confirmation-card">
                    <div className="confirmation-icon">✓</div>
                    <h1>Commande confirmée</h1>
                    <p className="confirmation-message">
                        Merci pour votre commande ! Vous recevrez un email de confirmation avec les détails de votre achat.
                    </p>

                    <div className="confirmation-info">
                        <p>Votre commande sera préparée et expédiée dans les plus brefs délais.</p>
                    </div>

                    <div className="confirmation-actions">
                        <button className="confirmation-btn-primary" onClick={() => navigate('/')}>
                            Retour à l'accueil
                        </button>
                        <button className="confirmation-btn-secondary" onClick={() => navigate('/parfums/femmes')}>
                            Continuer mes achats
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
