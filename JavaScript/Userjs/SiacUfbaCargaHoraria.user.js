// ==UserScript==
// @name        SiacUfbaCargaHoraria
// @namespace   *
// @description Mostra a carga horaria total optativa e obrigratoria
// @include     https://siac.ufba.br/SiacWWW/ConsultarComponentesCurricularesCursados.do
// @version     1
// @grant       none
// @author      Welbert Serra
// ==/UserScript==

function calc_horas(tipo,hora,resultado,disciplina) {
	var result =[0,0,""];
	for (var i = 0; i < tipo.length; i++) {
		if(resultado[i].innerHTML!=="RR" && resultado[i].innerHTML!=="TR" && hora[i].innerHTML!=="--"){
			switch(tipo[i].innerHTML){
				case "OB":
				//console.log("ob "+hora[i].innerHTML)
					result[0] += parseInt(hora[i].innerHTML);
				break;
				case "OP":
				//console.log("op "+hora[i].innerHTML)
					result[1] += parseInt(hora[i].innerHTML);
				break;
				case "--":
					if(resultado[i].innerHTML==="DI")
						result[1] += parseInt(hora[i].innerHTML);
					else if(resultado[i].innerHTML==="AP")
						result[2]+="\tDisciplina "+disciplina[i].innerHTML.trim()+" de "+hora[i].innerHTML+"h não dispensada!\n";
				break;
			}
		}
	}
	return result;
}

var t1 = document.querySelectorAll(".even td:nth-child(6)");
var t2 = document.querySelectorAll(".odd td:nth-child(6)");
var h1 = document.querySelectorAll(".even td:nth-child(4)");
var h2 = document.querySelectorAll(".odd td:nth-child(4)");
var r1 = document.querySelectorAll(".even td:nth-child(8)");
var r2 = document.querySelectorAll(".odd td:nth-child(8)");
var d1 = document.querySelectorAll(".even td:nth-child(3)");
var d2 = document.querySelectorAll(".odd td:nth-child(3)");

var ob=0,op=0,obs="";
var temp;
temp = calc_horas(t1,h1,r1,d1);
ob += temp[0];
op += temp[1];
obs += temp[2];
temp = calc_horas(t2,h2,r2,d2);
ob += temp[0];
op += temp[1];
obs += temp[2];


temp = "Obrigatório: "+ ob +"h\n";
temp += "Optativo: "+ op +"h\n";
temp += "Observações: \n"+ obs;

console.log(temp);
alert(temp);
