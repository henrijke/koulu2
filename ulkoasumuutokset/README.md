# Ulkoasumuunnokset JS:llä

## classList ominaisuus
  * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
  * https://www.w3schools.com/jsref/prop_element_classlist.asp

## Aloitus
1. Lataa tämä repo zippinä https://github.com/ilkkamtk/WebPer4 ja pura se

### Tehtävä A
  * Avaa teht_a.html, main_a.js ja main.css editorissa
  * main.css sisältää valmiit luokat punainen, sininen ja vihrea
  * tee main_a.js:ään skripti, joka `#lisaa` nappia painamalla lisaa ensimmäiseen p-elementtiin luokan punainen
  * tee main_a.js:ään skripti, joka `#vaihda` nappia painamalla vaihtaa toisen p-elementin luokkaa luokkien sininen ja punainen välillä
  * tee main_a.js:ään skripti, joka `#toggle` nappia painamalla vuorotellen lisää ja poistaa kolmanteen p-elementtin luokkaa vihrea
  * apuja:
    * https://www.w3schools.com/css/css_pseudo_classes.asp
    * https://www.w3schools.com/jsref/met_element_addeventlistener.asp
    
  
   

### Tehtävä B 
  * Avaa teht_b.html, main_b.js ja main.css editorissa
  * muokkaa main_b.js:ää ja main.css:ää siten, että ruudukon kuvakkeista isot kuvat eivät aukea uudelle sivulle, vaan kuvat näytetään modalissa
    * modal voi näyttää esimerkiksi tältä:
    ___
    ![Index screenshot](https://raw.githubusercontent.com/ilkkamtk/mpjkk/master/Week1/images/gallery2.png)
    ___
    * ei siis käytetä Bootstrapia kuten viime jaksolla, vaan CSS ja js-koodi tehdään itse.
    * apuja:
        * Estä linkin normaali toiminta https://www.w3schools.com/jsref/event_preventdefault.asp
        * Voit hakea modalissa näytettävän kuvan URLin href-attribuutista
        * Muista että voit valita linkit (eli a elementit) vasta sitten kun ne on olemassa. Käytännössä siis fetchin viimeisessä vaiheessa.
          * Voit halutessasi aluksi kuvat.html koodin käsin ul elementin sisälle, jotta elementit ovat heti valmiina.
        * Elementti, jota klikattiin: https://www.w3schools.com/jsref/event_currenttarget.asp 
        Yksi esimerkki: https://www.w3schools.com/howto/howto_css_modal_images.asp
        * Jos haluat elvistellä, kokeile esim animate.css kirjastoa: https://daneden.github.io/animate.css/
        
        