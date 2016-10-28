$(document).ready(function () {
   $(".sidebar li").click(function () {
       $("#sidebar-active-div, #sidebar-active-slide").css({
           "margin-top": ($(this).index() * 30) + "px",
           "transition": "all .2s"
       });
   }); 
});