velocity=250;
txtLength=0;

var bPlay=0;
var wordsByFlash=1;
var readingMode=1;
var circleFase=0;
var bCW=0;
bColors=0;
fontSize=30;

var cadena;
var cantidad;
var posicion=0;
var lugar="left-screen";

bLugar=1;
iniciar = 1;
tiempo = 0;

lugar = "";
mostrar="";

var killInterval;

poner=`<center><table border="1">`;

x=0;
for(i=0;i<5;i++){
  poner+="<tr>";  
  for(j=0;j<5;j++){


    poner+=`
      <td class="myTd" id="td-${x}">     
      </td>


    `;
    x++;


  }
  poner+="</tr>";

}

poner += "</table></center>";

$("#screen").html(poner);

function n(x){ return parseInt($("#"+x).val()); }


var comienzos=[];

function init(iniciar){

  if(iniciar==1){
    var limpia = "";
    resultados = "";
    cantidadPalabras = 0;

    str = $("#input1").val();

    limpia = str.split("\n").join(" ");
    limpia = limpia.split("\t").join(" ");
    limpia = limpia.split("\r").join(" ");
    limpia = limpia.split(",").join(" ");
    limpia = limpia.split(".").join(" ");
    limpia = limpia.split(")").join(" ");
    limpia = limpia.split("(").join(" ");
    limpia = limpia.split(";").join(" ");
    limpia = limpia.split("-").join(" ");

    limpia = limpia.split("   ").join(" ");
    limpia = limpia.split("  ").join(" ");

    str = limpia;

    cadena=str.split(" ");
    cantidad=cadena.length;
    posicion = 0;

    bLugar=1;

    iniciar=0;

    calcularTiempo();

    for(i=0;i<25;i++){
      if(i==0){ comienzos[i]=0; }else{ comienzos[i]=_.random(0,cantidad-1); } 
    }

  }


  for(i=0;i<25;i++){

    // canitdad - 200
    // comienzos[i]

    $("#td-"+i).html(` 
      <br>
      <center> <b> ${ cadena[comienzos[i]] } </b> </center>
       &nbsp;
        <br>
        <div style="width:200px; height:5px; background-color: gray;"><div style="width: ${ parseInt( comienzos[i]*200/cantidad )}px;  px; height:5px; background-color:blue;">&nbsp;</div></div> 

       `);
    comienzos[i]++;

    if(comienzos[i]>=cantidad) comienzos[i]=0;
  }


  calcularTiempo();

  velocity=n("velocityFlash");
  

  killInterval=setTimeout(function(){ init(2) },  ( 60000/ velocity ) * 1 );

  delaySalida=0;

  calcularTiempo();


}



function play1(){

  bPlay=!bPlay;

  if(bPlay){
    $("#play-btn").val("pause");

    init(1);

  }else{
    clearTimeout(killInterval);
    clearTimeout(killIntervalRc);
    mostrar="";
    $("#play-btn").val("start");
  }
}

var getDuration = function(millis){
  var dur = {};
  var units = [
      {label:"millis",    mod:1000},
      {label:"seconds",   mod:60},
      {label:"minutes",   mod:60},
      {label:"hours",     mod:24},
      {label:"days",      mod:31}
  ];
  // calculate the individual unit values...
  units.forEach(function(u){
      millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
  });
  // convert object to a string representation...
  var nonZero = function(u){ return dur[u.label]; };
  dur.toString = function(){
      return units
          .reverse()
          .filter(nonZero)
          .map(function(u){
              return dur[u.label] + " " + (dur[u.label]==1?u.label.slice(0,-1):u.label);
          })
          .join(', ');
  };

  /*
  console.log(dur);
  x = dur.split(",");
  poner = "";
  for(i=0;i<x.length;i++){
    if(x[i].indexOf("millis")!=1){
      continue;
    }
    poner += x[i];

  }*/

  //return dur;
  return dur.hours+":"+dur.minutes+":"+dur.seconds;//+":"+dur.millis;
};


function quitaAcentos(str){ 
  for (var i=0;i<str.length;i++){ 
  //Sustituye "á é í ó ú" 
    if (str.charAt(i)=="á") str = str.replace(/á/,"a"); 
    if (str.charAt(i)=="é") str = str.replace(/é/,"e"); 
    if (str.charAt(i)=="í") str = str.replace(/í/,"i"); 
    if (str.charAt(i)=="ó") str = str.replace(/ó/,"o"); 
    if (str.charAt(i)=="ú") str = str.replace(/ú/,"u"); 
  } 
  return str; 
} 

//$("#down-screen")

myTransformation=1;

function stopFlash(){
  

  if(bPlay){
    bPlay=0;
    $("#play-btn").val("start");

    
    
  }
  mostrar="";
  iniciar=1;

  clearTimeout(killInterval);
  // clearTimeout(killIntervalRc);

  for(i=0;i<25;i++){ $("#td-"+i).html(""); }

  $("#stats").html("");
  $("#stop1").hide();


}

function calcularTiempo(){
  if(iniciar==0){
    tiempo = ( cantidad - posicion ) * ( 60000/n("velocityFlash") );

    poner = `${posicion+1}/${cantidad} - ${getDuration(tiempo)}`;
    $("#stats").html(poner);

  }
}
