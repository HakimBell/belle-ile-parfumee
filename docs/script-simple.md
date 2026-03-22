# Script de présentation — Version simple à apprendre
# Belle Île Parfumée — Bellil Hakim — CDA 2026

---

## Slide 1 — Titre

"Bonjour, je m'appelle Hakim Bellil, je suis en formation CDA chez Simplon avec Webyn.
Mon projet s'appelle Belle Île Parfumée, c'est une application e-commerce que j'ai construite de A à Z."

---

## Slide 2 — Tout part d'un besoin réel

"Ce projet ne sort pas de nulle part. Il vient d'un besoin que j'ai vécu personnellement."

---

## Slide 3 — Contexte

"Pendant plusieurs années, j'ai vendu des parfums de grandes marques comme Chanel, YSL ou Mauboussin.
Mais toute ma gestion se faisait à la main : un fichier Excel pour les stocks, des messages pour envoyer les disponibilités chaque semaine.
À un moment, c'est devenu trop lourd. Alors j'ai décidé de créer un outil pour automatiser tout ça."

---

## Slide 4 — Problème

"Ce fonctionnement manuel avait trois gros problèmes.
D'abord ça prenait beaucoup de temps — plusieurs heures par semaine juste pour mettre à jour et communiquer.
Ensuite les erreurs — gérer un stock à la main, c'est risquer des surventes ou des oublis.
Et enfin les clients ne pouvaient pas commander seuls, ils devaient attendre que je leur envoie la liste."

---

## Slide 5 — Belle Île Parfumée

"La solution, c'est Belle Île Parfumée.
C'est une application fullstack qui digitalise toute cette gestion.
Elle permet de gérer un catalogue produits, un espace client, des commandes, et un tableau de bord admin — le tout sécurisé.
Techniquement : React côté front, Spring Boot côté back, PostgreSQL pour la base de données, et c'est déployé en production sur Render."

---

## Slide 6 — Personas

"Pour cadrer les besoins, j'ai défini deux profils utilisateurs.
L'admin — c'est moi — qui veut gérer les produits, les stocks et les commandes depuis un seul endroit.
Et le client — ici représenté par Marc — qui veut consulter le catalogue et passer commande tout seul, sans attendre."

---

## Slide 7 — Fonctionnalités principales

"J'ai trois types d'utilisateurs dans l'application.
Le visiteur peut voir le catalogue et créer un compte.
Le client connecté peut commander et suivre ses achats.
L'admin a accès à tout : il peut créer, modifier, supprimer des produits, gérer les stocks et traiter les commandes."

---

## Slide 8 — Gestion de projet

"Pour gérer le projet, j'ai utilisé la méthode Scrum avec des sprints d'une semaine.
J'ai organisé mon travail sur Jira avec des User Stories et un backlog priorisé."

---

## Slide 9 — Conception UX/UI

"Avant de coder, j'ai commencé par la conception visuelle en trois étapes : le zoning, les wireframes, puis la maquette."

---

## Slide 10 — Zoning

"Le zoning c'est la première étape — on découpe les pages en grandes zones, sans design, juste la structure.
J'ai fait ça en version desktop et mobile."

---

## Slide 11 — Wireframe

"Ensuite les wireframes — on va un peu plus dans le détail.
Ici sur la page produit, on voit la photo, le nom, le prix, et le bouton d'ajout au panier.
Toujours sans couleurs ni design, l'idée c'est juste de valider le placement des éléments."

---

## Slide 12 — Charte graphique

"Pour la charte graphique, j'ai choisi des couleurs en lien avec l'univers du parfum : du noir, du blanc, et un doré comme couleur d'accent.
Et la police Inter pour les textes."

---

## Slide 13 — Maquette

"Et voilà le résultat final en maquette haute fidélité, desktop et mobile.
On voit bien la charte graphique et la structure définie dans les wireframes."

---

## Slide 14 — Architecture 3 couches

"Mon application est construite sur une architecture 3 couches.
En haut, le navigateur web — c'est la couche client.
Au milieu, React pour l'affichage et Spring Boot pour la logique — c'est les couches présentation et métier.
En bas, PostgreSQL pour stocker les données.
Le front et le back communiquent via une API REST en JSON."

---

## Slide 15 — Environnement technique

"Les quatre technos principales : Java avec Spring Boot pour le backend, React avec TypeScript pour le frontend, et PostgreSQL pour la base de données."

---

## Slide 16 — Conception et modélisation

"Je vais maintenant vous présenter la partie conception et modélisation avec la méthode MERISE.
C'est une étape clé — elle permet de réfléchir à la structure des données avant d'écrire du code."

---

## Slide 17 — MCD ⭐ IMPORTANT

"Le MCD, c'est le Modèle Conceptuel de Données. C'est la première étape de MERISE.
L'objectif, c'est de représenter toutes les données du projet et leurs relations, de façon abstraite, sans penser à la technologie.

J'ai identifié quatre entités.
Les Clients — identifiés par leur email.
Les Comptes — liés aux clients, avec un rôle.
Les Commandes — avec un numéro et une date.
Et les Produits — identifiés par un code unique, avec toutes leurs caractéristiques.

Et trois relations :
Un client peut passer plusieurs commandes — relation 0,n.
Une commande inclut plusieurs produits, et un produit peut être dans plusieurs commandes — c'est une relation many-to-many, avec la quantité et le prix unitaire portés par la relation.
Un client est associé à zéro ou un compte.

Ce modèle m'a permis de savoir exactement quelles données j'avais besoin avant même d'ouvrir mon IDE."

---

## Slide 18 — MLD ⭐ IMPORTANT

"Le MLD, c'est le Modèle Logique de Données. C'est la traduction du MCD vers un modèle relationnel.

Chaque entité devient une table. Les relations deviennent des clés étrangères.
La relation many-to-many entre commandes et produits donne une table de liaison : la table `include`, avec les colonnes product_code, command_number, quantity et unit_price.

On voit aussi que la clé primaire de `products` c'est `product_code` — un code métier généré automatiquement par l'application.

Le MLD c'est ce qui prépare le passage au SQL."

---

## Slide 19 — MPD ⭐ IMPORTANT

"Le MPD, c'est le Modèle Physique de Données. C'est la traduction finale en SQL, ici pour PostgreSQL.

J'ai fait quelques choix importants.
`DECIMAL(10,2)` pour les prix — pour éviter les erreurs d'arrondi sur les montants.
`NOT NULL DEFAULT 0` pour le stock — le stock ne peut pas être null.
Les `FOREIGN KEY REFERENCES` pour garantir l'intégrité entre les tables.

C'est ce fichier SQL qui crée réellement la base de données."

---

## Slide 20 — Diagramme de classe JPA

"Le diagramme de classes représente les entités JPA — c'est la version Java de mon MLD.
On retrouve les mêmes entités, les mêmes relations, mais cette fois en orienté objet.
L'énumération OrderStatus définit les trois états possibles d'une commande : PENDING, COMPLETED et CANCELLED."

---

## Slide 21 — Diagramme de cas d'usage

"Le diagramme de cas d'usage montre qui peut faire quoi dans l'application.
Le visiteur peut consulter le catalogue.
Le client peut gérer son panier et passer commande — ce qui envoie automatiquement un email à l'admin.
L'admin peut tout gérer : produits, stocks, commandes et clients."

---

## Slide 22 — Diagramme de séquence

"Ce diagramme montre le flux complet quand un client ajoute un produit au panier.
Le frontend envoie un POST, le controller appelle le service, le service vérifie le stock en base.
Si le stock est suffisant, la ligne de commande est créée et on retourne un 200 OK.
Si le stock est insuffisant, une exception est lancée et le frontend affiche une erreur.
Ça montre bien comment les couches s'enchaînent."

---

## Slide 23 — Fonctionnalité type

"Je vais maintenant vous montrer une fonctionnalité concrète de bout en bout : la création d'un produit.
On va partir du formulaire admin jusqu'à la base de données."

---

## Slide 24 — Vue d'ensemble

"Pour créer un produit, la donnée passe par cinq couches successives :
Le formulaire React, le service Axios, le Controller Java, le Service métier, et enfin le Repository qui sauvegarde en base."

---

## Slide 25 — Formulaire Admin

"Voici l'interface. L'admin ouvre le formulaire, remplit les infos du produit et clique sur Ajouter.
Ça déclenche immédiatement un appel HTTP POST vers le backend."

---

## Slide 26 — Frontend appel HTTP

"C'est le `ProductService.ts` qui gère cet appel.
La méthode `createProduct` envoie les données via Axios en POST vers `/products` et retourne le produit créé."

---

## Slide 27 — Controller

"Le Controller reçoit la requête.
L'annotation `@Valid` valide automatiquement les données — si un champ obligatoire manque, Spring retourne directement une erreur 400 sans aller plus loin.
Ensuite le Mapper convertit le DTO en entité, le service est appelé, et on retourne un 201 CREATED."

---

## Slide 28 — DTO

"Le DTO c'est l'objet qui transporte les données entre le front et le back.
Il contient les règles de validation : `@NotBlank` pour les champs obligatoires, `@DecimalMin` pour le prix minimum.
Son rôle c'est aussi de protéger l'entité — on n'expose jamais directement l'entité JPA à l'extérieur."

---

## Slide 29 — Service

"Le service c'est là où se passe la logique métier.
Ici, si le code produit n'est pas fourni, il est généré automatiquement.
Le format c'est : 3 lettres de la marque, le type de concentration, la taille en ml, et un numéro séquentiel.
Par exemple Chanel Eau de Parfum 100ml donne `CHA-EDP-100-0001`.
Ensuite le produit est sauvegardé via le repository."

---

## Slide 30 — Entité JPA

"L'entité JPA fait le lien entre Java et la base de données.
`@Entity` dit à Spring que cette classe doit être persistée.
`@Table(name = 'products')` indique le nom de la table SQL.
`@Column` mappe chaque attribut vers la colonne correspondante.
Et `@PrePersist` génère automatiquement la date de création avant chaque insertion."

---

## Slide 31 — Sécurisation

"Parlons maintenant de la sécurité. Mon application repose sur trois mécanismes : JWT, BCrypt, et Spring Security."

---

## Slide 32 — JWT stateless ⭐ IMPORTANT

"L'authentification utilise JWT en mode stateless — sans session côté serveur.

Le fonctionnement en 4 étapes :
L'utilisateur envoie son email et son mot de passe.
Le serveur vérifie les credentials et génère un token JWT signé.
Ce token est envoyé au client dans un cookie sécurisé.
À chaque requête suivante, le client envoie ce cookie et le serveur le vérifie.

Un token JWT c'est trois parties séparées par des points.
Le Header avec l'algorithme de signature — HS256.
Le Payload avec les données : email, rôle, et dates d'émission et d'expiration.
La Signature qui garantit que le token n'a pas été modifié.

L'avantage du stateless : le serveur n'a rien à stocker. Tout est dans le token."

---

## Slide 33 — BCrypt ⭐ IMPORTANT

"Pour les mots de passe, j'utilise BCrypt.

À l'inscription, le mot de passe est hashé avant d'être stocké. Ce hash est irréversible — personne ne peut retrouver le mot de passe original, même avec accès à la base.

À la connexion, BCrypt recalcule le hash et le compare à celui stocké.
Le mot de passe en clair ne circule jamais et n'est jamais stocké."

---

## Slide 34 — JWT code

"Voici le code de génération du token dans `JwtUtil.java`.
On construit le token avec JJWT : on met l'email en sujet, le rôle en claim, l'expiration à 10 heures, et on signe avec la clé secrète.
Ce token est ensuite mis dans un cookie `httpOnly` — ce type de cookie est inaccessible au JavaScript, ce qui protège contre le vol de token."

---

## Slide 35 — Spring Security Config ⭐ IMPORTANT

"La classe `SecurityConfig` configure toutes les règles de sécurité.

Premier point important : mode `STATELESS` — pas de session HTTP, chaque requête doit porter son token.

Ensuite les règles d'accès.
Les routes publiques comme le login ou la lecture des produits sont autorisées à tous.
Les routes de création, modification et suppression de produits sont réservées au rôle ADMIN.
Tout le reste nécessite d'être connecté.

Et le `JwtAuthenticationFilter` intercepte chaque requête pour extraire et valider le token avant de laisser passer."

---

## Slide 36 — Stratégie de tests backend

"Pour les tests backend, j'ai utilisé JUnit 5 avec Mockito.
J'ai ciblé quatre points : les endpoints REST, les règles métier, les statuts HTTP, et les accès par rôle."

---

## Slide 37 — Stratégie de tests frontend

"Côté frontend, j'ai utilisé Vitest.
J'ai testé les hooks : les appels API mockés, la gestion des états de chargement et d'erreur, et le format des données."

---

## Slide 38 — Préparation et couverture

"J'ai priorisé les fonctionnalités critiques en premier : la création de produit et la récupération du catalogue.
J'ai couvert les cas normaux, les cas d'erreur et les cas limites.
Ici vous voyez le rapport JaCoCo — le ProductMapper atteint 97% de couverture."

---

## Slide 39 — Exemple de test

"Voici un test concret avec le pattern AAA.
Arrange : je configure Mockito pour simuler le repository.
Act : j'appelle la méthode du service.
Assert : je vérifie que le résultat est correct et que le repository a bien été appelé.
Ça permet de tester la logique métier sans base de données réelle."

---

## Slide 40 — Veille de sécurité

"Dans le cadre de ma veille, je me suis intéressé au XSS, une vulnérabilité très courante dans les applications web."

---

## Slide 41 — XSS ⭐ IMPORTANT

"Le XSS, Cross-Site Scripting, c'est une attaque qui consiste à injecter du code JavaScript malveillant dans une page web.

Par exemple, un attaquant soumet un champ avec une balise script dedans. Si l'application affiche ce contenu sans le filtrer, ce code s'exécute dans le navigateur de tous les visiteurs.
Les conséquences : vol de session, redirection vers des sites frauduleux, vol de données.

Il y a deux types principaux.
Le XSS stocké — le code malveillant est sauvegardé en base et réexécuté à chaque affichage.
Le XSS réfléchi — le code est injecté via une URL et s'exécute immédiatement.

Dans mon projet, je me protège de deux façons.
React échappe automatiquement tout ce qui est injecté dans le JSX — on ne peut pas injecter de HTML brut.
Et le token JWT est dans un cookie `httpOnly`, inaccessible au JavaScript — même si du code malveillant s'exécute, il ne peut pas voler le token d'authentification."

---

## Slide 42 — Démo

"Je vais maintenant vous faire une démonstration live.
Je vais créer un produit depuis l'interface admin et vous montrer qu'il apparaît bien dans le catalogue."

---

## Slide 43 — Conclusion

"Pour conclure, ce projet m'a permis de faire un cycle complet : du besoin réel jusqu'au déploiement en production.

Ce que je retiens : j'ai construit une application sécurisée, bien modélisée avec MERISE, et déployée.

Les difficultés principales : la modélisation MERISE avec les identifiants relatifs, la configuration Spring Security, et les cascades JPA.

Pour la suite j'aimerais ajouter des tests End-to-End, un système de refresh token, et une version mobile PWA."

---

## Slide 44 — Merci

"Merci pour votre attention. Je suis disponible pour vos questions."

---

# RÉPONSES AUX QUESTIONS DU JURY

**"Quelle est la différence entre MCD, MLD et MPD ?"**
"Le MCD c'est conceptuel — on réfléchit aux données et aux relations sans penser à la technologie.
Le MLD c'est la traduction en modèle relationnel — les entités deviennent des tables, les relations deviennent des clés étrangères.
Le MPD c'est la traduction finale en SQL pour PostgreSQL — avec les vrais types de données et les contraintes."

**"Pourquoi JWT et pas des sessions ?"**
"JWT c'est stateless — le serveur n'a rien à stocker. C'est plus adapté à une API REST, et ça facilite le déploiement."

**"Pourquoi BCrypt et pas un autre algorithme ?"**
"BCrypt est fait spécifiquement pour les mots de passe. Il est intentionnellement lent, ce qui résiste aux attaques par force brute. SHA-256 par exemple est trop rapide pour protéger des mots de passe."

**"Pourquoi le cookie httpOnly pour le JWT ?"**
"Le localStorage est accessible en JavaScript — si du code malveillant s'exécute sur la page, il peut voler le token. Un cookie httpOnly est inaccessible au JavaScript, donc même en cas d'attaque XSS, le token est protégé."

**"Pourquoi product_code comme clé primaire ?"**
"Le code produit est unique par nature et encode des informations métier. L'utiliser comme clé primaire évite une colonne id supplémentaire."

