'use strict';

const inputElement = document.querySelector('input');
const reader = new FileReader();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const img = document.createElement('img');

//ottaa kuvan osoitteen ja vaihtaa kuvan
inputElement.addEventListener('change', (evt) => {
  const file = inputElement.files[0];
  reader.readAsDataURL(file);
});


reader.addEventListener('load', (evt) => {
  img.src = reader.result;
});

//piirtää kuvan
img.addEventListener('load', (evt) => {
  ctx.drawImage(img, 0,0,500,500);
});

const redraw = (x,y,width,height) => {
  ctx.clearRect(img,0,0,200,200);
  ctx.drawImage(img,x,y,width,height);
};