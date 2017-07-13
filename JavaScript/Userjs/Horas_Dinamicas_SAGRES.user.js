// ==UserScript==
// @name        Horas Dinamicas SAGRES
// @namespace   SAGRES Portal
// @description Atualiza Dinamicamente as Horas
// @include     http://www.tecnotrends.com.br/NovoPortal/*
// @include     http://www.tecnotrends.com.br/PortalSagres/*
// @version     1.29
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
      icon: "http://novosite.tecnotrends.com.br/Content/GuiaDeIdentidade/assets/logo-trends-azul.png"
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


function insertMenu(menu,url){
  var node = document.querySelector('#ctl00_ConteudoTopo_ContServices');
  node.innerHTML+= '<li><a href="'+url+'" target="_blank">'+menu+'</a></li>';
}

if (document.location.pathname.toLowerCase().endsWith('default.aspx')){
  console.log("Horas Dinâmicas SAGRES by Welbert Serra");
  Notification.requestPermission();
  
  setInterval(function () {
    console.log("Session Renewed");
    $('.aRenewSession').click();
  }, 15 * 60 * 1000);
  
  $(document).ready(function(){
    
    if(document.querySelector('.registro-ponto-tabela').childElementCount>1){
      //getIdNames();
      if(document.querySelector('[id*="0_tdHoraFinal"]') && !document.querySelector('[id*="1_tdHoraInicial"]')){
        var dateFinal = new Date(),dateIntervalo = new Date();
        var dateFinalString = document.querySelector('[id*="0_tdHoraFinal"]').innerHTML.split(':');
        dateFinal.setHours(dateFinalString[0]);
        dateFinal.setMinutes(dateFinalString[1]);
        if(parseInt(document.querySelector('[id*=cargaHoraria]').innerHTML)==8){
          //Intervalo de 1h
        }else{
          //Intervalo de 30min
        }
      }
        idHorasRestantes = document.querySelector('[id*=horasRestantes]').id;
        idTipoHoras = document.querySelector('[id*=tipoHora]').id;
        idHorasTrabalhadas = document.querySelector('[id*=horasTrabalhadas]').id;
        idCargaHoraria = document.querySelector('[id*=cargaHoraria]').id;

        /* VARIAVEIS */    
        var red=255,green=155;
        var circL = document.querySelector(".circ-cor");
        setTimeout(function () {
            red = red - parseFloat(circL.style.height.replace("%",""));
            green = green + parseFloat(circL.style.height.replace("%",""));
            //console.log("Red - "+red+" ;; Green -"+green+" ;; PercentHora - "+circL.style.height.replace("%",""));
            circL.style.background = "rgb("+String(Math.round(red))+","+String(Math.round(green))+",0)";
        },500);
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

        //console.log((dateRestantes.getHours() * 60 * 60 * 1000)+ (dateRestantes.getMinutes() * 60 * 1000));
        if(document.getElementById(idTipoHoras).innerHTML=="restantes"){      
         var intervalExtra = setInterval(function () {
           document.getElementById(idTipoHoras).innerHTML="extras";       
           spawnNotification("TecnoTrends","Carga Horária Cumprida");
           document.getElementById(idHorasTrabalhadas).style.color = 'green';
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
          var circLHeight = parseFloat(circL.style.height.replace("%",""))+percent;
          circL.style.height = circLHeight+"%";
          red = red-(percent);
          green = green+(percent);
          circL.style.background = "rgb("+String(Math.round(red))+","+String(Math.round(green))+",0)";

        },60*1000);
      }else{
        spawnNotification("TecnoTrends","Observação: Não foi dado entrada no ponto.");
        alert('Observação: Não foi dado entrada no ponto.');
      }
    
   });
    
  insertMenu('Wiki','http://trendssp/sites/wiki/default.aspx');
}else if (document.location.pathname.toLowerCase().endsWith('acesso.aspx')){ 
  console.log("Horas Dinâmicas SAGRES by Welbert Serra");
  setTimeout(function () {
    if(document.getElementById('ctl00_PageContent_LoginPanel_UserName').value && 
        document.getElementById('ctl00_PageContent_LoginPanel_Password').value){
            document.getElementById('ctl00_PageContent_LoginPanel_LoginButton').click();    
    }
  },500);
}else{
  console.log("Horas Dinâmicas SAGRES by Welbert Serra");
  setInterval(function () {
    console.log("Session Renewed");
    $('.aRenewSession').click();
  }, 15 * 60 * 1000);
}
