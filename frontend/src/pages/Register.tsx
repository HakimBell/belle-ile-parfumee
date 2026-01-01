import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useCart } from '../context/CartContext';
import type { RegisterRequest } from '../types/Account';
import './Register.css';

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

interface TouchedFields {
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterRequest>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<TouchedFields>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { syncCart } = useCart();

    // Validations
    const validateFirstName = (value: string): string | undefined => {
        if (!value.trim()) {
            return 'Le prénom est requis';
        }
        if (value.trim().length < 2) {
            return 'Le prénom doit contenir au moins 2 caractères';
        }
        return undefined;
    };

    const validateLastName = (value: string): string | undefined => {
        if (!value.trim()) {
            return 'Le nom est requis';
        }
        if (value.trim().length < 2) {
            return 'Le nom doit contenir au moins 2 caractères';
        }
        return undefined;
    };

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

    const validatePhoneNumber = (value: string): string | undefined => {
        if (!value.trim()) {
            return 'Le numéro de téléphone est requis';
        }
        // Accepte les formats: 0612345678, 06 12 34 56 78, +33612345678
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        const cleanedPhone = value.replace(/\s/g, '');
        if (!phoneRegex.test(value) && !/^\d{10}$/.test(cleanedPhone)) {
            return 'Format de téléphone invalide (ex: 06 12 34 56 78)';
        }
        return undefined;
    };

    const validatePassword = (value: string): string | undefined => {
        if (!value) {
            return 'Le mot de passe est requis';
        }
        if (value.length < 6) {
            return 'Le mot de passe doit contenir au moins 6 caractères';
        }
        return undefined;
    };

    const validateConfirmPassword = (value: string, password: string): string | undefined => {
        if (!value) {
            return 'Veuillez confirmer le mot de passe';
        }
        if (value !== password) {
            return 'Les mots de passe ne correspondent pas';
        }
        return undefined;
    };

    // Validation complète du formulaire
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        const firstNameError = validateFirstName(formData.firstName);
        if (firstNameError) newErrors.firstName = firstNameError;

        const lastNameError = validateLastName(formData.lastName);
        if (lastNameError) newErrors.lastName = lastNameError;

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        const phoneError = validatePhoneNumber(formData.phoneNumber);
        if (phoneError) newErrors.phoneNumber = phoneError;

        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;

        const confirmError = validateConfirmPassword(confirmPassword, formData.password);
        if (confirmError) newErrors.confirmPassword = confirmError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestion du blur
    const handleBlur = (field: keyof TouchedFields) => {
        setTouched(prev => ({ ...prev, [field]: true }));

        let error: string | undefined;
        switch (field) {
            case 'firstName':
                error = validateFirstName(formData.firstName);
                break;
            case 'lastName':
                error = validateLastName(formData.lastName);
                break;
            case 'email':
                error = validateEmail(formData.email);
                break;
            case 'phoneNumber':
                error = validatePhoneNumber(formData.phoneNumber);
                break;
            case 'password':
                error = validatePassword(formData.password);
                // Re-validate confirmPassword if password changes
                if (confirmPassword && touched.confirmPassword) {
                    const confirmError = validateConfirmPassword(confirmPassword, formData.password);
                    setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
                }
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(confirmPassword, formData.password);
                break;
        }
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    // Gestion des changements
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear general error
        if (errors.general) {
            setErrors(prev => ({ ...prev, general: undefined }));
        }

        // Validate if already touched
        if (touched[name as keyof TouchedFields]) {
            let error: string | undefined;
            switch (name) {
                case 'firstName':
                    error = validateFirstName(value);
                    break;
                case 'lastName':
                    error = validateLastName(value);
                    break;
                case 'email':
                    error = validateEmail(value);
                    break;
                case 'phoneNumber':
                    error = validatePhoneNumber(value);
                    break;
                case 'password':
                    error = validatePassword(value);
                    // Re-validate confirmPassword
                    if (confirmPassword && touched.confirmPassword) {
                        const confirmError = validateConfirmPassword(confirmPassword, value);
                        setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
                    }
                    break;
            }
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        if (errors.general) {
            setErrors(prev => ({ ...prev, general: undefined }));
        }
        if (touched.confirmPassword) {
            const error = validateConfirmPassword(value, formData.password);
            setErrors(prev => ({ ...prev, confirmPassword: error }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Marquer tous les champs comme touchés
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            password: true,
            confirmPassword: true
        });

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            // Vérifier si l'email existe déjà
            const emailExists = await authService.emailExists(formData.email);
            if (emailExists) {
                setErrors({ email: 'Cet email est déjà utilisé' });
                setLoading(false);
                return;
            }

            // Inscription
            await authService.register(formData);

            // Synchroniser le panier
            await syncCart();

            // Rediriger vers l'accueil
            navigate('/');
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosError = err as { response?: { status?: number } };
                if (axiosError.response?.status === 409) {
                    setErrors({ email: 'Cet email est déjà utilisé' });
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

    const getInputClass = (field: keyof FormErrors): string => {
        return errors[field] && touched[field as keyof TouchedFields] ? 'input-error' : '';
    };

    const getGroupClass = (field: keyof FormErrors): string => {
        return errors[field] && touched[field as keyof TouchedFields] ? 'form-group has-error' : 'form-group';
    };

    return (
        <div className="register-page-container">
            <div className="register-page-card">
                <h1>Belle Île Parfumée</h1>
                <h2>Créer un compte</h2>

                <form onSubmit={handleSubmit} className="register-page-form" noValidate>
                    <div className="form-row">
                        <div className={getGroupClass('firstName')}>
                            <label htmlFor="firstName">Prénom</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={() => handleBlur('firstName')}
                                placeholder="Votre prénom"
                                disabled={loading}
                                className={getInputClass('firstName')}
                            />
                            {errors.firstName && touched.firstName && (
                                <span className="field-error">{errors.firstName}</span>
                            )}
                        </div>

                        <div className={getGroupClass('lastName')}>
                            <label htmlFor="lastName">Nom</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={() => handleBlur('lastName')}
                                placeholder="Votre nom"
                                disabled={loading}
                                className={getInputClass('lastName')}
                            />
                            {errors.lastName && touched.lastName && (
                                <span className="field-error">{errors.lastName}</span>
                            )}
                        </div>
                    </div>

                    <div className={getGroupClass('email')}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={() => handleBlur('email')}
                            placeholder="votre@email.com"
                            disabled={loading}
                            className={getInputClass('email')}
                        />
                        {errors.email && touched.email && (
                            <span className="field-error">{errors.email}</span>
                        )}
                    </div>

                    <div className={getGroupClass('phoneNumber')}>
                        <label htmlFor="phoneNumber">Téléphone</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={() => handleBlur('phoneNumber')}
                            placeholder="06 12 34 56 78"
                            disabled={loading}
                            className={getInputClass('phoneNumber')}
                        />
                        {errors.phoneNumber && touched.phoneNumber && (
                            <span className="field-error">{errors.phoneNumber}</span>
                        )}
                    </div>

                    <div className={getGroupClass('password')}>
                        <label htmlFor="password">Mot de passe</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={() => handleBlur('password')}
                                placeholder="••••••••"
                                disabled={loading}
                                className={getInputClass('password')}
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

                    <div className={getGroupClass('confirmPassword')}>
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                onBlur={() => handleBlur('confirmPassword')}
                                placeholder="••••••••"
                                disabled={loading}
                                className={getInputClass('confirmPassword')}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                tabIndex={-1}
                                aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                            >
                                {showConfirmPassword ? (
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
                        {errors.confirmPassword && touched.confirmPassword && (
                            <span className="field-error">{errors.confirmPassword}</span>
                        )}
                    </div>

                    {errors.general && (
                        <div className="general-error">
                            <span className="error-icon">⚠</span>
                            {errors.general}
                        </div>
                    )}

                    <button type="submit" className="register-page-btn" disabled={loading}>
                        {loading ? 'Création du compte...' : 'Créer mon compte'}
                    </button>
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
