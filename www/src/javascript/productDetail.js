/**
 * Created by my on 2016/10/3.
 */
$(function() {
    /**
     *  jqueryUI插件实现搜索实时显示
     *
     */

    $(".btn").on("click",function(){
        if($(".txt").val() == "品牌厨具"){
            location.href = "product_list.html";
        }
    });
    /**
     * 放大镜.
     */

    //点击小图，大图出现对应图片
    $(".product_bigImg").data("index",0);
    $(".smallImg1").addClass("imgHover");
    $(".product_smallImg li").click(function(){
        var index = $(this).index();
        $(".product_smallImg li").removeClass("imgHover");
        $(this).addClass("imgHover");
        $(".product_bigImg").css("left",- index * $(".product_bigImg").children().eq(0).width());
        $(".product_bigImg").data("index",index);
    });
    $(".product_big").on("mouseover mouseout",function() {
        var index =$(".product_bigImg").data("index");
        var srcUrl =  $(".product_bigImg").children().eq(index).children().attr("src");
        $(".product_move").toggle();
        $(".product_blowUp").toggle().children().attr("src",srcUrl);
    });
    $(".product_big").mousemove(function(e){
        //鼠标追随方块的左上距离
        var x = e.pageX - $(this).offset().left - $(".product_move").outerWidth() / 2;
        var y = e.pageY - $(this).offset().top - $(".product_move").outerHeight() / 2;
        console.log(x+"...."+y)
        //右侧大图的左上移上距离
        var largeW = $(".largeImg").outerWidth();
        var largeH = $(".largeImg").outerHeight();
        var smallW = $(this).outerWidth();
        var smallH = $(this).outerHeight();


        //鼠标追随方块和右侧浏览大图的边界处理
        if(x >= this.offsetWidth - $(".product_move").outerWidth()){
            x = this.offsetWidth - $(".product_move").outerWidth() ;
        } else if(x <= 0){
            x = 0;
        }
        if(y >= this.offsetHeight - $(".product_move").outerHeight()){
            y = this.offsetHeight - $(".product_move").outerHeight();
        } else if(y <= 0){
            y = 0;
        }
        var imgX = - (largeW / smallW) * x;
        var imgY = - (largeH / smallH) * y;

        //鼠标追随方块的左上距离
        $(".product_move").css({
            "left": x + "px",
            "top": y + "px"
        });
        //右侧大图的左上移上距离
        $(".largeImg").css({
            "left": imgX + "px",
            "top": imgY + "px"
        });
    });


    /**
     *  加入购物车事件
     */
    $(".product_addCar").on("click",function(){
        var currentUser = $.cookie.getSub("currentUser","uName");
        if( currentUser != undefined ){
            var currentUser_product = $.cookie.getSub($(".productId").text(),"pName");
            if(currentUser_product != undefined ){

            } else {
                console.log("购物车没此商品！");
                var _key = "product" + $(".productId").text();
                var _value = {
                    "pName" : $(".pName").text(),
                    "pColor" : $(".product_color .goods_div_default").text(),
                    "pSize" : $(".product_norms .goods_div_default").text(),
                    "pAddress" : $(".product_address .goods_div_default").text(),
                    "pNumber" : $(".product_number").val(),
                    "pImgUrl" : $(".bigImg1 img").attr("src"),
                    "pPrice" : $(".pPrice").text()
                };
                $.cookie.setAll(_key,_value, undefined,"/UGoShop/");
            }
        } else{
            return;
        }
    });

    //商品数量事件
    $(".product_number").val(1);
    $(".add").click(function(){
        var num = parseInt($(".product_number").val());
        num++;
        $(".product_number").val(num);
    });

    $(".decrease").click(function(){
        var num = parseInt($(".product_number").val());
        num--;
        if(num >= 1){
            $(".product_number").val(num);
        }
    });

    //选择
    $(".goods_div").click(function(){
        $(this).addClass("goods_div_default");
        $(this).siblings().removeClass("goods_div_default");
    });
});