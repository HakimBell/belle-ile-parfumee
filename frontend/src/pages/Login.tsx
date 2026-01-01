import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useCart } from '../context/CartContext';
import type { LoginRequest } from '../types/Account';
import './Login.css';

interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { syncCart } = useCart();

    // Validation email
    const validateEmail = (value: string): string | undefined => {
        if (!value.trim()) {
            return 'L\'email est requis';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Format d\'email invalide';
        }
        return undefined;
    };

    // Validation password
    const validatePassword = (value: string): string | undefined => {
        if (!value) {
            return 'Le mot de passe est requis';
        }
        if (value.length < 6) {
            return 'Le mot de passe doit contenir au moins 6 caractères';
        }
        return undefined;
    };

    // Validation du formulaire complet
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        const emailError = validateEmail(email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(password);
        if (passwordError) newErrors.password = passwordError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestion du blur pour validation en temps réel
    const handleBlur = (field: 'email' | 'password') => {
        setTouched(prev => ({ ...prev, [field]: true }));

        if (field === 'email') {
            const error = validateEmail(email);
            setErrors(prev => ({ ...prev, email: error }));
        } else if (field === 'password') {
            const error = validatePassword(password);
            setErrors(prev => ({ ...prev, password: error }));
        }
    };

    // Gestion du changement avec validation en temps réel si déjà touché
    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (touched.email) {
            const error = validateEmail(value);
            setErrors(prev => ({ ...prev, email: error }));
        }
        // Clear general error when user types
        if (errors.general) {
            setErrors(prev => ({ ...prev, general: undefined }));
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (touched.password) {
            const error = validatePassword(value);
            setErrors(prev => ({ ...prev, password: error }));
        }
        if (errors.general) {
            setErrors(prev => ({ ...prev, general: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Marquer tous les champs comme touchés
        setTouched({ email: true, password: true });

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const credentials: LoginRequest = { email, password };
            const response = await authService.login(credentials);

            await syncCart();

            const redirectUrl = searchParams.get('redirect');
            if (response.role === 'ADMIN') {
                navigate('/admin/products');
            } else if (redirectUrl) {
                navigate(redirectUrl);
            } else {
                navigate('/');
            }
        } catch (err: unknown) {
            // Gestion des erreurs spécifiques
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosError = err as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    setErrors({ general: 'Email ou mot de passe incorrect' });
                } else if (axiosError.response?.status === 500) {
                    setErrors({ general: 'Erreur serveur. Veuillez réessayer plus tard.' });
                } else {
                    setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
                }
            } else if (err instanceof Error && err.message === 'Network Error') {
                setErrors({ general: 'Impossible de contacter le serveur. Vérifiez votre connexion.' });
            } else {
                setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-page-card">
                <h1>Belle Île Parfumée</h1>
                <h2>Connexion</h2>

                <form onSubmit={handleSubmit} className="login-page-form" noValidate>
                    <div className={`form-group ${errors.email && touched.email ? 'has-error' : ''}`}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            onBlur={() => handleBlur('email')}
                            placeholder="votre@email.com"
                            disabled={loading}
                            className={errors.email && touched.email ? 'input-error' : ''}
                        />
                        {errors.email && touched.email && (
                            <span className="field-error">{errors.email}</span>
                        )}
                    </div>

                    <div className={`form-group ${errors.password && touched.password ? 'has-error' : ''}`}>
                        <label htmlFor="password">Mot de passe</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                onBlur={() => handleBlur('password')}
                                placeholder="••••••••"
                                disabled={loading}
                                className={errors.password && touched.password ? 'input-error' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && touched.password && (
                            <span className="field-error">{errors.password}</span>
                        )}
                    </div>

                    {errors.general && (
                        <div className="general-error">
                            <span className="error-icon">⚠</span>
                            {errors.general}
                        </div>
                    )}

                    <button type="submit" className="login-page-btn" disabled={loading}>
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Pas encore de compte ? <Link to="/register">Créer un compte</Link></p>
                    <Link to="/" className="back-link">← Retour à l'accueil</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
