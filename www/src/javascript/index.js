/**
 * Created by my on 2016/9/28.
 */
$(function() {

    //公告向上滚动
    $("#show_notice li").eq(0).clone(true).appendTo($("#show_notice"));
    $("#show_notice").data("flag", 1);
    $("#show_notice").data("timer", setInterval(up_show, 2000));
    function up_show() {
        var currentFlag = $("#show_notice").data("flag");
        if(currentFlag == 4){
            currentFlag = 1;
            $("#show_notice").css("top" , 0);
        }
        $("#show_notice").stop().animate({top : -currentFlag * $("#show_notice li").eq(0).height()},"normal");

        currentFlag++;
        $("#show_notice").data("flag", currentFlag);
    }
    $("#show_notice").hover(function() {
        clearInterval($("#show_notice").data("timer"));
    },function() {
        $("#show_notice").data("timer", setInterval(up_show, 2000));
    });
});