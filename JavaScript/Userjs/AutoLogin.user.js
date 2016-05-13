// ==UserScript==
// @name        AutoLogin
// @namespace   localhost
// @include     http://localhost/Academico.WebApp/*
// @include     http://localhost:64437/*
// @include     http://produtos07:91/WebApps/*
// @version     1
// @grant       none
// ==/UserScript==
//console.log("teste0");

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

if (document.location.pathname.toLowerCase().endsWith('login.aspx')){
    //console.log("teste2");
    document.getElementById("ctl00_MasterPlaceHolder_LoginUser_UserName").value = "trends";
    document.getElementById("ctl00_MasterPlaceHolder_LoginUser_Password").value = "trends";
    document.getElementById('ctl00_MasterPlaceHolder_LoginUser_LoginButton').click();
  }
//console.log("teste-1");
$(document).ready(function(){
  //console.log("teste-2");


  //console.log("teste");
  if (document.location.pathname.toLowerCase().endsWith('sessaoexpirou.aspx') ||
     document.location.pathname.toLowerCase().endsWith('forbidden.aspx') ||
     document.location.pathname.toLowerCase().endsWith('invalidtoken.aspx')){
    //console.log("teste1");
      //setTimeout(function(){ window.location="http://localhost/Academico.WebApp/Account/Login.aspx"; }, 500);
    setTimeout(function(){ window.location=" http://localhost:64437/Account/Login.aspx"; }, 500);
     //window.location="http://localhost/Academico.WebApp/Account/Login.aspx";

  }


  if (document.location.pathname.toLowerCase().endsWith('default.aspx')){
      var origopenPage = openPage;
    window.openPage = function(page) {
         setCookie("Url",page.Url);
         return origopenPage(page);
    }
    var urlCookie = getCookie("Url");
    if(urlCookie!="")
     javascript:void openPage({"Url":urlCookie,"IsStableVersion":true,"Features":{"Width":900,"Height":520}}); //"/Academico.WebApp/Pages/Servicos/CancelarClasse.aspx"

  }
});
