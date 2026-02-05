# Script Présentation - Étude de Cas DevOps World News
## BELLIL Hakim - Version Naturelle

**Durée : 25 minutes maximum**

---

## SLIDE 1 : Couverture
**(30 secondes)**

Bonjour à tous.

Je m'appelle Hakim BELLIL, et aujourd'hui je vais vous présenter mon étude de cas DevOps sur la transformation de l'entreprise World News.

C'est une étude sur comment accompagner une équipe dans l'adoption des méthodes DevOps, de A à Z.

---

## SLIDE 2 : Sommaire
**(30 secondes)**

Voici comment on va procéder.

D'abord, je vais analyser la situation de départ chez World News pour comprendre leurs problèmes. Ensuite, on verra les objectifs qu'ils doivent atteindre. Puis je présenterai mes recommandations organisationnelles et la chaîne d'outils CI/CD à mettre en place.

On parlera aussi de la conduite du changement, du plan de transformation sur 12 mois, et je finirai par une conclusion.

---

## SLIDE 3 : Analyse de la situation
**(2 minutes 30)**

Alors, qui est World News ?

C'est une entreprise internationale leader dans la presse papier et numérique. Ils gèrent plusieurs plateformes : un système d'abonnements, des portails d'actualités en ligne, des outils d'analyse d'audience. Bref, des applications critiques pour leur business.

Le problème, c'est que tout ça a été construit avec des systèmes monolithiques. C'était robuste au départ, mais aujourd'hui c'est devenu un cauchemar à maintenir et à faire évoluer.

Et voilà les gros freins qu'ils rencontrent :

Le time-to-market est catastrophique. Ils ne livrent que tous les 3 à 4 mois, alors qu'ils travaillent en agilité depuis 3 ans ! Quelque chose ne va pas.

La qualité est discutable : des incidents récurrents en production, des bugs fréquents. Les utilisateurs finaux en ont marre.

Et le pire, c'est l'organisation en silos. Les équipes Dev et Ops sont dans deux départements complètement séparés. Ils ne se parlent pas, ils n'ont pas les mêmes objectifs. C'est la guerre froide en interne.

Résultat : la direction voit que malgré l'agilité, ça se dégrade. La capacité de livraison baisse, les tensions montent, l'efficacité chute.

---

## SLIDE 4 : Organisation en silos
**(1 minute 30)**

Le constat majeur, c'est vraiment cette organisation en silos.

D'un côté, vous avez l'équipe Dev qui veut de la vélocité. Leur objectif : livrer un maximum de fonctionnalités, vite.

De l'autre, l'équipe Ops qui veut de la stabilité. Leur objectif : que rien ne plante en production.

Ces objectifs sont complètement divergents ! Ça crée des conflits au lieu de créer de la valeur pour l'utilisateur.

Et ça génère des freins organisationnels concrets :

Pas d'équipe transverse pour faciliter la collaboration. Chacun dans son coin.

Un faible partage de connaissances. Les Dev ne comprennent rien à l'infra, les Ops ne connaissent pas le code.

Une résistance au changement énorme, parce que tout le monde a peur de perdre son territoire.

Et une culture du blâme. Quand ça plante, on cherche le coupable au lieu de chercher la solution. C'est toxique.

---

## SLIDE 5 : Freins techniques
**(1 minute 30)**

Aux problèmes humains s'ajoutent des problèmes techniques.

Niveau conception, les applications monolithiques sont devenues des monstres. Impossible de les faire évoluer sans tout casser. L'intégration se fait manuellement, c'est non itératif, et évidemment c'est bourré d'erreurs humaines.

Côté Ops, c'est pire. Les déploiements se font manuellement la nuit ou le week-end. Vous imaginez le stress ? Il y a quasiment pas d'automatisation. Pas de dashboards pour surveiller. Les logs sont difficiles d'accès. Quand il y a un incident, ça prend des heures à diagnostiquer.

Les répercussions sont énormes.

Les Product Owners trouvent la vélocité trop faible. Les développeurs ne connaissent rien aux outils de production. Les Ops découvrent les changements au moment du déploiement, aucune anticipation.

Résultat : des délais élevés, des bugs en production, des clients mécontents.

---

## SLIDE 6 : 4 enjeux majeurs
**(1 minute)**

Tout ça se traduit par 4 enjeux majeurs pour World News.

Premier enjeu : le time-to-market. Des livraisons tous les 3-4 mois, c'est impossible de réagir aux besoins du marché. Perte de compétitivité directe.

Deuxième enjeu : la qualité. Les bugs récurrents dégradent l'expérience utilisateur. Les clients perdent confiance.

Troisième enjeu : les coûts. Tous ces processus manuels mobilisent des ressources sur des tâches à faible valeur ajoutée. Perte de productivité massive.

Quatrième enjeu : l'aspect humain. Cette culture cloisonnée et ces déploiements nocturnes stressants, ça cause du turnover et de la démotivation dans les équipes.

---

## SLIDE 7 : Objectifs cibles
**(2 minutes 30)**

Bon, maintenant qu'on a compris les problèmes, quels sont les objectifs ?

Premier objectif : une réorganisation humaine et culturelle complète.

On va créer des équipes produit ciblées, structurées autour de la valeur qu'on apporte au client. On appelle ça le "Value Stream". Chaque équipe aura tous les profils nécessaires : Dev, Ops, QA. Comme ça, elles sont autonomes de bout en bout.

On va instaurer une culture de co-responsabilité. Fini le "je développe, tu déploies, c'est ton problème". Maintenant c'est "on construit ensemble, on déploie ensemble, on assure ensemble". Responsabilité partagée sur tout le cycle de vie.

Et on va créer une équipe Plateforme transverse. Leur mission : fournir les outils, les plateformes et l'expertise pour que toutes les équipes produit soient autonomes. Ils construisent les pipelines CI/CD, maintiennent l'infrastructure, forment les autres.

Deuxième objectif : l'amélioration continue. On apprend de nos erreurs, on fait des rétrospectives, on partage la connaissance, on s'améliore en permanence.

---

## SLIDE 8 : Objectifs techniques
**(1 minute 30)**

Les objectifs techniques sont tout aussi importants.

D'abord, automatiser toute la chaîne CI/CD. Des pipelines qui couvrent la compilation, les tests, l'analyse de qualité, le déploiement. Des déploiements fréquents, fiables, et surtout sans stress.

Ensuite, adopter l'Infrastructure as Code. On gère toute l'infrastructure via des fichiers versionnés dans Git. Cohérence garantie, reproductibilité totale.

Puis, un passage progressif aux microservices. On ne va pas tout casser d'un coup, mais on découple progressivement le monolithe. Les nouvelles fonctionnalités, on les développe en services indépendants.

Et enfin, une vraie plateforme d'observabilité. Des métriques en temps réel, des logs centralisés, du tracing distribué. On passe d'une approche réactive à une approche proactive.

---

## SLIDE 9 : Préconisations organisationnelles
**(1 minute 30)**

Pour y arriver, il faut créer de nouveaux métiers.

L'Ingénieur DevOps : il construit et maintient tous les outils CI/CD et l'Infrastructure as Code. C'est lui qui permet l'autonomie des équipes produit.

Le SRE - Site Reliability Engineer : il est responsable de la fiabilité et des performances en production. Il définit les SLO, les Service Level Objectives, et il s'assure qu'on les tient.

Le QA Engineer : il met en place toute la stratégie de tests automatisés intégrée aux pipelines. Plus de tests manuels à la dernière minute.

Les rôles existants évoluent aussi.

Le Product Owner doit maintenant intégrer les contraintes techniques dans ses décisions. Il collabore avec DevOps sur les critères de déploiement.

Le Scrum Master facilite l'adoption des pratiques DevOps, anime les post-mortems, et intègre l'automatisation dans la Definition of Done.

---

## SLIDE 10 : Chaîne d'outils CI/CD
**(2 minutes 30)**

Maintenant, les outils concrets.

Je recommande une chaîne complète : Git, CI/CD, Qualité, Container, Orchestration, Monitoring.

Pour la gestion du code source : Git avec GitLab. C'est le standard mondial, et GitLab intègre tout : le SCM, les pipelines CI/CD, le registre de conteneurs. On simplifie l'adoption.

Pour le CI/CD : GitLab CI. On définit les pipelines dans un simple fichier YAML versionné. L'automatisation devient visible, accessible à tous les développeurs. Plus de magie noire.

Pour la qualité du code : SonarQube. Il s'intègre au pipeline, analyse le code à chaque modification, et fournit des métriques claires sur la dette technique et les vulnérabilités. Avec le Quality Gate, on peut bloquer automatiquement une livraison si la qualité n'est pas au rendez-vous.

---

## SLIDE 11 : Chaîne CI/CD (suite)
**(1 minute 30)**

Pour la conteneurisation : Docker et Kubernetes.

Docker package l'application avec toutes ses dépendances dans une image portable. Comportement identique partout : en local, en staging, en production. Fini les "ça marche chez moi".

Kubernetes est l'orchestrateur leader. Il gère les conteneurs à grande échelle, offre de la résilience, de la scalabilité horizontale automatique, et optimise l'utilisation des ressources.

Pour l'Infrastructure as Code : Terraform et Ansible en complémentarité.

Terraform pour le provisioning : créer les serveurs, les réseaux, les bases de données. Agnostique du cloud, on peut gérer du AWS, Azure, GCP avec les mêmes outils.

Ansible pour la configuration : installer les logiciels, gérer les fichiers de config. Ensemble, ils rendent l'infrastructure complètement reproductible et versionnable dans Git.

Pour l'observabilité : la pile Prometheus, Grafana, Loki, Jaeger. C'est open-source et c'est un standard de l'industrie. Prometheus collecte les métriques, Grafana crée les dashboards, Loki centralise les logs, Jaeger permet le tracing distribué.

---

## SLIDE 12 : Acculturation
**(1 minute 30)**

L'acculturation, c'est crucial. On peut avoir les meilleurs outils du monde, si les gens ne suivent pas, ça ne marchera jamais.

Comment on embarque les équipes ?

Avec des rituels collaboratifs. Des post-mortems sans blâme où on apprend de nos erreurs ensemble. Des revues de code systématiques pour partager la connaissance. Des démos croisées où les équipes se montrent ce qu'elles font.

Avec des communautés de pratique. Des groupes transverses par thématique : CI/CD, testing, monitoring. Les gens partagent leurs succès, leurs difficultés, ils organisent des ateliers. C'est de l'apprentissage horizontal.

Et avec un projet pilote. On choisit une application non critique mais visible. On prend une équipe volontaire, motivée. On applique toutes les pratiques DevOps sur ce périmètre. Et quand ça marche, ce succès devient le modèle pour convaincre les autres équipes.

---

## SLIDE 13 : Gestion des résistances
**(1 minute 30)**

Il va y avoir des résistances, c'est normal. Il faut les anticiper.

Les Ops vont avoir peur d'être remis en question. "Je vais perdre mon job ?" Non. On leur propose un plan de formation pour évoluer vers des rôles SRE ou Platform Engineer, qui sont valorisants et recherchés.

Les Dev vont craindre une surcharge de travail. "En plus de développer, je dois gérer l'infra ?" On intègre le temps d'apprentissage directement dans les sprints. Et le projet pilote leur prouvera que ça fait gagner du temps au final.

Le management va être sceptique. "Encore un buzzword à la mode ?" On les implique dès le début. On leur donne une visibilité totale sur les indicateurs avec les métriques DORA : fréquence des déploiements, temps de résolution, taux d'échec. Les chiffres parlent d'eux-mêmes.

---

## SLIDE 14 : Plan de transformation
**(2 minutes 30)**

Le plan de transformation, c'est 12 mois en 3 phases.

Phase 1 - Fondations, de 0 à 3 mois.

On structure l'utilisation de Git avec les bonnes pratiques : gestion des branches, pull requests obligatoires, revues de code. On met en place GitLab CI pour automatiser l'intégration continue. On forme les équipes Dev et Ops à ces nouvelles pratiques. Et on constitue l'équipe pilote de 5 à 8 personnes mixtes.

Objectif : obtenir des quick wins visibles et mesurables pour prouver la valeur.

Phase 2 - Automatisation, de 3 à 6 mois.

On conteneurise progressivement les applications avec Docker. On automatise les déploiements sur l'environnement de staging via le pipeline. On intègre SonarQube pour analyser la qualité et la sécurité du code. On étend les pratiques à 2-3 équipes supplémentaires. On instaure les rituels : stand-ups, rétrospectives, post-mortems.

Objectif : disposer d'un pipeline CI/CD fonctionnel de bout en bout, du commit à l'environnement de test.

Phase 3 - Industrialisation, de 6 à 12 mois.

On déploie le monitoring avec Prometheus et Grafana pour surveiller la production. On automatise la gestion de l'infrastructure avec Ansible et Terraform. On généralise DevOps à toutes les équipes. Et on met en place un tableau de bord des métriques DORA.

Objectif : ancrer durablement la transformation avec des déploiements fréquents en production.

---

## SLIDE 15 : Facteurs clés et risques
**(1 minute 30)**

Les facteurs clés de succès, c'est simple.

L'engagement de la direction. Sans soutien actif du comité exécutif, sans communication régulière, sans budgets alloués, ça ne marchera pas.

La formation continue. Il faut monter les équipes en compétences, avec des formations régulières et du mentoring.

Et des quick wins. Des succès visibles rapidement qu'on communique bien. Ça maintient la motivation.

Les risques, on les a identifiés aussi.

Un planning trop ambitieux ? On a une roadmap réaliste sur 12 mois, on avance par étapes.

Un budget insuffisant ? On présente un business case solide avec un engagement ferme de la direction.

Un manque d'engagement ? On désigne un sponsor exécutif dédié.

Des outils inadaptés ? On teste tout d'abord sur l'équipe pilote.

L'essoufflement ? On célèbre régulièrement les avancées, on maintient le momentum.

---

## SLIDE 16 : Conclusion
**(1 minute)**

Pour conclure.

Les freins de World News sont ancrés dans une culture en silos héritée d'une organisation traditionnelle.

Notre vision cible : des équipes produit autonomes et pluridisciplinaires, une automatisation de bout en bout, et une culture de co-responsabilité.

Les bénéfices attendus sont concrets.

Time-to-market : on passe de 3-4 mois à quelques semaines. Gain de compétitivité énorme.

Qualité : moins d'incidents en production, meilleure expérience utilisateur, retour de la confiance.

Satisfaction : des clients contents et des équipes qui travaillent dans un environnement collaboratif et moins stressant.

L'enseignement clé : la transformation DevOps est avant tout culturelle et humaine. Les outils sont des facilitateurs indispensables, mais le véritable changement réside dans la collaboration, le partage de connaissances et la responsabilité partagée.

---

## SLIDE 17 : Merci
**(30 secondes)**

Merci pour votre attention.

Cette étude de cas montre ma compréhension des enjeux d'une transformation DevOps et ma capacité à formuler des préconisations adaptées, en alliant technique, organisation et humain.

Je suis à disposition pour vos questions.

---

**Fin de la présentation**