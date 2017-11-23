<?php
require_once("../people/Patient.php");

$pt = new Patient("Pete Potilas", 80,172.5,78,115);
echo("<h3>3.a Patient: </h3>" . $pt->getInfo());
echo("Alapaineen raja ".Tools::KORKEA_ALAPAINE . ", yläpaineen raja " . Tools::KORKEA_YLAPAINE . ")<br>");
$pt->setBloodPressure(95,160);
echo("<h3>3.b Sick patient: </h3>".$pt->getInfo());