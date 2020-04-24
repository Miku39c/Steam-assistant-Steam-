// ==UserScript==
// @name         Steam assistant(SteamС����)
// @description  WEB��SteamС���֣����϶��ֹ�����Steam��������,����,���ѹ���,ϲ��һ...����ϵ������...��ӭ������Ľ�����߹�ͬѧϰ����
// @namespace    https://steamcommunity.com/id/miku-39/
// @namespace    https://www.tampermonkey.net/
// @namespace    https://greasyfork.org/
// @namespace    Steam Tampermonkey Script
// @icon         http://store.steampowered.com/favicon.ico
// @icon64       http://store.steampowered.com/favicon.ico
// @version      1.2.3.3.1
// @date         2020.4.23
// @source       https://github.com/Mikuof39/Steam-assistant-Steam-
// @require      file://D:\Desktop\ͼƬ\steam\git steam\common.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\websocket.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\databaseConf.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\translateApis.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\externalApis.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\steamApis.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\utility.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\ui.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\uiHandler.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\event.js
// @require      file://D:\Desktop\ͼƬ\steam\git steam\cityList.js
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
// @run-at       document-body
// ==/UserScript==



var delay = 4; // �����������ʱ����,��λ��
var strNoOperate = "(������)"; //������Ĳ����Եı�ʶ��: �������Ҫ����,�����ڱ�ע�������������Եı�ʶ��
var strRemarkPlaceholder = "{name}"; //������ĳƺ�ռλ��: ͬ��

async function Main() {
	if (document.URL.lastIndexOf("/friends") == -1 || document.URL.indexOf("https://steamcommunity.com") == -1) {
		alert("���ڴ򿪵�ҳ����,��Console(����̨)ճ�����д���!");
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