# Diagrammes de Séquence

## Fonctionnalité présentée : Ajouter au panier et passer commande

### 1. Ajouter un produit au panier (Client connecté)

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant React as Frontend React
    participant Context as CartContext
    participant API as API REST
    participant Controller as CartController
    participant Service as CartService
    participant RepoProd as ProductRepository
    participant RepoOrder as OrderRepository
    participant DB as PostgreSQL

    Client->>React: Clic "Ajouter au panier"
    React->>Context: addToCart(product, quantity)
    Context->>Context: Vérifier si connecté

    alt Client connecté
        Context->>API: POST /api/orders/cart/items
        API->>Controller: addItemToCart(email, productCode, qty)
        Controller->>Service: addItemToCart(email, productCode, qty)

        Service->>RepoProd: findById(productCode)
        RepoProd->>DB: SELECT * FROM products
        DB-->>RepoProd: Product
        RepoProd-->>Service: Product

        Service->>Service: Vérifier stock disponible

        alt Stock suffisant
            Service->>RepoOrder: findByClient_EmailAndStatus(email, PENDING)
            RepoOrder->>DB: SELECT * FROM orders
            DB-->>RepoOrder: Order (ou null)

            alt Panier existe
                RepoOrder-->>Service: Order existant
            else Panier n'existe pas
                Service->>RepoOrder: save(new Order)
                RepoOrder->>DB: INSERT INTO orders
                DB-->>RepoOrder: Order créé
                RepoOrder-->>Service: Nouveau Order
            end

            Service->>DB: INSERT/UPDATE order_lines
            DB-->>Service: OK

            Service-->>Controller: CartResponseDTO
            Controller-->>API: 200 OK + Cart JSON
            API-->>Context: Cart mis à jour
            Context-->>React: Mise à jour état
            React-->>Client: Badge panier +1
        else Stock insuffisant
            Service-->>Controller: Exception
            Controller-->>API: 400 Bad Request
            API-->>Context: Erreur
            Context-->>React: Afficher erreur
            React-->>Client: "Stock insuffisant"
        end

    else Client non connecté
        Context->>Context: Sauvegarder dans localStorage
        Context-->>React: Mise à jour état local
        React-->>Client: Badge panier +1
    end
```

### 2. Passer commande (Checkout)

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant React as Frontend React
    participant Cart as Page Panier
    participant API as API REST
    participant Controller as CartController
    participant Service as CartService
    participant EmailSvc as EmailService
    participant RepoProd as ProductRepository
    participant RepoOrder as OrderRepository
    participant DB as PostgreSQL
    participant SMTP as Serveur SMTP

    Client->>Cart: Clic "Passer commande"
    Cart->>Cart: Vérifier authentification

    alt Non connecté
        Cart->>React: Redirection /login?redirect=/cart
        React-->>Client: Page de connexion
    else Connecté
        Cart->>API: POST /api/orders/cart/checkout
        API->>Controller: checkout(email)
        Controller->>Service: checkout(email)

        Service->>RepoOrder: findByClient_EmailAndStatus(PENDING)
        RepoOrder->>DB: SELECT * FROM orders WHERE status='PENDING'
        DB-->>RepoOrder: Order avec OrderLines
        RepoOrder-->>Service: Order

        loop Pour chaque OrderLine
            Service->>RepoProd: findById(productCode)
            RepoProd->>DB: SELECT stock FROM products
            DB-->>RepoProd: Stock actuel

            alt Stock OK
                Service->>RepoProd: decrementStock(qty)
                RepoProd->>DB: UPDATE products SET stock = stock - qty
                DB-->>RepoProd: OK
            else Stock insuffisant
                Service-->>Controller: Exception "Stock insuffisant"
                Controller-->>API: 400 Bad Request
                API-->>Cart: Erreur
                Cart-->>Client: "Produit X en rupture"
            end
        end

        Service->>RepoOrder: updateStatus(COMPLETED)
        RepoOrder->>DB: UPDATE orders SET status='COMPLETED'
        DB-->>RepoOrder: OK

        Service->>EmailSvc: sendOrderConfirmation(email, order)
        EmailSvc->>SMTP: Envoi email
        SMTP-->>EmailSvc: OK

        Service-->>Controller: Order complété
        Controller-->>API: 200 OK
        API-->>Cart: Succès
        Cart->>React: Navigation /order-confirmation
        React-->>Client: Page confirmation
    end
```

### 3. Authentification (Login)

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant React as Frontend React
    participant Login as Page Login
    participant API as API REST
    participant Controller as AccountController
    participant Service as AccountService
    participant JWT as JwtUtil
    participant Repo as AccountRepository
    participant DB as PostgreSQL

    Client->>Login: Saisie email + mot de passe
    Client->>Login: Clic "Se connecter"
    Login->>API: POST /api/auth/login

    API->>Controller: login(email, password)
    Controller->>Service: login(email, password)

    Service->>Repo: findByEmail(email)
    Repo->>DB: SELECT * FROM account
    DB-->>Repo: Account (ou null)

    alt Compte trouvé
        Repo-->>Service: Account
        Service->>Service: passwordEncoder.matches(password, hash)

        alt Mot de passe correct
            Service-->>Controller: Account
            Controller->>JWT: generateToken(email, role)
            JWT-->>Controller: Token JWT

            Controller->>Controller: Créer cookie HttpOnly
            Controller-->>API: 200 OK + Set-Cookie + LoginResponseDTO

            API-->>Login: Succès + Cookie
            Login->>Login: syncCart() si panier local
            Login->>React: Redirection selon rôle

            alt Rôle ADMIN
                React-->>Client: /admin/products
            else Rôle CLIENT
                React-->>Client: / ou URL redirect
            end

        else Mot de passe incorrect
            Service-->>Controller: null
            Controller-->>API: 401 Unauthorized
            API-->>Login: Erreur
            Login-->>Client: "Email ou mot de passe incorrect"
        end

    else Compte non trouvé
        Repo-->>Service: null
        Service-->>Controller: null
        Controller-->>API: 401 Unauthorized
        API-->>Login: Erreur
        Login-->>Client: "Email ou mot de passe incorrect"
    end
```

## Légende

| Symbole | Signification |
|---------|---------------|
| `->>`   | Appel synchrone |
| `-->>` | Réponse |
| `alt/else` | Alternative (condition) |
| `loop` | Boucle |
| `autonumber` | Numérotation automatique des étapes |