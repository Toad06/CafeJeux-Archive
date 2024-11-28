function CJGame_Action(data) {
	if(data === undefined) return undefined;
	var game = data[0];
	var player = Math.floor(data[1]);
	data = data[2];
	// console.error(data);
	var step = Math.floor(data[1]);
	var isInit = false;
	switch(game) {
		case 1: // eXpanz
			if(step === 0) {
				isInit = true;
				Expanz_Init(data);
			} else if(step === 1) {
				Expanz_Place(data);
			} else {
				Expanz_Extend(data);
			}
			break;
		case 2: // Amonite
			if(step === 0) {
				isInit = true;
				Amonite_Init(data);
			} else {
				Amonite_Move(data);
			}
			break;
		case 3: // Crumble
			if(step === 0) {
				isInit = true;
				Crumble_Init(data);
			} else if(step === 1) {
				Crumble_TakeCard(data);
			} else if(step === 2) {
				Crumble_UseCard(data);
			} else if(step === 3) {
				Crumble_Move(data);
			} else {
				Crumble_DoubleMove(data);
			}
			break;
		case 4: // Magmax Battle
			if(step === 0) {
				isInit = true;
				Magmax_Init(data);
			} else if(step === 1) {
				Magmax_Action(data);
			} else {
				Magmax_EndTurn(data);
			}
			break;
		case 5: // Quat'Cinelle
			if(step === 0) {
				isInit = true;
				Quat_Init();
			} else {
				Quat_Set(data);
			}
			break;
		case 6: // Anticorp's
			if(step === 0) {
				isInit = true;
				Miniwar_Init(data);
			} else if(step === 1) {
				Miniwar_Place(data);
			} else if(step === 2) {
				Miniwar_PlayNext(data);
			} else if(step === 3) {
				Miniwar_PlayStack(data);
			} else if(step === 4) {
				Miniwar_PlayJump(data);
			} else if(step === 5) {
				Miniwar_PlayShot(data);
			} else if(step === 6) {
				Miniwar_ExplodeMine(data);
			} else if(step === 7) {
				Miniwar_ShowWeapon(data);
			} else if(step === 8) {
				Miniwar_HideWeapon();
			} else {
				Miniwar_TakeCover();
			}
			break;
		case 7: // Marbils
			if(step === 0) {
				isInit = true;
				Marbil_Init(data);
			} else {
				Marbil_Shoot(data);
			}
			break;
		case 8: // Ferme-la !
			if(step === 0) {
				isInit = true;
				Ferme_Init(data);
			} else {
				Ferme_UpdateCell(data);
			}
			break;
		case 9: // Trigolo
			if(step === 0) {
				isInit = true;
				Trifus_Init(data);
			} else {
				Trifus_Card(data);
			}
			break;
		case 11: // Hordes Insurrection !
			if(step === 0) {
				isInit = true;
				Hordes_Init(data);
			} else if(step === 1) {
				Hordes_ChooseCell(data);
			} else if(step === 2) {
				Hordes_BedEvent(data);
			} else if(step === 3) {
				Hordes_MachineGunEvent(data);
			} else if(step === 4) {
				Hordes_ArmageddonEvent(data);
			} else if(step === 5) {
				Hordes_CatEvent(data);
			} else if(step === 6) {
				Hordes_GunEvent(data);
			} else if(step === 7) {
				Hordes_SportElecEvent(data);
			} else if(step === 8) {
				Hordes_ShieldEvent(data);
			} else if(step === 9) {
				Hordes_MegaShieldEvent(data);
			} else if(step === 10) {
				Hordes_WaterEvent();
			} else if(step === 11) {
				Hordes_TrapEvent(data);
			} else if(step === 12) {
				Hordes_ZombieAttack(data);
			} else {
				Hordes_NewTurn();
			}
			break;
		case 12: // Starsheep Brouteurs
			if(step === 0) {
				isInit = true;
				Paturage_Init(data);
			} else if(step === 1) {
				Paturage_Spawn(data);
			} else {
				Paturage_Move(data);
			}
			break;
		case 14: // Boum - Prototype de Anticorp's
			if(step === 0) {
				isInit = true;
				Boum_Init(data);
			} else if(step === 1) {
				Boum_SendTurn(data);
			} else {
				Boum_Victory();
			}
			break;
		case 15: // Utopiz
			if(step === 0) {
				isInit = true;
				Utopiz_Init(data);
			} else if(step === 1) {
				Utopiz_AddBlock(data);
			} else {
				Utopiz_EndBlock(data);
			}
			break;
	}
	if(isInit && game !== 14) {
		if(player === 1) {
			CJGame_PlayData.game = game;
			CJGame_PlayData.initData = data;
		} else {
			if(CJGame_PlayData.initData !== null) {
				data = CJGame_PlayData.initData;
			} else {
				// Ce n'est pas supposé arriver... mais ça peut parfois arriver : le client 1 a incorrectement renvoyé la valeur "undefined" pour l'argument "data".
				// Cela rend donc impossible pour le client 2 de récupérer les données communes d'initialisation, si celui-ci démarre avant la nouvelle tentative du client 1.
				// On annule simplement la partie et on recharge la page dans ce cas de figure.
				// Fait amusant : La page FAQ de la rubrique d'aide du site mentionne aussi l'existence d'un problème qui pouvait parfois survenir lors du démarrage du jeu.
				CJGame_IsPreviousClientLoaded.clients.length = 0;
				document.body.innerHTML = "";
				alert("Une erreur est survenue lors de l'initialisation du jeu.\nLa page va être rechargée.");
				if(!IN_IFRAME) {
					window.location.reload();
				} else {
					WINDOW_TOP.js.XmlHttp.get("game/" + game, null);
				}
				return undefined;
			}
			if(player === 2) {
				playSound("_PartyStarted");
				if(game === 6) {
					// Affichage "manuel" des couleurs pour Anticorp's, puisque le jeu ne le prévoit pas.
					if(games[game].swf === window.game.swf) CJGame_SetColors([1, 0xFF0000, 0x5F8EFE]);
					else CJGame_SetColors([1, 0x5F8EFE, 0xFF0000]);
				}
				if(IN_IFRAME) {
					WINDOW_TOP.Game_Event(["start"]);
					CJGame_UpdateTimers(-1);
				}
			}
		}
	}
	CJGame_PlayData.lastAction = step;
	return data;
}

function CJGame_PlayData(data) {
	if(data instanceof Array) {
		var prop = data[0];
		var val = data[1];
		CJGame_PlayData[prop] = val;
		if(prop === "turn") {
			if(ENABLE_UNIQUE_CLIENT || IN_IFRAME) {
				document.getElementById("overlay").style.display = "block";
				setTimeout(function() {
					document.getElementById("overlay").style.display = "none";
				}, 500);
			}
			if(!IN_IFRAME) {
				document.getElementById("player_1").className = (val === 1 ? "turn" : "");
				document.getElementById("player_2").className = (val === 2 ? "turn" : "");
				updateUniqueWindow(val);
			} else {
				document.getElementById("div_client_1").className = (val === 1 ? "" : "skip");
				CJGame_UpdateTimers(val);
				WINDOW_TOP.Game_Event(["turn", val]);
			}
			playSound("_MyTurn");
		}
		return data[1];
	}
	return CJGame_PlayData[data];
}
CJGame_PlayData.game = 0;
CJGame_PlayData.initData = null;
CJGame_PlayData.turn = 1;
CJGame_PlayData.lastAction = -1;
CJGame_PlayData.locked = false;
CJGame_PlayData.seeds = null;
CJGame_PlayData.turnDone = null;
CJGame_PlayData.winner = null;
CJGame_PlayData.timeOver = false;
CJGame_PlayData.gameOver = false;

function CJGame_SendDataToOtherClients(data) {
	var player = data[0];
	var turnDone = data[2];
	if(turnDone === false && CJGame_PlayData.locked && CJGame_PlayData.turnDone === null) {
		CJGame_PlayData.turnDone = player;
	}
	data = data[1];
	for(var i = 1; i <= 3; i++) {
		if(i === player) continue;
		var client = document.getElementById("client_" + i);
		if(client === null) continue;
		if(!client["JS_to_AS_" + i]) {
			console.error("Impossible d'appeler JS_to_AS_" + i + "()");
			continue;
		}
		client["JS_to_AS_" + i](data, turnDone, CJGame_PlayData.turnDone);
	}
}

function CJGame_SendDataToAllClients(data) {
	var player = data[0];
	var turnDone = data[2];
	if(turnDone === false && CJGame_PlayData.locked && CJGame_PlayData.turnDone === null) {
		CJGame_PlayData.turnDone = player;
	}
	var client = document.getElementById("client_" + player);
	client["JS_to_AS_" + player](data[1], turnDone, CJGame_PlayData.turnDone);
	CJGame_SendDataToOtherClients(data);
}

function CJGame_IsPreviousClientLoaded(player) {
	var loaded = CJGame_IsPreviousClientLoaded.clients;
	var pos = player - 1;
	if(loaded[pos] === undefined) loaded[pos] = player;
	for(var i = 0; i < player; i++) {
		if(loaded[i] === undefined) {
			return false;
		}
	}
	return true;
}
CJGame_IsPreviousClientLoaded.clients = [];

function CJGame_SetColors(data) {
	var player = data[0];
	var col1 = data[1];
	var col2 = data[2];
	// "col1" correspond toujours à la couleur du joueur connecté, "col2" à celle de son adversaire.
	if(CJGame_PlayData.game !== 1) {
		if(CJGame_PlayData.game !== 3) {
			// Dans Crumble, le joueur 1 choisit une carte le premier mais c'est le joueur 2 qui démarre véritablement la partie, et donc détermine la couleur des pions. 
			CJGame_SetColors = function() {};
		}
		if(CJGame_PlayData.game === 12) {
			// Dans Starsheep Brouteurs, les couleurs définies n'ont rien à voir avec celles des moutons, on corrige cela ici.
			col1 = 0xFEB4B4;
			col2 = 0xBAC0FF;
		}
	} else {
		// Dans eXpanz, la couleur des joueurs change à chaque tour.
		if(player === 2) {
			var temp = col2;
			col2 = col1;
			col1 = temp;
		}
	}
	if(col1 !== undefined) col1 = "#" + col1.toString(16).padStart(6, "0");
	if(col2 !== undefined) col2 = "#" + col2.toString(16).padStart(6, "0");
	if(!IN_IFRAME) {
		if(col1 !== undefined) document.getElementById("player_1").style.color = col1;
		if(col2 !== undefined) document.getElementById("player_2").style.color = col2;
	} else {
		WINDOW_TOP.Game_Event(["colors", col1, col2]);
	}
}

function CJGame_SetInfos(data) {
	// Les scores affichés ne doivent pas être inversés à chaque tour, "problème" n'existant que parce que les deux clients sont sur la même page, à l'image de celui des couleurs ci-dessus.
	// On intervient donc ici pour tout afficher dans le bon ordre... et corriger au passage quelques fautes d'orthographe.
	var reverseScores = function(html, player) {
		if(player !== 2) return html;
		var div = document.createElement("div");
		div.innerHTML = html;
		var score0 = div.getElementsByClassName("score0")[0];
		var score1 = div.getElementsByClassName("score1")[0];
		if(score0 !== undefined && score1 !== undefined) {
			var temp = score0.innerHTML;
			score0.innerHTML = score1.innerHTML;
			score1.innerHTML = temp;
		}
		return div.innerHTML;
	};
	var player = data[0];
	var html = data[1];
	var turn = CJGame_PlayData.turn;
	switch(CJGame_PlayData.game) {
		case 1: // eXpanz
			if(player !== turn) return;
			html = reverseScores(html, player);
			break;
		case 3: // Crumble
			if(player !== turn) return;
			html = reverseScores(html, player);
			break;
		case 4: // Magmax Battle
			html = html.replace("un missiles", "un missile");
			html = html.replace("tranversant", "traversant");
			html = html.replace("reperer", "repérer").replace("face a", "face à");
			if(html.charAt(html.length - 1) !== ".") html += ".";
			break;
		case 5: // Quat'Cinelle
			if(player !== turn) return;
			break;
		case 8: // Ferme-la !
		case 15: // Utopiz
			if(player !== turn) return;
			html = reverseScores(html, player);
			html = html.replace("Tour de votre adversaire : $other", ""); // Nécessaire pour le dernier tour.
			html = html.replace("$me", window["PLAYER_" + player + "_NAME"]).replace(" ,", ",");
			break;
		case 9: // Trigolo
			if(player !== turn) return;
			html = reverseScores(html, player);
			break;
		case 11: // Hordes Insurrection !
			html = reverseScores(html, player);
			break;
		case 12: // Starsheep Brouteurs
			if(player !== turn) return;
			html = reverseScores(html, player);
			html = html.replace("mouton<br", "mouton,<br");
			html = html.replace(".</p><p>D", " ou<br/>d");
			if(html.indexOf(".</p>") === -1) html = html.replace("</p>", ".</p>");
			break;
	}
	if(html === null || html === "null") html = "";
	if(!IN_IFRAME) {
		var div = document.getElementById("infos");
		div.innerHTML = html;
	} else {
		WINDOW_TOP.Game_Event(["infos", html]);
	}
}

function CJGame_LogMessage(data) {
	var player = data[0];
	var html = data[1];
	var turn = CJGame_PlayData.turn;
	switch(CJGame_PlayData.game) {
		case 3: // Crumble
			if(player !== turn) return;
			if(html.indexOf("Vous jouez") === 0) {
				var link = ["", ""];
				if(IN_IFRAME) {
					link[0] = '<a href="#" onclick="return false;">';
					link[1] = '</a>';
				}
				html = link[0] + window["PLAYER_" + player + "_NAME"] + link[1] + ", " + html.replace("Vous", "vous");
			} else {
				var player1Name = PLAYER_1_NAME;
				var player2Name = PLAYER_2_NAME;
				if(IN_IFRAME) {
					player1Name = '<a href="#" onclick="return false;">' + player1Name + '</a>';
					player2Name = '<a href="#" onclick="return false;">' + player2Name + '</a>';
				}
				if(player === 1) {
					html = html.replace("$me", player1Name).replace("$other", player2Name);
				} else {
					html = html.replace("$me", player2Name).replace("$other", player1Name);
				}
			}
			break;
		case 4: // Magmax Battle
			if(player !== turn) return;
			html = html.replace("devié", "dévié").replace("grâce a", "grâce à");
			html = html.replace("desintegré", "désintegré").replace("eparpillé", "éparpillé");
			break;
	}
	if(!IN_IFRAME) {
		var p = document.createElement("p");
		p.innerHTML = html;
		document.getElementById("messages").appendChild(p);
	} else {
		WINDOW_TOP.Game_Event(["message", html]);
	}
}

function CJGame_Over(data) {
	if(CJGame_PlayData.gameOver) return;
	CJGame_PlayData.gameOver = true;
	if(!IN_IFRAME) {
		document.getElementById("player_1").className = "";
		document.getElementById("player_2").className = "";
	} else {
		TimerActive.stop();
		if(!CJGame_PlayData.timeOver) {
			clearInterval(TimerInterval);
		}
		WINDOW_TOP.Game_Event(["end", data]);
	}
}

function CJGame_UpdateTimers(turn) {
	if(turn === -1) { // Initialisation.
		window.TimerPlayer1 = new Timer();
		window.TimerPlayer2 = new Timer();
		window.TimerActive = TimerPlayer1;
		TimerActive.start();
		window.TimerInterval = setInterval(function() {
			var timeInSeconds = Math.round(TimerActive.getTime() / 1000);
			var turn = (TimerActive === TimerPlayer1 ? 1 : 2);
			if(TimerActive.timeInSeconds !== timeInSeconds) {
				TimerActive.timeInSeconds = timeInSeconds;
				var maxTime = 5 * 60;
				if(timeInSeconds > maxTime) {
					clearInterval(TimerInterval);
					if(CJGame_PlayData.winner === null) {
						var winner = (turn === 1 ? 2 : 1);
						CJGame_PlayData.winner = winner;
						CJGame_PlayData.timeOver = true;
						CJGame_SendDataToAllClients([turn, ["timeover", winner], null]);
					}
				} else {
					var elapsedTime = Math.max(0, maxTime - timeInSeconds);
					var minute = Math.floor(elapsedTime % 3600 / 60).toString().padStart(2, "0");
					var second = Math.floor(elapsedTime % 60).toString().padStart(2, "0");
					WINDOW_TOP.Game_Event(["timer", turn, minute, second]);
				}
			}
		}, 100);
	} else {
		TimerActive.stop();
		TimerActive = (turn === 1 ? TimerPlayer1 : TimerPlayer2);
		TimerActive.start();
	}
}


/**************************/


function Expanz_Init(data) {
	var team = data[2];
	var cells = data[3];
}

function Expanz_Place(data) {
	var cellX = data[2];
	var cellY = data[3];
}

function Expanz_Extend(data) {
	var color = data[2];
}


function Amonite_Init(data) {
	var team = data[2];
}

function Amonite_Move(data) {
	var fromX = data[2];
	var fromY = data[3];
	var toX = data[4];
	var toY = data[5];
}


function Crumble_Init(data) {
	var team = data[2];
	var grid = data[3];
	var cards = data[4];
}

function Crumble_TakeCard(data) {
	var cardPos = data[2];
}

function Crumble_UseCard(data) {
	var card = data[2];
	var useX = data[3];
	var useY = data[4];
}

function Crumble_Move(data) {
	var direction = data[2];
}

function Crumble_DoubleMove(data) {
	var direction = data[2];
}


function Magmax_Init(data) {
	var gridType = data[2];
	var seed = data[3];
	if(CJGame_PlayData.seeds === null) {
		var seed2 = seed ^ Math.ceil(Math.random() * 1000);
		CJGame_PlayData.seeds = [seed, seed2];
	}
}

function Magmax_Action(data) {
	var card = data[2];
	var blob = data[3];
	var direction = data[4];
}

function Magmax_EndTurn(data) {
	var numberOfCardsToAdd = data[2];
}


function Quat_Init() {}

function Quat_Set(data) {
	var x = data[2];
	var y = data[3];
	var dx = data[4];
	var dy = data[5];
}


function Miniwar_Init(data) {
	var level = data[2];
	var seed = data[3];
}

function Miniwar_Place(data) {
	var type = data[2];
	var x = data[3];
	var y = data[4];
	var special = parseInt(window.location.href.split("mode=")[1], 10);
	if(isFinite(special)) {
		// Le site cafejeux.com ne proposait qu'un seul type de cosmo, il en existe pourtant 5 autres avec des caractéristiques différentes.
		// Des bugs peuvent survenir puisque le développement de ces modes de jeu n'a jamais été finalisé.
		// 0 : cosmo soldat classique, 1 : cosmo scout, 2 : cosmo tank, 3 : cosmo médical, 4 : cosmo ninja, 5 : cosmo mage (noms utilisés dans le code source du jeu).
		if(special >= 0 && special <= 5) {
			data[2] = special;
		} else if(special === 99) {
			// Génère différents types de cosmos dans une même partie.
			data[2] = ~~(Math.random() * 6);
		}
	}
}

function Miniwar_PlayNext(data) {
	var playAgain = data[2];
}

function Miniwar_PlayStack(data) {
	var stack = data[2];
}

function Miniwar_PlayJump(data) {
	var da = data[2];
	var power = data[3];
}

function Miniwar_PlayShot(data) {
	var type = data[2];
	var mid = data[3];
	var angle = data[4];
	var power = data[5];
}

function Miniwar_ExplodeMine(data) {
	var n = data[2];
}

function Miniwar_ShowWeapon(data) {
	var type = data[2];
	var secret = data[3];
}

function Miniwar_HideWeapon() {}

function Miniwar_TakeCover() {}


function Marbil_Init(data) {
	var balls = data[2];
	var special = parseInt(window.location.href.split("mode=")[1], 10);
	if(special === 1) {
		// Retire deux billes de l'aire de jeu.
		// Juste pour montrer l'interaction avec le SWF, cela n'est pas prévu par le SWF et n'existait pas sur cafejeux.com.
		for(var i = 2; i < 4; i++) {
			var ball = balls[i];
			for(var j = 0; j < ball.length; j++) {
				ball[j] = -10000;
			}
		}
	}
}

function Marbil_Shoot(data) {
	var angle = data[2];
	var power = data[3];
	var balls = data[4];
}


function Ferme_Init(data) {
	var grid = data[2];
}

function Ferme_UpdateCell(data) {
	var x = data[2];
	var y = data[3];
	var addedBorder = data[4];
}


function Trifus_Init(data) {
	var list = data[2];
	var seed = data[3];
}

function Trifus_Card(data) {
	var type = data[2];
	var power = data[3];
	var x = data[4];
	var y = data[5];
}


function Hordes_Init(data) {
	var grid = data[2];
	var moves = data[3];
	var omoves = data[4];
	var options = data[5];
	var oppOptions = data[6];
	var mode = data[7];
	var zombieTurn = data[8];
	var zombieMoves = data[9];
	var special = parseInt(window.location.href.split("mode=")[1], 10);
	if(special === 0 || special === 1) {
		// Condition de victoire : le plus d'unités en vie (0, le mode par défaut et le seul qui était proposé sur cafejeux.com) ou le plus de zones conquises (1).
		data[7] = !special;
	}
	special = parseInt(window.location.href.split("special=")[1], 10);
	if(special === 1) {
		// Les options "Barricades" (1) et "Bouclier rouge" (9) existent dans le code du jeu mais ne sont pas proposées aux joueurs, et pour une bonne raison : elles font planter le jeu !
		// Mais, par simple curiosité, il est possible de les activer ici.
		var arr = [options, oppOptions], first = (Math.random() > 0.5 ? 0 : 1), opts = [1, 9], rand = ~~(Math.random() * opts.length);
		arr[first][~~(Math.random() * options.length)] = opts[rand];
		arr[1 >> first][~~(Math.random() * oppOptions.length)] = opts[~~!rand];
	}
}

function Hordes_ChooseCell(data) {
	var x = data[2];
	var y = data[3];
	var points = data[4];
	var team = data[5];
	var option = data[6];
}

function Hordes_BedEvent(data) {
	var option = data[2];
}

function Hordes_MachineGunEvent(data) {
	var x = data[2];
	var y = data[3];
	var option = data[4];
	var team = data[5];
	var onTarget = data[6];
	var offTarget = data[7];
	var touchedCells = data[8];
}

function Hordes_ArmageddonEvent(data) {
	var x = data[2];
	var y = data[3];
	var option = data[4];
	var team = data[5];
}

function Hordes_CatEvent(data) {
	var x = data[2];
	var y = data[3];
	var option = data[4];
	var team = data[5];
	var killed = data[6];
}

function Hordes_GunEvent(data) {
	var x = data[2];
	var y = data[3];
	var option = data[4];
	var team = data[5];
}

function Hordes_SportElecEvent(data) {
	var x = data[2];
	var y = data[3];
	var option = data[4];
	var team = data[5];
}

function Hordes_ShieldEvent(data) {
	var x = data[2];
	var y = data[3];
	var option = data[4];
	var team = data[5];
}

function Hordes_MegaShieldEvent(data) {
	var x = data[2];
	var y = data[3];
	var option = data[4];
	var team = data[5];
}

function Hordes_WaterEvent() {
	// Géré dans Hordes_ChooseCell().
}

function Hordes_TrapEvent(data) {
	var x = data[2];
	var y = data[3];
	var option = data[4];
	var team = data[5];
}

function Hordes_ZombieAttack(data) {
	var o = data[2];
	var info = data[3];
	var playedCell = data[4];
}

function Hordes_NewTurn() {}


function Paturage_Init(data) {
	var board = data[2];
}

function Paturage_Spawn(data) {
	var x = data[2];
	var y = data[3];
}

function Paturage_Move(data) {
	var x = data[2];
	var y = data[3];
	var direction = data[4];
}


function Boum_Init(data) {
	var map = data[2];
}

function Boum_SendTurn(data) {
	var pid = data[2];
	var log = data[3];
}

function Boum_Victory() {}


function Utopiz_Init(data) {
	var team = data[2];
}

function Utopiz_AddBlock(data) {
	var type = data[2];
	var bottom = data[3];
}

function Utopiz_EndBlock(data) {
	var type = data[2];
	var bottom = data[3];
}


/**************************/


function Timer() {
	this.isRunning = false;
	this.startTime = 0;
	this.overallTime = 0;
}
Timer.prototype._getTimeElapsedSinceLastStart = function() {
	if(!this.startTime) {
		return 0;
	}
	return Date.now() - this.startTime;
};
Timer.prototype.start = function() {
	if(this.isRunning) {
		return;
	}
	this.isRunning = true;
	this.startTime = Date.now();
};
Timer.prototype.stop = function() {
	if(!this.isRunning) {
		return;
	}
	this.isRunning = false;
	this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
};
Timer.prototype.getTime = function() {
	if(!this.startTime) {
		return 0;
	}
	if(this.isRunning) {
		return this.overallTime + this._getTimeElapsedSinceLastStart();
	}
	return this.overallTime;
};

// Prothèse d'émulation.
if(!String.prototype.padStart) {
	String.prototype.padStart = function padStart(targetLength, padString) {
		targetLength = targetLength >> 0;
		padString = String((typeof padString !== "undefined" ? padString : " "));
		if(this.length > targetLength) {
			return String(this);
		} else {
			targetLength = targetLength - this.length;
			if(targetLength > padString.length) {
				padString += padString.repeat(targetLength / padString.length);
			}
			return padString.slice(0, targetLength) + String(this);
		}
	};
}
