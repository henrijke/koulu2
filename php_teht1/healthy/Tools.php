<?php

class Tools
{
    const SAIRAALLOINEN_ALIPAINO = 15.00;
    const MERKITTAVA_ALIPAINO = 17.0;
    const LIEVA_ALIPAINO = 18.5;
    const NORMAALI = 25.0;
    const LIEVA_YLIPAINO = 30.0;
    const MERKITTAVA_YLIPAINO = 35.0;
    const VAIKEA_YLIPAINO = 40.0;
    const SAIRAALLOINEN_YLIPAINO = 40.0;

    const KORKEA_ALAPAINE = 90;
    const KORKEA_YLAPAINE = 140;



    public static function calculateBodyMassIndex($height, $weight){
        $heightMeters = $height / 100;
        $bmi = ($weight / ($heightMeters * $heightMeters));
        return $bmi;

    }

    public static function calculateBmiDescription($bodyMassIndex)
    {
        $kuvaus = null;

        if ($bodyMassIndex < self::SAIRAALLOINEN_ALIPAINO) {
            $kuvaus = "sairaalloinen alipaino.";
        } else if ($bodyMassIndex < self::MERKITTAVA_ALIPAINO) {
            $kuvaus = "merkittävä alipaino.";
        } else if ($bodyMassIndex < self::LIEVA_ALIPAINO) {
            $kuvaus = "lievä alipaino.";
        } else if ($bodyMassIndex < self::NORMAALI) {
            $kuvaus = "normaali paino.";
        } else if ($bodyMassIndex < self::LIEVA_YLIPAINO) {
            $kuvaus = "lievä ylipaino.";
        } else if ($bodyMassIndex < self::MERKITTAVA_YLIPAINO) {
            $kuvaus = "merkittävä ylipaino.";
        } else if ($bodyMassIndex < self::VAIKEA_YLIPAINO) {
            $kuvaus = "vaikea ylipaino.";
        } else {
            $kuvaus = "sairaalloisen ylipainoinen.";
        }
        return $kuvaus;
    }

        public static function calculatePressureDescription($systolic, $diastolic){
            $kuvaus= null;
        if($systolic < self::KORKEA_ALAPAINE && $diastolic < self::KORKEA_YLAPAINE){
            $kuvaus="normaali verenpaine";
        }else if($systolic > self::KORKEA_ALAPAINE && $diastolic > self::KORKEA_YLAPAINE){
            $kuvaus="korkeat verenpaineet";
        }else{
            $kuvaus="tarkkailtavalla tasolla";
        }
        return $kuvaus;
    }



}