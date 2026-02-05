# Script de Présentation CDA - Version Naturelle
## Belle Île Parfumée - BELLIL Hakim

**Durée : 30 minutes (20 min présentation + 10 min questions)**

---

## SLIDE 1 : Page de Titre
**(1 minute)**

Bonjour à tous, merci d'être là aujourd'hui.

Je m'appelle Hakim BELLIL, et aujourd'hui je vais vous présenter mon projet de fin de formation pour le titre de Concepteur Développeur d'Applications.

Mon projet s'appelle "Belle Île Parfumée". C'est une plateforme e-commerce que j'ai créée pour vendre des parfums en ligne.

Je vais vous raconter toute l'histoire de ce projet, de l'idée de départ jusqu'au déploiement final, en passant par toutes les étapes de conception et de développement.

---

## SLIDE 2 : Sommaire
**(30 secondes)**

Voici comment va se dérouler ma présentation.

D'abord, je vais vous expliquer le contexte et le problème qu'on essaie de résoudre. Ensuite, on verra qui sont les utilisateurs de l'application avec les personas. Après, je présenterai ma solution et les objectifs du projet.

On va aussi parler de toute la partie conception : les maquettes, la charte graphique, puis l'architecture technique avec les diagrammes UML.

Enfin, je vous montrerai les fonctionnalités principales, la sécurité, et je ferai une démo en direct avant de conclure.

---

## SLIDE 3 : Contexte
**(1 minute 30)**

Alors, laissez-moi vous raconter l'histoire derrière ce projet.

Belle Île Parfumée, c'est l'activité d'un auto-entrepreneur qui vend des parfums de grandes marques depuis 10 ans. On parle de Chanel, Dior, Yves Saint Laurent, toutes ces grandes marques de luxe.

Voilà comment ça fonctionne actuellement : tous les dimanches, il va chez son grossiste pour acheter du stock. Mais le problème, c'est qu'il ne sait jamais à l'avance ce qu'il va trouver, parce que ça dépend des arrivages au port du Havre le vendredi précédent.

Donc le dimanche soir, une fois qu'il sait ce qu'il a en stock, il envoie des emails un par un à tous ses clients fidèles pour leur dire "voilà ce que j'ai en ce moment". Et là, les clients lui répondent pour passer commande.

Vous imaginez bien que c'est super chronophage. Il passe son dimanche soir à envoyer des emails, gérer des fichiers Excel, mettre à jour son inventaire... Bref, c'est très manuel, très fastidieux, et ça laisse beaucoup de place aux erreurs.

---

## SLIDE 4 : Problématique
**(1 minute 30)**

Du coup, cette situation crée plusieurs gros problèmes.

Premièrement, l'inventaire manuel tous les dimanches, c'est un vrai casse-tête. Il faut compter les stocks, noter les références, les quantités, les prix...

Ensuite, la mise à jour des produits se fait un par un dans un fichier Excel. C'est long, c'est répétitif, et c'est facile de se tromper.

Les emails envoyés aux clients, pareil, c'est un copier-coller pour chaque client avec les mêmes infos. Des heures de travail répétitif.

Et tout ça génère quoi ? Beaucoup de conséquences négatives.

D'abord, une perte de temps monstre tous les dimanches soirs. L'entrepreneur ne peut rien faire d'autre.

Ensuite, les risques d'erreurs humaines. Une faute de frappe sur un prix, un stock mal compté, et boom, problème avec le client.

Les clients aussi, ils en ont marre d'attendre les emails. Parfois ils répondent trop tard et le produit qu'ils voulaient n'est plus disponible. Ils partent donc chez la concurrence qui a des boutiques en ligne.

Bref, c'est stressant pour tout le monde.

---

## SLIDE 5 : Personas
**(2 minutes)**

Pour bien comprendre les besoins, j'ai créé deux personas. Les personas, ce sont des personnages fictifs qui représentent nos vrais utilisateurs.

Premier persona : Sophie Martin, 34 ans.

Sophie, c'est une cliente fidèle depuis plusieurs années. Elle adore les parfums et elle achète régulièrement. Ce qu'elle veut, c'est simple : pouvoir acheter facilement ses parfums préférés, être au courant rapidement des nouveautés, et surtout pouvoir commander quand elle veut depuis son téléphone.

Mais aujourd'hui, elle est frustrée. Elle doit attendre les emails du dimanche soir, et des fois quand elle répond, c'est déjà en rupture de stock. C'est vraiment pénible pour elle.

Deuxième persona : Marc Dupont, 45 ans.

Marc, c'est l'entrepreneur lui-même, le vendeur, l'administrateur. Lui, ce qu'il veut, c'est gérer son stock facilement sans passer des heures dessus, gagner du temps sur toutes ces tâches répétitives, et bien sûr garder ses clients satisfaits pour qu'ils reviennent.

Ses frustrations à lui ? Les emails à envoyer tous les dimanches, un par un, c'est épuisant. Et les fichiers Excel à mettre à jour, c'est l'horreur.

Donc voilà, j'avais deux utilisateurs types avec des besoins très différents, et mon application devait répondre aux deux.

---

## SLIDE 6 : Solution
**(1 minute 30)**

Ma solution, c'est Belle Île Parfumée, une application e-commerce complète qui résout tous ces problèmes.

Pour Sophie et tous les clients comme elle :

Ils ont un catalogue en ligne accessible 24h/24, 7j/7. Plus besoin d'attendre l'email du dimanche ! Ils peuvent voir les stocks en temps réel. S'il y a 3 flacons en stock, ça s'affiche. Zéro surprise, zéro déception.

La commande se fait en quelques clics. Ajout au panier, validation, terminé. Et bien sûr, tout est responsive, ça fonctionne parfaitement sur mobile.

Pour Marc, l'administrateur :

Il a une interface de gestion centralisée. Tous ses produits au même endroit. Il peut ajouter, modifier, supprimer des produits en quelques secondes au lieu de gérer des fichiers Excel.

Fini les emails manuels ! Les clients consultent le site directement. Il peut suivre toutes les commandes en temps réel avec un tableau de bord clair.

Bref, tout le monde y gagne : les clients ont une meilleure expérience, et Marc gagne des heures de travail chaque semaine.

---

## SLIDE 7 : Objectifs
**(1 minute)**

Pour ce projet, j'avais quatre grands objectifs.

Premier objectif : automatiser au maximum. Tout ce qui était manuel et répétitif devait disparaître. Fini les emails un par un, fini les mises à jour Excel ligne par ligne.

Deuxième objectif : centraliser tout au même endroit. Les commandes, les stocks, les clients, tout dans une seule application. Comme ça, moins de risque d'erreur, et tout est synchronisé.

Troisième objectif : offrir une vraie bonne expérience utilisateur. Je voulais que l'interface soit moderne, fluide, agréable à utiliser, comme sur Amazon ou n'importe quel grand site e-commerce.

Et quatrième objectif, super important : la sécurité. On parle de données clients, de commandes, de comptes utilisateurs. Il fallait que tout soit bien protégé avec des technologies solides.

---

## SLIDE 8 : Spécifications Fonctionnelles
**(1 minute 30)**

Maintenant, qu'est-ce que l'application fait concrètement ?

Côté client, on a plusieurs fonctionnalités :

La consultation du catalogue avec tous les parfums disponibles. Une barre de recherche pour trouver un produit par nom ou par marque. Des filtres pour afficher uniquement les parfums homme, femme ou mixte, ou filtrer par type comme eau de parfum ou eau de toilette.

Le panier, évidemment, avec la possibilité d'ajouter, modifier, supprimer des articles. Et un système de compte : inscription, connexion, pour sauvegarder les infos et passer commande.

Côté administration, Marc a accès à tout un panel de gestion :

Le CRUD complet des produits. CRUD, ça veut dire Create, Read, Update, Delete. Donc créer un produit, l'afficher, le modifier, le supprimer.

La gestion des stocks avec mise à jour des quantités. La liste des clients inscrits. Le suivi de toutes les commandes avec leurs statuts. Et un tableau de bord qui donne une vue d'ensemble de l'activité.

---

## SLIDE 9 : Charte Graphique
**(1 minute)**

Pour le design, j'ai voulu quelque chose d'élégant et épuré, qui colle avec l'univers du parfum de luxe.

J'ai choisi une palette de couleurs minimaliste : du noir, du blanc, du gris clair pour les fonds, du gris moyen pour les textes secondaires. Très sobre, très chic. Ça met en valeur les photos des parfums qui sont colorées elles.

Pour la typographie, j'utilise Inter de Google Fonts. C'est une police moderne, très lisible sur tous les écrans. Les titres sont gros et en gras pour attirer l'œil, le texte normal est en 16 pixels pour être confortable à lire.

Les boutons, les cartes produits, tout suit cette logique : angles droits, ombres légères pour créer de la profondeur, et un style cohérent partout dans l'application.

---

## SLIDE 10 : Zoning
**(1 minute)**

Avant de commencer le développement, j'ai fait ce qu'on appelle du zoning.

Le zoning, c'est comme un plan d'architecte. On définit les grandes zones de l'interface sans se soucier des détails visuels. Juste des rectangles avec "ici il y a le header", "là il y a le contenu principal", "en bas le footer".

Ça permet de valider la structure de base avant d'investir du temps dans le design détaillé. C'est une étape rapide mais super utile pour poser les fondations.

---

## SLIDE 11 : Wireframes
**(1 minute)**

Après le zoning, j'ai créé les wireframes, aussi appelés maquettes fil de fer.

Les wireframes, c'est du noir et blanc, très simple. On place tous les éléments : les boutons ici, le texte là, les images à tel endroit. Mais sans couleurs, sans images réelles, sans fioritures.

Pourquoi faire ça ? Parce que ça permet de tester les parcours utilisateur. Est-ce que le bouton est au bon endroit ? Est-ce que la navigation est logique ? On peut faire des modifications rapidement sans refaire tout le design.

Une fois que c'est validé, on passe aux maquettes haute fidélité.

---

## SLIDE 12 : Maquettes
**(1 minute)**

Les maquettes haute fidélité, c'est le design final.

Là, j'ai appliqué la charte graphique : les vraies couleurs, la vraie typo, les vraies images de produits. J'ai aussi ajouté les états interactifs : quand on survole un bouton, quand on clique, etc.

Ces maquettes ont servi de référence pour l'intégration. Quand j'ai développé le frontend en React, j'avais le visuel exact à reproduire.

Cette progression - zoning, wireframes, maquettes - c'est une méthode itérative. À chaque étape, on valide, on ajuste, et on passe à la suivante. Ça évite de refaire tout le travail si quelque chose ne va pas.

---

## SLIDE 13 : Arborescence
**(1 minute)**

Voici l'arborescence du site, c'est-à-dire toutes les pages et comment elles sont reliées entre elles.

En rouge, la page d'accueil. C'est le point d'entrée pour tous les visiteurs.

En bleu, les pages publiques accessibles à tout le monde : le catalogue, les catégories de produits, les fiches détail de chaque parfum.

En vert, les pages d'authentification : la connexion et l'inscription.

En violet, l'espace client protégé. Il faut être connecté pour y accéder : le panier, le checkout pour valider la commande, la confirmation, l'espace mon compte, l'historique des commandes.

Et en jaune, l'espace administration réservé à Marc : le dashboard, la gestion des produits, des commandes et des clients.

Cette vue permet de bien visualiser tous les chemins possibles dans l'application.

---

## SLIDE 14 : Stack Technique
**(2 minutes)**

Passons aux technologies que j'ai utilisées.

Côté frontend, j'ai choisi React 19 avec TypeScript.

React, c'est une bibliothèque JavaScript créée par Facebook pour construire des interfaces utilisateur basées sur des composants. C'est comme des briques Lego réutilisables. Un bouton, c'est un composant. Une carte produit, c'est un composant. Et on assemble tout ça.

TypeScript, c'est du JavaScript avec du typage. Ça veut dire qu'on définit le type de chaque variable : nombre, texte, etc. Ça permet de détecter les erreurs avant même de lancer l'application.

Pour l'outil de build, j'utilise Vite, qui est ultra rapide. Quand je modifie mon code, la page se recharge en moins d'une seconde. C'est ce qu'on appelle le Hot Module Replacement.

React Router pour naviguer entre les pages, Axios pour communiquer avec le backend, et Context API pour gérer l'état global comme le panier.

Côté backend, j'ai choisi Spring Boot 3 avec Java 21.

Spring Boot, c'est un framework Java super populaire en entreprise. Il simplifie énormément le développement avec le principe "convention over configuration" : moins de configuration, plus de code métier.

Spring Security gère toute la sécurité avec du JWT pour l'authentification. Spring Data JPA, c'est l'ORM qui permet de manipuler la base de données comme si c'était des objets Java, sans écrire de SQL.

Et PostgreSQL comme base de données, parce que c'est robuste, performant, et très utilisé en entreprise.

---

## SLIDE 15 : Architecture 3-Tiers
**(2 minutes)**

Voici l'architecture globale de l'application.

J'ai implémenté ce qu'on appelle une architecture 3-tiers. "Tiers" ça veut dire "couche" en français. Donc 3 couches bien séparées.

Première couche : la couche Présentation, c'est le frontend.

C'est React qui tourne dans le navigateur du client. L'utilisateur voit cette interface, clique sur les boutons, remplit les formulaires. Cette couche communique avec le backend via HTTPS, donc de manière sécurisée.

Deuxième couche : la couche Métier, c'est le backend.

C'est le cerveau de l'application. Spring Boot gère toute la logique métier : vérifier le stock, calculer les prix, valider les commandes, gérer la sécurité. Il expose une API REST, c'est-à-dire des points d'entrée HTTP qui renvoient du JSON.

Troisième couche : la couche Données, c'est PostgreSQL.

La base de données stocke tout : les produits, les clients, les commandes. Le backend communique avec elle via JPA et JDBC.

Il y a aussi un service externe : Gmail SMTP pour envoyer les emails de confirmation.

Pourquoi cette architecture ? Parce qu'elle offre plein d'avantages. Chaque couche a une responsabilité claire. On peut faire évoluer une couche sans casser les autres. C'est scalable : on peut ajouter plusieurs serveurs backend si besoin. Et c'est facilement testable.

---

## SLIDE 16 : Modèle de Données
**(1 minute)**

Le modèle de données, ce sont les entités qui représentent les objets métier.

J'ai 5 entités principales :

Account : ça gère l'authentification. L'email, le mot de passe hashé, et le rôle : soit CLIENT soit ADMIN.

Client : c'est un utilisateur avec son nom, prénom, numéro de téléphone.

Product : un parfum avec son code unique, son nom, sa marque, son prix.

Order : une commande avec un numéro, une date et un statut comme PENDING ou COMPLETED.

OrderLine : une ligne de commande qui dit "dans cette commande, il y a X quantités de tel produit à tel prix unitaire".

Ces entités correspondent à des tables dans PostgreSQL, et Spring JPA fait le lien automatiquement.

---

## SLIDE 17 : Diagramme de Classes
**(2 minutes 30)**

Voici le diagramme de classes UML qui modélise tout ça.

En UML, on représente chaque classe avec un rectangle divisé en trois parties : le nom de la classe, les attributs, et les méthodes.

Les relations entre classes utilisent des symboles différents.

Le losange vide, c'est une agrégation. C'est une relation faible. Par exemple, Client agrège Account : un compte peut exister sans client, et inversement. Ce sont des vies indépendantes.

Le losange plein, c'est une composition. C'est une relation forte. Par exemple, Order compose OrderLine : si je supprime une commande, toutes ses lignes sont supprimées aussi. Une OrderLine ne peut pas exister sans son Order parent.

Les cardinalités, ces petits chiffres, indiquent combien d'instances on peut avoir.

Un Client peut avoir 0 à plusieurs commandes. Notation : 0..* qui se lit "zéro à plusieurs".

Une Order contient au moins une OrderLine. Notation : 1..* qui se lit "un à plusieurs".

Un Client a 0 ou 1 Account. Notation : 0..1.

C'est important de bien comprendre ces relations parce que ça structure toute la base de données.

---

## SLIDE 18 : Fonctionnalité Panier
**(1 minute 30)**

La gestion du panier, c'est une des fonctionnalités les plus importantes d'un site e-commerce.

J'ai implémenté un système intelligent avec deux modes.

Premier mode : l'utilisateur n'est pas connecté.

Dans ce cas, le panier est stocké dans le localStorage du navigateur. C'est un espace de stockage local. Même si l'utilisateur ferme son navigateur et revient plus tard, son panier est toujours là.

Deuxième mode : l'utilisateur est connecté.

Là, le panier est stocké en base de données sous forme d'une commande avec le statut PENDING, "en attente". L'avantage ? Si l'utilisateur se connecte depuis un autre appareil, il retrouve son panier. C'est synchronisé.

Et le plus malin : à la connexion, on fait une fusion automatique.

Imaginons : Sophie a ajouté 2 parfums dans son panier en mode non connecté. Elle se connecte. Elle avait déjà 3 parfums dans son panier serveur d'une visite précédente. On fusionne tout : elle se retrouve avec ses 5 parfums. Rien n'est perdu.

On vérifie aussi le stock en temps réel avant la validation. Et à la fin, un email de confirmation part automatiquement.

---

## SLIDE 19 : Diagramme de Séquence
**(2 minutes)**

Le diagramme de séquence montre les interactions entre les différents composants dans le temps.

J'ai modélisé le cas "Ajouter un produit au panier".

On lit un diagramme de séquence de haut en bas. Le temps s'écoule vers le bas.

Les acteurs sont représentés en haut : le Client, React (le frontend), le Controller REST, le Service métier, le Repository, et la base de données PostgreSQL.

Voici le déroulement :

1. Le client clique sur "Ajouter au panier".

2. React envoie une requête HTTP POST à l'endpoint `/api/orders/cart/items` avec le code du produit et la quantité.

3. Le Controller reçoit la requête et la transmet au Service métier.

4. Le Service vérifie d'abord si le produit existe et s'il y a assez de stock. Pour ça, il interroge le Repository.

5. Le Repository fait un SELECT en base de données pour récupérer le produit.

Ensuite, on a une alternative représentée par le bloc "alt" :

Si le stock est suffisant : on récupère ou crée le panier PENDING, on ajoute la ligne avec le produit et la quantité, on sauvegarde, et on renvoie un code HTTP 200 OK avec le contenu du panier.

Si le stock est insuffisant : on lève une exception et on renvoie un code HTTP 400 Bad Request avec un message d'erreur.

Ce diagramme illustre bien l'architecture en couches et le pattern MVC : Model-View-Controller.

---

## SLIDE 20 : Sécurité
**(2 minutes)**

La sécurité, c'est vraiment critique pour un site e-commerce.

Pour l'authentification, j'utilise JWT - JSON Web Token.

Le JWT, c'est un standard ouvert pour l'authentification sans état, "stateless". Concrètement, c'est un token qui contient trois parties encodées en Base64 :

Le header qui indique l'algorithme de signature.

Le payload qui contient les données utilisateur : l'email, le rôle, la date d'expiration.

Et la signature qui garantit que le token n'a pas été modifié.

Quand un utilisateur se connecte, le serveur génère un JWT et le renvoie. Ensuite, à chaque requête, le client envoie ce token dans les headers. Le serveur vérifie la signature et extrait les infos. Pas besoin de session en mémoire, tout est dans le token.

Les mots de passe, bien sûr, ne sont jamais stockés en clair. Ils sont hashés avec BCrypt, un algorithme très sécurisé qui inclut un salt aléatoire. Ça rend les attaques par dictionnaire ou rainbow table inefficaces.

Pour l'autorisation, j'utilise un système de rôles.

Deux rôles : CLIENT et ADMIN.

Un CLIENT peut consulter le catalogue, passer commande, gérer son compte. Un ADMIN a tous ces droits plus la gestion des produits, des commandes et des clients.

Côté frontend, les routes sont protégées avec un composant PrivateRoute. Côté backend, avec l'annotation @PreAuthorize sur les méthodes sensibles.

Et j'ai configuré CORS pour n'autoriser que mon domaine frontend à appeler l'API. Ça bloque les appels depuis d'autres sites.

---

## SLIDE 21 : Code Produit
**(1 minute)**

J'ai mis en place un système automatique de génération de code produit.

Le format est XXX-TTT-MMM-YYYY.

XXX, c'est 3 lettres pour la marque. Par exemple CHA pour Chanel, DIO pour Dior, YSL pour Yves Saint Laurent.

TTT, c'est le type de concentration. EDP pour Eau de Parfum, EDT pour Eau de Toilette, EXT pour Extrait.

MMM, c'est la taille en millilitres. 050 pour 50ml, 100 pour 100ml, 030 pour 30ml.

YYYY, c'est un numéro séquentiel à 4 chiffres pour différencier les variantes.

Exemple : CHA-EDP-100-0001, c'est le premier Chanel Eau de Parfum 100ml enregistré dans la base.

Ce système permet d'identifier rapidement un produit et d'organiser logiquement le catalogue.

---

## SLIDE 22 : Démonstration
**(5 minutes)**

Maintenant, je vais vous montrer l'application en direct.

*[Ouvrir le navigateur]*

Voici la page d'accueil. Vous voyez le header avec le logo, le menu de navigation, l'icône du panier et celle du compte. C'est responsive, ça s'adapte parfaitement au mobile.

Je clique sur "Catalogue". Voilà tous les parfums disponibles avec leurs photos, leurs noms, leurs prix. Je peux filtrer par catégorie, par genre. Les résultats se mettent à jour instantanément.

Je clique sur un parfum pour voir le détail. On a la description complète, le stock disponible, le prix, et un sélecteur de quantité. Je choisis une quantité et j'ajoute au panier. Le badge du panier se met à jour.

Je vais dans mon panier. Je vois mes articles, je peux modifier les quantités, supprimer un produit. Le total se recalcule automatiquement.

Maintenant, je me connecte avec un compte. Le JWT est généré et stocké. Si j'avais des articles dans mon panier local, ils seraient fusionnés avec mon panier serveur.

Je valide ma commande. Le système vérifie le stock en temps réel, décrémente les quantités, change le statut de la commande en COMPLETED, et m'envoie un email de confirmation.

*[Si temps : montrer les DevTools avec les requêtes API qui partent en POST/GET]*

Voilà pour la partie client.

---

## SLIDE 23 : Conclusion
**(1 minute 30)**

Pour conclure ce projet.

Qu'est-ce que j'ai réalisé ?

Un frontend React 19 moderne et responsive qui fonctionne parfaitement sur tous les écrans. Un backend Spring Boot 3 robuste et sécurisé qui gère toute la logique métier. Une base de données PostgreSQL bien structurée. Une sécurité complète avec JWT et BCrypt. Et un code propre, organisé et documenté.

Les quatre objectifs initiaux sont atteints : automatisation, centralisation, amélioration de l'expérience utilisateur, et sécurisation.

Si je devais aller plus loin, voici quelques évolutions possibles :

Intégrer un vrai paiement en ligne avec Stripe ou PayPal. Ajouter des tests end-to-end automatisés avec Cypress pour tester les parcours utilisateurs complets. Mettre en place une CI/CD avec GitHub Actions pour déployer automatiquement à chaque commit. Transformer l'application en PWA, Progressive Web App, pour qu'elle soit installable comme une app native. Ou même développer une vraie application mobile avec React Native.

Voilà, ce projet m'a permis de mettre en pratique toutes les compétences du référentiel CDA : conception UML, développement frontend et backend, gestion de base de données, sécurité, déploiement.

---

## SLIDE 24 : Questions
**(Variable)**

Merci beaucoup pour votre attention.

Je suis maintenant disponible pour répondre à toutes vos questions.

---

# RÉPONSES AUX QUESTIONS FRÉQUENTES

*(Même format naturel pour les réponses)*

**Pourquoi une architecture 3-tiers ?**

Alors, l'architecture 3-tiers, c'est un classique mais c'est solide. Ça sépare proprement les responsabilités : l'interface utilisateur d'un côté, la logique métier au milieu, et les données de l'autre.

L'avantage, c'est que si demain je veux refaire le design du frontend, je touche pas au backend. Si je veux changer de base de données, ça impacte pas l'interface. C'est modulaire.

Et niveau scalabilité, je peux ajouter plusieurs instances du backend derrière un load balancer si le trafic augmente. Chaque couche peut évoluer indépendamment.

**JWT vs sessions classiques ?**

Le JWT, c'est stateless. Ça veut dire que le serveur ne garde rien en mémoire. Tout est dans le token que le client envoie. C'est super pour scaler : je peux ajouter 10 serveurs backend, n'importe lequel peut traiter la requête puisque toutes les infos sont dans le token.

Avec les sessions classiques, il faut stocker les sessions en mémoire ou dans Redis, et les synchroniser entre serveurs. C'est plus complexe. Le JWT, c'est plus simple et plus adapté aux architectures modernes.

**Comment fonctionne BCrypt ?**

BCrypt, c'est un algorithme de hashage adaptatif. Quand je hashe un mot de passe, BCrypt génère automatiquement un salt aléatoire qu'il ajoute au mot de passe avant de le hasher. Le salt est unique pour chaque mot de passe.

Et il y a un "cost factor" qui détermine combien de fois l'algorithme va itérer. Plus c'est élevé, plus c'est long à calculer, ce qui ralentit les attaques par force brute. C'est fait pour être volontairement lent.

*(Continuez de cette façon pour les autres questions...)*

---

**Bonne chance pour votre soutenance ! 🍀**