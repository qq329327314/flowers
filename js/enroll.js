$(function () {
    $(".login-box>.login-tabs>#call-border").click(function () {
        $("#enroll-email").hide().siblings("#enroll-call").show()
    })
    $(".login-box>.login-tabs>#email-border").click(function () {
        $("#enroll-call").hide().siblings("#enroll-email").show()
    })


    // 手机注册验证
    function enrollCheck() {
        var reg = /^13[789]\d{8}$/;
        if (!reg.test($("#myenroll").val())) {
            $(".hz-01").html("电话以137/8/9开头11位号码");
            return false
        } else {
            $(".hz-01").html("输入正确");
            localStorage.user1 = document.getElementById("myenroll").value 
            return true
        }
    }
    $("#myenroll").blur(enrollCheck)


    //验证码
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - max + 9000)) + min;
    }
    var code = getRandom(1000, 9000)
    $(".enroll-get").click(function () {
        var num = 5;
        $(this).attr("disabled", "disabled");
        var timer = setInterval(function () {
            $(".enroll-get").val(num + "s之后重试");
            num--;
            if (num == 0) {
                clearInterval(timer);
                $(".enroll-get").val("重新获取验证码");
                $(".enroll-get").removeAttr("disabled");
            }
        }, 1000)
        alert(code);

        $(".enroll-note").blur(function () {

            if ($(".enroll-note").val() == code) {
                $(".hz-02").html("输入正确")
            } else {
                $(".hz-02").html("验证码不正确")
            }
        })
    })


    // 密码
    function pwdCheck() {
        var reg = /^[0-9a-zA-Z]{4,12}$/;
        if (!reg.test($("#enrollPwd").val())) {
            $(".hz-03").html("密码由4-12位数组，字母组成")
            return false
        } else {
            $(".hz-03").html("输入正确")
            return true
        }
    }
    $("#enrollPwd").blur(pwdCheck)

    // 邮箱注册
    function  emailCheck() {
        var reg = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
        if (!reg.test($("#enroll-email-1").val())) {
            $(".hz-04").html("邮箱格式不正确")
            return false
        } else {
            $(".hz-04").html("输入正确")
            localStorage.user1 = document.getElementById("enroll-email-1").value 
            return true
        }
    }
    $("#enroll-email-1").blur(emailCheck)


    // 邮箱密码
    function empwdCheck() {
        var reg = /^[0-9a-zA-Z]{4,12}$/;
        if (!reg.test($("#enroll-pwd-2").val())) {
            $(".hz-05").html("密码由4-12位数组，字母组成")
            return false
        } else {
            $(".hz-05").html("输入正确")
            return true
        }
    }
     $("#enroll-pwd-2").blur(empwdCheck)

    // 验证
    $("#enroll-call").submit(function(){
        var a = enrollCheck()
        var b = pwdCheck()
        if(enrollCheck() && pwdCheck()){
            return true
        }
        return false
    })

    $("#enroll-email").submit(function(){
        var c = emailCheck()
        var d = empwdCheck()
        if(emailCheck() && empwdCheck()){
            return true
        }
        return false
    })

    //焦点事件
    $("#searchv").blur(function () {
        $("#ullist").hide();
    }).focus(function () {
        $("#ullist").show();
    })
})
$(function () {
    var shpingCar = localStorage.shopData
    $("shop_list").html(shpingCar)
    console.log(shpingCar)
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