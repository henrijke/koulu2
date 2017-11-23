<?php

class Person{


    private $name;

    public function __construct($name){
        $this->name=$name;
}

    public function getInfo(){
        return $this->name;
    }




}