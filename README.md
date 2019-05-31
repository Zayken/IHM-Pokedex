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
