function Init_MMApi() {
	// Implémentation uniquement basée sur le code source des jeux CaféJeux publié par Motion Twin, le code de la classe "MMApi" n'ayant pas été rendu public.
	_global._mmHasWon = -1;
	_global._mmSendToQueue = false;
	_global._mmQueue = []; _global._mmQueue.wait = 0; _global._mmQueue.requested = false;
	_global._mmInitMode = _global.fvIndex === 5;
	_global._mmAdvancedTurnMode = _global.fvIndex === 3 || _global.fvIndex === 5 || _global.fvIndex === 7 || _global.fvIndex === 9 || _global.fvIndex === 12;
	var endTurn = function(data) {
		// Termine le tour avec les données de jeu en paramètre (optionnel) et passe la main à l'adversaire.
		if(!isMyTurn()) { return; }
		var g = _root.Game;
		var obfu = Game_Obfuscation();
		if(typeof data === "object") {
			// JSTrace(data);
			data = JSCall("CJGame_Action", data);
			g[obfu["onMessage"]](true, data);
		} else {
			data = null;
		}
		JSCall("CJGame_PlayData", ["turn", 1 + (JSCall("CJGame_PlayData", "turn") % 2)]);
		if(!_global._mmAdvancedTurnMode || !JSCall("CJGame_PlayData", "locked")) {
			g[obfu["onTurnDone"]]();
			JSCall("CJGame_SendDataToOtherClients", data, true);
		} else {
			JSCall("CJGame_SendDataToAllClients", data, false);
		}
	};
	var gameOver = function() {
		// Affiche l'écran de fin de partie, selon le résultat (gagné, perdu ou nul). Le résultat est déterminé au préalable dans la fonction "victory".
		if(_global._mmHasWon !== -1) {
			// On écrase cette fonction dans "MMApi" pout être certain qu'elle ne sera appelée qu'une seule fois.
			_global["}-VbH"]["7T4cF("] = function() {};
			var timeOver = JSCall("CJGame_PlayData", "timeOver");
			var delay = 1000;
			if(timeOver) {
				delay = 0;
			}
			setTimeout(function(timeOver) {
				var str;
				var obfu = Game_Obfuscation();
				_root.Game[obfu["main"]] = function() {};
				if(_global.fvUnique || _global.fvPlayer === 3) {
					var winner = JSCall("CJGame_PlayData", "winner");
					JSCall("CJGame_Over", winner);
					str = "FIN DE PARTIE !\n";
					if(winner === null) {
						str = str + "Aucun joueur n'a pu être départagé.";
					} else {
						var loser = winner === 1 ? 2 : 1;
						var winnerName = _global["fvName" + winner];
						var loserName = _global["fvName" + loser];
						if(!timeOver) {
							str = str + winnerName + " a vaincu " + loserName + " !";
						} else {
							str = str + loserName + " a épuisé tout son temps !\n" + winnerName + " remporte la partie !";
						}
					}
				} else {
					JSCall("CJGame_Over", null);
					switch(_global._mmHasWon) {
						case true:
							str = "VICTOIRE !\nVous avez vaincu votre adversaire !";
							break;
						case false:
							str = "PERDU !\nVous avez été vaincu !";
							break;
						case null:
							str = "ÉGALITÉ !\nAucun joueur n'a pu être départagé.";
							break;
					}
				}
				// Appelle la fonction "trace" de haXe pour afficher le résultat à l'écran.
				// Simpliste mais suffisant pour le moment.
				_global[" D(1"]["]{i"]["-[Ra6"](str, "__end__");
			}, delay, timeOver);
		}
	};
	var getOptions = function(mine) {
		// Détermine quelles options sont disponibles pour le joueur ("mine" == true) ou son adversaire ("mine" == false), dans les jeux Anticorp's et Magmax Battle.
		var defaultOptions;
		switch(_global.fvIndex) {
			case 4:
				// Magmax Battle.
				// Autorise toutes les cartes bonus. Si une carte bonus est disponible pour un joueur, elle pourra l'être également pour son adversaire (le jeu fonctionne ainsi).
				_root.GameClip["44{N"][")=R;3"] = false;
				defaultOptions = [true, true, true];
				break;
			case 6:
				// Anticorp's.
				if(Math.random() >= 0.1) {
					// Autorise toutes les zones en option : parmi elles, une sera choisie aléatoirement par le jeu.
					defaultOptions = [true, true, true, true, true, true];
				} else {
					// La zone par défaut n'est jamais choisie si les deux joueurs possèdent au moins une carte optionnelle en commun, donc on créé cette situation où elle pourra être sélectionnée.
					defaultOptions = [false, false, false, false, false, false];
				}
				break;
			default:
				defaultOptions = [];
				break;
		}
		if(_global.fvOptions === "null") {
			return defaultOptions;
		} else {
			var playerOptions = _global.fvOptions.split(",");
			if(playerOptions.length !== defaultOptions.length) {
				playerOptions.length = defaultOptions.length;
			}
			var i = 0;
			for(; i < playerOptions.length; i++) {
				playerOptions[i] = !!Number(playerOptions[i]);
			}
			return playerOptions;
		}
	};
	var hasControl = function() {
		// Détermine si le client est un joueur (true) ou un spectateur (false).
		// Fonctionne souvent de pair avec la fonction "isMyTurn".
		var special = true;
		if(_global.fvIndex === 3) {
			// Crumble : Hack pour éviter un léger bug d'affichage sur l'écran de l'adversaire quand le tour vient d'être joué.
			special = !(JSCall("CJGame_PlayData", "locked") && JSCall("CJGame_PlayData", "lastAction") >= 3);
		}
		return _global.fvPlayer !== 3 && special;
	};
	var isMyTurn = function() {
		// Détermine si le client a la main.
		return _global._mmHasWon === -1 && JSCall("CJGame_PlayData", "turn") === _global.fvPlayer;
	};
	var isReconnecting = function() {
		// Détermine si le client est en train de se reconnecter au jeu (sur cafejeux.com, cela se produisait généralement en cas de perte de la connexion durant la partie).
		// Toujours "false" ici puisqu'il n'y a pas de vrai mode multijoueurs et donc pas de serveur de jeu.
		// Hack pour Trigolo : Quand le tour vient d'être joué, la carte ne se déplace pas jusqu'à la case sélectionnée pour une raison inconnue, rendant le jeu inutilisable.
		// Le placement direct de la carte sur le plateau, donc sans aucune animation préalable, empêche le bug de se produire : cette fonction doit pour cela renvoyer "true" dans cette situation.
		var v = _global.fvIndex === 9;
		if(v) {
			// var obfu = Game_Obfuscation();
			// _root.Game[obfu["onReconnectDone"]]();
			// step == Step.View
			v = _root.Game["=kIA"] == _root.GameClip[")qF["][";31a"];
		}
		return v;
	};
	var lockMessages = function(lock) {
		// Verrouille ou déverrouille la communication client <-> serveur de jeu.
		if(!isMyTurn()) { return; }
		// JSTrace("lockMessages() called (player / lock) :: " + _global.fvPlayer + " / " + lock);
		JSCall("CJGame_PlayData", ["locked", lock]);
		if(!lock && JSCall("CJGame_PlayData", "turnDone") !== null) {
			JSCall("CJGame_SendDataToAllClients", null, true);
			JSCall("CJGame_PlayData", ["turnDone", null]);
		}
	};
	var logMessage = function(html) {
		// Ajoute un texte dans la section tchat de la page du jeu.
		JSCall("CJGame_LogMessage", [_global.fvPlayer, html]);
	};
	var print = function(str) {
		// Fonction utilisée durant la phase de développement mais jamais présente dans le code final compilé, sauf pour le prototype de Anticorp's.
		if(!_global.fvDebug) { return; }
		JSTrace(str);
	};
	var queueMessage = function(data) {
		// Ajoute des données de jeu dans une pile (stack) qui ne seront envoyées que lorsque la fonction "sendQueue" sera appelée.
		// Uniquement utilisé dans Anticorp's.
		if(data !== null) {
			_global._mmQueue.push(data);
		}
		if(!_root.GameClip.onEnterFrame) {
			_global._mmSendToQueue = true;
			_root.GameClip.onEnterFrame = function() {
				var queue = _global._mmQueue;
				if(queue.wait > 0) {
					queue.wait--;
				} else if(_global._mmQueue.requested) {
					if(queue.length > 0) {
						var data = queue.shift();
						if(data && data[2] instanceof Array) {
							queue.wait = queue.wait + data[2].length + 10;
						}
						_global._mmSendToQueue = false;
						sendMessage(data);
						_global._mmSendToQueue = true;
					}
					if(queue.length === 0) {
						// _global._mmQueue.requested = false;
					}
				}
			};
		}
	};
	var sendMessage = function(data) {
		// Envoie les données de jeu passées en paramètre. Le joueur garde la main.
		// if(JSCall("CJGame_PlayData", "locked")) { return; }
		if(_global._mmSendToQueue && _global._mmQueue.length > 0) {
			queueMessage(data);
		} else {
			var obfu = Game_Obfuscation();
			if(typeof data === "object") {
				// JSTrace(data);
				data = JSCall("CJGame_Action", data);
			}
			_root.Game[obfu["onMessage"]](true, data);
			JSCall("CJGame_SendDataToOtherClients", data, null);
		}
	};
	var sendQueue = function() {
		// Envoie les données de jeu précédemment ajoutées à la pile via les différents appels à la fonction "queueMessage".
		// Uniquement utilisé dans Anticorp's.
		_global._mmQueue.requested = true;
		queueMessage(null);
	};
	var setColors = function(col1, col2) {
		// Affiche les couleurs de chaque joueur sur la page du jeu.
		// "col1" correspond toujours à la couleur du client qui a la main, "col2" à celle de son adversaire.
		JSCall("CJGame_SetColors", [_global.fvPlayer, col1, col2]);
	};
	var setInfos = function(html) {
		// Affiche un texte d'informations sur la page du jeu. Le message précédent est remplacé.
		JSCall("CJGame_SetInfos", [_global.fvPlayer, html]);
	};
	var victory = function(mine) {
		// La partie est terminée, le vainqueur est déterminé ici. L'appel à la fonction "gameOver" suit généralement peu de temps après.
		// JSTrace("victory(" + mine + ")");
		if(mine && _global.fvPlayer !== 3) {
			JSCall("CJGame_PlayData", ["winner", _global.fvPlayer]);
		}
		_global._mmHasWon = mine;
		var obfu = Game_Obfuscation();
		_root.Game[obfu["onVictory"]](mine);
	};
	var _getSeeds = function() {
		// Cette fonction est spécifique à Magmax Battle dont le code source n'a pas été communiqué. Le nom de cette fonction devrait donc sans doute être différent.
		// Elle permet la génération de noms différents pour les personnages des deux joueurs.
		var seeds = JSCall("CJGame_PlayData", "seeds");
		var obj = {};
		obj["2jI2"] = _global.fvPlayer !== 2;
		obj["]D+;"] = seeds[0];
		obj["=n);"] = seeds[1];
		return obj;
	};
	var obfu = {
		MMApi: "}-VbH",
		endTurn: ";ptpb",
		gameOver: "7T4cF(",
		getOptions: "3qzMs",
		hasControl: "+4Z+[",
		isMyTurn: "4mok0",
		isReconnecting: "9UeAW",
		lockMessages: "5nwDR",
		logMessage: "-v*N((",
		print: "0oxy3",
		queueMessage: "] r3c",
		sendMessage: ",XIj,",
		sendQueue: "1dlZ]",
		setColors: "0UN5I",
		setInfos: "+*[ W",
		victory: "4[K{k",
		_getSeeds: "9{3Mr"
	};
	var MMApi = null;
	for(var k in obfu) {
		var v = obfu[k];
		if(k === "MMApi") {
			MMApi = {};
			_global[v] = MMApi;
		} else if(MMApi !== null) {
			if(v !== null) {
				MMApi[v] = eval(k);
			}
		} else {
			JSTrace("Erreur dans Init_MMApi()");
			break;
		}
	}
}

function Init_DepthManager() {
	// Implémentation complète basée sur le code source de la classe "DepthManager" publié par Motion Twin.
	var DepthManager = function(mc) {
		this.INST_COUNTER = 0;
		this.root_mc = mc;
		this.plans = [];
	};
	DepthManager.prototype.getPlan = function(pnb) {
		// Fonction interne.
		var planData = this.plans[pnb];
		if(planData == null) {
			planData = { tbl:[], cur:0 };
			this.plans[pnb] = planData;
		}
		return planData;
	};
	DepthManager.prototype.getMC = function() {
		return this.root_mc;
	};
	DepthManager.prototype.compact = function(plan) {
		var planData = this.plans[plan];
		var p = planData.tbl;
		var cur = 0;
		var base = plan * 1000;
		var i = 0;
		for(; i < planData.cur; i++) {
			if(p[i]._name != null) {
				p[i].swapDepths(base + cur);
				p[cur] = p[i];
				cur++;
			}
		}
		planData.cur = cur;
	};
	DepthManager.prototype.attach = function(inst, plan) {
		var planData = this.getPlan(plan);
		var p = planData.tbl;
		var d = planData.cur;
		if(d == 1000) {
			this.compact(plan);
			return this.attach(inst, plan);
		}
		this.INST_COUNTER++;
		var iname = inst + "@" + this.INST_COUNTER;
		var mc = this.root_mc.attachMovie(inst, iname, d + plan * 1000, null);
		p[d] = mc;
		planData.cur = d + 1;
		return mc;
	};
	DepthManager.prototype.attachBitmap = function(bmp, plan) {
		var planData = this.getPlan(plan);
		var p = planData.tbl;
		var d = planData.cur;
		if(d == 1000) {
			this.compact(plan);
			this.attachBitmap(bmp, plan);
			return;
		}
		this.root_mc.attachBitmap(bmp, d + plan * 1000);
		p[d] = null;
		planData.cur = d + 1;
	};
	DepthManager.prototype.empty = function(plan) {
		var planData = this.getPlan(plan);
		var p = planData.tbl;
		var d = planData.cur;
		if(d == 1000) {
			this.compact(plan);
			return this.empty(plan);
		}
		this.INST_COUNTER++;
		var iname = "empty@" + this.INST_COUNTER;
		var mc = this.root_mc.createEmptyMovieClip(iname, d + plan * 1000);
		p[d] = mc;
		planData.cur = d + 1;
		return mc;
	};
	DepthManager.prototype.reserve = function(mc, plan) {
		var planData = this.getPlan(plan);
		var p = planData.tbl;
		var d = planData.cur;
		if(d == 1000) {
			this.compact(plan);
			return this.reserve(mc, plan);
		}
		p[d] = mc;
		planData.cur = d + 1;
		return d + plan * 1000;
	};
	DepthManager.prototype.swap = function(mc, plan) {
		var srcPlan = Math.floor(mc.getDepth() / 1000);
		if(srcPlan == plan) {
			return;
		}
		var planData = this.getPlan(srcPlan);
		var p = planData.tbl;
		var i = 0;
		for(; i < planData.cur; i++) {
			if(p[i] == mc) {
				p[i] = null;
				break;
			}
		}
		mc.swapDepths(this.reserve(mc, plan));
	};
	DepthManager.prototype.under = function(mc) {
		var d = mc.getDepth();
		var plan = Math.floor(d / 1000);
		var planData = this.getPlan(plan);
		var p = planData.tbl;
		var pd = d % 1000;
		if(p[pd] == mc) {
			p[pd] = null;
			p.unshift(mc);
			planData.cur++;
			this.compact(plan);
		}
	};
	DepthManager.prototype.over = function(mc) {
		var d = mc.getDepth();
		var plan = Math.floor(d / 1000);
		var planData = this.getPlan(plan);
		var p = planData.tbl;
		var pd = d % 1000;
		if(p[pd] == mc) {
			p[pd] = null;
			if(planData.cur == 1000) {
				this.compact(plan);
			}
			d = planData.cur;
			planData.cur++;
			mc.swapDepths(d + plan * 1000);
			p[d] = mc;
		}
	};
	DepthManager.prototype.clear = function(plan) {
		var planData = this.getPlan(plan);
		var p = planData.tbl;
		var i = 0;
		for(; i < planData.cur; i++) {
			p[i].removeMovieClip();
		}
		planData.cur = 0;
	};
	DepthManager.prototype.ysort = function(plan) {
		var planData = this.getPlan(plan);
		var p = planData.tbl;
		var len = planData.cur;
		var y = -99999999;
		var i = 0;
		for(; i < len; i++) {
			var mc = p[i];
			var mcy = mc._y;
			if(mcy >= y) {
				y = mcy;
			} else {
				var j = i;
				while(j > 0) {
					var mc2 = p[j - 1];
					if(mc2._y > mcy) {
						p[j] = mc2;
						mc.swapDepths(mc2);
					} else {
						p[j] = mc;
						break;
					}
					j--;
				}
				if(j == 0) {
					p[0] = mc;
				}
			}
		}
	};
	DepthManager.prototype.destroy = function() {
		var i = 0;
		for(; i < this.plans.length; i++) {
			this.clear(i);
		}
	};
	var obfu = {
		attach: "*=_p_",
		attachBitmap: ";_dAm",
		clear: "+tq5)",
		compact: "]bu40",
		destroy: ",}2X (",
		empty: "18wU*",
		getMC: "]1sj+",
		over: "08M8",
		reserve: "(GbB}",
		swap: "+2NA",
		under: "}oQA7",
		ysort: "9(K ;"
	};
	for(var k in obfu) {
		var v = obfu[k];
		if(v !== null) {
			DepthManager.prototype[v] = DepthManager.prototype[k];
		}
	}
	// mt.DepthManager
	if(!_global["9K"]) { _global["9K"] = {}; }
	_global["9K"]["+7U K"] = DepthManager;
}

function Init_OldRandSeed() {
	// Implémentation complète basée sur le code source de la classe "OldRandSeed" publié par Motion Twin.
	var OldRandSeed = function(seed) {
		if(seed == null) {
			seed = 0;
		}
		this.idx = 0;
		this.vals = [];
		var i = 0;
		for(; i < 55; i++) {
			// Std.int()
			seed = _global["3Wt"]["9n6"](seed * 1103515245.0) & 0x3FFFFFFF;
			seed += 12345;
			seed &= 0x3FFFFFFF;
			this.vals.push(seed);
		}
	};
	OldRandSeed.prototype.int = function() {
		this.idx = (this.idx + 1) % 55;
		var v = (this.vals[(this.idx + 24) % 55] + this.idx) & 0x3FFFFFFF;
		this.vals[this.idx] = v;
		return v;
	};
	OldRandSeed.prototype.random = function(max) {
		return this.int() % max;
	};
	OldRandSeed.prototype.rand = function() {
		return this.int() / 1073741824.0;
	};
	var obfu = {
		int: "9n6",
		rand: "*s};",
		random: "random"
	};
	for(var k in obfu) {
		var v = obfu[k];
		if(v !== null) {
			OldRandSeed.prototype[v] = OldRandSeed.prototype[k];
		}
	}
	// mt.OldRandSeed
	if(!_global["9K"]) { _global["9K"] = {}; }
	_global["9K"]["6Nqp+("] = OldRandSeed;
}

function Init_Timer() {
	// Implémentation partielle mais suffisante de la classe "Timer" dont le code source n'a pas été rendu public par Motion Twin.
	var Timer = function() {};
	// Variable publique : tmod
	Timer["-V;B"] = 1;
	// mt.Timer
	if(!_global["9K"]) { _global["9K"] = {}; }
	_global["9K"]["{-kxL"] = Timer;
}

function Init_Std() {
	// Implémentation partielle mais suffisante de la classe "Std" de haXe.
	var int = function(n) {
		if(n < 0) {
			return Math.ceil(n);
		}
		return Math.floor(n);
	};
	var random = function(n) {
		return random(n);
	};
	var string = function(s) {
		// Cette méthode est théoriquement plus complexe... mais on peut heureusement s'en passer.
		return String(s);
	};
	var obfu = {
		Std: "3Wt",
		int: "9n6",
		random: "random",
		string: "+_PpF"
	};
	var Std = null;
	for(var k in obfu) {
		var v = obfu[k];
		if(k === "Std") {
			Std = {};
			_global[v] = Std;
		} else if(Std !== null) {
			if(v !== null) {
				Std[v] = eval(k);
			}
		} else {
			JSTrace("Erreur dans Init_Std()");
			break;
		}
	}
}

function Init_HaxePolyfillsPre() {
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(pos, item) {
		this.splice(pos, 0, item);
	};
	Array.prototype.remove = function(data) {
		var start = 0;
		var length = this.length;
		while(start < length) {
			if(this[start] == data) {
				this.splice(start, 1);
				return true;
			}
			start = start + 1;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		var obj = {};
		obj["7-,"] = 0;
		obj["=()"] = this;
		obj["1ll a"] = function() {
			return this["7-,"] < this["=()"].length;
		};
		obj["7Y-7"] = function() {
			var i = this["7-,"];
			this["7-,"] = i + 1;
			return this["=()"][i];
		};
		return obj;
	};
	_global.ASSetPropFlags(Array.prototype, null, 7);
	Math.NaN = Number.NaN;
	Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
	Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
	Math.isFinite = function(n) {
		return _global.isFinite(n);
	};
	Math.isNaN = function(n) {
		return _global.isNaN(n);
	};
	var cCodeAt = String.prototype.charCodeAt;
	String.prototype.cca = cCodeAt;
	String.prototype.charCodeAt = function(index) {
		var code = this.cca(index);
		if(code <= 0) {
			return null;
		}
		return code;
	};
	_global["]6=8H("] = function(arg0, arg1) {
		var var0 = arg1[arg0];
		if(var0 == null) {
			return null;
		}
		var var1 = function() {
			var arg0 = arguments.callee;
			return arg0.f.apply(arg0.o, arguments);
		};
		var1.f = var0;
		var1.o = arg1;
		return var1;
	};
	if(!_global.flash) { _global.flash = {}; }
	if(!_global.flash.LoadVars) { _global.flash.LoadVars = _global.LoadVars; }
	if(!_global.flash.LocalConnection) { _global.flash.LocalConnection = _global.LocalConnection; }
	if(!_global.flash.MovieClipLoader) { _global.flash.MovieClipLoader = _global.MovieClipLoader; }
	if(!_global.flash.Stage) { _global.flash.Stage = _global.Stage; }
	if(!_global.flash.TextFormat) { _global.flash.TextFormat = _global.TextFormat; }
	if(!_global.flash.TextSnapshot) { _global.flash.TextSnapshot = _global.TextSnapshot; }
	_global[" D(1"] = {};
	_global[" D(1"]["]{i"] = {};
	_global[" D(1"]["]{i"]["-[Ra6"] = function(msg, fileInfo) {
		// Réimplémentation simplifiée de la fonction "trace" de haXe, avec possibilité de la rendre inopérante via les FlashVars.
		// Actuellement, elle est également utilisée pour afficher le résultat en fin de partie.
		if(fileInfo !== "__end__" && (!_global.fvDebug || _global.fvIndex === 1)) { return; }
		var gc = _root.GameClip;
		var gttc = gc.__trace_txt;
		if(!gttc || fileInfo === "__end__") {
			gc.createTextField("__trace_txt", 1048500, 0, 0, flash.Stage.width, flash.Stage.height + 30);
			gttc = gc.__trace_txt;
			gttc.selectable = false;
			gttc.__trace_lines = [];
		}
		var data = "";
		if(typeof fileInfo == "object") {
			data = data + fileInfo.fileName + (fileInfo.lineNumber != null ? ":" + fileInfo.lineNumber : "") + ": ";
		}
		data = data + String(msg);
		data = gttc.__trace_lines.concat(data.split("\n"));
		gttc.text = data.join("\n");
		while(gttc.textHeight > flash.Stage.height) {
			data.shift();
			gttc.text = data.join("\n");
		}
		gttc.__trace_lines = data;
	};
}

function Init_HaxePolyfillsPost(clip) {
	if(!clip["[8X6+"]) { clip["[8X6+"] = {}; }
	if(!clip["[8X6+"]["1ni"]) { clip["[8X6+"]["1ni"] = {}; }
	if(!clip["[8X6+"]["1ni"]["_global"]) { clip["[8X6+"]["1ni"]["_global"] = _global; }
	if(!clip["[8X6+"]["1ni"]["_root"]) { clip["[8X6+"]["1ni"]["_root"] = _root; }
}

function LoadGame() {
	Init_Std();
	Init_HaxePolyfillsPre();
	Init_Timer();
	Init_DepthManager();
	Init_OldRandSeed();
	_root.createEmptyMovieClip("GameClip", _root.getNextHighestDepth());
	_root.GameClip.loadMovie(_global.fvSwf);
}

function Game_Obfuscation() {
	// La classe "Game" et ses différentes méthodes sont spécifiques à chaque jeu mais sont toujours appelées par le fichier loader (MMApi).
	var obj = {
		Game: "44{N",
		initialize: ";6aj0(",
		main: "0D 6",
		onMessage: "+oD9l",
		onReconnectDone: "{+Sn=",
		onTurnDone: "4fHu{",
		onVictory: "8Z[e,("
	};
	if(_global.fvIndex === 13) {
		// "1nTw,(" = "message". Utilisé par le prototype de Anticorp's qui semble dépendre d'une ancienne version du loader.
		obj["onMessage"] = "1nTw,(";
	}
	return obj;
}

function Game_Hacks(data, step) {
	if(_global.fvIndex === 3 && typeof data === "object" && typeof data[2] === "object") {
		// Crumble, quand une flèche de déplacement est cliquée.
		// data[2] est un tableau mais définit également des propriétés comme un objet standard. Ces propriétés ne sont pas envoyées à JavaScript - parce que c'est un tableau -, ce qui empêche le jeu de fonctionner.
		// Pour contourner le problème, il faut donc intervenir à l'envoi et à la réception des données.
		var gc = _root.GameClip;
		// Enum "Direction" : Up, Down, Left, Right.
		var directions = [gc["[sx1E"]["{J("], gc["[sx1E"]["}]AL"], gc["[sx1E"]["*H*T"], gc["[sx1E"]["=im[K"]];
		if(step === 0) {
			var i = 0;
			for(; i < directions.length; i++) {
				if(directions[i] === data[2]) {
					break;
				}
			}
			data[2] = [i];
		} else {
			data[2] = directions[data[2][0]];
		}
	}
}

function JSTrace(str) {
	// Affiche un message dans la console du navigateur.
	if(typeof str === "object") {
		var temp = "";
		var i = 0;
		for(var k in str) {
			if(i > 0) { temp = temp + ","; }
			temp = temp + k + ':"' + str[k] + '"';
			i++;
		}
		str = temp;
	} else {
		str = String(str);
	}
	flash.external.ExternalInterface.call("console.log", str);
}

function JSCall(func, data, arg2) {
	// Appelle une fonction JavaScript avec différents arguments.
	Game_Hacks(data, 0);
	switch(func) {
		case "CJGame_Action":
			data = [_global.fvIndex, _global.fvPlayer, data];
			break;
		case "CJGame_SendDataToOtherClients":
		case "CJGame_SendDataToAllClients":
			data = [_global.fvPlayer, data, arg2];
			break;
	}
	var ret = flash.external.ExternalInterface.call(func, data);
	Game_Hacks(ret, 1);
	return ret;
}

function JSSend(data, turnDone, fromPlayer) {
	// Cette fonction peut être appelée en JavaScript : "client.JS_to_AS(args)".
	var obfu = Game_Obfuscation();
	if(typeof data === "object" && data[0] === "timeover") {
		// Cas spécial : Fin de partie par manque de temps, la fonction "MMApi.gameOver()" est appelée tout de suite.
		_global._mmHasWon = data[1] === _global.fvPlayer;
		_global["}-VbH"]["7T4cF("]();
		return;
	}
	if(data !== null && fromPlayer !== _global.fvPlayer) {
		Game_Hacks(data, 1);
		_root.Game[obfu["onMessage"]](false, data);
	}
	if(turnDone) {
		if(!_global._mmAdvancedTurnMode) {
			_root.Game[obfu["onTurnDone"]]();
		} else {
			setTimeout(function(obfu) {
				_root.Game[obfu["onTurnDone"]]();
			}, 100, obfu);
		}
	}
}

_global.JSTrace = JSTrace;
_global.JSCall = JSCall;
_global.JSSend = JSSend;

_global.fvSwf = String(_root.fvSwf);
_global.fvName1 = String(_root.fvName1);
_global.fvName2 = String(_root.fvName2);
_global.fvOptions = String(_root.fvOptions);
_global.fvIndex = Number(_root.fvIndex);
_global.fvPlayer = Number(_root.fvPlayer);
_global.fvUnique = !!Number(_root.fvUnique);
_global.fvDebug = !!Number(_root.fvDebug);

LoadGame();

_root.onEnterFrame = function() {
	var obfu = Game_Obfuscation();
	var g = _root.Game;
	if(!g) {
		var gc = _root.GameClip;
		var loaded = gc.getBytesLoaded();
		var total = gc.getBytesTotal();
		if(total && loaded >= total) {
			// Le premier SWF est toujours celui du joueur qui débutera la partie dans cette implémentation, on s'assure donc qu'il soit chargé et exécuté le premier.
			if(JSCall("CJGame_IsPreviousClientLoaded", _global.fvPlayer)) {
				Init_HaxePolyfillsPost(gc);
				Init_MMApi();
				flash.external.ExternalInterface.addCallback("JS_to_AS", null, JSSend);
				_root.Game = new gc[obfu["Game"]](gc);
				g = _root.Game;
				var data = g[obfu["initialize"]]();
				data = JSCall("CJGame_Action", data);
				g[obfu["onMessage"]]((_global.fvPlayer === 1), data);
				g[obfu["main"]]();
				if(_global._mmInitMode) { g[obfu["onTurnDone"]](); }
			}
		}
	} else {
		g[obfu["main"]]();
	}
};
