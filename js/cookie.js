// 封装添加cookie
function setCookie(name, value, iDay) { //名字,值,过期时间
	var eDate = new Date() //获取时间
	eDate.setDate(eDate.getDate() + iDay) //时间+过期时间
	document.cookie = name + "=" + value + ";expires=" + eDate //"名字=值;expires="+过期时间;
}

// 封装删除cookie
function removeCookie(name) {
	setCookie(name, "", -1)
}

// 封装查询cookis
function getCookie(name) {
	var str = document.cookie //获取字符串
	//name1=zhangsan; name2=李四
	var arr = str.split("; ") //根据"; "分割为数组
	//["name1=zhangsan", "name2=李四"]
	for (var i in arr) {
		arr2 = arr[i].split("=") //根据"="分割为数组
		//["name1","zhangsan"]
		if (arr2[0] == name) {
			return arr2[1]
		}
	}
}
