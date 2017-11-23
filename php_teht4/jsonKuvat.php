<?php
require_once("config/config.php");
require_once ("functions/functions.php");

//Hae kuvat tietokannasta
$kuvat=getNewestMedia($DBH, 5);
//Muunna oliotaulukko json string muotoon
$jsonString = json_encode($kuvat);
//Palauta vastaus Ajax-pyyntöön
echo($jsonString);

?>
