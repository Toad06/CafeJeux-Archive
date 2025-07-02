// Correctif pour la perte d'adhérence des cosmos à la surface jaune dans Anticorp's.
// Inclus dans l'archive (en option) à partir de la version 1.6 du loader.
//
// Ce problème survient à quelques endroits du jeu, le plus notable étant celui se situant au niveau de la "larme" sur la zone "Scissure de Sylvius".
// Le code suivant ne corrige que superficiellement le problème car le "vrai" correctif nécessiterait sans doute des changements beaucoup plus profonds.
// La perte d'adhérence des cosmos aux endroits problématiques est ainsi évitée, mais elle est malheureusement remplacée par des imprécisions moins critiques à d'autres endroits.


// Fichier : Cosmo.hx (dans le code source fourni par Motion Twin)

public function checkBalance() {
	var eq = Num.hMod((-1.57 - getNormal()), 3.14);
	var d = Cs.DIR[gid];
	return Math.abs(eq) < 1.57 || Game.me.isGlue(x + d[0], y + d[1]) || Game.me.isGlue(x + d[0] * 2, y + d[1] * 2); // Code ajouté à partir du dernier ||.
}


// Le code précédent peut être changé directement dans le fichier Flash avec le logiciel "JPEXS Free Flash Decompiler", en ajoutant le P-code ci-dessous au bon endroit dans la fonction mentionnée.
// Du fait de l'offuscation, la fonction "checkBalance" se nomme "=ZqB6(" dans le SWF. Les autres valeurs sont également différentes, comme cela peut être constaté ci-dessous.

PushDuplicate
If loc750e
Pop
Push register1, ")("
GetMember
Push register3, 1
GetMember
Push 2
Multiply
Add2
Push register1, "(("
GetMember
Push register3, 0
GetMember
Push 2
Multiply
Add2
Push 2, "44{N"
GetVariable
Push "(K"
GetMember
Push ",ktcJ("
CallMethod
loc750e:
