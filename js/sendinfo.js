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
                                <span class="count">${item.count}</span>
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

// 点击提示的关闭按钮可关闭提示
$(".iconfont-emptytext").click(function () {
    $(this).parent().hide()
})

// 将商品信息输入至页面
function addcarul() {
    shopData = JSON.parse(localStorage.getItem("shopData"))
    for (var i in shopData.data) {
        $addli = "<li class=clear><img src='"+shopData.data[i].imgSrc+"' alt><a href>"+
            "<p>"+shopData.data[i].tit+"</p>"+
            "<p>￥"+shopData.data[i].price+"<span>x"+shopData.data[i].count+"</span> </p></a></li>"
            $(".showcart").append($addli)
    }
}
addcarul()

var allcount=0
var allprice=0
for(var i in shopData.data){
    // 将商品数量输入至页面
    allcount+=parseInt(shopData.data[i].count)
    $(".order-pay").find("#count").html(allcount)
    // 将商品总价格输入至页面
    allprice+= shopData.data[i].price*shopData.data[i].count
    $(".allprice").html("￥"+allprice)
}

// 检测文字框输入上限
$("textarea").on("input",function(){
    $(".message-limit span").html($("textarea").val().length)
})

// 切换贺卡留言
$(".message-right-nav li").click(function(){
    $(".message-right-nav li").removeClass("active")
    $(this).addClass("active")
    $(".message-right-section").removeClass("active")
    $(".message-right-section").eq($(this).index()).addClass("active")
})
// 点击留言添加至文字框
$(".message-right-section").find("a").click(function(){
    $("textarea").html($(this).html())
    $(".message-limit span").html($("textarea").val().length)
})
