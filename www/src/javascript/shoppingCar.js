/**
 * Created by my on 2016/10/5.
 */
$(function() {

    //获取用户cookie信息
    var currentUser = $.cookie.getSub("currentUser","uName");

    //获取商品cookie信息
    function getProductCookie(){
        var product_cookies = {};
        var i = 0;
        while(i < 50){
            var flag = $.cookie.getAll("product" + (i + 1));
            if( flag != undefined && flag != ""){
                product_cookies["product" + (i + 1)] = $.cookie.getAll("product" + (i + 1));
            }
            i++;
        }
        return product_cookies;
    }

    if( currentUser != undefined && currentUser != "" ){
        var product_cookies = getProductCookie();
        //console.log(product_cookies);
        $.each(product_cookies,function(i,valueout){
            var strOut = "<ul class='car_list' id='"+ i +"'></ul>";
            $(".car_middle").append(strOut);
            //console.log(i)
            var strInfo = "<li class='pro_checkbox'>" +
                "<input type='checkbox' class='checkbox'/>" +
                "</li>" +
                "<li class='pro_img'>" +
                "<div class='pro_img_div'>" +
                "<img src='" + valueout.pImgUrl + "' alt=''/>" +
                "</div>" +
                "</li>" +
                "<li class='pro_info'>" +
                "<p class='pro_name'>" + valueout.pName +
                "</p>" +
                "<p class='pro_color'>颜色：<span>"+ valueout.pColor +"</span></p>" +
                "<p class='pro_size'>尺码：<span>" + valueout.pSize +"</span></p>" +
                "</li>" +
                "<li class='pro_address pro'>" +
                "<p>有货</p>" +
                "</li>" +
                "<li class='pro_price pro'>" +
                "<p>￥<span>"+ valueout.pPrice +"</span></p>" +
                "</li>" +
                "<li class='pro_number pro'>" +
                "<div class='num_change'>" +
                "<input type='button' class='decrease' value='-'/>" +
                "<input type='text' onkeydown='inputNumber(e)' value=" + valueout.pNumber +" class='product_number' />" +
                "<input type='button' class='add' value='+'/>" +
                "</div>" +
                "</li>" +
                "<li class='pro_subtotal pro'>" +
                "<p>￥<span class='xiaoji'></span></p>" +
                "</li>" +
                "<li class='pro_handle pro'>" +
                "<a href='javascript:void(0)' class='pro_del'>删除</a>" +
                "<a href='javascript:void(0)' class='pro_collect'>收藏</a>" +
                "</li>";
            $("#"+i).append(strInfo);
            freshPrice(i);
        });

    } else{
        return;
    }

    $(".add").on("click",function(){
        var num = parseInt($(this).prev().val());
        num++;
        $(this).prev().val(num);
        resetCookie($(this).parent().parent().parent().attr("id"));
        freshPrice($(this).parent().parent().parent().attr("id"));
        freshPrice();
    });
    $(".decrease").on("click",function(){
        var num = parseInt($(this).next().val());
        num--;
        if(num >= 1) {
            $(this).next().val(num);
        }
        resetCookie($(this).parent().parent().parent().attr("id"));
        freshPrice($(this).parent().parent().parent().attr("id"));
        freshPrice();
    });

    function resetCookie(id){
        var productCookie = getProductCookie();
        var pName,pColor,pSize,pAddress,pNumber,pImgUrl,pPrice;
        $.each(productCookie,function(i,valueout) {
            //console.log(valueout.pName)
            if(i == id) {
                pName = valueout.pName;
                pColor = valueout.pColor;
                pSize = valueout.pSize;
                pAddress = valueout.pAddress;
                pNumber = valueout.pNumber;
                pImgUrl = valueout.pImgUrl;
                pPrice = valueout.pPrice;
            }
        });
        var _value = {
            "pName" : pName,
            "pColor" : pColor,
            "pSize" : pSize,
            "pAddress" : pAddress,
            "pNumber" : $("#"+id+" .product_number").val(),
            "pImgUrl" : pImgUrl,
            "pPrice" : pPrice
        }
        $.cookie.setAll(id,_value,undefined,"/UGoShop/");
    }
    $(".accounts_number").text(0);
    function freshPrice(id){
        if(id == undefined){
            var checkedList = $(".car_middle").find("input:checked").parent().parent();
            var total = 0;
            checkedList.each(function(i, value){
                var num = parseInt($.cookie.getSub(this.id,"pNumber")) || 0;
                var price = parseInt($.cookie.getSub(this.id,"pPrice")) || 0;
                total += num * price;
            })
            $(".accounts_p .accounts_span2").text("￥" + total);
            $(".accounts_number").text($(".car_middle").find("input:checked").length);
        } else {
            var num = parseInt($.cookie.getSub(id,"pNumber")) || 0;
            var price = parseInt($.cookie.getSub(id,"pPrice")) || 0;
            console.log(typeof num)
            var total = num*price;
            $("#"+id+" .xiaoji").text(total);
        }
    }
    $(".allCheck").attr("checked", false);
    $(".allCheck").change(function(){
        if (this.checked) {
            $(".car_middle input:checkbox").attr("checked", true);
        } else {
            $(".car_middle input:checkbox").attr("checked", false);
        }
        freshPrice();
    })
    $(".car_middle .checkbox").bind("change", function(){
        freshPrice();
        if($(".car_middle .checkbox").length == $(".car_middle input:checked").length) {
            $(".allCheck").attr("checked", true);
        } else {
            $(".allCheck").attr("checked", false);
        }
    })


});
function inputNumber(e){
    e = e || event;
    if(e.keyCode < 8 || e.keyCode > 8 && e.keyCode < 47 || e.keyCode > 57){
        return false;
    }
}