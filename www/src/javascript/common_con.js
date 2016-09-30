/**
 * Created by my on 2016/9/30.
 */
//alert("ok")
$(function(){
    $(".ab").hover(function(){
        $(this).addClass("hover");
        $(this).next().css("display","block");
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
