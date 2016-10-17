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
	function setMessage(message, background) {
		$(".message span").text(message);
		$(".message").css("background", background);
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
	/*$("#login-btn").click(function () {
		if ($("#username input").val() == "") {
			setMessage("用户名/邮箱不能为空", "#ff6666");
			$("#username input").focus();
			return false;
		} else if ($("#username input").val() != "") {
			setMessage("", "#ffffff");
		}
		
		if ($("#password input").val() == "") {
			setMessage("密码不能为空", "#ff6666");
			$("#password input").focus();
			return false;
		} else if ($("#password input").val() != "") {
			setMessage("", "#ffffff");
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
					setMessage("用户名或密码错误", "#ff6666");
					$("#password input").focus();
				}

				$("#login-form").submit();
			}
		);
	});
*/
	// 验证用户名是否已存在
	$("#signup-username input").focus(function () {
		$("#signup-username input").blur(function () {
			$.post(
				url,
				{
					username: $("#signup-username input").val()
				},
				function (data) {
					if (!data) {
						setMessage("该用户名/邮箱已存在", "#ff6666");
						$("#signup-username input").focus();
						return false;
					} else {
						setMessage("可以使用", "#99CC66");
					}
				}
			);
		});
	});

	// 注册
	/*$("#signup-btn").click(function () {
		if ($("#signup-username input").val() == "") {
			setMessage("用户名/邮箱不能为空", "#ff6666");
			$("#signup-username input").focus();
			return false;
		} else if ($("#signup-username input").val() != "") {
			setMessage("", "#ffffff");
		}
		
		if ($("#signup-password input").val() == "") {
			setMessage("密码不能为空", "#ff6666");
			$("#signup-password input").focus();
			return false;
		} else if ($("#signup-password input").val() != "") {
			setMessage("", "#ffffff");
		}

		if ($("#signup-confirm input").val() == "") {
			setMessage("请再次确认密码", "#ff6666");
			$("#signup-confirm input").focus();
			return false;
		} else if ($("#signup-confirm input").val() != "") {
			setMessage("", "#ffffff");
		}

		if ($("#signup-password input").val() !== $("#signup-confirm input").val()) {
			setMessage("两次输入的密码不相同", "#ff6666");
			$("#signup-password input").focus();
			return false;
		} else if ($("#signup-password input").val() !== $("#signup-confirm input").val()) {
			setMessage("", "#ffffff");
		}

		$("#signup-form").submit();
	});*/
});