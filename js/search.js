$(function () {
    var $tabLi = $('#banner .tab li');
    var $picLi = $('#banner .pic li');
    var $btn = $('#banner .btn');
    var $btnDiv = $('#banner .btn div');
    var $banner = $('#banner');
    var index = 0;
    var timer;

    $tabLi.click(function () {
        index = $(this).index();
        fn();
    });

    $banner.hover(function () {
        $btn.show();
        clearInterval(timer);
    }, function () {
        $btn.hide();
        auto();
    });

    $btnDiv.click(function () {
        var i = $(this).index();
        i ? index++ : index--;

        fn();
    }).mousedown(function () {
        return false;
    });

    auto();

    function auto() {
        timer = setInterval(function () {
            index++;

            fn();
        }, 3000);
    }

    function fn() {

        if (index > $tabLi.length - 1) {
            index = 0
        } else if (index < 0) {
            index = $tabLi.length - 1
        }
        $tabLi.eq(index).addClass('on').siblings().removeClass('on');
        $picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
    }
    
});

function getData() {
    $.ajax({
        url: "https://suggest.taobao.com/sug?q=" + $("#search").val() + "&callback=jsonp1796",//请求地址
        data: {
            search: $("#search").val(),
            temp: "hua"
        },
        dataType: 'jsonp',
        success: function (data) {
            var lis = ""
            for (var i in data.result) {
                lis += "<li>" + data.result[i][0] + "</li>"
            }
            $(".search_data_list").html(lis)
        },
        error: function () {
        }
    })

}

$(function () {
    // 视频
    var video = document.querySelector("#myvideo")
    var play = document.querySelector(".play")
    var pause = document.querySelector(".pause")
    var allTime = document.querySelector(".alltime")
    var currentTime = document.querySelector(".currenttime")
    var jdbar = document.querySelector(".jdbar") //当前进度
    var progressbar = document.querySelector(".progressbar")//时间总进度条 
    var full = document.querySelector(".full")
    var volumbar = document.querySelector(".volumbar")
    var ylbar = document.querySelector(".ylbar")

    //当视频可以播放时触发
    video.addEventListener("canplay", function () {
        //更新总时长
        allTime.innerHTML = fmtDate(video.duration)
        // 设置播放按钮事件
        play.addEventListener("click", function () {
            this.style.display = "none"
            pause.style.display = "block"
            video.play();   //播放视频
        }, false)
        pause.addEventListener("click", function () {
            this.style.display = "none"
            play.style.display = "block"
            video.pause();   //暂停视频
        }, false)



        //当目前的播放位置已更改时触发。重新获取当前播放位置 更新currtime
        video.addEventListener("timeupdate", function () {
            //更新当前时间
            currentTime.innerHTML = fmtDate(video.currentTime);
            //更新进度条
            //根据当前时间，总时长换算出 当前播放百分比
            var percent = video.currentTime / video.duration * 100 + "%"
            console.log(percent);
            //50s 100s ,10/100 =0.5*100+%
            jdbar.style.width = percent;

            if (video.paused) {
                play.style.display = "block";
                pause.style.display = "none";
            } else {
                play.style.display = "none";
                pause.style.display = "block";
            }
        }, false)
        //点击进度条触发
        progressbar.addEventListener("click", function (e) {
            e = e || Event
            //获取当前点击的位置
            var x = e.offsetX;
            //获取当前总进度
            var allwidth = this.offsetWidth;
            console.log(x, allwidth);
            //当前点击位置/总宽度 。  0.5
            var percent = x / allwidth;
            //根据百分比设置当前宽度
            jdbar.style.width = percent * 100 + "%";

            //总时长*比例0.5 = 当前时长
            // 例如： 100s*0.5 = 50s
            video.currentTime = video.duration * percent;

        }, false)
        //全屏播放
        full.addEventListener("click", function () {
            if (video.webkitRequestFullScreen) {
                video.webkitRequestFullScreen();
            }
        }, false)

        //音量条
        volumbar.addEventListener("click", function (e) {
            e = e || Event
            var x1 = e.offsetX;
            var allwidth1 = this.offsetWidth;
            var percent1 = x1 / allwidth1;
            ylbar.style.width = percent1 * 100 + '%';
            video.volume = percent1;

        }, false)

    }, false)

})
//格式化函数 吧相同的放入到函数内 把不确定的座位参数传入
function fmtDate(time) {
    var min = Math.floor(time / 60);   //得到总时长的分钟数  time是总时长 （以秒计）
    var sec = Math.floor(time % 60);   // 得到总时长的秒数 
    min = min < 10 ? "0" + min : min;   //当分钟数小于10时 让他显示01 02的形式
    sec = sec < 10 ? "0" + sec : sec;   //当秒钟数小于10时 让他显示01 02的形式
    return min + ":" + sec             //最后返回结果  例如  01：38
}
// 懒加载
function lazyLoadFn() {
    $("img.lazy").css("opacity", .1);
    // 滚动条滚动时获取所有img.lazy 的top值，
    // 如果滚动条距离顶部的距离加上 可视区的高度  > top值那么加载当前图片的真实路径
    $(window).on("scroll", function () {
        var h = $(this).height() + $(this).scrollTop();


        $.each($("img.lazy"), function (index, item) {
            if (h >= $(item).offset().top) {
                var curtImgSrc = $(item).attr("data-original");

                $(item).animate({
                    opacity: 1
                }, 50)

                $(item).attr("src", curtImgSrc);

            }
        });

    })
}
lazyLoadFn();

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
$(".fonts .xinx").click(function () {
    $(".click_sc").show()
    $(".zhezc").css("backgroundColor", "rgba(30, 30, 30,.4)")
})
$(".click_sc .right").click(function () {
    $(".click_sc").hide()
})


function toTopFn() {
    // fixed_rt_list_box 
    $(window).scroll(function () {

        if ($(window).scrollTop() > $(window).height()) {
            $(".backtotop").stop(true, true).fadeIn();
        } else {
            $(".backtotop").hide();
        }
    })


    $(".backtotop").click(function () {
        console.log(this);
        $("html,body").animate({
            scrollTop: 0
        })
    })
}
toTopFn();



window.onload = function() {
    $(".icon02").click(function () {
        var nnn = document.getElementById("page01");
        var aaa = parseInt(nnn.innerHTML);
        if (aaa >= 11) {
            aaa = 11
        }
        ++aaa
        nnn.innerHTML = aaa
        return;
    })
    $(".icon01").click(function () {
        var n = document.getElementById("page01");
        var a = parseInt(n.innerHTML);
        if (a <= 1) {
            n.innerHTML = 1;
            $(".page01").css("cursor", "not-allowed")
        } else {
            n.innerHTML = --a;
        }
    
    })
    
}






$(".product-list .product-box").click(function () {
    location.href = "details.html"
})
