# Architecture Globale

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              UTILISATEURS                                    │
│                    👤 Client    👤 Visiteur    👤 Admin                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React)                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         React 18 + TypeScript                        │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │    │
│  │  │  Pages   │  │Components│  │  Hooks   │  │ Context (Cart)   │    │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │                    Services (API calls)                       │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              Vite (Build)                                    │
│                           Port: 5173 (dev)                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                              HTTP/REST + JWT Cookie
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND (Spring Boot)                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      Spring Boot 3 + Java 17                         │    │
│  │                                                                      │    │
│  │  ┌────────────────┐     ┌─────────────────────────────────────┐     │    │
│  │  │   Security     │     │           REST Controllers          │     │    │
│  │  │  JWT Filter    │────▶│  Account│Product│Order│Cart│Client  │     │    │
│  │  │  CORS Config   │     └─────────────────────────────────────┘     │    │
│  │  └────────────────┘                      │                          │    │
│  │                                          ▼                          │    │
│  │                         ┌─────────────────────────────────────┐     │    │
│  │                         │            Services                  │     │    │
│  │                         │  Account│Product│Order│Cart│Email   │     │    │
│  │                         └─────────────────────────────────────┘     │    │
│  │                                          │                          │    │
│  │                                          ▼                          │    │
│  │                         ┌─────────────────────────────────────┐     │    │
│  │                         │          Repositories (JPA)         │     │    │
│  │                         └─────────────────────────────────────┘     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                Port: 8081                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                 JDBC + JPA
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BASE DE DONNÉES                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         PostgreSQL 17                                │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐ │    │
│  │  │ account  │ │ clients  │ │ products │ │  orders  │ │order_lines│ │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └───────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                              Port: 5432                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SERVICES EXTERNES                                   │
│              ┌──────────────────────────────────────┐                       │
│              │         📧 SMTP (Gmail)              │                       │
│              │    Envoi emails de confirmation      │                       │
│              └──────────────────────────────────────┘                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Architecture en couches (Backend)

```mermaid
flowchart TB
    subgraph Presentation["Couche Présentation"]
        C1[AccountController]
        C2[ProductController]
        C3[CartController]
        C4[OrderController]
        C5[ClientController]
    end

    subgraph Security["Couche Sécurité"]
        SF[JwtAuthenticationFilter]
        JU[JwtUtil]
        SC[SecurityConfig]
    end

    subgraph Business["Couche Métier"]
        S1[AccountService]
        S2[ProductService]
        S3[CartService]
        S4[OrderService]
        S5[ClientService]
        S6[EmailService]
    end

    subgraph Persistence["Couche Persistance"]
        R1[AccountRepository]
        R2[ProductRepository]
        R3[OrderRepository]
        R4[OrderLineRepository]
        R5[ClientRepository]
    end

    subgraph Data["Couche Données"]
        DB[(PostgreSQL)]
    end

    C1 & C2 & C3 & C4 & C5 --> SF
    SF --> JU
    C1 --> S1
    C2 --> S2
    C3 --> S3
    C4 --> S4
    C5 --> S5
    S3 --> S6
    S1 --> R1
    S2 --> R2
    S3 --> R3 & R4
    S4 --> R3
    S5 --> R5
    R1 & R2 & R3 & R4 & R5 --> DB
```

## Stack Technique

### Frontend
| Technologie | Version | Rôle |
|-------------|---------|------|
| React | 18.x | Framework UI |
| TypeScript | 5.x | Typage statique |
| Vite | 5.x | Build tool |
| React Router | 6.x | Routing SPA |
| Axios | 1.x | Client HTTP |
| CSS Modules | - | Styles scopés |

### Backend
| Technologie | Version | Rôle |
|-------------|---------|------|
| Java | 17 | Langage |
| Spring Boot | 3.x | Framework |
| Spring Security | 6.x | Sécurité |
| Spring Data JPA | 3.x | ORM |
| JWT (jjwt) | 0.12.x | Tokens |
| Lombok | 1.18.x | Réduction boilerplate |
| Maven | 3.9.x | Build |

### Base de données
| Technologie | Version | Rôle |
|-------------|---------|------|
| PostgreSQL | 17.x | SGBD relationnel |

### Outils
| Outil | Rôle |
|-------|------|
| Git | Versioning |
| GitHub | Repository |
| Postman | Tests API |
| pgAdmin | Admin BDD |

## Flux de données

```mermaid
flowchart LR
    subgraph Client["Navigateur"]
        UI[Interface React]
        LS[localStorage]
        CK[Cookie JWT]
    end

    subgraph Server["Serveur"]
        API[API REST]
        AUTH[Auth Filter]
        BL[Business Logic]
    end

    subgraph DB["Database"]
        PG[(PostgreSQL)]
    end

    UI -->|"1. Requête HTTP"| API
    API -->|"2. Vérif JWT"| AUTH
    AUTH -->|"3. Si valide"| BL
    BL -->|"4. Query SQL"| PG
    PG -->|"5. Résultat"| BL
    BL -->|"6. DTO JSON"| API
    API -->|"7. Réponse"| UI

    UI <-->|"Panier non-connecté"| LS
    UI <-->|"Token auth"| CK
```

## Sécurité

```mermaid
flowchart TD
    A[Requête entrante] --> B{Route protégée?}
    B -->|Non| C[Accès direct]
    B -->|Oui| D{Cookie JWT présent?}
    D -->|Non| E[401 Unauthorized]
    D -->|Oui| F{Token valide?}
    F -->|Non| E
    F -->|Oui| G{Rôle autorisé?}
    G -->|Non| H[403 Forbidden]
    G -->|Oui| I[Accès autorisé]

    style E fill:#f66
    style H fill:#f66
    style I fill:#6f6
    style C fill:#6f6
```