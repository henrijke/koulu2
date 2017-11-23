<?php
require_once('config/config.php');
require_once('functions/functions.php');
require_once('jsonKuvat.php');
?>
<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Ajax ja PHP</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <link rel="stylesheet" href="css/normalize.min.css">
    <link rel="stylesheet" href="css/main.css">

    <script src="js/vendor/modernizr-2.8.3.min.js"></script>
</head>
<body class="secondary-color">

<header>
    <img src="https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_crop,g_auto/fat_cat.jpg" alt="logo">
    <h1>Ajax ja PHP</h1>
</header>

<main class="primary-color">
    <ul id="json">

    </ul>

    <h3>JSON</h3>
    <p id="jsonText"></p>
    <h3>ResponseText</h3>
    <p id="responseText"></p>

</main>
<aside class="default">
    <p>This is an ad</p>
    <p>This is an ad</p>
    <p>This is an ad</p>
    <p>This is an ad</p>
</aside>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>

<script src="js/main-f.js"></script>
</body>
</html>