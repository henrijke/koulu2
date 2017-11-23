<?php
session_start();
?>
<form method="get">
    <fieldset>
        <legend>Painoindeksi</legend>
        <label>Painosi (kg):
            <input type="number" name="weight">
        </label>

        <label>Pituus (cm):
            <input type="number" name="height">
        </label>
        <br>
        <!--<input type="submit" value="Submit">-->
        <button type="submit" value="Submit">Laske BMI</button>
        <button type="reset" value="Reset">Nollaa</button>
    </fieldset>
</form>