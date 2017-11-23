<?php
session_start();
//ALLAOLEVA ESIMERKKI MITEN SAADAAN SESSIONIIN TAVARAA:D:D:D:D:)):))
$_SESSION["luku"] = 134;
?>

<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>lomake</title>

</head>

<body>
<form action="">
<?php
//TODO LAITA SE NIMI PÄIVITTYMÄÄN AUTOMAATTISESTI
include("nimi_lomake.php");
include("paino_lomake.php");
?>
</form>
<div>
    <?php
    if(!empty($_GET['name'])){
        //TAllennetaan sessiomuuttujaan
        $_SESSION['nimi'] = $_GET['name'];
    }
    if(!empty($_SESSION['nimi'])){
        echo("<h2>1. Annoit nimen: ". $_SESSION['nimi'] . "!</h2>");
    }
    ?>
</div>
<p>testi5</p>
<div>
    <?php
        include("functions.php");
        if(!empty($_GET['weight']) && !empty($_GET['height'])){
            $paino = $_GET['weight'];
            $pituus = $_GET['height'];
        $ibm = calculateBoyMassIndex($paino,$pituus);
        $_SESSION['weight'] = $paino;
        $_SESSION['height'] = $pituus;
        $_SESSION['ibm'] = round($ibm,1);
    }

        if(!empty($_SESSION['ibm'])){
            echo("<h2> 2. Annoit arvot: paino: ". $_SESSION['weight']. " kg ja pituus: ". $_SESSION['height']." cm </h2></br>");
            echo("<p> ==> painoindeksi = ". $_SESSION['ibm'] ."</p>");

        }

    ?>
    <div>
    <?php
        echo("<h2> 4. TIEDOSTOON tallennus vain jos kaikki tiedot syötetty</h2> </br>");
            if(!empty($_SESSION['weight']) && !empty($_SESSION['height']) && !empty($_SESSION['nimi'])){
                //TODO TALLENNUS
                include("tallennus.php");

            }else{
                echo("<p>Tulostus ei ole mahdollista</p>");
            }

            if(isset($_GET["save"])){
                    $file = fopen("testi.txt","a")or die("ei toimi");
                    $viesti ="Henkilö ". $_SESSION['nimi']. " paino ".$_SESSION['weight'] . " pituus ". $_SESSION['height'] . " painoindeksi " . $_SESSION['ibm'] . "</br>";
                    fwrite($file, $viesti);
                    fclose($file);
                    echo("<p>Tiedosto tallennettu!</p>");


            }
            if(isset($_GET["remove"])){
                    if(file_exists("testi.txt")){
                        file_put_contents('testi.txt', '');
                    }
            echo('<p>Tiedosto poistettu</p>');
            }
    ?>
    </div>
    <div>
        <h2>4.5 Välitietojen poisto</h2>
        <?php
        include("nollaus.php");
                if(isset($_GET["destroy"])){
                    echo("<p>paina</p>");
                    session_unset();
                    session_destroy();
                   /* $paino="";
                    $pituus="";
                    $ibm="";
                    header("Refresh:0; url=http://users.metropolia.fi/~henrijke/php/php_teht2/testFunctions.php");
                   */
                    redirect($_SERVER['PHP_SELF']);

                }
        ?>

    </div>
    <div>
        <?php
            echo("<h2> 5. TIedosto</h2>");
            /*
            if(!empty($_SESSION['nimi']) && !empty($_SESSION['weight']) && !empty($_SESSION['height']) && !empty($_SESSION['ibm'])){
                echo("<p>" .$_SESSION['nimi']) . " " . !empty($_SESSION['weight']) ." ". !empty($_SESSION['height']) ." ". !empty($_SESSION['ibm'] . "</p></br>");
                    //session_unset();
                    //session_destroy();
                    //redirect($_SERVER['PHP_SELF']);
            }
*/
            if(isset($_GET["save"]) or isset($_GET["remove"])){
                if(file_exists("testi.txt")){
                    $file = fopen("testi.txt","r")or die("wtf miten?");
                    echo fgets($file);

                }
            }
        ?>

    </div>

</div>
</body>
</html>
