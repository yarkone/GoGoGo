/**
 * Created by my on 2016/10/3.
 */
$(function() {

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
    $(".product_big").on("mouseenter mouseleave",function() {
        var index =$(".product_bigImg").data("index");
        $(".product_move").toggle();
        $(".product_blowUp").toggle().children().attr("src","../images/productDetail/bigImg"+ (index + 1)  +".jpg");
    });
    $(".product_big").mousemove(function(e){
        //鼠标追随方块的左上距离
        var x = e.offsetX - $(".product_move").outerWidth() / 2;
        var y = e.offsetY - $(".product_move").outerHeight() / 2;

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

    });
});