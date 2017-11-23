<?php
session_start();
/*
define(SAIRAALLOINEN_ALIPAINO, 15.0);
define(MERKITTAVA_ALIPAINO, 17.0);
define(LIEVA_ALIPAINO, 18.5);
define(NORMAALI, 25.0);
define(LIEVA_YLIPAINO, 30.0);
define(MERKITTAVA_YLIPAINO, 35.0);
define(VAIKEA_YLIPAINO, 40.0);
*/

function calculateBoyMassIndex($weight, $height){
    $heightMeters = $height / 100;
    $bmi = ($weight / ($heightMeters * $heightMeters));
    return $bmi;

}

//This works in 5.2.3
//First function turns SSL on if it is off.
//Second function detects if SSL is on, if it is, turns it off.



//==== Redirect... Try PHP header redirect, then Java redirect, then try http redirect.:
function redirect($url){
    if (!headers_sent()){    //If headers not sent yet... then do php redirect
        header('Location: '.$url); exit;
    }else{                    //If headers are sent... do java redirect... if java disabled, do html redirect.
        echo '<script type="text/javascript">';
        echo 'window.location.href="'.$url.'";';
        echo '</script>';
        echo '<noscript>';
        echo '<meta http-equiv="refresh" content="0;url='.$url.'" />';
        echo '</noscript>'; exit;
    }
}//==== End -- Redirect



//==== Turn on HTTPS - Detect if HTTPS, if not on, then turn on HTTPS:
function SSLon(){
    if($_SERVER['HTTPS'] != 'on'){
        $url = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        redirect($url);
    }
}//==== End -- Turn On HTTPS



//==== Turn Off HTTPS -- Detect if HTTPS, if so, then turn off HTTPS:
function SSLoff(){
    if($_SERVER['HTTPS'] == 'on'){
        $url = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        redirect($url);
    }
}//==== End -- Turn Off HTTPS

