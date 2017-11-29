'use strict';

const mysql = require("mysql");
const express = require("express");
const app = express();
//middleware
const bodyParser = require("body-parser");
//tuodaan hakulauseet
const hakureq = require("./hakulauseet.js");
const haku = hakureq();

//validator tarkastamaan tulevan materiaalin
const exValidator = require('express-validator');

//sessions auttamaan sessionsin kanssa
const exSession = require('express-session')

