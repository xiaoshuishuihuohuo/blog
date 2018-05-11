$(document).ready(function () {
	$("#q img").hover(
		function () {
			// $(".pic").slideDown("fast");
			$(".pic").fadeIn();

			$(".float-div").css({
				//"background": "#000000",
				"opacity": "0.9",
				"transition": "all .5s"
			});
			//$(".pic").show("normal");
		}, function () {
			// $(".pic").slideUp("fast");
			$(".pic").fadeOut();
			
			$(".float-div").css({
				//"background": "#011025",
				"opacity": ".7",
				"transition": "all .5s"
			});
			//$(".pic").hide("normal");
		}
	);
	
});