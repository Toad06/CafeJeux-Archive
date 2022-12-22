# Jeux multijoueurs en mode local

Cette section comporte plusieurs fichiers inédits dont un fichier de chargement (loader) permettant de faire fonctionner les jeux de CaféJeux en mode local.

Pour y jouer, suivez la procédure d'installation de l'archive indiquée dans le fichier <a href="../README.md">README.md</a> principal, puis ouvrez "_toad06/?game=[INDEX]" depuis le navigateur.

`[INDEX]` correspond à l'identifiant du jeu à charger, les index sont les mêmes que ceux du site CaféJeux. Ils sont également indiqués ci-dessous, avec différentes remarques sur l'état de fonctionnement des jeux.

Loader écrit par Toad06 sur la base des codes sources des jeux publiés par Motion Twin.
v1.0 22/12/2022


## eXpanz
### Index : 1
- Jeu fonctionnel.

## Amonite
### Index : 2
- Jeu fonctionnel.
- Bug possible : Quand un joueur déplace un pion vers une case vide, ce dernier se déplace immédiatement sans jouer d'animation (sauf sur l'écran de l'adversaire). Cela n'affecte pas le déroulement de la partie.

## Crumble
### Index : 3
- Jeu non fonctionnel.
- Bug majeur : Les personnages ne se déplacent pas.

## Magmax Battle
### Index : 4
- Jeu fonctionnel.
- Bug mineur : Les personnages des deux équipes ont le même nom. Le code source de ce jeu n'a pas été rendu public par Motion Twin mais les noms semblent être générés de manière aléatoire parmi les données de deux tableaux ; la graine (seed) semble toujours la même pour une raison actuellement inconnue.
- Bug : Seul le premier joueur semble pouvoir bénéficier des cartes déblocables en boutique. La fonction "getOptions" ne renvoie sans doute pas la bonne valeur.

## Quat'Cinelle
### Index : 5
- Jeu fonctionnel.

## Anticorp's
### Index : 6
- Jeu fonctionnel.
- Ce jeu utilise un fichier modifié pour corriger un bug sur la zone "Scissure de Sylvius" (carte légèrement trop courte en hauteur) et de nombreuses fautes d'orthographe.
- Bug : Quand vous sélectionnez une arme, patientez un peu si celle-ci ne s'affiche pas dans les mains du cosmo : cela signifie que l'écran de jeu n'est pas synchronisé avec celui de l'adversaire. Si vous tirez quand même, un décalage se produira et les écrans des deux joueurs afficheront des informations contradictoires (fait amusant, ce bug pouvait se produire sur cafejeux.com, dans des conditions cependant plus obscures).
- Bug mineur : Après avoir tiré, un cosmo peut garder son arme en main sur l'un des deux écrans de jeu. Cela n'affecte en rien le déroulement de la partie.

## Marbils
### Index : 7
- Jeu fonctionnel.

## Ferme-la !
### Index : 8
- Jeu fonctionnel.
- Ce jeu utilise un fichier modifié car l'obfuscation dans le jeu empêche la communication entre Flash (loader.swf) et JavaScript de fonctionner correctement : les clés d'un objet provoquent une erreur.

## Trigolo
### Index : 9
- Jeu non fonctionnel.
- Bug majeur : Différents bugs d'affichage se produisant sur l'écran du joueur qui a la main.

## Hordes Insurrection !
### Index : 11
- Jeu fonctionnel.
- Ce jeu utilise un fichier modifié pour les mêmes raisons que "Ferme-la !".

## Starsheep Brouteurs
### Index : 12
- Jeu partiellement fonctionnel.
- Ce jeu n'est jamais sorti sur cafejeux.com mais les administrateurs de Motion Twin avaient évoqué son existence, son nom et son but : manger toute l'herbe !
- Bug : Un problème survient au dernier tour du joueur qui a la main.

## Boum - Prototype de Anticorp's
### Index : 13
- Jeu fonctionnel... ou pas ? Difficile à dire tant cette version est très expérimentale.
- Ce jeu nécessite également l'utilisation du clavier.
