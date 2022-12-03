<?php

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

// Liste des joueurs dont les pages sont conservées
$globalPlayers = array(
	81 => "tchong", 33208 => "3Dos", 16732 => "Zehir", /*18269 => "Toad06",*/ 190420 => "all200", 243719 => "totolescargo", 258748 => "Mario06", 265566 => "adeli", 275028 => "cedric85",
	296239 => "tony42", 302576 => "CashMan", 307984 => "yanndu28", 328173 => "natoun", 340881 => "rastahman", 353165 => "BzzlaMouche", 455222 => "Stampinette"
);
$globalPlayers[18269] = isset($_SESSION['cafeUsername']) ? $_SESSION['cafeUsername'] : "Toad06";


// Variables utilisateur
$globalUserFreeMoney = 3; // nombre de sucres blancs
$globalUserMoney = 100; // nombre de sucres roux
$globalUserPrizeToken = 500; // nombre de caps
$globalUserCity = (isset($_SESSION['cafeUsername']) && trim(strtolower($_SESSION['cafeUsername'])) === "toad06") ? "NISSA" : "Le PC du Café Jeux"; // ville du profil


// Retourne la date du jour dans les différents formats utilisés par CaféJeux
function cj_date_today() {
	$date =  new IntlDateFormatter("fr_FR", IntlDateFormatter::FULL, IntlDateFormatter::NONE);
	$date = $date->format(time());
	$dateFull = "Le " . $date . ", à " . date("H:i:s");
	$datePartial = "Aujourd'hui à " . date("H:i");
	return array($dateFull, $datePartial);
}

// Génère un avatar aléatoire sur les pages de joueurs non archivées
// TODO: Comprendre le fonctionnement de la variable gfx du swf et finir la fonction
function random_avatar() {
	// viewer.swf?gfx=0,0,0,0,0,0,0,0,2,0,0,0,3,0,3,6,6,0
	$data = "";
	for($i = 0; $i < 18; $i++) {
		if($i > 0) $data .= ",";
		$r = 0;
		switch($i) {
			case 0: $r = mt_rand(0, 0); break;
			default: $r = mt_rand(0, 0); break;
		}
		$data .= strval($r);
	}
	return $data;
}

// Formate un message en HTML, en remplaçant les balises BBCode, smileys, etc.
// Utilisé uniquement sur la page "Aperçu" du forum, dans le cadre de cette archive.
function parse_message($str) {
	$arr = explode(" ", $str);
	$arrLength = count($arr);
	for($i = 0; $i < $arrLength; $i++) {
		$arr[$i] = wordwrap($arr[$i], 30, " ", true);
	}
	$str = implode("", $arr);
	// TODO
	return $str;
}

?>