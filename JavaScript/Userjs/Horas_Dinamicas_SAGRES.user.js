// ==UserScript==
// @name        Horas Dinamicas SAGRES
// @namespace   SAGRES Portal
// @description Atualiza Dinamicamente as Horas
// @include     http://www.tecnotrends.com.br/NovoPortal/Modules/Portal/*
// @version     1.19
// @author      Welbert Serra
// @grant       none
// ==/UserScript==


//-----------------------------------------------------------------------------
function spawnNotification(title,message) {  
  
  if (!("Notification" in window)) {
    alert(titulo);
  }else if (Notification.permission === "granted") {
    CustomNotification(title,message);
    
  }else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        CustomNotification(title,message);
      }
    });
  }else if (Notification.permission === 'denied'){
    alert(message);
  }
}

function CustomNotification(title,message) {
  var options = {
      body: message,
      icon: "http://www.tecnotrends.com.br/NovoPortal/App_Themes/NewTheme/Images/Topo/logomarca-invertida.png"
  }
  
  var notification = new Notification(title,options);
 
}


//----------------------------------------------------------------------------

var idHorasRestantes;
var idTipoHoras;
var idHorasTrabalhadas;
var idCargaHoraria;

function addZeroBefore(n) {
  return (n < 10 ? '0' : '') + n;
}

function ConvertZeroToOne(n) {
  return n < 1 ? 1 : n;
}

function compareIds(id){
  
  id = String(id);
  if(id.endsWith('horasRestantes'))
    idHorasRestantes = id;
  else if (id.endsWith('tipoHora'))
    idTipoHoras = id;
  else if(id.endsWith('horasTrabalhadas'))
    idHorasTrabalhadas = id;
  else if(id.endsWith('cargaHoraria'))
    idCargaHoraria = id;  
  
}

function getIdNames(){
  
  var divParent = document.getElementsByClassName("circ-texto")[0];
  var i,j,child,child2;
  for (i=0;i<=divParent.childNodes.length;i++){
    child = divParent.childNodes[i];    
    if(child != null){
      compareIds(child.id);
      
      for(j=0;j<=child.childNodes.length;j++){
        child2 = child.childNodes[j];
        if(child2 != null)
          compareIds(child2.id);
      }
      
    }    
  }
  
}

if (document.location.pathname.toLowerCase().endsWith('default.aspx')){
  
  Notification.requestPermission();
  
  setInterval(function () {
    $('.aRenewSession').click();
  }, 28 * 60 * 1000);
  
  $(document).ready(function(){
    
    if(document.querySelector('.registro-ponto-tabela').childElementCount>1){
      getIdNames();

      /* VARIAVEIS */    
      var cargaHoraria = document.getElementById(idCargaHoraria).innerHTML.replace("h","");
      var percent = 100/(parseInt(cargaHoraria)*60);
      //------------------VARIAVEIS DE HORAS RESTANTES--------------------------------
      var dateRestantes = new Date;
      var lsHorasRestantes = document.getElementById(idHorasRestantes).innerHTML.replace("h","");
      var timeRestantes = lsHorasRestantes.split(/\:|\-/g);
      timeRestantes[0] = parseInt(timeRestantes[0]);
      timeRestantes[1] = parseInt(timeRestantes[1]);
      dateRestantes.setHours(timeRestantes[0]); 
      dateRestantes.setMinutes(timeRestantes[1]);
      //-------------------------------------------------------------------------------
      //------------------VARIAVEIS DE HORAS CUMPRIDAS---------------------------------
      var dateTrabalhadas = new Date;
      var lsHorasTrabalhadas = document.getElementById(idHorasTrabalhadas).innerHTML.replace("h","");
      var timeTrabalhadas = lsHorasTrabalhadas.split(/\:|\-/g);
      timeTrabalhadas[0] = parseInt(timeTrabalhadas[0]);
      timeTrabalhadas[1] = parseInt(timeTrabalhadas[1]);
      dateTrabalhadas.setHours(timeTrabalhadas[0]); 
      dateTrabalhadas.setMinutes(timeTrabalhadas[1]);
      //-------------------------------------------------------------------------------

      console.log((dateRestantes.getHours() * 60 * 60 * 1000)+ (dateRestantes.getMinutes() * 60 * 1000));
      if(document.getElementById(idTipoHoras).innerHTML=="restantes"){      
       var intervalExtra = setInterval(function () {
         document.getElementById(idTipoHoras).innerHTML="extras";       
         spawnNotification("TecnoTrends","Carga Horária Cumprida");
         clearInterval(intervalExtra);
        }, (dateRestantes.getHours() * 60 * 60 * 1000)+ (dateRestantes.getMinutes() * 60 * 1000)+1000);
      }

      setInterval(function () {  

        /* HORAS RESTANTES */         
        if(document.getElementById(idTipoHoras).innerHTML=="restantes"){
          dateRestantes.setMinutes(dateRestantes.getMinutes()-1);
        }else{
          dateRestantes.setMinutes(dateRestantes.getMinutes()+1);
        }

        document.getElementById(idHorasRestantes).innerHTML = 
                                 addZeroBefore(dateRestantes.getHours())+":"+addZeroBefore(dateRestantes.getMinutes())+"h";


        /* HORAS TRABALHADAS */
        dateTrabalhadas.setMinutes(dateTrabalhadas.getMinutes()+1);
        document.getElementById(idHorasTrabalhadas).innerHTML = 
                                 addZeroBefore(dateTrabalhadas.getHours())+":"+addZeroBefore(dateTrabalhadas.getMinutes())+"h";


        /* Circulo Laranja */    
        var circL = document.querySelector(".circ-cor");
        var circLHeight = parseFloat(circL.style.height.replace("%",""))+percent;
        circL.style.height = circLHeight+"%";

      },60*1000);
    }else{
      spawnNotification("TecnoTrends","Observação: Não foi dado entrada no ponto.");
      alert('Observação: Não foi dado entrada no ponto.');
    }
   });
}