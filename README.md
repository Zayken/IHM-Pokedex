# IHM-Pokedex
Pokedex pour le cours ESIR2 d'IHM

Compte rendu de TP de Werth Tony

# Introduction

L'objectif de ce Tp est d'utiliser un framework, ici angular, afin de créer une interface homme machine (ou frontside) par l'intermédiaire de la réalisation d'un pokédex.

Suivre les étapes indiquées par le tp m'a permis de prendre rapidement en main les fonctionnalités indispensables que propose angular, afin de les comprendre et de les réutiliser par la suite.

Néanmoins, j’ai décidé d’également développer certaines fonctionnalités, et d’améliorer voir changer certaines fonctionnalités proposées par le tp, de ce fait je vais expliquer dans la suite de ce compte rendus ce que j’ai réalisé.

# Cadre

J'ai également utilisé en association avec angular, bootstrap et angular material (et un petit peu prime ng). Bootstrap est très intéressant quand il s'agit de rendre notre site responsive, afin que celui-ci reste clair quelque soit la taille de la fenêtre.
Angular Material quant à lui propose des composants pré faits très intéressants et complets à mettre en place.

# Création du site

En plus de la création classique du projet angular proposé par le tp, j'ai choisi de changer le logo, et j'utilise un thème proposé par Angular Material pour le style de la police par exemple. J'ai également dû incorporer tout les modules nécessaires aux animations.

# Les services

Mon projet propose deux services :
Le premier est le service permettant de requêter l'api pokémon, il comporte de simples fonctions utilisant elles-mêmes le services HttpClient d'angular. Elles retournent toutes un Observable auquel il est possible de souscrire lorsqu'on veut le résultat de l'api. En général j'utiliserai donc ces fonctions dans mon second services afin de pouvoir partager ce résultat de requête à tous mes autres composants, mais dans quelques cas, j'utilise directement les fonctions de l'api dans les composants qui nécessitent des données de l'api qui lui sont propre.
Le second service permet le transfert de donnée, en créant un Subject définit comme Observable et permettant le transfert bidirectionnel de données. Ce service récupère les données d’une requête et les transfère à tous les composants ayant souscrits à cet observable.

# Les composants
## La SearchBar

Dans un premier temps j'ai créé une barre de recherche comme indiqué dans le tp avec un double input dont un en readOnly (dont je n'ai pas compris leurs utilités), puis une barre de recherche auquelle il est possible d'appliquer un filtre définit dans un input à côté.
Cependant je trouve ce système un peu laborieux et j'ai donc par la suite développé une barre de recherche autocomplete permettant de filtrer en même temps que l'utilisateur rentre des données. J'ai donc commenté toute la partie relative à ma précédente barre de recherche et ai gardé celle-ci.
Elle utilise également la notion de filtre. De plus, celle-ci est une form et est donc associée à un bouton submit, cependant il faut alors prendre en compte d'éventuelles messages d'erreurs lors du submit qui déclenche une requête pour l'api, et j'ai donc ajouté un système d'alert.
Ce composant lance donc une requête de l'api et renvoie le résultat dans notre service de transfert de données, qui se charge alors de rediriger les informations essentielles du pokémon choisis à tous les autres composants.

## Le résumé du pokémon

Ce composant se nomme pokemon-lookable, et à pour but de résumer les informations principales du pokemon, on y retrouve alors sa photo, ses types, son nom, son id et sa description (qui provient d'une autre requête dans l'api).
Afin de rendre ceci plus joli, j'ai ajouté des images correspondants aux types des pokemons afin que ceux-ci ne soient pas représentés par de l'écriture classique, mais plutôt par le logo de chaque type.
De plus j'ai ajouté la possibilité de changer l'image du pokemon afin de pouvoir voir sa version chromatique en cliquant sur l'étoile, et de pouvoir le voir de dos.
Pour rendre tout ceci plus interactif avec l'utilisateur, j'ai utiliser les events (mouseover) et (mouseout) afin de définir des fonctions qui simulent la possibilité d'un clic sur des boutons (en changeant de couleur, mettant le curseur en mode pointer, etc...)

## Les statistiques du pokémon

Ce composant s'appelle stats et va simplement pour chaque statistique associer une barre représentative. Il n'est pas nécessaire ici de récupérer d'autre data que celles transférées par le service. J'utilise ici les grids de angular material, ainsi que la progress bar de angular material auquelle j'active une classe CSS en fonction de la puissance de la statistique associée.
Cette barre évolue entre 0 et 100 alors qu'une statistique peut évoluer de 0 à 255, j'attribue donc a chaque barre de chaque statistique sa valeur proportionnelle entre 0 et 100 puis une couleur (9 possibilités, 0<12.5<25<...<75<87.5<100, et une couleur spécial pour 100)

## Les talents

Ce composant s'appelle ability-tab et va récupérer pour le pokémon choisi les informations relatives à ses talents. Il les liste sous forme de carte avec le nom du talent, son id, sa description, et affiche si le talent est secret pour le pokémon ou non. De ce fait, il est nécessaire de faire une requête à l'api pour chaque talent du pokémon. Ces données étant interne à ce composants, elles ne passent pas par le service de transfert de donné, j'utilise directement le service api dans ce composants.

## La famille de pokémon


Ce composant s'appelle évolution et représente toute la famille d'évolution du pokémon. C'est probablement le composant qui m'a donné le plus de difficulté, car il est nécessaire de faire de nombreuse requête.Pour simplifier, les données du pokémon étant récupérées je récupère ensuite les informations à propos de l'espèce du pokémon, puis requete pour avoir les informations à propo de sa chaîne d'évolution, réalise un travail sur cette chaîne d'évolution pour ensuite requête chaque pokémon dans cette chaîne pour pouvoir afficher le nom, l'id et une image, et ce afin qu'ils restent classés dans l'ordre de leurs id.
J'ai également ajouté la possibilité de cliquer sur une image dans cette chaîne d'évolution afin de pouvoir directement avoir les informations associées au nouveau pokemon selectionné. J'ai donc de la même manière utilisé les events (click), (mouseover) et (mouseout).

## La liste des attaques

Ce composant s'appelle moves-list et est probablement le plus complet techniquement de mon projet. Il utilise un tableau de angular material et regroupe toutes les attaques pouvant être connues par le pokémon, avec leur id, le nom, le type et la puissance de l'attaque, ajoute la possibilité de trier ce tableau comme on le souhaite (id,type,nom ou puissance), et permet d'accroître la capacité du tableau si on souhaite afficher plus d'attaque (10 - 25 - 50) et permet de naviguer dans un système de page tout en gardant l'ordre sélectionné.
