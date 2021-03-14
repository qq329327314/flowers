$(function () {
   
    //订单号验证
    $("#order-kd").blur(function () {
        var reg = /^[0-9]{10}$/;
        if (!reg.test($(this).val())) {
            $(".red-1").html("订单号输入不合法,订单号由10位数字(0-9)组成!")
        } else {
            $(".red-1").html("正确")
        }
    })
    // 手机邮箱验证
    $("#order-cm").blur(function () {
        var reg1 = /^13[789]\d{8}$/;
        var reg2 = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
        if (!(reg1.test($(this).val()) || reg2.test($(this).val()))) {
            $(".red").html("手机以13/7/8/9开头的11位号码，或者使用邮箱");
        } else {
            $(".red").html("正确");
        }
    })
    // 左边侧边栏
    $(function () {
        if (localStorage.menuState) {
            //读取
            var arr = localStorage.menuState.split(",")
            arr.forEach(function (item, index) {
                //    console.log("forrach",index)
                $("dl").eq(index).children("dd").css("display", item)
            })
        } else {
            //第一次打开时.先初始化一个空间
            localStorage.setItem("menuState", new Array($("dt").length))
        }
        $("dt").click(function () {
            //得到单前索引
            var dtindex = $(this).parent().index()
            console.log(dtindex)
            $(this).siblings().stop().slideToggle(function () {
                //当前打开或关闭的动画完成后.获取当前的状态进行储存
                var arr = localStorage.menuState.split(",")
                arr[dtindex] = $(this).css("display")
                localStorage.menuState = arr
            })
        })
    })
    // 视频
    // 得到对象
    var video = document.querySelector("#video");
    var play = document.querySelector(".play");
    var pause = document.querySelector(".pause");
    var allTime = document.querySelector(".allTime");
    var currentTime = document.querySelector(".currentTime");
    var jdbar = document.querySelector(".jdbar");
    var progressbar = document.querySelector(".progressbar")
    var volumbar = document.querySelector(".volumbar");
    var ylbar = document.querySelector(".ylbar");
    var full = document.querySelector(".full")
    //当视频播放时触发
    video.addEventListener("canplay", function () {
        // 播放和暂停功能 
        play.addEventListener("click", function () {
            this.style.display = "none";
            pause.style.display = "block";
            video.play();//播放视频
        })
        pause.addEventListener("click", function () {
            this.style.display = "none";
            play.style.display = "block";
            video.pause();//暂停视频
        })
        // console.log("视频总时长：",video.duration)
        //更新总时长
        allTime.innerHTML = fmtDate(video.duration);

        //当目前的播放位置更改时触发，重新获取当前播放位置，更新currtime
        video.addEventListener("timeupdate", function () {
            // console.log("timeupdate")
            // 更新当前时间  
            currentTime.innerHTML = fmtDate(video.currentTime);
            // 更新进度条
            //根据当前时间，总时长换算出当前播放百分比
            var percent = video.currentTime / video.duration * 100 + "%";
            // 50s 100s , 10/100=0.5*100+%
            jdbar.style.width = percent;

            if (video.paused) {
                play.style.display = "block";
                pause.style.display = "none";
            } else {
                play.style.display = "none";
                pause.style.display = "block";
            }
        })

        // 点击进度条触发
        progressbar.addEventListener("click", function (e) {
            e = e || window.event;
            // 获取当前点击位置
            var x = e.offsetX;
            //获取当前总长度
            var allwidth = this.offsetWidth;
            // console.log(x,allwidth);
            // 当前点击位置/总宽度  0.5
            var percent = x / allwidth;
            //根据百分比设置当前宽度
            jdbar.style.width = percent * 100 + "%";
            //总时长*比例.5 = 当前时间
            //例：100s*.5=50s
            video.currentTime = video.duration * percent;
        })

        // 音量
        volumbar.addEventListener("click", function (e) {
            // e = e || window.event;
            // 获取当前点击位置
            var x = e.offsetX;
            //获取当前总长度
            var ylwidth = this.offsetWidth;
            // console.log(x, ylwidth);
            // 当前点击位置/总宽度  0.5
            var percent = x / ylwidth;
            //根据百分比设置当前宽度
            video.volumbar = percent;
            ylbar.style.width = percent * 100 + "%";
            //总时长*比例.5 = 当前时间
            //例：100s*.5=50s
            // video.currentTime = video.duration*percent;  
        },false)

        //全屏
        full.addEventListener("click", function () {
            if (video.webkitRequestFullScreen) {
                video.webkitRequestFullScreen();
            }
        })
    })
    //格式化函数 帮相同的放到函数里，把不确定的作为参数传入
    function fmtDate(time) {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        return min + ":" + sec;
    }
      //焦点事件
      $("#searchv").blur(function(){
        $("#ullist").hide();
    }).focus(function(){
        $("#ullist").show();
    })
     // 获取本地用户名储存数据
     $(function(){
        var bdName = localStorage.user1
        // console.log(bdName)
        if(bdName!=undefined){
        $(".login").html("欢迎你:"+bdName)
        $(".register").html("退出登录")
    
        }
    })
    //  console.log(arr)
    // 获取购物车储存数据
    function cretateElemF() {
        var shopDatas = window.localStorage.shopData;
        
        if (shopDatas != undefined) { //当有数据时再渲染数据
            shopDatas = JSON.parse(shopDatas);
            
            var str = "";
            $.each(shopDatas.data, function (index, item) {
                str += `<li>
                            <img src="${item.imgSrc}" alt="" class="lt">
                            <p class="shop_introduce lt">
                                ${item.tit}
                            </p>
                            <div class="count_box lt">
                                <i class="cut">-</i>
                                <span class="count">${item.count}</span>
                                <i class="add">+</i>
                            </div>
                            <span class="price rt">￥${item.price}</span>
                        </li>`

            });
            
            $(".head_box .shop_list").prepend(str)
        }
        
    }
    cretateElemF() 
    $(".shop_cart").hover(function(){
        $(".shop_list").show()
        $(".empty_shop_list").show()
    },function(){
        $(".shop_list").hide()
        $(".empty_shop_list").hide()
        location.reload();
    })
    

}) 
// 跨域请求
    window.onload = function () {
        document.getElementById("searchv").oninput = function () {
            // console.log(this.value);
            var script = document.createElement("script");
            script.src = "https://suggest.taobao.com/sug?code=utf-8&q=" + this.value + "&callback=myfn";
            document.body.appendChild(script)
        }

        window.myfn = function (data) {
            // console.log("myfn:",data.result);
            var lis = "";
            for (var i in data.result) {
                // console.log(data.result[i][0])
                lis += "<li>" + data.result[i][0] + "</li>"
            }
            document.getElementById("ullist").innerHTML = lis
        }
    }