"use strict";

const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const settings = document.querySelector(".settings");
const side = document.querySelector("aside");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const text = document.querySelector(".testi");
const testi = document.querySelector(".paska");

console.log("onks täl mitään yhteyttä");



menu.addEventListener("click",()=>{
  if(!main.classList.contains("hide")){
    nav.classList.toggle("hide");
    main.classList.toggle("hide");
    //testi.classList.add("paskaAnimaatio");
    console.log("moi");
  }
});

close.addEventListener("click",()=>{
  console.log("amsdaads");
  if(!nav.classList.contains("hide")) {
    nav.classList.toggle("hide");
  }
  if(!side.classList.contains("hide")) {

    side.classList.toggle("hide");
  }
  main.classList.toggle("hide");

});

settings.addEventListener("click",()=>{
  if(!main.classList.contains("hide")){
  console.log("moi");
    side.classList.toggle("hide");
    main.classList.toggle("hide");
  }
});