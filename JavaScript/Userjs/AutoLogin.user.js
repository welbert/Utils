// ==UserScript==
// @name        AutoLogin
// @namespace   localhost
// @include     http://localhost/Academico.WebApp/*
// @include     http://localhost:64437/*
// @version     1.1
// @grant       none
// @author      Welbert Serra
// ==/UserScript==

var user = "trends";
var pass = "trends";
var url = "http://localhost:64437/Account/Login.aspx";

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
    document.getElementById("ctl00_MasterPlaceHolder_LoginUser_UserName").value = user;
    document.getElementById("ctl00_MasterPlaceHolder_LoginUser_Password").value = pass;
    document.getElementById('ctl00_MasterPlaceHolder_LoginUser_LoginButton').click();
  }
$(document).ready(function(){
 
  if (document.location.pathname.toLowerCase().endsWith('sessaoexpirou.aspx') ||
     document.location.pathname.toLowerCase().endsWith('forbidden.aspx') ||
     document.location.pathname.toLowerCase().endsWith('invalidtoken.aspx')){
    
    setTimeout(function(){ window.location=url; }, 500);

  }


  if (document.location.pathname.toLowerCase().endsWith('default.aspx')){
      var origopenPage = openPage;
    window.openPage = function(page) {
      console.log(page.Features.Width);
         setCookie("Url",page.Url);
         setCookie("Width",page.Features.Width);
         setCookie("Height",page.Features.Height);
         return origopenPage(page);
    }
    var urlCookie = getCookie("Url");
    var widthCookie = getCookie("Width");
    var heightCookie = getCookie("Height");
    if(urlCookie!="")
     javascript:void openPage({"Url":urlCookie,"IsStableVersion":true,"Features":{"Width":widthCookie,"Height":heightCookie}});

  }
});
