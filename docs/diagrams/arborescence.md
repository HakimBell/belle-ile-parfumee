# Arborescence du Site

## Vue d'ensemble

```mermaid
flowchart TD
    A[🏠 Accueil] --> B[📦 Catalogue]
    A --> C[🔐 Authentification]
    A --> D[🛒 Panier]
    A --> E[⚙️ Administration]

    B --> B1[Parfums Hommes]
    B --> B2[Parfums Femmes]
    B --> B3[Parfums Mixtes]
    B --> B4[Nouveautés]
    B --> B5[🔍 Recherche]
    B1 --> F[📄 Détail Produit]
    B2 --> F
    B3 --> F
    B4 --> F
    B5 --> F

    C --> C1[Connexion]
    C --> C2[Inscription]

    D --> D1[Voir Panier]
    D1 --> D2[Validation Commande]
    D2 --> D3[✅ Confirmation]

    E --> E1[Gestion Produits]
    E --> E2[Gestion Clients]
    E --> E3[Gestion Commandes]
```

## Routes de l'application

### Pages publiques

| Route | Page | Description |
|-------|------|-------------|
| `/` | Accueil | Liste de tous les parfums |
| `/parfums/hommes` | Parfums Hommes | Filtrage par genre masculin |
| `/parfums/femmes` | Parfums Femmes | Filtrage par genre féminin |
| `/parfums/mixtes` | Parfums Mixtes | Filtrage par genre mixte |
| `/nouveautes` | Nouveautés | Produits ajoutés cette semaine |
| `/search?q=` | Recherche | Résultats de recherche |
| `/product/:productCode` | Détail Produit | Fiche produit complète |
| `/cart` | Panier | Gestion du panier |
| `/order-confirmation` | Confirmation | Confirmation de commande |

### Pages authentification

| Route | Page | Accès |
|-------|------|-------|
| `/login` | Connexion | Public |
| `/register` | Inscription | Public |

### Pages administration (ADMIN uniquement)

| Route | Page | Description |
|-------|------|-------------|
| `/admin/products` | Gestion Produits | CRUD produits |
| `/admin/clients` | Gestion Clients | Liste et suppression |
| `/admin/orders` | Gestion Commandes | Liste et statuts |

## Navigation

### Header (toutes les pages)
```
┌─────────────────────────────────────────────────────────────┐
│  Belle Île Parfumée    [Hommes] [Femmes] [Mixtes] [Nouveautés]  🔍  🛒  👤  │
└─────────────────────────────────────────────────────────────┘
```

### Footer (toutes les pages)
```
┌─────────────────────────────────────────────────────────────┐
│  Navigation | Contact | Réseaux sociaux | © 2024            │
└─────────────────────────────────────────────────────────────┘
```

## Flux utilisateur principal

```mermaid
flowchart LR
    A[Visiteur] --> B{Connecté?}
    B -->|Non| C[Navigation catalogue]
    B -->|Oui| D[Navigation + Panier sync]

    C --> E[Ajouter au panier local]
    D --> F[Ajouter au panier API]

    E --> G{Checkout?}
    F --> G

    G -->|Non connecté| H[Redirection Login]
    G -->|Connecté| I[Validation commande]

    H --> J[Connexion/Inscription]
    J --> K[Sync panier]
    K --> I

    I --> L[Confirmation + Email]
```