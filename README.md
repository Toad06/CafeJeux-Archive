# Archive CaféJeux

<em>Auteur : Toad06</em><br/>
<em>Contributeurs : Evian, Tomdu56</em>

Cette archive contient l'ensemble des pages, images et fichiers Flash de CafeJeux.com, site de jeux en ligne créé et édité par la société Motion Twin de 2007 à 2021.

L'archive est essentiellement statique, les parties dynamiques ne sont souvent là que pour refléter le comportement du site d'origine en termes d'affichage... et donc donner l'illusion. La liste des fonctionnalités dynamiques disponibles est détaillée dans la dernière section de ce document.

Les jeux et quelques inédits sont fonctionnels en mode local (monoposte) en accédant au dossier <a href="_toad06">_toad06</a>. Les jeux qui furent publiés en leur temps sont également intégrés au sein même du site.


## Installation

Vous devez disposer d'un serveur web doté des logiciels Apache et PHP. Plus particulièrement, l'archive a été conçue avec Apache 2.4 et PHP 7.4 mais l'ensemble des versions indiquées ci-dessous fonctionnent également :
- Apache : 2.4
- PHP : 5.6, 7.4, 8.0 à 8.4

L'installation de l'archive en elle-même est très simple : il vous suffit d'extraire tout le contenu du fichier zip téléchargé vers votre serveur et d'accéder à la page `index.php` depuis un navigateur qui prend toujours en charge le plugin Flash Player, comme Basilisk. L'émulateur <a href="https://github.com/ruffle-rs/ruffle">Ruffle</a> peut également être utilisé dans les navigateurs plus habituels tels Chrome ou Firefox, pour pallier l'obsolescence de Flash Player : vous devez toutefois vous assurer qu'il est configuré de manière à permettre la lecture automatique des fichiers Flash (sans interaction préalable).


### Utilisation avec WampServer (Windows)

La solution la plus simple pour profiter du site est probablement d'utiliser <a href="https://www.wampserver.com">WampServer</a>.

Une fois le programme installé sur votre machine, vous devez vous rendre dans le dossier `www` de WampServer et créer un dossier `cafejeux` dans lequel doivent être transférés tous les fichiers de l'archive.

Lorsque tout est en place, il ne vous reste plus qu'à démarrer WampServer et, dès que l'icône du logiciel s'affiche en vert dans la barre des tâches de Windows, à saisir l'adresse `http://localhost/cafejeux` dans votre navigateur pour accéder au site.


### Utilisation avec Docker

Si vous disposez de <a href="https://docs.docker.com/compose/install">Docker Compose</a>, vous pouvez lancer le site en exécutant la commande `docker compose up -d` depuis le dossier racine de l'archive.

Il vous suffit ensuite de saisir l'adresse `http://cafejeux.localhost` dans votre navigateur pour accéder au site.


<a href="https://github.com/Toad06/CafeJeux-Archive"><img src="presentation.png?raw=true" alt="" /></a>

Vous pouvez signaler tout problème <a href="https://github.com/Toad06/CafeJeux-Archive/issues">en ouvrant un ticket</a> ou contribuer <a href="https://github.com/Toad06/CafeJeux-Archive/pulls">en créant une requête de fusion</a>.


## Fonctionnalités dynamiques

Les actions suivantes ont un effet concret au sein de l'archive :

- La création d'un compte depuis la page d'inscription. Plus exactement, seuls le pseudo et l'avatar sont gardés en mémoire par le système de cookies. Créer un nouveau profil remplace automatiquement le précédent. Cette étape n'a de toute façon rien d'obligatoire puisque la connexion reste possible avec n'importe quel pseudo et mot de passe, tant que ceux-ci respectent les contraintes qu'imposait CafeJeux.com : dans cette situation, l'avatar par défaut est alors utilisé.

- Le choix de la boisson quotidienne, influençant l'image de la tasse en haut du site. Ce choix est uniquement conservé tant que la session en cours reste active ; ou jusqu'à minuit, heure du serveur.

- Le bouton "ON / OFF" pour le son, essentiellement utile pour tout ce qui concerne les jeux. Ce choix est uniquement conservé tant que la session en cours reste active.

- Le déplacement des meubles sur la table "CaféJeux 2007-2020" (le lien vers cette page est à trouver). Ce choix est uniquement conservé tant que la session en cours reste active.

- Le choix des options en jeu depuis la page "Ma page -> Mes options de jeux". Ce choix est uniquement conservé tant que la session en cours reste active. Si ce formulaire n'est jamais validé (avec ou sans modifications), la carte par défaut pourra être sélectionnée dans le jeu "Anticorp's", ce qui diffère (volontairement) de ce que faisait CafeJeux.com.

Les actions suivantes, plus anecdotiques et dont l'effet disparaît dès lors qu'une autre page est chargée, sont également possibles :

- L'écriture et l'envoi de messages sur les t'chats des jeux et des tables, selon les règles de mise en forme qui étaient autorisées sur CafeJeux.com.

- L'écriture et l'envoi du texte de présentation de la table "Table des Habitués", selon les règles de mise en forme qui étaient autorisées sur CafeJeux.com.

- L'écriture et la prévisualisation de messages sur les forums, selon les règles de mise en forme qui étaient autorisées sur CafeJeux.com.