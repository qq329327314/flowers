$(function () {
    // 创建购物车物品栏元素
    // function createCartul(nowIndex) {
    //     $cartul = "<ul value=" + nowIndex + "><li><i class='choice'></i></li>" +
    //         "<li><img src='" + goodsData[nowIndex].src + "'></li>" +
    //         "<li><a href='#'><span class='goodsName'>" + goodsData[nowIndex].dec + "</span>" +
    //         "<span class='feature'>顺丰陆运深圳发货</span></a></li>" +
    //         "<li class='marketPrice'>¥" + (goodsData[nowIndex].price + 100) + "</li><li class='price'>¥" + goodsData[nowIndex].price + "</li>" +
    //         "<li><button class='numSubtract'></button>" +
    //         "<input type='text' class='goodsNum' value=1 maxlength='3'/>" +
    //         "<button class='numAdd'></button></li>" +
    //         "<li class='cartHandle'><a href='#' class='goodsDelete'>删除</a>" +
    //         "<a href='#' class='collect'>移到我的收藏</a></li></ul>"
    //     return $cartul
    // }
    // 添加购物车物品栏
    function addcarul() {
        if (localStorage.getItem("shopData") != null && localStorage.getItem("shopData") != "") {
            shopData = JSON.parse(localStorage.getItem("shopData"))
            for (var i in shopData.data) {
                $addul = "<ul><li><i class='choice'></i></li>" +
                    "<li><img src='" + shopData.data[i].imgSrc + "'></li>" +
                    "<li><a href='#'><span class='goodsName'>" + shopData.data[i].tit + "</span>" +
                    "<span class='feature'>顺丰陆运深圳发货</span></a></li>" +
                    "<li class='marketPrice'>¥" + (parseInt(shopData.data[i].price) + 100) + "</li><li class='price'>¥" + shopData.data[i].price + "</li>" +
                    "<li><button class='numSubtract'></button>" +
                    "<input type='text' class='goodsNum' value=" + shopData.data[i].count + " maxlength='3'/>" +
                    "<button class='numAdd'></button></li>" +
                    "<li class='cartHandle'><a href='#' class='goodsDelete'>删除</a>" +
                    "<a href='#' class='collect'>移到我的收藏</a></li></ul>"
                $(".bd").append($addul)
            }
        } else {
            shopData = { data: [] }
            localStorage.setItem("shopData", JSON.stringify(shopData))
        }
    }
    addcarul()
    // 创建或读取各个物品栏的信息
    for (var i = 0; i < $(".bd>ul").length; i++) {
        if (localStorage.getItem('goods' + i) != null && localStorage.getItem('goods' + i) != "") {
            eval("goods" + i + "=localStorage.getItem('goods'+i).split(',')")
            eval("$('.bd>ul').eq(i).find('.goodsNum').val(goods" + i + "[1])")
        } else {
            eval("var goods" + i + "=[]")
            eval("goods" + i + "[0]=" + "'true'")
        }
    }
    // 购物车删除功能
    $(".goodsDelete").click(function () {
        choice = confirm("确定要删除吗")
        if (choice) {
            thisindex = $(this).parent().parent().index()
            for (var i in shopData.data) {
                if ($(this).parent().parent().find(".goodsName").html() == shopData.data[i].tit) {
                    shopData.data.splice(i, 1)
                }
            }
            localStorage.setItem("shopData", data = JSON.stringify(shopData))
            $(this).parent().parent().remove()
            localStorage.removeItem("goods" + thisindex)
            allprice()
        }
    })
    // 购物车增添/减少物品数量
    $(".numAdd").click(function () {
        console.log($(this).prev().val())
        num = $(this).prev().val()
        num++
        $(this).prev().val(num)
        allprice()
    })
    $(".numSubtract").click(function () {
        if ($(this).next().val() > 1) {
            num = $(this).next().val()
            num--
            $(this).next().val(num)
            allprice()
        }
    })
    $(".goodsNum").on("change", function () {
        allprice()
    })
    // 购物车计算功能
    function allprice() {
        var goodsprice = []
        var num = []
        var allprice = 0
        if ($(".bd>ul").length) {
            $("#empty").hide()
            $(".cartPanel").show()
            $(".checkout").show()
            for (var i = 0; i < $(".bd>ul").length; i++) {
                open = eval("goods" + i + "[0]")
                num = $(".bd>ul").eq(i).find(".goodsNum").val()
                eval("goods" + i + "[1]=" + num)
                shopData.data[i].count = num
                if (open == "true") {
                    goodsprice[i] = $(".bd>ul").eq(i).find(".price").html().replace("¥", "") * num
                    allprice += goodsprice[i]
                    $(".bd>ul").eq(i).find(".choice").css("background-image", "url(images/Showchat/Showchat_ico_checkout.png)")
                } else {
                    $(".bd>ul").eq(i).find(".choice").css("background-image", "url(images/Showchat/Showchat_ico_unchecked.png)")
                }
                localStorage.setItem("shopData", data = JSON.stringify(shopData))
                // localStorage.setItem("goods" + i, eval("goods" + i))
                $(".allHandle").html("¥" + allprice)
            }
        } else {
            $(".cartPanel").hide()
            $(".checkout").hide()
            $("#empty").show()
        }
    }
    allprice()
    // 购物车选中功能
    $(".choice").on("click", function () {
        var thisindex = $(this).parent().parent().index()
        // console.log(localStorage.getItem("goods"+thisindex).split(",")
        open = eval("goods" + thisindex + "[0]")
        if (open == "false") {
            $(this).css("background-image", "url(images/Showchat/Showchat_ico_checkout.png)")
            eval("goods" + thisindex + "[0]='true'")
            localStorage.setItem("goods" + thisindex, eval("goods" + thisindex))
        } else {
            $(this).css("background-image", "url(images/Showchat/Showchat_ico_unchecked.png)")
            eval("goods" + thisindex + "[0]='false'")
            localStorage.setItem("goods" + thisindex, eval("goods" + thisindex))
        }
        allprice()
    })
    // 创建加入购物车物品栏
    function creategoodsList(goodsIndex) {
        $ligoodsList = $("<li class='goodsList'>" +
            "<img src='" + goodsData[goodsIndex].src + "' ><br>" +
            "<a href='#'>" + goodsData[goodsIndex].dec + "</a>" +
            "<p class='price'>￥" + goodsData[goodsIndex].price + "</p>" +
            "<button class='goodsbtn' type='button' value=" + goodsIndex + ">加入购物车</button></li>")
        return $ligoodsList
    }
    for (var i = 0; i < 6; i++) {
        $addli = creategoodsList(i)
        $(".panelist").eq(0).append($addli)
    }
    for (var i = 6; i < 12; i++) {
        $addli = creategoodsList(i)
        $(".panelist").eq(1).append($addli)
    }
    // 点击加入购物车时将物品加入购物车
    $(".goodsbtn").click(function () {
        if (shopData.data.length == 0) {
            open = true
        }
        for (var i in shopData.data) {
            if ($(this).parent().find("a").html() == shopData.data[i].tit) {
                var open = false
                break
            } else {
                var open = true
            }
        }
        if (open) {
            var obj = {
                imgSrc: $(this).parent().find("img").attr("src"),
                price: $(this).parent().find(".price").html().replace("￥", ""),
                tit: $(this).parent().find("a").html(),
                count: 1
            }
            shopData.data.push(obj)
            localStorage.setItem("shopData", data = JSON.stringify(shopData))
        }
        location = "showcart.html"
    })

    $(".next").click(function () {
        if ($(".panelist").css("left") == "-180px") {
            $(".panelist").animate({ left: 0 })
        } else {
            $(".panelist").animate({ left: -180 })
        }
    })
    $(".prev").click(function () {
        if ($(".panelist").css("left") == "0px") {
            $(".panelist").animate({ left: -180 })
        } else {
            $(".panelist").animate({ left: 0 })
        }
    })

    $(".goodsTitleBtn").click(function () {
        $(".goodsTitleBtn").removeClass("clickBtn")
        $(this).addClass("clickBtn")
        btnindex = $(this).index()
        $(".panelist").fadeOut(300)
        setTimeout(function () { $(".panelist").eq(btnindex).fadeIn(300) }, 300)

    })

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
    // 购物车进入结算界面
    $(".checkoutBtn").click(function () {
        for (var i = 0; i < $(".bd>ul").length; i++) {
            if (eval("goods" + i + "[0]") == "true") {
                var open = false
                location = "sendinfo.html"

            } else {
                var open = true
            }
        }
        if (open) {
            alert("您还没有选择要购买的商品")
        }
    })



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

                $(".head_box .shop_list").prepend(str)
            }
        }
        cretateElemF();



        // 初始化 购物车件数
        $(".head_box .shop_cart .num").html(totalShopCount())
        $(".head_box .settlement .shop_count").html(totalShopCount())




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
        $(".shop_list .count_box .cut").click(function () {
            // 获取到 商品件数
            var count = $(this).siblings(".count").html();
            count--;
            if (count < 1) { // 商品数量小于1时
                var lock = confirm("不能往下减啦亲，请问您是要删除此商品吗？")
                if (lock) {//用户选择 确定后 删除当前商品
                    $(this).parents("li:first").remove();
                    $(".head_box .shop_cart").mouseout();
                }

            } else {
                $(this).siblings(".count").html(count);
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





        })

        //加
        $(".shop_list .count_box .add").click(function () {
            var shopData = {
                data: []
            }
            var resultData = getLocalStorageData("shopData")

            shopData.data = resultData.data;
            
            //获取当前img 的 src
            var cImgSrc = $(this).parents("li").find("img").attr("src");
            getgoodscount()
            resultData.data.forEach(function (item, index) {
                if (cImgSrc == item.imgSrc) {
                    shopData.data[index].count++

                    console.log(shopData);
                    setLocalStorageData("shopData", shopData)
                    console.log(getLocalStorageData("shopData"));
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

        })






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
    }
    showShopCart();
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
    function getgoodscount() {
        for (var i in shopData.data) {
            console.log(getLocalStorageData("shopData"))
        }
    }
    
})

