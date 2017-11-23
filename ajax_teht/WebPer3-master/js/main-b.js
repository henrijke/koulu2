"use strict";

/*
// Tee funktio 'showImages', joka
// lataa kuvat.json tiedoston, joka sisältää näytettävät kuvat taulukkona

// tee silmukka joka lisää merkkijonoon (string) jokaisesta kuvasta alla olevan HTML:n

<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>

// Silmukan jälkeen tulosta HTML-koodi (output) <ul>-elementin sisälle innerHTML:n avulla

*/



const showImages= () => {
  fetch('kuvat.json').then( (response) => {
    return response.json();
  }).then( (json) =>{
    let html ='';
    for(let i=0;i<json.length;i++){
    console.log(json);
    let kuva = json[i];
    html += `<li>
    <figure>
        <a href="img/original/${kuva.mediaUrl}"><img src="img/thumbs/${kuva.mediaThumb}"></a>
        <figcaption>
            <h3>${kuva.mediaTitle}</h3>
        </figcaption>
    </figure>
</li>`;
    }
    const ul = document.querySelector('ul');

    ul.innerHTML = html;
  })

};

showImages();