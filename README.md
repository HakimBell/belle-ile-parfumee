# Belle Île Parfumée

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=HakimBell_belle-ile-parfumee&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=HakimBell_belle-ile-parfumee)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=HakimBell_belle-ile-parfumee&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=HakimBell_belle-ile-parfumee)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=HakimBell_belle-ile-parfumee&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=HakimBell_belle-ile-parfumee)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=HakimBell_belle-ile-parfumee&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=HakimBell_belle-ile-parfumee)

Application e-commerce de vente de parfums développée avec **Spring Boot** (backend) et **React** (frontend).

## Technologies utilisées

### Backend
- **Java 21** + **Spring Boot 3.5.6**
- **Spring Security** + **JWT** (authentification via cookie httpOnly)
- **Spring Data JPA** + **Hibernate**
- **PostgreSQL**
- **Maven**
- **Lombok**
- **Hibernate Validator** (validation)

### Frontend
- **React 19** + **TypeScript**
- **Vite** (build tool)
- **React Router 7**
- **Axios**
- **Vitest** (tests)

## Architecture

```
belle-ile-parfumee/
├── backend/                    # API Spring Boot
│   └── src/main/java/.../
│       ├── config/             # Sécurité, JWT, CORS
│       ├── controller/         # Endpoints REST
│       ├── service/            # Logique métier
│       ├── repository/         # Accès données (JPA)
│       ├── entity/             # Entités JPA
│       ├── dto/                # Data Transfer Objects
│       └── mapper/             # Conversion Entity <-> DTO
│
└── frontend/                   # Application React
    └── src/
        ├── pages/              # Pages (Home, Login, Cart, Admin...)
        ├── components/         # Composants réutilisables
        ├── context/            # State management (CartContext)
        ├── services/           # Appels API
        ├── hooks/              # Custom hooks
        └── types/              # Types TypeScript
```

## Prérequis

- **Java 21**
- **Node.js 18+**
- **PostgreSQL 15+**
- **Maven 3.9+**

## Installation

### 1. Base de données

```bash
# Créer la base de données PostgreSQL
psql -U postgres
CREATE DATABASE belle_ile_parfumee;
```

### 2. Backend

```bash
cd backend

# Configurer la base de données dans application.properties
# spring.datasource.url=jdbc:postgresql://localhost:5432/belle_ile_parfumee
# spring.datasource.username=postgres
# spring.datasource.password=votre_mot_de_passe

# Lancer le backend
./mvnw spring-boot:run
```

Le backend sera accessible sur `http://localhost:8081`

### 3. Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le frontend
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## Endpoints API

### Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/accounts/register` | Inscription |
| POST | `/api/accounts/login` | Connexion |
| POST | `/api/accounts/logout` | Déconnexion |
| GET | `/api/accounts/me` | Utilisateur connecté |

### Produits
| Méthode | Endpoint | Description | Accès |
|---------|----------|-------------|-------|
| GET | `/api/products` | Liste des produits | Public |
| GET | `/api/products/{code}` | Détail produit | Public |
| GET | `/api/products/gender/{gender}` | Filtrer par genre | Public |
| GET | `/api/products/new-arrivals` | Nouveautés (7 jours) | Public |
| POST | `/api/products` | Créer un produit | Admin |
| PUT | `/api/products/{code}` | Modifier un produit | Admin |
| DELETE | `/api/products/{code}` | Supprimer un produit | Admin |

### Panier
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/orders/cart` | Récupérer le panier |
| POST | `/api/orders/cart/items` | Ajouter un produit |
| PUT | `/api/orders/cart/items/{code}` | Modifier quantité |
| DELETE | `/api/orders/cart/items/{code}` | Supprimer produit |
| POST | `/api/orders/cart/checkout` | Valider commande |

### Admin
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/clients` | Liste des clients |
| GET | `/api/orders` | Liste des commandes |
| DELETE | `/api/orders/{number}` | Supprimer commande |

## Tests

### Backend
```bash
cd backend
./mvnw test
```

### Frontend
```bash
cd frontend
npm run test:run
```

## Fonctionnalités

### Client
- Catalogue produits avec filtres (genre, nouveautés)
- Fiche produit détaillée
- Panier persistant (localStorage si non connecté, backend si connecté)
- Inscription / Connexion sécurisée
- Validation de commande

### Admin
- Gestion des produits (CRUD)
- Gestion des clients
- Gestion des commandes

## Sécurité

- **JWT** stocké en cookie **httpOnly** (protection XSS)
- **Mots de passe** hashés avec **BCrypt**
- **Endpoints admin** protégés par rôle
- **Validation** côté client et serveur
- **CORS** configuré pour le frontend

## Auteur

Projet réalisé dans le cadre de la formation **CDA** (Concepteur Développeur d'Applications).