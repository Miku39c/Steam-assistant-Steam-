// ==UserScript==
// @name         Steam assistant(Steam小助手)
// @description  WEB端Steam小助手，集合多种功能如Steam批量留言,点赞,好友管理,喜加一...，佛系更新中...欢迎提出您的建议或者共同学习交流
// @version      1.2.3.3.9
// @date         2020.5.2
// @source       https://github.com/Mikuof39/Steam-assistant-Steam-
// @homepage     https://steamcommunity.com/sharedfiles/filedetails/?id=1993903275
// @supportURL   https://greasyfork.org/zh-CN/scripts/397073/feedback
// @author       Miku39
// @license      GPL License
// @namespace    https://steamcommunity.com/id/miku-39/
// @namespace    https://www.tampermonkey.net/
// @namespace    https://greasyfork.org/
// @require      file://D:\Desktop\图片\steam\git steam\databaseConf.js
// @require      file://D:\Desktop\图片\steam\git steam\src_shortcuts.js
// @require      file://D:\Desktop\图片\steam\git steam\websocket.js
// @require      file://D:\Desktop\图片\steam\git steam\common.js
// @require      file://D:\Desktop\图片\steam\git steam\translateApis.js
// @require      file://D:\Desktop\图片\steam\git steam\externalApis.js
// @require      file://D:\Desktop\图片\steam\git steam\steamApis.js
// @require      file://D:\Desktop\图片\steam\git steam\utility.js
// @require      file://D:\Desktop\图片\steam\git steam\ui.js
// @require      file://D:\Desktop\图片\steam\git steam\uiHandler.js
// @require      file://D:\Desktop\图片\steam\git steam\event.js
// @require      file://D:\Desktop\图片\steam\git steam\cityList.js
// @icon         http://store.steampowered.com/favicon.ico
// @icon64       https://steamcommunity-a.akamaihd.net/public/shared/images/responsive/share_steam_logo.png
// @updateURL    https://greasyfork.org/zh-CN/scripts/397073
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
// @run-at       document-start
// ==/UserScript==



(async()=>{
	var ui = new UI();
	gc_ui = ui;
	if(await ui.initUI() != false){
		await ui.createUI();
	}
})();