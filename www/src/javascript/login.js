/**
 * Created by my on 2016/9/30.
 */
$(function() {
    /**
     * 登陆表单验证
     *
     */
    $(".input_name").bind("blur",isUserName);
    $(".input_pass").bind("blur",isPassword);
    $(".input").val("");
    function isUserName(){
        var regPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var promptMsg = $(".input_name").siblings().last();
        //console.log(promptMsg)
        if($(".input_name").val() == ""){
            promptMsg.css("visibility","visible").html("手机号码或邮箱不能为空！");
            return false;
        } else if(!(regPhone.test($(".input_name").val())) && !(regEmail.test($(".input_name").val()))) {
            promptMsg.css("visibility","visible").html("手机号或者邮箱输入非法！");
            return false;
        } else{
            promptMsg.css("visibility","hidden");
            return true;
        }
    };

    function isPassword(){
        var reg = /^[a-z0-9_-]{6,18}$/;
        var promptMsg = $(".input_pass").siblings().last();

        if($(".input_pass").val() == ""){
            promptMsg.css("visibility","visible").html("密码不能为空！");
            return false;
        } else if(!reg.test($(".input_pass").val())) {
            promptMsg.css("visibility","visible").html("密码输入错误！请输入6-18位字符核对后再次输入！");
            return false;
        } else {
            promptMsg.css("visibility","hidden");
            return true;
        }
    };


    $(".login_submit").click(function(){
        var userName = $.cookie.getSub($(".input_name").val(),"uName");
        var userPassword = $.cookie.getSub($(".input_name").val(),"uPwd");

        if(userName == undefined){
            $(".frameBox").css("display","block");
            $(".message2").text($(".input_name").val());
            $(".frame1").css("display","block");
            $(".go_login").click(function(){
                location.href = "register.html";
            });
        } else{
            if($(".input_pass").val() == userPassword) {
                $(".frameBox").css("display","block");
                $(".message2").text($(".input_name").val());
                $(".frame2").css("display","block");
                $.cookie.setAll("currentUser",{"uName":$(".input_name").val(),"uPwd":$(".input_pass").val()},undefined,"/UGoShop/");
                setTimeout(function(){
                    var i = 3;
                    setInterval(function(){
                        i = i - 1;
                        $(".go_login span").text(i);
                    },1000);
                    location.href = "../index.html";
                },3000);
            } else {
                $(".input_pass").val("")
                    .siblings().last()
                    .css("visibility","visible").html("密码错误！");
            }
        }
    });

});