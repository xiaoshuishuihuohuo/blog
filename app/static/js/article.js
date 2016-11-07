$(document).ready(function () {
    $("#toggle-comment").click(function () {
        $(this).toggleClass("active");
        var isActive = $(this).attr("class").indexOf("active");
        if (isActive > 0) {
            $("#toggle-comment span").text("收起评论");
            $("#toggle-comment img").attr("src", "../static/img/arrow-up.png");
        } else {
            $("#toggle-comment span").text("查看评论");
            $("#toggle-comment img").attr("src", "../static/img/arrow-down.png");
        }
    });
});