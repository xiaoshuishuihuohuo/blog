$(document).ready(function () {
	$(window).scroll(function () {
		$(".top").css({
			"z-index": "9999",
			"background": "rgba(0, 0, 0, 0.9)",
			"transition": "background .3s"
		});

		if ($(window).scrollTop() == 0) {
			$(".top").css({
				"background": "",
				"transition": "background .3s"
			});
		}
	});

	$("#login").hover(
		function () {
			$("#login-underline").css({
				"width": "100px",
				"transition": "width .5s"
			});
		}, function () {
			$("#login-underline").css({
					"width": "0",
					"transition": "width .5s"
			});
		}
	);

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