// ==UserScript==
// @name         Steam assistant(Steam小助手)
// @description  WEB端Steam小助手，集合多种功能如Steam批量留言,点赞,好友管理,喜加一...，佛系更新中...欢迎提出您的建议或者共同学习交流
// @namespace    https://steamcommunity.com/id/miku-39/
// @namespace    https://www.tampermonkey.net/
// @namespace    https://greasyfork.org/
// @namespace    Steam Tampermonkey Script
// @icon         http://store.steampowered.com/favicon.ico
// @icon64       http://store.steampowered.com/favicon.ico
// @version      1.2.3.3.1
// @date         2020.4.23
// @source       https://github.com/Mikuof39/Steam-assistant-Steam-
// @require      file://D:\Desktop\图片\steam\git steam\common.js
// @require      file://D:\Desktop\图片\steam\git steam\websocket.js
// @require      file://D:\Desktop\图片\steam\git steam\databaseConf.js
// @require      file://D:\Desktop\图片\steam\git steam\translateApis.js
// @require      file://D:\Desktop\图片\steam\git steam\externalApis.js
// @require      file://D:\Desktop\图片\steam\git steam\steamApis.js
// @require      file://D:\Desktop\图片\steam\git steam\utility.js
// @require      file://D:\Desktop\图片\steam\git steam\ui.js
// @require      file://D:\Desktop\图片\steam\git steam\uiHandler.js
// @require      file://D:\Desktop\图片\steam\git steam\event.js
// @require      file://D:\Desktop\图片\steam\git steam\cityList.js
// @author       Miku39
// @license      GPL License
// @updateURL    https://greasyfork.org/zh-CN/scripts/397073
// @supportURL   https://steamcommunity.com/sharedfiles/filedetails/?id=1993903275
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?$/
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @connect      cdnjs.cloudflare.com
// @connect      code.highcharts.com.cn
// @connect      www.deepl.com
// @connect      api.deepl.com
// @connect      translate.google.cn
// @connect      translate.google.com
// @connect      fanyi.baidu.com
// @connect      api.fanyi.baidu.com  //百度通用翻译API HTTP   http://fanyi-api.baidu.com/api/trans/product/prodinfo#0
// @connect      fanyi-api.baidu.com  //百度通用翻译API HTTPS  https://blog.csdn.net/dianfu2892/article/details/101467066
// @connect      fanyi.youdao.com
// @connect      fanyi.so.com
// @connect      fanyi.qq.com
// @connect      fanyi.sogou.com
// @connect      cn.bing.com  //https://cn.bing.com/translator/
// @connect      hjdict.com   //http://www.hjdict.com/app/trans
// @connect      fanyi.dict.cn
// @connect      brushes8.com
// @connect      api.help.bj.cn
// @connect      api.avatardata.cn  //https://www.avatardata.cn/Docs
// @connect      route.showapi.com  //会员/免费 https://www.showapi.com/api/apiList
// @connect      zhaiyan.2cys.com   //宅言API-动漫台词接口 https://www.kancloud.cn/acman/zhaiyanapi/31183
// @connect      api.dongmanxingkong.com  //https://api.dongmanxingkong.com/
// @connect      api.pingcc.cn            //http://api.pingcc.cn/
// @connect      www.dmoe.cc              //http://www.dmoe.cc/
// @connect      api.mz-moe.cn            //https://mz-moe.cn/?p=23
// @connect      www.layuicdn.com
// @noframes
// @run-at       document-body
// ==/UserScript==



var delay = 4; // 设置你的留言时间间隔,单位秒
var strNoOperate = "(不留言)"; //设置你的不留言的标识符: 如果不需要留言,则需在备注中添加这个不留言的标识符
var strRemarkPlaceholder = "{name}"; //设置你的称呼占位符: 同上

async function Main() {
	if (document.URL.lastIndexOf("/friends") == -1 || document.URL.indexOf("https://steamcommunity.com") == -1) {
		alert("请在打开的页面上,在Console(控制台)粘贴运行代码!");
		open("https://steamcommunity.com/my/friends");
	} else {
		var date;
		var startTime = 0,
			endTime = 0;
		
		if (delay < 0) delay = 0;
		
		(async()=>{
		var ui = new UI();
		await ui.initUI();
		await ui.createUI();
		})();
		
	}

}

Main();