$(document).ready(function () {

    csrftoken = $('meta[name=csrf-token]').attr('content')
    articleId = $('#article-id').val()

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

    $(".comment-body").hover(function () {
        $(".comment-reply-btn").show();
    },function () {
        $(".comment-reply-btn").hide();
    });

    $(".comment-body").click(function () {
        $(".reply-comment").toggle();
        /*$(".reply-comment").toggleClass("active");
        var isActive = $(".reply-comment").attr("class").indexOf("active");
        if (isActive > 0) {
            $(".reply-comment").hide();
        } else {
            $(".reply-comment").show();
        }*/
    });

    $("#make-comment button").click(function () {
        if ($("#make-comment textarea").val() == "") {
            $("#make-comment textarea").focus();
            return false;
        }

        $.post(
            '/article/comment',
            {
                content: $("#make-comment textarea").val(),
                csrf_token: csrftoken,
                // is_reply: false,
                article_id : articleId
            },
            function (data) {
                if (success) {
                    console.log('在评论区添加这条评论');
                }
            },
            'json'
        );
    });
});

function reply(comment_id) {
    $.post(
            '/article/comment',
            {
                comment: $("#make-comment textarea").val(),
                csrf_token: csrftoken,
                is_reply: true,
                reply_to : comment_id,
                article_id : articleId
            },
            function (data) {
                if (data.success) {
                    console.log('在评论区添加这条评论');
                }
            },
            'json'
        );
          
}

function getComments(article_id, limit, offset){
    $.post(
            '/article/getComments',
            {
                article_id: article_id,
                limit: limit,
                offset: offset,
                csrf_token: csrftoken,
            },
            function (data) {
                if (success) {
                    console.log('在评论区添加这条评论');
                }
            },
            'json'
        );

}