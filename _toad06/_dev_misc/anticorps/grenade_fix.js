// Correctif pour le bug de la grenade dans Anticorp's.
// Inclus dans l'archive à partir de la version 1.5 du loader.
//
// Ce problème survient lorsque le cosmo se situe dans une zone tellement serrée que sa tête touche une paroi opposée à celle où il a ses pieds.
// En utilisant une grenade dans cette situation, celle-ci reste coincée dans la paroi et n'explose jamais. Cela a pour conséquence de bloquer la partie (softlock).
// Le code suivant corrige ce problème, en faisant immédiatement exploser la grenade si celle-ci est dans une situation "coincée" au moment de son lancement.


// Fichier : Cosmo.hx (dans le code source fourni par Motion Twin)

function newShot(type:Int, angle:Float, ?power:Float) {
	if(power == null) power = 1;

	var shot = getShot(type);
	var secDist = (ray + shot.ray) + 1;
	shot.x = Std.int(x + head.x + Math.cos(angle) * secDist);
	shot.y = Std.int(y + head.y + Math.sin(angle) * secDist);

	// Début du code ajouté.
	if(type == 3 && !Game.me.isFree(shot.x, shot.y)) {
		shot.flBounce = false;
		shot.flAngleBounce = false;
	}
	// Fin.

	shot.fire(angle, power);
	shot.orient();
	shot.updatePos();

	return shot;
}


// Le code précédent peut être changé directement dans le fichier Flash avec le logiciel "JPEXS Free Flash Decompiler", en ajoutant le P-code ci-dessous au bon endroit dans la fonction mentionnée.
// Du fait de l'offuscation, la fonction "newShot" se nomme "8A1T3(" dans le SWF. Les autres valeurs sont également différentes, comme cela peut être constaté ci-dessous.

Push register2, 3
Equals2
PushDuplicate
Not
If loc0050
Pop
Push register5, ")("
GetMember
Push register5, "(("
GetMember
Push 2, "44{N"
GetVariable
Push "(K"
GetMember
Push "77ldJ("
CallMethod
Not
loc0050:Not
If loc0074
Push register5, "{SxlZ", false
SetMember
Push register5, "4mAGJ", false
SetMember
loc0074:
