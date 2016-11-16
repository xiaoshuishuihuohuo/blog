$(document).ready(function () {
    csrftoken = $('meta[name=csrf-token]').attr('content')
    articleId = $('#article-id').val()
    var firstCommentRequest = true; // 是否首次请求评论 

    $("#toggle-comment").click(function () {
        if (firstCommentRequest) {
            getComments(3, 0); // 请求评论
            firstCommentRequest = false;
        }

        $(this).toggleClass("active");
        var isActive = $(this).attr("class").indexOf("active");
        if (isActive > 0) {
            $("#comment-pool").show();
            $("#toggle-comment span").text("收起评论");
            $("#toggle-comment img").attr("src", "../static/img/arrow-up.png");
        } else {
            $("#comment-pool").hide();
            $("#toggle-comment span").text("查看评论");
            $("#toggle-comment img").attr("src", "../static/img/arrow-down.png");
        }
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
                console.log(data);
                /*if (data.result) {
                    console.log('在评论区添加这条评论');
                    var comment = '<div class="comment-header">评论人-时间-头像</div>' +
                                  '<div class="comment-body">' +
                                    '<div class="comment-content" id="{{ id }}">评论内容</div>' +
                                    '<div class="comment-reply-btn">' +
                                      '<img src="../static/img/reply.png">' +
                                    '</div>' +
                                  '</div>' +

                                  '<div class="reply-comment">' +
                                    '<textarea rows="1" placeholder="回复： {{ author }} "></textarea>' +
                                    '<div>' +
                                        '<button class="btn" id="reply-to-{{ reply_to }}" onclick="reply(this.id)">回复</button>' +
                                    '</div>' +
                                  '</div>';
                }*/
            },
            'json'
        );
    });
});

function reply(comment_id) {
    $.post(
        '/article/comment',
        {
            content: $("#reply-textarea-" + comment_id).val(),
            csrf_token: csrftoken,
            is_reply: true,
            reply_to : comment_id,
            article_id : articleId
        },
        function (data) {
            console.log(data);
            if (data.success) {
                console.log('在评论区添加这条评论');
            }
        },
        'json'
    );
          
}

function getComments(limit, offset) {
    $.post(
        '/article/getComments',
        {
            article_id: articleId,
            limit: limit,
            offset: offset,
            csrf_token: csrftoken,
        },
        function (data,status) {
            if(status == 'success') {
                renderComments(data); // 渲染评论区
            }
        },
        'json'
    );

}

// 渲染评论区
function renderComments(commentsObjects) {
    $.each(commentsObjects, function (n, value) {
        console.log(value);
        if (value.is_reply == 1) {

        } else {
            var comment =
                '<div id="' + value.id + '">' +
                    '<div class="comment-header">' + value.author.nickname + '-' + value.create_time + '-' + value.author.avatar + '</div>' +
                    '<div class="comment-body" onmouseover="showReplyBtn(this.parentNode.id)" onmouseleave="hideReplyBtn(this.parentNode.id)">' +
                        '<div class="comment-content">' + value.content + '</div>' +
                        '<div class="comment-reply-btn" onclick="toggleReplyTextarea(this.parentNode.parentNode.id)">' +
                            '<img src="../static/img/reply.png">' +
                        '</div>' +
                    '</div>' +

                    '<div class="reply-comment">' +
                        '<textarea rows="1" placeholder="回复 ' + value.author.nickname + '：" id="reply-textarea-' + value.id + '"></textarea>' +
                        '<div>' +
                            '<button class="btn" onclick="reply(this.parentNode.parentNode.parentNode.id)">回复</button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
        }

        $("#comment-pool").append(comment);
    });
}

// 显示回复按钮
function showReplyBtn(id) {
    $("#" + id + " .comment-reply-btn").show();
}

// 隐藏回复按钮
function hideReplyBtn(id) {
    $("#" + id + " .comment-reply-btn").hide();
}

// 切换回复区显示状态
function toggleReplyTextarea(id) {
    $("#" + id + " .reply-comment").toggle();
}