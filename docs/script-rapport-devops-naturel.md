# Script Présentation - Rapport DevOps Belle Île Parfumée
## BELLIL Hakim - Version Naturelle

**Durée : 10 minutes (présentation) + 10 minutes (démo + questions)**

---

## SLIDE 1 : Couverture
**(20 secondes)**

Bonjour à tous.

Je m'appelle Hakim BELLIL, et aujourd'hui je vais vous présenter le volet DevOps de mon projet Belle Île Parfumée.

C'est mon projet chef-d'œuvre pour la certification DevOps, où j'ai mis en œuvre toute la chaîne DevOps du développement au déploiement.

---

## SLIDE 2 : Sommaire
**(20 secondes)**

Ma présentation se déroule en 5 parties : projet et contexte, stack technique et versionnement, pipeline CI/CD avec Docker, déploiement, et bilan.

---

## SLIDE 3 : Introduction
**(40 secondes)**

Belle Île Parfumée, c'est une plateforme e-commerce de vente de parfums haut de gamme que j'ai développée dans le cadre de ma formation.

L'objectif principal était de mettre en œuvre l'ensemble de la chaîne DevOps, du développement jusqu'au déploiement en production. Pas juste faire une appli qui marche, mais faire une appli déployée proprement avec toutes les bonnes pratiques.

Les résultats sont concrets.

Une architecture 3-tiers fonctionnelle avec React, Spring Boot et PostgreSQL. Des tests unitaires automatisés pour garantir la qualité. Un pipeline CI/CD complet avec GitHub Actions qui build et teste automatiquement. Une conteneurisation complète avec Docker pour garantir que ça tourne pareil partout. Et un déploiement continu sur Render avec certificats SSL.

---

## SLIDE 4 : Présentation du projet
**(1 minute)**

Le projet répond à deux problématiques.

Pour les clients : la difficulté de trouver des parfums avec des informations détaillées sur les notes, les concentrations, les stocks disponibles. Aujourd'hui, il faut appeler, envoyer des emails, attendre. C'est pénible.

Pour les vendeurs : l'absence d'un outil centralisé pour gérer leur catalogue et leurs commandes. Tout se fait avec des fichiers Excel et des emails manuels. C'est chronophage et source d'erreurs.

Ma solution propose deux interfaces.

Pour les clients : consultation du catalogue en temps réel, filtrage par genre homme/femme/mixte, un panier d'achat intelligent, et une authentification sécurisée. Tout ça accessible 24h/24 depuis leur mobile.

Pour les administrateurs : la gestion complète des produits avec création, modification, suppression. La gestion des clients inscrits. Et le suivi des commandes avec changement de statuts.

---

## SLIDE 5 : Architecture 3-tiers
**(40 secondes)**

L'application repose sur une architecture 3-tiers : la couche Présentation avec React 19 et TypeScript pour l'interface utilisateur, la couche Métier avec Spring Boot et Java 21 qui contient toute la logique métier et expose une API REST, et la couche Données avec PostgreSQL pour stocker les informations.

Cette séparation facilite la maintenance, permet d'évoluer chaque couche indépendamment, et renforce la sécurité.

---

## SLIDE 6 : Stack technique
**(40 secondes)**

Voici les technologies que j'ai utilisées.

Côté backend : Java 21, la dernière version LTS. Spring Boot 3 pour le framework. Spring Security pour l'authentification JWT. Spring Data JPA pour communiquer avec la base de données sans écrire de SQL.

Côté frontend : React 19 avec TypeScript pour le typage et détecter les erreurs tôt. Vite comme outil de build, ultra rapide en développement. Axios pour faire les appels API. Context API pour gérer l'état global du panier et de l'authentification.

Pour la base de données : PostgreSQL 15, robuste et performant.

Et pour le DevOps : Git et GitHub pour le versionnement. GitHub Actions pour la CI/CD. Docker pour la conteneurisation.

J'ai choisi une architecture monolithique parce que c'est adapté à la taille du projet, plus simple à développer seul, et plus facile à déployer.

---

## SLIDE 7 : Versionnement Git
**(40 secondes)**

Pour le versionnement, j'utilise Git avec GitHub Flow. La branche main est stable et déployée en production. Les branches feature pour les nouvelles fonctionnalités, les branches fix pour les bugs.

J'ai adopté les Conventional Commits avec des préfixes : feat, fix, docs, refactor, test. Exemple : "feat: add JWT authentication".

Ça donne un historique Git clair et facilite le travail collaboratif.

---

## SLIDE 8 : Tests
**(40 secondes)**

Côté backend, j'utilise JUnit 5 avec Mockito pour les tests unitaires. Je teste la logique métier en mockant les dépendances. Pattern AAA : Arrange, Act, Assert.

Côté frontend, Vitest avec React Testing Library.

L'objectif : bonne couverture sur la logique critique.

---

## SLIDE 9 : Pipeline CI/CD
**(40 secondes)**

Pipeline CI/CD avec GitHub Actions. À chaque push sur main ou Pull Request, le pipeline se déclenche automatiquement : checkout du code, build backend avec Maven, exécution des tests, build frontend avec npm.

Si tout passe au vert, le code est prêt à être déployé. Sinon, notification immédiate.

C'est l'intégration continue.

---

## SLIDE 10 : Docker
**(40 secondes)**

Conteneurisation avec Docker. Docker package l'application avec ses dépendances. Comportement identique partout : local, staging, production.

Multi-stage build pour le backend : compilation avec Maven, puis copie du JAR dans une image légère. Image finale : 200 Mo au lieu de 800 Mo.

Docker Compose orchestre les 3 services : PostgreSQL, backend, frontend. Une commande "docker compose up" et tout se lance.

---

## SLIDE 11 : Déploiement Render
**(40 secondes)**

Déploiement sur Render.com, une plateforme PaaS. Trois services : backend via Docker, frontend en site statique, base PostgreSQL managée.

Déploiement automatique : à chaque push sur main, Render redéploie automatiquement. C'est de la livraison continue.

Certificats SSL automatiques. Sécurité par défaut.

---

## SLIDE 12 : Problèmes rencontrés
**(40 secondes)**

Deux problèmes techniques rencontrés.

CORS : le frontend ne pouvait pas appeler le backend. Solution : ajouter l'URL Render dans la config CORS Spring.

Routing React : erreur 404 au refresh. Solution : fichier "_redirects" pour rediriger vers index.html.

---

## SLIDE 13 : Veille technologique
**(30 secondes)**

Veille essentielle pour choisir la plateforme de déploiement. Comparaison : Render, Railway, Fly.io, Heroku.

Choix de Render : gratuit, Docker natif, SSL auto, interface simple.

---

## SLIDE 14 : Compétences acquises
**(20 secondes)**

C1 Versionnement Git, C2 Tests et qualité, C3 Intégration continue, C4 Livraison continue, C5 Architecture Docker, C6 Veille technologique.

---

## SLIDE 15 : Améliorations
**(20 secondes)**

Améliorations possibles : tests E2E avec Cypress, SonarCloud pour la qualité, monitoring avec Prometheus/Grafana, paiement Stripe, notifications email, avis clients.

---

## SLIDE 16 : Conclusion
**(20 secondes)**

Projet complet avec toutes les compétences DevOps : versionnement, tests, CI/CD, Docker, déploiement continu. Expérience concrète et professionnelle.

---

## SLIDE 17 : Merci
**(10 secondes)**

Merci pour votre attention.

Je vais maintenant vous faire une démonstration de l'application et du workflow DevOps.

---

**Fin de la présentation - Début de la démo**