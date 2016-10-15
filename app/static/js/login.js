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

	// 设置提示信息
	function setMessage(element, message) {
		if ($("#" + element + " input").val() == "") {
			$(".message span").text(message);
			$(".message").css("background", "#ff6666");
			$("#" + element + " input").focus();
			return false;			
		} else if ($("#" + element + " input").val() != "") {
			$(".message span").text("");
			$(".message").css("background", "#ffffff");
			return true;	
		} else if (message == "error") {
			$(".message span").text("用户名或密码错误");
			$(".message").css("background", "#ff6666");
		}
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
			$(this).css("color", "#D6AE8B");
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
			$(this).css("color", "#D6AE8B");
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
	}, function () {
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
	}, function () {
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

	// 登录
	$("#login-btn").click(function () {
		if (!setMessage("username", "用户名不能为空")) {
			return false;
		}
		
		if (!setMessage("password", "密码不能为空")) {
			return false;
		}

		$.post(
			url,
			{
				username: $("#username input").val(),
				password: $("#password input").val(),
				remember_me: $("#remember-me input").val()
			},
			function (data) {
				if (!data) {
					setMessage("", "error");
				}
				$("#login-form").submit();
			}
		);
	});
});