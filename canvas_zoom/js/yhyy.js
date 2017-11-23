/*
* tbh aika raskaasti otettu mallia
* http://phrogz.net/tmp/canvas_zoom_to_cursor.html
* olevasta esimerkistä implementoitu koulun tehtävään
* Kommenteilla pyritty ymmärtämään koodin logiikka
* */
// valitaan input elementti
const inputElement = document.querySelector('input');
//tehdään Filereader että voidaan lukea haluttuja tiedostoja
const reader = new FileReader();
//valitaan canvas elementti
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
//luodaan img johon vastaanotettu kuva laitetaan
const addedImg = new Image;

//tehdään slidereille parametrit
const slidZoom  = document.querySelector("#zoom");
const slidVer = document.querySelector("#upDown");
const slidHor = document.querySelector("#leftRight");

//kuuntelee milloin inputin sisältö muuttuu
inputElement.addEventListener('change', (evt) => {
  const file = inputElement.files[0];
  reader.readAsDataURL(file);
});



//kuuntelee milloin readeriin pistetään jotain
reader.addEventListener('load', (evt) => {
  //ensiksi tökätään kuva kuvaolioon
  addedImg.src = reader.result;




  //TODO ymmärrä
  trackTransforms(ctx);
/*
  funktio uudelleen piirtäminen, missä katsotaan kordinaattien muutokset
   transformedPointilla ja tyhjennetään kanvaasi, ja pistetään uusi kuva pöhisee
  */
  const redraw = ()=>{
    const p1 = ctx.transformedPoint(0,0);
    const p2 = ctx.transformedPoint(canvas.width,canvas.height);
    ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);


    ctx.drawImage(addedImg,0,0);
    ctx.save();
  };

  //piirretään uusi kuva
  redraw();

 //haetaan tämänhetkisen kanvaasin keskikohdat
  let lastX=canvas.width/2;
  let lastY=canvas.height/2;

  //tehdään muuttujat onko raahaus aloitettu ja onko raahaus käynnissä
  let dragStart;
  let dragged;

  //kuuntelija kun hiiren klikkiä painetaan
  canvas.addEventListener('mousedown',(evt)=>{
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    //mistä hiiren raahaus lähtee liikkeelle
    dragStart = ctx.transformedPoint(lastX,lastY);
    dragged = false;
  },false);

  //scaleFactor määrittää paljon kuva kasvaa/kutistuu joka iteraatiolla
  const scaleFactor = 1.05;

  //zoom funktio scroll parametri määrittää paljon skrollia pyöritetty sisään / ulos jolla vaikutetaan kumpaan suuntaan mennään
  //lopuksi piirretään kuva uusilla tiedoilla
  const zoom = (scroll)=>{
    //
    const pt = ctx.transformedPoint(lastX,lastY);
    ctx.translate(pt.x,pt.y);
    const factor = Math.pow(scaleFactor,scroll);
    ctx.scale(factor,factor);
    ctx.translate(-pt.x,-pt.y);
    redraw();
  };


  //eventlistener joka kuuntelee kun zoom slideriä säätää
  //Zoomi toimii jollai ihme viiveel??
  slidZoom.addEventListener('input', (evt) => {
    console.log((slidZoom.value)/33);
    /*if(zoom.value<1){

      temp=1;
    }else{*/
      const kantama = slidZoom.value-50;
    //}
    //otetaan nykyinen piste
    const pt = ctx.transformedPoint(lastX,lastY);
    //ctx.translate(pt.x,pt.y);
    const factor = Math.pow(scaleFactor,kantama);
    ctx.scale(factor,factor);
    //ctx.translate(-pt.x,-pt.y);
    redraw();
  });

  //eventlistener ylösalas sliderille
  slidVer.addEventListener('input', (evt) => {
    console.log(slidVer.value);
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    const kantama = slidVer.value/50;
    //otetaan nykyinen piste
    const pt = ctx.transformedPoint(lastX,lastY);
    //määritellään asema mutta lisätään siihen sliderin arvo
    ctx.translate(pt.x,pt.y * kantama);
    console.log(ctx.transformedPoint(lastX,lastY));
    redraw();
  });

  //eventlistener vasenoikee sliderille
  slidHor.addEventListener('input', (evt) => {
    console.log(slidHor.value);
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    const kantama = slidHor.value/50;
    //otetaan nykyinen piste
    const pt = ctx.transformedPoint(lastX,lastY);
    //määritellään asema mutta lisätään siihen sliderin arvo
    ctx.translate(kantama,1);
    console.log(ctx.transformedPoint(lastX,lastY));
    redraw();
  });


// funktio jossa  tsekataan hiiren skrollista tuleva tieto
  const handleScroll = (evt)=>{
    //verrataan mentiinkö scrollilla eteen vai taakse
    const delta = evt.wheelDelta ? evt.wheelDelta/10 : evt.detail ? -evt.detail : 0;
    console.log(ctx.transformedPoint(lastX,lastY));

    //Jos ei menty mihinkään mitään ei tapahdu ,jos mentiin niin lähetetään arvo zoomiin
    if (delta) zoom(delta);
    //estää normaalin vertikaalisen skrollauksen ja lähettää falsen
    return evt.preventDefault() && false;
  };


  // kun hiiri liikkuu kutsutaan
  canvas.addEventListener('mousemove',(evt)=>{
    //pitää kirjaa siitä missä hiiri on, jotta kun raahaus alkaa voidaan aloittaa siitä missä hiiri on, eikä jostain vakiopisteestä
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    dragged = true;
    //jos dragstartissa on arvo( eli ollaan raahaamassa) aletaan liikkua suhteessa lähtöpisteeseen
    if (dragStart){
      const pt = ctx.transformedPoint(lastX,lastY);
      ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
      console.log(ctx.transformedPoint(lastX,lastY));
      redraw();
    }
  },false);

 //kun päästetään hiirestä irti
  canvas.addEventListener('mouseup',(evt)=>{
    //lopettaa raahauksen
    dragStart = null;
  },false);

  //asetetaan funktiot canvaasiin eventeiksi
  canvas.addEventListener('DOMMouseScroll',handleScroll,false);

  canvas.addEventListener('mousewheel',handleScroll,false);
});


//tää on vähän hämärämpi enkä oo 100% varma mitä täs tapahtuu. Laittaa canvaasille läjän funktioita mitä tarvitaan paikkojen vaihteluun
//no voi helvetti ku tää tekee SVGmatrixis muutkoset
const trackTransforms =(ctx)=>{
  //haetaan sivustolta vektori muuttuja namespace
  const svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
  let xform = svg.createSVGMatrix();
  ctx.getTransform = ()=>{ return xform; };

  const savedTransforms = [];
  const save = ctx.save;
  //tallentaa vektorit svgmatrixiin
  ctx.save = ()=>{
    savedTransforms.push(xform.translate(0,0));
    return save.call(ctx);
  };
  const restore = ctx.restore;
  ctx.restore = ()=>{
    xform = savedTransforms.pop();
    return restore.call(ctx);
  };

  const scale = ctx.scale;
  ctx.scale = (sx,sy)=>{
    xform = xform.scaleNonUniform(sx,sy);
    return scale.call(ctx,sx,sy);
  };
  const rotate = ctx.rotate;
  ctx.rotate = (radians)=>{
    xform = xform.rotate(radians*180/Math.PI);
    return rotate.call(ctx,radians);
  };
  const translate = ctx.translate;
  ctx.translate = (dx,dy)=>{
    xform = xform.translate(dx,dy);
    return translate.call(ctx,dx,dy);
  };
  const transform = ctx.transform;
  ctx.transform = (a,b,c,d,e,f)=>{
    const m2 = svg.createSVGMatrix();
    m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
    xform = xform.multiply(m2);
    return transform.call(ctx,a,b,c,d,e,f);
  };
  const setTransform = ctx.setTransform;
  ctx.setTransform = (a,b,c,d,e,f)=>{
    xform.a = a;
    xform.b = b;
    xform.c = c;
    xform.d = d;
    xform.e = e;
    xform.f = f;
    return setTransform.call(ctx,a,b,c,d,e,f);
  };
  const pt  = svg.createSVGPoint();
  ctx.transformedPoint = (x,y)=>{
    pt.x=x; pt.y=y;
    return pt.matrixTransform(xform.inverse());
  }
};
