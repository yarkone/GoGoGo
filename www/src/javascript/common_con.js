/**
 * Created by my on 2016/9/30.
 */

/**
 *  顶部和侧边栏接收cookie，验证当前是否有用户登陆
 *
 */
//顶部接收cookie
var currentUser = $.cookie.getSub("currentUser","uName");
if(currentUser != undefined) {
    $(".currentUser").text("欢迎您，" + currentUser);
    $(".currentZone").text("退出").attr("href","javascript:void(0)");
    var userHead = $(".user_head img").attr("src");
    userHead = userHead.substring(0,userHead.length - 4).concat("2");
    //console.log(userHead)
    $(".user_head img").attr("src",userHead + ".png");
    $(".user_name").html("<a href='html/login.html'>"+currentUser+"</a>&nbsp;" + "您好！");
    $(".currentZone").on("click",function(){
        $.cookie.unset("currentUser","/UGoShop/");
        location.reload();
    });
}


/**
 *  公告向上滚动
 *
 */
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

$(function(){
    $(".ab").hover(function(){
        $(this).addClass("hover");
        $(this).next().css("display","block");
        $(this).click(function(){
            $("html,body").stop().animate({scrollTop: 0},500);
        })
    },function(){
        $(this).removeClass("hover");
        $(this).next().css("display","none");
    });

    $(".ab").next().hover(function(){
        $(this).css("display","block");
    },function(){
        $(this).css("display","none");
    });
});
/**
 *  购物车
 *
 */
$("#car_box").data("timer",null);
$("#top_car").hover(function(){
    clearTimeout($("#car_box").data("timer"));
    $(".car_img2").css("background-position","-189px 0");
    $("#car_box").slideDown("fast");
},function(){
    $("#car_box").data("timer", setTimeout(car_hide, 200));
    $(".car_img2").css("background-position","-189px -60px");
});
$("#car_box").hover(function(){
    $(".car_img2").css("background-position","-189px 0");
    clearTimeout($(this).data("timer"));
},function(){
    $(this).data("timer", setTimeout(car_hide, 200));
    $(".car_img2").css("background-position","-189px -60px");
});

function car_hide() {
    $("#car_box").slideUp("fast");
}


/**
 *  在售分类
 *
 */
$("#nav_hover").data("timer",null);
$("#nav_classify").hover(function() {
    clearTimeout($("#nav_hover").data("timer"));
    $(this).css("background-position", "0 -133px");
    $("#nav_hover").slideDown("normal");
},function(){
    $("#nav_hover").data("timer", setTimeout(hover_hide, 200));
    $(this).css("background-position", "0 -65px");
});
$("#nav_hover").hover(function(){
    $("#nav_classify").css("background-position", "0 -133px");
    clearTimeout($(this).data("timer"));
},function(){
    $(this).data("timer", setTimeout(hover_hide, 200));
    $("#nav_classify").css("background-position", "0 -65px");
});

function hover_hide() {
    $("#nav_hover").slideUp("normal");
}