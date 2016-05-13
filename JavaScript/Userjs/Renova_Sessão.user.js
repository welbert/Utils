// ==UserScript==
// @name        Renova Sessão
// @namespace   SAGRES Portal
// @include     */WebApps/Academico/default.aspx
// @include     */Academico.WebApp/Default.aspx
// @include     http://localhost:64437/default.aspx
// @version     1
// @grant       none
// ==/UserScript==

setInterval(function () {
    $('.aLogout').click();
  }, 15 * 60 * 1000);
