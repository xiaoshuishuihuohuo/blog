$(document).ready(function () {

	csrftoken = $('meta[name=csrf-token]').attr('content')
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
			$(this).css("color", "#0080FF");
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
			$(this).css("color", "#0080FF");
		}, 
		mouseleave: function () {
			$(this).css("color", "#606060");
		}
	});

	/*$("#login-btn").hover(function () {
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
	});*/

	var remember_me = "off";

	$("#remember-me input").click(function () {
		if ($(this).attr("checked") == "checked") {
			$(this).removeAttr("checked");
			remember_me = "off"; 
		} else {
			$(this).attr("checked", "checked");
			remember_me = "on";
		}
	});

	// 登录
	$("#login-btn").click(function () {
		if ($("#username input").val() == "") {
			setMessage("用户名呢", "#ff6666");
			$("#username input").focus();
			return false;
		} else if ($("#username input").val() != "") {
			setMessage("", "#ffffff");
		}
		
		if ($("#password input").val() == "") {
			setMessage("密码呢", "#ff6666");
			$("#password input").focus();
			return false;
		} else if ($("#password input").val() != "") {
			setMessage("", "#ffffff");
		}

		$("#login-btn").val("正在登录...")

		if($("#verify").css("display") == "none"){
			$("#verify input").val("")
		}

		$.post(
			'/auth/signin',
			{
				username: $("#username input").val(),
				password: $("#password input").val(),
				remember_me: remember_me,
				captcha: $("#verify input").val(),
				csrf_token: csrftoken
			},
			function (data) {
				if (data.success) {
					//成功
					window.location.href = data.url;
					return false;
				} else if (data.message == 'wrong') {
					//失败
					//账号密码错误
					setMessage("", "#ffffff");
					setMessage("账号或密码错误", "#ff6666");
					$("#username input").focus();
					return false;
				} else if (data.message == 'need') {
					//失败
					//账号密码错误
					setMessage("", "#ffffff");
					setMessage("账号或密码错误", "#ff6666");
					$("#username input").focus();
					//需要验证码
					$("#verify").show();
					$("#verify input").val("");
					$("#verify img").attr("src", "/auth/captcha?random=" + Math.random());
					return false;
				} else if (data.message == 'cap') {
					//失败
					//验证码错误
					$("#vefify img").attr("src", "/auth/captcha?random=" + Math.random());
					setMessage("", "#ffffff");
					setMessage("验证码错误", "#ff6666");
					$("#verify input").val("");
					$("#verify input").focus();
					return false;
				} else {
					return false;
				}
			},
			'json'
		);
	});

	// 验证用户名是否已存在
	$("#signup-username input").blur(function () {
		$.post(
			"/auth/regist/checkUser",
			{
				signup_username: $("#signup-username input").val(),
				csrf_token: csrftoken
			},
			function (data) {
				if (data.exist) {
					setMessage("注册过了", "#ff6666");
					$("#signup-username input").focus();
					return false;
				} else {
					setMessage("", "#ffffff");
				}
			},
			"json"
		);
	});

	// 注册
	$("#signup-btn").click(function () {
		if ($("#signup-username input").val() == "") {
			setMessage("填个名字", "#ff6666");
			$("#signup-username input").focus();
			return false;
		} else if ($("#signup-username input").val() != "") {
			setMessage("", "#ffffff");
		}
		
		if ($("#signup-password input").val() == "") {
			setMessage("输个密码", "#ff6666");
			$("#signup-password input").focus();
			return false;
		} else if ($("#signup-password input").val() != "") {
			setMessage("", "#ffffff");
		}

		if ($("#signup-confirm input").val() == "") {
			setMessage("再输一遍", "#ff6666");
			$("#signup-confirm input").focus();
			return false;
		} else if ($("#signup-confirm input").val() != "") {
			setMessage("", "#ffffff");
		}

		if ($("#signup-password input").val() !== $("#signup-confirm input").val()) {
			setMessage("两次不一样", "#ff6666");
			$("#signup-password input").focus();
			return false;
		} else if ($("#signup-password input").val() !== $("#signup-confirm input").val()) {
			setMessage("", "#ffffff");
		}

		$("#signup-btn").val("正在注册...")
		$("#signup-form").submit();
	});

	if ($(".message span").text().trim() != "") { // 如有后台传到前端信息，显示
		$(".message").css("background", "#ff6666");
	}
});