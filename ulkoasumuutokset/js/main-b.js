'use strict';

// Tee funktio 'showImages', joka
// lataa kuvat.json tiedoston, joka sisältää näytettävät kuvat taulukkona

// tee silmukka joka lisää merkkijonoon (string) jokaisesta kuvasta alla olevan HTML:n
/*
`<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>`
*/
// Silmukan jälkeen tulosta HTML-koodi (output) <ul>-elementin sisälle innerHTML:n avulla
/*
const showImages = () => {
  fetch('kuvat.json').then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    let html = '';
    json.forEach((kuva) => {
      html += `<li>
                  <figure>
                      <a href="img/original/${kuva.mediaUrl}"><img src="img/thumbs/${kuva.mediaThumb}"></a>
                      <figcaption>
                          <h3>${kuva.mediaTitle}</h3>
                      </figcaption>
                  </figure>
              </li>`;
    });
    const ul = document.querySelector('ul');
    ul.innerHTML = html;
  });
};

showImages();
*/

// sama tehtynä funktiolla jossa ei ole kovakoodausta
const loadJSON = (url, func) => {
  fetch(url).then((response) => {
    return response.json();
  }).then((json) => {
    func(json);
  });
};

const templateFunction = (json) => {
  let html = '';
  json.forEach((kuva) => {
    html += `<li>
            <figure>
                <a href="img/original/${kuva.mediaUrl}"><img src="img/thumbs/${kuva.mediaThumb}"></a>
                <figcaption>
                    <h3>${kuva.mediaTitle}</h3>
                </figcaption>
            </figure>
        </li>`;
  });

  const element = document.querySelector('ul');
  element.innerHTML = html;

  const linkit= document.querySelectorAll('a');
  const modal= document.querySelector('#modal');

  for(let linkki of linkit){
    linkki.addEventListener('click', (event)=>{
      event.preventDefault();

    //const kuva = event.currentTarget.querySelector("img");
      const src = linkki.getAttribute('href');

    //modal.style.display= "block";
      modal.querySelector("img").setAttribute('src',src);

      //console.log("peppu" + linkki);
      modal.classList.toggle("hidden");

      /* const sulje = document.getElementsByClassName("closeBtn");
       console.log(sulje);
       sulje.addEventListener('click', (event) =>{
         event.classList.toggle("hidden");
       });*/

  });
  }


};

loadJSON('kuvat.json', templateFunction);
