$(document).ready(function () {
    $(window).scroll(function () {
        $(".top").css({
            "z-index": "9999",
            "background": "rgba(0, 0, 0, 0.8)",
            "transition": "background .3s"
        });

        /*$("#arrow").css({
            "z-index": "9999",
            "border-color": "rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0.8)",
            "transition": "border-color .3s"
        });*/

        if ($(window).scrollTop() == 0) {
            $(".top").css({
                "background": "",
                "transition": "background .3s"
            });

            /*$("#arrow").css({
                "z-index": "9999",
                "border-color": "rgba(0,0,0,0) rgba(0,0,0,0) #000",
                "transition": "border-color .3s"
            });*/
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
            // $("#arrow, #drop-menu").fadeIn();
            $("#drop-menu").fadeIn();
        }, function () {
            // $("#arrow, #drop-menu").fadeOut();
            $("#drop-menu").fadeOut();
        }
    );

    /*$("#username").hover(
        function () {
            $("#info-underline").css({
                "width": "80px",
                "transition": "width .5s"
            });
        }, function () {
            $("#info-underline").css({
                "width": "0",
                "transition": "width .5s"
            });
        }
    );*/

    /*$("#logout").hover(
        function () {
            $("#logout-underline").css({
                "width": "52px",
                "transition": "width .5s"
            });
        }, function () {
            $("#logout-underline").css({
                    "width": "0",
                    "transition": "width .5s"
            });
        }
    );*/
});