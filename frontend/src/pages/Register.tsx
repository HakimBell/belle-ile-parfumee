import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useCart } from '../context/CartContext';
import type { RegisterRequest } from '../types/Account';
import './Register.css';

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterRequest>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { syncCart } = useCart();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (formData.password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        setLoading(true);

        try {
            // Vérifier si l'email existe déjà
            const emailExists = await authService.emailExists(formData.email);
            if (emailExists) {
                setError('Cet email est déjà utilisé');
                setLoading(false);
                return;
            }

            // Inscription
            await authService.register(formData);

            // Le token est maintenant dans un cookie httpOnly (géré par le backend)
            // L'email et le rôle sont sauvegardés automatiquement par authService.register()

            // Synchroniser le panier localStorage avec le backend
            await syncCart();

            // Rediriger vers l'accueil
            navigate('/');
        } catch (err) {
            setError('Une erreur est survenue lors de l\'inscription');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page-container">
            <div className="register-page-card">
                <h1>Belle Île Parfumée</h1>
                <h2>Créer un compte</h2>

                <form onSubmit={handleSubmit} className="register-page-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">Prénom</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Votre prénom"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Nom</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Votre nom"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Téléphone</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="06 12 34 56 78"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="register-page-btn" disabled={loading}>
                        {loading ? 'Création du compte...' : 'Créer mon compte'}
                    </button>

                    {error && <p className="error-message">{error}</p>}
                </form>

                <div className="register-footer">
                    <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
                    <Link to="/" className="back-link">← Retour à l'accueil</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
