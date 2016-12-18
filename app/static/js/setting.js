$(document).ready(function () {
    csrftoken = $('meta[name=csrf-token]').attr('content')

    // 验证原始密码是否输入正确
	$("#origin-pass").blur(function () {
		$.post(
			url,
			{
				username: $("#portrait-username").val(),
                password: $("#origin-pass").val(),
                csrf_token: csrftoken
			},
			function (data) {
				if (data.wrong) {
					$("#origin-pass-message").text("原密码输入错误");
					$("#origin-pass").focus();
					return false;
				} else {
					$("#origin-pass-message").text("");
				}
			},
			"json"
		);
	});

    $("#modify").click(function () {
		if ($("#username").val() == "") {
            $("#username-message").text("用户名不能为空");
			$("#username").focus();
			return false;
		} else if ($("#username").val() != "") {
            $("#username-message").text("");
		}
		
		if ($("#origin-pass").val() == "") {
            $("#origin-pass-message").text("原密码不能为空");
			$("#origin-pass-message").focus();
			return false;
		} else if ($("#origin-pass").val() != "") {
            $("#origin-pass-message").text("");
		}

		if ($("#new-pass").val() == "") {
            $("#new-pass-message").text("新密码不能为空");
			$("#new-pass").focus();
			return false;
		} else if ($("#new-pass").val() != "") {
            $("#new-pass-message").text("");
		}

        if ($("#confirm-new-pass").val() == "") {
            $("#confirm-new-pass-message").text("请确认新密码");
			$("#confirm-new-pass").focus();
			return false;
		} else if ($("#confirm-new-pass").val() != "") {
            $("#confirm-new-pass-message").text("");
		}

		if ($("#confirm-new-pass").val() !== $("#new-pass input").val()) {
            $("#confirm-new-pass-message").text("两次输入结果不同，请重新输入");
			$("#new-pass").focus();
			return false;
		} else if ($("#confirm-new-pass").val() == $("#new-pass").val()) {
            $("#confirm-new-pass-message").text("");
		}

		$("#setting form").submit();
	});
});