<?php

// Archive du site CaféJeux par Toad06.
// https://github.com/Toad06/CafeJeux-Archive

if(!defined("PAGE")) exit;

header("Content-Type: text/html; charset=utf-8");
ini_set("default_charset", "utf-8");


// Prothèse d'émulation pour PHP 5.6.
if(!function_exists("preg_replace_callback_array")) {
	function preg_replace_callback_array($patternsAndCallbacks, $subject, $limit = -1, &$count = null) {
		foreach($patternsAndCallbacks as $pattern => $callback) {
			$subject = preg_replace_callback($pattern, $callback, $subject, $limit, $count);
		}
		return $subject;
	}
}

?>