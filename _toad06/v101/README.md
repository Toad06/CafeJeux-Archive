# Les jeux multijoueurs de CaféJeux en mode local
<em>Version 1.1 (26/12/2022)</em><br/>
<em>Auteur : Toad06, sur la base des codes sources des jeux publiés par Motion Twin.</em>

Cette section comporte plusieurs fichiers inédits permettant de faire fonctionner les jeux de CaféJeux en mode local.

Pour ce faire, suivez la procédure d'installation de l'archive indiquée dans le fichier <a href="../../README.md">README.md</a> principal, puis ouvrez "_toad06/?game=[INDEX]" depuis le navigateur.

`[INDEX]` doit être remplacé par l'identifiant du jeu à charger, les index sont les mêmes que ceux du site CaféJeux. Ils sont également indiqués ci-dessous, avec différentes remarques sur l'état de fonctionnement des jeux.


## eXpanz
### Index : 1
- Jeu fonctionnel.

## Amonite
### Index : 2
- Jeu fonctionnel.
- Bug mineur possible : Quand un joueur déplace un pion vers une case vide, ce dernier se déplace immédiatement sans jouer d'animation (sauf sur l'écran de l'adversaire). Cela n'affecte pas le déroulement de la partie.

## Crumble
### Index : 3
- Jeu fonctionnel.
- (1.1) ~~Bug majeur : Les personnages ne se déplacent pas.~~
- Bug : Il y a souvent quelques soucis d'affichage sur l'écran de l'adversaire quand le tour est joué. Cela n'a néanmoins pas d'incidence sur le déroulement de la partie.

## Magmax Battle
### Index : 4
- Jeu fonctionnel.
- (1.1) ~~Bug mineur : Les personnages des deux équipes ont tous le même nom. Le code source de ce jeu n'a pas été rendu public par Motion Twin mais les noms semblent être générés de manière aléatoire parmi les données de deux tableaux ; la graine (seed) semble toujours la même pour une raison actuellement inconnue.~~
- (1.1) ~~Bug : Seul le premier joueur semble pouvoir bénéficier des cartes déblocables en boutique. La fonction "getOptions" ne renvoie sans doute pas la bonne valeur.~~

## Quat'Cinelle
### Index : 5
- Jeu fonctionnel.

## Anticorp's
### Index : 6
- Jeu fonctionnel.
- (1.1) Le jeu comporte six types de cosmos avec des caractéristiques différentes, un seul type était proposé sur cafejeux.com. Pour jouer avec ces personnages, ajoutez le paramètre "&mode=[INDEX]" dans l'URL. `[INDEX]` doit être remplacé par le type de cosmo souhaité : 0 (soldat classique), 1 (cosmo scout), 2 (cosmo tank), 3 (cosmo médical), 4 (cosmo ninja), 5 (cosmo mage) ou 99 (différents types de cosmos dans une même partie). Ces modes de jeu n'ayant jamais été proprement finalisés, des bugs peuvent survenir.
- Ce jeu utilise un fichier modifié pour corriger un bug sur la zone "Scissure de Sylvius" (carte légèrement trop courte en hauteur), de nombreuses fautes d'orthographe et (1.1) activer les mines (la fonctionnalité était délibérément désactivée dans le code source du jeu).
- Bug : Quand vous sélectionnez une arme, patientez un peu si celle-ci ne s'affiche pas dans les mains du cosmo : cela signifie que l'écran de jeu n'est pas synchronisé avec celui de l'adversaire. Si vous tirez quand même, un décalage se produira et les écrans des deux joueurs afficheront des informations contradictoires (fait amusant, ce bug pouvait se produire sur cafejeux.com, dans des conditions cependant plus obscures).
- Bug mineur : Après avoir tiré, un cosmo peut garder son arme en main sur l'un des deux écrans de jeu. Cela n'affecte en rien le déroulement de la partie.

## Marbils
### Index : 7
- Jeu fonctionnel.
- (1.1) Pour le fun et rendre éventuellement la fin de partie très disputée, vous pouvez ajouter le paramètre "&mode=1" dans l'URL pour retirer deux billes de l'aire de jeu en début de partie.

## Ferme-la !
### Index : 8
- Jeu fonctionnel.
- Ce jeu utilise un fichier légèrement modifié car l'obfuscation dans le jeu empêche la communication entre Flash (loader.swf) et JavaScript (fakeserver.js) de fonctionner correctement : les clés d'un objet provoquent une erreur.

## Trigolo
### Index : 9
- Jeu non fonctionnel.
- Bug majeur : Différents bugs d'affichage se produisent sur l'écran du joueur qui a la main.

## Hordes Insurrection !
### Index : 11
- Jeu fonctionnel.
- (1.1) Vous pouvez changer la condition de victoire en ajoutant le paramètre "&mode=[INDEX]" dans l'URL. `[INDEX]` doit être remplacé par 0 (le plus d'unités en vie, l'objectif par défaut et le seul qui était proposé sur cafejeux.com) ou 1 (le plus de territoires conquis).
- (1.1) Deux options n'ont jamais été finalisées mais sont restées présentes dans le code source du jeu : barricades et bouclier rouge. Pour les activer, ajoutez le paramètre "&special=1" dans l'URL. Ces options n'étant pas finalisées, leur utilisation provoquera des problèmes durant la partie.
- Ce jeu utilise un fichier légèrement modifié pour les mêmes raisons que "Ferme-la !".

## Starsheep Brouteurs
### Index : 12
- Jeu partiellement fonctionnel.
- Ce jeu n'est jamais sorti sur cafejeux.com mais les administrateurs de Motion Twin avaient évoqué son existence, son nom et son but : manger toute l'herbe !
- Bug : Un problème survient au dernier tour du joueur qui a la main.

## Boum - Prototype de Anticorp's
### Index : 13
- Jeu fonctionnel... ou pas ? Difficile à dire tant cette version est très expérimentale.
- Ce jeu nécessite également l'utilisation du clavier.
