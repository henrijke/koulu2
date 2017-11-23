'use strict';

const lisaa = document.querySelector('#lisaa');
const para = document.querySelector("p");
const para2  = document.querySelectorAll("p")[1];
const vaihda = document.querySelector("#vaihda");
const toggle = document.querySelector("#toggle");
const para3 = document.querySelectorAll("p")[2];

lisaa.addEventListener('click',(event)=>{
  para.classList.add('punainen');

});

vaihda.addEventListener('click',(event)=>{
  if(para2.classList.contains("punainen")){
    para2.classList.replace("punainen","sininen");
  }else{
    para2.classList.replace("sininen","punainen");

  }

});

toggle.addEventListener('click',(event)=>{
  para3.classList.toggle("vihrea");

});




/* joo
const vaihdaVari = (event)=> {
  para.classList.add('punainen');

};
lisaa.addEventListener('click',vaihdaVari)
*/

/* ei
lisaa.setAttribute("onclick",()=>{
  para.classList.add('#lisaa');
});
*/

/* ei
lisaa.click(
    ()=>
{
para.classList.add('#lisaa');

});
*/