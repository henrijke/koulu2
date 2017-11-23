const xhr = new XMLHttpRequest();

const showImages = () =>{
  if(xhr.readyState === 4 && xhr.status === 200){
    const json = JSON.parse(xhr.responseText);
    let output = '';
    for(let i in json){
      output += '<li>' +
          '<figure>' +
          '<a href="img/original/' + json[i].mediaURL +'"><img src="img/thumbs/' +
          json[i].mediaThumb + '"></a>' +
          '<figcaption>' +
          '<h3>' + json[i].mediaTitle + '</h3>' +
          '</figcaption>' +
          '</figure>' +
          '</li>';
    }
    document.querySelector('ul').innerHTML = output;
    //Get the first <p> element in the document
    document.querySelector('ul').innerHTML = output;
//specify also two elements like <p> with id in index.php
    document.querySelector("#jsonText").innerHTML = json;
    document.querySelector("#responseText").innerHTML =xhr.responseText;

  }
};
xhr.open('GET', 'jsonKuvat.php');
xhr.onreadystatechange = showImages;
xhr.send();


