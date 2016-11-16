$(document).ready(function () {
    csrftoken = $('meta[name=csrf-token]').attr('content')
    articleId = $('#article-id').val()
    var firstCommentRequest = true; // 是否首次请求评论 

    $("#toggle-comment").click(function () {
        if (firstCommentRequest) {
            $("#comment-pool").empty(); // 清空评论区
            getComments(10, 0); // 请求评论
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

        var isActive = $("#toggle-comment").attr("class").indexOf("active");

        $.post(
            '/article/comment',
            {
                content: $("#make-comment textarea").val(),
                csrf_token: csrftoken,
                article_id : articleId
            },
            function (data) {
                // console.log(data);
                if (data.result) {
                    commentSucceed(); // 提示评论提交成功
                    firstCommentRequest = true;
                    if (isActive > 0) {
                        $("#comment-pool").empty(); // 清空评论区
                        getComments(20, 0); // 重新请求评论
                    }
                }
            },
            'json'
        );
    });
});

function reply(comment_id) {
    if ($("#reply-textarea-" + comment_id).val() == "") {
        $("#reply-textarea-" + comment_id).focus();
        return false;
    }

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
    if (commentsObjects.length === 0) {
        $("#comment-pool").html('<span id="message">暂无评论</span>');
    } else {
        $.each(commentsObjects, function (n, value) {
            $("#message").text("");
            //console.log(value);
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
            
            $("#comment-pool").append(comment);
        });
    }
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



var count = 0; // 评论提交按钮提示成功计数
var countDown = 3; // 评论提交按钮成功倒计时

function commentSucceed() {
    count++;
    if (count < countDown) {
        setTimeout("commentSucceed()", countDown * 1000);
        $("#make-comment .btn").css("color", "green")
        $("#make-comment button").text("评论成功");
    } else {
        count = 0;
        $("#make-comment button").text("提交评论");
    }
}