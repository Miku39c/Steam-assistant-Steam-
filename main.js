// ==UserScript==
// @name         Steam assistant(SteamС����)
// @description  WEB��SteamС���֣����϶��ֹ�����Steam��������,����,���ѹ���,ϲ��һ...����ϵ������...��ӭ������Ľ�����߹�ͬѧϰ����
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
// @require      file://D:\Desktop\ͼƬ\steam\git steam\databaseConf.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\src_shortcuts.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\websocket.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\common.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\translateApis.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\externalApis.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\steamApis.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\utility.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\ui.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\uiHandler.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\event.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\cityList.js
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
// @connect      api.fanyi.baidu.com  //�ٶ�ͨ�÷���API HTTP   http://fanyi-api.baidu.com/api/trans/product/prodinfo#0
// @connect      fanyi-api.baidu.com  //�ٶ�ͨ�÷���API HTTPS  https://blog.csdn.net/dianfu2892/article/details/101467066
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
// @connect      route.showapi.com  //��Ա/��� https://www.showapi.com/api/apiList
// @connect      zhaiyan.2cys.com   //լ��API-����̨�ʽӿ� https://www.kancloud.cn/acman/zhaiyanapi/31183
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