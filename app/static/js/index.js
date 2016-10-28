$(document).ready(function () {
	$("#q img").hover(
		function () {
			$(".pic").slideDown("fast");
			
			$(".float-div").css({
				//"background": "#000000",
				"opacity": "0.9",
				"transition": "all .5s"
			});
			//$(".pic").show("normal");
		}, function () {
			$(".pic").slideUp("fast");
			
			$(".float-div").css({
				//"background": "#011025",
				"opacity": ".7",
				"transition": "all .5s"
			});
			//$(".pic").hide("normal");
		}
	);
	
});