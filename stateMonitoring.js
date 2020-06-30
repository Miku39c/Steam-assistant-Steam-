function testNetworkState(){
	if (window.navigator.onLine) {
	  alert('online');
	} else {
	  alert('offline');
	}
}

function validUrl(url) {
        var strRegex = /^(http|https):\/\//;
        var re = new RegExp(strRegex);
        return re.test(url);
}

function net(){
	window.addEventListener("offline", function(e) {
		alert("offline");
	});
	window.addEventListener("online", function(e) {
		alert("online");
	});
}

function NetTest(){
	if (window.navigator.onLine == true) {
		console.log("首次 -- 已连接")
		$.ajax({
			url: "https://www.baidu.com/",
			type: "POST",
			timeout: 1000,
			dataType: "json",
		}).complete(function (XMLHttpRequest) {
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status == 200) {
				$notification.show("已经可以正常上网", !0);
			} else {
				console.log("准备打开上网认证界面");
				window.open(e, i);
			}
		});
	} else {
		$notification.show("网络未连接--请检查网络");
	}
}

