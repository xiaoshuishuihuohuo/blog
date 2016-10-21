$(document).ready(function() {
	var editor, mobileToolbar, toolbar;

	toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment'];

	mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];

	editor = new Simditor({
		textarea: $('#txt-content'),
		placeholder: 'write something',
		toolbar: toolbar,
		defaultImage: '../lib/simditor-2.3.6/images/image.png',
		pasteImage: true,
		upload : {
            url : '', //文件上传的接口地址
            params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
            fileKey: 'fileDataFileName', //服务器端获取文件数据的参数名
            connectionCount: 3,
            leaveConfirm: '正在上传文件'
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
		$("#submit").val("发　布");
		setTimeout("saveDraft()", 1000);
	} else {
		count = 0;
		// 保存操作

		$("#submit").val("保存草稿中...");
		setTimeout("saveDraft()", 1000);
	}
}