$(document).ready(function() {
	var editor, mobileToolbar, toolbar;

	toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment'];

	mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];

	editor = new Simditor({
		textarea: $('#txt-content'),
		placeholder: 'write something',
		toolbar: toolbar,
		pasteImage: true,
		upload: true
	});


});