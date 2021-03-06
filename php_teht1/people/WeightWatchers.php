<?php
    require_once("Person.php");
    require_once("../healthy/Tools.php");
class WeightWatchers extends Person{


    private $weight, $height,$bmi,$bmiDescription = "undefined";

    public function __construct($name, $height, $weight)
    {
        parent::__construct($name); // TODO: Change the autogenerated stub

        $this->weight=$weight;
        $this->height=$height;
        $this->defineBmi($this->weight,$this->height);

    }
    private function defineBmi($weight,$height){
        $this->bmi = Tools::calculateBodyMassIndex($height,$weight);
        $this->bmiDescription = Tools::calculateBmiDescription($this->bmi);
    }

    public function setWeightHeight($weight, $height){
        $this->weight=$weight;
        $this->height=$height;
        $this->defineBmi($this->weight,$this->height);
    }

    public function getInfo(){
        $temp = parent::getInfo();
        $temp .= "paino $this->weight kg, pituus $this->height m ==> painoindeksi = $this->bmi) eli $this->bmiDescription";
        return $temp;

    }
}