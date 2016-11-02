$(document).ready(function () {
    $(".sidebar .sidebar-list").click(function () {
        console.log($(this).index());
        $("#sidebar-active-div, #sidebar-active-slide").css({
            "margin-top": ($(this).index() * 30) + "px",
            "transition": "all .2s"
        });

        /*if ($(this).index() === 0) { // 如果点击sidebar第一项
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
        }*/
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() < 358) {
            //console.log("I belong to #write-btn-div");
            $("#sidebar-active-div, #sidebar-active-slide").css({ // sidebar背景移动
                "margin-top": (0 * 30) + "px",
                "transition": "all .2s"
            });
        }

        if ($(window).scrollTop() >= 358 && $(window).scrollTop() < 884) {
            //console.log('I belong to #my-article');
            $("#sidebar-active-div, #sidebar-active-slide").css({
                "margin-top": (1 * 30) + "px",
                "transition": "all .2s"
            });
        }

        if ($(window).scrollTop() >= 884) {
            //console.log("I belong to #draft");
            $("#sidebar-active-div, #sidebar-active-slide").css({
                "margin-top": (2 * 30) + "px",
                "transition": "all .2s"
            });
        }
    }); 
});