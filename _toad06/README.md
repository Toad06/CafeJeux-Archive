# Les jeux multijoueurs de CaféJeux en mode local
<em>Version 1.7-dev3 (29/11/2024)</em><br/>
<em>Auteur : Toad06, sur la base des codes sources des jeux publiés par Motion Twin.</em>

<em>Notes de version :</em><br/>
- Implémentation désormais complète de la classe "Timer".
- Modification du comportement de l'option de fenêtre unique sur mobile (détails quelques lignes plus bas).
- Correction des bugs connus dans Crumble et Trigolo (détails dans la rubrique de chaque jeu, ci-dessous).
- Correction de bugs dans Boum : une erreur n'est plus déclenchée si le bouton de lecture du second client est appuyé en premier ; les actions du second client sont maintenant bien transférées au premier client à la fin du tour.

---

Cette section comporte plusieurs fichiers inédits permettant de faire fonctionner les jeux de CaféJeux en mode local (monoposte).

Pour ce faire, suivez la procédure d'installation de l'archive indiquée dans le fichier <a href="../README.md">README.md</a> principal, puis ouvrez `_toad06/?game=[INDEX]` depuis le navigateur. `[INDEX]` doit être remplacé par l'identifiant du jeu à charger, les index sont les mêmes que ceux du site CaféJeux (avec quelques exclusivités à partir de l'index 12, en provenance de l'archive publiée par Motion Twin). Ils sont également indiqués plus bas dans ce document, accompagnés de différentes remarques sur l'état de fonctionnement des jeux.

Par ailleurs, des paramètres de configuration optionnels sont disponibles :
- Pour n'afficher qu'une seule fenêtre de jeu sur la page (celle du joueur dont c'est le tour), ajoutez le paramètre `&unique=1` dans l'URL. Sur les appareils mobiles uniquement, l'écran de jeu est également inversé à chaque tour.
- Pour personnaliser le nom des deux joueurs, ajoutez le paramètre `&players=[NOM_1],[NOM_2]` dans l'URL, en remplaçant `[NOM_1]` et `[NOM_2]` par les noms à utiliser. L'ordre de départ des joueurs est déterminé aléatoirement.
- Certains jeux utilisent des paramètres qui leur sont propres. Vous les trouverez ci-dessous.


## eXpanz
### Index : 1
- Jeu fonctionnel.

## Amonite
### Index : 2
- Jeu fonctionnel.
- (1.7) ~~Bug mineur : Quand un joueur déplace un pion vers une case vide, ce dernier se déplace immédiatement sans jouer d'animation (sauf sur l'écran de l'adversaire). Cela n'affecte en rien le déroulement de la partie.~~

## Crumble
### Index : 3
- Jeu fonctionnel.

## Magmax Battle
### Index : 4
- Jeu fonctionnel.
- Le jeu comporte trois options (types de cartes supplémentaires) qui pouvaient être achetées dans la boutique de cafejeux.com. Ici, elles sont activées par défaut mais vous pouvez inverser ce comportement en ajoutant le paramètre `&options=0,0,0` dans l'URL : chaque "0" peut ensuite être remplacé par "1" pour activer l'option correspondant à sa position (l'ordre est le même que sur la page de la boutique du site CaféJeux).

## Quat'Cinelle
### Index : 5
- Jeu fonctionnel.

## Anticorp's
### Index : 6
- Jeu fonctionnel.
- Le jeu comporte six options (zones de jeu supplémentaires) qui pouvaient être achetées dans la boutique de cafejeux.com. Ici, elles sont généralement activées par défaut mais vous pouvez inverser ce comportement en ajoutant le paramètre `&options=0,0,0,0,0,0` dans l'URL : chaque "0" peut ensuite être remplacé par "1" pour activer l'option correspondant à sa position (l'ordre est le même que sur la page de la boutique du site CaféJeux).
- Le jeu comporte six types de cosmos avec des caractéristiques différentes, cafejeux.com n'en proposait pourtant qu'un seul. Pour jouer avec ces personnages, ajoutez le paramètre `&mode=[INDEX]` dans l'URL. `[INDEX]` doit être remplacé par le type de cosmo souhaité : 0 (cosmo classique), 1 (cosmo scout), 2 (cosmo tank), 3 (cosmo médical), 4 (cosmo ninja), 5 (cosmo mage) ou 99 (différents types de cosmos dans une même partie). Ces modes de jeu n'ayant jamais été proprement finalisés, des bugs peuvent survenir.
- Les modifications suivantes peuvent être utilisées, mais elles ne sont pas cumulables :
  - Pour le fun et obliger les joueurs à revoir leurs stratégies habituelles, vous pouvez ajouter le paramètre `&reverse=1` dans l'URL pour que les cosmos bleus commencent les premiers. Il est également possible d'utiliser `&reverse=99` pour que l'ordre de départ soit déterminé aléatoirement.
  - Pour corriger le léger problème de la perte d'adhérence des cosmos à la surface jaune à certains endroits, notamment au niveau de la larme dans la zone "Scissure de Sylvius", vous pouvez ajouter le paramètre `&glue=1` dans l'URL.
- Ce jeu utilise un fichier modifié pour corriger de nombreuses fautes d'orthographe, activer les mines (la fonctionnalité était délibérément désactivée dans le code source du jeu) et ajouter des armes aux cosmos ninja et mage (dont les attaques de couverture et frappe aérienne, cette dernière n'étant toutefois implémentée que graphiquement). Quelques bugs sont également corrigés : la zone "Scissure de Sylvius" n'est plus légèrement trop courte en hauteur, cela avait pour conséquence de "couper" certains éléments de décor ; les grenades ne provoquent plus le blocage du jeu quand celles-ci restent coincées dans le décor au moment de leur lancement. 
- Bug mineur : Après avoir tiré, un cosmo peut garder son arme en main sur l'un des deux écrans de jeu. Cela n'affecte en rien le déroulement de la partie.
- Bug mineur : Dans un cas très précis, le résultat affiché en fin de partie est erroné. Cela se produit quand il ne reste qu'un seul cosmo dans l'équipe qui a la main, que celle-ci pulvérise tous les cosmos adverses restants à l'aide d'une grenade, et que le cosmo saute dans le vide durant le laps de temps où il peut se repositionner. Au lieu d'une égalité, le joueur qui avait la main est déclaré perdant, son adversaire gagnant.

## Marbils
### Index : 7
- Jeu fonctionnel.
- Pour le fun et rendre éventuellement la fin de partie très disputée, vous pouvez ajouter le paramètre `&mode=1` dans l'URL pour retirer deux billes de l'aire de jeu en début de partie.

## Ferme-la !
### Index : 8
- Jeu fonctionnel.
- Ce jeu utilise un fichier légèrement modifié car l'offuscation du code empêche la communication entre Flash (loader.swf) et JavaScript (fakeserver.js) de fonctionner correctement : les clés d'un objet provoquent une erreur.

## Trigolo
### Index : 9
- Jeu fonctionnel.
- (1.7) ~~Bug : Les cartes sont placées directement sur le plateau, sans jouer d'animation au préalable. Cela est dû à la solution de contournement actuellement utilisée pour permettre au jeu de fonctionner.~~

## Hordes Insurrection !
### Index : 11
- Jeu fonctionnel.
- Vous pouvez changer la condition de victoire en ajoutant le paramètre `&mode=[INDEX]` dans l'URL. `[INDEX]` doit être remplacé par 0 (le plus d'unités en vie, l'objectif par défaut et le seul qui était proposé sur cafejeux.com) ou 1 (le plus de territoires conquis).
- Deux options n'ont jamais été finalisées mais sont restées présentes dans le code source du jeu : barricades et bouclier rouge. Pour les activer, ajoutez le paramètre `&special=1` dans l'URL. Ces options n'étant pas finalisées, leur utilisation provoquera des problèmes durant la partie.
- Ce jeu utilise un fichier légèrement modifié pour les mêmes raisons que "Ferme-la !".

## Starsheep Brouteurs - Jeu inédit
### Index : 12
- Jeu fonctionnel.
- Ce jeu n'est jamais sorti sur cafejeux.com mais les administrateurs de Motion Twin avaient évoqué son existence, son nom et son but : manger toute l'herbe !

## Arlequin - Jeu inédit
### Index : 13
- Jeu non fonctionnel. Celui-ci n'est tout simplement pas disponible dans les codes sources publiés par Motion Twin.
- Ce jeu n'est jamais sorti sur cafejeux.com mais les joueurs avaient eu connaissance de son existence, son nom et son but : "A l'occasion d'un bal, Arlequin cherche Isabella et Isabella cherche Arlequin. Le plus rapide des deux à trouver l'autre sera sacré meilleur danseur du bal...".
- Une partie des règles était également dévoilée : "Vous pouvez également démasquer un pion adversaire positionné sur une case adjacente. Cela prend un tour.".

## Boum - Prototype de Anticorp's
### Index : 14
- Jeu fonctionnel. Il ne s'agit toutefois que d'un prototype très simpliste, des bugs surviendront et il n'est pas possible d'arriver au terme d'une partie.
- L'utilisation du clavier est par ailleurs nécessaire pour jouer (touches directionnelles et barre espace).

## Utopiz - Jeu non finalisé
### Index : 15
- Jeu fonctionnel. Son développement n'a toutefois jamais été finalisé par Motion Twin et il n'y a donc ni objectif ni moyen d'arriver au terme d'une partie en l'état actuel.
- Ce jeu n'a pas été imaginé pour CaféJeux en premier lieu : le nom se finissant par "iz" et le style graphique font sans l'ombre d'un doute référence à Frutiparc ; de plus, les éléments interactifs et de décor sont redimensionnés et apparaissent petits à l'écran.
