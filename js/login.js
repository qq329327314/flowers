$(function () {
    // 账号登录
    $(".login-box>.login-tabs>#login-border").click(function () {
        $("#call-show").hide().siblings("#loginShow").show()
        $("#wxShow").hide()
        // console.log(1)
    })


    // 微信扫码登录
    $("#login-wxBorder").click(function () {
        $("#wxShow").show()
        $(".login-box>.login-call>.call").parent("form").hide().siblings(".login-call").hide()
    })


    // 手机验证登录
    $(".login-box>.login-call>.call").click(function () {
        //  console.log($(this).index());
        $(this).parent("form").hide().siblings(".login-call").show()

    })



    // 登录账号，密码，手机号码验证
    // 邮箱，手机
    function usercheck() {
        var reg1 = /^13[789]\d{8}$/;
        var reg2 = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
        if (!(reg1.test($("#user").val()) || reg2.test($("#user").val()))) {
            $(".hint-user").html("电话以137/8/9开头，或使用邮箱");                  
            return false
        } else {

            $(".hint-user").html("输入正确");
            //  localStorage.user1 = document.getElementById("user").value 
            return true
        }
    }
    $("#user").blur(usercheck)



    // 密码
    function pwdCheck() {
        var reg = /^[0-9a-zA-Z]{4,12}$/;
        if (!reg.test($("#userPwd").val())) {
            $(".hint-pwd").html("密码由4-12位数组，字母组成")
            return false
        } else {
            $(".hint-pwd").html("输入正确")
            return true
        }
    }
    $("#userPwd").blur(pwdCheck)

    // 手机验证码登录
    function callCheck() {
        var reg = /^13[789]\d{8}$/;
        if (!reg.test($("#mycall").val())) {
            $(".call-user").html("电话以137/8/9开头");
            
            return false
        } else {
            $(".call-user").html("输入正确");           
            // localStorage.user1 = document.getElementById("mycall").value 

            return true
        }
    }
    $("#mycall").blur(callCheck)

    // 验证码倒计时
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - max + 9000)) + min;
    }


    $(".call-btn").click(function () {
        var code = getRandom(1000, 9000)
        var num = 5;
        $(this).attr("disabled", "disabled");
        var timer = setInterval(function () {
            $(".call-btn").val(num + "s之后重试");
            num--;
            if (num == 0) {
                clearInterval(timer);
                $(".call-btn").val("重新获取验证码");
                $(".call-btn").removeAttr("disabled");
            }
        }, 1000)
        alert(code);
        $("#call-code").blur(function () {
            if ($("#call-code").val() == code) {
                $(".call-pwd").html("输入正确")             
            } else {
                $(".call-pwd").html("验证码不正确")          
            }
        })
    })


    //焦点事件
    $("#searchv").blur(function () {
        $("#ullist").hide();
    }).focus(function () {
        $("#ullist").show();
    })


    // 获取本地储存数据
    // $(".login-btn").click(function () {      
        
    //   var bdName = localStorage.user1
    //     if($("#user")==bdName){
    //       alert(1)
            
    //    }
    // })


    // 登录验证
    // function dologin(){
    //     if($("#user").blur()&& $("#userPwd").blur()&&  $("#mycall").blur()){
    //         return true
    //     }
    //     return false
    // }
    // dologin()


    // 登录验证
    $("#loginShow").submit(function () {
        var a = usercheck()
        var b = pwdCheck()
        if (usercheck()&&pwdCheck()) {      
            return true   
        }
        // if ($("#user").blur() && $("#userPwd").blur() && $("#mycall").blur()) {
        //     return true
        // } 
        
        return false  
    })

    $("#call-show").submit(function(){
        var c = callCheck()
        if(callCheck()){
            return true
        }
        return false
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