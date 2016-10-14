$(document).ready(function () {
	// 转换选中状态
	function switchActive(id) {
		var spans = document.getElementById("title").getElementsByTagName("span");
		for (var i = 0; i < spans.length; i++) {
			if (spans[i].className == "active") {
				$("#" + spans[i].id).removeClass("active");
			}
		}
		$("#" + id).addClass("active");
	}

	$("#login-tag").bind({
		click: function () {
			switchActive(this.id);

			$("#ul-2").css({
				"width": "0",
				"transition": "width .5s"
			});
			
			$("#ul-1").css({
				"width": "53px",
				"transition": "all .5s"
			});

			$(".signup").hide();
			$(".login").show();
		},
		mouseenter: function () {
			if ($(this).attr("class") == "active") {
				return;
			}
			$(this).css("color", "#979797");
		}, 
		mouseleave: function () {
			$(this).css("color", "#606060");
		}
	});

	$("#signup-tag").bind({
		click: function () {
			switchActive(this.id);

			$("#ul-1").css({
				"width": "0",
				"transition": "width .5s"
			});
			
			$("#ul-2").css({
				"width": "53px",
				"transition": "all .5s"
			});

			$(".login").hide();
			$(".signup").show();
		},
		mouseenter: function () {
			if ($(this).attr("class") == "active") {
				return;
			}
			$(this).css("color", "#979797");
		}, 
		mouseleave: function () {
			$(this).css("color", "#606060");
		}
	});

	$("#login-btn").hover(function () {
		$("#login-btn-div").css("width", "190px");
		$(this).css({
			"background": "#D6AE8B",
			"width": "190px",
			"transition": "all .3s"
		});
	}, function () {console.log("a");
		$(this).css({
			"background": "#666666",
			"width": "180px",
			"transition": "all .2s"
		});
		$("#login-btn-div").css({
			"width": "180px",
			"transition": "all .2s"
		});
	});

	$("#signup-btn").hover(function () {
		$("#signup-btn-div").css("width", "190px");
		$(this).css({
			"background": "#D6AE8B",
			"width": "190px",
			"transition": "all .3s"
		});
	}, function () {console.log("a");
		$(this).css({
			"background": "#666666",
			"width": "180px",
			"transition": "all .2s"
		});
		$("#signup-btn-div").css({
			"width": "180px",
			"transition": "all .2s"
		});
	});
});