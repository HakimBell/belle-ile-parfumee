# Script de présentation — Belle Île Parfumée
# CDA 2026 — Bellil Hakim
# Durée cible : 40 minutes

---

## Slide 1 — Titre (~30s)

Bonjour, je m'appelle Hakim Bellil, je suis en formation Concepteur Développeur d'Applications chez Simplon en partenariat avec Webyn.
Aujourd'hui je vais vous présenter mon projet de fin de formation : Belle Île Parfumée, une application e-commerce fullstack que j'ai conçue et développée de A à Z.

---

## Slide 2 — Tout part d'un besoin réel (~30s)

Avant de rentrer dans le technique, je veux vous expliquer d'où vient ce projet.
Tout part d'un besoin réel — j'ai passé plusieurs années à vendre des parfums de grandes marques, et la gestion de cette activité était devenue un vrai problème au quotidien.

---

## Slide 3 — Contexte (~45s)

Concrètement, je revendais des parfums de marques comme Nina Ricci, Mauboussin ou YSL auprès d'une clientèle fidèle.
Mais toute la gestion se faisait manuellement : je tenais un fichier Excel pour les stocks, j'envoyais les disponibilités par message chaque semaine, je gérais les commandes à la main.
C'est ce besoin concret, ce problème réel, qui est à l'origine de Belle Île Parfumée.

---

## Slide 4 — Problème (~45s)

Ce workflow chronophage avait trois conséquences directes.
D'abord la perte de temps : plusieurs heures par semaine uniquement pour mettre à jour les fichiers et communiquer avec les clients.
Ensuite les erreurs : gérer les stocks manuellement, c'est le risque permanent de surventes ou d'incohérences.
Et enfin une expérience client très limitée : les clients ne pouvaient pas consulter les disponibilités eux-mêmes, ni passer commande de manière autonome.

---

## Slide 5 — Belle Île Parfumée (~45s)

La réponse à ce problème, c'est Belle Île Parfumée : une application e-commerce fullstack qui digitalise complètement ce workflow.
Elle couvre cinq grands axes : le catalogue produits, l'espace client, la gestion des commandes, un tableau de bord admin, et une sécurité robuste basée sur JWT et BCrypt.
Techniquement : React 19 avec TypeScript côté front, Spring Boot 3.5 avec Java 21 côté back, PostgreSQL pour la base de données, Docker pour la containerisation, et GitHub Actions pour le CI/CD. L'application est déployée en production sur Render.

---

## Slide 6 — Personas (~45s)

J'ai travaillé avec deux personas pour cadrer les besoins.
L'admin, c'est moi — Bellil Hakim — dont l'objectif est de gérer les produits, les stocks et les commandes depuis un tableau de bord centralisé.
Le client, c'est Marc, 42 ans, un acheteur régulier qui veut pouvoir consulter le catalogue, passer commande et suivre ses achats en autonomie, sans attendre ma mise à jour hebdomadaire.

---

## Slide 7 — Fonctionnalités principales (~45s)

En termes de fonctionnalités, j'ai défini trois profils utilisateurs.
Le visiteur peut parcourir le catalogue, filtrer par marque ou famille, voir les fiches produits et créer un compte.
Le client connecté peut ajouter au panier, commander, suivre ses commandes et gérer son compte.
L'admin a un accès total : création, modification, suppression de produits, gestion des stocks et traitement des commandes.

---

## Slide 8 — Gestion de projet Jira / Scrum (~30s)

Pour la gestion du projet, j'ai appliqué la méthode Agile Scrum avec des sprints d'une semaine.
J'ai utilisé Jira pour organiser mon backlog avec des User Stories, des critères d'acceptation, et les colonnes classiques : To Do, In Progress, Testing, Done.

---

## Slide 9 — Conception UX/UI (~15s)

Avant d'écrire la moindre ligne de code, j'ai travaillé sur la conception UX/UI en trois étapes : le zoning, les wireframes, puis la maquette haute fidélité.

---

## Slide 10 — Zoning (~30s)

La première étape c'est le zoning : un découpage en grandes zones avant tout design, à la fois en version desktop et mobile.
Ça permet de définir la structure de chaque page sans se perdre dans les détails visuels.

---

## Slide 11 — Wireframe (~30s)

Ensuite les wireframes, ici sur la page produit. On voit la disposition des éléments : la photo, le nom, la description, le prix, le bouton d'ajout au panier.
Version desktop et mobile, toujours dans cette logique de responsive design.

---

## Slide 12 — Charte graphique (~30s)

Pour la charte graphique, j'ai défini une palette de couleurs cohérente avec l'univers du parfum : noir principal, blanc pur, et un or accent.
La typographie utilise la police Inter pour les textes courants, et Courier New pour les extraits de code dans l'interface admin.

---

## Slide 13 — Maquette haute fidélité (~30s)

Et voilà le résultat en maquette haute fidélité, desktop et mobile. On retrouve bien la charte graphique, la disposition définie dans les wireframes, et une interface propre et épurée.

---

## Slide 14 — Architecture 3 couches (~1min)

Parlons maintenant de l'architecture technique. J'ai choisi une architecture 3-tiers classique.
La couche client, c'est le navigateur web qui communique en HTTPS.
La couche présentation, c'est React 19 avec TypeScript et Vite 7.
La couche métier, c'est Spring Boot 3.5 avec Spring Security et JWT.
La couche données, c'est PostgreSQL 15.
Et j'ai un service externe : l'envoi d'emails via SMTP Gmail.
La communication entre le front et le back se fait via une REST API en JSON. La communication entre le back et la base de données passe par JPA/JDBC.

---

## Slide 15 — Environnement technique (~20s)

Les quatre technologies principales : Java pour le backend, React pour le frontend, Spring Boot pour le framework, et PostgreSQL pour la persistance des données.

---

## Slide 16 — Conception et modélisation (~15s)

Passons maintenant à la partie conception et modélisation, avec MERISE et UML.
C'est une partie centrale du projet que je vais vous détailler.

---

## Slide 17 — MCD (~2min)

Le Modèle Conceptuel de Données, c'est la première étape de la méthode MERISE. Il représente les données et leurs relations de manière abstraite, indépendamment de toute technologie.

J'ai identifié quatre entités principales.
Les Clients, identifiés par leur email, avec nom, prénom et téléphone.
Les Comptes, liés aux clients, avec email, mot de passe et rôle.
Les Commandes, avec un numéro et une date.
Et les Produits, identifiés par un code produit unique, avec toutes leurs caractéristiques : nom, marque, prix, stock, description, image, date d'ajout, type de concentration, genre et taille.

Les relations sont les suivantes :
Un client passe entre 0 et N commandes.
Une commande inclut entre 1 et N produits, avec les attributs quantité et prix unitaire portés par la relation.
Un client est associé à 0 ou 1 compte.

C'est cette modélisation qui m'a permis d'identifier toutes les données nécessaires avant de toucher au code.

---

## Slide 18 — MLD (~1min30s)

Le Modèle Logique de Données est la traduction du MCD vers un modèle relationnel, adapté aux bases de données SQL.

Chaque entité devient une table. Les relations deviennent des clés étrangères.
On a donc : la table `clients` avec email en clé primaire, la table `account` liée à clients, la table `orders` avec une clé étrangère vers clients, la table `products` avec product_code en clé primaire, et la table `include` qui est la table de liaison entre orders et products, avec les attributs quantity et unit_price.

La cardinalité 0,n entre clients et orders se traduit par une clé étrangère `email` dans la table orders.

---

## Slide 19 — MPD (~1min30s)

Le Modèle Physique de Données, c'est la traduction concrète en SQL PostgreSQL.

Quelques choix techniques importants que j'ai faits.
D'abord le type `DECIMAL(10,2)` pour les prix — c'est essentiel pour éviter les erreurs d'arrondi sur les montants monétaires.
Ensuite `NOT NULL DEFAULT 0` pour le stock — le stock ne peut jamais être null, avec une valeur par défaut à zéro.
Les clés étrangères avec `REFERENCES` garantissent l'intégrité référentielle entre les tables.
Et j'ai utilisé `GENERATED ALWAYS AS IDENTITY` pour les identifiants auto-incrémentés — c'est la syntaxe moderne recommandée depuis PostgreSQL 10.

---

## Slide 20 — Diagramme de classe JPA (~1min)

Le diagramme de classes représente les entités JPA du backend — c'est la traduction objet de mon MLD.
On retrouve les mêmes entités : Product, Account, Client, Order, OrderLine, avec l'énumération OrderStatus qui peut prendre les valeurs PENDING, COMPLETED ou CANCELLED.
Les relations entre classes correspondent exactement aux clés étrangères du MLD : un Client a zéro ou plusieurs Orders, un Order a une ou plusieurs OrderLines, chaque OrderLine est liée à un Product.

---

## Slide 21 — Diagramme de cas d'usage (~45s)

Le diagramme de cas d'usage représente les interactions entre les acteurs et le système.
On a trois acteurs : le Visiteur, le Client et l'Admin.
Le Visiteur peut parcourir le catalogue et voir les fiches produits.
Le Client peut gérer son panier, passer commande — ce qui inclut l'envoi d'un email à l'admin — et rechercher des produits.
L'Admin peut gérer les produits avec les actions ajouter, modifier et supprimer, gérer les stocks, les commandes et consulter les clients.

---

## Slide 22 — Diagramme de séquence (~1min)

Le diagramme de séquence illustre le flux complet de l'ajout d'un produit au panier.
Le client clique sur "Ajouter au panier", le frontend envoie un POST vers `/api/orders/cart/items`.
Le CartController appelle le CartService qui vérifie d'abord la disponibilité du stock via le repository.
Si le stock est suffisant, il cherche ou crée la commande en cours, insère la ligne de commande, et retourne un 200 OK avec le panier mis à jour.
Si le stock est insuffisant, une exception est levée et le frontend affiche un message d'erreur.
Ce diagramme montre bien la séparation des responsabilités entre les couches.

---

## Slide 23 — Fonctionnalité type (~15s)

Maintenant je vais vous présenter une fonctionnalité type pour illustrer concrètement comment toutes ces couches s'articulent : la création d'un produit, analysée de bout en bout.

---

## Slide 24 — Vue d'ensemble (~30s)

La création d'un produit implique cinq couches successives.
Le formulaire React côté admin, le service Axios qui envoie l'appel HTTP, le Controller Java qui reçoit la requête, le Service métier qui applique la logique, et enfin le Repository JPA qui persiste en base PostgreSQL.

---

## Slide 25 — Formulaire Admin (~30s)

Voici l'interface admin. L'admin ouvre le modal "Ajouter un produit" et remplit les champs : nom, marque, prix, stock, taille, type, genre, description et URL image.
En cliquant sur "Ajouter le produit", le formulaire déclenche un appel POST vers `/api/products`.

---

## Slide 26 — Frontend appel HTTP (~30s)

Côté frontend, c'est le `ProductService.ts` qui gère l'appel HTTP.
La méthode `createProduct` prend en paramètre un objet de type `CreateProductDto` et envoie une requête POST via Axios vers l'endpoint `/products`.
Elle retourne une promesse avec le produit créé.

---

## Slide 27 — Controller (~45s)

Le Controller Spring Boot reçoit la requête POST sur `/api/products`.
L'annotation `@Valid` déclenche la validation automatique des données avant même d'entrer dans la logique métier.
Ensuite, le `ProductMapper` convertit le DTO reçu en entité JPA.
Le service est appelé, et si tout se passe bien, on retourne un HTTP 201 CREATED avec le produit créé converti en ResponseDTO.

---

## Slide 28 — DTO (~45s)

Le DTO, Data Transfer Object, joue un rôle clé dans cette architecture.
Il valide les données entrantes grâce aux annotations Bean Validation : `@NotBlank` pour les champs obligatoires, `@DecimalMin` pour le prix, `@Min` pour le stock.
Il isole aussi l'entité JPA de l'extérieur — on n'expose jamais directement l'entité en dehors du backend.

---

## Slide 29 — Service (~45s)

Le service contient la logique métier.
Ici, si le code produit n'est pas fourni, il est généré automatiquement selon un format précis : les trois premières lettres de la marque, le code du type de concentration, la taille en millilitres, et un numéro séquentiel.
Par exemple, un Chanel Eau de Parfum 100ml donne `CHA-EDP-100-0001`.
Ensuite, le produit est sauvegardé via `productRepository.save()`.

---

## Slide 30 — Entité JPA (~45s)

L'entité JPA fait le lien entre le monde Java et la base de données.
L'annotation `@Entity` indique que cette classe est une entité persistée. `@Table(name = "products")` mappe vers la table SQL correspondante.
`@Id` et `@Column(name = "product_code")` définissent la clé primaire.
Les noms en camelCase Java sont mappés vers les noms en snake_case SQL grâce aux annotations `@Column`.
Et `@PrePersist` génère automatiquement la date de création à chaque nouvel enregistrement.

---

## Slide 31 — Sécurisation (~15s)

Parlons maintenant de la sécurisation de l'application, qui repose sur trois piliers : JWT, BCrypt, et Spring Security.

---

## Slide 32 — JWT stateless (~1min30s)

L'authentification repose sur JWT en mode stateless — c'est-à-dire sans session côté serveur.

Le flux est simple en 4 étapes.
Le client envoie ses identifiants email et mot de passe.
Le serveur valide les credentials et génère un token JWT signé.
Le serveur retourne ce token au client.
Le client l'inclut ensuite dans chaque requête via un cookie httpOnly.

Un token JWT est composé de trois parties séparées par des points.
Le Header contient l'algorithme de signature — ici HS256 — et le type JWT.
Le Payload contient les données : l'email, le rôle, la date d'émission et la date d'expiration.
La Signature garantit que le token n'a pas été falsifié. Elle est calculée avec une clé secrète connue uniquement du serveur.

L'avantage du mode stateless : le serveur n'a pas besoin de stocker de session. Chaque requête est auto-suffisante.

---

## Slide 33 — BCrypt (~1min)

Pour les mots de passe, j'utilise BCrypt, l'algorithme de hashage recommandé pour les applications web.

A l'inscription, le mot de passe fourni par l'utilisateur est hashé avant d'être stocké en base. Le hash est irréversible — même moi je ne peux pas retrouver le mot de passe original.

A la connexion, BCrypt recalcule le hash du mot de passe saisi et le compare avec celui stocké en base. C'est la méthode `passwordEncoder.matches()` qui fait cette vérification.

Le mot de passe en clair ne circule jamais et n'est jamais stocké.

---

## Slide 34 — JWT code (~45s)

Voici concrètement la génération du token JWT dans `JwtUtil.java`.
La méthode `generateToken` prend l'email et le rôle en paramètres.
Elle construit le token avec JJWT : le sujet est l'email, on ajoute le rôle en claim, on définit l'expiration à 10 heures, et on signe avec la clé secrète.
Le token est stocké dans un cookie `httpOnly` — inaccessible au JavaScript — ce qui protège contre les attaques XSS.

---

## Slide 35 — Spring Security Config (~1min30s)

La classe `SecurityConfig` est le cœur de la configuration sécurité.

Première décision importante : `SessionCreationPolicy.STATELESS` — pas de session HTTP, chaque requête doit porter son propre token JWT.

Ensuite les règles d'autorisation. Les endpoints publics sont explicitement listés : register, login, et la lecture du catalogue produits.
Pour les routes protégées : seul un utilisateur avec le rôle ADMIN peut créer, modifier ou supprimer des produits — via `hasRole("ADMIN")`.
Tout le reste nécessite au minimum une authentification.

Et enfin, le `JwtAuthenticationFilter` est injecté avant le filtre d'authentification standard de Spring Security. C'est lui qui intercepte chaque requête, extrait le token du cookie, le valide, et injecte l'authentification dans le contexte de sécurité.

---

## Slide 36 — Stratégie de tests backend (~45s)

Pour les tests, j'ai mis en place une stratégie en deux volets.
Côté backend avec JUnit 5 et Mockito, j'ai ciblé quatre axes : la vérification des endpoints REST, la validation des règles métier, le contrôle des statuts HTTP retournés, et les tests d'accès par rôle.

---

## Slide 37 — Stratégie de tests frontend (~45s)

Côté frontend avec Vitest et React Testing Library, j'ai testé les hooks : la vérification des appels API mockés, la gestion des états de chargement et d'erreur, et la validation du format des données retournées.

---

## Slide 38 — Préparation et exécution (~45s)

Pour prioriser les tests, j'ai ciblé les fonctionnalités critiques en premier : la création d'un produit et la récupération du catalogue.
J'ai couvert trois types de scénarios : les scénarios normaux avec des données valides, les scénarios d'erreur avec des données incorrectes ou des tokens invalides, et les cas limites comme les champs obligatoires manquants.
Vous voyez ici le rapport JaCoCo — le `ProductMapper` atteint 97% de couverture, le `ProductService` couvre les cas métier critiques.

---

## Slide 39 — Exemple de test (~45s)

Voici un exemple concret avec le pattern AAA : Arrange, Act, Assert.
Dans la phase Arrange, on configure Mockito pour que `productRepository.save()` retourne le produit.
Dans la phase Act, on appelle `productService.createProduct()`.
Dans la phase Assert, on vérifie que le résultat n'est pas null et que `save()` a bien été appelé exactement une fois.
Mockito nous permet de tester la logique du service de manière totalement isolée, sans base de données réelle.

---

## Slide 40 — Veille de sécurité (~15s)

Dans le cadre de ma veille technologique, je me suis intéressé à une vulnérabilité très répandue dans les applications web : le Cross-Site Scripting, ou XSS.

---

## Slide 41 — XSS (~2min)

Le XSS est une attaque qui consiste à injecter du code JavaScript malveillant dans une page web pour qu'il soit exécuté par d'autres utilisateurs.

Le scénario classique : un attaquant soumet un contenu malveillant dans un champ — par exemple un nom de produit contenant une balise script. Si l'application affiche ce contenu sans le filtrer, le code s'exécute dans le navigateur de tous les utilisateurs qui visitent la page.
Les conséquences peuvent être graves : vol de cookies de session, redirection vers des sites frauduleux, ou vol de données sensibles.

Il existe deux types principaux. Le XSS stocké — le code malveillant est enregistré en base et réexécuté à chaque affichage. Et le XSS réfléchi — le code est injecté via une URL et s'exécute immédiatement.

Dans mon projet, je me protège contre le XSS de deux façons.
Côté frontend, React échappe automatiquement toutes les valeurs injectées dans le JSX — ce qui empêche l'injection de code HTML brut.
Côté backend, le token JWT est stocké dans un cookie `httpOnly`, ce qui le rend inaccessible au JavaScript — même si du code malveillant s'exécute, il ne peut pas voler le token.

---

## Slide 42 — Démo (~30s)

Je vous propose maintenant une démonstration live de l'application.
Je vais vous montrer le parcours de création d'un produit depuis l'interface admin, jusqu'à sa persistance en base de données.

---

## Slide 43 — Conclusion (~1min)

Pour conclure, ce projet m'a permis de couvrir un cycle complet : du besoin réel jusqu'au déploiement en production, en passant par la conception MERISE, le développement fullstack et la mise en place d'une CI/CD.

Les points forts : une architecture sécurisée avec JWT et BCrypt, une modélisation rigoureuse avec MERISE, et une application déployée et fonctionnelle en production.

Les difficultés rencontrées : la modélisation MCD/MLD avec des identifiants relatifs complexes, les cascades JPA sur des graphes d'objets imbriqués, et la configuration Spring Security avec CORS, JWT et les cookies httpOnly.

En perspective : l'ajout de tests End-to-End avec Playwright, un système de refresh token, et une PWA mobile.

---

## Slide 44 — Merci (~10s)

Merci pour votre attention. Je suis disponible pour répondre à vos questions.

---

# QUESTIONS FRÉQUENTES DU JURY

**Pourquoi JWT et pas les sessions ?**
JWT est stateless — le serveur n'a pas besoin de stocker l'état de session. C'est plus adapté à une API REST consommée par un frontend découplé, et ça facilite le passage à l'échelle.

**Pourquoi BCrypt et pas SHA-256 ?**
BCrypt est spécifiquement conçu pour les mots de passe : il est lent intentionnellement, ce qui résiste aux attaques par force brute. SHA-256 est trop rapide pour sécuriser des mots de passe.

**Quelle est la différence entre MCD, MLD et MPD ?**
Le MCD est conceptuel et indépendant de toute technologie. Le MLD traduit en modèle relationnel avec les clés étrangères. Le MPD est la traduction finale en SQL pour un SGBD précis — ici PostgreSQL.

**Pourquoi le productCode en clé primaire et pas un ID auto-incrémenté ?**
Le code produit est métier et unique par nature — il encode la marque, le type et la taille. L'utiliser comme clé primaire évite une colonne supplémentaire et rend les données plus lisibles.

**Pourquoi les cookies httpOnly pour le JWT et pas le localStorage ?**
Le localStorage est accessible en JavaScript, ce qui le rend vulnérable aux attaques XSS. Un cookie httpOnly est inaccessible au JavaScript — même en cas d'injection de code malveillant.

