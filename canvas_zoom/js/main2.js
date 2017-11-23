"use strict";
//etsitään kanvaasi ja otetaan konteksti
const can = document.querySelector("canvas");
const ctx = can.getContext("2d");

//tehdään filereader että voidaan lukea kanvaasia
const reader = new FileReader();

//luodaan img, ei laiteta mihinkään
const img = document.createElement("img");

//otetaan kuvan lähetysnappula ylös
const inp = document.querySelector("input");

//tehdään slidereille parametrit
const slidZoom  = document.querySelector("#zoom");
const slidVer = document.querySelector("#upDown");
const slidHor = document.querySelector("#leftRight");

let x = 0;
let y = 0;
let width = 0;
let height = 0;
let ogWidth = 500;
let ogHeight = 500;
let temp = 1;




//esimerkin mukainen redraw

const redraw2  = () => {
  //otetaan kordinaattipiste x=0 ja y=0
  let ex1 = ctx.transformedPoint(0,0);
  //otetaan kanvaasin nykyinen pituus ja leveys
  let ex2 = ctx.transformedPoint(canvas.width,canvas.height);
  //puhdistetaan kanvaasi 0,0 jonka jälkeen x ja yn erotukset
  ctx.clearRect(ex1.x , ex1.y , ex2.x-ex1.x, ex2.y-ex1.y);
  // piirretään kuva
  ctx.drawImage(img,0,0);

};
const scale= 1.1;
const zoom = (clicks){
  const pt = ctx.transformedPoint(z)
}

const scroll = (evt)=>{
  const delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
  if(delta){
    zoom(delta);
  }
  return evt.preventDefault() &&false;
};
const track = (ctx)=>{

};


// funktio joka uudelleen piirtää kuvan koordinaateilla
const redraw = () => {
  ctx.clearRect(0,0,1000,1000);
  ctx.drawImage(img, x, y, img.width, img.height);
};

//event listener joka kuuntelee kuvan vaihtumista ja muuttaa sen FileREaderinn
inp.addEventListener("change", (evt) => {
  const file = inp.files[0];
  reader.readAsDataURL(file);
});

// kuuntelija joka vaihtaa kuvan kun FileReaderin sisältö vaihtuu
reader.addEventListener('load', (evt) => {
  img.src = reader.result;
});

//  kuuntelija kun img elementin sisältöä päivitetään piirtää sen kanvaasille
img.addEventListener('load', (evt) => {
  ogWidth = img.width /2;
  ogHeight = img.height/ 2;
  ctx.drawImage(img, x, y, img.width, img.height,0,0,can.width,can.height);
});


//eventlistener joka kuuntelee kun zoom slideriä säätää
slidZoom.addEventListener('input', (evt) => {
  console.log(slidZoom.value/50);
  if(zoom.value<1){
    //width = ogWidth * (1/50);
    //height = ogHeight * (1/50);
    temp=1;
  }else{
  //width = ogWidth * (slidZoom.value/50);
  //height = ogHeight * (slidZoom.value/50);
  temp= slidZoom.value/50;
  }
  //redraw();
  scale();
  redraw();
});

// canvas scale
const scale= ()=>{
  //ctx.clearRect(0,0,can.width,can.height);
  ctx.scale(temp, temp);

};





