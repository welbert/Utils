// ==UserScript==
// @name        Automat
// @namespace   localhost
// @include     http://produtos07:91/WebApps/Academico/Pages/*
// @version     1
// @grant       none
// ==/UserScript==
console.log("Script Form");

//$.getScript("https://raw.githubusercontent.com/evansolomon/js-keystroke/master/min/jquery.keystroke.min.js", function(){});

(function(){(function(e){return e.fn.keyStroke=e.keyStroke=function(n,t,r){var o,u,i,f,y;return 2===arguments.length&&(r=t,t={}),t=e.extend({context:this,args:[],preventDefault:!0,modKeys:[]},t),o=e(document),u=[],y=e.map([n,t.modKeys],function(e){return e}).join("-"),o.on("keydown.JQkeyStroke.JQkeyStroke-"+y,function(n){return u.push(n.keyCode),u=u.filter(function(n,t,r){return t===e.inArray(n,r)}),i(n)?f(n):void 0}),o.on("keyup.JQkeyStroke.JQkeyStroke-"+y,function(n){var t;return t=e.inArray(n.keyCode,u),t>-1?u.splice(t,1):void 0}),e(window).on("focus",function(){return u=[]}),f=function(e){return t.preventDefault&&e.preventDefault(),r.apply(t.context,[e].concat(t.args))},i=function(r){var o,i,f,y,a;if("array"===e.type(n))return 0===(y=e(u).not(n).length)&&y===e(n).not(u).length;if(1+t.modKeys.length!==u.length)return!1;if(!(e.inArray(n,u)>-1))return!1;for(a=t.modKeys,i=0,f=a.length;f>i;i++)if(o=a[i],!r[o])return!1;return!0},this}})(jQuery)}).call(this);

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var modelo_taurus="print ' '\nprint '--------------------------------------------------------------------------------------------------------------------'\nprint ' Taurus - Inclusão do campo $2'\nprint '--------------------------------------------------------------------------------------------------------------------'\nprint ' '\ngo\n\nif not exists (select 1 from security_template \n                where application = 'a_academico' and window = 'w_kfrmt_aluno' and \n                    control = '$3$1')\nbegin	\n	INSERT INTO security_template VALUES ( 'a_academico','w_kfrmt_aluno','$3$1','$2','unknown')	\n	\n	declare  @seq int, @tab int\n	\n	set @seq = 0\n	set @tab = -1\n\n	select @seq = sequence, @tab = tab from security_extra where window = 'w_kfrmt_aluno' \n	and application = 'a_academico' and control = '$3'\n\n	UPDATE security_extra SET sequence = sequence + 1 where application = 'a_academico' and window = 'w_kfrmt_aluno' and sequence > @seq\n	\n	INSERT INTO security_extra ( application, window, control, sequence, tab, show) VALUES ('a_academico', 'w_kfrmt_aluno', '$3$1', @seq+1, @tab+1, 'T')\nend\ngo\n";
console.log("Script LOADED");
$.keyStroke( 40, { modKeys: ['ctrlKey'] }, function(){
  console.log("KeyPressed");
  var datawindow = $("div[id$='_datawindow']");
  var campoInput,campoDddw,dform,tabpage,sql,nameCampo,label="t",result="";
  var nameAba;
  for(var i = 1;i<datawindow.length; i++){
    result = "";
    try{
      nameAba = $("div#"+datawindow[i].parentElement.parentElement.parentElement.id+" a[href='#"+datawindow[i].parentElement.parentElement.id+"']");
      nameAba = nameAba[0].innerHTML;
     }catch(exc){
       nameAba = datawindow[i].id;
     }
    dform = datawindow[i].id.substring(0,datawindow[i].id.length-11);
    dform = dform.substring(dform.lastIndexOf("_")+1,dform.length);
    dform = dform.toLowerCase();
    dform = dform.substring(0,2)+"_"+dform.substring(2,dform.length);

    tabPage = prompt("Digite o nome da tag da aba "+nameAba,"Ex.:tab_1.tabpage_form");

    console.log("inputs");
    campoInput = $( "span#"+datawindow[i].childNodes[1].id+" input");
    var j;
    for(j = 0;j<campoInput.length;j++){
      sql = modelo_taurus;
      nameCampo = campoInput[j].name.substring(0,campoInput[j].name.lastIndexOf("_"));
      try{
        label = $("span[name='"+nameCampo+"_t_0']")[0].innerHTML;
      }catch(ex){
        label = "$2";
      }
      sql = sql.replaceAll("$3",tabPage);
      sql = sql.replaceAll("$1","."+dform+"."+nameCampo);
      sql = sql.replaceAll("$2",label);
      result +=sql;
      console.log(nameCampo+";;"+j);
    }

    console.log("dddws");
    campoDddw = $( "span#"+datawindow[i].childNodes[1].id+" select");
    for(j = 0;j<campoDddw.length;j++){
      sql = modelo_taurus;
      nameCampo = campoDddw[j].name.substring(0,campoDddw[j].name.lastIndexOf("_"));
      try{
        label = $("span[name='"+nameCampo+"_t_0']")[0].innerHTML;
      }catch(ex){
        label = "$2";
      }
      sql = sql.replaceAll("$3",tabPage);
      sql = sql.replaceAll("$1","."+dform+"."+nameCampo);
      sql = sql.replaceAll("$2",label);
      result +=sql;
      console.log(nameCampo+";;"+j);
    }
    download(nameAba+"Taurus.sql",result);
  }

});
