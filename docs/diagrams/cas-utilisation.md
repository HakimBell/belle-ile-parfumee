# Diagramme de Cas d'Utilisation

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Belle Île Parfumée - Système                         │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐     │   │
│  │   │  Consulter   │      │  Rechercher  │      │   Filtrer    │     │   │
│  │   │  catalogue   │      │   produits   │      │  par genre   │     │   │
│  │   └──────────────┘      └──────────────┘      └──────────────┘     │   │
│  │          │                     │                     │             │   │
│  │          └─────────────────────┼─────────────────────┘             │   │
│  │                                │                                   │   │
│  │                       ┌────────┴────────┐                          │   │
│  │                       │  Voir détail    │                          │   │
│  │                       │    produit      │                          │   │
│  │                       └─────────────────┘                          │   │
│  │                                │                                   │   │
│  │   ┌──────────────┐    ┌───────┴───────┐    ┌──────────────┐       │   │
│  │   │  S'inscrire  │    │   Gérer le    │    │ Se connecter │       │   │
│  │   │              │    │    panier     │    │              │       │   │
│  │   └──────────────┘    └───────────────┘    └──────────────┘       │   │
│  │          │                    │                    │               │   │
│  │          │            ┌───────┴───────┐            │               │   │
│  │          │            │    Passer     │            │               │   │
│  │          └────────────│   commande    │────────────┘               │   │
│  │                       └───────────────┘                            │   │
│  │                               │                                    │   │
│  │                       ┌───────┴───────┐                            │   │
│  │                       │   Recevoir    │                            │   │
│  │                       │ confirmation  │                            │   │
│  │                       └───────────────┘                            │   │
│  │                                                                    │   │
│  │   ═══════════════════════════════════════════════════════════     │   │
│  │                         ADMINISTRATION                             │   │
│  │   ═══════════════════════════════════════════════════════════     │   │
│  │                                                                    │   │
│  │   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐        │   │
│  │   │    Gérer     │    │    Gérer     │    │    Gérer     │        │   │
│  │   │   produits   │    │   clients    │    │  commandes   │        │   │
│  │   │    (CRUD)    │    │              │    │              │        │   │
│  │   └──────────────┘    └──────────────┘    └──────────────┘        │   │
│  │                                                                    │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

        👤                              👤                          👤
     Visiteur                         Client                    Administrateur
```

## Acteurs

| Acteur | Description | Droits |
|--------|-------------|--------|
| **Visiteur** | Utilisateur non connecté | Consultation, recherche, panier local |
| **Client** | Utilisateur connecté (rôle CLIENT) | Visiteur + commandes, panier synchronisé |
| **Administrateur** | Utilisateur connecté (rôle ADMIN) | Client + gestion back-office |

## Cas d'utilisation détaillés

### UC01 - Consulter le catalogue
| Élément | Description |
|---------|-------------|
| **Acteur** | Visiteur, Client, Admin |
| **Précondition** | Aucune |
| **Scénario** | 1. L'utilisateur accède à l'accueil<br>2. Le système affiche la liste des parfums<br>3. L'utilisateur peut filtrer par genre |
| **Postcondition** | Liste des produits affichée |

### UC02 - Rechercher un produit
| Élément | Description |
|---------|-------------|
| **Acteur** | Visiteur, Client, Admin |
| **Précondition** | Aucune |
| **Scénario** | 1. L'utilisateur saisit un terme de recherche<br>2. Le système filtre par nom, marque, description<br>3. Les résultats sont affichés |
| **Postcondition** | Résultats de recherche affichés |

### UC03 - Gérer le panier
| Élément | Description |
|---------|-------------|
| **Acteur** | Visiteur, Client |
| **Précondition** | Produit disponible en stock |
| **Scénario** | 1. L'utilisateur ajoute un produit au panier<br>2. Il peut modifier les quantités<br>3. Il peut supprimer des articles |
| **Postcondition** | Panier mis à jour (local ou API) |

### UC04 - S'inscrire
| Élément | Description |
|---------|-------------|
| **Acteur** | Visiteur |
| **Précondition** | Email non existant |
| **Scénario** | 1. L'utilisateur remplit le formulaire<br>2. Le système valide les données<br>3. Compte et profil client créés |
| **Postcondition** | Compte créé, utilisateur connecté |

### UC05 - Se connecter
| Élément | Description |
|---------|-------------|
| **Acteur** | Visiteur |
| **Précondition** | Compte existant |
| **Scénario** | 1. L'utilisateur saisit email/mot de passe<br>2. Le système vérifie les identifiants<br>3. JWT généré et stocké en cookie |
| **Postcondition** | Utilisateur authentifié |

### UC06 - Passer commande
| Élément | Description |
|---------|-------------|
| **Acteur** | Client |
| **Précondition** | Connecté, panier non vide |
| **Scénario** | 1. Le client valide son panier<br>2. Le système vérifie le stock<br>3. La commande est créée<br>4. Le stock est décrémenté<br>5. Email de confirmation envoyé |
| **Postcondition** | Commande enregistrée, panier vidé |

### UC07 - Gérer les produits (CRUD)
| Élément | Description |
|---------|-------------|
| **Acteur** | Administrateur |
| **Précondition** | Connecté avec rôle ADMIN |
| **Scénario** | 1. L'admin accède au back-office<br>2. Il peut créer/modifier/supprimer des produits<br>3. Code produit généré automatiquement |
| **Postcondition** | Catalogue mis à jour |

### UC08 - Gérer les clients
| Élément | Description |
|---------|-------------|
| **Acteur** | Administrateur |
| **Précondition** | Connecté avec rôle ADMIN |
| **Scénario** | 1. L'admin consulte la liste des clients<br>2. Il peut supprimer un client (si pas de commandes) |
| **Postcondition** | Liste clients mise à jour |

### UC09 - Gérer les commandes
| Élément | Description |
|---------|-------------|
| **Acteur** | Administrateur |
| **Précondition** | Connecté avec rôle ADMIN |
| **Scénario** | 1. L'admin consulte les commandes<br>2. Il peut changer le statut (PENDING → COMPLETED) |
| **Postcondition** | Statut commande mis à jour |