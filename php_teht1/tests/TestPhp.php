<?php
require_once("../people/Person.php");

$person = new Person("Maija Poppanen");
$output = $person->getInfo();
echo("<h3>1.Person</h3> $output");