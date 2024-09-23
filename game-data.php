<?php

// Archive du site CaféJeux par Toad06.
// https://github.com/Toad06/CafeJeux-Archive

if(!defined("PAGE")) exit;


// Tout sur les boissons du Café Jeux...
$globalDrinks = array(
	0 => array("name" => "Café «Intense»", "img" => "package_coffee.gif", "css" => "drink_coffee", "desc" => "Le grand classique du Café Jeux. Son goût unique et ses arômes intenses en font la réputation sur tout le net."),
	1 => array("name" => "ChocoJeux chaud", "img" => "package_choco.gif", "css" => "drink_choco", "desc" => "ChocoJeux, c'est un délicieux chocolat, faible en matières grasses et riche en vitamines, fer et calcium !"),
	2 => array("name" => "Thé classique", "img" => "package_tea.gif", "css" => "drink_tea", "desc" => "Ce thé original au goût intact saura vous emporter dans un voyage spirituel aux origines mystiques d'une civilisation de légende."),
	3 => array("name" => "Cappuccino «Mystère»", "img" => "package_cappu.gif", "css" => "drink_cappu", "desc" => "Savourez sa mousse onctueuse et généreuse pendant une partie sur CaféJeux."),
	4 => array("name" => "Thé «Mint Royale»", "img" => "package_mint.gif", "css" => "drink_mint", "desc" => "Goûtez aux parfums enivrants de ce thé venu d'Orient et porteur de toute la sagesse des vieux chameaux du désert."),
	5 => array("name" => "Expresso corsé", "img" => "package_black.gif", "css" => "drink_black", "desc" => "Un coup de fouet pour les réveils difficiles."),
	6 => array("name" => "Café Framboisino", "img" => "package_frutish.gif", "css" => "drink_frutish", "desc" => "La rencontre surprenante d'un café de caractère et d'un fruit aux accents boisés."),
	7 => array("name" => "Fruithé rouge", "img" => "package_fruit.gif", "css" => "drink_fruit", "desc" => "Délicatement parfumé aux fruits des bois, le Fruithé a su restituer les arômes subtils d'un soir d'automne."),
	8 => array("name" => "Grog", "img" => "package_grog.gif", "css" => "drink_grog", "desc" => "La recette originale du grog vanillé du Scumm Bar, aux accents de rhum des îles (contient du kérosène, du propylène-glycol, de la graisse d'essieu, du pepperoni, entre autres...)."),
	9 => array("name" => "Café Marshmallow", "img" => "package_coffmarsh.gif", "css" => "drink_coffmarsh", "desc" => "Un goût parfaitement équilibré et une merveilleuse puissance aromatique : vous serez séduit par son onctuosité si agréable au palais."),
	10 => array("name" => "ChocoJeux Marshmallow", "img" => "package_chocmarsh.gif", "css" => "drink_chocmarsh", "desc" => "ChocoJeux Marshmallow vous apporte énergie et bonne humeur pour bien démarrer la journée."),
	11 => array("name" => "Ultra Orange", "img" => "package_orange.gif", "css" => "drink_orange", "desc" => "Faites le plein d'énergie positive et rigolote avec un délicieux jus d'oranges pressées et laissez-vous bercer par les doux rayons de soleil du matin !"),
	12 => array("name" => "L'Anarchipel", "img" => "package_blue.gif", "css" => "drink_blue", "desc" => "Partez à l'aventure avec ce coktail aux mystérieuses saveurs exotiques et aux surprenants accents tropicaux !")
);

// Liste des joueurs dont les pages sont conservées.
$globalPlayers = array(
	81 => "tchong", 16732 => "Zehir", /*18269 => "Toad06",*/ 33208 => "3Dos", 190420 => "all200", 243719 => "totolescargo", 258748 => "Mario06", 265566 => "adeli", 275028 => "cedric85",
	296239 => "tony42", 302576 => "CashMan", 307984 => "yanndu28", 328173 => "natoun", 340881 => "rastahman", 353165 => "BzzlaMouche", 455222 => "Stampinette",
	// Les pseudos ci-dessous sont simplement réservés pour éviter toute confusion car ils occupent une place non négligeable dans l'archive.
	213073 => "githe", 470689 => "Keviindu61", 480488 => "Nath0u"
);
$globalPlayers[18269] = isset($_SESSION['cafeUsername']) ? htmlentities($_SESSION['cafeUsername']) : "Toad06";


// Variables utilisateur.
$globalUserFreeMoney = 3; // nombre de sucres blancs
$globalUserMoney = 100; // nombre de sucres roux
$globalUserPrizeToken = 500; // nombre de caps
$globalUserCity = (isset($_SESSION['cafeUsername']) && mb_strtolower($_SESSION['cafeUsername']) === "toad06") ? "NISSA" : "Le PC du Café Jeux"; // ville du profil
$globalUserData = array("username" => "Toad06", "gender" => 0, "gfx" => "0,0,0,0,0,0,0,0,2,0,0,0,3,0,3,6,6,0"); // données définies sur la page d'inscription
if(isset($_SESSION['cafeUsername']) && isset($_COOKIE['cafeUserData'])) {
	$getUserData = json_decode($_COOKIE['cafeUserData'], true);
	if($getUserData !== null && mb_strtolower($_SESSION['cafeUsername']) === mb_strtolower($getUserData['username'])) {
		$_SESSION['cafeUsername'] = $getUserData['username'];
		$globalUserData['username'] = $getUserData['username'];
		$globalUserData['gender'] = $getUserData['gender'];
		$globalUserData['gfx'] = $getUserData['gfx'];
	}
	unset($getUserData);
}


// Retourne la date du jour dans les différents formats utilisés par CaféJeux.
function cj_date_today() {
	$date = new IntlDateFormatter("fr_FR", IntlDateFormatter::FULL, IntlDateFormatter::NONE);
	$date = $date->format(time());
	$dateFull = "Le " . $date . ", à " . date("H:i:s");
	$datePartial = "Aujourd'hui à " . date("H:i");
	return array($dateFull, $datePartial);
}

// Génère un avatar aléatoire sur les pages de joueurs non archivées.
// Le personnage par défaut sur la page d'inscription a ces caractéristiques : "viewer.swf?gfx=0,0,0,0,0,0,0,0,2,0,0,0,3,0,3,6,6,0".
// Les valeurs générées correspondent à l'ordre des différentes options dans le SWF de la page d'inscription.
function random_avatar() {
	$gender = "";
	$gfx = "";
	for($i = 0; $i < 18; $i++) {
		if($i > 0) $gfx .= ",";
		$r = 0;
		switch($i) {
			case 0: $r = mt_rand(0, 1) === 0 ? 0 : 29; $gender = $r === 29 ? "female" : "male"; break; // homme (0 à 28) ou femme (29 à 58) - seules les valeurs 0 et 29 sont en réalité utilisées
			case 1: $r = 0; break; // usage inconnu - toujours 0, quel que soit le contexte - cette valeur servait peut-être à identifier la boisson à afficher sur une table mais le système a pu être implémenté différemment
			case 2: if($gender === "female") $r = mt_rand(0, 7); else $r = mt_rand(0, 10); break; // style vestimentaire haut
			case 3: if($gender === "female") $r = mt_rand(0, 3); else $r = mt_rand(0, 2); break; // style vestimentaire bas
			case 4: if($gender === "female") $r = mt_rand(0, 8); else $r = mt_rand(0, 17); break; // style capillaire (et barbe, pour homme)
			case 5: $r = mt_rand(0, 6); break; // couleur de peau
			case 6: $r = mt_rand(0, 14); break; // homme seulement : couleur du t-shirt
			case 7: $r = mt_rand(0, 10); break; // homme seulement : couleur du pantalon
			case 8: $r = mt_rand(0, 8); break; // homme seulement : couleur des cheveux
			case 9: $r = mt_rand(0, 4); break; // homme seulement : couleur de la veste, si applicable
			case 10: $r = mt_rand(0, 4); break; // homme seulement : couleur du blouson, si applicable
			case 11: $r = mt_rand(0, 14); break; // femme seulement : couleur du t-shirt
			case 12: $r = mt_rand(0, 14); break; // femme seulement : couleur du pantalon
			case 13: $r = mt_rand(0, 8); break; // femme seulement : couleur des cheveux
			case 14: $r = mt_rand(0, 5); break; // femme seulement : couleur de l'accessoire à cheveux, si applicable
			case 15: $r = mt_rand(0, 14); break; // homme seulement : couleur du motif du t-shirt, si applicable
			case 16: $r = mt_rand(0, 14); break; // femme seulement : couleur du motif du t-shirt, si applicable
			case 17: $r = mt_rand(0, 14); break; // couleur de la rayure du pantalon, si applicable
		}
		$gfx .= strval($r);
	}
	return array("gender" => $gender, "gfx" => $gfx);
}

// Retourne la valeur utilisée par la clé "inv" du fichier Flash de la table de jeu "CaféJeux 2007-2020".
// Elle permet de disposer de tous les meubles en quantité élevée, ainsi que d'autres dont l'existence n'avait pas été révélée.
// Voir "_toad06/_dev_misc/table/edition.html" pour plus d'informations.
function full_inventory() {
	return "IYZ9q0aWtL6lSqumpddg_idbLx4yjayoO5EI7efddWWKfbAJL6lSqumpdcquhQoxOUXbqW8mjbqPQoxOUXbqW8mjbqRQoxOUXbqW8mjbqTQoxOUXbqW8mjbqVQoxOUXbqW8mjbqXQoxOUXbqW8mjbqZQoxOUXbqW8mjbq1QoxOUXbqW8mjbq3QoxOUXbqW8mjbq5QoxOUXbqW8mjbq7QoxOUXbqW8mjbq9QoxOUXbqW8mjbq_QoxOUXbqW8mjbriAJL6lSqumpdcqusoO5EI7efddWWKfeLQoxOUXbqW8mjbrj6JL6lSqumpdcqusMO5EI7efddWWKjeRQoxOUXbqW8mjcrlAJL6lSqumpdcqKs-O5EI7efddWWKjeXQoxOUXbqW8mjcrm6JL6lSqumpdcqKtwO5EI7efddWWKje3QoxOUXbqW8mjcroAJL6lSqumpdcqKtUO5EI7efddWWKje9QoxOUXbqW8mjdrp6JL6lSqumpdcq0ugO5EI7efddWWKnfdQoxOUXbqW8mjdrrAJL6lSqumpdcq0uEO5EI7efddWWKnfjQoxOUXbqW8mjdrs6JL6lSqumpdcq0u2O5EI7efddWWKnfpQoxOUXbqW8mjdruAJL6lSqumpdcrrftQoxOUXbqW8mjfevwO5EI7efddWWKurv6JL6lSqumpdcrrfzQoxOUXbqW8mjfevUO5EI7efddWWKvrxAJL6lSqumpdcrvfFQoxOUXbqW8mjfuwgO5EI7efddWWKvry6JL6lSqumpdcrvfLQoxOUXbqW8mjfKwEO5EI7efddWWKwrAAJL6lSqumpdcrzfRQoxOUXbqW8mjfKw2O5EI7efddWWKwrB6JL6lSqumpdcrDfXQoxOUXbqW8mjf0xoO5EI7efddWWKxrDAJL6lSqumpdcrDf3QoxOUXbqW8mjf0xMO5EI7efddWWKArE6JL6lSqumpdcrPf9QoxOUXbqW8mjgKx-O5EI7efddWWKArGaGAJL6lSqumpdcrPgacdQoxOUXbqW8mjg0yaiwO5EI7efddWWKBrGaH6JL6lSqumpdcrTgacjQoxOUXbqW8mjg0yaiUO5EI7efddWWKBrGaJAJL6lSqumpdcrXgacpQoxOUXbqW8mjheyajgO5EI7efddWWKCrGaK6JL6lSqumpdcrXgacvQoxOUXbqW8mjheyajEO5EI7efddWWKDrGaMAJL6lSqumpdcr1gacBQoxOUXbqW8mjhuyaj2O5EI7efddWWKDrGaN6JL6lSqumpdcr1gacHQoxOUXbqW8mjhKyakoO5EI7efddWWKErGaPAJL6lSqumpdcr9gacNQoxOUXbqW8mjh0yakMO5EI7efddWWKFrGaQ6JL6lSqumpdcr9gacTQoxOUXbqW8mjh0yak-O5EI7efddWWKFrGaSAJL6lSqumpdcr9gacZQoxOUXbqW8mjh0yalwO5EI7efddWWKFrGaT6JL6lSqumpdcr9gac5QoxOUXbqW8mjjbgac7QoxOUXbqW8mjjbgac9QoxOUXbqW8mjjbgac_QoxOUXbqW8mjjbgadbQoxOUXbqW8mjjbgaddQoxOUXbqW8mjjfgadfQoxOUXbqW8mjjfgadhQoxOUXbqW8mjjfgadjQoxOUXbqW8mjjfgadlQoxOUXbqW8mjjfgadnQoxOUXbqW8mjjngadpQoxOUXbqW8mjjngadrQoxOUXbqW8mjjngadtQoxOUXbqW8mjjngadvQoxOUXbqW8mjjngadxQoxOUXbqW8mjjngadzQoxOUXbqW8mjjngadBQoxOUXbqW8mjjngadDQoxOUXbqW8mjjngadFQoxOUXbqW8mjjngadHQoxOUXbqW8mjjngadJQoxOUXbqW8mjjngadLQoxOUXbqW8mjjngadNQoxOUXbqW8mjjngadPQoxOUXbqW8mjjngadRQoxOUXbqW8mjjngadTQoxOUXbqW8mjjngadVQoxOUXbqW8mjjngadXQoxOUXbqW8mjjngadZQoxOUXbqW8mjjngad1QoxOUXbqW8mjjrgad3QoxOUXbqW8mjjrgad5QoxOUXbqW8mjjrgad7QoxOUXbqW8mjjrgad9QoxOUXbqW8mjjrgad_QoxOUXbqW8mjjrgaebQoxOUXbqW8mjjrgaedQoxOUXbqW8mjjrgaefQoxOUXbqW8mjjrgaehQoxOUXbqW8mjjrgaejQoxOUXbqW8mjjvgaelQoxOUXbqW8mjjvgaenQoxOUXbqW8mjjvgaepQoxOUXbqW8mjjvgaerQoxOUXbqW8mjjvgaetQoxOUXbqW8mjjvgaevQoxOUXbqW8mjjvgaexQoxOUXbqW8mjjvgaezQoxOUXbqW8mjjvgaeBQoxOUXbqW8mjjvgaeDQoxOUXbqW8mjjzgaeFQoxOUXbqW8mjmagvgaeHQoxOUXbqW8mjmagvgaeJQoxOUXbqW8mjmagvgaeLQoxOUXbqW8mjmagvgaeNQoxOUXbqW8mjmagvgaePQoxOUXbqW8mjmagzgaeRQoxOUXbqW8mjmagzgaeTQoxOUXbqW8mjmagzgaeVQoxOUXbqW8mjmagzgaeXQoxOUXbqW8mjmagzgaeZQoxOUXbqW8mjmagDgae1QoxOUXbqW8mjmagDgae3QoxOUXbqW8mjmagDgae5QoxOUXbqW8mjmagDgae7QoxOUXbqW8mjmagDgae9QoxOUXbqW8mjmagHgae_QoxOUXbqW8mjmagHgafbQoxOUXbqW8mjmagHgafdQoxOUXbqW8mjmagHgaffQoxOUXbqW8mjmagHgafhQoxOUXbqW8mjmagLgafjQoxOUXbqW8mjmagLgaflQoxOUXbqW8mjmagLgafnQoxOUXbqW8mjmagLgafpQoxOUXbqW8mjmagLgafrQoxOUXbqW8mjmagPgaftQoxOUXbqW8mjmagTgafvQoxOUXbqW8mjmagXgafxQoxOUXbqW8mjmag1gafzQoxOUXbqW8mjmag5gafBQoxOUXbqW8mjmag9gafDQoxOUXbqW8mjmahbgafFQoxOUXbqW8mjmahfgafHQoxOUXbqW8mjmahjgafJQoxOUXbqW8mjmahngafLQoxOUXbqW8mjmahngafNQoxOUXbqW8mjmahngafPQoxOUXbqW8mjmahngafRQoxOUXbqW8mjmahngafTQoxOUXbqW8mjmahngafVQoxOUXbqW8mjmahngafXQoxOUXbqW8mjmahngafZQoxOUXbqW8mjmahngaf1QoxOUXbqW8mjmahngaf3QoxOUXbqW8mjmahngaf5QoxOUXbqW8mjmahngaf7QoxOUXbqW8mjmahngaf9QoxOUXbqW8mjmahngaf_QoxOUXbqW8mjmahngagbQoxOUXbqW8mjmahngagdQoxOUXbqW8mjmahngagfQoxOUXbqW8mjmahngaghQoxOUXbqW8mjmahngagjQoxOUXbqW8mjmahngaglQoxOUXbqW8mjmamLgagnQoxOUXbqW8mjmamLgagpQoxOUXbqW8mjmamLgagrQoxOUXbqW8mjmamLgagtQoxOUXbqW8mjmamLgagvQoxOUXbqW8mjmamLgagxQoxOUXbqW8mjmamLgagzQoxOUXbqW8mjmamLgagBQoxOUXbqW8mjmamLgagDQoxOUXbqW8mjmamLgagFQoxOUXbqW8mjmamLgagHQoxOUXbqW8mjmamLgagJQoxOUXbqW8mjmamLgagLQoxOUXbqW8mjmamLgagNQoxOUXbqW8mjmamLgagPQoxOUXbqW8mjmamLgagRQoxOUXbqW8mjmamLgagTQoxOUXbqW8mjmamLgagVQoxOUXbqW8mjmamLgagXQoxOUXbqW8mjmamLgagZQoxOUXbqW8mjmam1gag1QoxOUXbqW8mjmam1gag3QoxOUXbqW8mjmam1gag5QoxOUXbqW8mjmam1gag7QoxOUXbqW8mjmam1gag9QoxOUXbqW8mjmam1gag_QoxOUXbqW8mjmam1gahbQoxOUXbqW8mjmam1gahdQoxOUXbqW8mjmam1gahfQoxOUXbqW8mjmam1gahhQoxOUXbqW8mjmam1gahjQoxOUXbqW8mjmam1gahlQoxOUXbqW8mjmam1gahnQoxOUXbqW8mjmam1gahpQoxOUXbqW8mjmam1gahrQoxOUXbqW8mjmam1gahtQoxOUXbqW8mjmam1gahvQoxOUXbqW8mjmam1gahxQoxOUXbqW8mjmam1gahzQoxOUXbqW8mjmam1gahB4qlpa";
}

// Formate un message en HTML, en remplaçant les balises de type BBCode, smileys, etc.
function parse_message($str, $allowTags = true, $allowImages = null, $allowSmileys = true, $allowMultiline = true) {
	if($allowImages === null) {
		$allowImages = $allowTags;
	}
	$str = htmlspecialchars($str);
	if($allowTags) {
		$urlentities = function($str) {
			// Empêche certains caractères contenus dans les liens de provoquer des "interférences" avec les autres masques.
			return str_replace(
				array("*", "/", ":", "=", "@", "_"),
				array("&#42;", "&#47;", "&#58;", "&#61;", "&#64;", "&#95;"),
				$str
			);
		};
		$tags = array(
			// On vérifie d'abord les balises de lien hypertexte.
			// NOTE : cafejeux.com ne reconnaissait pas les liens commençant par "https://". Une autre époque... :)
			'~\[lien\](https?)://([^\s]*?)\[/lien\]~s' => function($m) use($urlentities) {
				$url = $m[1] . "://" . $m[2];
				$encodedUrl = urlencode(html_entity_decode($url));
				$displayedUrl = $m[2];
				if(mb_strlen($displayedUrl) > 30) {
					$displayedUrl = mb_substr($displayedUrl, 0, 30) . "...";
				}
				$displayedUrl = $urlentities($displayedUrl);
				return '<a target="_blank" href="redir?url=' . $encodedUrl . '">' . $displayedUrl . '</a>';
			},
			'~\[lien=(https?)://([^\s]*?)\](.*?)\[/lien\]~s' => function($m) use($urlentities) {
				$url = $m[1] . "://" . $m[2];
				$encodedUrl = urlencode(html_entity_decode($url));
				$displayedUrl = $m[3];
				if($displayedUrl === $m[2]) {
					if(mb_strlen($displayedUrl) > 30) {
						$displayedUrl = mb_substr($displayedUrl, 0, 30) . "...";
					}
					$displayedUrl = $urlentities($displayedUrl);
				}
				return '<a target="_blank" href="redir?url=' . $encodedUrl . '">' . $displayedUrl . '</a>';
			},
			// Au tour des images... si elles sont autorisées.
			'~@((https?)://[^\s]*?)@~s' => function($m) use($allowImages, $urlentities) {
				if($allowImages) {
					$src = $urlentities($m[1]);
					return '<img src="' . $src . '" alt="" />';
				} else {
					return $m[0];
				}
			},
			// Place aux différentes polices d'écriture et couleurs, les "encres" de la boutique CaféJeux.
			// NOTE : cafejeux.com vérifiait que l'encre utilisée avait bien été achetée au préalable par le rédacteur du message.
			'~#([0-9]+)#(.*?)##~s' => function($m) {
				$colorId = intval($m[1]);
				$text = $m[2];
				if($colorId <= 0 || $colorId > 8) return $text;
				return '<span class="color_' . $colorId . '">' . $text . '</span>';
			},
			// Enfin, on convertit les balises les plus simples.
			'~\*(.*?)\*~s' => function($m) {
				// Texte en gras.
				return '<strong>' . $m[1] . '</strong>';
			},
			'~(?<!:)//(.*?)(?<!:)//~s' => function($m) {
				// Texte en italique.
				return '<em>' . $m[1] . '</em>';
			},
			'~__(.*?)__~s' => function($m) {
				// Texte souligné.
				return '<span class="underline">' . $m[1] . '</span>';
			},
			'~===(.*?)===~s' => function($m) {
				// Titre.
				// NOTE : Cette commande avait seulement été documentée dans la rubrique "Guide de CaféJeux" sur le site Motion Twin.
				return '<h3>' . $m[1] . '</h3>';
			},
			'~\[cite\](.*?)\[/cite\]~s' => function($m) {
				// Citation.
				return '<cite>' . $m[1] . '</cite>';
			}
		);
		$str = preg_replace_callback_array($tags, $str);
	}
	// Smileys.
	if($allowSmileys) {
		$findSmileys = array(
			":)", ":(", ":D", ";)", ":quoi:", ":o", "8O", "8)", ":x", ":P", ":!:", ":?", ":timide:", ":lol:", ":pleure:", ":mechant:", ":sadique:", ":innocent:", ":wink:", ":dontcare:",
			":huh:", ":noon:", ":youpi:", ":idee:", ":charte:", ":fleche:", ":croix:", ":love:", ":sucreblanc:", ":sucre:", ":mail:", ":match:", ":table:", ":tasse:", ":caps:", ":chrono:",
			":keepcool:" // NOTE : Ce smiley a seulement été ajouté sur les sites liés à Muxxu, jamais sur cafejeux.com.
		);
		$replaceSmileys = array(
			"smile", "sad", "biggrin", "wink", "question", "surprised", "eek", "cool", "mad", "razz", "exclaim", "confused", "redface", "lol", "cry", "evil", "twisted", "rolleyes", "wink2", "dontcare",
			"huh", "nooo", "yeah", "idea", "chart", "arrow", "cross", "love", "sucreblanc", "sucreroux", "mail", "fight", "table", "tasse", "cap", "chrono",
			"keepcool"
		);
		$smileysLength = count($findSmileys) === count($replaceSmileys) ? count($replaceSmileys) : 0;
		for($i = 0; $i < $smileysLength; $i++) {
			$replaceSmileys[$i] = '<img src="img/smiley/icon_' . $replaceSmileys[$i] . '.gif" alt="' . $findSmileys[$i] . '" />';
		}
		$str = str_replace($findSmileys, $replaceSmileys, $str);
	}
	// NOTE : cafejeux.com effectuait une césure des chaînes dont la longueur dépassait les 30 caractères (ou, plus exactement, 30 bytes).
	// Le code ci-dessous tente de reproduire le plus fidèlement possible ce comportement.
	$strLength = mb_strlen($str);
	$charactersCounter = 0;
	$htmlentityCurrentChars = "";
	$isTagOpen = false;
	for($i = 0; $i < $strLength; $i++) {
		$char = mb_substr($str, $i, 1);
		// On détecte les balises HTML.
		// Celles-ci doivent être exclues du processus de césure de la chaîne.
		if($char === "<" || $char === ">") {
			$isTagOpen = $char === "<";
			continue;
		}
		if($isTagOpen) {
			continue;
		}
		// On détecte les entités HTML pour déterminer les caractères réellement affichés à l'écran.
		// Par exemple, "&lt;" correspond à "<" et ne doit donc compter que pour 1 seul caractère au lieu de 4.
		$htmlentityCurrentLength = mb_strlen($htmlentityCurrentChars);
		if($htmlentityCurrentLength === 0) {
			if($char === "&") {
				$htmlentityCurrentChars = "&";
				$htmlentityCurrentLength = 1;
			}
		} else {
			$htmlentityCurrentChars .= $char;
			if($char === ";") {
				$htmlentityCurrentLength = -1;
			} else {
				$htmlentityCurrentLength++;
			}
		}
		if($htmlentityCurrentLength > 0) {
			continue;
		}
		// On peut maintenant déterminer si une césure est à effectuer.
		if($char === " " || $char === "\r" || $char === "\n" || $char === "\t") {
			$charactersCounter = 0;
		} else {
			if($htmlentityCurrentLength === -1) {
				$char = html_entity_decode($htmlentityCurrentChars);
				$htmlentityCurrentChars = "";
			}
			$charactersCounter += strlen($char);
			if($charactersCounter > 30) {
				$str = mb_substr($str, 0, $i) . " " . mb_substr($str, $i);
				$charactersCounter = 0;
				$strLength++;
			}
		}
	}
	// Multiligne.
	if($allowMultiline) {
		$str = nl2br($str);
	}
	// Le message est prêt.
	return $str;
}

// Détecte les commandes spéciales utilisées sur les chats.
function parse_command($str) {
	if(strpos($str, "/") !== 0) return null;
	$command = mb_strtolower(explode(" ", $str)[0]);
	if($command === "/me") {
		$type = "speech";
		$str = mb_substr($str, 3);
		if(empty($str)) {
			// NOTE : La requête est invalide si cette commande n'est pas suivie d'un message.
			// (Toad06) cafejeux.com ne faisait sans doute pas cette vérification, mais elle semble pourtant avoir du sens.
			$type = "invalid";
		}
	} else {
		$commands = array( // "/commande" => "nom de la propriété dans `_ChatCommand`, côté Flash et JavaScript"
			"/lol" => "_Lol", "/mdr" => "_Lol",
			"/yes" => "_Yes", "/oui" => "_Yes", "/vi" => "_Yes",
			"/no" => "_No", "/non" => "_No",
			"/love" => "_Love", "/aime" => "_Love",
			"/cry" => "_Cry", "/pleure" => "_Cry",
			"/out" => "_Out", "/sort" => "_Out", "/sors" => "_Out",
			"/cool" => "_Happy", "/content" => "_Happy",
			"/puke" => "_Puke", "/vomi" => "_Puke",
			"/jump" => "_Jump", "/saute" => "_Jump", "/hop" => "_Jump",
			"/play" => "_Fight", "/duel" => "_Fight", "/defi" => "_Fight", "/jouer" => "_Fight",
			"/angry" => "_Angry", "/enerve" => "_Angry",
			"/token" => "_Token", "/sucre" => "_Token"
		);
		if(array_key_exists($command, $commands)) {
			$type = "cmd" . $commands[$command];
		} else {
			// NOTE : Les messages commençant par "/" mais qui ne sont pas des commandes spéciales valides doivent être ignorés.
			$type = "invalid";
		}
	}
	$str = parse_message($str, false, false, false, false);
	return array($type, $str);
}

?>