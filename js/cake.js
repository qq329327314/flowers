// 右侧固定广告栏
$(".head").hover(function () {
    $(".hears").show()
}, function () {
    $(".hears").hide()
})
$(".erweima").hover(function () {
    $(".erweimas").show()
}, function () {
    $(".erweimas").hide()
})
current = 0;
$(".fonts .cars").click(function () {
    current++;
    $(".shop>.current").html(current);
})

// 遮罩层
$(".fonts .xinx").click(function () {
    $(".click_sc").show().css("transform","translate(-50%,-50%)").animate({
        top: "50%"
    },500)
    $(".mask").css("display","block")
    $("body").css("overflow-y","hidden") 
})
$(".click_sc .right").click(function () {
    $(".click_sc").hide().stop(true,true).css("top","100%")
    $(".mask").css("display","none")
    $("body").css("overflow-y","auto") 
})



// 点击字母，首字评语一样的改变类
$(".zimu>.right a").click(function () {
    //清空class
    $(".address span").removeClass("font_color")
    //获取城市的a标签
    var addressArr = $(".address span a")
    // console.log(addressArr);
    //遍历所有城市
    for (var i = 0; i < addressArr.length; i++) {
        //城市的城市名 ——取首字符（第一个字）
        var str = $(".address span a")[i].innerHTML.charAt(0)
        //首字转换成拼音
        str = pinyin.getCamelChars(str)

        //判断，当点击的当前导航行的字母等于 str 城市的首字拼音时
        if (str == $(this).html()) {
            //添加类

            $($(".address span a")[i]).parent().addClass("font_color")


        }
        // console.log(str);

    }
})

// 跨域，词条
window.onload = function () {
    $(".user_search .user_import").on("input", function () {
        console.log($(this).val());
        $.ajax({
            url: "https://suggest.taobao.com/sug?code=utf-8&q=" + $(this).val(),
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                var str = "";
                for (var i in data.result) {
                    str += "<li>" + data.result[i][0] + "</li>"
                }
                $(".search_data_list").html(str);
            }
        })

    })

    // 回到顶部
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 50) {
            $("#backs").animate({
                bottom: 50,
            }, 800)
        } else {
            $("#backs").stop(true, true).css("bottom", -100)
        }
    })

    $("#backs").click(function () {
        $("html,body").animate({
            scrollTop: 0,
        }, 800)
    })

}

// 懒加载
$(function(){
    $("img.lazy").lazyload();
})

//二级联动                  
// console.log(citys.length)
// console.log(citys[1].Name)
var shengf ="";
var citySelect = "";
for(var i=0;i<citys.length;i++){
    shengf += ('<option value='+i+'>'+citys[i].Name+'</option>')
}
$("#shengfen").html(shengf)
document.getElementById("shengfen").onchange = function(){
    citySelect = "";
    console.log("this",this.value); 
    var nub = this.value;//获取点击省份下标
    console.log(nub)
    var num = citys[nub].Citys[2].Name
    console.log(num)
    for(var i=0;i<citys[nub].Citys.length;i++){
        citySelect += ('<option value='+i+'>'+citys[nub].Citys[i].Name+'</option>')
    }
    $("#city").html(citySelect)
}


// 为所有商品添加跳转
$(".picrues ul li .box>div>img").click(function() {
    location.href = "details.html"
})


