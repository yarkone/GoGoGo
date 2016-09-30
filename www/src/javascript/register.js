/**
 * Created by my on 2016/9/30.
 */
$(function() {
    /**
     * 表单验证
     *
     */

    //验证码函数
    function getcode(){
        var str = "";
        for(var i = 0;i < 4;i++){
            do{
                var _char = parseInt(Math.random() * 74 + 48);
            }while(!(_char >= 48 && _char <= 57 || _char >= 65 && _char <= 90 || _char >= 97 && _char <= 122));
            str += String.fromCharCode(_char);
        }
        return str;
    }
    $(".identifyCode").text(getcode());
    $(".change_code").click(function(){
        $(".identifyCode").text(getcode());
    });
    $(".item_phone").blur(function(){
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var promptMsg = $(this).parent().children().eq(-1);

        if($(this).val() == ""){
            promptMsg.css("display","block").html("手机号码不能为空！");
        } else if(!reg.test($(this).val())) {
            promptMsg.css("display","block").html("手机号输入非法！");
            $(this).val("");
            this.focus();
        } else {
            promptMsg.css("display","none");
        }
    });
    $(".item_code").blur(function(){
        var promptMsg = $(this).parent().children().eq(-1);
        if($(this).val() == ""){
            promptMsg.css("display","block").html("验证码不能为空！");
        } else if($(this).val() != $(".identifyCode").text()){
            promptMsg.css("display","block").html("验证码输入错误！");
            $(this).val("");
            this.focus();
        } else {
            promptMsg.css("display","none");
        }
    });
    $(".item_phone").blur(function(){
        var reg = /^[a-z0-9_-]{6,18}$/;
        var promptMsg = $(this).parent().children().eq(-1);

        if($(this).val() == ""){
            promptMsg.css("display","block").html("手机号码不能为空！");
        } else if(!reg.test($(this).val())) {
            promptMsg.css("display","block").html("手机号输入非法！");
            $(this).val("");
            this.focus();
        } else {
            promptMsg.css("display","none");
        }
    });
});