// ==UserScript==
// @name         Steam assistant(Steam小助手)
// @description  WEB端Steam小助手，集合多种功能如Steam批量留言,点赞,好友管理,喜加一...，佛系更新中...欢迎提出您的建议或者共同学习交流
// @version      1.2.3.4.5
// @date         2020.6.30
// @source       https://github.com/Mikuof39/Steam-assistant-Steam-
// @homepage     https://steamcommunity.com/sharedfiles/filedetails/?id=1993903275
// @supportURL   https://greasyfork.org/zh-CN/scripts/397073/feedback
// @author       Miku39
// @license      GPL License
// @namespace    https://steamcommunity.com/id/miku-39/
// @namespace    https://www.tampermonkey.net/
// @namespace    https://greasyfork.org/
// @icon         https://store.steampowered.com/favicon.ico
// @icon64       https://steamcommunity-a.akamaihd.net/public/shared/images/responsive/share_steam_logo.png
// @updateURL    https://greasyfork.org/scripts/397073-steam-assistant-steam%E5%B0%8F%E5%8A%A9%E6%89%8B/code/Steam%20assistant(Steam%E5%B0%8F%E5%8A%A9%E6%89%8B).user.js
// @note         CSS-----------------------------------------------------------------------
// @resource     css_layui https://www.layuicdn.com/layui-v2.5.6/css/layui.css
// @resource     css_laydate https://www.layuicdn.com/layui-v2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9
// @resource     css_layer https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/layer.css?v=3.1.1
// @resource     css_layui_Modules https://www.layuicdn.com/layui-v2.5.6/css/modules/code.css
// @resource     css_fontAwesome https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css
// @note         JS-----------------------------------------------------------------------
// @resource     JS_highstock https://code.highcharts.com.cn/highstock/highstock.js
// @resource     JS_highstock_exporting https://code.highcharts.com.cn/highcharts/modules/exporting.js
// @resource     JS_highstock_oldie https://code.highcharts.com.cn/highcharts/modules/oldie.js
// @resource     JS_highstock_networkgraph https://code.highcharts.com.cn/highcharts/modules/networkgraph.js
// @resource     JS_highstock_zh_CN https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js
// @resource     JS_layui https://www.layuicdn.com/layui-v2.5.6/layui.all.js
// @resource     JS_localforage https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js
// @resource     JS_draw https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.2.4/pixi.js
// @resource     JS_animate https://code.createjs.com/1.0.0/tweenjs.js
// @resource     JS_sound https://code.createjs.com/1.0.0/soundjs.js
// @resource     JS_render https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.js
// @resource     JS_multithreading https://gitlab.com/hordesolutions/Hamsters.js/-/raw/master/build/hamsters.min.js
// @resource     JS_pep https://code.jquery.com/pep/0.4.3/pep.js
// @resource     JS_babylon https://preview.babylonjs.com/babylon.js
// @resource     JS_babylon_loaders https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js
// @resource     Jquery_localizationtool https://greasyfork.org/scripts/403927-jquery-localizationtool-js/code/jquerylocalizationTooljs.js?version=808323
// @require      file://E:\Source\web\steam\git Steam assistant\config\databaseConf.js
// @require      file://E:\Source\web\steam\git Steam assistant\config\_AutoGeneration_ConfS.js
// @require      file://E:\Source\web\steam\git Steam assistant\common.js
// @require      file://E:\Source\web\steam\git Steam assistant\resource.js
// @require      file://E:\Source\web\steam\git Steam assistant\res\_AutoGeneration_CSSs.js
// @require      file://E:\Source\web\steam\git Steam assistant\res\_AutoGeneration_HTMLs.js
// @require      file://E:\Source\web\steam\git Steam assistant\res\_AutoGeneration_JSs.js
// @require      file://E:\Source\web\steam\git Steam assistant\res\language\languagesList.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\_UI_Style.js
// @require      file://E:\Source\web\steam\git Steam assistant\steamData.js
// @require      file://E:\Source\web\steam\git Steam assistant\src\shortcuts.js
// @require      file://E:\Source\web\steam\git Steam assistant\webSocket.js
// @require      file://E:\Source\web\steam\git Steam assistant\translateApis.js
// @require      file://E:\Source\web\steam\git Steam assistant\externalApis.js
// @require      file://E:\Source\web\steam\git Steam assistant\steamApis.js
// @require      file://E:\Source\web\steam\git Steam assistant\steamApps.js
// @require      file://E:\Source\web\steam\git Steam assistant\steamExtend.js
// @require      file://E:\Source\web\steam\git Steam assistant\utility.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\_UI_multi_language_support.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui_menu_friends.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui_menu_friends_invite.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui_menu_shielding.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui_menu_gameFriend.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui_menu_liveAdmin.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui_menu_following_Players.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui_menu_groups.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\ui_menu_groups_invite.js
// @require      file://E:\Source\web\steam\git Steam assistant\ui\_UI_Handler.js
// @require      file://E:\Source\web\steam\git Steam assistant\event.js
// @require      file://E:\Source\web\steam\git Steam assistant\src\cityList.js
// @require      file://E:\Source\web\steam\git Steam assistant\app.js
// @note         运行页面-> 社区
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?$/
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?(add|pending|blocked|coplay|broadcast_moderator)?\/?$/
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/(following|groups|groups\/pending)\/?$/
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?([A-Za-z0-9$/-_.+!*'(),])+$/
// @note         运行页面-> 创意工坊-我的
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/myworkshopfiles\/\?appid=+[0-9]+&browsefilter=myfavorites$/
// @note         运行页面-> 创意工坊-我的收藏
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/myworkshopfiles\/\?appid=+[0-9]+&browsefilter=myfavorites$/
// @note         运行页面-> 创意工坊-我的订阅
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/myworkshopfiles\/\?appid=+[0-9]+&browsefilter=myfavorites$/
// @note         运行页面-> 创意工坊-运行过的
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/myworkshopfiles\/\?appid=+[0-9]+&browsefilter=myfavorites$/
// @note         脚本功能-----------------------------------------------------------------------
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_download
// @grant        GM_openInTab
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener	
// @grant        GM_getTab
// @grant        GM_saveTab
// @grant        GM_getTabs
// @grant        GM_setClipboard
// @grant        GM_notification
// @grant        GM_listValues
// @grant        GM_info
// @note         Cdn-----------------------------------------------------------------------
// @connect      code.highcharts.com
// @connect      code.highcharts.com.cn
// @connect      www.layuicdn.com
// @connect      cdnjs.cloudflare.com
// @connect      cdn.90so.net
// @connect      www.jsdelivr.com
// @connect      cdn.bootcss.com
// @connect      stackpath.bootstrapcdn.com
// @connect      greasyfork.org
// @connect      github.com
// @connect      www.bootcdn.cn
// @connect      cdn.jsdelivr.net
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
// @connect      self
// @connect      *
// @noframes
// @run-at       document-start
// ==/UserScript==



(async()=>{
	gc_app = await new App();
	if(await gc_app.init(true) != false){
		await gc_app.run();
	}
})();