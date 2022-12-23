function Init_MMApi() {
	// Implémentation uniquement basée sur le code source des jeux CaféJeux publié par Motion Twin, le code de la classe "MMApi" n'ayant pas été rendu public.
	_global._mmQueue = []; _global._mmQueue.wait = 0;
	_global._mmInitMode = _global.fvIndex === 5;
	_global._mmTurnMode = _global.fvIndex === 7 || _global.fvIndex === 9;
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
		if(!_global._mmTurnMode || !JSCall("CJGame_PlayData", "locked")) {
			g[obfu["onTurnDone"]]();
			JSCall("CJGame_SendDataToOtherClients", data, true);
		} else {
			JSCall("CJGame_SendDataToAllClients", data, false);
		}
	};
	var gameOver = function() {
		// Affiche l'écran de fin de partie, selon le résultat (gagné, perdu ou nul). Le résultat est déterminé au préalable dans la fonction "victory".
		JSTrace("gameOver()");
	};
	var getOptions = function(mine) {
		// Détermine quelles options sont disponibles pour le joueur ("mine" == true) ou son adversaire ("mine" == false), dans les jeux Anticorp's et Magmax Battle.
		switch(_global.fvIndex) {
			case 4:
				// Magmax Battle.
				// Autorise toutes les cartes bonus.
				return [true, true, true];
			case 6:
				// Anticorp's.
				if(Math.random() >= 0.1) {
					// Autorise toutes les zones en option : parmi elles, une sera choisie aléatoirement par le jeu.
					return [true, true, true, true, true, true];
				} else {
					// La carte par défaut n'est jamais choisie si les deux joueurs possèdent au moins une zone optionnelle en commun, donc on créé cette situation où elle pourra être sélectionnée.
					return [];
				}
		}
	};
	var hasControl = function() {
		// Détermine si le client est un joueur (true) ou un spectateur (false).
		// Fonctionne souvent de pair avec la fonction "isMyTurn".
		return _global.fvPlayer !== 3;
	};
	var isMyTurn = function() {
		// Détermine si le client a la main.
		return JSCall("CJGame_PlayData", "turn") === _global.fvPlayer;
	};
	var isReconnecting = function() {
		// Détermine si le client est en train de se reconnecter au jeu (sur cafejeux.com, cela se produisait généralement en cas de perte de la connexion durant la partie).
		// Toujours "false" ici puisqu'il n'y a pas de vrai mode multijoueurs et donc pas de serveur de jeu.
		var v = false;
		if(v) {
			var obfu = Game_Obfuscation();
			_root.Game[obfu["onReconnectDone"]]();
		}
		return v;
	};
	var lockMessages = function(lock) {
		// Verrouille ou déverrouille la communication client <-> serveur de jeu.
		if(!isMyTurn()) { return; }
		// JSTrace("lockMessages() called (player / lock) :: " + _global.fvPlayer + " / " + lock);
		JSCall("CJGame_PlayData", ["locked", lock]);
		if(!lock && JSCall("CJGame_PlayData", "onTurnDone")) {
			JSCall("CJGame_PlayData", ["onTurnDone", false]);
			JSCall("CJGame_SendDataToAllClients", null, true);
		}
	};
	var logMessage = function(html) {
		// Ajoute un texte dans la section tchat de la page du jeu.
		JSCall("CJGame_LogMessage", [global.fvPlayer, html]);
	};
	var print = function() {
		// Existe en théorie mais n'est jamais présent dans le code compilé des jeux.
	};
	var queueMessage = function(data) {
		// Ajoute des données de jeu dans une pile (stack) qui ne seront envoyées que lorsque la fonction "sendQueue" sera appelée.
		// Uniquement utilisé dans Anticorp's.
		if(data !== null) {
			_global._mmQueue.push(data);
		}
		if(!_root.GameClip.onEnterFrame) {
			_root.GameClip.onEnterFrame = function() {
				var queue = _global._mmQueue;
				if(queue.wait > 0) {
					queue.wait--;
				} else if(_root._queueRequested) {
					if(queue.length > 0) {
						var data = queue.shift();
						if(data && data[2] instanceof Array) {
							queue.wait = queue.wait + data[2].length + 10;
						}
						sendMessage(data);
					}
					if(queue.length === 0) {
						// _root._queueRequested = false;
					}
				}
			};
		}
	};
	var sendMessage = function(data) {
		// Envoie les données de jeu passées en paramètre. Le joueur garde la main.
		// if(JSCall("CJGame_PlayData", "locked")) { return; }
		var obfu = Game_Obfuscation();
		if(typeof data === "object") {
			// JSTrace(data);
			data = JSCall("CJGame_Action", data);
		}
		_root.Game[obfu["onMessage"]](true, data);
		JSCall("CJGame_SendDataToOtherClients", data, null);
	};
	var sendQueue = function() {
		// Envoie les données de jeu précédemment ajoutées à la pile via les différents appels à la fonction "queueMessage".
		// Uniquement utilisé dans Anticorp's.
		_root._queueRequested = true;
		queueMessage(null);
	};
	var setColors = function(col1, col2) {
		// Affiche les couleurs de chaque joueur sur la page du jeu.
		// "col1" correspond toujours à la couleur du client qui a la main, "col2" à celle de son adversaire.
		JSCall("CJGame_SetColors", [_global.fvPlayer, col1, col2]);
	};
	var setInfos = function(html) {
		// Affiche un texte d'aide sur la page du jeu. Le message précédent est remplacé.
		JSCall("CJGame_SetInfos", [_global.fvPlayer, html]);
	};
	var victory = function(mine) {
		// La partie est terminée, le vainqueur est déterminé ici. L'appel à la fonction "gameOver" suit généralement peu de temps après.
		JSTrace("victory(" + mine + ")");
		var obfu = Game_Obfuscation();
		_root.Game[obfu["onVictory"]](mine);
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
		print: null,
		queueMessage: "] r3c",
		sendMessage: ",XIj,",
		sendQueue: "1dlZ]",
		setColors: "0UN5I",
		setInfos: "+*[ W",
		victory: "4[K{k"
	};
	var MMApi = null;
	for(var k in obfu) {
		var v = obfu[k];
		if(k === "MMApi") {
			MMApi = {};
			_global.MMApi = MMApi;
			_global[v] = MMApi;
		} else if(MMApi !== null) {
			if(v !== null) {
				MMApi[k] = eval(k);
				MMApi[v] = eval(k);
			}
		} else {
			JSTrace("Erreur dans Init_MMApi()");
			break;
		}
	}
}

function Init_MMGame() {}

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
	switch(func) {
		case "CJGame_Action":
			data = [_global.fvIndex, _global.fvPlayer, data];
			break;
		case "CJGame_SendDataToOtherClients":
			data = [_global.fvPlayer, data, arg2];
			break;
		case "CJGame_SendDataToAllClients":
			data = [-1, data, arg2];
			break;
	}
	return flash.external.ExternalInterface.call(func, data);
}

function JSSend(data, turnDone) {
	// Cette fonction peut être appelée en JavaScript : "client.JS_to_AS(args)".
	var obfu = Game_Obfuscation();
	if(data !== null) {
		_root.Game[obfu["onMessage"]](false, data);
	}
	if(turnDone) {
		_root.Game[obfu["onTurnDone"]]();
	}
}

_global.JSTrace = JSTrace;
_global.JSCall = JSCall;
_global.JSSend = JSSend;

_global.fvSwf = _root.fvSwf;
_global.fvIndex = Number(_root.fvIndex);
_global.fvPlayer = Number(_root.fvPlayer);

LoadGame();

_root.onEnterFrame = function() {
	var obfu = Game_Obfuscation();
	var gc = _root.GameClip;
	var g = _root.Game;
	if(!g) {
		var loaded = gc.getBytesLoaded();
		var total = gc.getBytesTotal();
		if(total && loaded >= total) {
			// Le premier SWF est toujours celui du joueur qui débutera la partie dans cette implémentation, on s'assure donc qu'il soit chargé et exécuté le premier.
			if(JSCall("CJGame_IsPreviousClientLoaded", _global.fvPlayer)) {
				Init_HaxePolyfillsPost(gc);
				Init_MMApi();
				Init_MMGame();
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
