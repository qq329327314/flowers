// 关闭顶部广告
$(".ad_box").click(function () {
    alert("想看广告是不可能滴!");
})
$(".ad_box .close_btn").click(function (e) {
    e = e || window.event;
    e.stopPropagation();
    $(this).parents(".ad_box").slideUp();
})


// 防止没有跳转业务的a 重复刷新页面
$.each($("a"), function (index, item) {
    if ($(item).attr("href") == "") {
        $(item).attr("href", "javascript:;")
    }
});



// 判断用户是否登录，如果登录那么展现用户名或者手机号或者邮箱号
function showUserInfo() {
    var userInfo = window.localStorage.user1;
    if (userInfo != undefined) {
        //将请登录隐藏，注册隐藏
        $(".userInfo_li").show();
        $(".login_and_enroll").hide();
        // 如果用户登录了，那么就将用户名显示在头部
        $(".userInfo_li .userInfo").html(localStorage.user1)

        //退出登录
        $(".userInfo_li .sign_out").click(function () {
            $(".userInfo_li").hide();
            $(".login_and_enroll").show();
            //点击后清空localstorage中用户登录的数据

            window.localStorage.removeItem("user1");

        })
    } else {
        $(".userInfo_li").hide();
        $(".login_and_enroll").show();
    }
}
showUserInfo();





// 懒加载
function lazyLoadFn() {
    // $(function () {
    //     $("img.lazy").lazyload({ effect: "fadeIn" })
    // });


    // 懒加载基本原理：
    //初始化将所有的图片透明度修改
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






// 搜索区，根据用户输入，搜索对应关键字的商品
/* 
    用户输入时不断更新列表。
    鼠标失去焦点，隐藏列表。
*/
function hdSearch() {
    //获取菜单
    var $menu = $("#hd_search_box .shop_menu_list");
    // 获取input输入框
    var $userImport = $("#hd_search_box .user_import")

    //绑定事件
    $userImport.on("input", function () {
        //每次触发都去请求数据
        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: "https://suggest.taobao.com/sug?code=utf-8&q=" + $(this).val() + "&callback=jsonp291",
            success: function (data) {
                if (data) {
                    $menu.show();
                    // 定义一个用于存储标签的字符串变量
                    var str = "";
                    $.each(data.result, function (index) {
                        str += "<li><a href='search.html'>" + data.result[index][0] + "</li>"
                    });

                    //将数据渲染到页面

                    $menu.html(str);
                }

            }
        });
    })

    //当输入框获取焦点时如果输入框不为空，那么显示列表
    //当输入框失去焦点后隐藏列表
    $userImport.on("focus", function () {
        if ($(this).val()) $menu.show();

    }).on("blur", function () {
        $menu.fadeOut();
    })


    //当用户没有输入商品名称时点击按钮不发生跳转
    $("#hd_search_box .search_btn").on("click",noSkip);
    $("#hd_search_box .search_btn").css("cursor","pointer")
    
    function noSkip() {
        var reg = /^\s+ | \s+$/g
        var $inputDom = $("#hd_search_box .user_import");
        $inputDom.val($inputDom.val().replace(reg,""))

        var val = $inputDom.val().replace(reg,"")
        //判断输入框是否有内容
        if(val == "") {
           return false;
        }
        
    }

    $("#hd_search_box form").submit(function() {
        return $("#hd_search_box .search_btn").on("click",noSkip());
    }) 

}
hdSearch();






//顶部大轮播
/* 
    自动淡入淡出轮播
*/
function topMainBanner() {
    //初始化索引
    var index = 0;
    var intervalId = null;
    //轮播函数
    function activeBanner() {
        index++;
        if (index >= 4) index = 0;

        fadeInFn(); //调用淡入淡出函数
    }
    interval();


    //鼠标移入轮播区暂停轮播 
    $(".main_banner_box").hover(function () {
        clearInterval(intervalId);
    }, function () {
        interval(); //调用定时器
    })


    //点击 prev 上一页
    $(".main_banner_box .prev").on("click", function () {
        index--;
        if (index < 0) index = 3;
        console.log(index);
        fadeInFn();
    })
    //点击next下一页
    $(".main_banner_box .next").on("click", function () {
        index++;
        if (index >= 4) index = 0;

        fadeInFn();
    })



    //点击列表中的 项显示对应的轮播图
    $(".banner_options>li").click(function () {
        index = $(this).index();
        fadeInFn();
    })




    //定时器
    function interval() {
        intervalId = setInterval(activeBanner, 2500);
    }

    //淡入淡出,列表项样式更换
    function fadeInFn() {
        // 轮播淡入淡出
        $(".banner_img_box>li").stop(true, true).fadeOut();
        $(".banner_img_box>li").eq(index).fadeIn();
        //小圆点样式
        $(".banner_options>li").removeClass("active_option").eq(index).addClass("active_option");

    }
}
topMainBanner();








// 手风琴
function galleryFn() {
    // 鲜花臻选  手风琴
    var gallery = new XyGallery("zx_box", {
        width: 8,
        height: 1,
        activeWidth: 360, // 最大
        activeHeight: 460,// 最大
        defaultWidth: 120,// 最小
        defaultHeight: 460 // 最小 
    }, 500)


    //初始化 定时器
    var intervalId = null;
    // 初始化索引
    var i = -1;

    // 初始化详细信息元素的 top 值
    var ctop = $("#zx_box>a").eq(0).height() - $("#zx_box>a").eq(0).find(".flower_introduce_box").outerHeight();
    $("#zx_box>a").eq(0).find(".flower_introduce_box").css({
        top: ctop
    })


    $("#zx_box>a").hover(function () {
        //鼠标移入手风琴暂停手风琴切换
        clearInterval(intervalId);
        // 跟新初始化索引为当前元素索引
        i = $(this).index();
        //将当前元高亮
        $("#zx_box>a").removeClass("galleryOpacity");
        $("#zx_box>a").eq(i).addClass("galleryOpacity");



        /* 鼠标移入当前项显示 当前项的详细介绍 */
        // 如果项目宽度已展开大部分那么 开始 显示详细介绍
        var int = setInterval(function () {
            if ($("#zx_box>a").eq(i).width() >= 280) {
                clearInterval(int);
                showDetailElem("#zx_box>a")
            }
        }, 100)


    }, function () {
        autoSwitchGallery();
        // 移出后 详细介绍收起
        $(this).find(".flower_introduce_box").css({
            top: 382
        })
    })

    //自动切换
    function autoSwitchGallery() {
        intervalId = setInterval(mainSwitchFn, 2000)
    }
    autoSwitchGallery();

    // 自动切换的主函数
    function mainSwitchFn() {
        i++;
        if (i > 7) i = 0;
        //将当前元高亮
        $("#zx_box>a").removeClass("galleryOpacity");
        $("#zx_box>a").eq(i).addClass("galleryOpacity");

        showDetailElem("#zx_box>a")
        //调用手风琴方法
        gallery.activePicture(i)
    }



    // 自动显示与隐藏 详细元素
    function showDetailElem(elem) {
        // 使用当前元素的高度 - 详细元素的高度，得到最大top值
        $(elem).find(".flower_introduce_box").css("top", 382);
        var top = $(elem).eq(i).height() - $(elem).eq(i).find(".flower_introduce_box").outerHeight();

        $(elem).eq(i).find(".flower_introduce_box").css({
            top: top
        })
    }


}
galleryFn();



/* 
    固定底部的客户咨询对话框
    需求：
        1：点击底部咨询弹出对话框
            并且客服回复默认的内容
        2：点击右上角下拉箭头隐藏对话框
        3：用户点击发送，如果消息为空，提示用户，不能为空
        4：点击发送，如果输入不为空，那么创建dom元素，
            并将对应的消息展示在消息栏中，同有时带用户名称，和发送时间
        5：发送成功后，客服回复相应的语句
*/
function sendMessageServer() {
    //点击底部得在线客服按钮也可以打开聊天框
    var no = false;
    $("#onLineService").click(function () {
        if (no) return;
        no = true;
        $(".fixed_btm_server_box").click();
    })



    // 计算出消息框的最大高度
    $(window).resize(initailH)
    function initailH () {
        //屏幕高度 - (用户输入区的高度 + 聊天框头部的高度) = 消息框的最大高度
        var windowH = $(window).height();
        var messageBoxH = $(".send_message_box").innerHeight()
        var hdBoxH = $(".chat_hd_box").innerHeight()
        
        $(".fixed_chat_box .message_box").css("height", windowH - (messageBoxH + hdBoxH));
    }
    initailH()



    //客服回复 语句
    var msgArr = ["Hi~我是你的专属订花顾问，请问有什么可以帮您!", "您好呀！很高兴为您服务，请问有什么可以帮您！", "有问题，尽管提哦，我们随时为您服务！", "欢迎光临Hua.com花礼网，我是机器人客服小花，很高兴为您服务！我们提供很多精美的鲜花、蛋糕、礼品款式，适用于各类送礼场景，24小时均可自助下单哦~现在客服MM们都下班啦，如需咨询，请您选择留言，我们一定会在上班后第一时间回复您，谢谢~  "]

    $(".lt_box .user_name").html("对方正在输入...")
    var timeout = null //初始化定时器
    // 1 ：
    $(".fixed_btm_server_box").click(function () {
        var random = Math.floor(Math.random() * 4); //获取随机数

        $(".fixed_chat_box").fadeIn();  //显示聊天框

        timeout = setTimeout(function () {
            // 修改用户名内容
            $(".lt_box .user_name").html("暖暖")
            //定时结束后,创建dom元素，将客服回复显示出来；
            $(".message_box .others_message").append(createElem(getTime(), msgArr[random], "暖暖", "", ""));
        }, 1500);

    })

    // 2：
    $(".fixed_chat_box .triangle").click(function () {
        $(".fixed_chat_box").hide();
        no = false;
    })


    // 3：
    var lock = false;
    $(".option_btn_box .send_btn").click(function () {
        // 获取文本域中的内容
        var textMsg = $(".user_import_box").val();

        if (textMsg == "" || /^\s+$/.test(textMsg)) {
            //提示用户消息不能为空；
            $(".alert_empty").stop(true, true).show().animate({
                right: 40
            }, function () {
                $(this).animate({
                    right: 16
                })
            })

            //防止用户不间断的点击，造成开启多个定时器的bug
            if (lock) return;
            lock = true;
            setTimeout(function () {
                $(".alert_empty").fadeOut(); // 消息为空的元素隐藏
                lock = false;
            }, 2000)
        } else {
            // 4：
            $(".message_box .others_message").append(createElem(getTime(), $(".user_import_box").val(), "浩浩", " rt_tit", " rt_message"))
            $(".user_import_box").val("");

            //更新滚动条距离
            setScrollTop();
        }


    })
    // 3.1:
    $(".user_import_box")[0].onkeydown = function (e) {
        if (e.ctrlKey == 1 && e.keyCode == 13) {
            //按下ctrl 时 也按下了 enter，如果消息不为空，那么发送消息
            // 获取文本域中的内容
            var textMsg = $(".user_import_box").val();

            if (textMsg == "" || /^\s+$/.test(textMsg)) {
                //提示用户消息不能为空；
                $(".alert_empty").stop(true, true).show().animate({
                    right: 40
                }, function () {
                    $(this).animate({
                        right: 16
                    })
                })

                //防止用户不间断的点击，造成开启多个定时器的bug
                if (lock) return;
                lock = true;
                setTimeout(function () {
                    $(".alert_empty").fadeOut(); // 消息为空的元素隐藏
                    lock = false;
                }, 2000)
            } else {
                $(".message_box .others_message").append(createElem(getTime(), $(this).val(), "浩浩", " rt_tit", " rt_message"))
                $(".user_import_box").val("");

                //更新滚动条距离
                setScrollTop();
            }
        }
    }



    // 用于获取当前时间---》 时 ： 分
    function getTime() {
        var date = new Date();
        //格式化时间
        var hours = dateFormat(date.getHours());
        var minutes = dateFormat(date.getMinutes());

        return hours + ":" + minutes;
    }

    // 创建dom元素
    // 如果titClass,msgClass不传，请传入空的字符串
    function createElem(time, msg, uname, titClass, msgClass) {
        //创建节点
        var messageElem = $(` <h5 class="tit ${titClass}">${uname} &nbsp;<span class="time">${time}</span></h5>
                            <div class="clearfix">
                                <div class="show_message_box ${msgClass}">
                                    ${msg}
                                </div>
                            </div>`)
        return messageElem;
    }

    //每发一次消息都更新滚动距离顶部的距离
    function setScrollTop(){
        // 消息框滚动条的高度 - 消息框的可视高度 = 滚动条应该距离顶部得距离
        var scrollH = $(".message_box")[0].scrollHeight;
        var messageClientH = $(".message_box").outerHeight();
        var scrollTop = scrollH - messageClientH;
        $(".message_box").scrollTop(scrollTop);
    }

}
sendMessageServer();





/* 
    置顶
        1：当滚动条的top 值大于可视区的高度时显示含有置顶功能的节点
        2：点击 置顶按钮，置顶
*/
function toTopFn() {
    var lock = false;
    // fixed_rt_list_box 
    $(window).scroll(function () {

        if ($(window).scrollTop() > $(window).height()) {
            $(".fixed_rt_list_box").fadeIn();
        } else {
            $(".fixed_rt_list_box").fadeOut(function () {
                lock = false;
            });
        }
    })


    $("#toTop").click(function () {
        if (lock) return;
        lock = true;
        $("html,body").animate({
            scrollTop: 0
        })
    })
}
toTopFn();



/* 
    选择配送城市
        1: 用户选择了哪个城市，这个城市就会在标题上显示
        2： 如果右侧城市中，有与之对应的城市名称，那么高亮显示
*/
function optionCity() {
    $("#city_list_box>a").click(function () {
        // 清除之前的curt_city
        $(".location_hd .rt_nav>li>a").removeClass("curt_city");
        $(this).siblings().removeClass("curt_city")

        // 保存当前this
        var $curtThis = $(this);
        $(".user_option_city").html($(this).html())
        $(this).addClass("curt_city")

        // 2:
        $(".location_hd .rt_nav>li>a").each(function (index, item) {
            if ($(item).html() == $curtThis.html()) {
                $(item).addClass("curt_city")
            }

        })
    })

    //右侧导航中的城市选择后，菜单中的对应城市也高亮显示
    $(".cake_box .location_hd .rt_nav li").click(function () {
        var $curtThis = $(this);
        // 清除之前的curt_city
        $("#city_list_box>a").removeClass("curt_city");
        $(this).siblings().children("a").removeClass("curt_city");
        $(this).children("a").addClass("curt_city");

        //跟新地址
        $(".user_option_city").html($(this).children('a').html())

        $("#city_list_box>a").each(function (index, item) {
            if ($(item).html() == $curtThis.children("a").html()) {
                $(item).addClass("curt_city");
            }
        })
    })
}
optionCity();











/* 
头部购物车商品显示
    需求：
        1：鼠标移入购物车，显示购物车列表
            如果购物车内没有商品，那么显示没有商品的购物车列表，
            如果有，选择有商品的列表
        2：点击 - 可以减此商品，点击 + 可以增此加商品
            如果减到1后，用户还点击 - 那么就提示用户是否删除该商品
        3：点击 - 或者 + 时 计算出商品的总价    



//头部购物车结构
 <li>
    <img src="images/pic16.jpg" alt="" class="lt">
    <p class="shop_introduce lt">
        枝、大叶尤加利1
    </p>
    <div class="count_box lt">
        <i class="cut">-</i>
        <span class="count">2</span>
        <i class="add">+</i>
    </div>
    <span class="price rt">￥239</span>
</li>

*/

function showShopCart() {
    // 去 local storage 里面拿数据,渲染到顶部购物车中

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

            // 将结构添加到settlement元素前面
            //在这之前先删除settlement之前的所有数据
            $(str).insertBefore(".shop_list .settlement");
            // if($(".shop_list .settlement").siblings().length == 0) {

            // } else {
            //     $(".shop_list .settlement").siblings().remove();
            // }


        }
        // 初始化 购物车件数
        $(".head_box .shop_cart .num").html(totalShopCount())
        $(".head_box .settlement .shop_count").html(totalShopCount())
    }
    cretateElemF();








    // 1：
    $(".head_box .shop_cart").hover(function () {
        // 初始化购物车价格
        $(".head_box .settlement .total_price").html("￥" + totalPrice());


        //判断购物车中是否有数据
        if ($(this).find(".shop_count .num").html() == "0") {
            //等于0说明没有数据
            $(this).find(".empty_shop_list").show();
        } else {

            $(this).find(".shop_list").show();

        }
    }, function () {
        $(this).find(".empty_shop_list").hide();
        $(this).find(".shop_list").hide();
    })


    //2：加商品&减商品
    //3:点击 - 可以减此商品，点击 + 可以增此加商品
    //如果减到1后，用户还点击 - 那么就提示用户是否删除该商品
    $(".shop_list").on("click",".cut",cutShop);
    // $(".shop_list .count_box .cut").click(cutShop)
    function cutShop() {
        var shopData = {
            data: []
        }

        //获取localStorage中的数据
        var resultData = getLocalStorageData("shopData");
        shopData.data = resultData.data  //数据传递 [{},{}]

        // 获取当前元素img 的src路径
        var cImgSrc = $(this).parents("li:first").children("img").attr("src");

        // 获取到 商品件数
        var count = $(this).siblings(".count").html();
        count--;
        if (count < 1) { // 商品数量小于1时
            var lock = confirm("不能往下减啦亲，请问您是要删除此商品吗？")

            if (lock) {//用户选择 确定后 删除当前商品
                $(this).parents("li:first").remove();
                $(".head_box .shop_cart").mouseout();

                //如果用户选择删除，那么将删除掉localStorage上对应的数据
                shopData.data.forEach(function (item, index) {
                    if (cImgSrc == item.imgSrc) {
                        shopData.data.splice(index, 1);
                        setLocalStorageData("shopData", shopData);
                        console.log(getLocalStorageData("shopData"));
                    }
                })
                // 会报错
                //$.each(resultData.data, function (index, item) { 
                //     if(cImgSrc == item.imgSrc) {
                //         console.log(shopData.data.splice(index,1));
                //         console.log(shopData,item);
                //     }
                // });


            }

        } else {
            $(this).siblings(".count").html(count);

            //如果不小于0，那么跟新localStorage中的数据
            $.each(resultData.data, function (index, item) {
                if (cImgSrc == item.imgSrc) {
                    shopData.data[index].count = --item.count
                    setLocalStorageData("shopData", shopData);
                }
            });

        }


        //计算所有商品件数
        $(".head_box .shop_cart .num").html(totalShopCount())
        $(".head_box .settlement .shop_count").html(totalShopCount())

        //计算总价
        $(".head_box .settlement .total_price").html("￥" + totalPrice());

        //如果购物车中没有了商品，那么隐藏购物车列表，显示购物车为空的节点
        if (totalShopCount() == 0) {
            $(".head_box .shop_cart .shop_list").hide();
        }





    }



    //加
    $(".shop_list").on("click",".add", addShop);
    // $(".shop_list .count_box .add").click(addShop)

    function addShop() {
        var shopData = {
            data: []
        }
        //返回localStorage中的数据
        var resultData = getLocalStorageData("shopData");
        shopData.data = resultData.data; // 数据交换 [{},{}]


        //获取当前元素img 的src路径
        var cImgSrc = $(this).parents("li:first").children("img").attr("src");
        $.each(resultData.data, function (index, item) {
            //如果cImgSrc == 当前数据的src路径，那么就 ++当前数据的中的 count
            //然后再将数据存入localStorage
            if (cImgSrc == item.imgSrc) {
                item.count++;
                shopData.data[index] = item;
                setLocalStorageData("shopData", shopData);

            }
        });


        // 获取到 商品件数
        var count = $(this).siblings(".count").html();
        $(this).siblings(".count").html(++count);

        //计算所有商品件数
        $(".head_box .shop_cart .num").html(totalShopCount())
        $(".head_box .settlement .shop_count").html(totalShopCount())

        //计算总价
        $(".head_box .settlement .total_price").html("￥" + totalPrice());

    }






    //计算总价
    function totalPrice() {
        var countElem = $(".shop_list .count_box .count");
        if (countElem.length < 1) return 0;
        //用于存储价格
        var price = 0;

        //循环 将所有商品的价格计算出来
        $.each(countElem, function (index, item) {
            var cprice = +($(item).parent().siblings(".price").html().replace("￥", "")) * parseInt($(this).html())

            price += cprice;
        });
        return price;
    }


    // 计算出 所有商品件数
    function totalShopCount() {
        var countElem = $(".shop_list .count_box .count");
        if (countElem.length < 1) return 0;
        var count = 0;

        //循环 将所有商品的件数计算出来
        $.each(countElem, function (index, item) {
            count += +($(item).html());

        });
        return count;
    }
    return {
        totalShopCount: totalShopCount, // 计算总数量
        totalPrice: totalPrice, //计算总价
        cretateElemF: cretateElemF  //创建元素将商品渲染在购物车中
    }
}
var resultShopCartFn = showShopCart();






/* 
加入购物车
    需求：
        1：点击加入购物车，将购物车中的
            src ，商品介绍，价格 保存到local storage中
            
        2：当用户在一个商品中点击多次加入购物车，
            那么判断，当前src 是否已经添加过，如果添加过了那么就只加商品的个数

*/
function addCart() {
    // 用于存储商品数据
    var shopData = {
        data: []
    };

    var lock = false;
    //加入购物车按钮绑定事件
    $("#addCart .add_cart_box").click(addCurtData)

    // 用于存储当前商品的数据
    function addCurtData() {
        if (lock) return;
        lock = true; //防止用户重复点击

        // 将当前商品的src 赋予给将要执行动画的元素，
        $(this).siblings(".add_cart_animation").find("img").attr("src", $(this).siblings("a").find(".lazy").attr("src"));
        $(this).siblings(".add_cart_animation").show();

        setTimeout(function () {
            $("#addCart .add_cart_animation").hide();
            lock = false;
            // location.reload(); //刷新当前页面
        }, 1500)





        //保存当前this
        var $cThis = $(this);

        //点击后去local storage中查找是否含有当前商品，如果有，那么只用 ++ 当前商品数量
        // var local = window.localStorage.getItem("shopData");
        // var localData = JSON.parse(local);
        var localData = getLocalStorageData("shopData")


        //将数据迭代   数据：[imgSrc:xxx,count:1]
        if (localData && localData.data.length != 0) shopData.data = localData.data;

        {
            var locks = false;
            shopData.data.forEach(function (item, index) {
                // console.log(item.imgSrc == $cThis.siblings("a").find(".lazy").attr("src"));
                //如果加入的商品 数据中已经有了，那么只需要加此商品的 数量 count
                if (item.imgSrc == $cThis.siblings("a").find(".lazy").attr("src")) {
                    shopData.data[index].count = ++item.count; //增加商品数量

                    var data = JSON.stringify(shopData);
                    window.localStorage.setItem("shopData", data);  //数量增加后，将数据跟新

                    //重新渲染购物车
                    $(".shop_list .settlement").siblings().remove();
                    resultShopCartFn.cretateElemF();

                    locks = true;
                    return;
                }
            })
            if (locks) return; // 如果当前商品已经添加过了，那么就不用再执行下列 添加的程序了
        }




        //存储当前商品数据
        var obj = {
            imgSrc: $(this).siblings("a").find(".lazy").attr("src"),
            price: $(this).siblings("a").find(".price").html().replace("￥", ""),
            tit: $(this).siblings("a").find(".title").html(),
            count: 1
        }
        shopData.data.push(obj)
        var data = JSON.stringify(shopData);
        window.localStorage.setItem("shopData", data); //将数据添加到local storage

        //重新渲染购物车
        $(".shop_list .settlement").siblings().remove();
        resultShopCartFn.cretateElemF();

    }
}
addCart();
// localStorage.removeItem("shopData");


//获取localStorage中的数据
function getLocalStorageData(key) {
    var data = localStorage.getItem(key);
    return JSON.parse(data);
}
//存入localStorage
function setLocalStorageData(key, obj) {
    var data = JSON.stringify(obj);
    window.localStorage.setItem(key, data);
}





/* 关闭头部的福 */
$("#tp_fu_img").click(function () {
    $(this).hide();
})


/* 底部会动的花 */
function btmActiveFlower() {
    // $(".fixed_btm_server_box").mouseover(function() {
    //     $("#btm_hua_animate").addClass("btmActiveFlower")
    // })

    // $("#btm_hua_animate").click(function(){
    //     $(this).removeClass("btmActiveFlower")
    // })

    // 花朵跟着鼠标指针摆动
    $(window).mousemove(function (e) {
        e = e || window.event;
        var winWidth = $(this).width();
        var rotate = e.clientX / winWidth * 45 - 36;
        $("#btm_hua_animate").css("transform", "rotate(" + rotate + "deg");
    })

}
btmActiveFlower();




/* 遮罩广告 */
function bigMaskBox() {
    var interval = null;  //初始化定时器
    $("body,html").css("overflow-y", "hidden")

    $(".close_mask").click(function () {
        $(".ad_mask_box").slideUp(function () {
            $("body,html").css("overflow-y", "auto")
        });
    })


    //倒计时,倒计时结束关闭遮罩层
    setTimeout(function () {
        function time() {
            $(".time_box").show();
            var num = parseInt($(".time_box").html());
            interval = setInterval(function () {
                num--;
                if (num <= -1) {
                    clearInterval(interval);
                    $(".ad_mask_box").slideUp(function () {
                        $("body,html").css("overflow-y", "auto")
                    });
                } else {
                    $(".time_box").html(num + "s");
                }
            }, 1000)

        }
        time();
    }, 2000);


    // 当用户点击视频后停止倒计时并隐藏倒计时元素
    $(".mask_video_box").click(function () {
        clearInterval(interval);
        $(".time_box").hide();
    })
}
bigMaskBox()