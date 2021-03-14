$(function () {
    // console.log(1);
    // $("#main-top .show #showbuttom").find("span").on("mouseenter",function(){
    //     // var num=$(this).index();
    //     console.log(num);
    // },false)



    // 点击移入事件
    $('#showbuttom>span').mouseenter(function () {
        var num = $(this).index();
        // console.log(num);
        $(".showbig").children("ul").css("left", num * (-456) + 'px');
    })

    $("#hover-code").hover(function () {
        // console.log(1);
        $(this).parent('div').siblings('.codedb').show();
    }, function () {
        $(this).parent('div').siblings('.codedb').hide();
    })

    $('#touch-hid').click(function () {
        // console.log(1);
        var flag = $(this).parent('li').attr("flag");
        if (flag == 'true') {
            $(this).parent('li').animate({
                overflow: 'none',
                height: '165px'
            }, 1000).css("white-space", "normal");
            $(this).animate({
                top: '150px',

            }, 1000).css("transform", 'rotate(180deg)');
            $(this).parent('li').attr("flag", "false");
        } else {
            $(this).parent('li').animate({
                overflow: 'hidden',
                height: '20px'
            }).css("white-space", "nowrap");
            $(this).animate({
                top: '0px'
            }).css("transform", 'rotate(0deg)');
            $(this).parent('li').attr("flag", "true");
        }

    })

    $('.checkbox').click(function(){
        var dom=$(this).attr("class");
        console.log(dom.indexOf("checked-box"));
        if(dom.indexOf("checked-box")==-1){
            $(this).toggleClass(' checked-box').children("span").toggleClass('checked-img').end().siblings('.checkbox').removeClass('checked-box').children("span").removeClass('checked-img');
            // $(this).siblings('.checkbox').removeClass('checked-box').children("span").removeClass('checked-img');
        }
        
        
    })
    var city={
        "北京":['朝阳区','海淀区','西城区','东城区','丰台区','昌平区','大兴区','通州区','顺义区','石景山区','房山区','门头沟区','怀柔区','密云区','平谷区','延庆区','其他'],
        "上海":['浦东新区','闵行区','徐汇区','静安区','长宁区','黄浦区','普陀区','杨浦区','宝山区','松江区','虹口区','嘉定区','青浦区','奉贤区','金山区','崇明区','其他'],
        "广东":['深圳市','广州市','东莞市','佛山市','珠海市','惠州市','中山市','江门市','汕头市','湛江市','清远市','肇庆市','茂名市','揭阳市','韶关市','梅州市','河源市','汕尾市','阳江市','潮州市','云浮市'],
        "江苏":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "浙江":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "四川":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "山东":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "湖北":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "湖南":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "福建":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "陕西":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "河南":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "河北":['','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
        "重庆":['','','','','','','','','','','','','','','','','','','','','','','','','','','','','']

    }
    var city1=["北京","上海","广东","江苏","浙江","四川","山东","湖北","湖南",'福建',"陕西",'河南','河北','重庆','辽宁','安徽','天津','江西','黑龙江','山西','贵州','广西','云南','新疆','吉林','甘肃','内蒙古','海南','宁夏','青海','西藏','香港','台湾','澳门'];
    var province=[
        {"0":'朝阳区','1':'海淀区','2':'西城区','3':'东城区','4':'丰台区','5':'昌平区','6':'大兴区','7':'通州区','8':'顺义区','9':'石景山区','10':'房山区','11':'门头沟区',"12":'怀柔区','13':'密云区','14':'平谷区','15':'延庆区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'1浦东新区','1':'1闵行区','2':'1徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'},
        {'0':'浦东新区','1':'闵行区','2':'徐汇区',"3":'静安区','4':'长宁区','5':'黄浦区','6':'普陀区',"7":'杨浦区','8':'宝山区','9':'松江区','10':'虹口区','11':'嘉定区','12':'青浦区','13':'奉贤区','14':'金山区','15':'崇明区','16':'其他'}
    ]
    var flag=0;
    var firstName=-1;
    // var twoName=-1;
    $('.touch-show').children('.current').children('span').click(function(){
        console.log(8);
        if(flag==0){
            firstName=$(this).index();
        // console.log(firstName);
        // console.log(showcity(firstName));
            $(this).parent('li').next().append(showcity(firstName));
            $(this).parent('li').removeClass('current').addClass('hide').next().removeClass().addClass('current');
            var num=$('.touch-show').find('.current').index();
            $('.touch').children('li').eq(num).removeClass().addClass('current').end().eq(num-1).removeClass();
            $('.touch').children('li').eq(num-1).html($(this).html());
            flag++;
        }
        // else if(flag==1){
        //     console.log(1);
        //     return
            // $('.touch-show').children('.current').children('span').click(function(){
                // console.log(1);
                // twoName=$(this).index();
                // $(this).parent('li').parent('ul').parent(".one-layer-two-in").parent('.on-layer-add').children(".one-layer-two-out").html(city1[firstName]+$(this).html());
            // })
            
        // }
        
        
    })
    $('.touch').children('li').eq(0).click(function(){
        if(flag==1){
            console.log(6);
            $('.touch-show').children('li').eq(1).html('');
            // 用html清空
            $(this).addClass('current').siblings('li').removeClass().addClass('hide');
            $('.touch-show').children('li').eq(0).removeClass().addClass('current').siblings('li').removeClass().addClass('hide');
            flag=0;
        }
    })




    


    // if(flag==1){
    //     console.log(1);
    // }
    // 点击中的点击,需要点两下
    $('.on-layer-add>.one-layer-two-in>.touch-show>li').eq(1).click(function(){
        // console.log($(this).children('span').index());
        // alert('再次点击');
        // console.log($(this).children('span'));
        $(this).children('span').click(function(){
            // console.log($(this).index());
            $('.touch').children('li').eq(1).html($(this).html());
            $(".one-layer-two-out>i").html(city1[firstName]+$(this).html());
            
            console.log(10);
        })
    })
    



    // if(flag==true){
    //     var num=$('.touch-show').find('.current').index();
    //     $('.touch').children('li').eq(num).removeClass().addClass('current').eq(num-1).removeClass();
    // }
    function showcity(str){
        if(str>=0){
            // console.log(province[str][0]);
            var dom='';
            for(var i in province[str]){
                var domin='<span>'+province[str][i]+'</span>';
                dom+=domin;
            }
            return dom
        }
        

    }

    $(".on-layer-add").hover(function(){
        $(this).children('.one-layer-two-out').children('#touch-icon').css("transform","rotate(180deg)");
        // if(showcity()!=undefined){
        //     var item=$(this).children('.one-layer-two-in').children('.touch').find('li');
        //     console.log(item);
        // }
        $(this).children('.one-layer-two-in').show();
        

    },function(){
        $(this).children('.one-layer-two-out').children('#touch-icon').css("transform","rotate(0deg)");
        $(this).children('.one-layer-two-in').hide();
    })






    // 瀑布流
    function domImg(n) {
        $dom = $('<img src="images/details-by2020060 (' + n + ').jpg" alt="">');
        return $dom
    }
    var num = 0;
    var rfh = $('#right-fixed').offset().top;
    var nfh = $('#nav-bar').offset().top;
    $(window).on("scroll", function () {
        var windh = document.documentElement.clientHeight || document.body.clientHeight;
        var changeH = document.documentElement.scrollTop || document.body.scrollTop;
        var pblH = $("#main-inner-img").children("img").eq(-1).offset().top + $("#main-inner-img").children("img").eq(-1).outerHeight();

        // console.log(windh,changeH,pblH);
        if (changeH > rfh) {
            $('#right-fixed').css({
                position: 'fixed',
                right: 'calc((100vw - 1200px)/2 - 50px)',
                top: '30px'
            })
        } else {
            $('#right-fixed').css({
                position: 'absolute',
                right: '-64px',
                top: "-49px"
            })
        }
        if (changeH > nfh) {
            $("#nav-bar").addClass(" bar-fixed ").find('.hide-price').css("display","block");
            
        } else {
            $('#nav-bar').removeClass("bar-fixed").find('.hide-price').css("display","none");
        }
        if ((windh + changeH) >= pblH) {
            num++;
            if (num > 15) return;
            $("#main-inner-img").append(domImg(num));
        }

    })
    // 回到顶部
    $("#right-fixed li:eq(-1)").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 1000)
    })

    $("#right-fixed li:eq(0),#right-fixed li:eq(3)").mouseenter(function () {
        $(this).find("div").show();
    }).mouseleave(function () {
        $(this).find("div").hide();
    })

    $("#right-fixed li:eq(0)").find("div").show();
    setTimeout(function () {
        $("#right-fixed li:eq(0)").find("div").fadeOut();
    }, 4000)


    // 懒加载事件
    $("img.lazy").lazyload({
        effect:"fadeIn"
    })
    // fullpage插件
    // $('#fullpage').fullpage({
    //     autoScrolling:false,
    //     // scrollBar:true,

    //     paddingTop:"10px",
    //     paddingBottom:'10px'
    // });
    // $.fn.fullpage.destroy();
    $('#nav-bar>li').click(function(){
        // $.fn.fullpage.silentMoveTo($(this).index()+1);
        console.log($(this).index()+1);
        touchShow($(this));
        // $(this).css('font-size',"16px").siblings('li').css('font-size','13px');
        // $(this).find('div').addClass(' li-hover').end().siblings('li').find('div').removeClass();
        // var arr=new Array;
        // for(var i=0;i<$(this).index();i++){
        //     arr[0]=i;
        // }
        // $('#fullpage').children('.section').eq(arr).hide();
        
        // $.fn.fullpage.destroy();
    })
    function touchShow(dom){
        dom.css({'font-size':"15px",'font-weight':'bold'}).siblings('li').css({'font-size':'15px','font-weight':'300'});
        dom.find('div').addClass(' li-hover').end().siblings('li').find('div').removeClass();
        var arr=new Array;
        for(var i=0;i<dom.index();i++){
            $('#fullpage').children('.section').eq(i).hide();

        }
        for(var j=dom.index();j<4;j++){
            $('#fullpage').children('.section').eq(j).show();
        }
        console.log(arr);
    }
    // $('#fullpage').children('.section').eq(3).show()
    // $('#fullpage').children('.section').eq(2).hide()
    // $('#fullpage').children('.section').eq(1).hide()
    // $('#fullpage').children('.section').eq(0).hide()

    $('.save-touch-img>a').mouseenter(function(){
        // console.log($(this).parent('li').index());
        $('.save-show').children('img').eq($(this).parent('li').index()).show().siblings('img').hide();
        $(this).parent('li').removeClass('save-show').addClass('save-show').siblings('li').removeClass('save-show');
    })

    // 购物车
    window.localStorage.setItem('nume',0);
    $('.shop_cart').hover(function(){
        if(window.localStorage.getItem('nume')==''||window.localStorage.getItem('nume')==0){
            $(this).find('.empty_shop_list').show();
        }else{
            $(this).find('.shop_list').show();
        }
        
    },function(){
        $(this).find('ul').hide();
    })
    
    function joinshow(){
        if(window.localStorage.getItem('nume')==''||window.localStorage.getItem('nume')==0){
            window.localStorage.setItem('nume',$('.count').val()+1);
            console.log($('.shop_count').html());
            $('#shop-number').html(window.localStorage.getItem('nume')).show();
            var n=$('.count').val();
            n++;
            $('.count').val(n);
        }else{
            alert('已存在购物车中，去看看吧');
        }
    }

    $('.radius-boxA').click(function(){
       joinshow();
        
    })
    
    $('.add').click(function(){
        addnumb();
    })
    $('.cut').click(function(){
        cutnumb();
    })
    function addnumb(){
        var n=$('.count').val();
        n++;
        $('.count').val(n);
        window.localStorage.setItem('nume',n);
    }
    function cutnumb(){
        var n=$('.count').val();
        if(n==0){
            $('.count').val(0);
            window.localStorage.setItem('nume',n);
            return
        }
        n--;
        $('.count').val(n);
        window.localStorage.setItem('nume',n);
    }
    $('.count').on("input",function(){
        window.localStorage.setItem('nume',$(this).val());
        if($(this).val()==0){
            $(this).parent('div').parent('li').parent('ul').hide().siblings('.empty_shop_list').show();
            window.localStorage.setItem('nume',0);
        }
        console.log(window.localStorage.getItem('nume'));
        $('.shop_count').html(window.localStorage.getItem('nume'));
        $('.total_price').html('¥'+window.localStorage.getItem('nume')*298);
        if(window.localStorage.getItem('nume')==null){
            $('#shop-number').html(window.localStorage.getItem('nume')).hide();
        }else{
            $('#shop-number').html(window.localStorage.getItem('nume')).show();
        }
    })
    $('.count').on('change',function(){
        console.log(5);
        window.localStorage.setItem('nume',$(this).val());
        $('.shop_count').html(window.localStorage.getItem('nume'));
        $('.total_price').html('¥'+window.localStorage.getItem('nume')*298);
    })





    // 异步
    $('#searchBox').on('input',function(){
        getData();
    })
    function getData(){
        // console.log(1232132);
        $.ajax({
            url: 'https://suggest.taobao.com/sug',
            async:true,
            type:'get',
            data: {
                code: 'utf-8',
                q: $("#searchBox").val(),

            },
            dataType: "jsonp",
            jsonp: 'callback',
            jsonpCallback: 'myfun',
            success: function (data) {
                if($('#showBox').children.length!=0){
                $('#showBox').empty();
                }
                var str = '';
                for (var i in data.result) {
                    // console.log(data.result[i][0]);
                    str += '<li>' + data.result[i][0] + '</li>';
                    if(i>5){
                        break
                    }
                }

                $('#showBox').append(str);
            },
            error:function(){
                // alert('出错');
            }
        })
    }

    //视频
        var video = document.getElementById('video');
        var playBar = document.getElementById('progress-bar');
        var myplay = document.getElementById('play');
        var mypause = document.getElementById('pause');
        var myjdbar = document.getElementById('jd-bar');
        var mytime = document.getElementById('current-time');
        var alltime = document.getElementById('all-time');
        var myfull = document.getElementById('full');
        var myvolume = document.getElementById('volume-bar');
        var myyl = document.getElementById('yl-bar');
        video.addEventListener('canplay', function () {


            // 播放暂停
            myplay.onclick = function () {
                video.play();
                if (video.play) {
                    this.style.cssText='display:none;';
                    mypause.style.display='block';
                }
            }
            mypause.onclick = function () {
                video.pause();
                if (video.pause) {
                    this.style.cssText='display:none;';
                    myplay.style.display='block';
                }
            }
            // 播放器进度条


            alltime.innerHTML=timeShow(video.duration);
            video.addEventListener('timeupdate', function () {
                // console.log(video.currentTime);
                mytime.innerHTML=timeShow(video.currentTime);
                var percent = video.currentTime / video.duration;
                console.log(percent);
                var num = percent * 100 + '%';
                myjdbar.style.width=num;

                if (video.paused) {
                    myplay.style.display='block';
                    mypause.style.display='none';
                } else {
                    myplay.style.display='none';
                    mypause.style.display='block';
                }




            }, false)

            // $('#progress-bar').on('click',function(){
            //     // e=e||event;
            //     console.log($(this).offset.left);
            // })
            // 点击播放条
            playBar.addEventListener('click', function (e) {
                e = e || window.Event;
                // e.stopPropagation ? e.stopPropagation() :e.cancelBubble=true;
                var m = e.offsetX / playBar.offsetWidth;
                var num = m * 100 + '%';
                myjdbar.style.width=num;
                video.currentTime = m * video.duration;

                // console.log(e.offsetX,playBar.offsetWidth,m);
            }, false)
            // 全屏
            myfull.addEventListener('click',function(){
                video.webkitRequestFullScreen();
            },false)
            // 音量设置
            myvolume.addEventListener("click",function(e){
                e = e || window.Event;
                // e.stopPropagation ? e.stopPropagation() :e.cancelBubble=true;
                var m = e.offsetX / myvolume.offsetWidth;
                if(m>=0){
                    video.volume=m;
                }else{
                    video.volume=0;
                }
                
                var num = m * 100 + '%';
                myyl.style.width=num;
            },false)


        }, false)
        function timeShow(time) {
            // console.log(video.duration);
            var min = parseInt(time / 60);
            var sec = parseInt(time % 60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            // console.log(min + ':' + sec);
            return min + ':' + sec
        }

}) 

