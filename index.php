<?php

// Archive du site CaféJeux par Toad06.
// https://github.com/Toad06/CafeJeux-Archive

session_start();
define("PAGE", "index");

require "config.php";

$logged = isset($_SESSION['cafeUsername']);
$dayChanged = isset($_SESSION['cafeDay']) && $_SESSION['cafeDay'] !== date("j");

if($logged && $dayChanged && isset($_SESSION['cafeDrink'])) {
	unset($_SESSION['cafeDrink']);
	$_SESSION['cafeDayChanged'] = true;
}

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
	<meta http-equiv="Pragma" content="no-cache"/>
	<title>Le CaféJeux : Jeux multi-joueurs, bonne humeur et défis entre amis !</title>
	<link href="main.css?v=20100928162819" type="text/css" rel="stylesheet"/>
	<link href="img/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
	<script type="text/javascript" src="swfobject.js"></script>
</head>
<body>
	<div id="cache"></div>
	<div class="hidden" id="siteNewsContainer"></div>
	<div id="globalContainer">
		<div class="black loadingMask"></div>
		<div class="<?php echo $logged ? "online" : "offline"; ?>" id="siteBg">
			<div id="homeLink"><a href="#" onclick="if (js.BackForward.urlBase==null) {js.XmlHttp.get('game');} else {js.XmlHttp.get(js.BackForward.urlBase,this);} return false;"><img alt="" src="img/design/pixel.gif"/></a></div>
			<div id="siteHeader">
				<div id="contentBg">
					<div id="contentHeader">
						<div class="hidden" id="partners"></div>
						<div id="drinkContainer"></div>
						<div id="defyContainer"></div>
						<div class="server" id="headBar"></div>
						<div class="stocks">
							<div class="free" onclick="js.XmlHttp.get('bank',this);" id="userFreeMoney" onmouseover="mt.js.Tip.show(this,js.App.applyTpl('global@userFreeMoney',null),null)" onmouseout="mt.js.Tip.hide()">--</div>
							<div class="bought" onclick="js.XmlHttp.get('bank',this);" id="userMoney" onmouseover="mt.js.Tip.show(this,js.App.applyTpl('global@userMoney',null),null)" onmouseout="mt.js.Tip.hide()">--</div>
							<div class="prizeToken" onclick="js.XmlHttp.get('shop',this);" id="userPrizeToken" onmouseover="mt.js.Tip.show(this,js.App.applyTpl('global@userPrizeToken',null),null)" onmouseout="mt.js.Tip.hide()">--</div>
						</div>
						<div class="connectStatus" id="cnxIcon"></div>
						<form target="LoginFrame" method="post" action="user/ident">
							<div id="login"><?php if(!$logged) { ?>
								Pseudo <input class="field" name="ident_name" type="text"/>
								Code <input class="field" name="ident_pass" type="password"/>
								<input class="button" type="submit" value="Entrer"/>
								<input class="button b_help" onclick="js.XmlHttp.get('user/askPass',this);" type="button" value="Oubli ?"/>
							<?php } ?></div>
						</form>
						<div class="contactLink" onclick="if( mt.js.Tip.lastRef == this ){ mt.js.Tip.hide(); } else { js.XmlHttp.get('user/tipContact?rid=cl_96463',this); }" id="cl_96463">Amis</div>
						<div id="menu"></div>
						<div class="hidden" id="siteSound"></div>
						<div class="hidden" id="queue"></div>
						<div id="contentFooter">
							<div id="main">
								<noscript>
									<p class="nack">
										Ce site nécessite JavaScript pour fonctionner.
										Merci d'utiliser un navigateur compatible (Mozilla Firefox ou Internet Explorer 6 ou supérieur) et d'activer JavaScript.
									</p>
								</noscript>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="siteFooter">
			[ <a href="#help" onclick="js.XmlHttp.get('help',this); return false;">Voir l'aide de CaféJeux</a> ]
			&copy; <a href="#" onclick="return false;">Motion Twin</a>, tous droits réservés
		</div>
		<div id="ads">
			<a href="#" onclick="return false;" onmouseover="mt.js.Tip.show(this,'Optimisé pour Firefox ^^',null)" onmouseout="mt.js.Tip.hide()"><img alt="Firefox" src="img/design/firefox.gif"/></a>
			<a href="#" onclick="return false;" onmouseover="mt.js.Tip.show(this,'Site réalisé en haXe',null)" onmouseout="mt.js.Tip.hide()"><img alt="haXe" src="img/design/haxe.png"/></a>
		</div>
		<div class="hidden">
			<div id="log_sql"></div>
			<fieldset class="debug" id="debug">
				<legend>Debug haXe</legend>
				<div id="haxe:trace"></div>
			</fieldset>
		</div>
		<?php if($logged && !$dayChanged) { ?><div id="refreshWarning">
			<div class="sitePopup">
				<div class="header"></div>
				<div class="content">
					<p>
						<img alt="" src="img/icons/large_refresh.gif"/>
						Attention, l'utilisation du bouton <strong>Actualiser</strong> du navigateur est déconseillée sur le Café Jeux.<br/>
						En effet, vous serez <strong>déconnecté(e)</strong> du site.
					</p>
					<a href="#" class="button" onclick="document.getElementById('refreshWarning').style.display='none'; return false;">Oups, je ne le referai plus ^^</a>
				</div>
				<div class="footer"></div>
			</div>
			<div class="black"></div>
		</div><?php } ?>
		<div class="hidden" id="multipleLoginWarning"></div>
		<div class="hidden" id="identifyFailedWarning"></div>
		<div class="hidden" id="DayChanged"></div>
		<iframe id="HistoryFrame"></iframe>
		<div id="swf_client__">Votre lecteur Flash n'est pas à jour.</div>
		<iframe name="LoginFrame" id="LoginFrame"></iframe>
		<script type="text/javascript" src="loader.js?v=20100928162820"></script>
		<script type="text/javascript">
		//<![CDATA[
			window.fetchedCtpl = { __total: -1 };
			if(window.fetch) {
				// Les fichiers du dossier "ctpl" sont chargés de manière synchrone avec XMLHttpRequest, ce qui est déprécié ou obsolète dans tous les navigateurs actuels.
				// Pour contourner le problème, ces fichiers sont désormais préchargés ici avant toute autre opération, ce qui est raisonnable vu leur très petite taille.
				try {
					var cjFetch = async function(url) {
						var response = await fetch(url);
						var responseText = await response.text();
						fetchedCtpl[url] = responseText;
						if(++fetchedCtpl.__total === 5) {
							var run = o.run;
							o = new haxe.Timer(200);
							o.run = run;
						}
					};
					fetchedCtpl.__total = 0;
					cjFetch("ctpl/chat.mtt"); cjFetch("ctpl/defy.mtt"); cjFetch("ctpl/game.mtt"); cjFetch("ctpl/global.mtt"); cjFetch("ctpl/shop.mtt");
				} catch(err) {}
			}
			var so = new SWFObject("swf/client.swf?v=20100928162820", "client", "1", "1", "0", "#32273A", true);
			so.write("swf_client__");
			var a = 0;
			var o = fetchedCtpl.__total >= 0 ? {} : new haxe.Timer(200);
			o.run = function() {
				try	{
					a++;
					if(a >= 60) {
						window.location.href = "static/require";
						o.stop();
					}
					var x = window.document["client"];
					if(x == null) x = window.document.getElementById("client");
					if(x == null) throw "Could not find flash object";
					if(x.externalRemotingCall == null) throw "Flash object not initialized";
					o.stop();
					js.App.DATA = "./";
					js.App.main("CMfEH6Ceji6XNeDDPgUNe6eKGZW2FgOd");
					js.XmlHttp.enqueue("head");
					if(js.Lib.window.location.hash.length <= 1) js.XmlHttp.enqueue('<?php echo $logged ? "game" : "static/present"; ?>');
					js.BackForward.init();
				} catch(e) {
					// haxe.Log.trace(e);
				}
			};
		//]]>
		</script>
	</div>
</body>
</html>