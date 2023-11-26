# Les jeux multijoueurs de CaféJeux en mode local
<em>Version 1.4-dev (26/11/2023)</em><br/>
<em>Auteur : Toad06, sur la base des codes sources des jeux publiés par Motion Twin.</em>

<em>Notes de version :</em><br/>
- Ajout de la prise en charge des jeux qui furent publiés en leur temps au sein du site lui-même.
- Ajout de la gestion du temps (via le chronomètre des joueurs, sur la partie site de l'archive uniquement).
- Ajout d'un petit intervalle de temps pendant lequel aucune interaction n'est possible, quand la main vient de passer au joueur suivant.
- Ajout d'une fonction de rappel en fin de partie (essentiellement utile sur la partie site).
- Ajout de la possibilité de choisir les options en jeu dans Magmax Battle et Anticorp's (voir les détails dans la rubrique de chacun de ces jeux, ci-dessous).
- Correction d'un bug rare qui pouvait survenir lors de l'initialisation des jeux et provoquer, sur certains d'eux, le blocage de la page lorsque le second joueur agissait pour la première fois de la partie.

---

Cette section comporte plusieurs fichiers inédits permettant de faire fonctionner les jeux de CaféJeux en mode local (monoposte).

Pour ce faire, suivez la procédure d'installation de l'archive indiquée dans le fichier <a href="../README.md">README.md</a> principal, puis ouvrez `_toad06/?game=[INDEX]` depuis le navigateur. `[INDEX]` doit être remplacé par l'identifiant du jeu à charger, les index sont les mêmes que ceux du site CaféJeux (avec quelques exclusivités en plus !). Ils sont également indiqués ci-dessous, accompagnés de différentes remarques sur l'état de fonctionnement des jeux.

Par ailleurs, si vous souhaitez n'afficher qu'une seule fenêtre de jeu sur la page (celle du joueur dont c'est le tour), ajoutez le paramètre `&unique=1` dans l'URL.


## eXpanz
### Index : 1
- Jeu fonctionnel.

## Amonite
### Index : 2
- Jeu fonctionnel.
- Bug mineur : Quand un joueur déplace un pion vers une case vide, ce dernier se déplace immédiatement sans jouer d'animation (sauf sur l'écran de l'adversaire). Cela n'affecte en rien le déroulement de la partie.

## Crumble
### Index : 3
- Jeu fonctionnel.

## Magmax Battle
### Index : 4
- Jeu fonctionnel.
- Le jeu comporte trois options (types de cartes supplémentaires) qui pouvaient être achetées dans la boutique de cafejeux.com. Elles sont activées par défaut mais vous pouvez inverser ce comportement en ajoutant le paramètre `&options=0,0,0` dans l'URL : chaque "0" peut ensuite être remplacé par "1" pour activer l'option correspondant à sa position (l'ordre est le même que sur la page de la boutique du site CaféJeux).

## Quat'Cinelle
### Index : 5
- Jeu fonctionnel.

## Anticorp's
### Index : 6
- Jeu fonctionnel.
- Le jeu comporte six options (zones de jeu supplémentaires) qui pouvaient être achetées dans la boutique de cafejeux.com. Elles sont généralement activées par défaut mais vous pouvez inverser ce comportement en ajoutant le paramètre `&options=0,0,0,0,0,0` dans l'URL : chaque "0" peut ensuite être remplacé par "1" pour activer l'option correspondant à sa position (l'ordre est le même que sur la page de la boutique du site CaféJeux).
- Le jeu comporte six types de cosmos avec des caractéristiques différentes, cafejeux.com n'en proposait pourtant qu'un seul. Pour jouer avec ces personnages, ajoutez le paramètre `&mode=[INDEX]` dans l'URL. `[INDEX]` doit être remplacé par le type de cosmo souhaité : 0 (cosmo classique), 1 (cosmo scout), 2 (cosmo tank), 3 (cosmo médical), 4 (cosmo ninja), 5 (cosmo mage) ou 99 (différents types de cosmos dans une même partie). Ces modes de jeu n'ayant jamais été proprement finalisés, des bugs peuvent survenir.
- Ce jeu utilise un fichier modifié pour corriger un bug sur la zone "Scissure de Sylvius" (carte légèrement trop courte en hauteur), de nombreuses fautes d'orthographe, activer les mines (la fonctionnalité était délibérément désactivée dans le code source du jeu) et ajouter des armes aux cosmos ninja et mage (dont les attaques de couverture et frappe aérienne, cette dernière n'étant toutefois implémentée que graphiquement).
- Bug mineur : Après avoir tiré, un cosmo peut garder son arme en main sur l'un des deux écrans de jeu. Cela n'affecte en rien le déroulement de la partie.

## Marbils
### Index : 7
- Jeu fonctionnel.
- Pour le fun et rendre éventuellement la fin de partie très disputée, vous pouvez ajouter le paramètre `&mode=1` dans l'URL pour retirer deux billes de l'aire de jeu en début de partie.

## Ferme-la !
### Index : 8
- Jeu fonctionnel.
- Ce jeu utilise un fichier légèrement modifié car l'obfuscation du code empêche la communication entre Flash (loader.swf) et JavaScript (fakeserver.js) de fonctionner correctement : les clés d'un objet provoquent une erreur.

## Trigolo
### Index : 9
- Jeu fonctionnel.
- Bug : Les cartes sont placées directement sur le plateau, sans jouer d'animation au préalable. Cela est dû à la solution de contournement actuellement utilisée pour permettre au jeu de fonctionner.

## Hordes Insurrection !
### Index : 11
- Jeu fonctionnel.
- Vous pouvez changer la condition de victoire en ajoutant le paramètre `&mode=[INDEX]` dans l'URL. `[INDEX]` doit être remplacé par 0 (le plus d'unités en vie, l'objectif par défaut et le seul qui était proposé sur cafejeux.com) ou 1 (le plus de territoires conquis).
- Deux options n'ont jamais été finalisées mais sont restées présentes dans le code source du jeu : barricades et bouclier rouge. Pour les activer, ajoutez le paramètre `&special=1` dans l'URL. Ces options n'étant pas finalisées, leur utilisation provoquera des problèmes durant la partie.
- Ce jeu utilise un fichier légèrement modifié pour les mêmes raisons que "Ferme-la !".

## Starsheep Brouteurs
### Index : 12
- Jeu fonctionnel.
- Ce jeu n'est jamais sorti sur cafejeux.com mais les administrateurs de Motion Twin avaient évoqué son existence, son nom et son but : manger toute l'herbe !

## Boum - Prototype de Anticorp's
### Index : 13
- Jeu fonctionnel. Il ne s'agit toutefois que d'un prototype très simpliste, des bugs surviendront.
- L'utilisation du clavier est également nécessaire pour jouer (touches directionnelles et barre espace).
