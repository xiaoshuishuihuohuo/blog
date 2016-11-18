$(document).ready(function () {
    csrftoken = $('meta[name=csrf-token]').attr('content')
    articleId = $('#article-id').val()

    $("#toggle-comment").click(function () {
        $(this).toggleClass("active");

        var isActive = $(this).attr("class").indexOf("active");

        if (isActive > 0) { // 如果评论区已展开
            $("#view-comment").hide();
            $("#loading").addClass("loading");
            $("#comment-pool").empty(); // 清空评论区
            getComments(10, 0); // 请求评论
        } else {
            $("#comment-pool").hide();
            $("#view-comment-span").text("查看评论");
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
                    // firstCommentRequest = true;
                    if (isActive > 0) { // 如果评论区已展开
                        $("#view-comment").hide();
                        $("#loading").addClass("loading");
                        $("#comment-pool").empty(); // 清空评论区
                        getComments(10, 0); // 重新请求评论
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

    var isActive = $("#toggle-comment").attr("class").indexOf("active");

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
            if (data.result) {
                if (isActive > 0) { // 如果评论区已展开
                    $("#view-comment").hide();
                    $("#loading").addClass("loading");
                    $("#comment-pool").empty(); // 清空评论区
                    getComments(10, 0); // 重新请求评论
                }
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
            //console.log(value);
            if (value.is_reply === 1) { // 如果是回复评论
                var comment =
                    '<div class="each-comment" id="' + value.id + '" onmouseover="showReplyBtn(this.id)" onmouseleave="hideReplyBtn(this.id)">' +
                        '<div class="comment-header">' + value.author.avatar + ' <a href="">' + value.author.nickname + '</a> ' + ' 回复 ' + value.reply_to_who.avatar + ' <a href="">' + value.reply_to_who.nickname + '</a> :</div>' +
                        '<div class="comment-body">' +
                            '<div class="comment-content">' + value.content + '</div>' +
                            '<div class="conversation-btn">' +
                                '<a href="#modal"><img src="../static/img/conversation.png"> 查看对话</a>' +
                            '</div>' +
                            '<div class="comment-reply-btn" onclick="toggleReplyTextarea(this.parentNode.parentNode.id)">' +
                                '<img src="../static/img/reply.png"> <span>回复</span>' +
                            '</div>' +
                        '</div>' +
                        '<div><span class="comment-time">' + value.create_time + '</span></div>' +

                        '<div class="reply-comment">' +
                            '<textarea rows="1" placeholder="回复 ' + value.author.nickname + '：" id="reply-textarea-' + value.id + '"></textarea>' +
                            '<div>' +
                                '<button class="btn" onclick="reply(this.parentNode.parentNode.parentNode.id)">回复</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            } else {
                var comment =
                    '<div class="each-comment" id="' + value.id + '" onmouseover="showReplyBtn(this.id)" onmouseleave="hideReplyBtn(this.id)">' +
                        '<div class="comment-header">' + value.author.avatar + ' <a href="">' + value.author.nickname + '</a> :</div>' +
                        '<div class="comment-body">' +
                            '<div class="comment-content">' + value.content + '</div>' +
                            '<div class="conversation-btn">' +
                                
                            '</div>' +
                            '<div class="comment-reply-btn" onclick="toggleReplyTextarea(this.parentNode.parentNode.id)">' +
                                '<img src="../static/img/reply.png"> <span>回复</span>' +
                            '</div>' +
                        '</div>' +
                        '<div><span class="comment-time">' + value.create_time + '</span></div>' +

                        '<div class="reply-comment">' +
                            '<textarea rows="1" placeholder="回复 ' + value.author.nickname + '：" id="reply-textarea-' + value.id + '"></textarea>' +
                            '<div>' +
                                '<button class="btn" onclick="reply(this.parentNode.parentNode.parentNode.id)">回复</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            }
            
            $("#comment-pool").append(comment);
            $("#loading").removeClass("loading"); // 隐藏加载效果
            $("#comment-pool").show();
            $("#view-comment-span").text("收起评论");
            $("#toggle-comment img").attr("src", "../static/img/arrow-up.png");
            $("#view-comment").show();
        });
    }
}

// 显示回复按钮
function showReplyBtn(id) {
    $("#" + id + " .comment-reply-btn").show();
    $("#" + id + " .conversation-btn").show();
}

// 隐藏回复按钮
function hideReplyBtn(id) {
    $("#" + id + " .comment-reply-btn").hide();
    $("#" + id + " .conversation-btn").hide();
}

// 切换回复区显示状态
function toggleReplyTextarea(id) {
    $("#" + id + " .reply-comment").toggle();
    $("#" + id + " .reply-comment textarea").focus();
}



var count = 0; // 评论提交按钮提示成功计数
var countDown = 2; // 评论提交按钮成功提示时间

// 提示评论成功
function commentSucceed() {
    count++;
    if (count < countDown) {
        $("#make-comment span").text("评论成功");
        $("#make-comment textarea").val("");
        setTimeout("commentSucceed()", countDown * 1000);
    } else {
        count = 0;
        $("#make-comment span").text("");
    }
}