"use strict";
// tee funktio 'showImages', joka
// lisää ladatun HTML-sisällön <ul> elementin sisälle

const showImages= () => {
  fetch('kuvat.html').then( (response) => {
    return response.text();
  }).then( (text) =>{
  const ul = document.querySelector('ul');
  ul.innerHTML=text;
  })

};

showImages();