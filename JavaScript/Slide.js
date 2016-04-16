var actualPage;
var page;
var hasAnimation = true;
document.onload += $(function() {
	actualPage = 0;
	var arrowImageUrl = "image/arrow.png";
	page = document.getElementsByClassName("midInformation");

	$(".midInformation").css("display", "none");
	if(hasAnimation==true)
		$(".midInformation").css("transition", "all 1s ease");
	page[0].style.display = 'block';

	document.body.innerHTML += '<div id="rigthArrow" style="cursor: pointer;position: absolute;right: 10px;top:50%;background-image: url('+arrowImageUrl+');background-size: 60px 60px;width: 60px;height: 60px;" onclick="nextPage()"></div>'
	document.body.innerHTML += '<div id="leftArrow" style="cursor: pointer;transform: scaleX(-1);position: absolute;left: 10px;top:50%;background-image: url('+arrowImageUrl+');background-size: 60px 60px;width: 60px;height: 60px;" onclick="prevPage()"></div>'
});

function goToPage(index) {
	if(index < 0 && index >=page.length) return;
	var i=0;
	if(actualPage >= index){
		for(i = 0;i<= actualPage - index; i++)
			prevPage();
	}else{
		for(i = 0;i<= index - actualPage; i++)
			nextPage();
	}
}

function nextPage(){
	if(actualPage < page.length-1){
		actualPage++;
		if(hasAnimation){
			page[actualPage-1].style.left = '-100%';
			page[actualPage].style.left = '100%';
			page[actualPage].style.display = 'block';
			setTimeout(function(){
				page[actualPage].style.left = '25%';
			}, 100);
		}else{
			page[actualPage-1].style.display = 'none';
			page[actualPage].style.display = 'block';
		}

	}
}

function prevPage(){
	if(actualPage > 0){
		actualPage--;
		if(hasAnimation){
			page[actualPage+1].style.left = '100%';
			page[actualPage].style.left = '-100%';
			page[actualPage].style.display = 'block';
			setTimeout(function(){
				page[actualPage].style.left = '25%';
			}, 100);
		}else{
			page[actualPage+1].style.display = 'none';
			page[actualPage].style.display = 'block';

		}

	}
}
