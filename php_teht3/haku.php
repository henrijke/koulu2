<?php
require_once("config/config.php");
?>

<form action="" method="post">
    <fieldset>
        <legend>Tietokannasta haku</legend>
        <label>Tuotteen nimi
            <input type="text" name="name" >
        </label>
        <br>
        <label>
            min hinta
            <input type="number" name="min" >

        </label>
    </br>
        <label>
            <select name="category">
            <option value="">Ei kategoriaa</option>
            <?php
            $kyselyKat = $DBH->prepare("SELECT nimi FROM vk_kategoriat;");
            $kyselyKat->execute();
            $kyselyKat->setFetchMode(PDO::FETCH_OBJ);
            while($kate = $kyselyKat->fetch()){
                echo("<h1>TESTI" . $kate->nimi . "</h1>");
             echo('<option value="'.$kate->nimi.'">'.$kate->nimi.'</option>');
            }

            ?>
            </select>
        </label>
    </br>
        <label>
            max hinta
            <input type="number" name="max" >

        </label>
        <button type="submit" name='submit' value="submit">Hae</button>
    </fieldset>
</form>

<?php
/*
if(isset($_POST['submit'])){
    echo("<h3>Haun tulokset</h3>");

    if(!empty($_POST['name']) AND !empty($_POST['max']) AND !empty($_POST['min'])){

        $nimi='%'.$_POST['name'].'%';
        $min= $_POST['min'];
        $max = $_POST['max'];
        $category= $_POST['category'];
        $ehdot = array(':max'=> $max,':min'=> $min, ':nimi'=> $nimi, ':category' => $category);
        $kysely1 = $DBH->prepare("SELECT vk_tuotteet.* FROM vk_tuotteet, vk_kategoriat, vk_kategorialiitos WHERE vk_tuotteet.nimi LIKE :nimi AND vk_kategoriat.nimi LIKE :category AND vk_kategoriat.kID=vk_kategorialiitos.kategoria_id AND vk_tuotteet.tID= vk_kategorialiitos.tuote_id AND vk_tuotteet.hinta<= :max AND vk_tuotteet.hinta>= :min;");

        $kysely1->execute($ehdot);
        $kysely1->setFetchMode(PDO::FETCH_OBJ);
        while($temp = $kysely1->fetch()){
        $output .= "$temp->nimi $temp->tuotekoodi $temp->hinta € </br>";
        }
        echo("<p>$output</p>");
    }else{
        echo("<p>Täytä kaikki kentät plz</p>");
    }

}
*/

/*
function checkEmpty($kohde){
    return !empty($kohde);
}

function emptyHandler($arvo1 , $arvo2 , $arvo3, $arvo4){
    $tosijono = array(checkEmpty($arvo1), checkEmpty($arvo2) , checkEmpty($arvo3), checkEmpty($arvo4));
    $stringArray= array(" vk_tuotteet.nimi LIKE :nimi "," vk_kategoriat.nimi LIKE :category AND vk_kategoriat.kID=vk_kategorialiitos.kategoria_id AND vk_tuotteet.tID= vk_kategorialiitos.tuote_id ",
        " vk_tuotteet.hinta< :max"," vk_tuotteet.hinta> :min" );

    $palautearray= array(0,0,0,0);

    for($i=0; $i < count($tosijono);$i++) {

        if($tosijono[$i]){
            $palautearray[$i]=$stringArray[$i];

        }else{
            $palautearray[$i]=1;
        }
       // echo(" NUMERO $i on ". $palautearray[$i] . "</br>");
    }

    return $palautearray;
}

function postMaker($arvo1 , $arvo2 , $arvo3, $arvo4){
    $tosijono = array(checkEmpty($arvo1), checkEmpty($arvo2) , checkEmpty($arvo3), checkEmpty($arvo4));
    $post= array("'%".$arvo1."% '" , $arvo2,  $arvo3." ", $arvo4." ");
    $post2 = array(":nimi",":category", ":max", ":min");
    $arraytest= array();



    for($i=0; $i < count($tosijono);$i++) {
        if($tosijono[$i]){

            $arraytest += array($post2[$i] => $post[$i]);
            //echo($post2[$i] .$post[$i] );

        }else{
        }
    }

    return $arraytest;
}


if(isset($_POST['submit'])){
    $testiplz = emptyHandler($_POST['name'],$_POST['category'],$_POST['max'],$_POST['min']);

    //echo($testiplz[':nimi'] . $testiplz[':category'] . $testiplz[':min']. $testiplz[':max'] . "</br>");


    //$post= array(':nimi'=> '%'.$_POST['name'].'% ',':min'=> $_POST['min']." ", ':max'=> $_POST['max']." ", ':category' => $_POST['category']." ");
    $post=postMaker($_POST['name'],$_POST['category'],$_POST['max'],$_POST['min']);
    if(checkEmpty($_POST['category'])){
        $luokat=", vk_kategoriat, vk_kategorialiitos ";
    }else{
        $luokat=" ";
    }

    //echo("SELECT vk_tuotteet.* FROM vk_tuotteet, vk_kategoriat, vk_kategorialiitos WHERE $testiplz[0]" . $post[':nimi'] . "AND $testiplz[1]" . $post[':category'] . "AND $testiplz[2]". $post[':min'] ."AND $testiplz[3]" . $post[':max'].";</br></br>");
    echo("SELECT vk_tuotteet.* FROM vk_tuotteet $luokat WHERE $testiplz[0] AND $testiplz[1] AND $testiplz[2] AND $testiplz[3] ;");

    $kysely100= $DBH->prepare("SELECT vk_tuotteet.* FROM vk_tuotteet $luokat WHERE $testiplz[0] AND $testiplz[1] AND $testiplz[2] AND $testiplz[3] ;");
    $kysely100->execute($post);
    $kysely100->setFetchMode(PDO::FETCH_OBJ);
    while($temp = $kysely100->fetch()){
        $output .= "$temp->nimi $temp->tuotekoodi $temp->hinta € </br>";
    }
    echo("<p>$output</p>");



}


function iffeliini($post){
    if(!empty($post){
        $arvo=$post;
        return $arvo;
    }

}
*/
if(isset($_POST['submit'])){
    echo("<h3>Haun tulokset</h3>");

    $nimi="%";
    $min=0;
    $max=999999;
    $category='%';

    if(!empty($_POST["name"])){
        $nimi = '%'.$_POST["name"].'%';
    }
    if(!empty($_POST["min"])){
        $min=$_POST["min"];
    }
    if(!empty($_POST["max"])){
        $max =$_POST["max"];
    }
    if(!empty($_POST["category"])){
        $category = $_POST["category"];
    }

        $ehdot = array(':max'=> $max,':min'=> $min, ':nimi'=> $nimi, ':category' => $category);
        $kysely1 = $DBH->prepare("SELECT vk_tuotteet.* FROM vk_tuotteet, vk_kategoriat, vk_kategorialiitos WHERE vk_tuotteet.nimi LIKE :nimi AND vk_kategoriat.nimi LIKE :category AND vk_kategoriat.kID=vk_kategorialiitos.kategoria_id AND vk_tuotteet.tID= vk_kategorialiitos.tuote_id AND vk_tuotteet.hinta<= :max AND vk_tuotteet.hinta>= :min;");

        $kysely1->execute($ehdot);
        $kysely1->setFetchMode(PDO::FETCH_OBJ);
        while($temp = $kysely1->fetch()){
            $output .= "$temp->nimi $temp->tuotekoodi $temp->hinta € </br>";
        }
        echo("<p>$output</p>");

}









/*$string0="vk_tuotteet.nimi LIKE :nimi";
$string1="vk_kategoriat.nimi LIKE :category AND vk_kategoriat.kID=vk_kategorialiitos.kategoria_id AND vk_tuotteet.tID= vk_kategorialiitos.tuote_id";
$string2= "vk_tuotteet.hinta<= :max";
$string3="vk_tuotteet.hinta>= :min";

*/
/*
function checkArray($ab, $kohde){

    $min= $_POST['min'];
    $max= $_POST['max'];
    $name= '%'.$_POST['name'].'%';

    switch($ab){
        case "aaa":

            sqlHaku(0,0,0);
            break;

        case "aab":
            sqlHaku(0,0,1);
            break;

        case "abb":
            sqlHaku(0,1,1);
            break;

        case "bbb":
            sqlHaku(1,1,1);
            break;

        case "aba":
            sqlHaku(0,1,0);
            break;

        case "bba":
            sqlHaku(1,1,0);
            break;

        case "baa":
            sqlHaku(1,0,0);
            break;

        default:
            echo("<h2>nyt on jotain pielessä</h2>");
            break;

    }

    while($temp = $kysely1->fetch()){
        $output .= "$temp->nimi $temp->tuotekoodi $temp->hinta € </br>";
    }
    echo("<p>$output</p>");

}/*
function sqlHaku( $ehto1 , $ehto2, $ehto3){
    $min= $_POST['min'];
    $max= $_POST['max'];
    $name= $_POST['name'];

        $nimi='%'.$_POST['name'].'%';
        $min= $_POST['min'];
        $max = $_POST['max'];
        $ehdot = array('kohde'=>':max'=> $max,':min'=> $min, ':nimi'=> $nimi);
        $kysely1 = $DBH->prepare("SELECT * FROM vk_tuotteet WHERE vk_tuotteet.nimi LIKE :nimi AND vk_tuotteet.hinta<= :max AND vk_tuotteet.hinta>= :min ;");
        $kysely1->execute($ehdot);
        $kysely1->setFetchMode(PDO::FETCH_OBJ);

    }


    return $string;
}*/

?>



<!--
$ehdot=array(':tID'=>5, ':hinta'=>50);
$kysely4 = $DBH->prepare("SELECT * FROM vk_tuotteet WHERE vk_tuotteet.hinta < :hinta AND vk_tuotteet.tID < :tID");
// suoritetaan kysely tuotekoodien arvolla 3 tai 4
$kysely4->execute($ehdot);
$kysely4->setFetchMode(PDO::FETCH_OBJ);

while ($tuoteOlio = $kysely4->fetch()) {
echo"<br />4. tID = ". $tuoteOlio->tID . "  " . $tuoteOlio->nimi .", hinta " . $tuoteOlio->hinta ." €";

-->