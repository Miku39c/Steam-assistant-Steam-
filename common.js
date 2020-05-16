/**
 * common.js
 * @file 存储通用的一些库函数代码
 */

//-------------------------------------------------------------------------------------------------------------
// 实用函数集

/**
 * 使线程进入休眠模式 (伪同步，会阻塞当前线程，配合 async 和 await 使用)
 * @summary 使线程进入休眠模式
 * @async
 * @param {UINT} ms 毫秒数
 * @example
 * await sleep(1000); //使当前线程等待1s后继续执行
 */
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * 判断页面是移动端还是pc端，采用浏览器标识进行判断
 * @summary 判断页面是移动端还是pc端
 * @return {Boolean} 如果是移动端返回true, 如果是pc端返回false
 */
function opinion() {
	if ((navigator.userAgent.match(
			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		))) {
		return true; //移动端
	} else {
		return false; //pc端
	}
}
/**
 * 判断是否是非负整数，采用正则表达式进行判断
 * @summary 判断是否是非负整数
 * @param {int} val 待判断的整数
 * @return {Boolean} 是则返回true，否则返回false
 */
function isIntNum(val){ //
    var regPos = /^\d+$/; // 非负整数
    if(regPos.test(val)){
        return true;
    }else{
        return false;
    }
}
/**
 * 安全检测并解析JSON字符串到JSON对象(可能在未来会被删除)
 * @summary 解析JSON字符串
 * @param {String} jsonText JSON字符串
 * @return {Object} JSON对象
 */
function JSON_processing_parsing_JsObj(jsonText){ //
	var JSON_jsObj;
	if (jsonText == "")
		return;
	
	//console.log("待处理数据:");
	//console.log(jsonText);
	JSON_jsObj = JSON.parse(jsonText);
	console.log("解析后数据:");
	console.log(JSON_jsObj);
	return JSON_jsObj;
}
/**
 * 向页面动态添加新的CSS样式, 位于<head>标签最后面新的<style>标签里
 * @summary 添加新的CSS样式
 * @param {String} id 新的<style>标签id, 可用于修改和删除等
 * @param {String} newStyle 待添加的CSS样式字符串
 */
function addNewStyle(id, newStyle) {
	var styleElement = document.getElementById(id);

	if (!styleElement) {
		styleElement = document.createElement('style');
		styleElement.type = 'text/css';
		styleElement.id = id;
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newStyle));
}
/**
 * 向页面动态添加新的JS脚本, 位于<head>标签最后面新的<script>标签里
 * @summary 添加新的JS脚本
 * @param {String} id 新的<script>标签id, 可用于修改和删除等
 * @param {String} newScript 待添加的JS脚本字符串
 */
function addNewScript(id, newScript) {
	var styleElement = document.getElementById(id);

	if (!styleElement) {
		styleElement = document.createElement('script');
		styleElement.type = 'text/javascript';
		styleElement.id = id;
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newScript));
}
/**
 * 向页面动态添加新的JS脚本(拓展), 位于<head>标签最后面新的<script>标签里
 * @summary 添加新的JS脚本(拓展)
 * @param {String} id 新的<script>标签id, 可用于修改和删除等
 * @param {String} newScript 待添加的JS脚本字符串
 * @param {String} mode 添加模式(一般来说是<script>标签的格外标识符, 目前有 "async" 和 "defer" )
 */
function addNewScriptEx(id, newScript,mode) {
	var styleElement = document.getElementById(id);
	
	if (!styleElement) {
		styleElement = document.createElement('script');
		styleElement.type = 'text/javascript';
		styleElement.id = id;
		
		if(mode == "async"){
			styleElement.setAttribute('async');
		}else if(mode == "defer"){
			styleElement.setAttribute('defer');
		}
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newScript));
}
/**
 * 向页面动态添加新的JS模块(实验), 位于<head>标签最后面新的<script>标签里
 * @summary 添加新的JS模块(实验)
 * @param {String} id 新的<script>标签id, 可用于修改和删除等
 * @param {String} newScript
 */
function addNewModule(id, newScript){
	var styleElement = document.getElementById(id);
	
	if (!styleElement) {
		styleElement = document.createElement('script');
		styleElement.type = 'module';
		styleElement.id = id;
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newScript));
}
/**
 * 动态加载一个js/css文件, 位于<head>标签最后面新的<script>标签里, 通过src引入指定的url
 * @summary 动态加载一个js/css文件
 * @param {String} filePath 文件路径
 * @param {String} filetype 文件类型
 */
function loadjscssFile(filePath, filetype) {
	if (filetype == "js") {
		var fileref = document.createElement('script')
		fileref.setAttribute("type", "text/javascript")
		fileref.setAttribute("src", filePath)
	} else if (filetype == "css") {
		var fileref = document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filePath)
	}

	if (typeof fileref != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref); //向元素添加新的子节点，作为最后一个子节点
	}
}
/**
 * 动态加载一个js/css文件(此方法可以添加id和media类型), 位于<head>标签最后面新的<script>标签里, 通过src引入指定的url
 * @summary 动态加载一个js/css文件(拓展)
 * @param {String} filePath  文件路径
 * @param {String} id        节点id
 * @param {String} filetype  文件类型
 */
function loadjscssFile_media(filePath,id, filetype) { //动态加载一个js/css文件
	if (filetype == "js") {
		var fileref = document.createElement('script')
		fileref.setAttribute("type", "text/javascript")
		fileref.setAttribute("src", filePath)
	} else if (filetype == "css") {
		var fileref = document.createElement("link")
		if(id != "" || id != null || id != undefined){
			fileref.setAttribute("id", id)
		}
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filePath)
		fileref.setAttribute("media", "all")
	}

	if (typeof fileref != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref); //向元素添加新的子节点，作为最后一个子节点
	}
}
/**
 * 获取URL对应的资源数据(伪同步, 会阻塞当前线程, 配合 async 和 await 使用)
 * @summary 获取URL对应的资源数据
 * @async
 * @param {String} resourceURL 资源url
 * @param {Boolean} retDataMode 返回的数据方式
 * @return {String} 返回获取到的数据
 */
async function getResourceByURL(resourceURL,retDataMode){
	var retData = null;
	var waitStatus = true;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: resourceURL,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
			//'Accept': 'application/atom+xml,application/xml,text/xml',
			//"Content-Type": "application/x-www-form-urlencoded",
		},
		onload: function(response) {
			if (response.status === 200) {
				console.log('getResourceByURL()请求成功!');
				
				if(retDataMode == true)
					retData = response.responseText;
				else
					retData = response;
				
				waitStatus = false; //不等待
			} else {
				console.log('getResourceByURL()请求失败! 状态码:' + response.status);
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('getResourceByURL()请求错误!', err);
			//waitStatus = false; //不等待
		},
		onabort: function(err) {
			console.log('getResourceByURL()请求被中止!', err);
			//waitStatus = false; //不等待
		},
		ontimeout: function(err) {
			console.log('getResourceByURL()请求超时!', err);
			//waitStatus = false; //不等待
		}
	});
	
	while (waitStatus){ //强制等待异步函数执行完毕后再执行
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	//console.log(retData);
	return retData;
}

/**
 * 获取URL对应的资源数据(不通过插件，不能跨域，未来可能会被删除)(伪同步, 会阻塞当前线程, 配合 async 和 await 使用)
 * @summary 获取URL对应的资源数据(不通过插件，不能跨域，未来可能会被删除)
 * @async
 * @param {String} resourceURL 资源url
 */
async function getResourceByURL_original(resourceURL) {
	var retData;
	var waitStatus = true;
	
	jQuery.ajax({
		type: "Get", //请求方式
		//async: false,
		//contentType: "application/json;charset=UTF-8",//请求的媒体类型
		url: resourceURL, //请求地址
		// headers: {
		// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
		// 	//'Accept': 'application/atom+xml,application/xml,text/xml',
		// 	//"Content-Type": "application/x-www-form-urlencoded",
		// },
		//data: JSON.stringify(list),				//数据，json字符串
		success: function(result) { //请求成功
			retData = result;
			console.log("请求成功了!",retData);
			//let nIstart = Data.indexOf('StartTradeOffer(');
			//let nIend = Data.indexOf(');', nIstart);
			//let AccountID = Data.slice(nIstart + 'StartTradeOffer('.length + 1, nIend - 1);
			//nIstart = Data.indexOf('"steamid":"');
			//nIend = Data.indexOf('",', nIstart);
			//let profileID = Data.slice(nIstart + '"steamid":"'.length, nIend);
			//console.log("getgetProfilesID() i:", i, "AccountID:", AccountID, "profileID:", profileID);

			// for (let i = 0; i < waitStatus1.length; i++) {
			// 	if (waitStatus1[i][0] == profileID) //是否是同一个用户
			// 	{
			// 		if (waitStatus1[i][1] == false) //这个用户是否已经获取过了(测试多个相同用户信息的获取)
			// 			continue;
			// 		waitStatus1[i][1] = false;
			// 		//returnData1.push(AccountID); //存储数据
			// 		returnData1[i] = AccountID; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
			// 		//console.log("getgetProfilesID() 成功存储数据 AccountID:",AccountID);
			// 		return;
			// 		//console.log("waitStatus1[i][1] break",i,waitStatus1[i][1]);
			// 	}
			// }
			// console.log("getgetProfilesID 数据错误!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			// console.log("waitStatus1:", waitStatus1, 'returnData1:', returnData1);
			// console.log('profileID:', profileID, 'AccountID:', AccountID);
			return;
			//console.log("DBG!",nIstart,nIend);
		},
		error: function(e) { //请求失败，包含具体的错误信息
			console.log("请求失败了!", e.status);
			console.log("请求失败了!", e.responseText);
		}
	});
	//console.log("getgetProfilesID() i:",i,"waitStatus1:",waitStatus1);
	while (waitStatus){ //强制等待异步函数执行完毕后再执行
		console.log("wait...");
		await sleep(50); //延迟0.1秒
	}
	//console.log("waitStatus1[i][1]:",waitStatus1[i][1],"returnData1[i]:",returnData1[i]);
	return retData;

	// jQuery.get(URL, {
	// 	// "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	// 	// // "Content-Type": "application/x-www-form-urlencoded", //非常重要
	// 	// "Accept-Encoding": "gzip, deflate, br",
	// 	// "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
	// 	// "Cache-Control": "max-age=0",
	// 	// "Connection": "keep-alive",
	// 	// "Cookie": "sessionid=6f84a0f48cddb56ad66394b6; steamCountry=HK%7Cda7daa2682f7a361e594f8dad55fe9df; timezoneOffset=28800,0",
	// 	// "Host": "steamcommunity.com",
	// 	// "Upgrade-Insecure-Requests": "1",
	// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
	// }, function(response) {
	// 	if (response.status === 200) {
	// 		console.log("获取失败!",response.responseText);
	// 	} else {
	// 		console.log("获取成功!",response.responseText);
	// 	}
	// }).fail(function() {
	// 	console.log("无法获取!");
	// }).always(function() {
	// 	//console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
	// });
}
//-------------------------------------------------------------------------------------------------------------
function WriteLog() {
	// eslint-disable-next-line no-console
	console.log('%c[SteamDB]%c', 'color:#2196F3; font-weight:bold;', '', ...arguments);
}
//console.log("%c百度2020校园招聘简历提交：http://dwz.cn/XpoFdepe", "color:red"))
//color:#00a1d6

//-------------------------------------------------------------------------------------------------------------
//Arguments实用函数，配合下面的调试类一起使用，用于解析出 类方法 或者 函数 的名称

class Arguments {
	static getArgumentsAllValue(argumentsObj) { //解析函数的参数并进行合并为字符串
		let str = "";
		for (let i = 0; i < argumentsObj.length; i++) {
			str += argumentsObj[i] + " ";
		}
		return str;
	}
	static getArgumentsAllValue_noFunction(argumentsObj) { //解析函数的参数并进行合并为字符串
		let str = "";
		for (let i = 0; i < argumentsObj.length; i++) {
			if (typeof argumentsObj[i] == 'function') { //如果是函数则跳过
				continue;
			}
			str += argumentsObj[i] + " ";
		}
		return str;
	}
	static getArgumentsAllValueByDebug(argumentsObj) { //解析函数的参数并进行合并为字符串 //返回数组[track,str]
		let str = "";
		let track = "";
		console.log(arguments);
		//console.log(arguments.callee.name);
		for (let i = 0; i < argumentsObj.length; i++) {
			if (typeof argumentsObj[i] == 'number') { //如果是数字则转为字符串
				//argumentsObj[i] = argumentsObj[i].toString();
				str += argumentsObj[i] + " ";
				continue;
			}
			let s = argumentsObj[i].match(/\s*[A-Za-z\$\_][A-Za-z\$\_\.0-9]+\s*\(/);
			if (s != null) {
				if (null != s[0]) { //提取出' 函数名 ('这样的字符串
					track = s[0].slice(0, -1); //去掉最后的(，得到函数名
					let s1 = argumentsObj[i].replace(/\s*[A-Za-z\$\_][A-Za-z\$\_\.0-9]+\s*\(/, ""); //从字符串中删除函数名，然后剩下的部分
					str += s1.slice(1, s1.length) + " "; //去掉最前面的)，得到提示信息
					continue;
				}
			}
			str += argumentsObj[i] + " ";
		}
		return [track, str];
	}
}

//-------------------------------------------------------------------------------------------------------------
//调试类

/**
 * @class
 * @classdesc 用于输出和记录调试信息的类
 * 
 */
class Log {
	 /**
	  * @constructs 构造方法(模块名称,调试状态) //默认开启调试
	  * @param {String} moduleName 模块名称 (当输出调试信息时会在最前面显示出来)
	  * @param {Boolean} debugStatus 调试状态
	  */
	constructor(moduleName, debugStatus = true) {
		this.m_moduleNamel = moduleName; //设置模块名称
		this.arrlogContent = []; //日志内容(数组)
		g_conf[0].is_Debug = debugStatus; //设置调试状态
	}
	/**
	 * 设置调试状态(调试状态) //控制是否进行调试输出
	 *  @param {Boolean} debugStatus 调试状态
	 */
	setDebugStatus(debugStatus = true) {
		g_conf[0].is_Debug = debugStatus;
	}
	/**
	 * 清除控制台输出
	 */
	clear() {
		console.clear();
	}
	/**
	 * 释放资源(模式) 是否需要保存数据,true会进行提示保存,false不保存日志数据
	 * @param {String} mode 释放资源模式
	 */
	release(mode){
		this.arrlogContent = [];
	}
	/**
	 * 用于对此类进行测试
	 * @param {Object} strTestInfo 需要进行测试输出的字符串
	 */
	test(strTestInfo) { //用于对Log类进行输出测试
		if (strTestInfo == undefined)
			strTestInfo = "默认测试内容";
		log.out("模块名称:", this.m_moduleNamel);
		log.out("是否开启调试:", g_conf[0].is_Debug);
		log.debug(strTestInfo);
		log.info(strTestInfo);
		log.warn(strTestInfo);
		log.error(strTestInfo);
		log.fatal(strTestInfo);
	}
	/**
	 * 直接输出，不受调试状态的影响 (一般只用于输出最重要的信息)
	 * @param {Object} strLog 需要直接输出的字符串
	 */
	out(strLog) {
		console.log('%c[' + this.m_moduleNamel + ' out]%c' + Arguments.getArgumentsAllValue(arguments),
			'color:#000000; font-weight:bold;', 'color:#000000;');
	}
	/**
	 * 输出Debug等级的日志信息
	 * @param {String} $funcName 需要输出的函数名称
	 * @param {String} $strDebugInfo 需要输出的字符串
	 */
	//伪重载实现，两种版本
	//log.debug("getArgumentsAllValueByDebug() 111");
	//log.debug(getArgumentsAllValueByDebug,"111");
	debug($funcName, $strDebugInfo) {
		//var This = this;
		//debugger;
		let fontStyle =
			'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
		let titleStyle = 'padding: 2px 6px; border-radius: 3px 0 0 3px; background: #606060;color: #fff;' + fontStyle;
		let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #1475b2;color: #fff;' + fontStyle;
		let arr;
		if (typeof $funcName == 'function') { //
			if (g_conf[0].is_Debug) {
				//debugger;
				console.log($funcName);
				$funcName = '.' + $funcName.name;

				arr = Arguments.getArgumentsAllValue_noFunction(arguments);
				console.log('%c[' + this.m_moduleNamel + ' Debug-B]%c' + $funcName + '%c' + arr,
					'color:#2196F3; font-weight:bold;', titleStyle, contentStyle);
			}
		} else {
			if (g_conf[0].is_Debug) {
				arr = Arguments.getArgumentsAllValueByDebug(arguments);
				console.log('%c[' + this.m_moduleNamel + ' Debug-A]%c' + arr[0] + '%c' + arr[1],
					'color:#2196F3; font-weight:bold;', titleStyle, contentStyle);
			}
		}
	}
	/**
	 * 输出Info等级的日志信息
	 * @param {String} $funcName 需要输出的函数名称
	 * @param {String} $strDebugInfo 需要输出的字符串
	 */
	info($strLogInfo) {
		if (g_conf[0].is_Debug) {
			let fontStyle =
				'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
			let titleStyle = 'padding: 2px 6px; border-radius: 3px 0 0 3px; background: #606060;color: #fff;' + fontStyle;
			let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #42c02e;color: #fff;' + fontStyle;
			let arr = Arguments.getArgumentsAllValueByDebug(arguments);

			console.log('%c[' + this.m_moduleNamel + ' Info]%c' + arr[0] + '%c' + arr[1], 'color:#00edc3; font-weight:bold;',
				titleStyle, contentStyle);
		}
	}
	/**
	 * 输出Warn等级的日志信息
	 * @param {String} $funcName 需要输出的函数名称
	 * @param {String} $strDebugInfo 需要输出的字符串
	 */
	warn($strWarnInfo) {
		if (g_conf[0].is_Debug) {
			let fontStyle =
				'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
			let titleStyle = 'padding: 2px 6px; border-radius: 3px 0 0 3px; background: #606060;color: #fff;' + fontStyle;
			let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #ff7800;color: #fff;' + fontStyle;
			let arr = Arguments.getArgumentsAllValueByDebug(arguments);

			console.log('%c[' + this.m_moduleNamel + ' Warn]%c' + arr[0] + '%c' + arr[1], 'color:#ffa800; font-weight:bold;',
				titleStyle, contentStyle);
		}
	}
	/**
	 * 输出Error等级的日志信息
	 * @param {String} $funcName 需要输出的函数名称
	 * @param {String} $strDebugInfo 需要输出的字符串
	 */
	error($strErrInfo) {
		if (g_conf[0].is_Debug) {
			let fontStyle =
				'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
			let titleStyle = 'padding: 2px 6px; border-radius: 3px 0 0 3px; background: #606060;color: #fff;' + fontStyle;
			let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #ff00a2;color: #fff;' + fontStyle;
			let arr = Arguments.getArgumentsAllValueByDebug(arguments);

			console.trace('%c[' + this.m_moduleNamel + ' Error]%c' + arr[0] + '%c' + arr[1], 'color:#ff00c0; font-weight:bold;',
				titleStyle, contentStyle);
		}
	}
	/**
	 * 输出Fatal等级的日志信息
	 * @param {String} $funcName 需要输出的函数名称
	 * @param {String} $strDebugInfo 需要输出的字符串
	 */
	fatal($strFatalInfo) {
		if (g_conf[0].is_Debug) {
			let fontStyle =
				'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
			let titleStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #606060;color: #fff;' + fontStyle;
			let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #ff5252;color: #fff;' + fontStyle;
			let arr = Arguments.getArgumentsAllValueByDebug(arguments);

			console.trace('%c[' + this.m_moduleNamel + ' Fatal]%c' + arr[0] + '%c' + arr[1], 'color:#ff0000; font-weight:bold;',
				titleStyle, contentStyle);
		}
	}
}
var log = new Log("Main");
log.info("Test");
//log.test("Arguments.getArgumentsAllValueByDebug() successed!");
//log.debug("Arguments.getArgumentsAllValueByDebug() 111");
//log.debug(Arguments.getArgumentsAllValueByDebug, "111");

// /**
//  * 获取运行时环境信息
//  */
// function getRuntimeEnviInfo(){
// 	var naObj = window.navigator;
// 	document.write("浏览器的信息如下: <hr>");
// 	for (var i in naObj) {
// 		console.log(i + " : <span style='color:blue;'>" + typeof naObj[i] + '</span><br><span style=\'color:red;\'>' + naObj[i] + "</span><br>");
// 	}

// /**
//  * 获取运行时环境信息
//  */
// function getRuntimeEnviInfo(){
// 	var naObj = window.navigator;
// 	document.write("浏览器的信息如下: <hr>");
// 	for (var i in naObj) {
// 		document.write(i + " : <span style='color:blue;'>" + typeof naObj[i] + '</span><br><span style=\'color:red;\'>' + naObj[i] + "</span><br>");
// 	}


// 	function openWin(url,name,width,height){
// 		var str = 'width=' + width + ',height=' + height;
// 		return window.open(url,name,str);
// 	}

// 	function closeWin(winObj){
// 		return winObj.close();
// 	}
// }


// var textNode = '<div style="z-index: 999;position: relative;"><a href="https://www.baidu.com/" target="newWin">百度</a><button id="open">打开窗口</button><button id="close">关闭窗口</button></div>';

// function createNode(template){
// 	var start = Date.now();
// 	//var tempNode = document.createElement('div');
// 	//tempNode.innerHTML = template;
// 	//var node = tempNode;
// 	var node = document.createRange().createContextualFragment(textNode);
// 	console.log(Date.now() - start);
// 	return node;
// }
// document.getElementsByTagName('body')[0].appendChild(createNode(textNode));

// document.getElementById('open').onclick = ()=>{
// 	openWin('','newWin',320,240);
// };
// document.getElementById('close').onclick = ()=>{
// 	closeWin(newWin);
// };

/**
 * 通知类
 * https://developer.mozilla.org/zh-CN/docs/Web/API/notification/Using_Web_Notifications
 */
class Notifications{
	constructor(arg) {
		this.enabled = true; //是否启用通知
		this.defaultWaitTime = 2000; //通知默认等待时间 (x秒后关闭通知)
	}
	init(){
		// 检查浏览器是否支持通知
		if (!("Notification" in window)) {
			console.log("此浏览器不支持桌面通知!");
		}
		
		// 检查是否已经授予通知权限
		else if (Notification.permission === "granted") {
			// 如果用户已经同意了通知权限
			var notification = new Notification("通知已启用.");
			return true;
		}
		
		// 否则，需要请求用户的许可
		else if (Notification.permission !== 'denied' || Notification.permission === "default") {
			Notification.requestPermission(function (permission) {
				// 如果用户许可了，则创建一个通知进行测试
				if (permission === "granted") {
					var notification = new Notification("通知已启用.");
					return true;
				}
			});
		}
		//如果请求被拒绝则返回失败，不继续执行了
		return false;
	}
	/**
	 * 输出一条通知
	 * @param {String} strNotifications
	 */
	show(strNotifications){
		if(this.enabled){
			var notification = new Notification(strNotifications);
		}
		
	}
	/**
	 * 设置通知状态
	 * @param {Boolean} notificationsStatus 通知状态
	 */
	setNotificationsStatus(notificationsStatus = true){
		this.enabled = notificationsStatus;
	}
	/**
	 * 设置默认等待时间
	 * @param {Number} defaultWaitTime 通知默认等待时间 (x秒后关闭通知)
	 */
	setNotificationsDefaultWaitTime(defaultWaitTime = 2000){
		this.defaultWaitTime = defaultWaitTime;
	}
}

