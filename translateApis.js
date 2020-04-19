//-------------------------------------------------------------------------------------------------------------
// 翻译API
/*-------------------------------------------------*/
var b = function(a, b) {
	for (var d = 0; d < b.length - 2; d += 3) {
		var c = b.charAt(d + 2),
			c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
			c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
		a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
	}
	return a
}
var tk = function(a, TKK) {
	for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
		var c = a.charCodeAt(f);
		128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(
			f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] =
			c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
	}
	a = h;
	for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
	a = b(a, "+-3^+b+-f");
	a ^= Number(e[1]) || 0;
	0 > a && (a = (a & 2147483647) + 2147483648);
	a %= 1E6;
	return a.toString() + "." + (a ^ h)
}
/*-------------------------------------------------*/
// 翻译语言
var auto = "auto"; //自动检测
var zhc = "zh-CN"; //中文简体
var zht = "zh-TW"; //中文繁体
var en = "en"; //英语
var jp = "ja"; //日语

var waitStatus = true; //等待状态
var waitStatus_cn = true; //等待状态
var returnData;
var returnData_cn;
async function GoogleTranslateRequest(origLanguage, newLanguage, strText) {
	waitStatus = true;

	var _tkk = "439786.2762026697";
	var _tk = tk(strText, _tkk);
	//console.log("_tk:",_tk);

	//需要拼接的url序列
	var baseURL = "https://translate.google.cn/translate_a/single?";
	var client = "client=" + "webapp";
	var sl = "&sl=" + origLanguage; //待翻译的原始语言      //默认为auto,即自动检测语言
	var tl = "&tl=" + newLanguage; //需要翻译成什么语言    //默认为zh-CN,即默认翻译为中文
	var hl = "&hl=" + zhc;
	var dt1 = "&dt=at&";
	var dt2 = "dt=bd&";
	var dt3 = "dt=ex&";
	var dt4 = "dt=ld&";
	var dt5 = "dt=md&";
	var dt6 = "dt=qca&";
	var dt7 = "dt=rw&";
	var dt8 = "dt=rm&";
	var dt9 = "dt=ss&";
	var dt0 = "dt=t&";
	var dt = "dt=gt&"; //del
	var otf = "otf=2&"; //1
	var ssel = "ssel=0&";
	var tsel = "tsel=4&"; //0
	var xid = "xid=1782844&";
	var kc = "kc=1&"; //8 //2
	var Tk = "tk=" + _tk;
	var q = "&q=" + encodeURI(strText);

	var requestURL = baseURL + client + sl + tl + hl + dt1 + dt2 + dt3 + dt4 + dt5 + dt6 + dt7 + dt8 + dt9 + dt0 + dt +
		otf +
		ssel + tsel + xid + kc + Tk + q;

	//console.log("requestURL: ",requestURL);

	GM_xmlhttpRequest({
		method: 'GET',
		url: requestURL,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
			//'Accept': 'application/atom+xml,application/xml,text/xml',
			//"Content-Type": "application/x-www-form-urlencoded",
		},
		onload: function(response) {
			if (response.status === 200) {
				console.log('请求成功!');
				var JSON_jsObj = JSON_processing_parsing_JsObj(response.responseText);
				//遍历[0][0]数组就可以取得翻译后的文本,原始数据,原始数据的拼音
				//[2]是检查出的语言
				//遍历[5]可以取得两种翻译,原始数据和原始数据的长度
				//遍历[8]可以得到原始语言和翻译语言
				//for (var i = 0; i < JSON_jsObj.length; i++) {
				//	for (var j = 0; j < JSON_jsObj[i].length; j++) {
				//		for (var k = 0; k < JSON_jsObj[i][j].length; k++) {
				//			
				//		}
				//	}
				//}
				var retData = "";
				for (var j = 0; j < JSON_jsObj[0].length; j++) {
					if (JSON_jsObj[0][j][0] != null) {
						retData += JSON_jsObj[0][j][0]; //组合每一句翻译
					}
				}
				returnData = retData; //存储数据
				//console.log('谷歌翻译:',retData);
				waitStatus = false; //不等待

				//console.log(response);
				//console.log(response.responseText);
				//if(response.responseText.indexOf('[[["') == 0) //是否是指定的数据格式
				//{
				//	var retData = response.responseText.slice(4,response.responseText.indexOf('","',4)); //提取翻译后的文本
				//	returnData = retData; //存储数据
				//	//console.log('谷歌翻译:',retData);
				//	waitStatus = false; //不等待
				//}
			} else {
				console.log('请求失败!');
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('请求错误!', err);
		}
	});

	while (waitStatus) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	return returnData;
	// jQuery.ajax({
	// 	url: URL,
	// 	type: "GET",
	// 	dataType: "jsonp", //指定服务器返回的数据类型
	// 	jsonp: "callback", //Jquery生成验证参数的名称
	// 	processData: false,
	// 	success: function (data) {
	// 		//var result = JSON.stringify(data); //json对象转成字符串
	// 		console.log("GET成功!",data);
	// 	},
	// 	error: function(XMLHttpRequest, textStatus, errorThrown) {
	// 	alert(XMLHttpRequest.status);
	// 	alert(XMLHttpRequest.readyState);
	// 	alert(textStatus);
	// 	}
	// });



	// jQuery.get(URL,function(response,status,xhr){
	// 	if (response.success === false) {

	// 		console.log("GET失败了!",response);
	// 	} else {

	// 		console.log("GET成功!",response);
	// 	}
	// },"json");


	// jQuery.post(URL, {
	// 	comment: newMgs,
	// 	count: 6,
	// 	sessionid: g_sessionID
	// }, function(response) {
	// 	if (response.success === false) {
	// 		console.log("留言失败了!");
	// 	} else {
	// 		console.log("成功发表评论于");
	// 	}
	// }).fail(function() {
	// 	console.log("无法发表评论于");
	// }).always(function() {
	// 	console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
	// });
}


async function CNTranslateRequest(newLanguage, strText) {
	waitStatus_cn = true;

	var baseURL = "https://brushes8.com/zhong-wen-jian-ti-fan-ti-zhuan-huan";

	GM_xmlhttpRequest({
		method: 'POST',
		url: baseURL,
		data: "data=" + encodeURI(strText) +
			"&dochineseconversion=" + "1" +
			"&variant=" + newLanguage +
			"&submit=" + encodeURI("开始转换 (Ctrl + Enter)"),
		headers: {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"Content-Type": "application/x-www-form-urlencoded", //非常重要
			"User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
		},
		onload: function(response) {
			if (response.status === 200) {
				console.log('请求成功!');
				var findStr = '<label for="response">转换结果: </label><br /><textarea id="response" rows="15" cols="150">';
				var retData = response.responseText.slice(response.responseText.lastIndexOf(findStr) + findStr.length);
				returnData_cn = retData; //存储数据
				//console.log('谷歌翻译:',retData);
				waitStatus_cn = false; //不等待
			} else {
				console.log('请求失败!', response);
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('请求错误!', err);
		}
	});

	while (waitStatus_cn) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	return returnData_cn;
}