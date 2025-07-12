// UTOPIZ 1.0
// Retranscription du code source du jeu publié par Motion Twin, de haXe vers ActionScript 2.
// https://github.com/motion-twin/WebGamesArchives/tree/main/CafeJeux/games/utopiz/
// Le développement du jeu n'a jamais été terminé, il n'y a ni objectif ni fin en l'état actuel.
// Au niveau graphique, en revanche, de nombreuses ressources existent et sont inexploitées.
// Cela donne ainsi la possibilité de continuer le développement afin de faire un jeu complet...


/* Réimplémentations */

function Utopiz_RunWithObfuscation(name, arg1, arg2, arg3) {
	switch(name) {
		case "MMApi.endTurn":
			return _global["}-VbH"][";ptpb"](arg1);
		case "MMApi.gameOver":
			return _global["}-VbH"]["7T4cF("]();
		case "MMApi.hasControl":
			return _global["}-VbH"]["+4Z+["]();
		case "MMApi.isMyTurn":
			return _global["}-VbH"]["4mok0"]();
		case "MMApi.isReconnecting":
			return _global["}-VbH"]["9UeAW"]();
		case "MMApi.lockMessages":
			return _global["}-VbH"]["5nwDR"](arg1);
		case "MMApi.sendMessage":
			return _global["}-VbH"][",XIj,"](arg1);
		case "MMApi.setColors":
			return _global["}-VbH"]["0UN5I"](arg1, arg2);
		case "MMApi.setInfos":
			return _global["}-VbH"]["+*[ W"](arg1);
		case "MMApi.victory":
			return _global["}-VbH"]["4[K{k"](arg1);

		case "mt.DepthManager":
			return new _global["9K"]["+7U K"](arg1);
		case "mt.DepthManager.attach":
			return arg1["*=_p_"](arg2, arg3);
		case "mt.DepthManager.over":
			return arg1["08M8"](arg2);

		case "mt.Timer.tmod":
			return _global["9K"]["{-kxL"]["-V;B"];
	}

	return null;
}

// Classe "List" (partielle et simplifiée) de haXe.
function List() {
	this.array = [];
	this.length = 0;
}
List.prototype.add = function(element) {
	this.array.push(element);
	this.length = this.array.length;
};
List.prototype.push = function(element) {
	this.array.unshift(element);
	this.length = this.array.length;
};
List.prototype.last = function() {
	if(this.array.length > 0) {
		return this.array[this.array.length - 1];
	} else {
		return null;
	}
};
List.prototype.remove = function(element) {
	var newArray = [];
	var removed = false;
	var i = 0;
	for(; i < this.array.length; i++) {
		var e = this.array[i];
		if(!removed && e === element) {
			removed = true;
		} else {
			newArray.push(e);
		}
	}
	if(removed) {
		this.array = newArray;
		this.length = this.array.length;
	}
	return removed;
};


/* Common.hx */

var Msg = {
	Init: function(b) { return ["Init", 0, b]; }, // "b" = Bool
	AddBlock: function(type, bottom) { return ["AddBlock", 1, type, bottom]; }, // "type" = BlockType, "bottom" = Bool
	EndBlock: function(type, bottom) { return ["EndBlock", 2, type, bottom]; }  // "type" = BlockType, "bottom" = Bool
};
var BlockType = {
	BAttack: function() { return ["BAttack", 0]; },
	BDefense: function() { return ["BDefense", 1]; },
	BBuilder: function() { return ["BBuilder", 2]; },
	BSupply: function() { return ["BSupply", 3]; }
};

var Const = {
	WIDTH: 300,
	XSCALE: 100.0,
	YSCALE: 100.0,
	BLOCK_HEIGHT: 24,
	MAXTURNS: 6,
	DP_BG: 0,	
	DP_BLOCK: 1,
	DP_CHOICEBAR: 2,
	TURN_TOKENS: 2,
	TURN_ACTIONS: 1,
	COLOR1: 0xF5CB23,
	COLOR2: 0xC66C31,
	getType: function(t) { // Méthode inutilisée
		switch(t) {
			case 0: return BlockType.BAttack();
			case 1: return BlockType.BDefense();
			case 2: return BlockType.BBuilder();
			case 3: return BlockType.BSupply();
		}
		return null;
	}
};


/* Game.hx */

this["44{N"] = function(base) { // classe "Game" |||| "base" = flash.MovieClip
	this.dm = undefined; // mt.DepthManager
	this.anim = undefined; // List<Anim>
	this.team = undefined; // Bool
	this.root = undefined; // flash.MovieClip
	this.sky = undefined; // flash.MovieClip
	this.ground = undefined; // flash.MovieClip
	this.hill = undefined; // flash.MovieClip
	this.myTower = undefined; // Tower
	this.oppTower = undefined; // Tower
	this.leftBase = undefined; // flash.MovieClip
	this.rightBase = undefined; // flash.MovieClip
	this.choiceBar = undefined; // ChoiceBar
	this.maxTurns = undefined; // Int
	this.currentTurn = undefined; // Int
	this._new(base);
}
this["44{N"].prototype._new = function(base) { // "base" = flash.MovieClip
	this.anim = new List();
	this.dm = Utopiz_RunWithObfuscation("mt.DepthManager", base);
	this.maxTurns = Const.MAXTURNS;
	this.currentTurn = 1;

	this.sky = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.dm, "UIGame", Const.DP_BG);
	this.sky._xscale = Const.WIDTH / this.sky._width * 100;
	this.sky._yscale = Const.WIDTH / this.sky._height * 100;
	Const.XSCALE = this.sky._xscale;
	Const.YSCALE = this.sky._yscale;

	this.hill = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.dm, "colline", Const.DP_BG);
	this.hill._xscale = Const.XSCALE;
	this.hill._yscale = Const.YSCALE;
	this.hill._y = Const.WIDTH - this.hill._height;

	this.ground = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.dm, "ground", Const.DP_BG);
	this.ground._xscale = Const.XSCALE;
	this.ground._yscale = Const.YSCALE;
	this.ground._y = 94;

	this.choiceBar = new ChoiceBar(this);

	Utopiz_RunWithObfuscation("MMApi.lockMessages", false);
};
this["44{N"].prototype[";6aj0("] = function() { // initialize
	return Msg.Init(true);
};
this["44{N"].prototype["0D 6"] = function() { // main
	if(this.anim.length > 0) {
		var removedAnim = [];
		for(var i in this.anim.array) {
			var a = this.anim.array[i];
			if(a.play()) {
				a.onEnd();
				removedAnim.push(a);
			}
		}
		while(removedAnim.length > 0) {
			var a = removedAnim[removedAnim.length - 1];
			this.anim.remove(a);
			removedAnim.length -= 1;
		}
		return;
	}
	if(!Utopiz_RunWithObfuscation("MMApi.isMyTurn") || !Utopiz_RunWithObfuscation("MMApi.hasControl")) {
		return;
	}
	this.myTower.unLock();
};
this["44{N"].prototype.onBlockChoosed = function(type, bottom) { // "type" = BlockType, "bottom" = Bool
	JSTrace("Game.onBlockChoosed");
	this.myTower.expectedCost += Block.getCost(type);
	this.myTower.availableActions -= 1;
	if(this.myTower.getBudget() == 0 || this.myTower.getRemainingActions() == 0) {
		Utopiz_RunWithObfuscation("MMApi.endTurn", Msg.EndBlock(type, bottom));
		return;
	}
	Utopiz_RunWithObfuscation("MMApi.sendMessage", Msg.AddBlock(type, bottom));
};
this["44{N"].prototype["+oD9l"] = function(mine, msg) { // onMessage |||| "mine" = Bool, "msg" = Msg
	switch(msg[0]) {
		case "Init":
			var b = msg[2];
			if(b == true) {
				this.team = !mine;
				if(this.team) {
					Utopiz_RunWithObfuscation("MMApi.setColors", Const.COLOR1, Const.COLOR2);
				} else {
					Utopiz_RunWithObfuscation("MMApi.setColors", Const.COLOR2, Const.COLOR1);
				}
				if(Utopiz_RunWithObfuscation("MMApi.isMyTurn")) {
					this.myTower = new Tower(this, 104, 240, true);
					this.oppTower = new Tower(this, 200, 240, false);
				} else {
					this.myTower = new Tower(this, 200, 240, false);
					this.oppTower = new Tower(this, 104, 240, true);
				}
				this.updateScore();
			}
			break;
		case "AddBlock":
			var that = this;
			var type = msg[2];
			var bottom = msg[3];
			Utopiz_RunWithObfuscation("MMApi.lockMessages", true);
			if(Utopiz_RunWithObfuscation("MMApi.isMyTurn")) {
				this.myTower.tokens -= this.myTower.expectedCost;
				JSTrace("Tokens : " + this.myTower.tokens);
				this.myTower.addBlock(type, bottom, function() { that.onBlockAdded(); });
				this.myTower.lock();
			} else {
				this.oppTower.addBlock(type, bottom, function() { that.onBlockAdded(); });
			}
			break;
		case "EndBlock":
			var that = this;
			var type = msg[2];
			var bottom = msg[3];
			Utopiz_RunWithObfuscation("MMApi.lockMessages", true);
			if(mine) {
				this.myTower.tokens -= this.myTower.expectedCost;
				this.myTower.updateAvailableTokens();
				this.myTower.updateActionsCount();
				this.myTower.addBlock(type, bottom, function() { that.resolveConflict(); });
				this.myTower.lock();
			} else {
				this.oppTower.addBlock(type, bottom, function() { that.resolveConflict(); });
			}
			break;
	}
};
this["44{N"].prototype["4fHu{"] = function() { // onTurnDone
	this.updateScore();
	if(!Utopiz_RunWithObfuscation("MMApi.hasControl") || Utopiz_RunWithObfuscation("MMApi.isReconnecting")) {
		return;
	}
	if(!Utopiz_RunWithObfuscation("MMApi.isMyTurn")) {
		// (MT) On cache les composants.
	} else {}
};
this["44{N"].prototype.updateScore = function() {
	var s = "";
	s += "<div class=\"score0\">" + this.myTower.getCount() + "</div>";
	s += "<div class=\"score1\">" + this.oppTower.getCount() + "</div>";
	s += "<p>";
	if(Utopiz_RunWithObfuscation("MMApi.hasControl") && !Utopiz_RunWithObfuscation("MMApi.isReconnecting")) {
		s += (!Utopiz_RunWithObfuscation("MMApi.isMyTurn") ? "Tour de votre adversaire : $other" : "A vous de jouer , $me !");
	}
	s += "</p>";
	Utopiz_RunWithObfuscation("MMApi.setInfos", s);
};
this["44{N"].prototype.checkVictory = function() {};
this["44{N"].prototype.victory = function(mine) { // "mine" = Bool
	Utopiz_RunWithObfuscation("MMApi.victory", mine);
};
this["44{N"].prototype["8Z[e,("] = function(mine) { // onVictory |||| "mine" = Bool
	setTimeout(this.onGameOver, 2000);
};
this["44{N"].prototype.onGameOver = function() {
	Utopiz_RunWithObfuscation("MMApi.gameOver");
	this.clean();
};
this["44{N"].prototype["{+Sn="] = function() {}; // onReconnectDone
this["44{N"].prototype.clean = function() {
	this.sky.removeMovieClip();
	this.ground.removeMovieClip();
	this.hill.removeMovieClip();
	this.choiceBar.clean();
};

// ANIMS
this["44{N"].prototype.resolveConflict = function() {
	JSTrace("Game.resolveConflict");
	if(Utopiz_RunWithObfuscation("MMApi.isMyTurn")) {
		this.myTower.unLock();
	}
	Utopiz_RunWithObfuscation("MMApi.lockMessages", false);
};
this["44{N"].prototype.onBlockAdded = function() {
	JSTrace("Game.onBlockAdded");
	if(Utopiz_RunWithObfuscation("MMApi.isMyTurn")) {
		this.myTower.unLock();
	}
	Utopiz_RunWithObfuscation("MMApi.lockMessages", false);
};

// CALLBACKS
this["44{N"].prototype.displayChoiceBar = function(x, y, index) { // "x" = Float, "y" = Float, "index" = Int
	this.choiceBar.show(x, y, index, this.myTower.getBudget());
};
this["44{N"].prototype.hideChoiceBar = function() {
	this.choiceBar.hide();
};


/* Tower.hx */

function Tower(game, x, y, isLeftTower) { // "game" = Game, "x" = Int, "y" = Int, "isLeftTower" = Bool
	this.game = undefined; // Game
	this.socle = undefined; // flash.MovieClip
	this.firstBlock = undefined; // flash.MovieClip
	this.baseX = undefined; // Int
	this.baseY = undefined; // Int
	this.blocks = undefined; // List<Block>
	this._lock = undefined; // Bool
	this.isLeftTower = undefined; // Bool
	this.tokens = undefined; // Int
	this.availableActions = undefined; // Int
	this.expectedCost = undefined; // Int
	this._new(game, x, y, isLeftTower);
}
Tower.prototype._new = function(game, x, y, isLeftTower) { // "game" = Game, "x" = Int, "y" = Int, "isLeftTower" = Bool
	var that = this;

	this.availableActions = Const.TURN_ACTIONS;
	this.tokens = Const.TURN_TOKENS;
	this.expectedCost = 0;
	this.baseX = x;
	this.baseY = y;
	this.game = game;
	this.isLeftTower = isLeftTower;
	this.blocks = new List();
	this._lock = true;

	this.firstBlock = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.game.dm, "emptyBlock", Const.DP_BG);
	this.firstBlock._xscale = (this.isLeftTower ? Const.XSCALE : -Const.XSCALE);
	this.firstBlock._yscale = Const.YSCALE;
	this.firstBlock._x = this.baseX;
	this.firstBlock._y = this.baseY;
	this.firstBlock.stop();

	this.socle = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.game.dm, "socle", Const.DP_BG);
	this.socle._xscale = (this.isLeftTower ? Const.XSCALE : -Const.XSCALE);
	this.socle._yscale = Const.YSCALE;
	this.socle._x = this.baseX;
	this.socle._y = this.baseY;

	this.firstBlock.remove.onRelease = function() { that.displayChoiceBarFromFirstBlock(); };
	this.firstBlock.remove.onReleaseOutside = function() { that.hideChoiceBar(); };
};
Tower.prototype.addBlock = function(type, bottom, cbk) { // "type" = BlockType, "bottom" = Bool, "cbk" = Function (callback)
	var that = this;
	this.firstBlock.remove.onRelease = function() { that.displayChoiceBarFromFirstBlock(); };
	this.blocks.last().mc.remove.onRelease = function() { that.displayChoiceBarFromBlock(); };
	var block = Block.createBlock(type, this.game, this.isLeftTower);
	if(bottom) {
		block.mc._x = this.baseX;
		block.mc._y = this.baseY;
		var anim = new ElevationAnim(block.mc, this.baseY - Const.BLOCK_HEIGHT, true);
		anim.onEnd = cbk;
		this.game.anim.push(anim);
		for(var i in this.blocks.array) {
			var b = this.blocks.array[i];
			var a = new ElevationAnim(b.mc, b.mc._y - Const.BLOCK_HEIGHT, false);
			this.game.anim.push(a);
		}
		this.blocks.push(block);
		block.index = 0;
		var index = 1;
		for(var i in this.blocks.array) {
			var b = this.blocks.array[i];
			b.index = index++;
		}
		this.giveControlToBlock(this.blocks.last());
		this.swapDepths();
	} else {
		var lastBlock = this.blocks.last();
		block.mc._x = this.baseX;
		block.mc._y = lastBlock.mc._y;
		var anim = new ElevationAnim(block.mc, lastBlock.mc._y - Const.BLOCK_HEIGHT, true);
		anim.onEnd = cbk;
		this.game.anim.push(anim);
		this.blocks.add(block);
		block.index = this.blocks.length;
		this.giveControlToBlock(block);
		//this.swapDepths();
	}
};
Tower.prototype.updateAvailableTokens = function() {
	this.expectedCost = 0;
	for(var i in this.blocks.array) {
		var block = this.blocks.array[i];
		this.tokens += block.cost;
	}
	this.tokens += Const.TURN_TOKENS;
};
Tower.prototype.updateActionsCount = function() {
	this.availableActions = 0;
	for(var i in this.blocks.array) {
		var block = this.blocks.array[i];
		this.availableActions += block.actions;
	}
	this.availableActions += Const.TURN_ACTIONS;
};
Tower.prototype.getBudget = function() {
	return this.tokens - this.expectedCost;
};
Tower.prototype.getRemainingActions = function() {
	return this.availableActions;
};
Tower.prototype.displayChoiceBarFromFirstBlock = function() {
	if(this._lock) { return; }
	JSTrace("Tower.displayChoiceBarFromFirstBlock | _height : " + this.firstBlock._height);
	this.displayChoiceBar(this.baseX, this.baseY, 0);
};
Tower.prototype.displayChoiceBarFromBlock = function() {
	if(this._lock) { return; }
	var last = this.blocks.last();
	JSTrace("Tower.displayChoiceBarFromBlock | _height : " + last.mc._height);
	this.displayChoiceBar(last.mc._x, last.mc._y, last.index);
};
Tower.prototype.giveControlToBlock = function(b) { // "b" = Block
	var that = this;
	for(var i in this.blocks.array) {
		var block = this.blocks.array[i];
		this.removeControlFromBlock(block);
	}
	b.mc.remove.onRelease = function() { that.displayChoiceBarFromBlock(); };
	b.mc.remove.onReleaseOutside = function() { that.hideChoiceBar(); };
};
Tower.prototype.removeControlFromBlock = function(b) { // "b" = Block
	b.mc.remove.onRelease = function() {};
	b.mc.remove.onReleaseOutside = function() {};
};
Tower.prototype.lock = function() {
	this._lock = true;
};
Tower.prototype.unLock = function() {
	this._lock = false;
};
Tower.prototype.swapDepths = function() {
	for(var i in this.blocks.array) {
		var block = this.blocks.array[i];
		Utopiz_RunWithObfuscation("mt.DepthManager.over", this.game.dm, block.mc);
	}
	Utopiz_RunWithObfuscation("mt.DepthManager.over", this.game.dm, this.firstBlock);
	Utopiz_RunWithObfuscation("mt.DepthManager.over", this.game.dm, this.socle);
};
Tower.prototype.displayChoiceBar = function(x, y, index) { // "x" = Float, "y" = Float, "index" = Int
	if(this._lock) { return; }
	var that = this;
	this.game.displayChoiceBar(x, y, index);
	this.firstBlock.remove.onRelease = function() { that.hideChoiceBar(); };
	this.blocks.last().mc.remove.onRelease = function() { that.hideChoiceBar(); };
};
Tower.prototype.hideChoiceBar = function() {
	if(this._lock) { return; }
	var that = this;
	this.game.hideChoiceBar();
	this.firstBlock.remove.onRelease = function() { that.displayChoiceBarFromFirstBlock(); };
	this.blocks.last().mc.remove.onRelease = function() { that.displayChoiceBarFromBlock(); };
};
Tower.prototype.getCount = function() {
	return this.blocks.length;
};


/* Block.hx */

function Block(cost, attack, defense, actions, type, game) { // "cost" = Int, "attack" = Int, "defense" = Int, "actions" = Int, "type" = BlockType, "game" = Game
	this.attack = undefined; // Int
	this.defense = undefined; // Int
	this.game = undefined; // Game
	this.index = undefined; // Int
	this.actions = undefined; // Int
	this.cost = undefined; // Int
	this.type = undefined; // BlockType
	this.mc = undefined; // flash.MovieClip
	this._new(cost, attack, defense, actions, type, game);
}
Block.prototype._new = function(cost, attack, defense, actions, type, game) { // "cost" = Int, "attack" = Int, "defense" = Int, "actions" = Int, "type" = BlockType, "game" = Game
	this.game = game;
	this.cost = cost;
	this.type = type;
	this.attack = attack;
	this.defense = defense;
	this.type = type;
	this.actions = actions;
};
Block.prototype.buildBlock = function(name, invert) { // "name" = String, "invert" = Bool
	this.mc = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.game.dm, name, Const.DP_BLOCK);
	this.mc._xscale = (invert ? -Const.XSCALE : Const.XSCALE);
	this.mc._yscale = Const.YSCALE;
	this.mc.skin.gotoAndStop((invert ? 2 : 1));
};
Block.prototype.clean = function() {
	this.mc.removeMovieClip();
};
Block.getCost = function(type) { // "type" = BlockType
	switch(type[0]) {
		case "BAttack": return 2;
		case "BDefense": return 1;
		case "BSupply": return 2;
		case "BBuilder": return 1;
	}
};
Block.getActions = function(type) { // Méthode inutilisée |||| "type"= BlockType
	switch(type[0]) {
		case "BBuilder": return 1;
		default: return 0;
	}
};
Block.createBlock = function(type, game, isLeftTower) { // "type" = BlockType, "game" = Game, "isLeftTower" = Bool
	switch(type[0]) {
		case "BAttack":  return this.createAttackBlock(game, isLeftTower);
		case "BDefense": return this.createDefenseBlock(game, isLeftTower);
		case "BSupply": return this.createSupplyBlock(game, isLeftTower);
		case "BBuilder": return this.createBuilderBlock(game, isLeftTower);
		default: return null;
	}
};
Block.createAttackBlock = function(game, isLeftTower) { // "game" = Game, "isLeftTower" = Bool
	var b = new Block(2, 1, 0, 0, BlockType.BAttack(), game);
	var invert = (isLeftTower ? false : true);
	b.buildBlock("attackBlock", invert);
	return b;
};
Block.createDefenseBlock = function(game, isLeftTower) { // "game" = Game, "isLeftTower" = Bool
	var b = new Block(1, 0, 1, 0, BlockType.BDefense(), game);
	var invert = (isLeftTower ? false : true);
	b.buildBlock("defenseBlock", invert);
	return b;
};
Block.createSupplyBlock = function(game, isLeftTower) { // "game" = Game, "isLeftTower" = Bool
	var b = new Block(2, 0, 0, 0, BlockType.BSupply(), game);
	var invert = (isLeftTower ? false : true);
	b.buildBlock("supplyBlock", invert);
	return b;
};
Block.createBuilderBlock = function(game, isLeftTower) { // "game" = Game, "isLeftTower" = Bool
	var b = new Block(1, 0, 0, 1, BlockType.BBuilder(), game);
	var invert = (isLeftTower ? false : true);
	b.buildBlock("buildBlock", invert);
	return b;
};


/* ChoiceBar.hx */

function ChoiceBar(game) { // "game" = Game
	this.WIDTH = 20;
	this.HEIGHT = 20;
	this.displayed = undefined; // Bool
	this.iconeAttack = undefined; // flash.MovieClip
	this.iconeDefense = undefined; // flash.MovieClip
	this.iconeSupply = undefined; // flash.MovieClip
	this.iconeBuild = undefined; // flash.MovieClip
	this.index = undefined; // Int
	this.game = undefined; // Game
	this._new(game);
}
ChoiceBar.prototype._new = function(game) { // "game" = Game
	var that = this;

	this.game = game;
	this.displayed = false;

	this.iconeAttack = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.game.dm, "iconeAttack", Const.DP_CHOICEBAR);
	this.iconeDefense = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.game.dm, "iconeDefense", Const.DP_CHOICEBAR);
	this.iconeSupply = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.game.dm, "iconeSupply", Const.DP_CHOICEBAR);
	this.iconeBuild = Utopiz_RunWithObfuscation("mt.DepthManager.attach", this.game.dm, "iconeBuild", Const.DP_CHOICEBAR);

	this.iconeAttack._xscale = Const.XSCALE;
	this.iconeDefense._xscale = Const.XSCALE;
	this.iconeSupply._xscale = Const.XSCALE;
	this.iconeBuild._xscale = Const.XSCALE;

	this.iconeAttack._yscale = Const.YSCALE;
	this.iconeDefense._yscale = Const.YSCALE;
	this.iconeSupply._yscale = Const.YSCALE;
	this.iconeBuild._yscale = Const.YSCALE;

	this.iconeAttack.gotoAndStop(1);
	this.iconeDefense.gotoAndStop(1);
	this.iconeSupply.gotoAndStop(1);
	this.iconeBuild.gotoAndStop(1);

	this.iconeAttack.onRollOver = function() { that.attackLightOn(); };
	this.iconeAttack.onRollOut = function() { that.attackLightOff(); };
	this.iconeAttack.onReleaseOutside = function() { that.attackLightOff(); };
	this.iconeAttack.onRelease = function() { that.attack(); };

	this.iconeDefense.onRollOver = function() { that.defenseLightOn(); };
	this.iconeDefense.onRollOut = function() { that.defenseLightOff(); };
	this.iconeDefense.onReleaseOutside = function() { that.defenseLightOff(); };
	this.iconeDefense.onRelease = function() { that.defense(); };

	this.iconeSupply.onRollOver = function() { that.supplyLightOn(); };
	this.iconeSupply.onRollOut = function() { that.supplyLightOff(); };
	this.iconeSupply.onReleaseOutside = function() { that.supplyLightOff(); };
	this.iconeSupply.onRelease = function() { that.supply(); };

	this.iconeBuild.onRollOver = function() { that.buildLightOn(); };
	this.iconeBuild.onRollOut = function() { that.buildLightOff(); };
	this.iconeBuild.onReleaseOutside = function() { that.buildLightOff(); };
	this.iconeBuild.onRelease = function() { that.build(); };

	this.hide();
};
ChoiceBar.prototype.show = function(x, y, index, tokens) { // "x" = Float, "y" = Float, "index" = Int, "tokens" = Int
	// (MT) Problème à régler sur les tokens : afficher.
	JSTrace("ChoiceBar.show | Tokens : " + tokens);
	this.displayed = true;
	this.index = index;
	var h = this.HEIGHT;
	if(Block.getCost(BlockType.BBuilder()) <= tokens) {
		this.iconeBuild._visible = true;
		this.iconeBuild._x = x + this.WIDTH;
		this.iconeBuild._y = y - h;
		h += this.iconeBuild._height;
	}
	if(Block.getCost(BlockType.BAttack()) <= tokens) {
		this.iconeAttack._visible = true;
		this.iconeAttack._x = x + this.WIDTH;
		this.iconeAttack._y = y - h;
		h += this.iconeAttack._height;
	}
	if(Block.getCost(BlockType.BDefense()) <= tokens) {
		this.iconeDefense._visible = true;
		this.iconeDefense._x = x + this.WIDTH;
		this.iconeDefense._y = y - h;
		h += this.iconeDefense._height;
	}
	if(Block.getCost(BlockType.BSupply()) <= tokens) {
		this.iconeSupply._visible = true;
		this.iconeSupply._x = x + this.WIDTH;
		this.iconeSupply._y = y - h;
		h += this.iconeSupply._height;
	}
};
ChoiceBar.prototype.hide = function() {
	this.displayed = false;
	this.iconeAttack._visible = false;
	this.iconeDefense._visible = false;
	this.iconeSupply._visible = false;
	this.iconeBuild._visible = false;
	this.index = -1;
};
ChoiceBar.prototype.clean = function() {
	this.iconeAttack.removeMovieClip();
	this.iconeDefense.removeMovieClip();
	this.iconeSupply.removeMovieClip();
	this.iconeBuild.removeMovieClip();
};
ChoiceBar.prototype.attackLightOn = function() {
	this.iconeAttack.gotoAndStop(2);
};
ChoiceBar.prototype.attackLightOff = function() {
	this.iconeAttack.gotoAndStop(1);
};
ChoiceBar.prototype.attack = function() {
	this.iconeAttack.gotoAndStop(1);
	this.game.onBlockChoosed(BlockType.BAttack(), (this.index == 0 ? true : false));
	this.hide();
};
ChoiceBar.prototype.defenseLightOn = function() {
	this.iconeDefense.gotoAndStop(2);
};
ChoiceBar.prototype.defenseLightOff = function() {
	this.iconeDefense.gotoAndStop(1);
};
ChoiceBar.prototype.defense = function() {
	this.iconeDefense.gotoAndStop(1);
	this.game.onBlockChoosed(BlockType.BDefense(), (this.index == 0 ? true : false));
	this.hide();
};
ChoiceBar.prototype.supplyLightOn = function() {
	this.iconeSupply.gotoAndStop(2);
};
ChoiceBar.prototype.supplyLightOff = function() {
	this.iconeSupply.gotoAndStop(1);
};
ChoiceBar.prototype.supply = function() {
	this.iconeSupply.gotoAndStop(1);
	this.game.onBlockChoosed(BlockType.BSupply(), (this.index == 0 ? true : false));
	this.hide();
};
ChoiceBar.prototype.buildLightOn = function() {
	this.iconeBuild.gotoAndStop(2);
};
ChoiceBar.prototype.buildLightOff = function() {
	this.iconeBuild.gotoAndStop(1);
};
ChoiceBar.prototype.build = function() {
	this.iconeBuild.gotoAndStop(1);
	this.game.onBlockChoosed(BlockType.BBuilder(), (this.index == 0 ? true : false));
	this.hide();
};


/* Anim.hx */

function ElevationAnim(mcc, destinationY, useAlpha) { // class implements Anim |||| "mcc" = flash.MovieClip, "destinationY" = Float, "useAlpha" = Bool
	this.mc = undefined; // flash.MovieClip
	this.onEnd = undefined; // Void -> Void
	this.onUpdate = undefined; // flash.MovieClip -> Float -> Void
	this.destinationY = undefined; // Float
	this.jump = undefined; // Float
	this.alphaJump = undefined; // Float
	this.steps = undefined; // Int
	this.useAlpha = undefined; // Bool
	this._new(mcc, destinationY, useAlpha);
}
ElevationAnim.prototype._new = function(mcc, destinationY, useAlpha) { // "mcc" = flash.MovieClip, "destinationY" = Float, "useAlpha" = Bool
	this.steps = 10;
	this.destinationY = destinationY;
	this.mc = mcc;
	this.jump = (this.mc._y - this.destinationY) / this.steps;
	this.useAlpha = useAlpha;
	if(this.useAlpha) {
		this.alphaJump = 100 / this.steps;
		this.mc._alpha = 0;
	}
};
ElevationAnim.prototype.play = function() {
	var t = Utopiz_RunWithObfuscation("mt.Timer.tmod");
	this.mc._y -= this.jump * t;
	if(this.useAlpha) {
		this.mc._alpha += this.alphaJump;
	}
	if(this.steps-- <= 0 || this.mc._y <= this.destinationY) {
		this.mc._alpha = 100;
		this.mc._y = this.destinationY;
		return true;
	}
	return false;
};

function SteppedAnim(mcc, frame) { // Classe inutilisée |||| class implements Anim |||| "mcc" = flash.MovieClip, "frame" = Int
	this.mc = undefined; // flash.MovieClip
	this.onEnd = undefined; // Void -> Void
	this.onUpdate = undefined; // flash.MovieClip -> Float -> Void
	this.cur = undefined; // Float
	this._new(mcc, frame);
}
SteppedAnim.prototype._new = function(mcc, frame) { // "mcc" = flash.MovieClip, "frame" = Int
	this.mc = mcc;
	this.mc._visible = true;
	this.mc.gotoAndStop(frame);
	this.cur = 0;
};
SteppedAnim.prototype.play = function() {
	var t = Utopiz_RunWithObfuscation("mt.Timer.tmod");
	this.cur += t;
	this.mc.smc.gotoAndStop(Math.floor(this.cur));
	this.onUpdate(this.mc, this.cur);
	if(this.cur >= this.mc.smc._totalframes - 1) {
		this.mc._visible = false;
		return true;
	}
	return false;
};