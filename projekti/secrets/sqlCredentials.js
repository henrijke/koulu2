"use strict";

//Tehdään const missä on arrayssa kaikki yhteyteen tarvittavat tiedot
const credentials={
  host : 'mysql.metropolia.fi',
    user : 'henrijke',
    password : 'autot',
    database : 'henrijke'
};

// syljetään ulos kirjautumistiedot
module.exports = ()=>{
  return credentials;
};