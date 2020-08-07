// ==UserScript==
// @name        Notificação Pedidos Abertos
// @namespace   Antecipa
// @description Notificação sobre alterações no dashboard
// @include     https://app.antecipa.com/PaginaInicialAntecipa
// @version     1.0
// @author      Welbert Serra
// @grant       none
// ==/UserScript==


//-----------------------------------------------------------------------------
function spawnNotification(title,message) {

  if (!("Notification" in window)) {
    alert(message);
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
      icon: "https://app.antecipa.com/Assets/img/antecipa/logo-antecipa-condensed.png"
  }

  var notification = new Notification(title,options);

}


//----------------------------------------------------------------------------

var buyerListNotify = [];
var $solicitacaoAberta = $(".col-lg-5 > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)")[0];

$(document).ready(function(){
  setTimeout(function(){
  	extractBuyers();
  },5000);

  setInterval(function () {
    var url = $solicitacaoAberta.attributes["data-asyncurl"].value
    loadDashboardWidget($solicitacaoAberta, url);
    extractBuyers();
  }, 5 * 60 * 1000);
  //15 * 60 * 1000
});

function extractBuyers(){
	$solicitacaoAberta.querySelectorAll("tbody > tr").forEach(p => {
	  if(p.children[0].innerHTML.indexOf("TODOS") == -1){
	  	var buyerName = p.children[0].innerHTML;
	  	if(buyerName != "" && !buyerListNotify.includes(buyerName)){
	  		buyerListNotify.push(buyerName);
	  		spawnNotification("Novo Comprador",buyerName);
	  	}
	  }
	})
}
