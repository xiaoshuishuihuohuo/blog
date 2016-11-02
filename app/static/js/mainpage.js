$(document).ready(function () {
    $(".sidebar li").click(function () {
        $("#sidebar-active-div, #sidebar-active-slide").css({
            "margin-top": ($(this).index() * 30) + "px",
            "transition": "all .2s"
        });

        if ($(this).index() === 0) { // 如果点击sidebar第一项
            $('html, body').animate(
                {  
                    scrollTop: $("#write-btn-div").offset().top - 85 // div顶部位置 
                }, 
                300 // 页面移动速度
            ); 
        } else if ($(this).index() === 1) {
            $('html, body').animate(
                {  
                    scrollTop: $("#my-article").offset().top - 85  
                }, 
                300
            );
        } else if ($(this).index() === 2) {
            $('html, body').animate(
                {  
                    scrollTop: $("#draft").offset().top - 85  
                }, 
                300
            );
        }
    });

    var write_btn_div_marginTop = $("#write-btn-div").height() + $("#write-btn-div").offset().top - 70;
    var my_article_marginTop = $("#my-article").height() + $("#my-article").offset().top - 70
    var draft_marginTop = $("#draft").height() + $("#draft").offset().top - 70

    /*console.log(write_btn_div_marginTop);
    console.log(my_article_marginTop);
    console.log(draft_marginTop);*/

    $(window).scroll(function () {
        //console.log($(window).scrollTop());
        if ($(window).scrollTop() <= write_btn_div_marginTop) {
            //console.log("I belong to #write-btn-div");
            $("#sidebar-active-div, #sidebar-active-slide").css({ // sidebar背景移动
                "margin-top": (0 * 30) + "px",
                "transition": "all .2s"
            });
        }

        if ($(window).scrollTop() > write_btn_div_marginTop && $(window).scrollTop() <= my_article_marginTop) {
            //console.log('I belong to #my-article');
            $("#sidebar-active-div, #sidebar-active-slide").css({
                "margin-top": (1 * 30) + "px",
                "transition": "all .2s"
            });
        }

        if ($(window).scrollTop() > my_article_marginTop) {
            //console.log("I belong to #draft");
            $("#sidebar-active-div, #sidebar-active-slide").css({
                "margin-top": (2 * 30) + "px",
                "transition": "all .2s"
            });
        }
    }); 
});