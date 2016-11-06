csrftoken = $('meta[name=csrf-token]').attr('content')

$(document).ready(function() {
	var editor, mobileToolbar, toolbar, csrftoken;

	toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment'];

	mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];


	editor = new Simditor({
		textarea: $('#txt-content'),
		placeholder: '<span style="font-family: "Microsoft YaHei","Arial","黑体","宋体",sans-serif;">输入正文</span>',
		toolbar: toolbar,
		defaultImage: '/static/img/error.jpg',
		pasteImage: true,
		upload : {
            url : '/write/upload', //文件上传的接口地址
            params: {'csrf_token':csrftoken}, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
            fileKey: 'picture', //服务器端获取文件数据的参数名
            connectionCount: 3,
            leaveConfirm: '正在上传文件'
        }
	});

	var tag_value = '';

	$(".tag-btn").click(function () {
		$(this).toggleClass('selected');
		if ($(this).attr("class").indexOf("selected") > 0) {
			tag_value += "" + $(this).attr("name") + ",";
		} else {
			tag_value = tag_value.replace($(this).attr("name") + ",", "");
		}
		console.log(tag_value);
		$("#tag-value").val(tag_value);
	});

	$("#back-div img").click(function () {
		window.location.href = "/mainpage";
	});

	$("#submit").click(function() {
		if ($("#title-div input").val() == "") {
			$("#title-div input").focus();
			return false;
		}
	});

});

var time = new Date();
var count = 0, saveTime = 5; 

saveDraft();

function saveDraft() {
	count++;
	if (count < saveTime) {
		console.log(count);
		setTimeout("saveDraft()", saveTime*1000);
	} else {
		count = 0;
		// 保存操作

		$("#submit").val("保存草稿中...");
		$.post(
			'/write/autoSave',
			{
				id: $('input[name="id"]').val(),
				title: $('input[name="title"]').val(),
				classification: $('input[name="classification"]').val(),
				content: $('#txt-content').val(),
				csrf_token : csrftoken
			},
			function(data,status){
				$("#submit").val("发　布");
			}
		);
		setTimeout("saveDraft()", saveTime*1000);
	}

}