$(document).ready(function () {
    csrftoken = $('meta[name=csrf-token]').attr('content')
    articleId = $('#article-id').val()

    // 分页对象
    pagination = {
        currentPage : 0, // 当前评论页，初始为0
        showCount : 1, // 每页显示评论条数
        offset : 0,
        commentCount: ($("#comment-count").text() != "" && !isNaN($("#comment-count").text())) ? parseInt($("#comment-count").text()) : 0, // 评论数
        // totalPages : Math.ceil(this.commentCount / this.showCount), // 评论总页数
        setCurrentPage : function (currentPage) {
            console.log("fuck");
            this.currentPage = currentPage;
        },
        getTotalPages : function () {
            return Math.ceil(this.commentCount / this.showCount);
        },
        setOffset : function (currentPage, showCount) {
            this.offset = currentPage * showCount;
        },
        getOffset : function () {
            return this.offset;
        }
    }

    $("#toggle-comment").click(function () {
        $(this).toggleClass("active");
        $("#comment-pagination ul").empty(); // 每次展开评论区，清除分页导航

        var isActive = $(this).attr("class").indexOf("active");

        if (isActive > 0) { // 如果评论区已展开
            $("#view-comment").hide();
            $("#loading").addClass("loading");
            clearCommentPool(); // 清空评论区
            pagination.setOffset(0, pagination.showCount); // 每次展开评论区，重新设置offset
            getComments(pagination.showCount, pagination.getOffset()); // 请求评论
            renderCommentsPagination(pagination); // 渲染分页导航，传入分页对象
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
                    pagination.commentCount++;
                    // firstCommentRequest = true;
                    if (isActive > 0) { // 如果评论区已展开
                        $("#view-comment").hide();
                        $("#loading").addClass("loading");
                        pagination.commentCount += 1;
                        clearCommentPool(); // 清空评论区
                        pagination.setOffset(0, pagination.showCount); // 每次展开评论区，重新设置offset
                        getComments(pagination.showCount, pagination.getOffset()); // 请求评论
                        renderCommentsPagination(pagination); // 渲染分页导航，传入分页对象
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
                    pagination.commentCount++;
                    clearCommentPool(); // 清空评论区
                    pagination.setOffset(0, pagination.showCount); // 每次展开评论区，重新设置offset
                    getComments(pagination.showCount, pagination.getOffset()); // 请求评论
                    renderCommentsPagination(pagination); // 渲染分页导航，传入分页对象
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

function getTalks(comment_id, limit, offset){
    $.post(
        '/article/getTalks',
        {
            comment_id: comment_id,
            limit: limit,
            offset: offset,
            csrf_token: csrftoken,
        },
        function (data,status) {
            // console.log(data)
            renderTalks(data);
        },
        'json'
    );
}

// 渲染评论区
function renderComments(commentsObjects) {
    if (commentsObjects.length === 0) {
        $("#loading").removeClass("loading"); // 隐藏加载效果
        $("#comment-pool").html('<span id="message">暂无评论</span>');
        $("#comment-pool").show();
        $("#view-comment-span").text("收起评论");
        $("#toggle-comment img").attr("src", "../static/img/arrow-up.png");
        $("#view-comment").show();
    } else {
        $.each(commentsObjects, function (n, value) {
            //console.log(value);
            if (value.is_reply === 1) { // 如果是回复评论
                var comment =
                    '<div class="each-comment" id="' + value.id + '" onmouseover="showReplyBtn(this.id)" onmouseleave="hideReplyBtn(this.id)">' +
                        '<div class="comment-header">' + value.author.avatar + ' <a href="">' + value.author.nickname + '</a> ' + ' 回复 ' + value.reply_to_who.avatar + ' <a href="">' + value.reply_to_who.nickname + '</a> :</div>' +
                        '<div class="comment-body">' +
                            '<div class="comment-content">' + value.content + '</div>' +
                            '<div class="conversation-btn" onclick="getTalks(this.parentNode.parentNode.id, 10, 0)">' +
                                '<a href="#modal"><img src="../static/img/conversation.png"> 查看对话</a>' +
                            '</div>' +
                        '</div>' +
                        '<div id="comment-time"><span>' + value.create_time + '</span></div>' +
                        '<div class="comment-reply-btn" onclick="toggleReplyTextarea(this.parentNode.id)">' +
                            '<img src="../static/img/reply.png"> <span>回复</span>' +
                        '</div>' +

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
                        '</div>' +
                        '<div id="comment-time"><span>' + value.create_time + '</span></div>' +
                        '<div class="comment-reply-btn" onclick="toggleReplyTextarea(this.parentNode.id)">' +
                            '<img src="../static/img/reply.png"> <span>回复</span>' +
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
            $("#loading").removeClass("loading"); // 隐藏加载效果
            $("#comment-pool").show();
            $("#view-comment-span").text("收起评论");
            $("#toggle-comment img").attr("src", "../static/img/arrow-up.png");
            $("#view-comment").show();
        });
    }
}

// 渲染评论区分页导航
function renderCommentsPagination(paginationObject) {
    $("#comment-pagination ul").empty();
    for (var i = 0; i < paginationObject.getTotalPages(); i++) {
        paginationObject.setOffset(i, paginationObject.showCount);
        if (i == 0) {
            $("#comment-pagination ul").append('<li class="active" onclick="changeCurrentPage(' + i + ');addActive(this);clearCommentPool();getComments(' + paginationObject.showCount + ', ' + paginationObject.getOffset() + ')"><span>' + (i + 1) + '</span></li>');    
        } else {
            $("#comment-pagination ul").append('<li onclick="changeCurrentPage(' + i + ');addActive(this);clearCommentPool();getComments(' + paginationObject.showCount + ', ' + paginationObject.getOffset() + ')">' + (i + 1) + '</li>');
        }
    }
}

function changeCurrentPage(currentPage) {
    
}

function addActive(li) {
    var lis = document.getElementById("comment-pagination").getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        if (i == $(li).index()) {
            lis[i].className = "active";
        } else {
            lis[i].className = "";
        }
    }
}

// 清空评论区
function clearCommentPool() {
    $("#comment-pool").empty();
}

// 渲染查看对话模态中的内容
function renderTalks(talksObjects) {
    if (talksObjects.length === 0) {
        $("#talk-pool").empty();
        $("#talk-pool").html("<p>内容获取失败</p>");
    } else {
        $("#talk-pool").empty();
        $.each(talksObjects, function (n, value) {
            if (value.is_reply === 1) { // 如果是回复评论
                var talk =
                    '<div class="each-talk" id="' + value.id + '">' +
                        '<div class="talk-header"><a href="">' + value.author.nickname + '</a> ' + ' 回复 <a href="">' + value.reply_to_who.nickname + '</a> :</div>' +
                        '<div class="talk-body">' +
                            '<div class="talk-content">' + value.content + '</div>' +
                        '</div>' +
                        '<div><span class="talk-time">' + value.create_time + '</span></div>' +
                    '</div>';
            } else {
                var talk =
                    '<div class="each-talk" id="' + value.id + '">' +
                        '<div class="talk-header"><a href="">' + value.author.nickname + '</a> :</div>' +
                        '<div class="talk-body">' +
                            '<div class="talk-content">' + value.content + '</div>' +
                        '</div>' +
                        '<div><span class="talk-time">' + value.create_time + '</span></div>' +
                    '</div>';
            }

            $("#talk-pool").append(talk);
        });
    }
}

// 显示回复按钮
function showReplyBtn(id) {
    $("#" + id + " .comment-reply-btn").show();
    // $("#" + id + " .conversation-btn").show();
}

// 隐藏回复按钮
function hideReplyBtn(id) {
    $("#" + id + " .comment-reply-btn").hide();
    // $("#" + id + " .conversation-btn").hide();
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