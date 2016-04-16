document.onload += $(function() {

	var contentAnimationLoading = '<img width="185px" height="185px" src="image/loading.gif"/>';

	document.body.innerHTML += '<div id="loadingJsContent" style="background-color: rgba(35,35,35,0.5);height:100%;'+
   'width:100%;position:absolute;z-index:9999;top:0;text-align:center;"><div style="padding-top:15%;">'+
   contentAnimationLoading+
   '</div></div>'

});

$( document ).ready(function() {
   $(window).load(function(){
         hideLoading()
   });
});

function showLoading() {
   document.getElementById('loadingJsContent').style.display = "block";
}

function hideLoading() {
   document.getElementById('loadingJsContent').style.display = "none";
}
