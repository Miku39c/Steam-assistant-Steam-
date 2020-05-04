// ==UserScript==
// @name         Steam assistant(Steam小助手)
// @description  WEB端Steam小助手，集合多种功能如Steam批量留言,点赞,好友管理,喜加一...，佛系更新中...欢迎提出您的建议或者共同学习交流
// @version      1.2.3.4.1
// @date         2020.5.4
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
// @updateURL    https://greasyfork.org/scripts/397073-steam-assistant-steam%E5%B0%8F%E5%8A%A9%E6%89%8B/code/Steam%20assistant(Steam%E5%B0%8F%E5%8A%A9%E6%89%8B).user.js
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?$/
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @note         Cdn-----------------------------------------------------------------------
// @connect      cdnjs.cloudflare.com
// @connect      code.highcharts.com.cn
// @connect      www.layuicdn.com
// @note         Translate-----------------------------------------------------------------
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
// @note         Api-----------------------------------------------------------------------
// @connect      brushes8.com
// @connect      api.help.bj.cn
// @connect      api.avatardata.cn  //https://www.avatardata.cn/Docs
// @connect      route.showapi.com  //会员/免费 https://www.showapi.com/api/apiList
// @connect      zhaiyan.2cys.com
// @connect      api.dongmanxingkong.com
// @connect      api.pingcc.cn
// @connect      47.114.147.221
// @connect      www.dmoe.cc
// @connect      api.mz-moe.cn
// @connect      sinaimg.cn
// @connect      *
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