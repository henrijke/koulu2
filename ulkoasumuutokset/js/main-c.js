'use strict';

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


const showImages = () => {
  fetch('kuvat.json').then((response) => {
    return response.json();
  }).then((json) => {
    const ul = document.querySelector('ul');
    json.forEach((kuva) => {
      // img elementti (esim: src arvossa käytetty normaalia tapaa jaktaa stringiä)
      const img = document.createElement('img');
      img.setAttribute('src', 'img/thumbs/'+kuva.mediaThumb);
      // a elementti (esim: href arvossa käytetty backtickejä)
      const a = document.createElement('a');
      a.setAttribute('href', `img/original/${kuva.mediaUrl}`);
      // img a:n sisään
      a.appendChild(img);

      // h3 elementti
      const h3 = document.createElement('h3');
      h3.innerText = kuva.mediaTitle;
      // figcation elementti
      const figc = document.createElement('figcaption');
      // h3 figcaptionin sisään
      figc.appendChild(h3);

      // figure elementti
      const figure = document.createElement('figure');
      // a figuren sisään
      figure.appendChild(a);
      // figcaption figuren sisään
      figure.appendChild(figc);

      // li elementti
      const li = document.createElement('li');
      // figure li:n sisään
      li.appendChild(figure);

      // uudet elementit näkyville, eli laitettan ne html sivulla olemassa olevan ul:n sisälle
      ul.appendChild(li);
    });
  });
};

showImages();