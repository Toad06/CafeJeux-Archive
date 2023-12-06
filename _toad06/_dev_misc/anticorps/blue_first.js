// Inversion de l'ordre de départ des cosmos dans Anticorp's : les bleus commencent.
// Inclus dans l'archive à partir de la version 1.5 du loader.
//
// Ce petit changement permet de renouveler très facilement le jeu, obligeant les joueurs à revoir leurs stratégies habituelles.
// Il suffit pour cela de quelques modifications rapides dans deux fonctions du jeu.


// Fichier : Game.hx (dans le code source fourni par Motion Twin)

public function onMessage(flMine:Bool, msg) {
	switch(msg) {
		case Init(levelType, seed):
			// (...)
			colorId = 1; // Valeur changée, de 0 à 1.
			if(!flMain) colorId = 0; // Valeur changée, de 1 à 0.
			// (...)
	}
}


// Fichier : Cosmo.hx

public function new(mc, type, flMine) {
	// (...)
	colorId = 1; // Valeur changée, de 0 à 1.
	// (...)
	if(!flColor) colorId = 0; // Valeur changée, d'une incrémentation à une valeur fixe de 0.
	// (...)
}

// Les codes précédents peuvent être changés directement dans le fichier Flash avec le logiciel "JPEXS Free Flash Decompiler", en remplaçant chaque partie de code mentionnée avec l'un des P-codes ci-dessous.
// Du fait de l'offuscation, la méthode "onMessage" de la classe "Game" se nomme "+oD9l" dans le SWF.
// La méthode "new" de la classe "Cosmo" se nomme "9C5aA".
// La variable "colorId" se nomme " iFR-" (il y a bien un espace en début de chaîne).

// colorId = 1;
Push register1, " iFR-", 1
SetMember

// colorId = 0;
Push register1, " iFR-", 0
SetMember
