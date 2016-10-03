/**
 * Created by my on 2016/9/28.
 */
$(function() {

    /**
     *  搜索
     *
     */

    var availableTags = [
        "安子李",
        "阿芙",
        "安超",
        "宝嘉丽",
        "宝石",
        "百利达",
        "宝宝用品",
        "厨房",
        "初装",
        "厨房用品",
        "厨房用具",
        "东方宝石",
        "地方特产",
        "电纸书",
        "翡翠",
        "品牌厨具",
        "品牌护肤",
        "品牌套件",
        "品牌锅具",
        "品牌女装",
        "品牌床品",
        "品牌男包"
    ];
    $( "#tags" ).autocomplete({
        source: availableTags
    });


    /**
     * banner图轮播
     *
     */
    var scrollNode = $("#banner_scroll");

    // 翻前页和后页
    $("#banner_prev, #banner_next").bind("click", clickPreOrNext);

    $("#banner_nav span").bind("mouseover", mouseoverNav);

    $("#banner_con").hover(function(){
        $("#banner_prev,#banner_next").stop().fadeIn(500);
    },function(){
        $("#banner_prev,#banner_next").stop().fadeOut(500);
    });

    function init() {
        scrollNode.timer = null;
        scrollNode.data("pageIndex", 0);
        autoPlay();
    }

    function clickPreOrNext(){
        clearInterval(scrollNode.timer);
        if ($(this).hasClass("banner_prev")) {
            turnPage("left");
        } else {
            turnPage("right");
        }
        autoPlay();
    }

    function mouseoverNav() {
        var index = $(this).index();
        renderNav(index);
        turnPage(index);
        autoPlay();
    }
    function scrollPlay(pageIndex) {
        scrollNode.stop().animate({left: -1920 * pageIndex}, 500);
    }

    function autoPlay(){
        clearInterval(scrollNode.timer);
        scrollNode.timer = setInterval(function(){
            turnPage("right");
        }, 3000);
    }

    /**
     * 翻页处理
     * @param direction string|number
     */
    function turnPage(direction){
        var pageIndex = $("#banner_scroll").data("pageIndex");

        if (direction == "left") {
            if (pageIndex == 0) {
                scrollNode.css("left", -scrollNode.width() + 1920);
                pageIndex = 5;
            }
            pageIndex--;
            renderNav(pageIndex);

        }
        if (direction == "right") {
            pageIndex++;
            // 当图片在第6张 也即显示第一张的时候
            if (pageIndex == 6) {
                scrollNode.css("left", 0);
                pageIndex = 1;
            }
            // 当页面在第5张 准备跳到第6张是，要把nav状态切换到第一个
            // 其他情况下都是显示要走的那个即可
            if (pageIndex == 5) {
                renderNav(0);
            } else {
                renderNav(pageIndex);
            }

        }
        if (typeof direction == "number") {
            pageIndex = direction;
            renderNav(pageIndex);
        }
        scrollNode.data("pageIndex", pageIndex)
        scrollPlay(pageIndex);
    }


    function renderNav(index){
        $("#banner_nav").children().eq(index).addClass("hover")
            .siblings().removeClass("hover")
    }

    init();

    /**
     * day_choice
     *
     */

    var choiceNode = $(".day_choice_ul");

    choiceNode.data("pageIndex", 0);
    choiceNode.timer = setInterval(choice_scroll,2000);
    choiceNode.fadeIn(1000);
    $(".choice_span_box").children().eq(0).addClass("span");
    function choice_scroll(){
        var index = choiceNode.data("pageIndex");
        if(index == 5){
            index = -1;
        }
        index++;
        choiceNode.css({
            "left":-index*choiceNode.children().eq(0).width(),
            "display":"none"
        });
        $(".choice_span_box").children().removeClass();
        $(".choice_span_box").children().eq(index).addClass("span");

        choiceNode.fadeIn(500);
        choiceNode.data("pageIndex",index);
    }

    choiceNode.hover(function(){
        clearInterval(choiceNode.timer);
    },function(){
        choiceNode.timer = setInterval(choice_scroll,2000);
    });
    $(".choice_img_box").children().hover(function(){
        clearInterval(choiceNode.timer);
        var index = $(this).index();
        choiceNode.css({
            "left":-index*choiceNode.children().eq(0).width(),
            "display":"none"
        });
        $(".choice_span_box").children().removeClass();
        $(".choice_span_box").children().eq(index).addClass("span");
        choiceNode.fadeIn(500);
        choiceNode.data("pageIndex",index);
    },function(){
        choiceNode.timer = setInterval(choice_scroll,2000);
    });

    $("#day_prev").click(function(){
        clearInterval(choiceNode.timer);
        var index = choiceNode.data("pageIndex");
        index--;
        if(index == -1){
            index = 5;
        }
        choiceNode.css({
            "left":-index*choiceNode.children().eq(0).width(),
            "display":"none"
        });
        $(".choice_span_box").children().removeClass();
        $(".choice_span_box").children().eq(index).addClass("span");
        choiceNode.fadeIn(500);
        choiceNode.data("pageIndex",index);
        choiceNode.timer = setInterval(choice_scroll,2000);
    });
    $("#day_next").click(function(){
        clearInterval(choiceNode.timer);
        var index = choiceNode.data("pageIndex");
        index++;
        if(index == 6){
            index = 0;
        }
        choiceNode.css({
            "left":-index*choiceNode.children().eq(0).width(),
            "display":"none"
        });
        $(".choice_span_box").children().removeClass();
        $(".choice_span_box").children().eq(index).addClass("span");
        choiceNode.fadeIn(500);
        choiceNode.data("pageIndex",index);
        choiceNode.timer = setInterval(choice_scroll,2000);
    });


    /**
     * shopping____live
     *
     */
    $(".live").data("index",0);
    $("#live_prev").click(function(){
        var index = $(".live").data("index");
        index--;
        if(index == -1){
            index = 1;
        }
        $(".live").animate({left:-index * 270 });
        $(".live").data("index",index);
    });
    $("#live_next").click(function(){
        var index = $(".live").data("index");
        index++;
        if(index == 2){
            index = 0;
        }
        $(".live").animate({left:-index * 270 });
        $(".live").data("index",index);
    });
});