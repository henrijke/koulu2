
"use strict";
// Tee funktio 'showImages', joka
// lataa kuvat.json tiedoston, joka sisältää näytettävät kuvat taulukkona

// tee silmukka joka tekee jokaisesta kuvasta alla olevan HTML:n DOM-metodien avulla. Kun alla oleva rakenne on valmis, ne lisätään ul-elementin sisälle
/*
<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>
*/
// Tee HTML-elementit createElement-metodilla ja
// lisää attribuutit setAttribute-metodilla tai elementti.attribuutti -syntaksilla.
// Lisää elementit toistensa sisälle appendChild-metodilla.
// Lisää ne lopuksi ul elementin sisälle, jolloinka ne tulostuvat HTML-sivulle.


//copy paste B:stä
const showImages= () => {
  fetch('kuvat.json').then( (response) => {
    return response.json();
  }).then( (json) =>{
    let html ='';
    json.forEach( (kuva) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const img = document.createElement('img');
      const h = document.createElement('h3');
      const sisalto = document.createTextNode(`${kuva.mediaTitle}`);
      const fig = document.createElement('figcaption');
      const figure = document.createElement('figure');
      const ul = document.querySelector('ul');


//a.innerText='Linkki';
//li.appendChild(a);
//
      a.setAttribute('href', `img/original/${kuva.mediaUrl}`);
      img.setAttribute('src',`img/thumbs/${kuva.mediaThumb}`);

      a.appendChild(img);
      h.appendChild(sisalto);
      fig.appendChild(h);
      figure.appendChild(fig);
      figure.appendChild(a);
      li.appendChild(figure);
      ul.appendChild(li);
  })})

};

showImages();


