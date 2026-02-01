# Script de Présentation Orale - CDA
## Belle Île Parfumée - Application E-commerce

---

## SLIDE 1 : Page de Titre
**[Durée estimée : 1 minute]**

> Bonjour à tous, je vous remercie de votre présence aujourd'hui.
>
> Je m'appelle [VOTRE NOM], et je suis candidat au titre professionnel de **Concepteur Développeur d'Applications**.
>
> Aujourd'hui, je vais vous présenter mon projet de fin de formation : **Belle Île Parfumée**, une application web e-commerce dédiée à la vente de parfums en ligne.
>
> Cette présentation va couvrir l'ensemble du cycle de développement, de l'analyse des besoins jusqu'au déploiement, en passant par la conception et l'implémentation technique.

---

## SLIDE 2 : Sommaire
**[Durée estimée : 30 secondes]**

> Voici le plan de ma présentation.
>
> Nous allons commencer par le **contexte** et la **problématique** pour comprendre les besoins métier.
>
> Ensuite, je vous présenterai les **personas** qui représentent nos utilisateurs cibles.
>
> Puis nous verrons la **solution proposée** et les **objectifs** du projet.
>
> Nous aborderons ensuite la **conception** avec les spécifications et la charte graphique, puis l'**architecture technique** avec les diagrammes UML.
>
> Enfin, nous parlerons des **fonctionnalités**, de la **sécurité**, puis je ferai une **démonstration** avant de conclure.

---

## SLIDE 3 : Contexte
**[Durée estimée : 1 minute 30]**

> Commençons par le contexte du projet.
>
> Belle Île Parfumée est l'activité d'un **auto-entrepreneur** spécialisé dans la vente de parfums de grandes marques comme Chanel, Dior ou Yves Saint Laurent depuis 10 ans.
>
> Actuellement, le processus de vente suit un cycle hebdomadaire bien défini :
>
> Chaque **dimanche**, l'entrepreneur se rend chez son grossiste pour se réapprovisionner. Le stock disponible varie selon les arrivages au port du Havre.
>
> Le dimanche soir, les clients fidèles le contactent pour connaître les nouveautés disponibles.
>
> Toute la communication se fait **manuellement** : envoi d'emails individuels, mise à jour de fichiers Excel, gestion des stocks à la main.
>
> C'est ce processus **chronophage** et **source d'erreurs** qui a motivé le développement d'une solution digitale.

---

## SLIDE 4 : Problématique
**[Durée estimée : 1 minute 30]**

> Cette situation engendre plusieurs **difficultés** majeures.
>
> Premièrement, l'**inventaire manuel** chaque dimanche prend énormément de temps.
>
> La mise à jour des produits se fait **un par un**, ce qui est fastidieux.
>
> Les **emails individuels** aux clients pour les informer des nouveautés sont répétitifs.
>
> La gestion via des **fichiers Excel** est peu fiable et difficile à maintenir.
>
> Tout ce processus est extrêmement **chronophage**.
>
> Les **conséquences** sont importantes :
> - Une **perte de temps considérable** chaque semaine
> - Un **risque d'erreurs humaines** dans les stocks ou les prix
> - Une **mauvaise expérience client** qui doit attendre les emails
> - Un **stress** important chaque dimanche soir
> - Et surtout, des **clients qui partent** à la concurrence faute de réactivité

---

## SLIDE 5 : Personas
**[Durée estimée : 2 minutes]**

> Pour bien comprendre les besoins, j'ai défini deux **personas** qui représentent les utilisateurs cibles de l'application.
>
> **Premier persona : Sophie Martin**
>
> Sophie a 34 ans, c'est une **cliente régulière** qui achète ses parfums depuis plusieurs années.
>
> Ses **objectifs** sont :
> - Pouvoir acheter ses parfums préférés facilement
> - Être informée rapidement des nouveautés
> - Commander depuis son mobile quand elle veut
>
> Ses **frustrations** actuelles :
> - Elle doit attendre les emails du dimanche soir
> - Parfois le stock est épuisé avant qu'elle puisse commander
>
> **Deuxième persona : Marc Dupont**
>
> Marc a 45 ans, c'est l'**administrateur** et vendeur, le propriétaire de l'activité.
>
> Ses **objectifs** sont :
> - Gérer son stock facilement et rapidement
> - Gagner du temps sur les tâches répétitives
> - Satisfaire ses clients et les fidéliser
>
> Ses **frustrations** :
> - Les emails manuels répétitifs chaque dimanche
> - La mise à jour fastidieuse des fichiers Excel
>
> Ces deux personas ont guidé mes choix de conception pour répondre à leurs besoins respectifs.

---

## SLIDE 6 : Solution
**[Durée estimée : 1 minute 30]**

> La solution proposée est **Belle Île Parfumée**, une application e-commerce complète.
>
> **Pour les clients comme Sophie** :
> - Un **catalogue en temps réel** accessible 24h/24
> - Les **stocks visibles** instantanément pour éviter les déceptions
> - Une **commande en ligne simplifiée** en quelques clics
> - Un **historique des commandes** pour retrouver ses achats
> - Une interface **responsive** adaptée au mobile
>
> **Pour l'administrateur Marc** :
> - Une **gestion centralisée** des stocks depuis une interface unique
> - Un **CRUD produits complet** pour ajouter, modifier, supprimer
> - La **fin des emails manuels** grâce aux notifications automatiques
> - Un **suivi des commandes** en temps réel
> - Un **tableau de bord** pour visualiser l'activité
>
> Cette solution répond directement aux frustrations identifiées dans les personas.

---

## SLIDE 7 : Objectifs
**[Durée estimée : 1 minute]**

> Les objectifs du projet sont au nombre de quatre :
>
> **Automatiser** : Le premier objectif est d'automatiser la gestion des stocks et la communication client pour éliminer les tâches manuelles répétitives.
>
> **Centraliser** : Le deuxième objectif est de centraliser les commandes en un seul endroit pour réduire les risques d'erreurs et simplifier le suivi.
>
> **Améliorer l'expérience utilisateur** : Le troisième objectif est d'offrir une expérience d'achat fluide et moderne aux clients, comparable aux grandes plateformes e-commerce.
>
> **Sécuriser** : Enfin, le quatrième objectif est de protéger les données utilisateurs avec des technologies éprouvées comme JWT pour l'authentification et BCrypt pour le hashage des mots de passe.

---

## SLIDE 8 : Spécifications Fonctionnelles
**[Durée estimée : 1 minute 30]**

> Passons aux **spécifications fonctionnelles** qui définissent ce que l'application doit faire.
>
> **Espace Client** :
> - **Consultation du catalogue** avec tous les produits disponibles
> - **Recherche** par nom ou par marque
> - **Filtrage** par genre (homme, femme, mixte) ou par catégorie (eau de parfum, eau de toilette)
> - **Gestion du panier** avec ajout, modification, suppression d'articles
> - **Inscription et connexion** avec création de compte
> - **Passage de commande** avec validation et confirmation
>
> **Espace Administration** :
> - **CRUD Produits complet** : Create, Read, Update, Delete
> - **Gestion des stocks** avec mise à jour des quantités
> - **Gestion des clients** avec visualisation des comptes
> - **Suivi des commandes** avec les différents statuts
> - **Tableau de bord** avec vue d'ensemble de l'activité

---

## SLIDE 9 : Charte Graphique
**[Durée estimée : 1 minute]**

> La **charte graphique** définit l'identité visuelle de l'application.
>
> J'ai opté pour une palette de couleurs **épurée et élégante** :
> - **Noir** (#0A0A0A) pour les textes et boutons principaux
> - **Blanc** (#FFFFFF) pour les fonds
> - **Gris clair** (#F5F5F5) pour les arrière-plans secondaires
> - **Gris** (#6B6B6B) pour les textes secondaires
>
> Ce choix de couleurs neutres met en valeur les visuels des parfums et véhicule une image **haut de gamme**.
>
> Pour la **typographie**, j'utilise la police **Inter** de Google Fonts, une police moderne et très lisible. Les titres sont en 32 à 44 pixels en gras, le corps de texte en 16 pixels.
>
> Les **composants UI** suivent une logique cohérente : boutons sur fond noir, cartes sur fond blanc avec ombre légère pour créer de la profondeur.

---

## SLIDE 10 : Zoning
**[Durée estimée : 1 minute]**

> Avant de passer au développement, j'ai réalisé un **zoning** des principales pages.
>
> Le zoning permet de définir l'**organisation des zones** de l'interface sans se soucier du design.
>
> *[Présenter les zones du zoning]*
>
> On identifie les zones principales :
> - Le **header** avec le logo et la navigation
> - La **zone de contenu principal** qui varie selon les pages
> - Le **footer** avec les informations légales
>
> Cette étape permet de valider la structure avant d'aller plus loin.

---

## SLIDE 11 : Wireframes
**[Durée estimée : 1 minute]**

> À partir du zoning, j'ai créé les **wireframes**, aussi appelés maquettes fil de fer.
>
> Les wireframes sont des représentations **basse fidélité** de l'interface, en noir et blanc.
>
> *[Présenter les wireframes]*
>
> Ils permettent de :
> - Définir le **placement des éléments** (boutons, textes, images)
> - Valider les **parcours utilisateur** avant de travailler le visuel
> - Itérer rapidement sans investir dans le design
>
> Cette étape est essentielle dans la méthode de conception centrée utilisateur.

---

## SLIDE 12 : Maquettes
**[Durée estimée : 1 minute]**

> Les **maquettes haute fidélité** représentent le design final de l'interface.
>
> *[Présenter les maquettes]*
>
> Elles intègrent :
> - La **charte graphique** définie précédemment (couleurs, typographie)
> - Les **visuels réels** des produits
> - Les **interactions** et états des composants (hover, focus, etc.)
>
> Ces maquettes ont servi de référence pour l'intégration frontend en React.
>
> La progression **Zoning → Wireframes → Maquettes** suit une approche **itérative** qui permet de valider chaque étape avec le client.

---

## SLIDE 13 : Arborescence
**[Durée estimée : 1 minute]**

> Voici l'**arborescence du site** qui présente la structure de navigation.
>
> L'arborescence est organisée en plusieurs zones :
>
> - En **rouge**, la page d'accueil qui est le point d'entrée
> - En **bleu**, les pages publiques accessibles à tous : catalogue, catégories, détail produit
> - En **vert**, les pages d'authentification : connexion et inscription
> - En **violet**, l'espace client protégé : panier, checkout, confirmation, compte et commandes
> - En **jaune**, l'espace administration : dashboard, gestion produits, commandes et clients
>
> Cette vue permet de visualiser l'ensemble des parcours utilisateur possibles.

---

## SLIDE 14 : Stack Technique
**[Durée estimée : 2 minutes]**

> Passons maintenant aux **choix techniques**.
>
> **Côté Frontend**, j'ai choisi :
>
> - **React 19** avec **TypeScript 5.9** : React est une bibliothèque JavaScript pour créer des interfaces utilisateur basées sur des **composants réutilisables**. TypeScript ajoute le **typage statique** qui permet de détecter les erreurs à la compilation.
>
> - **Vite 7** comme outil de build : Vite utilise les **ES Modules natifs** pour un rechargement quasi instantané en développement, ce qu'on appelle le **Hot Module Replacement**.
>
> - **React Router DOM** pour la navigation côté client dans une **Single Page Application** (SPA).
>
> - **Axios** pour les requêtes HTTP vers l'API.
>
> - **Context API** pour la gestion de l'état global, notamment le panier et l'authentification.
>
> **Côté Backend**, j'ai choisi :
>
> - **Spring Boot 3.5** avec **Java 21** : Spring Boot est un framework qui simplifie le développement d'applications Java grâce au principe de **convention over configuration**.
>
> - **Spring Security** avec **JWT** : pour l'authentification **stateless** basée sur des tokens.
>
> - **Spring Data JPA** : l'ORM qui permet de manipuler la base de données avec des objets Java via le pattern **Repository**.
>
> - **PostgreSQL** : un SGBD relationnel robuste pour persister les données.

---

## SLIDE 15 : Architecture 3-Tiers
**[Durée estimée : 2 minutes]**

> Voici le **diagramme d'architecture** qui présente la vue d'ensemble du système.
>
> J'ai implémenté une **architecture 3-tiers** qui sépare l'application en trois couches distinctes :
>
> **La couche Présentation** (Frontend) :
> C'est l'interface utilisateur développée en React. Elle s'exécute dans le navigateur du client et communique avec le backend via le protocole **HTTPS**.
>
> **La couche Métier** (Backend) :
> C'est le cœur de l'application développé en Spring Boot. Elle contient toute la **logique métier**, les règles de gestion, la validation et la sécurité. Elle expose une **API REST** qui reçoit des requêtes HTTP et renvoie des réponses au format **JSON**.
>
> **La couche Données** :
> C'est la base de données PostgreSQL qui persiste les données. Le backend communique avec elle via **JPA** et le driver **JDBC**.
>
> Un **service externe** est également intégré : le serveur **SMTP Gmail** pour l'envoi d'emails de confirmation.
>
> Cette architecture offre plusieurs avantages : **séparation des responsabilités**, **scalabilité**, **maintenabilité** et **testabilité**.

---

## SLIDE 16 : Modèle de Données
**[Durée estimée : 1 minute]**

> Le modèle de données comprend **5 entités JPA** principales :
>
> **Account** : gère l'authentification avec l'email, le mot de passe hashé et le rôle (CLIENT ou ADMIN).
>
> **Client** : représente un utilisateur avec ses informations personnelles (nom, prénom, téléphone).
>
> **Product** : représente un parfum avec son code unique, nom, marque et prix.
>
> **Order** : représente une commande avec un numéro, une date et un statut.
>
> **OrderLine** : représente une ligne de commande avec la quantité et le prix unitaire.
>
> Ces entités sont annotées avec JPA et correspondent aux tables de la base PostgreSQL.

---

## SLIDE 17 : Diagramme de Classes
**[Durée estimée : 2 minutes 30]**

> Voici le **diagramme de classes UML** qui modélise les relations entre les entités.
>
> En UML, le diagramme de classes est un **diagramme structurel** qui montre les classes, leurs attributs, leurs méthodes et leurs relations.
>
> Les relations utilisent deux types de **losanges** :
>
> Le **losange vide** (◇) représente une **agrégation**. C'est une relation où les objets ont des **cycles de vie indépendants**. Par exemple :
> - Client **agrège** Account : un compte peut exister sans client
> - Client **agrège** Order : les commandes sont liées au client mais ont leur propre existence
> - Product **agrège** OrderLine : un produit peut exister sans être dans une commande
>
> Le **losange plein** (◆) représente une **composition**. C'est une relation où le **cycle de vie est lié**. Par exemple :
> - Order **compose** OrderLine : si une commande est supprimée, ses lignes le sont aussi. Une OrderLine ne peut pas exister sans son Order parent.
>
> Les **cardinalités** indiquent le nombre d'instances possibles :
> - Un Client peut avoir 0 à plusieurs commandes (0..*)
> - Une commande contient au moins une ligne (1..*)
> - Un Client a 0 ou 1 Account (0..1)

---

## SLIDE 18 : Fonctionnalité Panier
**[Durée estimée : 1 minute 30]**

> La **gestion du panier** est une fonctionnalité centrale de l'application e-commerce.
>
> J'ai implémenté une **double persistance** selon l'état de connexion de l'utilisateur :
>
> **Mode non connecté** :
> Le panier est stocké dans le **localStorage** du navigateur. C'est une persistance côté client qui permet de conserver le panier même si l'utilisateur ferme son navigateur.
>
> **Mode connecté** :
> Le panier est stocké en base de données sous forme d'une **Order avec le statut PENDING**. Cela permet une synchronisation temps réel entre différents appareils.
>
> **Caractéristiques clés** :
> - **Fusion automatique** : à la connexion, le panier local est fusionné avec le panier serveur pour ne perdre aucun article
> - **Vérification du stock** en temps réel avant la validation
> - **Email de confirmation** automatique après validation de la commande
>
> Cette approche utilise le **Context API** de React pour gérer l'état global du panier.

---

## SLIDE 19 : Diagramme de Séquence
**[Durée estimée : 2 minutes]**

> Le **diagramme de séquence** est un diagramme comportemental qui montre les interactions entre objets dans le temps.
>
> J'ai modélisé le cas d'utilisation **"Ajouter un produit au panier"**.
>
> **Lecture du diagramme** : le temps s'écoule de haut en bas. Les **lignes de vie** verticales représentent les participants : le Client, l'interface React, le Controller REST, le Service métier, le Repository et la base de données.
>
> **Déroulement** :
> 1. Le client clique sur "Ajouter au panier"
> 2. React envoie une requête **POST** à l'endpoint `/api/orders/cart/items`
> 3. Le Controller délègue au Service
> 4. Le Service vérifie d'abord la disponibilité du produit via le Repository
> 5. Le Repository effectue un **SELECT** en base
>
> Le bloc **alt** représente une **alternative** avec deux branches :
> - **Stock suffisant** : on récupère ou crée le panier PENDING, on ajoute la ligne, et on renvoie un code **200 OK**
> - **Stock insuffisant** : on lève une exception et on renvoie un code **400 Bad Request**
>
> Ce diagramme illustre bien l'**architecture en couches** et le pattern **MVC**.

---

## SLIDE 20 : Sécurité
**[Durée estimée : 2 minutes]**

> La **sécurité** est un aspect critique pour une application e-commerce.
>
> **Authentification** avec **JWT** (JSON Web Token) :
>
> Le JWT est un standard ouvert (RFC 7519) pour l'authentification **stateless**. Il se compose de trois parties encodées en Base64 :
> - Le **Header** : contient l'algorithme de signature
> - Le **Payload** : contient les données utilisateur (email, rôle, date d'expiration)
> - La **Signature** : garantit l'intégrité du token
>
> Les mots de passe sont hashés avec **BCrypt**, un algorithme qui inclut un **salt** aléatoire pour se protéger des attaques par rainbow table.
>
> **Autorisation** avec gestion des **rôles** :
>
> Le système RBAC (Role-Based Access Control) distingue deux rôles :
> - **CLIENT** : accès aux fonctionnalités de consultation et commande
> - **ADMIN** : accès supplémentaire à la gestion des produits et commandes
>
> Les routes sont protégées côté frontend avec un composant **PrivateRoute**, et côté backend avec l'annotation **@PreAuthorize**.
>
> La configuration **CORS** n'autorise que le domaine du frontend à appeler l'API.

---

## SLIDE 21 : Code Produit
**[Durée estimée : 1 minute]**

> J'ai mis en place un système de **génération automatique de code produit** pour identifier chaque parfum de manière unique.
>
> Le format est : **XXX-TTT-MMM-YYYY**
>
> - **XXX** : 3 lettres pour la **marque** (ex: CHA pour Chanel, DIO pour Dior)
> - **TTT** : 3 lettres pour le **type de concentration** (ex: EDP pour Eau de Parfum, EDT pour Eau de Toilette)
> - **MMM** : 3 chiffres pour la **contenance en ml** (ex: 050, 100)
> - **YYYY** : 4 chiffres **séquentiels** pour différencier les variantes
>
> **Exemple** : CHA-EDP-100-0001 correspond au premier Chanel N°5 Eau de Parfum 100ml enregistré.
>
> Ce système permet une identification rapide et une organisation logique du catalogue.

---

## SLIDE 22 : Démonstration
**[Durée estimée : 5 minutes]**

> Je vais maintenant vous faire une **démonstration live** de l'application.
>
> *[Ouvrir l'application dans le navigateur]*
>
> **Page d'accueil** : Voici l'interface principale avec le header, la navigation et les produits mis en avant. Le design est responsive.
>
> **Catalogue** : Je peux parcourir tous les parfums, utiliser les filtres par catégorie, par genre. Les cards affichent les informations essentielles.
>
> **Détail produit** : En cliquant sur un parfum, j'accède à sa fiche avec la description complète, le prix, le stock et le sélecteur de quantité.
>
> **Panier** : J'ajoute un produit. Le badge se met à jour. Je peux voir mon panier, modifier les quantités, le total se recalcule automatiquement.
>
> **Connexion** : Je me connecte avec un compte. Le JWT est généré et stocké. Mon panier local est synchronisé avec le serveur.
>
> **Commande** : Je valide ma commande. Après vérification du stock, elle passe en statut COMPLETED.
>
> *[Si temps disponible : montrer les DevTools avec les requêtes API]*

---

## SLIDE 23 : Conclusion
**[Durée estimée : 1 minute 30]**

> Pour conclure, voici le bilan du projet.
>
> **Réalisations** :
> - Un **frontend React 19** moderne et responsive
> - Un **backend Spring Boot 3.5** robuste et sécurisé
> - Une **base de données PostgreSQL** pour la persistance
> - Une **sécurité** complète avec JWT et BCrypt
> - Un **code maintenable** et documenté
>
> Les objectifs initiaux ont été atteints : automatisation, centralisation, amélioration de l'UX et sécurisation.
>
> **Évolutions possibles** pour aller plus loin :
> - Intégration d'un **paiement en ligne** avec Stripe
> - Ajout de **tests end-to-end** avec Cypress
> - Mise en place d'un **CI/CD** avec GitHub Actions
> - Transformation en **PWA** (Progressive Web App)
> - Développement d'une **application mobile** native
>
> Ce projet m'a permis de mettre en œuvre l'ensemble des compétences du référentiel CDA.

---

## SLIDE 24 : Questions
**[Durée estimée : Variable]**

> Je vous remercie pour votre attention.
>
> Je suis maintenant disponible pour répondre à vos questions.

---

# QUESTIONS FRÉQUENTES DU JURY

## Architecture & Conception

**Q : Pourquoi avoir choisi une architecture 3-tiers ?**
> L'architecture 3-tiers offre une **séparation claire des responsabilités**. Chaque couche a un rôle précis : présentation, logique métier, accès aux données. Cela facilite la **maintenance** car on peut modifier une couche sans impacter les autres. C'est aussi plus **scalable** : on peut déployer plusieurs instances du backend derrière un load balancer. Enfin, c'est plus **testable** : on peut tester chaque couche isolément avec des mocks.

**Q : Quelle est la différence entre composition et agrégation ?**
> La **composition** (losange plein) indique une relation forte où le cycle de vie est lié. Si le parent est supprimé, les enfants le sont aussi. Exemple : Order-OrderLine.
> L'**agrégation** (losange vide) indique une relation plus faible où les objets peuvent exister indépendamment. Exemple : Client-Account.

**Q : Pourquoi avoir choisi le pattern Repository ?**
> Le pattern **Repository** abstrait l'accès aux données. Il permet de découpler la logique métier de la technologie de persistance. Avec Spring Data JPA, on bénéficie de méthodes CRUD automatiques et on peut ajouter des requêtes personnalisées avec des conventions de nommage ou l'annotation @Query.

## Sécurité

**Q : Pourquoi JWT plutôt que les sessions classiques ?**
> Le JWT permet une authentification **stateless** : le serveur n'a pas besoin de stocker les sessions en mémoire. Chaque requête est indépendante et contient toutes les informations nécessaires dans le token. C'est plus **scalable** car on peut ajouter des serveurs sans se soucier de la synchronisation des sessions. C'est aussi adapté aux architectures **microservices** et aux **SPA**.

**Q : Comment gérez-vous l'expiration des tokens ?**
> Les tokens ont une durée de vie de 24 heures définie dans le payload (claim "exp"). Côté frontend, avant chaque requête, je vérifie si le token est proche de l'expiration. Si oui, l'utilisateur est redirigé vers la page de connexion. Un système de **refresh token** pourrait être ajouté pour améliorer l'UX en permettant un renouvellement transparent.

**Q : Comment sont stockés les mots de passe ?**
> Les mots de passe sont hashés avec **BCrypt** avant stockage en base. BCrypt est un algorithme de hashage adaptatif qui inclut automatiquement un **salt** aléatoire de 128 bits. Le **cost factor** (10 par défaut) rend les attaques par force brute très coûteuses en temps de calcul.

## Technologies

**Q : Pourquoi React plutôt qu'Angular ou Vue ?**
> React offre une grande **flexibilité** avec son approche composants. Le **Virtual DOM** optimise les rendus. L'écosystème est riche avec de nombreuses bibliothèques. TypeScript apporte le typage fort pour la robustesse. C'est aussi le framework le plus demandé sur le marché de l'emploi, ce qui était un critère de choix pragmatique.

**Q : Pourquoi PostgreSQL plutôt que MySQL ?**
> PostgreSQL offre de meilleures **performances** pour les requêtes complexes et une conformité stricte aux standards SQL. Il supporte nativement les types JSON, les arrays, et offre des fonctionnalités avancées comme les CTE (Common Table Expressions). Il est très utilisé en entreprise et dans le cloud.

**Q : Qu'est-ce que JPA et Hibernate ?**
> **JPA** (Java Persistence API) est une spécification Java qui définit comment mapper des objets Java vers des tables relationnelles. C'est ce qu'on appelle un **ORM** (Object-Relational Mapping). **Hibernate** est l'implémentation la plus populaire de JPA. Il génère automatiquement les requêtes SQL à partir des opérations sur les objets Java.

## Fonctionnalités

**Q : Comment gérez-vous l'état global dans React ?**
> J'utilise le **Context API** natif de React pour les états partagés comme le panier et l'authentification. Le Context permet d'éviter le "prop drilling" (passage de props à travers de nombreux composants). Pour une application plus complexe, Redux ou Zustand seraient envisagés, mais le Context suffit pour ce périmètre.

**Q : Comment fonctionne la synchronisation du panier ?**
> En mode non connecté, le panier est stocké dans le **localStorage**. À la connexion, une fonction `syncCart()` est appelée : elle récupère le panier serveur (Order PENDING), fusionne les articles avec le panier local, envoie le résultat au backend, puis vide le localStorage. Cela garantit qu'aucun article n'est perdu.

**Q : Que se passe-t-il si le stock est insuffisant ?**
> La vérification du stock se fait à deux niveaux :
> 1. À l'**ajout au panier** : on vérifie la disponibilité et on bloque si insuffisant
> 2. Au **checkout** : on re-vérifie le stock de tous les articles avant validation
> Si le stock est insuffisant, une exception `InsufficientStockException` est levée et le frontend affiche un message d'erreur approprié.

## Tests & Qualité

**Q : Quelle est votre stratégie de test ?**
> Je suis la **pyramide des tests** :
> - **Tests unitaires** avec JUnit 5 pour la logique métier des services, en utilisant Mockito pour simuler les dépendances
> - **Tests d'intégration** avec Spring Boot Test pour tester les endpoints API avec une base H2 en mémoire
> - **Tests manuels** pour l'interface utilisateur
> L'objectif est de maintenir une couverture de code supérieure à 70% sur la couche service.

**Q : Comment gérez-vous le versioning du code ?**
> J'utilise **Git** avec le workflow **GitFlow** : une branche `main` pour la production, une branche `develop` pour l'intégration, et des branches `feature/` pour chaque nouvelle fonctionnalité. Les commits suivent les conventions avec des messages explicites.

---

# VOCABULAIRE TECHNIQUE CDA

| Terme | Définition |
|-------|------------|
| **API REST** | Architecture d'interface utilisant HTTP (GET, POST, PUT, DELETE) pour manipuler des ressources |
| **JWT** | JSON Web Token - standard d'authentification stateless avec signature cryptographique |
| **ORM** | Object-Relational Mapping - technique de mapping entre objets et tables relationnelles |
| **JPA** | Java Persistence API - spécification Java pour la persistance des données |
| **DTO** | Data Transfer Object - objet de transfert pour découpler entités et API |
| **SPA** | Single Page Application - application web mono-page avec routing côté client |
| **CRUD** | Create, Read, Update, Delete - les 4 opérations de base sur les données |
| **MVC** | Model-View-Controller - pattern de séparation des responsabilités |
| **Stateless** | Sans état côté serveur - chaque requête est indépendante |
| **Responsive** | Design adaptatif selon la taille d'écran (mobile, tablette, desktop) |
| **Context API** | Mécanisme React pour partager des données sans prop drilling |
| **BCrypt** | Algorithme de hashage adaptatif avec salt pour sécuriser les mots de passe |
| **CORS** | Cross-Origin Resource Sharing - politique de sécurité navigateur |
| **Composition** | Relation UML forte (losange plein) - cycle de vie lié |
| **Agrégation** | Relation UML faible (losange vide) - cycle de vie indépendant |
| **Cardinalité** | Nombre d'instances possibles dans une relation (1, 0..1, 0..*, 1..*) |
| **Persona** | Représentation fictive d'un utilisateur type basée sur des données réelles |

---

# CONSEILS POUR L'ORAL

1. **Chronométrez-vous** : visez 25-30 minutes de présentation pour laisser du temps aux questions
2. **Parlez lentement** et articulez les termes techniques
3. **Regardez le jury**, pas uniquement l'écran
4. **Utilisez des gestes** pour pointer les éléments des diagrammes
5. **Faites des pauses** entre les sections pour que le jury assimile
6. **Anticipez les questions** : relisez les réponses préparées
7. **Avouez si vous ne savez pas** plutôt que d'inventer
8. **Restez calme** : une respiration profonde aide
9. **Préparez votre démo** : vérifiez que tout fonctionne avant
10. **Ayez un plan B** : captures d'écran si la démo ne marche pas

---

**Bonne chance pour votre soutenance !**
