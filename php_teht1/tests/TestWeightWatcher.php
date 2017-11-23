<?php
    require_once("../people/WeightWatchers.php");


$ww = new WeightWatchers("Lalli Laihduttaja", 60.5,179.0);
$ali = Tools::LIEVA_ALIPAINO;
$normi = Tools::NORMAALI;

echo ("(Normaali bmi on välillä $ali - $normi)<br>");

$ww->setWeightHeight(102,191);

echo("<h3>2.b. Fallen weight watcher: </h3>" . $ww->getInfo() . "<br>");