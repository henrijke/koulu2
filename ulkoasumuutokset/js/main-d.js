// Tee sama toiminnallisuus, kuin tehtävissä B ja C. XMLHttpRequestin sijasta käytä fetch-luokkaa.
var showImages = function(json) {
    console.log(json);
    for (var i in json) {
        // lähdetään sisältä ulos
        var title = document.createTextNode(json[i].mediaTitle);
        var h3 = document.createElement('h3');
        h3.appendChild(title);

        var figcaption = document.createElement('figcaption');
        figcaption.appendChild(h3);

        var img = document.createElement('img');
        img.setAttribute('src', 'img/thumbs/' + json[i].mediaThumb)
        var a = document.createElement('a');
        a.setAttribute('href', 'img/original/' + json[i].mediaUrl);
        a.appendChild(img);

        var figure = document.createElement('figure');
        figure.appendChild(a);
        figure.appendChild(figcaption);

        var li = document.createElement('li');
        li.appendChild(figure);

        var ul = document.querySelector('ul');
        ul.appendChild(li);
    }
}

fetch('kuvat.json').then(function(response) {
    // Convert to JSON
    return response.json();
}).then(function(j) {
    // Yay, `j` is a JavaScript object
    showImages(j);
});