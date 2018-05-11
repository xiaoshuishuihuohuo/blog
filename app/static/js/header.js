$(document).ready(function () {
    $(window).scroll(function () {
        $(".top").css({
            "z-index": "9999",
            "background": "rgba(0, 0, 0, 0.8)",
            "transition": "background .3s"
        });

        if ($(window).scrollTop() == 0) {
            $(".top").css({
                "background": "",
                "transition": "background .3s"
            });
        }
    });

    $("#login").hover(
        function () {
            $("#login-underline").css({
                "width": "100px",
                "transition": "width .5s"
            });
        }, function () {
            $("#login-underline").css({
                "width": "0",
                "transition": "width .5s"
            });
        }
    );

    $("#info").hover(
        function () {
            $("#info .menu-arrow").fadeIn();
            $("#info .drop-menu").fadeIn();
        }, 
        function () {
            $("#info .menu-arrow").fadeOut();
            $("#info .drop-menu").fadeOut();
        }
    );
});