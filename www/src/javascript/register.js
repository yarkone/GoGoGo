/**
 * Created by my on 2016/9/30.
 */
$(function() {
/**
 * 顶部注册tab切换
 *
 */
    $(".phone_register").css("background-position","0 -58px");
    $(".phone_register_left").addClass("phone_register_left_click");
    $(".phone_register_right").addClass("click");
    $(".item").val("");
    $(".tab_register li").click(function(){
        $(".item").removeClass("item_right item_rightCode");
        $(".register_prompt").css("display","none");
        $(".register_form input").val("");
        $(".identifyCode").text(getcode());
        $(".tab_register li").css("background-position","0 -102px");
        $(this).css("background-position","0 -58px");
        $(".span_font").removeClass("click");
        $(this).children(".span_font").addClass("click");
        if($(this).hasClass("phone_register")){
            $(this).children(".phone_register_left").addClass("phone_register_left_click");
            $(this).siblings().children(".email_register_left").removeClass("email_register_left_click");
            $(".register_way").html("手机号码：&nbsp;");
        }
        if($(this).hasClass("email_register")){
            $(this).children(".email_register_left").addClass("email_register_left_click");
            $(this).siblings().children(".phone_register_left").removeClass("phone_register_left_click");
            $(".register_way").html("邮箱号码：&nbsp;");
        }
    });



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
    $(".item_phone").bind("blur",isPhone);
    $(".item_code").bind("blur",isCode);
    $(".item_password").bind("blur",isPassword);
    $(".item_passwordSure").bind("blur",isPasswordSure);
    $(".item_messageCode").bind("blur",isMessageCode);

    function isPhone(){
        var regPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        var promptMsg = $(".item_phone").parent().children().eq(-1);
        var userName = $.cookie.getSub($(".item_phone").val(),"uName");
        if($(".register_way").html() == "手机号码：&nbsp;"){
            if($(".item_phone").val() == ""){
                promptMsg.css("display","block").html("手机号码不能为空！");
                return false;
            } else if(!regPhone.test($(".item_phone").val())) {
                promptMsg.css("display","block").html("手机号输入非法！");
                $(".item_phone").focus();
                return false;
            } else if(userName != undefined){
                promptMsg.css("display","block").html("该手机号已被注册！");
                $(".item_phone").focus();
                return false;
            } else if(userName == undefined){
                promptMsg.css("display","none");
                $(".item_phone").addClass("item_right");
                return true;
            }
        } else if($(".register_way").html() == "邮箱号码：&nbsp;"){
            if($(".item_phone").val() == ""){
                promptMsg.css("display","block").html("邮箱不能为空！");
                return false;
            } else if(!regEmail.test($(".item_phone").val())) {
                promptMsg.css("display","block").html("邮箱号输入非法！");
                $(".item_phone").focus();
                return false;
            } else if(userName != undefined){
                promptMsg.css("display","block").html("该邮箱号已被注册！");
                $(".item_phone").focus();
                return false;
            } else if(userName == undefined){
                promptMsg.css("display","none");
                $(".item_phone").addClass("item_right");
                return true;
            }
        }

    };

    function isCode(){
        var promptMsg = $(".item_code").parent().children().eq(-1);
        if($(".item_code").val() == ""){
            promptMsg.css("display","block").html("验证码不能为空！");
            return false;
        } else if($(".item_code").val().toLowerCase() != $(".identifyCode").text().toLowerCase()){
            promptMsg.css("display","block").html("验证码输入错误！");
            $(".item_code").focus();
            return false;
        } else {
            promptMsg.css("display","none");
            $(".item_code").addClass("item_rightCode");
            return true;
        }
    };

    function isPassword(){
        var reg = /^[a-z0-9_-]{6,18}$/;
        var promptMsg = $(".item_password").parent().children().eq(-1);

        if($(".item_password").val() == ""){
            promptMsg.css("display","block").html("密码不能为空！");
            return false;
        } else if(!reg.test($(".item_password").val())) {
            promptMsg.css("display","block").html("密码输入错误！请输入6-18位字符");
            $(".item_password").focus();
            return false;
        } else {
            promptMsg.css("display","none");
            $(".item_password").addClass("item_right");
            return true;
        }
    };

    function isPasswordSure(){
        var promptMsg = $(".item_passwordSure").parent().children().eq(-1);

        if($(".item_passwordSure").val() == ""){
            promptMsg.css("display","block").html("确认密码不能为空！");
            return false;
        } else if($(".item_passwordSure").val() != $(".item_password").val()) {
            promptMsg.css("display","block").html("确认密码与密码不一致！");
            $(".item_passwordSure").focus();
            return false;
        } else {
            promptMsg.css("display","none");
            $(".item_passwordSure").addClass("item_right");
            return true;
        }
    };

    function isMessageCode(){
        var promptMsg = $(".item_messageCode").parent().children().eq(-1);

        if($(".item_messageCode").val() == ""){
            promptMsg.css("display","block").html("短信验证码不能为空！");
            return false;
        } else if($(".item_messageCode").val().toLowerCase() != $(".identifyCode").text().toLowerCase()) {
            promptMsg.css("display","block").html("短信验证码与验证码不一致！");
            $(".item_messageCode").focus();
            return false;
        } else {
            promptMsg.css("display","none");
            $(".item_messageCode").addClass("item_right");
            return true;
        }
    };

    function isAgree(){
        if($(".register_remember").is(':checked')){
            return true;
        } else {
            alert("您未点击阅读并同意！");
            return false;
        }
    }
    $(".register_submit").click(function(){
        if(!isPhone() | !isCode() | !isPassword() | !isPasswordSure() | !isMessageCode() | !isAgree()){
            return false;
        }else{
            $.cookie.setAll(
                $(".item_phone").val(),
                {"uName":$(".item_phone").val(),"uPwd":$(".item_password").val()},
                undefined,
                "/UGoShop/");
            $(".frameBox").css("display","block");
            $(".message2").text($(".item_phone").val());
            $(".frame").css("display","block");
            $(".go_login").click(function(){
                location.href = "login.html";
            });
            return true;
        }
    });

});