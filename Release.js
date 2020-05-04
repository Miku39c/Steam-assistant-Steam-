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

 addNewScript('g_conf_Script',
'\
/*保存了全局配置信息的对象，支持多用户，第0个默认为当前的用户配置信息(运行时读取到第0个，非长期存储)，从第1个开始是存储的用户长期配置信息表*/\n\
var g_conf = [\n\
	{steamID: ""\n\
	,language: "automatic" /*语言: 自动检测*/\n\
	,delay: 4 /*设置你的留言时间间隔,单位秒*/\n\
	,strNoOperate: "(不留言)" /*设置你的不留言的标识符: 如果不需要留言,则需在备注中添加这个不留言的标识符*/\n\
	,strRemarkPlaceholder: "{name}" /*设置你的称呼占位符: 同上*/\n\
	\n\
	,autoLogin: 1 /*没有登录时是否自动跳转到登录页面 (点击确定跳转，点击关闭不跳转)*/\n\
	,isShowQuickNavigationBar: false /*是否显示快速导航栏*/\n\
	,is_Debug: true /*是否是调试模式(总开关，是否显示调试输出，显示当前运行状态)*/\n\
	,isTrackRunStatus: true /*是否跟踪运行状态(更详细的调试输出，可控型只显示错误警告 到 变量级)*/\n\
	,isAddYunBreakWarn: true /*是否添加运行中断警告*/\n\
	,YunStatus: false /*当前运行状态(比如正在留言中之类的就是正在运行)*/\n\
	,isTranslationText: false /*是否进行了翻译*/\n\
	\n\
	,isWarnInfo: false /*是否出现警告信息(如果没有则不需要清空)*/\n\
	,isCommentRunStatus: false /*是否正在留言*/\n\
	,isNationalityRunStatus: false /*是否正在设置国籍*/\n\
	,isNoCommentRunStatus: false /*是否正在设置不留言*/\n\
	,isTimeIntervalRunStatus: false /*是否正在设置留言时间间隔*/\n\
	,isAutoCommentRunStatus: false /*是否正在设置自动留言计划*/\n\
	,isFriendToGroupRunStatus: false /*是否正在设置好友分组*/\n\
	\n\
	,isShow_menu_friend: true /*好友列表*/\n\
	,isShow_menu_activity: true /*动态列表*/\n\
	,isShow_menu_registerKey: true /*激活key*/\n\
	,isShow_menu_redeemWalletCode: true /*充值key*/\n\
	,isShow_menu_steamdbFree: true /*SteamDB预告*/\n\
	}\n\
];/* g_conf[0].*/\n\
\n\
/*默认配置信息对象*/\n\
const g_default_configuration = {\n\
	steamID: ""\n\
	,language: "automatic" /*语言: 自动检测*/\n\
	,delay: 4 /*设置你的留言时间间隔,单位秒*/\n\
	,strNoOperate: "(不留言)" /*设置你的不留言的标识符: 如果不需要留言,则需在备注中添加这个不留言的标识符*/\n\
	,strRemarkPlaceholder: "{name}" /*设置你的称呼占位符: 同上*/\n\
	,autoLogin: 1 /*没有登录时是否自动跳转到登录页面 (点击确定跳转，点击关闭不跳转)*/\n\
	,isShowQuickNavigationBar: false /*是否显示快速导航栏*/\n\
};\n\
\n\
/*多语言支持-调试信息*/\n\
const g_debug_info = [\n\
	{\n\
		language: "简体中文"\n\
	},\n\
	{\n\
		language: "English"\n\
	}\n\
];\n\
\n\
/*多语言支持-UI*/\n\
const g_languageList = [\n\
	{language: "简体中文"\n\
	,mainName: "Steam小助手"\n\
	,Tabs1: "留言"\n\
	,commentThread_textarea_Placeholder: "添加留言"\n\
	,strInBytes: "当前字符字节数: "\n\
	,translationModule: "翻译模块(需要提前设置国籍):"\n\
	/* ,: "当前语言"\n\
	 ,: "自动检测"\n\
	 ,: "中文简体"\n\
	 ,: "英语"\n\
	 ,: "日语"\n\
	 ,: "目标语言:"\n\
	 ,: "请先选择要翻译为的语言"\n\
	 ,: "英语"\n\
	 ,: "日语"\n\
	 ,: "中文简体"\n\
	 ,: "马新简体[zh-sg]"\n\
	 ,: "繁體中文[zh-hant]"\n\
	 ,: "繁體中文(香港)[zh-hk]"\n\
	 ,: "繁體中文(澳门)[zh-mo]"\n\
	 ,: "繁體中文(台湾)[zh-tw]"\n\
	 ,: "翻译"\n\
	 ,: "添加称呼模块(需要提前设置备注):"\n\
	 ,: "自定义称呼模式 (默认为{name}, 可以自行修改, 好友没有备注则使用steam名称)"\n\
	 ,: "在留言框添加自定义称呼标识符"\n\
	 ,: "是否为好友添加称呼 (如果好友没有备注则使用steam名称)"\n\
	 ,: "是否为好友添加称呼 (如果好友设置有备注则使用,否则不添加称呼)"\n\
	 ,: "格式化帮助"\n\
	 ,: "发送评论给选择的好友"\n\
	 ,: "根据国籍发送评论给选择的好友"\n\
	\n\
	,Tabs2: "留言设置"\n\
	 ,: "设置国籍:"\n\
	 ,: "请选择要设置的国籍:"\n\
	 ,: "简体中文"\n\
	 ,: "英语"\n\
	 ,: "日语"\n\
	 ,: "马新简体(马来西亚,新加坡)[zh-sg]"\n\
	 ,: "繁體中文[zh-hant]"\n\
	 ,: "繁體中文(香港)[zh-hk]"\n\
	 ,: "繁體中文(澳门)[zh-mo]"\n\
	 ,: "繁體中文(台湾)[zh-tw]"\n\
	 ,: "为选择的好友设置国籍标识"\n\
	 ,: "为选择的好友取消国籍标识"\n\
	 ,: "设置不留言:"\n\
	 ,: "为选择的好友设置不留言"\n\
	 ,: "为选择的好友取消设置不留言"\n\
	 ,: "设置留言时间间隔:"\n\
	 ,: "只选择日期则过n天后再留言，只选择时间则过x时后再留言(严格模式)，日期和时间都选择了则过n天x时后再留言(严格模式)"\n\
	 ,: "这里其实是一个时间差，比如指定的好友3天留言一次，今天是4月10日，你就选择4月13日就行了，这样做方便一点"\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	,Tabs3: "数据分析"\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	\n\
	,Tabs4: "动态助手"\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	\n\
	,Tabs5: "拓展功能(测试)"\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	\n\
	,Tabs6: "设置",\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""\n\
	 ,: ""*/\n\
	\n\
	},\n\
	{language: "English"\n\
	,mainName: "Steam assistant"\n\
	}\n\
];\n\
'
);

function fixConfInfo(i,steamID){ /*修复配置信息*/
	var isFix = false;
	
	if (g_conf[i].delay < 0){
		isFix = true; g_conf[i].delay = 4;
	}
	if (g_conf[i].strNoOperate == ""){
		isFix = true; g_conf[i].strNoOperate = "(不留言)";
	}
	if (g_conf[i].strRemarkPlaceholder == ""){
		isFix = true; g_conf[i].strRemarkPlaceholder = "{name}";
	}
	
	return isFix;
}

function newUserGuide(steamID){ /*新用户引导*/
	/*新手引导*/
	/*console.log("欢迎使用Steam小助手. 当前版本: 更新时间:");*/
	/*显示简短的教程界面*/
	/*console.log("是否进入教程?");*/
	/*console.log("文字教程: 链接到指南 视频教程: 链接");*/
	/*对配置文件进行初始化，将默认设置作为当前用户的配置信息存储到第一格*/
	var length = g_conf.push(g_default_configuration); /*添加默认配置信息作为新配置信息*/
	g_conf[length-1].steamID = steamID; /*设置当前用户的steamID，作为当前用户的配置信息*/
}

function readUserConfInfoToCurrConfInfo(i){ /*读取用户配置信息到当前配置信息处[0]*/
	g_conf[0].autoLogin = g_conf[i].autoLogin;
	g_conf[0].delay = g_conf[i].delay;
	g_conf[0].strNoOperate = g_conf[i].strNoOperate;
	g_conf[0].strRemarkPlaceholder = g_conf[i].strRemarkPlaceholder;
	g_conf[0].steamID = g_conf[i].steamID;
}

function getProfilesInfo(){ /*获取配置文件信息*/
	
}
function readConfInfo(steamID){ /*读取已保存的对应配置信息*/
	
	if(g_conf.length == 1){ /*说明没有格外的配置信息*/
		newUserGuide(steamID);
	}
	else
	{
		for (let i = 1; i < g_conf.length; i++) { /*遍历所有的配置信息*/
			if(g_conf[i].steamID == steamID){
				readUserConfInfoToCurrConfInfo(i); /*读取用户配置信息到当前配置信息处[0]*/
				return true;
			}
		}
		/*如果没有查找到，则新建用户引导*/
		newUserGuide(steamID);
		return true;
	}
}

function saveConfInfo(steamID){ /*保存最新的配置信息*/
	if(fixConfInfo(0,steamID)){ /*尝试 修复配置信息*/
		console.log("尝试保存的配置信息无效，已经恢复至默认值. 请检查...");
	}
	/*从0号中读取出来，存储到对应的位置*/
	
}

function initConfInfo(i,steamID){ /*配置信息初始化(恢复默认)*/
	g_conf[i].autoLogin = g_default_configuration.autoLogin;
	g_conf[i].delay = g_default_configuration.delay;
	g_conf[i].strNoOperate = g_default_configuration.strNoOperate;
	g_conf[i].strRemarkPlaceholder = g_default_configuration.strRemarkPlaceholder;
	g_conf[i].steamID = g_default_configuration.steamID;
}

function exportConfInfo(steamID){ /*导出配置信息(到文件)*/
	if(fixConfInfo(0,steamID)){ /*尝试 修复配置信息*/
		console.log("尝试导出的配置信息无效，已经恢复至默认值. 请检查...");
	}
	/*从0号中读取出来，导出到文件*/
	
}

function importConfInfo(steamID){ /*导入配置信息(选择文件并读取)*/
	/*从文件中读取配置信息，导入到0号配置*/
	
	if(fixConfInfo(0,steamID)){ /*尝试 修复配置信息*/
		console.log("尝试导入的配置信息无效，已经恢复至默认值. 请检查...");
	}
	
	/*保存配置文件*/
}

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123,
			}
			
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}

//-------------------------------------------------------------------------------------------------------------
// 实用函数集
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function opinion() { //判断页面是pc端还是移动端
	if ((navigator.userAgent.match(
			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		))) {
		return 1; //移动端
	} else {
		return 0; //pc端
	}
}

function JSON_processing_parsing_JsObj(jsonText){ //JSON处理并解析到js对象
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

function loadjscssFile(filePath, filetype) { //动态加载一个js/css文件
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

async function getResourceByURL(resourceURL,retDataMode){ //获取URL对应的资源数据
	var retData;
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
				
				//returnData = ; //存储数据
				waitStatus = false; //不等待
			} else {
				console.log('getResourceByURL()请求失败!');
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('getResourceByURL()请求错误!', err);
		}
	});
	
	while (waitStatus) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	//console.log(retData);
	return retData;
}

async function getResourceByURL_Test(resourceURL){ //获取URL对应的资源数据
	var retData;
	var waitStatus = true;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: resourceURL,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
			//'Accept': 'application/atom+xml,application/xml,text/xml',
			//"Content-Type": "application/x-www-form-urlencoded",
			"Host": "steamcommunity.com",
			"Referer": "https://steamcommunity.com/id/miku-39/",
			"Cookie": document.cookie,
		},
		onload: function(response) {
			if (response.status === 200) {
				console.log('getResourceByURL()请求成功!');
				
				retData = response.responseText;
				
				//returnData = ; //存储数据
				waitStatus = false; //不等待
			} else {
				console.log('getResourceByURL()请求失败!');
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('getResourceByURL()请求错误!', err);
		}
	});
	
	while (waitStatus) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	//console.log(retData);
	return retData;
}



async function getResourceByURL_Test1(resourceURL) {
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
	while (waitStatus) //强制等待异步函数执行完毕后再执行
	{
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


	// GM_xmlhttpRequest({
	// 	method: 'GET',
	// 	url: URL,
	// 	headers: {
	// 		'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
	// 		//'Accept': 'application/atom+xml,application/xml,text/xml',
	// 		//"Content-Type": "application/x-www-form-urlencoded",
	// 	},
	// 	onload: function(response) {
	// 		if (response.status === 200) {
	// 			console.log('请求成功!',response.responseText);
	// 			//var JSON_jsObj = JSON_processing_parsing_JsObj(response.responseText);
	// 			//遍历[0][0]数组就可以取得翻译后的文本,原始数据,原始数据的拼音
	// 			//[2]是检查出的语言
	// 			//遍历[5]可以取得两种翻译,原始数据和原始数据的长度
	// 			//遍历[8]可以得到原始语言和翻译语言
	// 			//for (var i = 0; i < JSON_jsObj.length; i++) {
	// 			//	for (var j = 0; j < JSON_jsObj[i].length; j++) {
	// 			//		for (var k = 0; k < JSON_jsObj[i][j].length; k++) {
	// 			//			
	// 			//		}
	// 			//	}
	// 			//}
	// 			//var retData = "";
	// 			//for (var j = 0; j < JSON_jsObj[0].length; j++) {
	// 			//	if (JSON_jsObj[0][j][0] != null) {
	// 			//		retData += JSON_jsObj[0][j][0]; //组合每一句翻译
	// 			//	}
	// 			//}
	// 			returnData = retData; //存储数据
	// 			//console.log('谷歌翻译:',retData);
	// 			waitStatus = false; //不等待

	// 			//console.log(response);
	// 			//console.log(response.responseText);
	// 			//if(response.responseText.indexOf('[[["') == 0) //是否是指定的数据格式
	// 			//{
	// 			//	var retData = response.responseText.slice(4,response.responseText.indexOf('","',4)); //提取翻译后的文本
	// 			//	returnData = retData; //存储数据
	// 			//	//console.log('谷歌翻译:',retData);
	// 			//	waitStatus = false; //不等待
	// 			//}
	// 		} else {
	// 			console.log('请求失败!');
	// 			//console.log(response);
	// 			//console.log(response.responseText);
	// 		}
	// 	},
	// 	onerror: function(err) {
	// 		console.log('请求错误!', err);
	// 	}
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
//Arguments实用函数
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
class Log {
	constructor(moduleName, debugStatus = true) { /*构造方法(模块名称,调试状态)*/ //默认开启调试
		this.m_moduleNamel = moduleName; //设置模块名称
		g_conf[0].is_Debug = debugStatus; //设置调试状态
	}
	setDebugStatus(debugStatus = true) { //设置调试状态(调试状态) //控制是否进行调试输出
		g_conf[0].is_Debug = debugStatus;
	}
	clear() { //清除控制台输出
		console.clear();
	}
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
	out(strLog) { //直接输出，不受调试状态的影响
		console.log('%c[' + this.m_moduleNamel + ' out]%c' + Arguments.getArgumentsAllValue(arguments),
			'color:#000000; font-weight:bold;', 'color:#000000;');
	}
	//两种版本
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

var g_ai = null;
var g_steamdb = null;

class intelligenceAI //智能AI模块
{
	constructor(name) { //public 构造方法
		this.arrCityCode;
		this.baseWeatherURL = "https://api.help.bj.cn/";
	}
	
	getWeather(strCityName){ //public 获取天气(城市代码字符串)
		let URL = this.baseWeatherURL + "apis/weather2d/?id=" + strCityName; //生成URL
		$.ajax({
			type: "Get", //请求方式
			//async: false,
			//contentType: "application/json;charset=UTF-8",//请求的媒体类型
			url: URL, //请求地址
			// headers: {
			// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
			// 	//'Accept': 'application/atom+xml,application/xml,text/xml',
			// 	//"Content-Type": "application/x-www-form-urlencoded",
			// },
			//data: JSON.stringify(list),				//数据，json字符串
			success: function(result) { //请求成功
				//let Data = JSON_processing_parsing_JsObj(result);
				console.log("Data",result);
			},
			error: function(e) { //请求失败，包含具体的错误信息
				console.log("请求失败了!", e.status);
				console.log("请求失败了!", e.responseText);
			}
		});
	}
}

// if(!g_ai)
// {
// 	g_ai = new intelligenceAI();
// 	ai.getWeather('北京');
// }
//-------------------------------------------------------------------------------------------------------------
class externalApis{
	constructor(){
		this.urls = [
			{
				name: "mz-moe.cn", //名称
				describe: "https://mz-moe.cn/?p=23", //描述
				trait: "Support files only,https,406张图片(2019.8.12)", //特征
				request: "get", //请求方式
				mainUrl: "https://api.mz-moe.cn/", //基础url
				library: [
					{
						name: "随机动漫图片api", //https://api.dongmanxingkong.com/suijitupian.html
						Url: "img.php", //功能url(部分)
						Url1: "", //功能url1(部分)
						parameter: "", //参数
						parameter1: "" //参数1(另外一种类型)
					},
				]
			},{
				name: "樱花", //名称
				describe: "http://www.dmoe.cc/", //描述
				trait: "http->https,1000+(2020-03-12)", //特征
				request: "get", //请求方式
				mainUrl: "http://www.dmoe.cc/", //基础url
				library: [
					{
						name: "随机二次元图片API", //https://api.dongmanxingkong.com/suijitupian.html
						Url: "random.php", //功能url(部分)
						Url1: "", //功能url1(部分)
						parameter: "?return=json", //参数
						parameter1: "type=json" //参数1(另外一种类型)
					},
				]
			},{
				name: "动漫星空", //名称
				describe: "https://api.dongmanxingkong.com/", //描述
				trait: "https,8千万+张4K精美图片,文字二维码生成", //特征
				request: "get", //请求方式
				mainUrl: "https://api.dongmanxingkong.com/", //基础url
				library: [
					{
						name: "随机图片API", //https://api.dongmanxingkong.com/suijitupian.html
						Url: ["suijitupian/acg/1080p/","suijitupian/acg/2k/","suijitupian/acg/4k/"], //功能url(部分)
						Url1: "index.php", //功能url1(部分)
						parameter: "?return=json", //参数
						parameter1: "type=json" //参数1(另外一种类型)
					},{
						name: "二维码API", //https://api.dongmanxingkong.com/qr.html
						Url: "qr/?text=", //功能url(部分)
						Url1: "&size=150", //功能url1(部分)
						parameter: "", //参数
						parameter1: "" //参数1(另外一种类型)
					}
				]
			},{
				name: "LRY_API(聚合漫画、影视、小说等接口)", //名称
				describe: "http://api.pingcc.cn/", //描述
				trait: "warn redirection,http,综合搜索,漫画,影视,小说", //特征
				request: "get", //请求方式
				mainUrl: "http://api.pingcc.cn/", //基础url
				library: [
					{
						name: "综合搜索", //https://api.dongmanxingkong.com/suijitupian.html
						Url: "?name=", //功能url(部分)
						Url1: "", //功能url1(部分)
						parameter: "", //参数
						parameter1: "" //参数1(另外一种类型)
					},{
						name: "漫画API接口", //https://api.dongmanxingkong.com/qr.html
						Url: "?mhname=", //功能url(部分)
						Url1: ["?mhurl1=","?mhurl2="], //功能url1(部分) //通过mhurl2获取到的是漫画图片，按顺序排列
						parameter: "", //参数
						parameter1: "" //参数1(另外一种类型)
					},{
						name: "影视API接口", //https://api.dongmanxingkong.com/qr.html
						Url: "?ysname=", //功能url(部分)
						Url1: "?ysurl=", //功能url1(部分)
						parameter: "", //参数
						parameter1: "" //参数1(另外一种类型)
					},{
						name: "小说API接口", //https://api.dongmanxingkong.com/qr.html
						Url: "?xsname=", //功能url(部分)
						Url1: ["?xsurl1=","?xsurl2="], //功能url1(部分) //通过xsurl2获取到的是小说内容
						parameter: "", //参数
						parameter1: "" //参数1(另外一种类型)
					}
				]
			},{
				name: "宅言API", //名称
				describe: "https://www.kancloud.cn/acman/zhaiyanapi/31183", //描述
				trait: "https,动漫台词,角色资料,番组信息接口", //特征
				request: "get", //请求方式
				mainUrl: "https://zhaiyan.2cys.com/api", //基础url
				library: [
					{
						name: "获取随机库中台词", //https://www.kancloud.cn/acman/zhaiyanapi/367018
						Url: "/taici/rands", //功能url(部分)
						Url1: "", //功能url1(部分)
						parameter: "?type=json", //参数
						parameter1: "json(默认)/xml/text" //参数1(另外一种类型)
					},{
						name: "根据库ID获取台词", //https://www.kancloud.cn/acman/zhaiyanapi/367019
						Url: "/taici/id", //功能url(部分)
						Url1: "", //功能url1(部分) //通过mhurl2获取到的是漫画图片，按顺序排列
						parameter: "?id=", //参数
						parameter1: "?type=json" //参数1(另外一种类型)
					},{
						name: "根据作品名获取数据", //https://www.kancloud.cn/acman/zhaiyanapi/367152
						Url: "/taici/names", //功能url(部分)
						Url1: "", //功能url1(部分)
						parameter: "?name=", //参数
						parameter1: ["?rand=0","?type=json"] //参数1(其他参数)
					},{
						name: "动漫角色资料接口", //https://www.kancloud.cn/acman/zhaiyanapi/48115
						Url: "", //功能url(部分)
						Url1: "", //功能url1(部分) //通过xsurl2获取到的是小说内容
						parameter: "", //参数
						parameter1: "" //参数1(另外一种类型)
					},{
						name: "获取随机库中番组", //https://www.kancloud.cn/acman/zhaiyanapi/368479
						Url: "/bangumi/rands", //功能url(部分)
						Url1: "", //功能url1(部分) //通过xsurl2获取到的是小说内容
						parameter: "?type=json", //参数
						parameter1: "" //参数1(另外一种类型)
					}
				]
			}
			
		];
	}
	getUrlInfo(){
		console.log(this.urls);
	}
	async getDataByApiList(platformsID,apiId,type,name){ //参数: 平台id(区别不同平台提供的api),要调用的api的id(区分是要调用的是什么api),类型(调用api可能需要提供的参数),名称(调用api可能需要提供的参数)
		switch (platformsID){
			case 0:
				var obj = this.urls[0]; //mz-moe.cn
				var lib = obj.library[0]; //随机动漫图片api
				var url = obj.mainUrl + lib.Url;
				console.log("url",url);
				var jsData = await getResourceByURL(url,true); //随机动漫图片api
				console.log("数据获取成果",jsData);
				return jsData;
				break;
			case 1:
				var obj = this.urls[1]; //樱花
				var lib = obj.library[0]; //随机二次元图片API
				console.log("url",url);
				
				var url = obj.mainUrl + lib.Url;
				if(type == "json")
					url += lib.parameter;
				var jsData = await getResourceByURL(url,true); //随机二次元图片API
				console.log("数据获取成果",jsData);
				return jsData;
				break;
			case 2:
				var obj = this.urls[2]; //动漫星空
				var lib = obj.library[0];  //随机图片API
				var lib1 = obj.library[1]; //二维码API
				var url = obj.mainUrl + lib.Url[0] + lib.Url1;
				if(type == "json")
					url += lib.parameter;
				var url1 = obj.mainUrl + lib1.Url + name + lib1.Url1;
				console.log("url",url,"url1",url1);
				var jsData;
				if(apiId == 0){
					jsData = await getResourceByURL(url,true); //随机图片API
				}else if(apiId == 1){
					jsData = await getResourceByURL(url1,true); //二维码API
				}
				console.log("数据获取成果",jsData);
				return jsData;
				break;
			case 3:
				var obj = this.urls[3]; //LRY_API(聚合漫画、影视、小说等接口)
				var lib = obj.library[0];  //综合搜索
				var lib1 = obj.library[1]; //漫画API接口
				var lib2 = obj.library[2]; //影视API接口
				var lib3 = obj.library[3]; //小说API接口
				var url = obj.mainUrl + lib.Url  + name;
				var url1 = obj.mainUrl + lib1.Url + name;
				var url2 = obj.mainUrl + lib2.Url + name;
				var url3 = obj.mainUrl + lib3.Url + name;
				console.log("url",url,"url1",url1,"url2",url2,"url3",url3);
				var jsData;
				if(apiId == 0){
					jsData = await getResourceByURL(url,true); //综合搜索
				}else if(apiId == 1){
					jsData = await getResourceByURL(url1,true); //漫画API接口
				}else if(apiId == 2){
					jsData = await getResourceByURL(url2,true); //影视API接口
				}else if(apiId == 3){
					jsData = await getResourceByURL(url3,true); //小说API接口
				}
				console.log("数据获取成果",jsData);
				return jsData;
				break;
			case 4:
				var obj = this.urls[4]; //宅言API
				var lib = obj.library[0];  //获取随机库中台词
				var lib1 = obj.library[1]; //根据库ID获取台词
				var lib2 = obj.library[2]; //根据作品名获取数据
				var lib3 = obj.library[3]; //动漫角色资料接口
				var lib4 = obj.library[4]; //获取随机库中番组
				var url = obj.mainUrl + lib.Url + lib.parameter;
				var url1 = obj.mainUrl + lib1.Url + lib1.parameter + name + lib1.parameter1;
				var url2 = obj.mainUrl + lib2.Url + lib2.parameter + name + lib2.parameter1[0] +  + lib2.parameter1[1];
				var url3 = obj.mainUrl + lib3.Url + lib3.parameter;
				var url4 = obj.mainUrl + lib4.Url + lib4.parameter + lib4.parameter;
				console.log("url",url,"url1",url1,"url2",url2,"url3",url3,"url4",url4);
				var jsData;
				if(apiId == 0){
					jsData = await getResourceByURL(url,true); //获取随机库中台词
				}else if(apiId == 1){
					jsData = await getResourceByURL(url1,true); //根据库ID获取台词
				}else if(apiId == 2){
					jsData = await getResourceByURL(url2,true); //根据作品名获取数据
				}else if(apiId == 3){
					jsData = await getResourceByURL(url3,true); //动漫角色资料接口
				}else if(apiId == 4){
					jsData = await getResourceByURL(url4,true); //获取随机库中番组
				}
				console.log("数据获取成果",jsData);
				return jsData;
				break;
			default:
				break;
		}//switch
	}
	
}

//-------------------------------------------------------------------------------------------------------------
class SteamDB
{
	constructor(){
		this.mainURL = "https://steamdb.info/";
		this.freeGameURL = "upcoming/free/";
	}
	async initUI(gameInfo){ //初始化UI
		// jQuery(".friends_header_ctn").after(
		// 	'<div id="GameFreeInfo">\
		// 			<div id="add1_head">喜加一</div>\
		// 			<div id="add1_body" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/">\
		// 			</div>\
		// 			<div id="limitedTime_head">限时免费</div>\
		// 			<div id="limitedTime_body" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/">\
		// 			</div>\
		// 			<div id="prediction_head">预告</div>\
		// 			<div id="prediction_body" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/">\
		// 			</div>\
		// 	</div>'
		// );
		console.log("initUI success!");
	}
	async GameFreeInfoHelper(){ //游戏免费信息助手
		console.log("GameFreeInfoHelper call...");
		initUI(data); //初始化UI
		
		console.log("GameFreeInfoHelper success!");
	}
	async getFreeGameInfo(){ //获取游戏喜加一信息(SteamDB)
		var url = this.mainURL + this.freeGameURL;
		var jsData = await getResourceByURL(url,true); //
		console.log("数据获取成果",jsData);
	}
	async getGameDiscountsInfoBysteamDB(){ //获取游戏折扣信息(SteamDB,HB,F站...)
		const url_fanatical = "https://www.fanatical.com/";
		const url_humblebundle = "https://www.humblebundle.com/";
		const url_indiegala = "http://indiegala.com/";
		const url_steam = "https://store.steampowered.com/search/?filter=topsellers&specials=1";
	}
}
// if(!g_steamdb)
// {
// 	g_steamdb = new SteamDB();
// 	g_steamdb.getFreeGameInfo();
// }
//-------------------------------------------------------------------------------------------------------------
// 模块 Steam游戏搜索集合 与 Steam游戏页面/捆绑包页面

//杉果游戏
//1.请求 http://www.sonkwo.hk/store/search?keyword=GameName，手动解析数据
//2.判断搜索结果
//3.处理并打包数据，添加到Steam游戏助手
//-------------------------------------------------------------------------------------------------------------
//Fanatical (慢速警告)
//1.请求 https://www.fanatical.com/zh-hans/search?search=GameName，手动解析数据
//2.判断搜索结果
//3.处理并打包数据，添加到Steam游戏助手
//-------------------------------------------------------------------------------------------------------------
//humblebundle (慢速警告)
//1.请求 https://www.humblebundle.com/store/search?sort=bestselling&search=GameName，手动解析数据
//2.判断搜索结果
//3.处理并打包数据，添加到Steam游戏助手
//-------------------------------------------------------------------------------------------------------------
//驰游商城
//1.请求 https://www.ccyyshop.com/bundles，手动解析数据
//2.遍历所有页面，存储游戏数据
//3.判断存储的数据是否有目标搜索结果
//4.如果有则处理并打包数据，添加到Steam游戏助手
//-------------------------------------------------------------------------------------------------------------
//第三方网站抓取，比如  https://isthereanydeal.com/ajax/game/info?plain=nierautomata

//-------------------------------------------------------------------------------------------------------------
// steam api
function setRemarks(profileID, remarkName) {
	var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
	jQuery.post(URL, {
		nickname: remarkName,
		sessionid: g_sessionID
	}, function(response) {
		if (response.success === false) {
			console.log("设置备注失败了!");
		} else {
			console.log("成功设置备注于");
		}
	}).fail(function() {
		console.log("无法设置备注于");
	}).always(function() {
		//console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
	});
}
//-------------------------------------------------------------------------------------------------------------
function getUserLocation(profileID) //获取用户位置()
{
	var name = document.getElementsByClassName("header_real_name ellipsis")[0].getElementsByTagName("bdi")[0].innerText;
	var str = document.getElementsByClassName("header_real_name ellipsis")[0].innerText;
	var index = str.indexOf(name);
	var strLocation = "";
	var arrLocation = [];
	if( index != -1)
	{
		strLocation = str.slice(index+name.length); //裁剪，获取地址位置字符串
		strLocation = strLocation.replace(/\s+/g,""); //去除所有的空格
		if(strLocation == "")
		{
			return null; //没有获取到数据
		}
		arrLocation = strLocation.split(',');
	}
	console.log("arrLocation",arrLocation);
	for (let i = arrLocation.length-1; i >= 0; i--) {
		console.log(arrLocation[i]);
		return arrLocation;
	}
}
// var ret = getUserLocation();
// if(ret != null)
// {
// 	if(ret>1)
// 	{
// 		getCityChinsesNameByEnglishName(ret[0]);
// 	}
// }

function getUserCommentData(profileID) //获取用户的评论的大数据(用户64位id)
{
	var date = new Date();
	
	jQuery.post("//steamcommunity.com/comment/Profile/post/" + profileID + "/-1/", {
		comment: newMgs,
		count: 6,
		sessionid: g_sessionID
	}, function(response) {
		if (response.success === false) {
			jQuery("#log_body")[0].innerHTML +=
				"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
				"\">" + '[' + (i + 1) + '/' + total + '] 留言失败了! ' + profileID + '  ' + name +
				'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
		} else {
			jQuery("#log_body")[0].innerHTML +=
				'[' + (i + 1) + '/' + total + '] ' +
				"成功发表评论于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
				profileID + '  ' + name + "</a>" +
				"<span> → </span><a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
				profileID + "\">" + newMgs + "</a><br>";
		}
	}).fail(function() {
		jQuery("#log_body")[0].innerHTML +=
			'[' + (i + 1) + '/' + total + '] ' +
			"<span style='color:#DA2626;'>无法发表评论于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
			profileID + "\">" +
			profileID + '  ' + name + "</a></span><br>";
	}).always(function() {
		jQuery("#log_head").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
	});
}

function setSaveUserCommentData(profileID,str) //设置已保存的用户评论数据
{
	
}

function getSaveUserCommentData(profileID) //获取已保存的用户评论数据
{
	
}


var jqobj;

function traverseAllFriend() //遍历所有好友
{
	function concurrentPoll() {
		this.tasks = []; // 任务队列  
		this.max = 100; // 最大并发数  
		setTimeout(() => { // 函数主体执行完后立即执行  
			this.run()
		}, 0);
	}
	concurrentPoll.prototype.addTask = function(task) { // 原型添加任务方法  
		this.tasks.push(task)
	}
	concurrentPoll.prototype.run = function() { // 原型任务运行方法  
		if (this.tasks.length == 0) { // 判断是否还有任务  
			return
		}
		var min = Math.min(this.tasks.length, this.max); // 取任务个数与最大并发数最小值  
		for (var i = 0; i < min; i++) {
			this.max--; // 执行最大并发递减  
			var task = this.tasks.shift(); // 从数组头部取任务  
			task().then((res) => { // 重：此时可理解为，当for循环执行完毕后异步请求执行回调,此时max变为0  
				console.log(res)
			}).catch((err) => {
				console.log(err)
			}).finally(() => { // 重：当所有请求完成并返回结果后，执行finally回调，此回调将按照for循环依次执行，此时max为0.  
				this.max++; // 超过最大并发10以后的任务将按照任务顺序依次执行。此处可理解为递归操作。  
				this.run();
			})
		}
	}
	var poll = new concurrentPoll(); // 实例
	//并发多个相同任务

	jqobj = jQuery(".selectable[data-steamid]"); //选择所有好友
	//for (let i = 0; i < jqobj.length; i++) {
	for (let i = 0; i < 1; i++) {
		let cur = jqobj.get(i);
		let profileID = cur.getAttribute("data-steamid");
		poll.addTask(function() {
			return new Promise(
				function(resolve, reject) {
					// 一段耗时的异步操作
					getProfilesInfo(resolve, reject, i, profileID);
				})
		})
	}
	console.log("完毕!");

	// for (let i=0; i<23; i++) { // 数据模拟  
	//   poll.addTask(function () {  
	//   return new Promise(  
	//   function (resolve, reject) {  
	//   // 一段耗时的异步操作
	//   getProfilesInfo(resolve, reject,i,"76561198818854009");
	//   })})
	//   }


	// poll.addTask(async function () {  

	// 	//let arr = [fun(0),fun(1),fun(2)];
	// 	let arr = [];
	// 	for (var i=0; i<13; i++) { // 数据模拟
	// 		//arr.push(fun(i));
	// 		arr.push(new Promise(function (resolve, reject){getProfilesInfo(i,"76561198818854009");}));
	// 	}
	// 	let res = await Promise.all(arr);
	//  return res;
	//  // new Promise(
	//  //  function (resolve, reject) {  
	//  //  // 一段耗时的异步操作
	//  //  getProfilesInfo("76561198818854009");
	//  //  resolve('成功') // 数据处理完成  
	//  //  // reject('失败') // 数据处理出错
	//  //  })

	//  })

}

var waitStatus1 = []; //等待状态
var returnData1 = []; //返回数据
async function getgetProfilesID(i, profileID) {
	let URL = "https://steamcommunity.com/profiles/" + profileID + "/";

	if (waitStatus1.length == 0)
		waitStatus1.length = jqobj.length; //设置数组长度

	if (returnData1.length == 0)
		returnData1.length = jqobj.length; //设置数组长度

	//waitStatus1.push([profileID,true]); //开始等待
	waitStatus1[i] = [profileID, true]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
	//console.log("getgetProfilesID() i:",i,"waitStatus1:",waitStatus1);

	jQuery.ajax({
		type: "Get", //请求方式
		//async: false,
		//contentType: "application/json;charset=UTF-8",//请求的媒体类型
		url: URL, //请求地址
		// headers: {
		// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
		// 	//'Accept': 'application/atom+xml,application/xml,text/xml',
		// 	//"Content-Type": "application/x-www-form-urlencoded",
		// },
		//data: JSON.stringify(list),				//数据，json字符串
		success: function(result) { //请求成功
			let Data = result;
			//console.log("请求成功了!",Data);
			let nIstart = Data.indexOf('StartTradeOffer(');
			let nIend = Data.indexOf(');', nIstart);
			let AccountID = Data.slice(nIstart + 'StartTradeOffer('.length + 1, nIend - 1);
			nIstart = Data.indexOf('"steamid":"');
			nIend = Data.indexOf('",', nIstart);
			let profileID = Data.slice(nIstart + '"steamid":"'.length, nIend);
			console.log("getgetProfilesID() i:", i, "AccountID:", AccountID, "profileID:", profileID);

			for (let i = 0; i < waitStatus1.length; i++) {
				if (waitStatus1[i][0] == profileID) //是否是同一个用户
				{
					if (waitStatus1[i][1] == false) //这个用户是否已经获取过了(测试多个相同用户信息的获取)
						continue;
					waitStatus1[i][1] = false;
					//returnData1.push(AccountID); //存储数据
					returnData1[i] = AccountID; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
					//console.log("getgetProfilesID() 成功存储数据 AccountID:",AccountID);
					return;
					//console.log("waitStatus1[i][1] break",i,waitStatus1[i][1]);
				}
			}
			console.log("getgetProfilesID 数据错误!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			console.log("waitStatus1:", waitStatus1, 'returnData1:', returnData1);
			console.log('profileID:', profileID, 'AccountID:', AccountID);
			return;
			//console.log("DBG!",nIstart,nIend);
		},
		error: function(e) { //请求失败，包含具体的错误信息
			console.log("请求失败了!", e.status);
			console.log("请求失败了!", e.responseText);
		}
	});
	//console.log("getgetProfilesID() i:",i,"waitStatus1:",waitStatus1);
	while (waitStatus1[i][1]) //强制等待异步函数执行完毕后再执行
	{
		//console.log("wait...",i,waitStatus1[i][1]);
		await sleep(50); //延迟0.1秒
	}
	//console.log("waitStatus1[i][1]:",waitStatus1[i][1],"returnData1[i]:",returnData1[i]);
	return returnData1[i];

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


	// GM_xmlhttpRequest({
	// 	method: 'GET',
	// 	url: URL,
	// 	headers: {
	// 		'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
	// 		//'Accept': 'application/atom+xml,application/xml,text/xml',
	// 		//"Content-Type": "application/x-www-form-urlencoded",
	// 	},
	// 	onload: function(response) {
	// 		if (response.status === 200) {
	// 			console.log('请求成功!',response.responseText);
	// 			//var JSON_jsObj = JSON_processing_parsing_JsObj(response.responseText);
	// 			//遍历[0][0]数组就可以取得翻译后的文本,原始数据,原始数据的拼音
	// 			//[2]是检查出的语言
	// 			//遍历[5]可以取得两种翻译,原始数据和原始数据的长度
	// 			//遍历[8]可以得到原始语言和翻译语言
	// 			//for (var i = 0; i < JSON_jsObj.length; i++) {
	// 			//	for (var j = 0; j < JSON_jsObj[i].length; j++) {
	// 			//		for (var k = 0; k < JSON_jsObj[i][j].length; k++) {
	// 			//			
	// 			//		}
	// 			//	}
	// 			//}
	// 			//var retData = "";
	// 			//for (var j = 0; j < JSON_jsObj[0].length; j++) {
	// 			//	if (JSON_jsObj[0][j][0] != null) {
	// 			//		retData += JSON_jsObj[0][j][0]; //组合每一句翻译
	// 			//	}
	// 			//}
	// 			returnData = retData; //存储数据
	// 			//console.log('谷歌翻译:',retData);
	// 			waitStatus = false; //不等待

	// 			//console.log(response);
	// 			//console.log(response.responseText);
	// 			//if(response.responseText.indexOf('[[["') == 0) //是否是指定的数据格式
	// 			//{
	// 			//	var retData = response.responseText.slice(4,response.responseText.indexOf('","',4)); //提取翻译后的文本
	// 			//	returnData = retData; //存储数据
	// 			//	//console.log('谷歌翻译:',retData);
	// 			//	waitStatus = false; //不等待
	// 			//}
	// 		} else {
	// 			console.log('请求失败!');
	// 			//console.log(response);
	// 			//console.log(response.responseText);
	// 		}
	// 	},
	// 	onerror: function(err) {
	// 		console.log('请求错误!', err);
	// 	}
	// });
}

var waitStatus = []; //等待状态
var returnData = []; //返回数据
async function getProfilesInfo(resolve, reject, i, profileID) {
	let joinDate, friendDate;
	let str;

	if (waitStatus.length == 0)
		waitStatus.length = jqobj.length; //设置数组长度

	if (returnData.length == 0)
		returnData.length = jqobj.length; //设置数组长度

	jQuery.ajaxSetup({
		cache: false
	}); //close AJAX cache

	////获取一个数组真实长度
	//let arrRealLength = undefined;
	//for (let i = 0; i < waitStatus.length; i++) {
	//	if(waitStatus[i] == undefined)
	//	{
	//		arrRealLength = i;
	//		break;
	//	}
	//}
	//if(arrRealLength == undefined) //是否为数组最大长度
	//	arrRealLength = waitStatus.length;


	//waitStatus.push([profileID,true]); //开始等待
	waitStatus[i] = [profileID, true]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)

	await getgetProfilesID(i, profileID); //

	let AccountID = returnData1[i];
	//console.log("getProfilesInfo(): AccountID:",AccountID,'i:',i,"returnData[i]:",returnData[i]);
	//var AccountID = "242752742";//242752742//858588281

	let URL = "https://steamcommunity.com/tradeoffer/new/?partner=" + AccountID;

	jQuery.ajax({
		type: "Get", //请求方式
		//async: false,
		//contentType: "application/json;charset=UTF-8",//请求的媒体类型
		url: URL, //请求地址
		// headers: {
		// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
		// 	//'Accept': 'application/atom+xml,application/xml,text/xml',
		// 	//"Content-Type": "application/x-www-form-urlencoded",
		// },
		//data: JSON.stringify(list),				//数据，json字符串
		success: function(result) { //请求成功
			let Data = result;
			if (Data.indexOf("抱歉，发生了某种错误：") != -1) //不能正常进行交易,获取不到数据就跳过
			{
				waitStatus[i][1] = false;
				returnData[i] = null; //不返回数据
				return;
			}
			//console.log("请求成功了!",Data);
			let nIstart = Data.indexOf('trade_partner_member_since trade_partner_info_text');
			if (nIstart == -1) {
				nIstart = Data.indexOf('trade_partner_header responsive_trade_offersection top');
				let nindex = Data.indexOf('trade_partner_info_text">', nIstart);
				let nIend = Data.indexOf('</div>', nindex);
				friendDate = Data.slice(nindex + 'trade_partner_info_text">'.length, nIend); //加入Steam的日期
				friendDate = friendDate.replace(/^\s+|\s+$/g, ""); //去除左右两边的空格
				joinDate = "查询不到";
				nIstart = Data.lastIndexOf('g_ulTradePartnerSteamID');
				nIindex = Data.indexOf('\'', nIstart);
				nIend = Data.indexOf('\'', nIindex + 1);
				profileID = Data.slice(nIindex + 1, nIend);
				//console.log("profileID",profileID);
			} else {
				let nIindex = Data.indexOf('>', nIstart);
				let nIend = Data.indexOf('</div>', nIindex);
				joinDate = Data.slice(nIindex + 1, nIend); //加入Steam的日期
				//console.log("joinDate",joinDate);
				nIstart = Data.indexOf('trade_partner_info_text');
				nIindex = Data.indexOf('>', nIstart);
				nIend = Data.indexOf('</div>', nIindex);
				friendDate = Data.slice(nIindex + 1, nIend - 1); //成为好友的日期
				friendDate = friendDate.replace(/^\s+|\s+$/g, ""); //去除左右两边的空格
				//console.log("friendDate",friendDate);
				nIstart = Data.lastIndexOf('g_ulTradePartnerSteamID');
				nIindex = Data.indexOf('\'', nIstart);
				nIend = Data.indexOf('\'', nIindex + 1);
				profileID = Data.slice(nIindex + 1, nIend);
				//console.log("profileID",profileID);
			}

			for (let i = 0; i < waitStatus.length; i++) {
				if (waitStatus[i][0] == profileID) //是否是同一个用户
				{
					if (waitStatus[i][1] == false) //这个用户是否已经获取过了(测试多个相同用户信息的获取)
						continue;
					waitStatus[i][1] = false;
					//returnData.push([joinDate,friendDate]); //存储数据
					returnData[i] = [joinDate, friendDate]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
					//console.log("waitStatus[i][1] break",i,waitStatus[i][1]);
					return;
				}

			}
			console.log("getProfilesInfo 数据错误!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			console.log("waitStatus:", waitStatus, "returnData:", returnData);
			console.log("profileID", profileID);
			//console.log("Data",Data);
			return;
			//console.log("DBG!",nIstart,nIend);
		},
		error: function(e) { //请求失败，包含具体的错误信息
			console.log("请求失败了!", e.status);
			console.log("请求失败了!", e.responseText);
		}
	});

	while (waitStatus[i][1]) //强制等待异步函数执行完毕后再执行
	{
		//console.log("wait...",i,waitStatus[i][1]);
		await sleep(50); //延迟0.1秒
	}
	if (returnData[i] == null) //检查数据有效性
	{
		console.log("str [" + (i + 1) + "] 不能获取到数据,已跳过: https://steamcommunity.com/profiles/" + profileID);
		return;
	}
	console.log("waitStatus[i][1]:", waitStatus[i][1], "waitStatus[i]:", waitStatus[i]);

	str = "加入日期: " + returnData[i][0] + " 成为好友日期: " + returnData[i][1];
	console.log("str [" + (i + 1) + ']', str);
	resolve('成功') // 数据处理完成
	// reject('失败') // 数据处理出错
	return str;
}

// let arr = [];
// for (var i=0; i<1; i++) { // 数据模拟
// 	//arr.push(fun(i));
// 	arr.push(new Promise(function (resolve, reject){getProfilesInfo(1,2,i,"76561198818854009");}));
// }
// let res = await Promise.all(arr);

// var jqobj = jQuery(".selectable[data-steamid]"); //选择所有好友
// let arr = [];
// for (var i=0; i<20; i++) { // 数据模拟
// let cur = jqobj.get(i);
// let profileID = cur.getAttribute("data-steamid");
// 	//arr.push(fun(i));
// 	//getProfilesInfo(1, 2,i,profileID);
// 	arr.push(new Promise(function (resolve, reject){getProfilesInfo(1, 2,i,profileID);}));
// }
// let res = await Promise.all(arr);

//------------------------------------------------------------------------------------------------------------------------------------------
//好友动态自动点赞和评论
//miku-39

function isIntNum(val){
    var regPos = /^\d+$/; // 非负整数
    if(regPos.test(val)){
        return true;
    }else{
        return false;
    }
}

class friendActivity{
	constructor(profileID_Url) { /*构造方法(用户id或者自定义链接)*/
		this.steamCommunityUrl = "https://steamcommunity.com/";
		this.customUrl = "id/";
		this.profileIDUrl = "profiles/";
		this.friendActivitUrl = "/home";
		this.friendActivitOptionUrl = "/blotteredit";
		
		this.startElementsId = "blotter_content";
		this.endElementsId = "blotter_throbber";
		this.jsName = "g_BlotterNextLoadURL";
		this.friendActivityElementsBlockId = "blotter_block";
		
		this.isYun = false;
		
		//游戏评测
		this.UserEvaluationUp = "UserReviewVoteUp"; //用户评价 是 的函数名
		this.UserEvaluationDown = "UserReviewVoteDown"; //用户评价 否 的函数名
		this.UserEvaluationHappy = "UserReviewVoteTag"; //用户评价 欢乐 的函数名
		//上传载图、收藏载图
		//指南添加到收藏夹、发表指南
		//创意工坊物品添加到收藏夹、创意工坊合集添加到收藏夹、发布创意工坊物品 (发布创意工坊合集?? 没有找到相关动态)
		//艺术作品添加到收藏夹、发布艺术作品
		//添加视频、收藏视频
		this.captureUp = "VoteUp"; //用户评价 赞 的函数名
		this.captureDown = "VoteDown"; //用户评价 否 的函数名
		this.captureShare = "ShowSharePublishedFilePopup"; //用户操作 分享 的函数名
		//购买游戏或者DLC
		this.bus = "VoteUpCommentThread"; //用户评价 赞 的函数名 "VoteUpCommentThread('UserReceivedNewGame"
		//发布状态或者游戏状态
		this.status = "VoteUpCommentThread"; //用户评价 赞 的函数名 "VoteUpCommentThread('UserStatusPublished"
		
		//组通知(可留言)，其他的比如 安排活动、选择新的周最佳玩家、晋升一名成员为管理员、添加了一条留言 没有看到过
		this.groupNotificationUp = "RateAnnouncement"; //用户评价 赞
		this.groupNotificationDown = "RateAnnouncement"; //用户评价 否
		
		this.g_bRecoredUpvote = false;
		
		//青睐之光物品发布一则通知?、创意工坊物品发布一则通知? 没有看到过
		//商店鉴赏家 推荐一款新的游戏?(进入页面可留言) 但是不能操作
		//制作一件物品时 ghs 强烈推荐 发布艺术作品之类的
		//在某人的截图中? 发布艺术作品之类的，状态等
		//jQuery(".ugc.has_adult_content img, .ugc.has_adult_content div.imgWallItem")
		
		//去除模糊效果，并显示红色边框，进行标记
		//var obj = jQuery(".ugc.has_adult_content img, .ugc.has_adult_content div.imgWallItem");
		//for (let i = 0; i < obj.length; i++) {
		//	obj[i].style.filter = "none";
		//	obj[i].style.border = "2px red solid";
		//	obj[i].parentNode.parentNode.parentNode.parentNode.style.border = "2px red solid";
		//}
		
		if(isIntNum(profileID_Url)){
			this.profileID_Url = profileID_Url.toString(); //用户id
			this.mode = 0;
			this.Url = this.steamCommunityUrl + this.profileIDUrl + this.profileID_Url;
		}
		else{
			this.profileID_Url = profileID_Url; //自定义链接
			this.mode = 1;
			this.Url = this.steamCommunityUrl + this.customUrl + this.profileID_Url;
		}
	}
	async init(profileID_Url){
		
		if(isIntNum(profileID_Url)){
			this.profileID_Url = profileID_Url.toString(); //用户id
			this.mode = 0;
			this.Url = this.steamCommunityUrl + this.profileIDUrl + this.profileID_Url;
		}
		else{
			this.profileID_Url = profileID_Url; //自定义链接
			this.mode = 1;
			this.Url = this.steamCommunityUrl + this.customUrl + this.profileID_Url;
		}
	}
	
	LogUpvote(){
		if ( !this.g_bRecoredUpvote )
		{
			this.g_bRecoredUpvote = true;
			$J.post( 'https://steamcommunity.com/actions/LogFriendActivityUpvote', {sessionID: g_sessionID} );
		}
	}
	
	VoteUp(item_id){ //有些东西点不了赞
			var options = {
				method: 'post',
				postBody: 'id=' + item_id + '&sessionid=' + g_sessionID,
				onComplete: (function(item_id){
					return function(transport)
					{
						var response = JSON.parse(transport.responseText);
						switch (response.success){
							case 1:
							//debugger
							//console.log("VoteUp() 已经点过赞了!",transport.responseText);
								break;
							case 10:
							//debugger
							//console.log("VoteUp() 点赞完成??",transport.responseText);
								break;
							case 15:
							//debugger
							console.log("VoteUp() 点赞错误!!!",transport.responseText);
								break;
							default:
							//debugger
							console.log("VoteUp() ????????????????????????????????????????????????????????????",transport.responseText);
								break;
						}
					}
				}(item_id))
			};
			
			new Ajax.Request(
				'https://steamcommunity.com/sharedfiles/voteup',
				options
			);
			this.LogUpvote();
	}
	
	//home页面 InitializeCommentThread
	
	//rgCommentData['pagesize']
	//var CCommentThread = Class.create
	//initialize: function( type, name, rgCommentData, url, nQuoteBoxHeight )
	
	//function InitializeCommentThread( type, name, rgCommentData, url, nQuoteBoxHeight )
	//this.m_cPageSize
	VoteUpCommentThread(commentthreadid){ //这个函数有不确定性
			let iprefix = commentthreadid.indexOf('_');
			var prefixUrl = commentthreadid.slice(0,iprefix);
			let iowner = commentthreadid.indexOf('_',iprefix+1);
			var ownerUrl = commentthreadid.slice(iprefix+1,iowner);
			var featureUrl = commentthreadid.slice(iowner+1);
			
			this.LogUpvote();
			
			var GetActionURL  = function(action){
				var url = "https://steamcommunity.com/comment/" + prefixUrl + "/" + action + "/";
				url += ownerUrl + '/';
				url += featureUrl + '/';
				return url;
			}
			
			var countValue = 3;
			
			switch (prefixUrl){
				case 'UserReceivedNewGame': //购买游戏或者DLC
					countValue = 3;
					break;
				case 'PublishedFile_Public': //没有测试过是否有这个
					debugger
					countValue = 3;
					break;
				case 'UserStatusPublished': //发布状态或者游戏状态
					countValue = 6;
					break;
				default:
					debugger
					break;
			}
			
			var params = {
			vote: 1,
			count: countValue,
			sessionid: g_sessionID,
			feature2: -1,
			newestfirstpagination: true,
			};
			
			new Ajax.Request( GetActionURL( 'voteup' ), {
				method: 'post',
				parameters: params,
				onSuccess: ()=>{
					//console.log("VoteUpCommentThread() 点赞成功!",countValue,commentthreadid)
					},
				onFailure:  ()=>{
					console.log("VoteUpCommentThread() 点赞失败! 与网络通信时出错。请稍后再试。",countValue,commentthreadid)
					},
				onComplete: ()=>{
					//console.log("VoteUpCommentThread() 点赞完毕! 用时",countValue,commentthreadid)
					}
			} );
		}
		
		UserReviewVoteUp(id)
		{
			//debugger
			this.UserReview_Rate( id, true, 'https://steamcommunity.com',
				function( rgResults,recommendationID ) {
					//console.log("UserReviewVoteUp() 点赞成功~",rgResults,recommendationID);
				}
			);
		}
		
		UserReview_Rate(recommendationID, bRateUp, baseURL, callback)
		{
			$J.post( baseURL + '/userreviews/rate/' + recommendationID,{
						'rateup' : bRateUp,
						'sessionid' : g_sessionID
			}).done( function( results,recommendationID ) {
				if ( results.success == 1 )
				{
					callback( results );
				}
				else if ( results.success == 21 )
				{
					ShowAlertDialog( '错误', '您必须先登录以执行该操作。' );
				}
				else if ( results.success == 15 )
				{
					ShowAlertDialog( '错误', '您的帐户没有足够的权限执行此操作。' );
				}
				else if ( results.success == 24 )
				{
					ShowAlertDialog( '错误', '您的帐户不符合使用该功能的要求。<a class="whiteLink" href="https://help.steampowered.com/zh-cn/wizard/HelpWithLimitedAccount" target="_blank" rel="noreferrer">访问 Steam 客服</a>了解更多信息。' );
				}
				else
				{
					ShowAlertDialog( '错误', '在尝试处理您的请求的过程中出现了错误：' + results.success );
				}
			} );
		}
		
	RateAnnouncement(strArguments){
		//解析参数并填充
		var rateURL, gid, bVoteUp, clanID;
		strArguments = strArguments.replace(/'/g, ""); //去除字符串中出现的所有单引号
		strArguments = strArguments.replace(/\s+/g,""); //去除字符串所有的空格
		var arr = strArguments.split(','); //划分为参数
		rateURL = arr[0];
		gid = arr[1];
		if(arr[2]=="true")
			bVoteUp = true;
		else bVoteUp = false;
		clanID = parseInt(arr[3]);
		
		rateURL = rateURL + gid;
		$J.post( rateURL, {
				'voteup' : bVoteUp,
				'clanid' : clanID,
				'sessionid' : g_sessionID
			}
		).done( function( json ) {
			//console.log("RateAnnouncement() 点赞成功.",json);
		} )
		.fail( function( jqxhr ) {
			var responseJSON = jqxhr.responseText.evalJSON();
			switch ( responseJSON.success )
			{
				case 21:
					ShowAlertDialog( '错误', '您必须登录才能执行该操作。' );
					break;
				case 24:
					ShowAlertDialog( '错误',
						'您的帐户不符合使用该功能的要求。<a class="whiteLink" href="https://help.steampowered.com/zh-cn/wizard/HelpWithLimitedAccount" target="_blank" rel="noreferrer">访问 Steam 客服</a>了解更多信息。'
					);
					break;
				case 15:
					ShowAlertDialog( '错误', '您没有执行该操作的权限。' );
					break;
				default:
					ShowAlertDialog( '错误', '在处理您的请求时遇到错误：' + responseJSON.success );
					break;
			}
		} );
		return false;
	}
	
	//g_BlotterNextLoadURL
	//StartLoadingBlotter( g_BlotterNextLoadURL );
	async Run(){ //开始点赞
		var documentData;
		var arrData;
		var nextLoadURL;
		
		var url = this.Url + this.friendActivitUrl;
		this.isYun = true;
		console.log("开始点赞...",url);
		var i = 0;
		while(this.isYun)
		{
			i++;
			if(i==1){
				documentData = await getResourceByURL(url,true);
				//console.log("url:",this.Url,"data:",documentData);
				var index = documentData.indexOf(this.startElementsId); //开始区域 blotter_content
				var endindex = documentData.lastIndexOf(this.endElementsId); //结束区域 blotter_throbber
				var Data = documentData.slice(index,endindex);
				var jsindex = documentData.indexOf(this.jsName,endindex);
				var jsendindex = documentData.indexOf(';',jsindex);
				var jsData = documentData.slice(jsindex,jsendindex);
				nextLoadURL = jsData.slice(jsData.indexOf('\'')+1,jsData.lastIndexOf('\''));
				//console.log("Data:",Data,"nextLoadURL:",nextLoadURL);
				arrData = Data.split(this.friendActivityElementsBlockId);
			}
			//else if ( !response ){
			//	// print out any error for now 现在打印出任何错误
			//	console.log("错误:",transport.responseText);
			//	//$('blotter_content').insert( { bottom: transport.responseText } );
			//}
			else
			{
				documentData = await getResourceByURL(url,false); //获取原始数据
				//console.log("url:",this.Url,"data:",documentData);
				//console.log(documentData);
				this.g_bRecoredUpvote = false;
				
				// load more data
				//var response = documentData.responseJSON;
				var response = JSON.parse(documentData.responseText);
				if ( response && response.success == true && response.blotter_html ){
					// append the new day, having it fade in quickly 补充新的一天，让它迅速消失
					
					// Scan each blotter response for an event ID we've seen before, so we can prune them out 扫描每个吸纸器响应以获取我们之前见过的事件ID，以便我们将其删节
					var html = response.blotter_html;
					arrData = html.split(this.friendActivityElementsBlockId);
					
					//var newDiv = new Element ( 'div' );
					//newDiv.update( html );
					//newDiv.setOpacity(0);
					//$('blotter_content').appendChild( newDiv );
					
					//Blotter_RecordAppImpressions();
					//ApplyAdultContentPreferences();
					
					//new Effect.Appear( newDiv, { duration: .75 }  );
					
					//g_BlotterNextLoadURL = response.next_request;
					nextLoadURL = response.next_request;
					//debugger
					//Blotter_InfiniteScrollingCheckForMoreContent();
					//Blotter_AddHighlightSliders();
				}
			}
			// debugger
			for (let i = 0; i < arrData.length; i++) {
				//console.log(arrData[i]);
				
				var k = arrData[i].lastIndexOf(this.bus); //VoteUpCommentThread('UserReceivedNewGame
				if(k>0)
				{
					var startk = arrData[i].indexOf('(',k);
					var endk = arrData[i].indexOf(')',startk);
					var code = arrData[i].slice(startk+1,endk);
					code = code.replace(/'/g, ""); //去除字符串中出现的所有单引号
					code = code.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
					//console.log("code",code);
					//debugger
					this.VoteUpCommentThread(code); //点赞
					await sleep(50); //延迟0.01秒
					continue;
				}
				
				// var l = arrData[i].lastIndexOf(this.status); //VoteUpCommentThread('UserStatusPublished
				// if(l>0)
				// {
				// 	var startl = arrData[i].indexOf('(',l);
				// 	var endl = arrData[i].indexOf(')',startl);
				// 	var code = arrData[i].slice(startl+1,endl);
				// 	code = code.replace(/'/g, ""); //去除字符串中出现的所有单引号
				// 	code = code.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
				// 	console.log("code",code);
				// 	debugger
				// 	this.VoteUpCommentThread(code); //点赞
				// 	await sleep(50); //延迟0.01秒
				// 	continue;
				// }
				
				var o = arrData[i].lastIndexOf(this.UserEvaluationUp); //UserReviewVoteUp
				if(o>0)
				{
					var starto = arrData[i].indexOf('(',o);
					var endo = arrData[i].indexOf(')',starto);
					var code = arrData[i].slice(starto+1,endo);
					code = code.replace(/'/g, ""); //去除字符串中出现的所有单引号
					code = code.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
					//debugger
					////console.log("code",code);
					this.UserReviewVoteUp(code); //点赞
					await sleep(50); //延迟0.01秒
					continue;
				}
				
				var j = arrData[i].indexOf(this.captureUp); //VoteUp
				if(j>0)
				{
					var startj = arrData[i].indexOf('(',j);
					var endj = arrData[i].indexOf(')',startj);
					var code = arrData[i].slice(startj+1,endj);
					//console.log("code",code);
					//debugger
					if(code.indexOf(',') == -1) //如果不是组点赞则继续点赞，否则继续往后面执行
					{
						this.VoteUp(parseInt(code)); //点赞
						await sleep(50); //延迟0.01秒
						continue;
					}
				}
				
				var getCode = (m)=>{
					var startm = arrData[i].indexOf('(',m);
					var endm = arrData[i].indexOf(')',startm);
					var code = arrData[i].slice(startm+1,endm);
					////console.log("code",code);
					
					var iId = arrData[i].indexOf('id',endm);
					var startId = arrData[i].indexOf('"',iId);
					var endId = arrData[i].indexOf('"',startId+1);
					var idValue = arrData[i].slice(startId+1,endId);
					//console.log("idValue",idValue);
					if(idValue.indexOf('Up') != -1){
						
						return [true,code];
					}
					else if(idValue.indexOf('Down') != -1){
						return [false,code];
					}
					else{
						console.log("组点赞出错!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					}
				}
				
				var m = arrData[i].indexOf(this.groupNotificationUp); //RateAnnouncement
				if(m>0)
				{
					//查找设置
					var ret = getCode(m);
					//debugger
					if(ret[0]==true){
						this.RateAnnouncement(ret[1]); //点赞
						await sleep(50); //延迟0.01秒
					}
					else{
						this.RateAnnouncement(ret[1]); //踩
						await sleep(50); //延迟0.01秒
					}
					continue;
				}
				
			}
			//debugger
			url = nextLoadURL;
			//console.log(url,"点赞完毕! 加载下一个url:", nextLoadURL);
			var index = url.indexOf("?start=")+1;
			var endindex = url.indexOf("&",index);
			if(endindex == -1)
				endindex = url.length;
			var time = url.slice(index + "?start".length,endindex);
			time = parseInt(time);
			var date = new Date(time*1000);
			var year = date.getFullYear();
			var mon = date.getMonth()+1;
			var day = date.getDate();
			var hours = date.getHours();
			var minu = date.getMinutes();
			var sec = date.getSeconds();
			//if(mon<10) mon = "0"+mon;
			//if(day<10) day = "0"+day;
			//if(hours<10) hours = "0"+hours;
			//if(minu<10) minu = "0"+minu;
			//if(sec<10) sec = "0"+sec;
			var str = year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec; //year+"年"+mon+"月"+day +"日"+hours +"时"+minu +"分"+sec+"秒" //date.toLocaleString()
			console.log(url,"点赞完毕! 下一次点赞的内容时间是:", str + " startoffset:",url.slice(url.lastIndexOf("startoffset=") + "startoffset=".length));
		} //while
		var time = url.slice(url.indexOf("=")+1);
		time = parseInt(time);
		var date = new Date(time*1000);
		var year = date.getFullYear();
		var mon = date.getMonth()+1;
		var day = date.getDate();
		var hours = date.getHours();
		var minu = date.getMinutes();
		var sec = date.getSeconds();
		var str = year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
		
		console.log("点赞完毕! 已将"+ str +"这个时间线之后的动态全部点赞完毕!~");
	}
	Stop(){
		console.log("开始停止点赞...");
		this.isYun = false;
	}
	
	async setfriendActivityOption(){
		var url = this.Url + this.friendActivitOptionUrl;
		jQuery.post(url, {
			setting: 1,
			sessionid: g_sessionID,
			"subscription_option[friendadded]": 1,
			"subscriptions[friendadded]": 1,
			"subscription_option[achievementunlocked]": 1,
			"subscriptions[achievementunlocked]": 1,
			"subscription_option[receivednewgame]": 1,
			"subscriptions[receivednewgame]": 1,
			"subscription_option[joinedgroup]": 1,
			"subscriptions[joinedgroup]": 1,
			"subscription_option[createsgroup]": 1,
			"subscriptions[createsgroup]": 1,
			"subscription_option[addedgametowishlist]": 1,
			"subscriptions[addedgametowishlist]": 1,
			"subscription_option[recommendedgame]": 1,
			"subscriptions[recommendedgame]": 1,
			"subscription_option[screenshotpublished]": 1,
			"subscriptions[screenshotpublished]": 1,
			"subscription_option[videopublished]": 1,
			"subscriptions[videopublished]": 1,
			"subscription_option[filefavorited]": 1,
			"subscriptions[filefavorited]": 1,
			"subscription_option[postedannouncement]": 1,
			"subscriptions[postedannouncement]": 1,
			"subscription_option[scheduledevent]": 1,
			"subscriptions[scheduledevent]": 1,
			"subscription_option[selectednewpotw]": 1,
			"subscriptions[selectednewpotw]": 1,
			"subscription_option[promotednewadmin]": 1,
			"subscriptions[promotednewadmin]": 1,
			"subscription_option[receivesgroupcomment]": 1,
			"subscriptions[receivesgroupcomment]": 1,
			"subscription_option[greenlightannouncement]": 1,
			"subscriptions[greenlightannouncement]": 1,
			"subscription_option[workshopannouncement]": 1,
			"subscriptions[workshopannouncement]": 1,
			"subscription_option[curatorrecommendations]": 1,
			"subscriptions[curatorrecommendations]": 1,
			"subscription_option[followingpublishedugc]": 1,
			"subscriptions[followingpublishedugc]": 1,
			"subscription_option[taggedinscreenshot]": 1,
			"subscriptions[taggedinscreenshot]": 1
		}, function(response) {
			if (response.success === false) {
				jQuery("#log_body1")[0].innerHTML +=
					"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
					"\">" + '[' + (i + 1) + '/' + total + '] 设置备注失败了! ' + profileID + '  ' + name +
					'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
			} else {
				jQuery("#log_body1")[0].innerHTML +=
					'[' + (i + 1) + '/' + total + '] ' +
					"成功设置备注于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
					profileID + '  ' + name + "</a>" +
					"<a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
					profileID + "\">" + "</a><br>";
			}
		}).fail(function() {
			jQuery("#log_body1")[0].innerHTML +=
				'<span style="color:#DA2626;">[' + (i + 1) + '/' + total + '] ' +
				"无法设置备注于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
				profileID + "\">" +
				profileID + '  ' + name + "</a></span><br>";
		}).always(function() {
			jQuery("#log_head1").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
		});
		
	}
	
	setGetActivityInfo(){ //设置动态的内容为指定的数据
		
	}
	setGetActivityAll(){ //设置动态内容为默认(全部)
		
	}
	setFriendActivityInfo(){ //设置指定好友动态为跳过,只给指定好友点赞等等
		
	}
}

class SteamData{
	constructor(arg) {
		this.steamCommunityUrl = "https://steamcommunity.com/";
		this.customUrl = "id/";
		this.profileIDUrl = "profiles/";
		this.commentUrl = "/allcomments"; //GET //https://steamcommunity.com/id/miku-39/allcomments
		this.commentNextUrl = "https://steamcommunity.com/comment/Profile/render/"; //POST //https://steamcommunity.com/comment/Profile/render/76561198373290430/-1/
		// start: 0
		// totalcount: 11596
		// count: 50
		// sessionid: 006825ba8313e097671eb93e
		// feature2: -1
		
		// {
		// 	start: 50,
		// 	totalcount: 11594,
		// 	count: 50,
		// 	sessionid: 006825ba8313e097671eb93e,
		// 	feature2: -1
		// }
		
		// start: 100
		// totalcount: 11595
		// count: 50
		// sessionid: 006825ba8313e097671eb93e
		// feature2: -1
		
		this.statusUrl = "https://steamcommunity.com/actions/GetNotificationCounts"; //GET
		this.userInfoUrl = "https://steamcommunity.com/miniprofile/"; //GET //https://steamcommunity.com/miniprofile/859694761
	}
	getCommentData(){
		var url = this.steamCommunityUrl + this.customUrl + 'miku-39' + this.commentUrl;
		var currentCommentNum = 0; //当前评论数
		var newCurrentCommentNum = 0; //在获取数据时，又出现了新的当前评论数
		
		for (let i = 0; i < currentCommentNum; i++) {
			_getCommentPageData(url,i);
			//解析数据
			
			//存储数据
			
		}
		
	}
	_getCommentPageData(url,nPage){
		var data;
		//获取数据
		
		//解析数据
		
		//完成后
		_updateData();
		return data;
	}
	_updateData(){
		//更新当前评论数
		newCurrentCommentNum = 0;
	}
}

function addRemoveFriendRemind(){ /*添加删除好友提醒*/
	let obj = document.getElementsByClassName("manage_action btnv6_lightblue_blue btn_medium");
	for (let i = 0; i < obj.length; i++) {
		let funcText = obj[i].onclick.toString();
		if(funcText.indexOf("ExecFriendAction('remove', 'friends/all')") != -1) //是否是移除好友按钮
		{
			obj[i].onclick = ()=>{
				ShowConfirmDialog('您点击了移除好友按钮', '是否要移除选择的好友?','移除好友').done( function(){
					console.log("移除好友");
					ExecFriendAction('remove', 'friends/all');
					}).fail( function(){
					console.log("取消移除好友");
					});
			}
			return 1;
		}
	}
	return 0;
}

function _addIDtoHandleLostfocus(){ //添加ID来处理丢失的焦点
	var parentObj = document.getElementById("steamTextStyle").parentNode;
	Obj = parentObj.getElementsByTagName('input');
	for (let i = 0; i < Obj.length; i++) {
		Obj[i].id = "steamTextStyle_1";
	}
	Obj = parentObj.getElementsByTagName('dl');
	for (let i = 0; i < Obj.length; i++) {
		Obj[i].id = "steamTextStyle_1";
	}
	Obj = parentObj.getElementsByTagName('dd');
	for (let i = 0; i < Obj.length; i++) {
		Obj[i].id = "steamTextStyle_1";
	}
}

var arrMenuID = [5];
function registeMenu(){ //注册脚本快捷菜单
	if(g_conf[0].isShow_menu_friend){
		arrMenuID[0] = GM_registerMenuCommand("好友列表", function(){
			window.open("https://steamcommunity.com/my/friends", "_blank");
		});
	}
	if(g_conf[0].isShow_menu_activity){
		arrMenuID[1] = GM_registerMenuCommand("动态列表", function(){
			window.open("https://steamcommunity.com/my/home", "_blank");
		});
	}
	if(g_conf[0].isShow_menu_registerKey){
		arrMenuID[2] = GM_registerMenuCommand("激活key", function(){
			window.open("https://store.steampowered.com/account/registerkey", "_blank");
		});
	}
	if(g_conf[0].isShow_menu_redeemWalletCode){
		arrMenuID[3] = GM_registerMenuCommand("充值key", function(){
			window.open("https://store.steampowered.com/account/redeemwalletcode", "_blank");
		});
	}
	if(g_conf[0].isShow_menu_steamdbFree){
		arrMenuID[4] = GM_registerMenuCommand("SteamDB预告", function(){
			window.open("https://steamdb.info/upcoming/free/", "_blank");
		});
	}
}

function unRegisteMenu(){ //取消注册脚本快捷菜单
	GM_unregisterMenuCommand(arrMenuID[0]);
	GM_unregisterMenuCommand(arrMenuID[1]);
	GM_unregisterMenuCommand(arrMenuID[2]);
	GM_unregisterMenuCommand(arrMenuID[3]);
	GM_unregisterMenuCommand(arrMenuID[4]);
}

function registeNotification(){ //注册事件完成通知
	var options = {
		text: "文本.",
		title: "标题!",
		image: "https://steamcommunity-a.akamaihd.net/public/shared/images/responsive/share_steam_logo.png",
		ondone: function() {
			console.log("完成.");
		},
		onclick: function() {
			console.log("点击.");
		}
	}
	GM_notification(options);
}

var func_PageRefreshAndCloseWarn = function(event){
	event.returnValue = '当前脚本正在运行中，您确定要离开吗?';
};
function setPageRefreshAndCloseWarn(mode){ //设置页面刷新和关闭警告
	if (mode) {
		window.addEventListener("beforeunload", func_PageRefreshAndCloseWarn, true);
	} else{
		window.removeEventListener("beforeunload", func_PageRefreshAndCloseWarn, true)
	}
}
//setPageRefreshAndCloseWarn(true); //设置页面刷新和关闭警告
//setPageRefreshAndCloseWarn(false); //取消设置页面刷新和关闭警告
//-----------------------------------------------------------------------------------
var func_autoPageRefreshAndCloseWarn = function(event){
	if(g_conf[0].YunStatus == true){
		if(g_conf[0].isAddYunBreakWarn == true){
			event.returnValue = '当前脚本正在运行中，您确定要离开吗?';
		}
	}
};
function autoSetPageRefreshAndCloseWarn(mode){ //自动判断状态并设置页面刷新和关闭警告
	if (mode) {
		window.addEventListener("beforeunload", func_autoPageRefreshAndCloseWarn, true);
	} else{
		window.removeEventListener("beforeunload", func_autoPageRefreshAndCloseWarn, true)
	}
}
//autoSetPageRefreshAndCloseWarn(true); //自动判断状态并设置页面刷新和关闭警告
//autoSetPageRefreshAndCloseWarn(false); //取消自动判断状态并设置页面刷新和关闭警告

function getLoginStatus(){
	if(g_steamID == false)
		return false; //没有登陆
	else if(typeof g_steamID == "string" && g_steamID.indexOf('7656119')==0)
		return true; //成功登陆
}
//-------------------------------------------------------------------------------------------------------------
var key_mode = 0;
var index_arr = [2];
index_arr[0] = undefined;
index_arr[1] = undefined;
function addFriendMultipleSelectionMode(){ //添加好友多选模式
	document.getElementById("search_text_box").blur(); //搜索框取消获得的焦点
	
	jQuery("#search_results .selectable").click(function(e) {
		var id = jQuery(this).attr("id"); //id
		var index = jQuery(this).index(); //下标
		//console.log(id,index);//得到点击的a标签的title值
		
		switch (key_mode){
			case 0:
				index_arr[0] = index-2;
				//console.log(index_arr[0]);
				break;
			case 1: //~ 反选
				break;
			case 2: //alt 重新选择
				break;
			case 3: //shift 好友快速多选模式
				if(index_arr[0] == undefined)
					index_arr[0] = index-2;
				else if(index_arr[0] == index-2){ //同一个元素
					
				}
				else{
					//取消选择文字
					document.selection && document.selection.empty && ( document.selection.empty(), 1)
					|| window.getSelection && window.getSelection().removeAllRanges();
					//遍历并选择之间的内容
					index_arr[1] = index-2;
					var obj = jQuery("#search_results>.selectable");
					var arr = obj.slice( index_arr[0],index_arr[1]);
					arr.addClass("selected");
					for (let i = 0; i < arr.length; i++) {
						arr[i].getElementsByClassName("select_friend_checkbox")[0].checked = true; //选中
					}
					UpdateSelection(); //官方，更新计数
					console.log("好友快速多选已完成!",index_arr[0],index_arr[1]);
					//index_arr[0] = undefined;
					//index_arr[1] = undefined;
				}
				break;
			default:
				break;
		}
	}); //选择的朋友总数
	
	document.addEventListener("keydown", function(e){ //~ 反选
		//console.log(e.keyCode);
		//console.log(e.shiftKey,e.altKey);
		if(e.keyCode == 192){
			key_mode = 1;
			//console.log("~ down");
			
			var obj = jQuery("#search_results>.selectable");
			obj.toggleClass("selected");
			for (let i = 0; i < obj.length; i++) {
				var bool = obj[i].getElementsByClassName("select_friend_checkbox")[0].checked;
				obj[i].getElementsByClassName("select_friend_checkbox")[0].checked = !bool; //全部取消选中
			}
			UpdateSelection(); //官方，更新计数
			console.log("~ 反选");
			return false;
		}
	}, false);
	//-----------------------------------------------------------------------------------
	shortcut.add("Esc",function() { //alt 重新选择
		key_mode = 2;
		//console.log("Alt");
		
		var obj = jQuery("#search_results>.selectable");
		obj.removeClass("selected");
		for (let i = 0; i < obj.length; i++) {
			obj[i].getElementsByClassName("select_friend_checkbox")[0].checked = false; //全部取消选中
		}
		UpdateSelection(); //官方，更新计数
		console.log("Esc 重新选择");
	}, {
		'type':'keydown', //事件
		'propagate':false, //是否支持冒泡
		'disable_in_input':false, //是否在输入框内有效
		'target':document, //作用范围
	});
	//-----------------------------------------------------------------------------------
	shortcut.add("Shift",function() { //shift 好友快速多选模式
		key_mode = 3;
		//console.log("Shift");
	}, {
		'type':'keydown', //事件
		'propagate':false, //是否支持冒泡
		'disable_in_input':false, //是否在输入框内有效
		'target':document, //作用范围
	});
	//-----------------------------------------------------------------------------------
	document.addEventListener("keyup", function(e){
		//console.log(e.keyCode);
		//console.log(e.shiftKey,e.altKey);
		if(e.keyCode == 192){
			key_mode = 0;
			//console.log("~ UP");
			return false;
		}
		else if(e.keyCode == 27){
			key_mode = 0;
			//console.log("Esc UP");
			return false;
		}
		else if(e.keyCode == 16){
			key_mode = 0;
			//console.log("Shift UP");
			return false;
		}
	}, false);
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
function getSelectedText() {
    if (window.getSelection) {
      return window.getSelection().toString();
    } else if (document.selection) {
      return document.selection.createRange().text;
    }
    return '';
}

function selectText(element) {
	var text = document.getElementById(element);
	text.focus();
	text.select();
	var selection = window.getSelection();
	return selection.toString();
}

function getDifferentIndex(str1,str2){
	var length =  str1.length < str2.length ? str2.length : str1.length; //取最大长度
	var value; //相差的长度
	if(length == str1.length)
		value= str1.length - str2.length;
	else
		value= str2.length - str1.length;
	
	var i;
	for (i = 0; i < length; i++) {
		if(str1.charCodeAt(i) != str2.charCodeAt(i)) //如果超出范围charCodeAt()返回NaN
		{
			if(str1.charCodeAt(i) == NaN || str2.charCodeAt(i) == NaN)
				return i+value; //选择的是末尾，从不一样的位置+不一样的长度
			else
				return i; //选择的是中间，两个数不一样，返回不一样的位置
		}
		
	}
	return -1; //没有找到返回-1
}

async function setSelectTextMode(mode){
	var eleName;
	
	const text_format = [{
			tag_start: "[h1]",
			tag_end: "[/h1]"
		},{
			tag_start: "[b]",
			tag_end: "[/b]"
		},{
			tag_start: "[u]",
			tag_end: "[/u]"
		},{
			tag_start: "[i]",
			tag_end: "[/i]"
		},{
			tag_start: "[strike]",
			tag_end: "[/strike]"
		},{
			tag_start: "[spoiler]",
			tag_end: "[/spoiler]"
		},{
			tag_start: "[noparse]",
			tag_end: "[/noparse]"
		},{
			tag_start: "[url=",
			tag_middle: "]",
			tag_end: "[/url]"
		}
	]
	var ele;
		switch (inBoxonblurID){
			case 0:
				ele = document.getElementById("comment_textarea");
				eleName = "comment_textarea";
				break;
			case 1:
				ele = document.getElementById("comment_textarea_en");
				eleName = "comment_textarea_en";
				break;
			case 2:
				ele = document.getElementById("comment_textarea_jp");
				eleName = "comment_textarea_jp";
				break;
			case 3:
				ele = document.getElementById("comment_textarea_zhc");
				eleName = "comment_textarea_zhc";
				break;
			case 4:
				ele = document.getElementById("comment_textarea_zh_sg");
				eleName = "comment_textarea_zh_sg";
				break;
			case 5:
				ele = document.getElementById("comment_textarea_zh_hant");
				eleName = "comment_textarea_zh_hant";
				break;
			case 6:
				ele = document.getElementById("comment_textarea_zh_hk");
				eleName = "comment_textarea_zh_hk";
				break;
			case 7:
				ele = document.getElementById("comment_textarea_zh_mo");
				eleName = "comment_textarea_zh_mo";
				break;
			case 8:
				ele = document.getElementById("comment_textarea_zh_tw");
				eleName = "comment_textarea_zh_tw";
				break;
			default:
				break;
		}
		//debugger
	var str = getSelectedText(); //获取选择的文本内容
	var oldText = ele.value; //输入框原来的值  document.activeElement.value
	var selection = window.getSelection();
	var selectionStr = selection.toString(); //为了区分是全选了还是根本就没有选择
	var obj = ele; //当前焦点所在的元素 document.activeElement
	var nSelectionStart;
	var elTextArea;
	if(str == ""){ //是否没有选择任何的文本
		elTextArea = ele; //设置为指定的留言框 document.activeElement
		if (elTextArea) {
			nSelectionStart = elTextArea.selectionStart;//
			if(nSelectionStart == undefined) //如果没有输入
			{
				nSelectionStart = 0;
				elTextArea.value = "";
			}
		    newMess = elTextArea.value.substr(0, nSelectionStart);
		}
	}
	else{
		var iindex = ele.selectionStart; //
		await window.getSelection().deleteFromDocument(); /*删除选择的文本*/
		var newText = selectText(eleName); //输入框现在的值
		if(newText == oldText){
			//debugger
			return;
		}
		//debugger
		var index;
		// if(iindex != 0 )//是否在开头(针对于相同的字符)
		// 	index = getDifferentIndex(oldText,newText); //getDifferentIndex(oldText,newText); //ele.selectionStart
		// else
			index = iindex;
		
		console.log("index",index);
		var endIndex = index + str.length;
		
		var newMess = oldText.slice(0,index); //添加开头
	}
	switch (mode){
		case 1:
			newMess += text_format[0].tag_start + str + text_format[0].tag_end; //处理选择的文本并添加
			if(selectionStr == "" && selection.toString() == ""){ //为了区分是全选了还是根本就没有选择
				elTextArea.selectionStart = nSelectionStart + (text_format[0].tag_start + str + text_format[0].tag_end).length;
			}
			break;
		case 2:
			newMess += text_format[1].tag_start + str + text_format[1].tag_end; //处理选择的文本并添加
			if(selectionStr == "" && selection.toString() == ""){
				elTextArea.selectionStart = nSelectionStart + (text_format[1].tag_start + str + text_format[1].tag_end).length;
			}
			break;
		case 3:
			newMess += text_format[2].tag_start + str + text_format[2].tag_end; //处理选择的文本并添加
			if(selectionStr == "" && selection.toString() == ""){
				elTextArea.selectionStart = nSelectionStart + (text_format[2].tag_start + str + text_format[2].tag_end).length;
			}
			break;
		case 4:
			newMess += text_format[3].tag_start + str + text_format[3].tag_end; //处理选择的文本并添加
			if(selectionStr == "" && selection.toString() == ""){
				elTextArea.selectionStart = nSelectionStart + (text_format[3].tag_start + str + text_format[3].tag_end).length
			}
			break;
		case 5:
			newMess += text_format[4].tag_start + str + text_format[4].tag_end; //处理选择的文本并添加
			if(selectionStr == "" && selection.toString() == ""){
				elTextArea.selectionStart = nSelectionStart + (text_format[4].tag_start + str + text_format[4].tag_end).length;
			}
			break;
		case 6:
			newMess += text_format[5].tag_start + str + text_format[5].tag_end; //处理选择的文本并添加
			if(selectionStr == "" && selection.toString() == ""){
				elTextArea.selectionStart = nSelectionStart + (text_format[5].tag_start + str + text_format[5].tag_end).length;
			}
			break;
		case 7:
			newMess += text_format[6].tag_start + str + text_format[6].tag_end; //处理选择的文本并添加
			if(selectionStr == "" && selection.toString() == ""){
				elTextArea.selectionStart = nSelectionStart + (text_format[6].tag_start + str + text_format[6].tag_end).length;
			}
			break;
		case 8:
			newMess += text_format[7].tag_start + text_format[7].tag_middle + str + text_format[7].tag_end; //处理选择的文本并添加
			if(selectionStr == "" && selection.toString() == ""){
				elTextArea.selectionStart = nSelectionStart + (text_format[7].tag_start + str + text_format[7].tag_end).length;
			}
			break;
		default:
			break;
	}
	if(selectionStr == "" && selection.toString() == ""){ //是否没有选择任何的文本
		newMess += elTextArea.value.substr(nSelectionStart)
	}
	else{
		newMess += oldText.slice(endIndex); //添加结尾
	}
	obj.value = newMess; //重新赋值给输入框
	obj.focus(); //获取焦点，如果不在视野里，会把镜头拉过去
}
//setSelectTextMode(1)
//-------------------------------------------------------------------------------------------------------------------------------------------------
function add_commentthread_textarea_allSelect(){ //添加留言框全选
	document.addEventListener("mousedown", function(e){
		//console.log(e.button);
		if(e.button == 1){
			if(document.activeElement.id.indexOf("comment_textarea") != -1){ //当前焦点所在的元素如果是留言框才全选
				let obj;
					switch (inBoxonblurID){
						case 0:
							obj = document.getElementById("comment_textarea");
							break;
						case 1:
							obj = document.getElementById("comment_textarea_en");
							break;
						case 2:
							obj = document.getElementById("comment_textarea_jp");
							break;
						case 3:
							obj = document.getElementById("comment_textarea_zhc");
							break;
						case 4:
							obj = document.getElementById("comment_textarea_zh_sg");
							break;
						case 5:
							obj = document.getElementById("comment_textarea_zh_hant");
							break;
						case 6:
							obj = document.getElementById("comment_textarea_zh_hk");
							break;
						case 7:
							obj = document.getElementById("comment_textarea_zh_mo");
							break;
						case 8:
							obj = document.getElementById("comment_textarea_zh_tw");
							break;
						default:
							break;
					}
					obj.focus();
					obj.select();
					e.stopPropagation(); 
					e.stopImmediatePropagation();
					e.preventDefault();
				return false;
			}
			return false;
		}
	}, false);
	
	
	document.addEventListener("keyup", function(e){
		//console.log(e.keyCode);
		//console.log(e.shiftKey,e.altKey);
		if(e.keyCode == 18){ //Alt
		let obj;
			switch (inBoxonblurID){
				case 0:
					obj = document.getElementById("comment_textarea");
					break;
				case 1:
					obj = document.getElementById("comment_textarea_en");
					break;
				case 2:
					obj = document.getElementById("comment_textarea_jp");
					break;
				case 3:
					obj = document.getElementById("comment_textarea_zhc");
					break;
				case 4:
					obj = document.getElementById("comment_textarea_zh_sg");
					break;
				case 5:
					obj = document.getElementById("comment_textarea_zh_hant");
					break;
				case 6:
					obj = document.getElementById("comment_textarea_zh_hk");
					break;
				case 7:
					obj = document.getElementById("comment_textarea_zh_mo");
					break;
				case 8:
					obj = document.getElementById("comment_textarea_zh_tw");
					break;
				default:
					break;
			}
			obj.focus();
			obj.select();
			e.stopPropagation(); 
			e.stopImmediatePropagation();
			e.preventDefault();
			//console.log("Alt UP");
			return false;
		}
	}, false);
}
//-------------------------------------------------------------------------------------------------------------
// API
function getCityCodeByEnglishName(cityEnglishName) {
	if (g_arrCityList == undefined)
		return null;

	for (let i = 0; i < g_arrCityList.length; i++) {
		if (g_arrCityList[i][1].length == cityEnglishName.length &&
			g_arrCityList[i][1].toLowerCase() == cityEnglishName.toLowerCase()) {
			return g_arrCityList[i][0];
		}
	}
	return null;
}

function getCityCodeByChinsesName(cityChinseshName) {
	if (g_arrCityList == undefined)
		return null;

	for (let i = 0; i < g_arrCityList.length; i++) {
		if (g_arrCityList[i][3].length == cityChinseshName.length &&
			g_arrCityList[i][3].toLowerCase() == cityChinseshName.toLowerCase()) {
			return g_arrCityList[i][0];
		}
	}
	return null;
}

function getCityChinsesNameByEnglishName(cityEnglishName) {
	if (g_arrCityList == undefined)
		return null;

	for (let i = 0; i < g_arrCityList.length; i++) {
		if (g_arrCityList[i][1].length == cityEnglishName.length &&
			g_arrCityList[i][1].toLowerCase() == cityEnglishName.toLowerCase()) {
			return g_arrCityList[i][3];
		}
	}
	return null;
}
//-------------------------------------------------------------------------------------------------------------
//RGB
function countRgbColor(r, g, b) //计算RGB渐变颜色
{
	var color;
	//var color = '#' + to2string(r) +  'ffff';
	//console.log(color);
	//return color;
	while (true) {
		switch (RGBindex) {
			case 0: //红
				if (RGBr == 0 & RGBg == 0 & RGBb == 0) {
					RGBr = 0xFF; //红
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 1;
					continue; //重新开始
				}
				break;
			case 1: //红->黄
				if (RGBg != 0xFF) {
					RGBg += 3; //红->黄
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 2;
					continue; //重新开始
				}
				break;
			case 2: //黄->绿
				if (RGBr != 0x00) //黄
				{
					RGBr -= 3; //黄->绿
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 3;
					continue; //重新开始
				}
				break;
			case 3: //绿->蓝(天蓝)
				if (RGBb != 0xFF) {
					if (RGBg > 0xBF) {
						RGBg -= 3;
					}
					RGBb += 3;
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 4;
					continue; //重新开始
				}
				break;
			case 4: //蓝(天蓝)->蓝(深蓝)
				if (RGBg != 0x00) {
					RGBg -= 3;
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 5;
					continue; //重新开始
				}
				break;
			case 5: //蓝(深蓝)->紫
				if (RGBr < 0x80 || RGBb > 0x80) {
					if (RGBr < 0x80) {
						RGBr += 3;
						color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
						//console.log("color:" + color);
						return color;
					} else if (RGBb > 0x80) {
						RGBb -= 3;
						color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
						//console.log("color:" + color);
						return color;
					}

				} else {
					RGBindex = 6;
					continue; //重新开始
				}
				break;
			case 6: //紫->红
				if (RGBr != 0xFF || RGBb != 0x00) {
					if (RGBr < 0xFF) {
						RGBr += 3;
						color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
						//console.log("color:" + color);
						return color;
					} else if (RGBb > 0x00) {
						RGBb -= 3;
						color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
						//console.log("color:" + color);
						return color;
					}

				} else //继续RGB
				{
					RGBindex = 1;
					continue; //重新开始
				}

				break;
			case 7:
				console.log("end!!!");
				break;
			default:
				console.log("[countRgbColor()-switch(RGBindex):] 未定义异常!")
				break;
		}
	}
	//红 #FF0000
	//黄 #FFFF00
	//绿 #00FF00
	//蓝 #00BFFF #0000FF
	//紫 #800080

}
// function setRgb() //设置RGB渐变颜色
// {
// 	var loginBox = document.getElementById("LoginBaseBox");
// 	loginBox.style.background = countRgbColor(0,0,0);
// }
// var tiSysCallback_runRGB = setInterval(function(){runRGB();}, 22); //[启动定时器] 每秒回调函数 // 11 16 22 30
//-------------------------------------------------------------------------------------------------------------
var exApis = new externalApis();

function setBackgroundImg(imgFilePath){ //设置背景图片
	if(jQuery("#backgroundIMG")[0] == undefined)
		jQuery("body").prepend('<div id="backgroundIMG">背景图</div>');
	
	var css = "background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('"+ imgFilePath +"') no-repeat fixed;background-size: cover; width: 100%;";
	//var css = "background: rgba(0,0,0,0) url('"+ imgFilePath +"') no-repeat fixed;background-size: cover; width: 100%;";
	var other_css = "position: absolute; z-index: -1; height:100%;";
	var opacity_css = "opacity:1;filter: alpha(opacity=100)";
	jQuery("#backgroundIMG")[0].style = css + other_css + opacity_css;
	document.body.style.background = "none";
	
	jQuery(".friends_header_bg")[0].style.background = "none";
	jQuery("#global_header")[0].style.background = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))";
	jQuery(".content")[0].style.background = "none";
	
	jQuery(".profile_friends.title_bar")[0].style.background = "linear-gradient(rgba(1, 94, 128, 0.6), rgba(1, 94, 128, 0.6))";
}

function setBackgroundImgCarousel(arr_img,timeInterval){ //设置背景图片轮播(图片路径,时间间隔)
	//URL()存的图片网络地址 修改背景图  就改这个地址 必须要网络地址噢噢噢(注意这里没有[img][/img]) 壁纸 可以在这找  https://www.enterdesk.com/zhuomianbizhi/dongmankatong/dongmanrenwu/
	
	var x = 0;        //记录当前第几张轮播图
	setBackgroundImg(arr_img[x++]);
	setInterval(()=>{
		if (x >= arr_img.length) x = 0;
		setBackgroundImg(arr_img[x++]);
	}, timeInterval);
}

async function getNetImgBysourceID(sourceID){
	var data,obj,imgFilePath;
	if(sourceID==0){
		data = await exApis.getDataByApiList(1,0,"json");
		obj = JSON.parse(data); //JSON处理并解析到js对象
		if(obj.code == 200){
			imgFilePath = obj.imgurl;
		}
	}
	else if(sourceID==1){
		data = await exApis.getDataByApiList(2,0,"json");
		obj = JSON.parse(data); //JSON处理并解析到js对象
		if(obj.code == 200){
			imgFilePath = obj.imgurl;
		}
	}
	return imgFilePath;
}

async function autoGetImgAndSetBackgroundImg(sourceID,mode,timeInterval,maxImgNumber){ //来源id, 模式:true轮播,false不轮播, 时间间隔(不轮播就无效), 最大图片轮播数量(不轮播就无效)
	var arr_img = [];
	var imgFilePath;
	
	if(mode == true){
		imgFilePath = await getNetImgBysourceID(sourceID);
		arr_img[0] = imgFilePath;
		
		if(maxImgNumber > 0){
			setTimeout(async()=>{
				for (let i = 0; i < maxImgNumbers; i++) {
					imgFilePath = await getNetImgBysourceID(sourceID);
					arr_img.push(imgFilePath)
				}
			}, 0);
			setBackgroundImgCarousel(arr_img,timeInterval);
		}else{
			setBackgroundImg(imgFilePath);
			setInterval(async()=>{
					imgFilePath = await getNetImgBysourceID(sourceID);
					setBackgroundImg(imgFilePath);
			}, timeInterval);
		}
	}else if(mode == false){
		imgFilePath = await getNetImgBysourceID(sourceID);
		setBackgroundImg(imgFilePath);
	}
	//exApis.getDataByApiList(0);
	//exApis.getDataByApiList(1,0,"json");
	//exApis.getDataByApiList(1,0);
	//exApis.getDataByApiList(2,0,"json");
	//exApis.getDataByApiList(2,0);
	//exApis.getDataByApiList(2,1,"二维码文本");
	//exApis.getDataByApiList(3,0,"","Miku");
	//exApis.getDataByApiList(3,1,"","Miku");
	//exApis.getDataByApiList(3,2,"","Miku");
	//exApis.getDataByApiList(3,3,"","Miku");
	//exApis.getDataByApiList(4,0);
	//exApis.getDataByApiList(4,1,1);
	//exApis.getDataByApiList(4,2,"Miku");
	//exApis.getDataByApiList(4,3);
	//exApis.getDataByApiList(4,4);
}

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

var gc_friAct = null;
var gc_ui = null;

class UI {
	constructor(arg) {
		this.loadProgress = 0; //加载进度
		this.isDomLoaded = false; //dom是否加载完毕
		registeMenu(); //注册脚本快捷菜单
		//registeNotification(); //注册事件完成通知
	}
	
	showLoadUI(){ //
		
		addNewStyle('styles_loading','\
			@charset "utf-8";\
			@import url("https://fonts.googleapis.com/css?family=Fredoka+One|Open+Sans:300");\
			*,\
			*::before,\
			*::after {\
				box-sizing: border-box;\
			}\
			\
			body {\
				font-family: "Fredoka One", cursive;\
				font-size: 16px;\
				margin: 0px;\
			}\
			\
			#loadingUI {\
				display: -webkit-box;\
				display: -ms-flexbox;\
				display: flex;\
				-webkit-box-pack: center;\
				-ms-flex-pack: center;\
				justify-content: center;\
				-webkit-box-align: center;\
				-ms-flex-align: center;\
				align-items: center;\
				min-height: 100vh;\
				/* background: rgba(249, 249, 249, 0.9); */\
				overflow: hidden;\
			}\
			\
			.text-wrapper {\
				padding: 0 1rem;\
				max-width: 50rem;\
				width: 100%;\
				text-align: center;\
			}\
			\
			.text {\
				font-size: 8em;\
				text-transform: uppercase;\
				letter-spacing: -14px;\
			}\
			\
			.text .letter {\
				position: relative;\
				display: inline-block;\
				-webkit-transition: all .4s;\
				transition: all .4s;\
			}\
			\
			.text .letter .character {\
				opacity: 0.65;\
				-webkit-transition: color .4s;\
				transition: color .4s;\
				cursor: pointer;\
			}\
			\
			.text .letter span {\
				position: absolute;\
				bottom: .8rem;\
				left: .4rem;\
				display: block;\
				width: 100%;\
				height: 15px;\
			}\
			\
			.text .letter span::before {\
				content: \'\';\
				position: absolute;\
				top: 50%;\
				left: 50%;\
				width: 0;\
				height: 0;\
				-webkit-transform: translate(-50%, -50%);\
				transform: translate(-50%, -50%);\
				border-radius: 50%;\
				background: rgba(0, 0, 0, 0.25);\
			}\
			\
			.text .letter:hover .character {\
				color: #fff !important;\
			}\
			\
			.text.part1 .letter:nth-child(1).poofed {\
				-webkit-transform-origin: 50% 50%;\
				transform-origin: 50% 50%;\
				-webkit-animation: poofing1 1.4s ease-i\n-out infinite alternate;\
				animation: poofing1 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes poofing1 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes poofing1 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(459deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(459deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part1 .letter:nth-child(1) .character {\
				color: #f44336;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 0.33333s;\
				animation-delay: 0.33333s;\
			}\
			\
			.text.part1 .letter:nth-child(1) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 0.33333s;\
				animation-delay: 0.33333s;\
			}\
			\
			.text.part1 .letter:nth-child(2).poofed {\
				-webkit-transform-origin: 50% 50%;\
				transform-origin: 50% 50%;\
				-webkit-animation: poofing2 1.4s ease-in-out infinite alternate;\
				animation: poofing2 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes poofing2 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes poofing2 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(540deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(540deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part1 .letter:nth-child(2) .character {\
				color: #9C27B0;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 0.66667s;\
				animation-delay: 0.66667s;\
			}\
			\
			.text.part1 .letter:nth-child(2) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 0.66667s;\
				animation-delay: 0.66667s;\
			}\
			\
			.text.part1 .letter:nth-child(3).poofed {\
				-webkit-transform-origin: 50% 50%;\
				transform-origin: 50% 50%;\
				-webkit-animation: poofing3 1.4s ease-in-out infinite alternate;\
				animation: poofing3 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes poofing3 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes poofing3 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(264deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(264deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part1 .letter:nth-child(3) .character {\
				color: #f99b0c;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 1s;\
				animation-delay: 1s;\
			}\
			\
			.text.part1 .letter:nth-child(3) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 1s;\
				animation-delay: 1s;\
			}\
			\
			.text.part1 .letter:nth-child(4).poofed {\
				-webkit-transform-origin: 50% 50%;\
				transform-origin: 50% 50%;\
				-webkit-animation: poofing4 1.4s ease-in-out infinite alternate;\
				animation: poofing4 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes poofing4 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes poofing4 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(42deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(42deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part1 .letter:nth-child(4) .character {\
				color: #cee007;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 1.33333s;\
				animation-delay: 1.33333s;\
			}\
			\
			.text.part1 .letter:nth-child(4) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 1.33333s;\
				animation-delay: 1.33333s;\
			}\
			\
			.text.part1 .letter:nth-child(5).poofed {\
				-webkit-transform-origin: 50% 50%;\
				transform-origin: 50% 50%;\
				-webkit-animation: poofing5 1.4s ease-in-out infinite alternate;\
				animation: poofing5 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes poofing5 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes poofing5 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(384deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(384deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part1 .letter:nth-child(5) .character {\
				color: #00c6b2;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 1.66667s\
				animation-delay: 1.66667s;\
			}\
			\
			.text.part1 .letter:nth-child(5) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 1.66667s;\
				animation-delay: 1.66667s;\
			}\
			\
			.text.part1 .letter:nth-child(6).poofed {\
				-webkit-transform-origin: 50% 50%;\
				transform-origin: 50% 50%;\
				-webkit-animation: poofing6 1.4s ease-in-out infinite alternate;\
				animation: poofing6 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes poofing6 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes poofing6 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part1 .letter:nth-child(6) .character {\
				color: #f44336;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 2s;\
				animation-delay: 2s;\
			}\
			\
			.text.part1 .letter:nth-child(6) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 2s;\
				animation-delay: 2s;\
			}\
			\
			.text.part1 .letter:nth-child(7).poofed {\
				-webkit-transform-origin: 50% 50%;\
				transform-origin: 50% 50%;\
				-webkit-animation: poofing7 1.4s ease-in-out infinite alternate;\
				animation: poofing7 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes poofing7 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes poofing7 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(156deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(156deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part1 .letter:nth-child(7) .character {\
				color: #4CAF50;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 2s;\
				animation-delay: 2.5s;\
			}\
			\
			.text.part1 .letter:nth-child(7) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 2s;\
				animation-delay: 3s;\
			}\
			\
			.text.part2 span:nth-child(1).poofed {\
				-webkit-animation: sec_poofing1 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing1 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing1 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing1 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(268deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(268deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(1) .character {\
				color: #ff5a5f;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 2.33333s;\
				animation-delay: 2.33333s;\
			}\
			\
			.text.part2 span:nth-child(1) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 2.33333s;\
				animation-delay: 2.33333s;\
			}\
			\
			.text.part2 span:nth-child(2).poofed {\
				-webkit-animation: sec_poofing2 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing2 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing2 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing2 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(135deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(135deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(2) .character {\
				color: #f99b0c;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 2.66667s;\
				animation-delay: 2.66667s;\
			}\
			\
			.text.part2 span:nth-child(2) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 2.66667s;\
				animation-delay: 2.66667s;\
			}\
			\
			.text.part2 span:nth-child(3).poofed {\
				-webkit-animation: sec_poofing3 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing3 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing3 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing3 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(442deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(442deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(3) .character {\
				color: #cee007;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 3s;\
				animation-delay: 3s;\
			}\
			\
			.text.part2 span:nth-child(3) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 3s;\
				animation-delay: 3s;\
			}\
			\
			.text.part2 span:nth-child(4).poofed {\
				-webkit-animation: sec_poofing4 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing4 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing4 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing4 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(525deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(525deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(4) .character {\
				color: #00c6b2;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 3.33333s;\
				animation-delay: 3.33333s;\
			}\
			\
			.text.part2 span:nth-child(4) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 3.33333s;\
				animation-delay: 3.33333s;\
			}\
			\
			.text.part2 span:nth-child(5).poofed {\
				-webkit-animation: sec_poofing5 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing5 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing5 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing5 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(419deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(419deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(5) .character {\
				color: #4e2a84;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 3.66667s;\
				animation-delay: 3.66667s;\
			}\
			\
			.text.part2 span:nth-child(5) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 3.66667s;\
				animation-delay: 3.66667s;\
			}\
			\
			.text.part2 span:nth-child(6).poofed {\
				-webkit-animation: sec_poofing6 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing6 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing6 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing6 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(246deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(246deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(6) .character {\
				color: #9C27B0;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 4s;\
				animation-delay: 4s;\
			}\
			\
			.text.part2 span:nth-child(6) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 4s;\
				animation-delay: 4s;\
			}\
			\
			.text.part2 span:nth-child(7).poofed {\
				-webkit-animation: sec_poofing7 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing7 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing7 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing7 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(206deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(206deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(7) .character {\
				color: #f99b0c;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 4.33333s;\
				animation-delay: 4.33333s;\
			}\
			\
			.text.part2 span:nth-child(7) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 4.33333s;\
				animation-delay: 4.33333s;\
			}\
			\
			.text.part2 span:nth-child(8).poofed {\
				-webkit-animation: sec_poofing8 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing8 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing8 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing8 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(60deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(60deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(8) .character {\
				color: #cee007;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 4.66667s;\
				animation-delay: 4.66667s;\
			}\
			\
			.text.part2 span:nth-child(8) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 4.66667s;\
				animation-delay: 4.66667s;\
			}\
			\
			.text.part2 span:nth-child(9).poofed {\
				-webkit-animation: sec_poofing9 1.4s ease-in-out infinite alternate;\
				animation: sec_poofing9 1.4s ease-in-out infinite alternate;\
			}\
			\
			@-webkit-keyframes sec_poofing9 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			@keyframes sec_poofing9 {\
				0% {\
					-webkit-transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(0) translateY(0px) scale(1);\
				}\
				50% {\
					-webkit-transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(0deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				56% {\
					-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\
					transform: rotateZ(496deg) rotateY(360deg) translateY(0px) scale(1);\
				}\
				100% {\
					-webkit-transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\
					transform: rotateZ(496deg) rotateY(360deg) translateY(-700px) scale(0.01);\
				}\
			}\
			\
			.text.part2 span:nth-child(9) .character {\
				color: #00c6b2;\
				-webkit-animation: wave 1.2s linear infinite;\
				animation: wave 1.2s linear infinite;\
				-webkit-animation-delay: 5s;\
				animation-delay: 5s;\
			}\
			\
			.text.part2 span:nth-child(9) span::before {\
				-webkit-animation: shadow 1.2s linear infinite;\
				animation: shadow 1.2s linear infinite;\
				-webkit-animation-delay: 5s;\
				animation-delay: 5s;\
			}\
			\
			@-webkit-keyframes wave {\
				0% {\
					-webkit-transform: translateY(0);\
					transform: translateY(0);\
				}\
				50% {\
					-webkit-transform: translateY(-10px);\
					transform: translateY(-10px);\
				}\
				100% {\
					-webkit-transform: translateY(0);\
					transform: translateY(0);\
				}\
			}\
			\
			@keyframes wave {\
				0% {\
					-webkit-transform: translateY(0);\
					transform: translateY(0);\
				}\
				50% {\
					-webkit-transform: translateY(-10px);\
					transform: translateY(-10px);\
				}\
				100% {\
					-webkit-transform: translateY(0);\
					transform: translateY(0);\
				}\
			}\
			\
			@-webkit-keyframes shadow {\
				0% {\
					width: 0;\
					height: 0;\
				}\
				50% {\
					width: 100%;\
					height: 100%;\
				}\
				100% {\
					width: 0;\
					height: 0;\
				}\
			}\
			\
			@keyframes shadow {\
				0% {\
					width: 0;\
					height: 0;\
				}\
				50% {\
					width: 100%;\
					height: 100%;\
				}\
				100% {\
					width: 0;\
					height: 0;\
				}\
			}\
			\
			.how-to {\
				margin: 2rem 0 2rem 1rem;\
				font-family: "Opens Sans", sans-serif;\
				font-weight: 300;\
				font-size: .85em;\
				letter-spacing: 4px;\
				/*color: rgba(0, 0, 0, 0.8);*/\
				color: rgba(255, 255, 255, 0.8);\
			}\
			\
			@-webkit-keyframes rotate {\
				0% {\
					-webkit-transform: rotateZ(0) scale(0.7);\
					transform: rotateZ(0) scale(0.7);\
				}\
				100% {\
					-webkit-transform: rotateZ(360deg) scale(0.7);\
					transform: rotateZ(360deg) scale(0.7);\
				}\
			}\
			\
			@keyframes rotate {\
				0% {\
					-webkit-transform: rotateZ(0) scale(0.7);\
					transform: rotateZ(0) scale(0.7);\
				}\
				100% {\
					-webkit-transform: rotateZ(360deg) scale(0.7);\
					transform: rotateZ(360deg) scale(0.7);\
				}\
			}\
			\
			@media only screen and (max-width: 767px) {\
				.text {\
					font-size: 6em;\
				}\
				.text .letter span {\
					bottom: .5rem;\
				}\
			}\
			\
			@media only screen and (max-width: 480px) {\
				.text {\
					font-size: 4em;\
				}\
				.text .letter span {\
					bottom: 0;\
				}\
			}\
			'
			);
			
		var obj = document.getElementsByClassName("v6 game_bg responsive_page")[0]; //body
		var objElement = document.createElement('div');
		objElement.id="loadingUI" //<div id="loadingUI">\ //</div>
		objElement.style = "position: absolute; left: 0; right: 0; top: 0; z-index: 10;background: url(https://steamcommunity-a.akamaihd.net/public/images/friends/colored_body_top2.png?v=2) center top no-repeat #1b2838;";
		objElement.innerHTML = 
			'<div class="text-wrapper">\
					<div class="text part1">\
						<div>\
							<span class="letter">\
								<div class="character">L</div> <span></span>\
							</span>\
							<span class="letter">\
								<div class="character">o</div> <span></span>\
							</span>\
							<span class="letter">\
								<div class="character">a</div> <span></span>\
							</span>\
							<span class="letter">\
								<div class="character">d</div> <span></span>\
							</span>\
							<span class="letter">\
								<div class="character">i</div> <span></span>\
							</span>\
							<span class="letter">\
								<div class="character">n</div> <span></span>\
							</span>\
							<span class="letter">\
								<div class="character">g</div> <span></span>\
							</span>\
						</div>\
					</div>\
					<div class="how-to"><span>正在加载资源中，已完成0/10，请您耐心等待...</span></div>\
				</div>\
				';
		obj.appendChild(objElement);
		console.log("showLoadUI()");
	}
	
	loadTextChange(mode){ //改变当前加载进度
		if(this.isDomLoaded == false){
			this.loadProgress++;
		}
		else{
			var obj = document.getElementsByClassName('how-to')[0];
			obj.innerText = "正在加载资源中，已完成"+ (++this.loadProgress) + "/10，请您耐心等待...";
		}
	}
	
	remoreLoadUI(){ //移除加载UI和css
	
		if((()=>{
			var obj = document.getElementsByClassName("v6 game_bg responsive_page")[0]; //body
			var objChildNodes = obj.childNodes; //childNodes
			for (let i = 0; i < objChildNodes.length; i++) {
				if(objChildNodes[i].id == "loadingUI"){
					obj.removeChild(objChildNodes[i]); //移除加载UI
					return true;
				}
			}
			return false;
		})() == false){
			console.log("移除加载UI失败~!");
			return false;
		}
		
		if((()=>{
			var obj = document.getElementsByTagName("head")[0]; //head
			var objChildNodes = obj.childNodes; //childNodes
			for (let i = 0; i < objChildNodes.length; i++) {
				if(objChildNodes[i].id == "styles_loading"){
					obj.removeChild(objChildNodes[i]); //移除css
					return true;
				}
			}
			return false;
		})() == false){
			console.log("移除css失败~!");
			return false;
		}
		
		return true;
	}
		// 添加留言高级设置UI
		// 设置多个留言框按顺序留言+++
		// 设置多次留言
		// 设置留言队列(包含多个 多个留言框按顺序留言+++和多次留言)和留言对象
		// 设置留言优先级
		// 设置简单留言自动回复和特殊留言提醒功能
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	async loadBaseResources(){
		let arr = [];
		var arrjsData = new Array(5);
		
		//0.基本环境-加载css
		arr.push(new Promise(function (resolve, reject){
			//var cssData = await getResourceByURL("https://www.layuicdn.com/layui-v2.5.6/css/layui.css",true);
			//addNewStyle('layui_style',cssData);
			//console.log(layui.layer);
			//layui
			loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/layui.css",null, "css");
			loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9", "layuicss-laydate", "css");
			loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/layer.css?v=3.1.1", "layuicss-layer", "css");
			loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/code.css", "layuicss-skincodecss", "css");
			//font-awesome
			loadjscssFile("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css", "css");
			//覆盖layui的css
			addNewStyle('styles_js0',
				'a {\
					color:#ebebeb;\
					text-decoration: none;\
				}\
				a:hover {\
					color: #aaa\
				}\
				.layui-form-checkbox[lay-skin=primary] span{\
					color: #ebebeb;\
				}\
				.layui-checkbox-disbaled[lay-skin=primary] span{\
					color: #999;\
				}\
				.layui-tab-brief>.layui-tab-title .layui-this {\
				    color: #01e0cb;\
				}\
				'
			); /* 覆盖layui的css样式 */
			gc_ui.loadTextChange(true); //改变当前加载进度
			resolve('css') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		
		//1.基本环境-加载js到页面上，方便调试
		arr.push(new Promise(async function (resolve, reject){
			//loadjscssFile("https://www.layuicdn.com/layui-v2.5.6/layui.all.js","js");
			var jsData = await getResourceByURL("https://www.layuicdn.com/layui-v2.5.6/layui.all.js",true); //
			//console.log("数据获取成果",jsData);
			addNewScript('layui_Script', jsData);
			//console.log("layui_Script success.");
			gc_ui.loadTextChange(true); //改变当前加载进度
			resolve('layui') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			//loadjscssFile("https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js","js");
			var jsData = await getResourceByURL("https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js",true);
			//console.log("数据获取成果",jsData);
			addNewScript('localforage_Script', jsData);
			//console.log("localforage_Script success.");
			gc_ui.loadTextChange(true); //改变当前加载进度
			resolve('localforage') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			//loadjscssFile("https://code.highcharts.com.cn/highstock/highstock.js","js");
			var jsData = await getResourceByURL("https://code.highcharts.com.cn/highstock/highstock.js",true);
			//console.log("数据获取成果",jsData);
			addNewScript('highstock_Script', jsData);
			//console.log("highstock_Script success.");
			gc_ui.loadTextChange(true); //改变当前加载进度
			resolve('highstock') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			//loadjscssFile("https://code.highcharts.com.cn/highcharts/modules/exporting.js","js");
			arrjsData[1] = await getResourceByURL("https://code.highcharts.com.cn/highcharts/modules/exporting.js",true);
			//console.log("数据获取成果",jsData);
			resolve('highcharts exporting') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			//loadjscssFile("https://code.highcharts.com.cn/highcharts/modules/oldie.js","js");
			arrjsData[2] = await getResourceByURL("https://code.highcharts.com.cn/highcharts/modules/oldie.js",true);
			//console.log("数据获取成果",jsData);
			resolve('highcharts oldie') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			//loadjscssFile("https://code.highcharts.com.cn/highcharts/modules/networkgraph.js","js");
			arrjsData[3] = await getResourceByURL("https://code.highcharts.com.cn/highcharts/modules/networkgraph.js",true);
			//console.log("数据获取成果",jsData);
			resolve('highcharts networkgraph') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			//loadjscssFile("https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js","js");
			arrjsData[4] = await getResourceByURL("https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js",true);
			//console.log("数据获取成果",jsData);
			resolve('highcharts zh_CN') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		
		arr.push(new Promise(async function (resolve, reject){
			addNewStyle('styles_js',
				'::selection {color:#000;background: #35d5ff;}\
					#addFriendToGroup,#unaddFriendToGroup,#setTimeInterval,#unsetTimeInterval,#setNoLeave,#unsetNoLeave,#addCustomName,#translationText,#setNationality,#unsetNationality,#NationalityGroup,#NationalitySortGroup,#OfflineTimeGroup,#ShowFriendData {font-family: "Motiva Sans", Sans-serif;font-weight: 300;\
					padding: 2px 5px;border:0;outline:0;border-radius: 2px;color: #67c1f5 !important;background: rgba(0, 0, 0, 0.5 );}\
					.persona.offline, a.persona.offline, .persona.offline.a {color:#ccc;}\
					.persona, a.persona, .persona a, .friend_status_offline, .friend_status_offline div, .friend_status_offline a {color:#ccc;}\
					.player_nickname_hint {color:#ccc;}\
					#addFriendToGroup:hover,#unaddFriendToGroup:hover,#setTimeInterval:hover,#unsetTimeInterval:hover,#setNoLeave:hover,#unsetNoLeave:hover,#addCustomName:hover,#translationText:hover,#setNationality:hover,#unsetNationality:hover,#NationalityGroup:hover,#NationalitySortGroup:hover,#OfflineTimeGroup:hover,#ShowFriendData:hover {background-color: #0a6aa1;color: #fff !important;cursor: pointer;}'
			); /* 选择的文本 */
			addNewStyle('styles1_js',
				'.fs-wrap {\
					position: relative;\
					display: inline-block;\
					vertical-align: bottom;\
					width: 200px;\
					margin: 3px;\
					font-size: 12px;\
					line-height: 1\
				}\
				.fs-label-wrap {\
					position: relative;\
					border: 1px solid #34DEFF;\
					cursor: default;\
					color: #66ccff;\
					border-radius: 4px;\
					box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075)\
				}\
				.fs-label-wrap,\
				.fs-dropdown {\
					-webkit-user-select: none;\
					-moz-user-select: none;\
					-ms-user-select: none;\
					user-select: none\
				}\
				.fs-label-wrap .fs-label {\
					padding: 4px 22px 4px 8px;\
					text-overflow: ellipsis;\
					white-space: nowrap;\
					overflow: hidden;\
					cursor: pointer\
				}\
				.fs-arrow {\
					width: 0;\
					height: 0;\
					border-left: 4px solid transparent;\
					border-right: 4px solid transparent;\
					border-top: 6px solid #fff;\
					position: absolute;\
					top: 0;\
					right: 4px;\
					bottom: 0;\
					margin: auto;\
					cursor: pointer\
				}\
				.fs-dropdown {\
					position: absolute;\
					background-color: #3E9AC6;\
					border: 1px solid #000;\
					width: 100%;\
					z-index: 1000;\
					border-radius: 4px\
				}\
				.fs-dropdown .fs-options {\
					max-height: 200px;\
					overflow: auto\
				}\
				\
				.fs-search input {\
					width: 90%;\
					padding: 2px 4px;\
					border: 0\
					outline: 0;\
				}\
				.fs-selectAll {\
					float: right;\
					cursor: pointer;\
					margin-top: 4px;\
					height: auto\
				}\
				.fs-selectAll.selected {\
					float: right;\
					cursor: pointer;\
					margin-top: 4px;\
					height: auto;\
					color: green\
				}\
				.fs-selectAll:hover {\
					background-color: #35d5ff\
				}\
				.fs-option,\
				.fs-search,\
				.fs-optgroup-label {\
					padding: 6px 8px;\
					border-bottom: 1px solid #eee;\
					cursor: default\
				}\
				.fs-option {cursor: pointer}\
				.fs-option.hl {\
					background-color: #f5f5f5\
				}\
				.fs-wrap.multiple .fs-option {\
					position: relative;\
					padding-left: 30px\
				}\
				.fs-wrap.multiple .fs-checkbox {\
					position: absolute;\
					display: block;\
					width: 30px;\
					top: 0;\
					left: 0;\
					bottom: 0\
				}\
				.fs-wrap.multiple .fs-option .fs-checkbox i {\
					position: absolute;\
					margin: auto;\
					left: 0;\
					right: 0;\
					top: 0;\
					bottom: 0;\
					width: 14px;\
					height: 14px;\
					border: 1px solid #aeaeae;\
					border-radius: 4px;\
					background-color: #fff\
				}\
				.fs-wrap.multiple .fs-option.selected .fs-checkbox i {\
					background-color: #11a911;\
					border-color: transparent;\
					background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAABMSURBVAiZfc0xDkAAFIPhd2Kr1WRjcAExuIgzGUTIZ/AkImjSofnbNBAfHvzAHjOKNzhiQ42IDFXCDivaaxAJd0xYshT3QqBxqnxeHvhunpu23xnmAAAAAElFTkSuQmCC);\
					background-repeat: no-repeat;\
					background-position: center\
				}\
				.fs-wrap .fs-option:hover {\
					background: #48E3FF;\
					border-radius: 4px;\
					margin-left: 2px;\
					margin-right: 2px\
				}\
				.fs-optgroup-label {font-weight: 700}\
				.hidden {display: none}\
				.fs-options::-webkit-scrollbar {width: 6px}\
				.fs-options::-webkit-scrollbar-track {\
					-webkit-border-radius: 2em;\
					-moz-border-radius: 2em;\
					border-radius: 2em;\
					-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);\
					background: rgba(0, 0, 0, .1)}\
				.fs-options::-webkit-scrollbar-thumb {\
					-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);\
					background: rgba(0, 0, 0, .2);\
					-webkit-border-radius: 2em;\
					-moz-border-radius: 2em;\
					border-radius: 2em\
				}'
			); /* 选择的文本 */
			
			addNewScript('styles_Script',
				"\
			function wordCount(data) {\
				var intLength = 0;\
				for (var i = 0; i < data.length; i++) {\
					if ((data.charCodeAt(i) < 0) || (data.charCodeAt(i) > 255))\
						intLength = intLength + 3;\
					else\
						intLength = intLength + 1;\
				}\
				return intLength;\
			}\
			var arrComment = []; /*id文本框的id, height文本框的高度, scrollTop存储收缩状态下的进度条, visible可见性*/\
			\
			function inBoxShrinkage(id,type,mode = true){ /*参数: string 要伸缩的文本框id,boolean 是收缩还是伸展,boolean 需不需要重置滚动条(默认重置)*/\
				var iArr = -1;\
				for(let i=0;i<arrComment.length;i++){\
					if(arrComment[i].id == id){\
						iArr = i; /*记录旧节点的下标*/\
						/*console.log('记录旧节点的下标','iArr',iArr);*/\
						break;\
					}\
				}\
				if(iArr == -1){\
					arrComment.push( {id: id, height: 0, scrollTop: 0, visible: true} ); /*没有找到则是新的节点,就添加*/\
					iArr = arrComment.length - 1 ; /*设置新节点的下标*/\
				}\
				var nHeight = arrComment[iArr].height; /*裁切字符串获取下标*/\
				if(nHeight==0){ /*第一次,没有指定的样式*/\
					nHeight = document.getElementById('comment_textarea').scrollHeight + 'px'; /*对于每个节点使用当前高度*/\
				}\
				var commentText = document.getElementById(id);\
				if (type == true){\
					commentText.removeEventListener('propertychange', change, false);\
					commentText.removeEventListener('input', change, false);\
					commentText.removeEventListener('focus', change, false);\
					commentText.scrollTop = 0;\
					\
					/*代码位于event.js translationText翻译按钮事件*/\
					/*代码位于uiHandler.js 获取输入框和注册的scroll事件*/\
					/*代码位于ui.js inBoxShrinkage()判断是否需要重新进行定位*/\
					/*https://blog.csdn.net/zhengbo0/article/details/7629506*/\
					/*https://www.jb51.net/article/104047.htm*/\
					/*如果留言框文本过长超过页面显示范围 或者 文本框不可见时，就重新进行定位 */\
					if((mode && arrComment[iArr].height > document.documentElement.clientHeight) || (mode && arrComment[iArr].visible == false)){\
						document.body.scrollTop = arrComment[iArr].scrollTop;\
						document.documentElement.scrollTop = arrComment[iArr].scrollTop;\
						console.log('重新进行定位');\
					}\
					commentText.style.height = '28px';\
				}\
				else if (type == false){\
					autoTextarea(commentText);\
					if(mode){\
						arrComment[iArr].scrollTop = document.documentElement.scrollTop; /*设置 存储收缩状态下的进度条*/\
					}\
					commentText.style.height = nHeight + 'px';\
				}\
				else if (type == 'test'){\
					if(mode){\
						arrComment[iArr].scrollTop = document.documentElement.scrollTop; /*设置 存储收缩状态下的进度条*/\
					}\
					commentText.style.height = nHeight + 'px';\
				}\
			}\
			\
			var change;\
			var autoTextarea = function(elem, extra, maxHeight) {\
				extra = extra || 0;\
				var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,\
					isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),\
					addEvent = function(type, callback) {\
						elem.addEventListener ?\
							elem.addEventListener(type, callback, false) :\
							elem.attachEvent('on' + type, callback);\
					},\
					getStyle = elem.currentStyle ? function(name) {\
						var val = elem.currentStyle[name];\
						if (name === 'height' && val.search(/px/i) !== 1) {\
							var rect = elem.getBoundingClientRect();\
							return rect.bottom - rect.top -\
								parseFloat(getStyle('paddingTop')) -\
								parseFloat(getStyle('paddingBottom')) + 'px';\
						};\
						return val;\
					} : function(name) {\
						return getComputedStyle(elem, null)[name];\
					},\
					minHeight = parseFloat(getStyle('height'));\
				elem.style.resize = 'none';\
				\
				change = function(e,id) {\
						var scrollTop, height,\
							padding = 0,\
							style = elem.style;\
						var obj = document.getElementById('strInBytes');\
						var commentText;\
						if(id == undefined || id == null)\
							commentText = document.getElementById(window.event.target.id);\
						else\
							commentText = document.getElementById(id);\
						var numText = wordCount(commentText.value);\
						obj.innerHTML =  \"当前字符字节数: <span id='strInBytes_Text'>\" + numText + '</span>/999';\
						if (wordCount(commentText.value) >= 1000) {\
							document.getElementById('strInBytes_Text').style.color = '#FF0000';\
							commentText.style.background = '#7C243E';\
							if(g_conf[0].isCommentRunStatus == false)/*如果正在留言则不清除(没有留言则清除)*/\
								jQuery('#log_head').html('');\
							jQuery('#log_head').html(\"<br><b style='color:#2CD8D6;'>字数超标啦! 请保持在1000字符以下. \" + '当前字数:' + numText + '<b>');\
							g_conf[0].isWarnInfo = true;\
						} else {\
							document.getElementById('strInBytes_Text').style.color = '#32CD32';\
							commentText.style.background = '#1b2838';\
							if(g_conf[0].isCommentRunStatus == false && g_conf[0].isWarnInfo == true){ /*没有留言并且有警告信息才清除*/\
								jQuery('#log_head').html('');\
								g_conf[0].isWarnInfo = false;\
							}\
						}\
						if (elem._length === elem.value.length) return;\
							elem._length = elem.value.length;\
						if (!isFirefox && !isOpera) {\
							padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));\
						};\
						scrollTop = document.body.scrollTop || document.documentElement.scrollTop; /*定位到最后*/\
						elem.style.height = minHeight + 'px';\
						if (elem.scrollHeight >= minHeight) {\
							if (maxHeight && elem.scrollHeight > maxHeight) {\
								height = maxHeight - padding;\
								style.overflowY = 'auto';\
							} else {\
								height = elem.scrollHeight - padding;\
								style.overflowY = 'hidden';\
							};\
							style.height = height + extra + 'px';\
							var nHeight1 = height + extra;\
							/*console.log('nHeight1',nHeight1,'newStr',newStr);*/\
							/*https://blog.csdn.net/weixin_34281477/article/details/93702604*/\
							/*https://www.cnblogs.com/cblogs/p/9293522.html*/\
							/*https://www.w3school.com.cn/tiy/t.asp?f=jseg_replace_1*/\
							var iIndex;\
							for(let i=0;i<arrComment.length;i++)\
							{\
								if(id == undefined || id == null){\
									if(arrComment[i].id == window.event.target.id){\
										iIndex = i;\
										break;\
									}\
								}\
								else{\
									if(arrComment[i].id == id){\
										iIndex = i;\
										break;\
									}\
								}\
							}\
							\
							arrComment[iIndex].height = nHeight1;/*存储*/\
							scrollTop += parseInt(style.height) - elem.currHeight;\
							if(!isNaN(scrollTop)){\
								document.body.scrollTop = scrollTop;\
								document.documentElement.scrollTop = scrollTop;\
							}\
							elem.currHeight = parseInt(style.height);\
						};\
				};\
				addEvent('propertychange', change);\
				addEvent('input', change);\
				/*addEvent('focus', change);*/\
				change();\
			};\
			\
			function openThisAndCloseOtherAllinBoxShrinkage(id,type){ /*打开这个，关闭其他所有的inBoxShrinkage*/\
				inBoxShrinkage(id,type); /*展开*/\
				if(id != 'comment_textarea' && document.getElementById('comment_textarea') != null)\
					inBoxShrinkage('comment_textarea',true,false);\
				if(id != 'comment_textarea_en' && document.getElementById('comment_textarea_en') != null)\
					inBoxShrinkage('comment_textarea_en',true,false);\
				if(id != 'comment_textarea_jp' && document.getElementById('comment_textarea_jp') != null)\
					inBoxShrinkage('comment_textarea_jp',true,false);\
				if(id != 'comment_textarea_zhc' && document.getElementById('comment_textarea_zhc') != null)\
					inBoxShrinkage('comment_textarea_zhc',true,false);\
				if(id != 'comment_textarea_zh_sg' && document.getElementById('comment_textarea_zh_sg') != null)\
					inBoxShrinkage('comment_textarea_zh_sg',true,false);\
				if(id != 'comment_textarea_zh_hant' && document.getElementById('comment_textarea_zh_hant') != null)\
					inBoxShrinkage('comment_textarea_zh_hant',true,false);\
				if(id != 'comment_textarea_zh_hk' && document.getElementById('comment_textarea_zh_hk') != null)\
					inBoxShrinkage('comment_textarea_zh_hk',true,false);\
				if(id != 'comment_textarea_zh_mo' && document.getElementById('comment_textarea_zh_mo') != null)\
					inBoxShrinkage('comment_textarea_zh_mo',true,false);\
				if(id != 'comment_textarea_zh_tw' && document.getElementById('comment_textarea_zh_tw') != null)\
					inBoxShrinkage('comment_textarea_zh_tw',true,false);\
			}\
			\
			var inBoxonblurID = 0;\
			function addEmojiEvent(emojiCode)\
			{\
				switch (inBoxonblurID){\
					case 0:\
						let inObj = document.getElementById('comment_textarea');\
						inObj.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea'); /*统计翻译后的文字长度*/\
						break;\
					case 1:\
						let inObj1 = document.getElementById('comment_textarea_en');\
						inObj1.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea_en'); /*统计翻译后的文字长度*/\
						break;\
					case 2:\
						let inObj2 = document.getElementById('comment_textarea_jp');\
						inObj2.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea_jp'); /*统计翻译后的文字长度*/\
						break;\
					case 3:\
						let inObj3 = document.getElementById('comment_textarea_zhc');\
						inObj3.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea_zhc'); /*统计翻译后的文字长度*/\
						break;\
					case 4:\
						let inObj4 = document.getElementById('comment_textarea_zh_sg');\
						inObj4.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea_zh_sg'); /*统计翻译后的文字长度*/\
						break;\
					case 5:\
						let inObj5 = document.getElementById('comment_textarea_zh_hant');\
						inObj5.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea_zh_hant'); /*统计翻译后的文字长度*/\
						break;\
					case 6:\
						let inObj6 = document.getElementById('comment_textarea_zh_hk');\
						inObj6.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea_zh_hk'); /*统计翻译后的文字长度*/\
						break;\
					case 7:\
						let inObj7 = document.getElementById('comment_textarea_zh_mo');\
						inObj7.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea_zh_mo'); /*统计翻译后的文字长度*/\
						break;\
					case 8:\
						let inObj8 = document.getElementById('comment_textarea_zh_tw');\
						inObj8.value += ':' + emojiCode + ':'; /*添加表情*/\
						if(change != undefined)\
							change(null, 'comment_textarea_zh_tw'); /*统计翻译后的文字长度*/\
						break;\
					default:\
						break;\
				}}\
				"
			);
			
			addNewScript('Utility_Script',
				'\
					function emojiFix() { /*修复表情*/\
						console.log("表情开始修复...");\
						let obj = document.getElementsByClassName("emoticon_popup es_emoticons")[0];\
						if (obj != undefined) {\
							obj.style.position = "relative";\
							obj.style.zIndex = "999";\
						}\
					\
						let obj1 = document.getElementsByClassName("emoticon_popup_ctn")[0];\
						if (obj1 != undefined) {\
							obj1.style.zIndex = "999";\
						}\
					\
						let emojiObjArrs = document.getElementsByClassName("emoticon_option");\
						if (emojiObjArrs.length > 0) {\
							for (let i in emojiObjArrs) {\
								emojiObjArrs[i].onclick = function() {\
									addEmojiEvent(emojiObjArrs[i].getAttribute(\'data-emoticon\'));\
								}\
							}\
							console.log("表情修复完毕!");\
						}\
						/*console.log("修复表情错误!");*/\
					}\
					\
					function dvWidthFix() { /*用于修复PC端留言提示内容溢出导致布局发生错误的问题*/\
						$("subpage_container").style.width = "calc(100% - 280px)";\
					}\
					\
					function deleteSelectText(){ /*删除选择的文本*/\
						window.getSelection().deleteFromDocument(); /*删除选择的文本*/\
					}\
					'
			);
			gc_ui.loadTextChange(true); //改变当前加载进度
			resolve('css js') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		
		arr.push(new Promise(async function (resolve, reject){
			document.addEventListener("DOMContentLoaded", function(event) {
			//console.log("DOM fully loaded and parsed");
			if(gc_ui.loadProgress < 9) //资源是否已经加载完毕(已缓存)，如果加载完成则不需要显示加载UI
			{
				gc_ui.showLoadUI();
				gc_ui.loadTextChange(true); //改变当前加载进度
				gc_ui.isDomLoaded = true;
			}
			resolve('DOM fully loaded') // 数据处理完成
			// reject('失败') // 数据处理出错
			});
		}));
		
		let res = await Promise.all(arr);
		
		addNewScript('highcharts_exporting_Script', arrjsData[1]);
		//console.log("highcharts_exporting_Script success.");
		gc_ui.loadTextChange(true); //改变当前加载进度
		
		addNewScript('highcharts_oldie_Script', arrjsData[2]);
		//console.log("highcharts_oldie_Script success.");
		gc_ui.loadTextChange(true); //改变当前加载进度
		
		addNewScript('highcharts_networkgraph_Script', arrjsData[3]);
		//console.log("highcharts_networkgraph_Script success.");
		gc_ui.loadTextChange(true); //改变当前加载进度
		
		addNewScript('highcharts_zh_CN_Script', arrjsData[4]);
		//console.log("highcharts_zh_CN_Script success.");
		gc_ui.loadTextChange(true); //改变当前加载进度
		
		if(!this.remoreLoadUI()){//移除加载UI
			console.log("remoreLoadUI() 失败!");
		}
		console.log("ret:",res);
	}
	
	async initUI() {
		//提前加载资源，等待所有资源加载完毕后直接运行，以最大程序缩减脚本初始化等待的时间
		await this.loadBaseResources(); //加载基础资源
		
		if(getLoginStatus() == false){ //判断是否登录，如果没有登录则不需要继续运行
			layer.alert('请先登录Steam，才能继续使用哦~', {icon: 0},function(index){
				if(g_conf[0].autoLogin == 1){
					var obj = document.getElementsByClassName("global_action_link");
					for (let i = 0; i < obj.length; i++) {
						if(obj[i].className == "global_action_link"){
							obj[i].click(); //跳转到登录页面
						}
					}
				}
			});
			return false;
		}
		
		readConfInfo(g_steamID); //读取已保存的对应配置信息
	}
	async createUI() {
		//正常html代码
		jQuery("#manage_friends").after(
			'<div class="layui-tab layui-tab-brief" lay-filter="demo">\
			  <ul class="layui-tab-title" style="color: #ebebeb;">\
			    <li class="layui-this">留言</li>\
			    <li>留言设置</li>\
			    <li>数据分析</li>\
				<li>动态助手</li>\
				<li>拓展功能(测试)</li>\
			    <li>设置</li>\
			  </ul>\
			  <div class="layui-tab-content">\
			    <div class="layui-tab-item layui-show">\
				  <!----------------------------------------------------------------------------------------------------------------->\
				  <div class="commentthread_entry">\
				  		<div class="commentthread_entry_quotebox">\
				  			<!--<textarea class="commentthread_textarea" id="comment_textarea" onfocus="this.focus();this.select();inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>-->\
							<textarea class="commentthread_textarea" id="comment_textarea" onfocus="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>\
				  		</div>\
						<form class="layui-form" action="" lay-filter="example">\
							<div id="strInBytes" style="color: #32CD32;display: inline-block;font-family: Consolas;font-size: 16px;">当前字符字节数: <span id="strInBytes_Text">0</span>/999\</div>\
							<div class="layui-inline">\
							     <label class="layui-form-label" style="width: auto;">文本格式(直接添加或选择文字添加):</label>\
							     <div class="layui-input-inline">\
							       <select name="modules" lay-verify="required" lay-search="" id="steamTextStyle">\
							         <option value="">直接选择或搜索选择</option>\
							         <option value="1">[h1] 标题文字 [/h1]</option>\
							         <option value="2">[b] 粗体文本 [/b]</option>\
							         <option value="3">[u] 下划线文本 [/u]</option>\
							         <option value="4">[i] 斜体文本 [/i]</option>\
							         <option value="5">[strike] 删除文本 [/strike]</option>\
							         <option value="6">[spoiler] 隐藏文本 [/spoiler]</option>\
							         <option value="7">[noparse] 不解析[b]标签[/b] [/noparse]</option>\
							         <option value="8">[url=store.steampowered.com] 网站链接 [/url]</option>\
							       </select>\
							     </div>\
								 <button type="button" class="layui-btn layui-btn-normal" id="LAY-component-form-getval">添加</button>\
							   </div>\
						</form>\
						  \
				  		<fieldset class="layui-elem-field layui-field-title">\
				  		  <legend>翻译模块(需要提前设置国籍):</legend>\
						</fieldset>\
						<div id="translationOptions" style="color:#fff;">\
				  								<span>当前语言: \
				  									<select id="origLanguageSelectBox" style="padding: 4px 12px 4px 8px;font-size:12px;outline:0;border: 1px solid #34DEFF;background-color:transparent;color: #66ccff;">\
				  										<option name="auto" value="auto" style="color:#fff;background-color: #3E9AC6;">自动检测</option>\
				  										<option name="zhc" value="zh-CN" style="color:#fff;background-color: #3E9AC6;">中文简体</option>\
				  										<option name="en" value="en" style="color:#fff;background-color: #3E9AC6;">英语</option>\
				  										<option name="jp" value="ja" style="color:#fff;background-color: #3E9AC6;">日语</option>\
				  									</select>\
				  								</span>\
				  								<span style="margin-left: 5px;">目标语言: \
				  									<select id="selectBoxID" class="selectBox" multiple="multiple">\
				  										<option value="en">英语</option>\
				  										<option value="ja">日语</option>\
				  										<option value="zh-CN">中文简体</option>\
				  										<option value="zh-sg">马新简体[zh-sg]</option>\
				  										<option value="zh-hant">繁體中文[zh-hant]</option>\
				  										<option value="zh-hk">繁體中文(香港)[zh-hk]</option>\
				  										<option value="zh-mo">繁體中文(澳门)[zh-mo]</option>\
				  										<option value="zh-tw">繁體中文(台湾)[zh-tw]</option>\
				  									</select>\
				  								</span>\
				  								<span style="margin-left: 5px;vertical-align: middle;">\
				  									<button id="translationText">翻译</button>\
				  								</span>\
				  							</div>\
											<fieldset class="layui-elem-field layui-field-title">\
											  <legend>添加称呼模块(需要提前设置备注):</legend>\
											</fieldset>\
				  		<div class="commentthread_entry_submitlink" style="">\
				  			<span class="isCustom" style="display: block;text-align: left;">\
				  				<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">自定义称呼模式 (默认为{name}, 可以自行修改, 好友没有备注则使用steam名称)</span>\
				  				<input class="nameAddType" id="select_isCustom_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\
								<span style="margin-left: 5px;vertical-align: middle;">\
									<button id="addCustomName">在留言框添加自定义称呼标识符</button>\
								</span>\
				  			</span>\
				  			<span class="isName" style="display: block;text-align: left;">\
				  				<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为好友添加称呼 (如果好友没有备注则使用steam名称)</span>\
				  				<input class="nameAddType" id="select_islName_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\
				  			</span>\
				  			<span class="isSpecialName" style="display: block;text-align: left;">\
				  				<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为好友添加称呼 (如果好友设置有备注则使用,否则不添加称呼)</span>\
				  				<input class="nameAddType" id="select_isSpecialName_checkbox" name="nameAddType"  type="radio" style="vertical-align: middle;margin:2px;">\
				  			</span>\
							<fieldset class="layui-elem-field layui-field-title" style="padding: 10px 0px;">\
				  			<span style="display: block;text-align: right;">\
								<a class="btn_grey_black btn_small_thin" href="javascript:CCommentThread.FormattingHelpPopup( \'Profile\' );">\
									<span class="btn_grey_black btn_small_thin_text">格式化帮助</span>\
								</a>\
								<span class="emoticon_container">\
									<span class="emoticon_button small" id="emoticonbtn"></span>\
								</span>\
								<span class="btn_green_white_innerfade btn_small" id="comment_submit">\
									<span id="comment_submit_text">发送评论给选择的好友</span>\
								</span>\
								<span class="btn_green_white_innerfade btn_small" id="comment_submit_special">\
									<span id="comment_submit_special_text">根据国籍发送评论给选择的好友</span>\
								</span>\
							</span>\
				  		</div>\
				  	</div>\
				  	<div id="log">\
				  		<span id="log_head"></span>\
				  		<span id="log_body" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/"></span>\
				  	</div>\
					<!----------------------------------------------------------------------------------------------------------------->\
				  \
			    </div>\
				\
			    <div class="layui-tab-item">\
					<div style="text-align: left;margin: 5px 0px;">\
						<span style="margin-left: 5px;vertical-align: middle;">\
							<fieldset class="layui-elem-field layui-field-title">\
							  <legend>设置国籍:</legend>\
						    </fieldset>\
							<div style="color: #67c1f5;">请选择要设置的国籍:</div>\
							<select id="nationalitySelectBox" style="padding: 4px 12px 4px 8px;font-size:12px;outline:0;border: 1px solid #34DEFF;background-color:transparent;color: #66ccff;">\
								<option name="CN" value="CN" style="color:#fff;background-color: #3E9AC6;">简体中文</option>\
								<option name="EN" value="EN" style="color:#fff;background-color: #3E9AC6;">英语</option>\
								<option name="JP" value="JP" style="color:#fff;background-color: #3E9AC6;">日语</option>\
								<option name="CN-SG" value="CN-SG" style="color:#fff;background-color: #3E9AC6;">马新简体(马来西亚,新加坡)[zh-sg]</option>\
								<option name="CN-HANT" value="CN-HANT" style="color:#fff;background-color: #3E9AC6;">繁體中文[zh-hant]</option>\
								<option name="CN-HK" value="CN-HK" style="color:#fff;background-color: #3E9AC6;">繁體中文(香港)[zh-hk]</option>\
								<option name="CN-MO" value="CN-MO" style="color:#fff;background-color: #3E9AC6;">繁體中文(澳门)[zh-mo]</option>\
								<option name="CN-TW" value="CN-TW" style="color:#fff;background-color: #3E9AC6;">繁體中文(台湾)[zh-tw]</option>\
							</select>\
							<button id="setNationality">为选择的好友设置国籍标识</button>\
						</span>\
						<span style="margin-left: 5px;vertical-align: top;">\
							<button id="unsetNationality">为选择的好友取消国籍标识</button>\
						</span>\
						<br />\
						 <fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置不留言:</legend>\
						 </fieldset>\
						<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\
							<span>\
								<button id="setNoLeave">为选择的好友设置不留言</button>\
							</span>\
							<span>\
								<button id="unsetNoLeave">为选择的好友取消设置不留言</button>\
							</span>\
						</div>\
						<fieldset class="layui-elem-field layui-field-title">\
						  <legend>设置留言时间间隔:</legend>\
						</fieldset>\
						<div id="">只选择日期则过n天后再留言，只选择时间则过x时后再留言(严格模式)，日期和时间都选择了则过n天x时后再留言(严格模式)</div>\
						<div id="">这里其实是一个时间差，比如指定的好友3天留言一次，今天是4月10日，你就选择4月13日就行了，这样做方便一点</div>\
						<div class="layui-form">\
						  <div class="layui-form-item">\
							<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\
						      <label class="layui-form-label">请选择留言</label> <!--这个是被点击对象，隐藏、不占空间、触发事件-->\
						      <div class="layui-input-inline">\
						        <input type="text" class="layui-input" id="test-limit2" readonly="" placeholder="yyyy-MM-dd">\
						      </div>\
						    </div>\
							<div class="layui-inline" style="position: relative;z-index: -1;">\
							  <label class="layui-form-label">留言日期差</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\
							  <div class="layui-input-inline">\
							    <input type="text" class="layui-input" id="test-limit1" readonly="" placeholder="yyyy-MM-dd">\
							  </div>\
							</div>\
							\
						  </div>\
						</div>\
						<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\
							<span>\
								<button id="setTimeInterval">为选择的好友设置留言时间间隔</button>\
							</span>\
							<span>\
								<button id="unsetTimeInterval">为选择的好友取消设置留言时间间隔</button>\
							</span>\
						</div>\
						\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置自动留言计划:</legend>\
						</fieldset>\
						<div class="layui-form">\
						  <div class="layui-form-item">\
							<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\
								<label class="layui-form-label">请选择时间</label>  <!--这个是被点击对象，隐藏、不占空间、触发事件-->\
								<div class="layui-input-inline">\
									<input type="text" class="layui-input" id="test14" placeholder="H时m分s秒">\
								</div>\
							</div>\
							<div class="layui-inline" style="position: relative;z-index: -1;">\
								<label class="layui-form-label">请选择时间</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\
								<div class="layui-input-inline">\
									<input type="text" class="layui-input" id="test15" placeholder="H时m分s秒">\
								</div>\
							</div>\
						  </div>\
						</div>\
						\
						<table class="layui-hide" id="test" lay-filter="test"></table> <!-- 数据表格 -->\
						\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置好友分组:</legend>\
						</fieldset>\
						<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\
						\
						<form class="layui-form" action="">\
						  <div class="layui-form-item">\
						    <div class="layui-inline">\
						      <label class="layui-form-label">分组列表</label>\
						      <div class="layui-input-inline">\
						        <select name="modules" lay-verify="required" lay-search="">\
						          <option value="">直接选择或搜索选择</option>\
						          <option value="1">分组名称</option>\
						          <option value="2">分组名称</option>\
						          <option value="3">分组名称</option>\
						          <option value="4">分组名称</option>\
						          <option value="5">分组名称</option>\
						          <option value="6">分组名称</option>\
						          <option value="7">分组名称</option>\
						          <option value="8">分组名称</option>\
						          <option value="9">分组名称</option>\
						        </select>\
						      </div>\
							  <button type="button" class="layui-btn" id="editFriendGroup">编辑列表</button>\
						    </div>\
						  </div>\
						</form>\
						\
							<span>\
								<button id="addFriendToGroup">为选择的好友添加分组</button>\
							</span>\
							<span>\
								<button id="unaddFriendToGroup">为选择的好友取消添加分组</button>\
							</span>\
							\
							<div class="layui-collapse" lay-filter="test">\
							  <div class="layui-colla-item">\
							    <h2 class="layui-colla-title">分组名称</h2>\
							    <div class="layui-colla-content">\
							      <p>用户</p>\
								  <p>用户</p>\
								  <p>用户</p>\
							    </div>\
							  </div>\
							  <div class="layui-colla-item">\
							    <h2 class="layui-colla-title">分组名称</h2>\
							    <div class="layui-colla-content">\
							      <p>用户<br>用户\
								  </p>\
							    </div>\
							  </div>\
							  <div class="layui-colla-item">\
							    <h2 class="layui-colla-title">分组名称</h2>\
							    <div class="layui-colla-content">\
							      <p>用户\
							      <br><br>\
							      用户</p>\
							    </div>\
							  </div>\
							  <div class="layui-colla-item">\
							    <h2 class="layui-colla-title">分组名称</h2>\
							    <div class="layui-colla-content">\
							      <p>用户</p>\
							    </div>\
							  </div>\
							</div>\
							\
						</div>\
					</div>\
			      <div id="laydateDemo"></div>\
				  <div id="log1">\
					<span id="log_head1"></span>\
					<span id="log_body1" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/"></span>\
				  </div>\
			    </div>\
				\
			    <div class="layui-tab-item">\
				  \
				  <span style="margin-left: 5px;vertical-align: top;">\
				  	<button id="NationalityGroup">按国籍进行高亮分组</button>\
				  </span>\
				  <span style="margin-left: 5px;vertical-align: top;">\
				  	<button id="NationalitySortGroup">按国籍进行排序分组(慢)</button>\
				  </span>\
				  <span style="margin-left: 5px;vertical-align: top;">\
				  	<button id="OfflineTimeGroup">按在线时间进行排序分组</button>\
				  </span>\
				  <span style="margin-left: 5px;vertical-align: top;">\
				  	<button id="ShowFriendData">显示好友详细数据(不可用)</button>\
				  </span>\
				  <div class="layui-tab" lay-filter="test1">\
				    <ul class="layui-tab-title">\
				      <li class="layui-this" lay-id="11" style="color:#ebebeb;">好友数据统计</li>\
				      <li lay-id="22" style="color:#ebebeb;">留言数据统计</li>\
				      <li lay-id="33" style="color:#ebebeb;">关系网统计</li>\
				      <li lay-id="44" style="color:#ebebeb;">当前配置统计</li>\
				      <li lay-id="55" style="color:#ebebeb;">查看好友配置统计</li>\
				    </ul>\
				    <div class="layui-tab-content">\
						<div class="layui-tab-item layui-show">\
							分为:\
							数据表格(汇总所有的数据: id,名称,备注,国籍(城市),等级,好友数量,游戏数量,dlc数量,创意工坊数量,艺术作品数量,动态数量)\
							<table class="layui-hide" id="friendStatistics" lay-filter="friendStatistics"></table> <!--数据表格-->\
							<div id="container_friendStatistics" style="width: 600px;height:400px;"></div>\
						</div>\
						<div class="layui-tab-item">\
							分为:\
							按国籍的饼图(总留言数量)\
							按每天留言数据的折线图(统计所有的留言数据，生成的折线图)\
							按最多留言数据的柱状图(那些好友一天留言数量排行榜/那些好友总留言数量排行榜/累计连续每天留言数量最多)\
							数据表格(汇总所有的数据)\
							<div id="container_commentStatistics" style="min-width:400px;height:400px"></div>\
						</div>\
						<div class="layui-tab-item">\
							好友关系网(仅统计共同好友)\
							<div id="container_relationshipStatistics" style="min-width: 320px;max-width: 800px;margin: 0 auto;"></div>\
						</div>\
						<div class="layui-tab-item">\
							当前的配置数据和运行状态\
							<div id="container_currConfStatistics"></div>\
						</div>\
						<div class="layui-tab-item">\
							对好友设置的配置数据(比如国籍,不留言,留言时间间隔等)\
							<div id="container_friConfStatistics"></div>\
						</div>\
					  </div>\
				  </div>\
				  \
			      <div id="pageDemo"></div>\
			    </div>\
				\
				<div class="layui-tab-item">\
				  <fieldset class="layui-elem-field">\
				    <legend>动态点赞助手</legend>\
						 <form class="layui-form" action="" lay-filter="example">\
							 <div class="layui-form-item" pane="">\
							    <label class="layui-form-label">总开关</label>\
							    <div class="layui-input-block">\
									<!-- checked="" -->\
							      <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest" title="开关" lay-text="开启|关闭" id="friendActivitySwitch">\
							    </div>\
							  </div>\
						  </form>\
				    <div class="layui-field-box">\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置点赞内容:</legend>\
						</fieldset>\
						<form class="layui-form" action="">\
							<div class="layui-form-item">\
								<label class="layui-form-label">点赞内容:</label>\
								<div class="layui-row">\
								   <div class="layui-input-block">\
										 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
											  <input type="checkbox" name="like[1]" lay-skin="primary" title="朋友发布了状态" checked=""><br>\
											  <input type="checkbox" name="like[2]" lay-skin="primary" title="朋友发布了评测" checked=""><br>\
											  <input type="checkbox" name="like[3]" lay-skin="primary" title="朋友购买了游戏或者DLC" checked=""><br>\
											  <input type="checkbox" name="like[4]" lay-skin="primary" title="组发布了通知" checked=""><br>\
											  <input type="checkbox" name="like[5]" lay-skin="primary" title="组发布了活动" checked=""><br>\
										 </div>\
										<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
											  <input type="checkbox" name="like[6]" lay-skin="primary" title="朋友发布了艺术作品" checked=""><br>\
											  <input type="checkbox" name="like[7]" lay-skin="primary" title="朋友发布了创意工坊作品" checked=""><br>\
											  <input type="checkbox" name="like[8]" lay-skin="primary" title="朋友发布了指南" checked=""><br>\
											  <input type="checkbox" name="like[9]" lay-skin="primary" title="朋友上传了载图" checked=""><br>\
											  <input type="checkbox" name="like[10]" lay-skin="primary" title="朋友上传了视频" checked=""><br>\
										</div>\
										<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
											  <input type="checkbox" name="like[11]" lay-skin="primary" title="朋友收藏了艺术作品" checked=""><br>\
											  <input type="checkbox" name="like[12]" lay-skin="primary" title="朋友收藏了创意工坊作品" checked=""><br>\
											  <input type="checkbox" name="like[13]" lay-skin="primary" title="朋友收藏了指南" checked=""><br>\
											  <input type="checkbox" name="like[14]" lay-skin="primary" title="朋友收藏了载图" checked=""><br>\
											  <input type="checkbox" name="like[15]" lay-skin="primary" title="朋友收藏了视频" checked=""><br>\
										</div>\
								   </div>\
								  </div>\
							  </div>\
						 </form>\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置自动点赞模式:</legend>\
						</fieldset>\
						<form class="layui-form" action="">\
							<div class="layui-form-item">\
								<label class="layui-form-label">点赞模式:</label>\
								<div class="layui-input-block">\
								  <input type="checkbox" name="like[1]" lay-skin="primary" title="运行后自动开始点赞" checked=""><br>\
								  <input type="checkbox" name="like[2]" lay-skin="primary" title="点赞完成后自动刷新并点赞新动态时间间隔" checked=""><br>\
								</div>\
							  </div>\
						 </form>\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置自动点赞时间区间(默认今天~之前所有的动态内容)</legend>\
						</fieldset>\
						<div class="layui-form">\
						  <div class="layui-form-item">\
							    <div class="layui-inline">\
							      <label class="layui-form-label">请选择范围</label>\
							      <div class="layui-input-inline">\
							        <input type="text" class="layui-input" id="test-limit3" readonly="" placeholder=" ~ "> <!--placeholder="yyyy-MM-dd"-->\
							      </div>\
							    </div>\
						  </div>\
						</div>\
						<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">\
						  <legend style="color:#66ccff;">点赞进度时间线</legend>\
						</fieldset>\
						<ul class="layui-timeline">\
						  <li class="layui-timeline-item">\
						    <i class="layui-icon layui-timeline-axis"></i>\
						    <div class="layui-timeline-content layui-text">\
						      <h3 class="layui-timeline-title" style="color:#66ccff;">8月18日</h3>\
						      <p style="color:#fff;">\
						        已点赞状态x条，点赞发布艺术作品x条，点赞收藏艺术作品x条\
								<br>已点赞评测x条，点赞发布创意工坊x条，点赞收藏创意工坊x条\
								<br>已点赞购买状态x条，点赞发布指南x条，点赞收藏指南x条\
						        <br>已点赞组通知x条，点赞上次载图x条，点赞收藏载图x条\
								<br>已点赞组活动x条，点赞上传视频x条，点赞收藏视频x条\
						      </p>\
						    </div>\
						  </li>\
						  <li class="layui-timeline-item">\
						    <i class="layui-icon layui-timeline-axis"></i>\
						    <div class="layui-timeline-content layui-text">\
						      <h3 class="layui-timeline-title" style="color:#66ccff;">8月16日</h3>\
						      <p style="color:#fff;">杜甫的思想核心是儒家的仁政思想，他有<em>“致君尧舜上，再使风俗淳”</em>的宏伟抱负。个人最爱的名篇有：</p>\
						      <ul style="color:#fff;">\
						        <li>《登高》</li>\
						        <li>《茅屋为秋风所破歌》</li>\
						      </ul>\
						    </div>\
						  </li>\
						  <li class="layui-timeline-item">\
						    <i class="layui-icon layui-timeline-axis"></i>\
						    <div class="layui-timeline-content layui-text">\
						      <h3 class="layui-timeline-title" style="color:#66ccff;">8月15日</h3>\
						      <p style="color:#fff;">\
						        中国人民抗日战争胜利日\
						        <br>常常在想，尽管对这个国家有这样那样的抱怨，但我们的确生在了最好的时代\
						        <br>铭记、感恩\
						        <br>所有为中华民族浴血奋战的英雄将士\
						        <br>永垂不朽\
						      </p>\
						    </div>\
						  </li>\
						  <li class="layui-timeline-item">\
						    <i class="layui-icon layui-timeline-axis"></i>\
						    <div class="layui-timeline-content layui-text">\
						      <div class="layui-timeline-title" style="color:#66ccff;">过去</div>\
						    </div>\
						  </li>\
						</ul>\
				    </div>\
				  </fieldset>\
				</div>\
				\
			    <div class="layui-tab-item">\
			      <fieldset class="layui-elem-field">\
			        <legend>喜加一助手</legend>\
			        <div class="layui-field-box">\
						<!-- <div>是否启动喜加一助手</div> -->\
					<form class="layui-form" action="" lay-filter="example">\
						<div class="layui-form-item" pane="">\
						   <label class="layui-form-label">总开关</label>\
						   <div class="layui-input-block">\
							<!-- checked="" -->\
						     <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest2" title="开关" lay-text="开启|关闭" id="FreeGameSwitch">\
						   </div>\
						 </div>\
					</form>\
					<form class="layui-form" action="">\
						<div class="layui-form-item">\
							<label class="layui-form-label">设置:</label>\
							<div class="layui-row">\
							   <div class="layui-input-block">\
									 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
										  <input type="checkbox" name="like[1]" lay-skin="primary" title="自动获取喜加一信息" checked=""><br>\
									 </div>\
									<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
										  <input type="checkbox" name="like[6]" lay-skin="primary" title="自动领取喜加一游戏" checked=""><br>\
									</div>\
									<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
										  <input type="checkbox" name="like[11]" lay-skin="primary" title="置顶显示在上方" checked=""><br>\
									</div>\
							   </div>\
							  </div>\
						  </div>\
					 </form>\
					 \
					 <div>设置喜加一数据来源</div>\
					 <form class="layui-form" action="">\
					 	<div class="layui-form-item">\
					 		<label class="layui-form-label">设置:</label>\
					 		<div class="layui-row">\
					 		   <div class="layui-input-block">\
					 				 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
					 					  <input type="checkbox" name="like[1]" lay-skin="primary" title="SteamDB" checked=""><br>\
					 				 </div>\
					 				<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
					 					  <input type="checkbox" name="like[6]" lay-skin="primary" title="humblebundle" disabled=""><br>\
					 				</div>\
					 				<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
					 					  <input type="checkbox" name="like[11]" lay-skin="primary" title="fanatical" disabled=""><br>\
					 				</div>\
					 		   </div>\
					 		  </div>\
					 	  </div>\
					  </form>\
			        </div>\
			      </fieldset>\
			    </div>\
				\
			    <div class="layui-tab-item">\
					<fieldset class="layui-elem-field">\
					  <legend>功能设置</legend>\
					  <div class="layui-field-box">\
						  \
						  <form class="layui-form" action="" lay-filter="example">\
							  <div class="layui-form-item" pane="">\
							     <label class="layui-form-label">Debug模式</label>\
							     <div class="layui-input-block">\
							  									<!-- checked="" -->\
							       <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest3" title="开关" lay-text="开启|关闭">\
							     </div>\
							   </div>\
						  </form>\
							<div>弹出层</div>\
							<div>滑块</div>\
							<button type="button" class="layui-btn">导入导出重置当前设置</button>\
							<div>弹出层</div>\
							\
							<div class="layui-upload-drag" id="uploadDemo">\
							  <i class="layui-icon"></i>\
							  <p>点击上传，或将文件拖拽到此处</p>\
							  <div class="layui-hide" id="uploadDemoView">\
							    <hr>\
							    <img src="" alt="上传成功后渲染" style="max-width: 100%">\
							  </div>\
							</div>\
					  </div>\
					</fieldset>\
					\
					<fieldset class="layui-elem-field">\
					  <legend>界面设置</legend>\
					  <div class="layui-field-box">\
						 <fieldset class="layui-elem-field layui-field-title">\
						   <legend>语言配置</legend>\
						    <button type="button" class="layui-btn">自动检测(简体中文)</button>\
						 	<button type="button" class="layui-btn">简体中文</button>\
							<button type="button" class="layui-btn">繁体中文</button>\
							<button type="button" class="layui-btn">English</button>\
						 </fieldset>\
						  <fieldset class="layui-elem-field layui-field-title">\
						    <legend>主题切换</legend>\
							<div>请选择一个主题，然后点击应用</div>\
							<button type="button" class="layui-btn">应用主题</button>\
						  </fieldset>\
							<fieldset class="layui-elem-field layui-field-title">\
							  <legend>UI设置</legend>\
							  <div>预览:</div>\
							  <div>\
								主要字体颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all1"></div>\
								  </span>\
							  </div>\
							   <div>\
								主要背景颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all2"></div>\
								  </span>\
							  </div>\
							   <div>\
								留言成功字体颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all3"></div>\
								  </span>\
							  </div>\
							   <div>\
								留言失败字体颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all4"></div>\
								  </span>\
							  </div>\
							   <div>\
								留言发生错误字体颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all5"></div>\
								  </span>\
							  </div>\
							  <button type="button" class="layui-btn">保存为主题</button>\
							</fieldset>\
							\
					  </div>\
					</fieldset>\
					\
					<fieldset class="layui-elem-field">\
					  <legend>关于 Steam assistant(Steam小助手)</legend>\
					  <div class="layui-field-box">\
						  <fieldset class="layui-elem-field layui-field-title">\
						    <legend>程序信息:</legend>\
							<div>当前版本: v0.2.3.0</div>\
							<div>主程序框架更新时间: 2020年4月19日</div>\
							<div>common 模块: 2020年4月19日</div>\
							<div>databaseConf 模块: 2020年4月19日</div>\
							<div>externalApis 模块: 2020年4月19日</div>\
							<div>steamApis 模块: 2020年4月19日</div>\
							<div>translateApis 模块: 2020年4月19日</div>\
							<div>Utility 模块: 2020年4月19日</div>\
							<div>UI 模块: 2020年4月19日</div>\
							<div>Event 模块: 2020年4月19日</div>\
							<div>CityList 模块: 2020年4月19日</div>\
							<fieldset class="layui-elem-field layui-field-title">\
							<legend>联系作者:</legend>\
							<button type="button" class="layui-btn">反馈错误</button>\
							<button type="button" class="layui-btn">提交建议</button>\
							\
					  </div>\
					</fieldset>\
					\
					<div id="sliderDemo" style="margin: 50px 20px;"></div>\
			    </div>\
				\
			  </div>\
			</div>'
		);
		
		//好友数据统计里的置顶和是否锁定的模板
		jQuery("#manage_friends").after(
		'<script type="text/html" id="switchTpl">\
		  <!-- 这里的 checked 的状态只是演示 -->\
		  <input type="checkbox" name="front" value="{{d.id}}" lay-skin="switch" lay-text="是|否" lay-filter="frontDemo" {{ d.id == 10003 ? \'checked\' : \'\' }}>\
		</script>\
		\
		<script type="text/html" id="checkboxTpl">\
		  <!-- 这里的 checked 的状态只是演示 -->\
		  <input type="checkbox" name="lock" value="{{d.id}}" title="锁定" lay-filter="lockDemo" {{ d.id == 10006 ? \'checked\' : \'\' }}>\
		</script>'
		);
		
		if(g_conf[0].isShowQuickNavigationBar){ //是否显示快速导航栏
			//快捷导航栏
			jQuery(".responsive_page_template_content").after(
				'<div style="position: fixed;top: 30%;right: 0;">\
					 <div class="layui-input-block" style="margin-left:0; text-align: center;min-height:0;padding: 2px 0px;background: #282B33;">快捷导航栏</div>\
				<ul class="layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="margin-right: 10px;">\
				  <li class="layui-nav-item layui-nav-itemed">\
					<a href="javascript:;">好友分组</a>\
					<dl class="layui-nav-child">\
					  <dd><a href="javascript:;">选项一</a></dd>\
					  <dd><a href="javascript:;">选项二</a></dd>\
					  <dd><a href="javascript:;">选项三</a></dd>\
					  <dd><a href="">跳转项</a></dd>\
					</dl>\
				  </li>\
				  <li class="layui-nav-item">\
					<a href="javascript:;">功能模块</a>\
					<dl class="layui-nav-child">\
					  <dd><a href="javascript:;">选项一</a></dd>\
					  <dd><a href="javascript:;">选项二</a></dd>\
					  <dd><a href="javascript:;">选项三</a></dd>\
					  <dd><a href="">跳转项</a></dd>\
					</dl>\
				  </li>\
				  <li class="layui-nav-item">\
					<a href="javascript:;">其他</a>\
					<dl class="layui-nav-child">\
					  <dd><a href="javascript:;">返回顶部</a></dd>\
					  <dd><a href="javascript:;">返回底部</a></dd>\
					  <dd><a href="javascript:;">选项三</a></dd>\
					  <dd><a href="">跳转项</a></dd>\
					</dl>\
				  </li>\
				  <li class="layui-nav-item">\
					<a href="javascript:;">解决方案</a>\
					<dl class="layui-nav-child">\
					  <dd><a href="">移动模块</a></dd>\
					  <dd><a href="">后台模版</a></dd>\
					  <dd><a href="">电商平台</a></dd>\
					</dl>\
				  </li>\
				  <li class="layui-nav-item"><a href="">云市场</a></li>\
				  <li class="layui-nav-item"><a href="">社区</a></li>\
				</ul>\
				</div>'
			);
		}
		
		UI.prototype.uiHandler(); //UI与UI事件等相关的处理程序
	}
	async private_saveUIConfFile() {
	
	}
	async private_readUIConfFile() {
	
	}
}

var commentTextarea_box; /*所有输入框*/

UI.prototype.uiHandler = async function(){ //UI与UI事件等相关的处理程序
	//2.构建UI
	layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider', 'colorpicker', 'form'], function() {
		var $ = layui.$;
		var laydate = layui.laydate //日期
			,laypage = layui.laypage //分页
			,layer = layui.layer //弹层
			,table = layui.table //表格
			,carousel = layui.carousel //轮播
			,upload = layui.upload //上传
			,element = layui.element //元素操作
			,slider = layui.slider //滑块
			,colorpicker = layui.colorpicker
			,form = layui.form;
		//console.log(layui.layer);
	
		//向世界问个好
		//layer.msg('Hello World');
		//layer.alert('见到你真的很高兴', {icon: 6});
		//layui.layer.alert("text");
		
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 好友数据统计 图表配置
	table.render({
	    elem: '#friendStatistics'
	    //,url:'/demo/table/user/'
	    ,cellMinWidth: 80
	    ,cols: [[
	      {type:'numbers'}
	      ,{type: 'checkbox'}
	      ,{field:'Id', title:'ID', width:100, unresize: true, sort: true}
	      ,{field:'Name', title:'名称', templet: '#usernameTpl'}
	      ,{field:'Remark', title:'备注'}
	      ,{field:'City', title: '国籍(城市)', minWidth:120, sort: true}
		  ,{field:'Lever', title: '等级', minWidth:120, sort: true}
		  ,{field:'Friends', title: '好友数量', minWidth:120, sort: true}
		  ,{field:'Games', title: '游戏数量', minWidth:120, sort: true}
		  ,{field:'DLCs', title: 'dlc数量', minWidth:120, sort: true}
		  ,{field:'Workshops', title: '创意工坊数量', minWidth:120, sort: true}
		  ,{field:'Artworks', title: '艺术作品数量', minWidth:120, sort: true}
		  ,{field:'Activitys', title: '动态数量', minWidth:120, sort: true}
	      ,{field:'front', title:'置顶', width:85, templet: '#switchTpl', unresize: true}
	      ,{field:'lock', title:'是否锁定', width:110, templet: '#checkboxTpl', unresize: true}
	    ]]
		,data: []
	    ,page: true
	  });
	
	//加载数据
	table.reload('friendStatistics', {
		elem: '#friendStatistics'
		,page: true
		,data: [
			{Id: "1"
			,Name: "xxx"
			,Remark: "xx"
			,City: "xx"
			,Lever: "1"
			,Friends: "1"
			,Games: "1"
			,DLCs: '1'
			,Workshops: '1'
			,Artworks: '1'
			,Activitys: '1'
			},
			{Id: "1"
			,Name: "xxx"
			,Remark: "xx"
			,City: "xx"
			,Lever: "1"
			,Friends: "1"
			,Games: "1"
			,DLCs: '1'
			,Workshops: '1'
			,Artworks: '1'
			,Activitys: '1'
			},
			{Id: "1"
			,Name: "xxx"
			,Remark: "xx"
			,City: "xx"
			,Lever: "1"
			,Friends: "1"
			,Games: "1"
			,DLCs: '1'
			,Workshops: '1'
			,Artworks: '1'
			,Activitys: '1'
			},
		]
	});
	
	//监听置顶操作
	form.on('switch(frontDemo)', function(obj){
	  layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
	});
	
	//监听锁定操作
	form.on('checkbox(lockDemo)', function(obj){
	  layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
	});
	
	//表单取值
	layui.$('#LAY-component-form-getval').on('click', async function(){
		var data = form.val('example');
		//var jsonStr = JSON.stringify(data);
		switch (data.modules){
			case '1':
				await setSelectTextMode(1);
				break;
			case '2':
				await setSelectTextMode(2);
				break;
			case '3':
				await setSelectTextMode(3);
				break;	
			case '4':
				await setSelectTextMode(4);
				break;	
			case '5':
				await setSelectTextMode(5);
				break;	
			case '6':
				await setSelectTextMode(6);
				break;	
			case '7':
				await setSelectTextMode(7);
				break;	
			case '8':
				await setSelectTextMode(8);
				break;	
			default:
				break;
		}
		console.log(data.modules);
		_addIDtoHandleLostfocus(); //添加ID来处理丢失的焦点
	});
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 留言数据统计 图表配置
	// Highcharts.setOptions({
	// 		global : {
	// 				useUTC : false
	// 		}
	// });
	// // Create the chart
	// Highcharts.stockChart('container_commentStatistics', {
	// 		chart : {
	// 				events : {
	// 						load : function () {
	// 								// set up the updating of the chart each second
	// 								var series = this.series[0];
	// 								setInterval(function () {
	// 										var x = (new Date()).getTime(), // current time
	// 												y = Math.round(Math.random() * 100);
	// 										series.addPoint([x, y], true, true);
	// 								}, 1000);
	// 						}
	// 				}
	// 		},
	// 		rangeSelector: {
	// 				buttons: [{
	// 						count: 1,
	// 						type: 'minute',
	// 						text: '1M'
	// 				}, {
	// 						count: 5,
	// 						type: 'minute',
	// 						text: '5M'
	// 				}, {
	// 						type: 'all',
	// 						text: 'All'
	// 				}],
	// 				inputEnabled: false,
	// 				selected: 0
	// 		},
	// 		title : {
	// 				text : 'Live random data'
	// 		},
	// 		tooltip: {
	// 				split: false
	// 		},
	// 		exporting: {
	// 				enabled: false
	// 		},
	// 		series : [{
	// 				name : '随机数据',
	// 				data : (function () {
	// 						// generate an array of random data
	// 						var data = [], time = (new Date()).getTime(), i;
	// 						for (i = -999; i <= 0; i += 1) {
	// 								data.push([
	// 										time + i * 1000,
	// 										Math.round(Math.random() * 100)
	// 								]);
	// 						}
	// 						return data;
	// 				}())
	// 		}]
	// });
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// // 关系网统计 图表配置
	// // Add the nodes option through an event call. We want to start with the parent
	// // item and apply separate colors to each child element, then the same color to
	// // grandchildren.
	// Highcharts.addEvent(
	// 	Highcharts.seriesTypes.networkgraph,
	// 	'afterSetOptions',
	// 	function (e) {
	// 		var colors = Highcharts.getOptions().colors,
	// 			i = 0,
	// 			nodes = {};
	// 		e.options.data.forEach(function (link) {
	// 			if (link[0] === 'Proto Indo-European') {
	// 				nodes['Proto Indo-European'] = {
	// 					id: 'Proto Indo-European',
	// 					marker: {
	// 						radius: 20
	// 					}
	// 				};
	// 				nodes[link[1]] = {
	// 					id: link[1],
	// 					marker: {
	// 						radius: 10
	// 					},
	// 					color: colors[i++]
	// 				};
	// 			} else if (nodes[link[0]] && nodes[link[0]].color) {
	// 				nodes[link[1]] = {
	// 					id: link[1],
	// 					color: nodes[link[0]].color
	// 				};
	// 			}
	// 		});
	// 		e.options.nodes = Object.keys(nodes).map(function (id) {
	// 			return nodes[id];
	// 		});
	// 	}
	// );
	// Highcharts.chart('container_relationshipStatistics', {
	// 	chart: {
	// 		type: 'networkgraph',
	// 		height: '100%'
	// 	},
	// 	title: {
	// 		text: 'The Indo-European Laungauge Tree'
	// 	},
	// 	subtitle: {
	// 		text: 'A Force-Directed Network Graph in Highcharts'
	// 	},
	// 	plotOptions: {
	// 		networkgraph: {
	// 			keys: ['from', 'to'],
	// 			layoutAlgorithm: {
	// 				enableSimulation: true
	// 			}
	// 		}
	// 	},
	// 	series: [{
	// 		dataLabels: {
	// 			enabled: true
	// 		},
	// 		data: [
	// 			['Proto Indo-European', 'Balto-Slavic'],
	// 			['Proto Indo-European', 'Germanic'],
	// 			['Proto Indo-European', 'Celtic'],
	// 			['Proto Indo-European', 'Italic'],
	// 			['Proto Indo-European', 'Hellenic'],
	// 			['Proto Indo-European', 'Anatolian'],
	// 			['Proto Indo-European', 'Indo-Iranian'],
	// 			['Proto Indo-European', 'Tocharian'],
	// 			['Indo-Iranian', 'Dardic'],
	// 			['Indo-Iranian', 'Indic'],
	// 			['Indo-Iranian', 'Iranian'],
	// 			['Iranian', 'Old Persian'],
	// 			['Old Persian', 'Middle Persian'],
	// 			['Indic', 'Sanskrit'],
	// 			['Italic', 'Osco-Umbrian'],
	// 			['Italic', 'Latino-Faliscan'],
	// 			['Latino-Faliscan', 'Latin'],
	// 			['Celtic', 'Brythonic'],
	// 			['Celtic', 'Goidelic'],
	// 			['Germanic', 'North Germanic'],
	// 			['Germanic', 'West Germanic'],
	// 			['Germanic', 'East Germanic'],
	// 			['North Germanic', 'Old Norse'],
	// 			['North Germanic', 'Old Swedish'],
	// 			['North Germanic', 'Old Danish'],
	// 			['West Germanic', 'Old English'],
	// 			['West Germanic', 'Old Frisian'],
	// 			['West Germanic', 'Old Dutch'],
	// 			['West Germanic', 'Old Low German'],
	// 			['West Germanic', 'Old High German'],
	// 			['Old Norse', 'Old Icelandic'],
	// 			['Old Norse', 'Old Norwegian'],
	// 			['Old Norwegian', 'Middle Norwegian'],
	// 			['Old Swedish', 'Middle Swedish'],
	// 			['Old Danish', 'Middle Danish'],
	// 			['Old English', 'Middle English'],
	// 			['Old Dutch', 'Middle Dutch'],
	// 			['Old Low German', 'Middle Low German'],
	// 			['Old High German', 'Middle High German'],
	// 			['Balto-Slavic', 'Baltic'],
	// 			['Balto-Slavic', 'Slavic'],
	// 			['Slavic', 'East Slavic'],
	// 			['Slavic', 'West Slavic'],
	// 			['Slavic', 'South Slavic'],
	// 			// Leaves:
	// 			['Proto Indo-European', 'Phrygian'],
	// 			['Proto Indo-European', 'Armenian'],
	// 			['Proto Indo-European', 'Albanian'],
	// 			['Proto Indo-European', 'Thracian'],
	// 			['Tocharian', 'Tocharian A'],
	// 			['Tocharian', 'Tocharian B'],
	// 			['Anatolian', 'Hittite'],
	// 			['Anatolian', 'Palaic'],
	// 			['Anatolian', 'Luwic'],
	// 			['Anatolian', 'Lydian'],
	// 			['Iranian', 'Balochi'],
	// 			['Iranian', 'Kurdish'],
	// 			['Iranian', 'Pashto'],
	// 			['Iranian', 'Sogdian'],
	// 			['Old Persian', 'Pahlavi'],
	// 			['Middle Persian', 'Persian'],
	// 			['Hellenic', 'Greek'],
	// 			['Dardic', 'Dard'],
	// 			['Sanskrit', 'Sindhi'],
	// 			['Sanskrit', 'Romani'],
	// 			['Sanskrit', 'Urdu'],
	// 			['Sanskrit', 'Hindi'],
	// 			['Sanskrit', 'Bihari'],
	// 			['Sanskrit', 'Assamese'],
	// 			['Sanskrit', 'Bengali'],
	// 			['Sanskrit', 'Marathi'],
	// 			['Sanskrit', 'Gujarati'],
	// 			['Sanskrit', 'Punjabi'],
	// 			['Sanskrit', 'Sinhalese'],
	// 			['Osco-Umbrian', 'Umbrian'],
	// 			['Osco-Umbrian', 'Oscan'],
	// 			['Latino-Faliscan', 'Faliscan'],
	// 			['Latin', 'Portugese'],
	// 			['Latin', 'Spanish'],
	// 			['Latin', 'French'],
	// 			['Latin', 'Romanian'],
	// 			['Latin', 'Italian'],
	// 			['Latin', 'Catalan'],
	// 			['Latin', 'Franco-Provençal'],
	// 			['Latin', 'Rhaeto-Romance'],
	// 			['Brythonic', 'Welsh'],
	// 			['Brythonic', 'Breton'],
	// 			['Brythonic', 'Cornish'],
	// 			['Brythonic', 'Cuymbric'],
	// 			['Goidelic', 'Modern Irish'],
	// 			['Goidelic', 'Scottish Gaelic'],
	// 			['Goidelic', 'Manx'],
	// 			['East Germanic', 'Gothic'],
	// 			['Middle Low German', 'Low German'],
	// 			['Middle High German', '(High) German'],
	// 			['Middle High German', 'Yiddish'],
	// 			['Middle English', 'English'],
	// 			['Middle Dutch', 'Hollandic'],
	// 			['Middle Dutch', 'Flemish'],
	// 			['Middle Dutch', 'Dutch'],
	// 			['Middle Dutch', 'Limburgish'],
	// 			['Middle Dutch', 'Brabantian'],
	// 			['Middle Dutch', 'Rhinelandic'],
	// 			['Old Frisian', 'Frisian'],
	// 			['Middle Danish', 'Danish'],
	// 			['Middle Swedish', 'Swedish'],
	// 			['Middle Norwegian', 'Norwegian'],
	// 			['Old Norse', 'Faroese'],
	// 			['Old Icelandic', 'Icelandic'],
	// 			['Baltic', 'Old Prussian'],
	// 			['Baltic', 'Lithuanian'],
	// 			['Baltic', 'Latvian'],
	// 			['West Slavic', 'Polish'],
	// 			['West Slavic', 'Slovak'],
	// 			['West Slavic', 'Czech'],
	// 			['West Slavic', 'Wendish'],
	// 			['East Slavic', 'Bulgarian'],
	// 			['East Slavic', 'Old Church Slavonic'],
	// 			['East Slavic', 'Macedonian'],
	// 			['East Slavic', 'Serbo-Croatian'],
	// 			['East Slavic', 'Slovene'],
	// 			['South Slavic', 'Russian'],
	// 			['South Slavic', 'Ukrainian'],
	// 			['South Slavic', 'Belarusian'],
	// 			['South Slavic', 'Rusyn']
	// 		]
	// 	}]
	// });
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 当前配置统计 图表配置
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 查看好友配置统计 图表配置
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 多选下拉框
	(function($) {
		$.fn.ySelect = function(options) {
			var defaultOptions = {
				placeholder: '请选择',
				numDisplayed: 4,
				overflowText: '{n} selected',
				searchText: '搜索',
				showSearch: true
			}
			if (typeof options == 'string') {
				var settings = options;
			} else {
				var settings = $.extend(true, {}, defaultOptions, options);
			}
	
			function ySelect(select, settings) {
				this.$select = $(select);
				this.settings = settings;
				this.create();
			}
			ySelect.prototype = {
				create: function() {
					var multiple = this.$select.is('[multiple]') ? ' multiple' : '';
					this.$select.wrap('<div class="fs-wrap' + multiple + '"></div>');
					this.$select.before('<div class="fs-label-wrap"><div class="fs-label">' + this.settings.placeholder +
						'</div><span class="fs-arrow"></span></div>');
					this.$select.before('<div class="fs-dropdown hidden"><div class="fs-options"></div></div>');
					this.$select.addClass('hidden');
					this.$wrap = this.$select.closest('.fs-wrap');
					this.reload();
				},
				reload: function() {
					if (this.settings.showSearch) {
						var search = '<div class="fs-search"><input type="search" placeholder="' + this.settings.searchText +
							'" /><span class="fs-selectAll"><i class="fa fa-check-square-o"></i></span></div>';
						this.$wrap.find('.fs-dropdown').prepend(search);
					}
					var choices = this.buildOptions(this.$select);
					this.$wrap.find('.fs-options').html(choices);
					this.reloadDropdownLabel();
				},
				destroy: function() {
					this.$wrap.find('.fs-label-wrap').remove();
					this.$wrap.find('.fs-dropdown').remove();
					this.$select.unwrap().removeClass('hidden');
				},
				buildOptions: function($element) {
					var $this = this;
					var choices = '';
					$element.children().each(function(i, el) {
						var $el = $(el);
						if ('optgroup' == $el.prop('nodeName').toLowerCase()) {
							choices += '<div class="fs-optgroup">';
							choices += '<div class="fs-optgroup-label">' + $el.prop('label') + '</div>';
							choices += $this.buildOptions($el);
							choices += '</div>';
						} else {
							var selected = $el.is('[selected]') ? ' selected' : '';
							choices += '<div class="fs-option' + selected + '" data-value="' + $el.prop('value') +
								'"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">' + $el.html() + '</div></div>';
						}
					});
					return choices;
				},
				reloadDropdownLabel: function() {
					var settings = this.settings;
					var labelText = [];
					this.$wrap.find('.fs-option.selected').each(function(i, el) {
						labelText.push($(el).find('.fs-option-label').text());
					});
					if (labelText.length < 1) {
						labelText = settings.placeholder;
					} else if (labelText.length > settings.numDisplayed) {
						labelText = settings.overflowText.replace('{n}', labelText.length);
					} else {
						labelText = labelText.join(', ');
					}
					this.$wrap.find('.fs-label').html(labelText);
					this.$select.change();
				},
				setwrap: function() {
					return "123";
				},
			}
			return this.each(function() {
				var data = $(this).data('ySelect');
				if (!data) {
					data = new ySelect(this, settings);
					$(this).data('ySelect', data);
				}
				if (typeof settings == 'string') {
					data[settings]();
				}
			});
		}
		window.ySelect = {
			'active': null,
			'idx': -1
		};
	
		function setIndexes($wrap) {
			$wrap.find('.fs-option:not(.hidden)').each(function(i, el) {
				$(el).attr('data-index', i);
				$wrap.find('.fs-option').removeClass('hl');
			});
			$wrap.find('.fs-search input').focus();
			window.ySelect.idx = -1;
		}
	
		function setScroll($wrap) {
			var $container = $wrap.find('.fs-options');
			var $selected = $wrap.find('.fs-option.hl');
			var itemMin = $selected.offset().top + $container.scrollTop();
			var itemMax = itemMin + $selected.outerHeight();
			var containerMin = $container.offset().top + $container.scrollTop();
			var containerMax = containerMin + $container.outerHeight();
			if (itemMax > containerMax) {
				var to = $container.scrollTop() + itemMax - containerMax;
				$container.scrollTop(to);
			} else if (itemMin < containerMin) {
				var to = $container.scrollTop() - containerMin - itemMin;
				$container.scrollTop(to);
			}
		}
		$(document).on('click', '.fs-selectAll', function() {
			$(this).parent().next().find('.fs-option.selected').click();
			$(this).parent().next().find('.fs-option').click();
			$(this).addClass('selected');
		});
		$(document).on('click', '.fs-selectAll.selected', function() {
			$(this).parent().next().find('.fs-option.selected').click();
			$(this).removeClass('selected');
		});
		$(document).on('click', '.fs-option', function() {
			var $wrap = $(this).closest('.fs-wrap');
			if ($wrap.hasClass('multiple')) {
				var selected = [];
				$(this).toggleClass('selected');
				$wrap.find('.fs-option.selected').each(function(i, el) {
					selected.push($(el).attr('data-value'));
				});
			} else {
				var selected = $(this).attr('data-value');
				$wrap.find('.fs-option').removeClass('selected');
				$(this).addClass('selected');
				$wrap.find('.fs-dropdown').hide();
			}
			$wrap.find('select').val(selected);
			$wrap.find('select').ySelect('reloadDropdownLabel');
			$wrap.find('select').ySelect('setwrap');
		});
		$(document).on('keyup', '.fs-search input', function(e) {
			if (40 == e.which) {
				$(this).blur();
				return;
			}
			var $wrap = $(this).closest('.fs-wrap');
			var keywords = $(this).val();
			$wrap.find('.fs-option, .fs-optgroup-label').removeClass('hidden');
			if ('' != keywords) {
				$wrap.find('.fs-option').each(function() {
					var regex = new RegExp(keywords, 'gi');
					if (null === $(this).find('.fs-option-label').text().match(regex)) {
						$(this).addClass('hidden');
					}
				});
				$wrap.find('.fs-optgroup-label').each(function() {
					var num_visible = $(this).closest('.fs-optgroup').find('.fs-option:not(.hidden)').length;
					if (num_visible < 1) {
						$(this).addClass('hidden');
					}
				});
			}
			setIndexes($wrap);
		});
		$(document).on('click', function(e) {
			var $el = $(e.target);
			var $wrap = $el.closest('.fs-wrap');
			if (0 < $wrap.length) {
				if ($el.hasClass('fs-label') || $el.hasClass('fs-arrow')) {
					window.ySelect.active = $wrap;
					var is_hidden = $wrap.find('.fs-dropdown').hasClass('hidden');
					$('.fs-dropdown').addClass('hidden');
					if (is_hidden) {
						$wrap.find('.fs-dropdown').removeClass('hidden');
					} else {
						$wrap.find('.fs-dropdown').addClass('hidden');
					}
					setIndexes($wrap);
				}
			} else {
				$('.fs-dropdown').addClass('hidden');
				window.ySelect.active = null;
			}
		});
		$(document).on('keydown', function(e) {
			var $wrap = window.ySelect.active;
			if (null === $wrap) {
				return;
			} else if (38 == e.which) {
				e.preventDefault();
				$wrap.find('.fs-option').removeClass('hl');
				if (window.ySelect.idx > 0) {
					window.ySelect.idx--;
					$wrap.find('.fs-option[data-index=' + window.ySelect.idx + ']').addClass('hl');
					setScroll($wrap);
				} else {
					window.ySelect.idx = -1;
					$wrap.find('.fs-search input').focus();
				}
			} else if (40 == e.which) {
				e.preventDefault();
				var last_index = $wrap.find('.fs-option:last').attr('data-index');
				if (window.ySelect.idx < parseInt(last_index)) {
					window.ySelect.idx++;
					$wrap.find('.fs-option').removeClass('hl');
					$wrap.find('.fs-option[data-index=' + window.ySelect.idx + ']').addClass('hl');
					setScroll($wrap);
				}
			} else if (32 == e.which || 13 == e.which) {
				$wrap.find('.fs-option.hl').click();
			} else if (27 == e.which) {
				$('.fs-dropdown').addClass('hidden');
				window.ySelect.active = null;
			}
		});
		$.fn.ySelectedValues = function(splitString) {
			var result = "";
			var $selects = this.find("option:selected");
			for (var i = 0; i < $selects.length; i++) {
				result += $selects[i].value + ((i == $selects.length - 1) ? "" : splitString);
			}
			return result;
		}
		$.fn.ySelectedTexts = function(splitString) {
			var result = "";
			var $selects = this.find("option:selected");
			for (var i = 0; i < $selects.length; i++) {
				result += $selects[i].text + ((i == $selects.length - 1) ? "" : splitString);
			}
			return result;
		}
	})(jQuery);
	
	
	jQuery('.selectBox').ySelect({
		placeholder: '请先选择要翻译为的语言',
		searchText: '搜索~发现新世界~',
		showSearch: true,
		numDisplayed: 4,
		overflowText: '已选中 {n}项',
		isCheck: false
	});
	
	//单选框选中和取消选中 https://segmentfault.com/q/1010000004945347
	jQuery('.nameAddType').on('click', function() {
		var ischecked = jQuery(this).data('checked');
		if (!ischecked && this.checked) {
			jQuery(this).data('checked', true);
		} else {
			jQuery(this).prop('checked', false);
			jQuery(this).data('checked', false);
		}
		console.log(jQuery(this).data('checked'))
	}).data('checked', jQuery('.nameAddType').get(0).checked);
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
		 //请选择日期
		  laydate.render({
		    elem: '#test-limit2'
			,trigger: 'click'
		    ,min: 0
		    ,max: 99999
			,done: function(value, date){
			  //layer.alert('你选择的日期是：' + value + '<br>获得的对象是' + JSON.stringify(date));
			  var endTime = new Date(date.year,date.month-1,date.date,date.hours,date.minutes,date.seconds,0).getTime(); //选择的时间
			  var startTime = Math.round(new Date()); //现在的时间
			  if(endTime <= startTime)
			  {
				 layer.alert("请选择至少一天的时间差!");
			  	return false;
			  }
			  let time = endTime >= startTime ? endTime - startTime: startTime - endTime; //计算时间差
			 
			  //计算出相差天数
			  var str = "";
			  let days = Math.floor(time / (24 * 3600 * 1000))
			  //计算出小时数
			  let leave1 = time % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
			  let hours = Math.floor(leave1 / (3600 * 1000))
			  //计算相差分钟数
			  let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
			  let minutes = Math.floor(leave2 / (60 * 1000))
			  //计算相差秒数
			  let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
			  //let seconds=Math.round(leave3/1000)
			  let seconds = leave3 / 1000
			  //if (days > 0)
			  	str += days + "天";
			  //if (hours > 0)
			  	str += hours + "小时";
			  //if (minutes > 0)
			  	str += minutes + "分钟";
			  //if (seconds > 0)
			  	str += seconds + "秒";
			
			var timeleftStr = "过"+ str +"后再留言";
			var dayStr = "等待"+ (days+1) + "天, ";
			
			  //console.log(str);
			  jQuery('#test-limit1')[0].value = dayStr + timeleftStr;
			}
		  });
		  
		  // //请选择时间
		  // laydate.render({
		  //     elem: '#test14'
		  //     ,type: 'time'
		  //     ,format: 'H时m分s秒'
			 //  ,done: function(value, date){
			 //    //layer.alert('你选择的日期是：' + value + '<br>获得的对象是' + JSON.stringify(date));
				// var endTime = new Date(date.year,date.month-1,date.date,date.hours,date.minutes,date.seconds,0).getTime(); //选择的时间
				//   var startTime = Math.round(new Date()); //现在的时间
				//   if(endTime <= startTime)
				//   {
				// 	 layer.alert("请选择至少一天的时间差!");
				//   	return false;
				//   }
				//   let time = endTime >= startTime ? endTime - startTime: startTime - endTime; //计算时间差
				 
				//   //计算出相差天数
				//   var str = "";
				//   let days = Math.floor(time / (24 * 3600 * 1000))
				//   //计算出小时数
				//   let leave1 = time % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				//   let hours = Math.floor(leave1 / (3600 * 1000))
				//   //计算相差分钟数
				//   let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				//   let minutes = Math.floor(leave2 / (60 * 1000))
				//   //计算相差秒数
				//   let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				//   //let seconds=Math.round(leave3/1000)
				//   let seconds = leave3 / 1000
				//   //if (days > 0)
				//   	str += days + "天";
				//   //if (hours > 0)
				//   	str += hours + "小时";
				//   //if (minutes > 0)
				//   	str += minutes + "分钟";
				//   //if (seconds > 0)
				//   	str += seconds + "秒";
				
				// var timeleftStr = "过"+ str +"后再留言";
				// var dayStr = "等待"+ (days+1) + "天, ";//"过1小时后再留言"
				
				//   //console.log(str);
			 //    jQuery('#test15')[0].value = dayStr + timeleftStr;
			 //  }
		  //   });
		
		        table.render({
		            elem: '#test'
					// ,height: 315 //容器高度
		            // ,url:'memberStatus?search=1'
		            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
		            ,data: []
		            // ,autoSort: false //取消自动排序
		            ,cols: [
		                [
		                // {field:'id', title: 'ID', align: 'center',sort: true}
		                ,{field:'memberName', title: 'ID', align: 'center',sort: true, width: '8%'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
		                ,{field:'team', title: '名称', align: 'center', sort: true,width: '12%'} //单元格内容水平居中
		                ,{field:'deviceCode', title: '留言时间', align: 'center',width: '17%',sort: true} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
		                // ,{field:'hp', title: '血量', align: 'center',sort: true}
		                ,{field:'hp', title: '待留言好友', align: 'center',width: '18%',sort: true}
		                ,{field:'hitedNumber', title: '留言内容', align: 'center',width: '15%',sort: true}
		                ,{field:'hitNumber', title: '已执行次数', align: 'center',width: '10%',sort: true}
		                ,{field:'rePlenishBullet', title: '备注', align: 'center',width: '10%',sort: true}
		                ,{field:'reviveNum', title: '设置', align: 'center',width: '10%',sort: true},
		            ]
						]//标题栏 //设置表头
		            ,done:function (res,currentCount) {
		                element.render()
		            }
		        });
				
		 //监听单元格编辑
		   table.on('edit(test3)', function(obj){
		     var value = obj.value //得到修改后的值
		     ,data = obj.data //得到所在行所有键值
		     ,field = obj.field; //得到字段
		     layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
		   });
		
		table.reload('test', {
			elem: '#test'
			,page: true
			,data: [
				{memberName: "1"
				,team: "留言1"
				,deviceCode: "2020-5-1"
				,hp: "All"
				,hitedNumber: "早安安"
				,hitNumber: "0"
				,rePlenishBullet: "无"
				,reviveNum: '<button type="button" class="layui-btn" id="editFriendGroup" style="height: 28px;line-height: 28px;width: 100%;padding: 0px;">属性</button>'
				},
				{memberName: "1"
				,team: "留言1"
				,deviceCode: "2020-5-1"
				,hp: "All"
				,hitedNumber: "早安安"
				,hitNumber: "0"
				,rePlenishBullet: "无"
				,reviveNum: '<button type="button" class="layui-btn" id="editFriendGroup" style="height: 28px;line-height: 28px;width: 100%;padding: 0px;">属性</button>'
				},
				{memberName: "1"
				,team: "留言1"
				,deviceCode: "2020-5-1"
				,hp: "All"
				,hitedNumber: "早安安"
				,hitNumber: "0"
				,rePlenishBullet: "无"
				,reviveNum: '<button type="button" class="layui-btn" id="editFriendGroup" style="height: 28px;line-height: 28px;width: 100%;padding: 0px;">属性</button>'
				},
			]
		});
		
		
		//开启全功能
		  colorpicker.render({
		    elem: '#test-all1'
		    ,color: 'rgba(7, 155, 140, 1)'
		    ,format: 'rgb'
		    ,predefine: true
		    ,alpha: true
		    ,done: function(color){
		      $('#test-all-input').val(color); //向隐藏域赋值
		      layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
		      
		      color || this.change(color); //清空时执行 change
		    }
		    ,change: function(color){
		      //给当前页面头部和左侧设置主题色
		      $('.header-demo,.layui-side .layui-nav').css('background-color', color);
		    }
		  });
		  //开启全功能
		    colorpicker.render({
		      elem: '#test-all2'
		      ,color: 'rgba(7, 155, 140, 1)'
		      ,format: 'rgb'
		      ,predefine: true
		      ,alpha: true
		      ,done: function(color){
		        $('#test-all-input').val(color); //向隐藏域赋值
		        layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
		        
		        color || this.change(color); //清空时执行 change
		      }
		      ,change: function(color){
		        //给当前页面头部和左侧设置主题色
		        $('.header-demo,.layui-side .layui-nav').css('background-color', color);
		      }
		    });
			//开启全功能
			  colorpicker.render({
			    elem: '#test-all3'
			    ,color: 'rgba(7, 155, 140, 1)'
			    ,format: 'rgb'
			    ,predefine: true
			    ,alpha: true
			    ,done: function(color){
			      $('#test-all-input').val(color); //向隐藏域赋值
			      layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
			      
			      color || this.change(color); //清空时执行 change
			    }
			    ,change: function(color){
			      //给当前页面头部和左侧设置主题色
			      $('.header-demo,.layui-side .layui-nav').css('background-color', color);
			    }
			  });
			//开启全功能
			  colorpicker.render({
			    elem: '#test-all4'
			    ,color: 'rgba(7, 155, 140, 1)'
			    ,format: 'rgb'
			    ,predefine: true
			    ,alpha: true
			    ,done: function(color){
			      $('#test-all-input').val(color); //向隐藏域赋值
			      layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
			      
			      color || this.change(color); //清空时执行 change
			    }
			    ,change: function(color){
			      //给当前页面头部和左侧设置主题色
			      $('.header-demo,.layui-side .layui-nav').css('background-color', color);
			    }
			  });
			//开启全功能
			  colorpicker.render({
			    elem: '#test-all5'
			    ,color: 'rgba(7, 155, 140, 1)'
			    ,format: 'rgb'
			    ,predefine: true
			    ,alpha: true
			    ,done: function(color){
			      $('#test-all-input').val(color); //向隐藏域赋值
			      layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
			      
			      color || this.change(color); //清空时执行 change
			    }
			    ,change: function(color){
			      //给当前页面头部和左侧设置主题色
			      $('.header-demo,.layui-side .layui-nav').css('background-color', color);
			    }
			  });
			  
			  //监听折叠
			   element.on('collapse(test)', function(data){
			     layer.msg('展开状态：'+ data.show);
			   });
			  
			  //请选择日期
			   laydate.render({
			     elem: '#test-limit3'
				 ,type: 'date'
			  	 ,trigger: 'click'
				 ,range: '~'
			     ,min: -7
			     ,max: 0
				 ,value: '2020-4-12 ~ 2020-4-19'
				 ,isInitValue: true
			   });
			  
			  //监听指定开关
			  form.on('switch(switchTest)', async function(data){
			      layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
			        offset: '6px'
			      });
			      layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis);
				  
				  var customUrl = "miku-39";
				  var profileID = 76561198373290430;
				  
				  if(gc_friAct == null)
				  	gc_friAct = new friendActivity(profileID || customUrl);
				  	
				  if(this.checked == true) //打开了
				  {
				  	await gc_friAct.Run();
				  }
				  else //关闭了
				  {
				  	gc_friAct.Stop();
				  }
				  
			    });
			  
			  
			  //但是，如果你的HTML是动态生成的，自动渲染就会失效
			  //因此你需要在相应的地方，执行下述方法来进行渲染
			  form.render();
			  
			  element.render('collapse');
	});
	
	//-------------------------------------------------------------------------------------------------------------------------------
	if (opinion() == 0) { //判断页面是pc端还是移动端
		dvWidthFix();
	}
	ToggleManageFriends();
	
	add_commentthread_textarea_allSelect(); //添加留言框全选
	
	var Obj = new CEmoticonPopup($J('#emoticonbtn'), $J('#comment_textarea'));
	//ShowAlertDialog( 'Community Ban & Delete Comments', 'You do not have permissions to view this or you are not logged in.' );
	//ShowConfirmDialog('您点击了移除好友按钮', '是否要移除选择的好友?','移除好友');
	
	CEmoticonPopup.prototype.GetEmoticonClickClosure = function(strEmoticonName) {
	    var _this = this;
	    var strTextToInsert = ':' + strEmoticonName + ':';
	    return function() {
			console.log("表情添加到 "+inBoxonblurID);
			
			let obj;
				switch (inBoxonblurID){
					case 0:
						obj = document.getElementById("comment_textarea");
						break;
					case 1:
						obj = document.getElementById("comment_textarea_en");
						break;
					case 2:
						obj = document.getElementById("comment_textarea_jp");
						break;
					case 3:
						obj = document.getElementById("comment_textarea_zhc");
						break;
					case 4:
						obj = document.getElementById("comment_textarea_zh_sg");
						break;
					case 5:
						obj = document.getElementById("comment_textarea_zh_hant");
						break;
					case 6:
						obj = document.getElementById("comment_textarea_zh_hk");
						break;
					case 7:
						obj = document.getElementById("comment_textarea_zh_mo");
						break;
					case 8:
						obj = document.getElementById("comment_textarea_zh_tw");
						break;
					default:
						break;
				}
			
	        var elTextArea = obj; //设置为指定的留言框
	        if (elTextArea) {
	            var nSelectionStart = elTextArea.selectionStart;
	            elTextArea.value = elTextArea.value.substr(0, nSelectionStart) + strTextToInsert + elTextArea.value.substr(nSelectionStart);
	            elTextArea.selectionStart = nSelectionStart + strTextToInsert.length;
	        }
	
	        obj.focus(); //获取焦点，如果不在视野里，会把镜头拉过去
	
	        _this.DismissPopup();
	
	        if (window.DismissEmoticonHover)
	            window.setTimeout(DismissEmoticonHover, 1);
	    }
	    ;
	}
	;
	
	setTimeout(async function() {
		//Obj.LoadEmoticons();
		// CEmoticonPopup.sm_deferEmoticonsLoaded.done(function() {
		// 	(async function () {
		// 		//console.log("loadDone");
		// 		if (!Obj.m_$Popup)
		// 			Obj.BuildPopup();
		// 		else
		// 			PositionEmoticonHover(Obj.m_$Popup, Obj.m_$EmoticonButton);
		// 		//await emojiFix();
		// 	})();
		// });
	}, 0);
	
	_addIDtoHandleLostfocus(); //添加ID来处理丢失的焦点
	//屏蔽点下拉框、按钮之类的导致输入框焦点丢失的问题
	document.addEventListener("mousedown", function(e){
		
			if(e.target.id.indexOf("steamTextStyle_1")==0 || e.target.id.indexOf("LAY-component-form-getval")==0 
			|| e.target.id.indexOf("emoticonbtn")==0 || e.target.className.indexOf("emoticon")==0 || e.target.className.indexOf("commentthread_entry_quotebox")==0
			|| e.target.className.indexOf("fs-label")==0  || e.target.id.indexOf("translationText")==0 || e.target.id.indexOf("select_is")==0
			|| e.target.id.indexOf("addCustomName")==0 || e.target.className.indexOf("btn_grey_black btn_small_thin")==0 || e.target.id.indexOf("comment_submit")==0
			){
				//debugger
				//if(e.target.id == "LAY-component-form-getval"){
				e.stopPropagation();
				e.stopImmediatePropagation();
				e.preventDefault();
				//  document.getElementById("LAY-component-form-getval").click();
				return false;
				//}
			}
	      
	}, false); //点击指定区域,输入框不失去焦点
	
	
	/*代码位于event.js translationText翻译按钮事件*/
	/*代码位于uiHandler.js 获取输入框和注册的scroll事件*/
	/*代码位于ui.js inBoxShrinkage()判断是否需要重新进行定位*/
	commentTextarea_box = document.getElementsByClassName('commentthread_textarea'); /*获取所有输入框*/
	inBoxShrinkage('comment_textarea',"init"); //解决滚动屏幕事件 Cannot set property 'visible' of undefined，传入"init"参数无实际意义，只为了创建arrComment，而不执行收缩功能，防止Cannot read property 'value' of null错误
	var getAllOffsetTopByChildEle = (ele)=>{
		var OffsetTopSum = 0;
		var ParentObj;
		var currentObj = ele;
		//debugger
		//while(currentObj != document){
			//OffsetTopSum += currentObj.offsetTop;
			//currentObj = currentObj.parentNode;
			currentObj = currentObj.parentNode;
			OffsetTopSum += currentObj.offsetTop;
			currentObj = currentObj.parentNode;
			OffsetTopSum += currentObj.offsetTop;
			
			//console.log("offsetTop:",currentObj.offsetTop,"scrollTop:",currentObj.scrollTop,"clientTop:",currentObj.clientTop);
		//}
		return OffsetTopSum;
	};
	
	document.addEventListener('scroll',function(){ /*注册事件: 当滚动时，对所有输入框对象可见性进行判断*/
		var visibleBottom = window.scrollY + document.documentElement.clientHeight; /*可见区域底部高度 = 滚动条高度 + 可视窗口高度 (显示窗口的底部坐标)*/
		var visibleTop = window.scrollY; /*可见区域顶部高度 = 页面的滚动条滚动的距离 (显示窗口的顶部坐标)*/
		
		for (var i = 0; i < commentTextarea_box.length; i++) { /*遍历所有元素并进行判断 commentTextarea_box[i].offsetTop*/
			//var centerY = getAllOffsetTopByChildEle(commentTextarea_box[i]) + (commentTextarea_box[i].offsetHeight / 2); /*dom元素的中心坐标 = dom元素到最顶端的高度 + 自身高度的一半*/
			var centerY = getAllOffsetTopByChildEle(commentTextarea_box[i]) - 10; //top
			var centerX = getAllOffsetTopByChildEle(commentTextarea_box[i]) + commentTextarea_box[i].offsetHeight + 20; //bottom
			if(centerY > visibleTop& centerX < visibleBottom){ /*当dom元素的中心坐标的X及Y坐标均大于显示窗口的顶部，且小于显示窗口的底部坐标时，那么就可以判断该坐标在可见区域*/
				arrComment[i].visible = true; /*区域可见*/
				//console.log('第'+i+'个区域可见',centerY,visibleTop,visibleBottom);
			}else{
				arrComment[i].visible = false; /*区域不可见*/
				//console.log('第'+i+'个区域不可见',centerY,visibleTop,visibleBottom);
			}
		}
		//console.log('');
	});
	
	console.log("注册所有的事件...");
	await registeredAllEvents(); //注册所有的事件
	if(!addRemoveFriendRemind()){/*添加删除好友提醒*/
		console.log("添加删除好友提醒失败了~!");
	}
	await autoGetImgAndSetBackgroundImg(0,false,5000,0);
}

async function registeredAllEvents() //注册所有的事件
{
	autoSetPageRefreshAndCloseWarn(true); //自动判断状态并设置页面刷新和关闭警告
	addFriendMultipleSelectionMode(); //添加好友多选模式
	
	
	jQuery("#addCustomName").click(async function() { //在留言框添加自定义称呼标识符
		var inString = document.getElementById("comment_textarea");
		var nSelectionStart = inString.selectionStart;//
		inString.value = inString.value.substr(0,nSelectionStart) + g_conf[0].strRemarkPlaceholder + inString.value.substr(nSelectionStart);
		
		document.getElementById("select_isCustom_checkbox").checked = true; //自动选择 自定义称呼模式
	});
	
	//<留言时的时间戳-目标时间戳>
	jQuery("#setTimeInterval").click(async function() { //为选择的好友设置留言时间间隔
		
	});
	
	jQuery("#unsetTimeInterval").click(async function() { //为选择的好友取消设置留言时间间隔
		
	});
	
	jQuery("#translationText").click(async function() { //翻译
		//获取选择的语言
		var selectLanguage = jQuery("#selectBoxID").ySelectedTexts(",");
		var selectLanguageArr = selectLanguage.split(',');
		if (selectLanguageArr.length == 1 && selectLanguageArr[0] == "")
			return;
		console.log("selectLanguageArr", selectLanguageArr);
		//获取输入的内容
		var inString = document.getElementById("comment_textarea").value;
		if (inString == "")
			return;
		console.log("inString", inString);
		//获取原始语言选项
		var options = document.getElementById('origLanguageSelectBox'); //获取选中的项目
		var optionsValue = options[options.selectedIndex].value;
		console.log("optionsValue", optionsValue);
		//遍历选择的语言并创建输入框,然后翻译后设置值
		for (let i = selectLanguageArr.length -1; i >= 0 ; i--) { //for (let i = 0; i < selectLanguageArr.length; i++) {
			g_conf[0].YunStatus = true; //正在运行
			
			var _id;
			var newStrText;
			switch (selectLanguageArr[i]) {
				case '中文简体':
					_id = "_zhc";
					newStrText = await GoogleTranslateRequest(optionsValue, zhc, inString);
					console.log("翻译为中文简体:", newStrText);
					
					if (document.getElementById('comment_textarea_zhc') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为中文简体' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=3;openThisAndCloseOtherAllinBoxShrinkage(\'comment_textarea_zhc\',false);" onClick="" onblur="inBoxonblurID=3;inBoxShrinkage(\'comment_textarea_zhc\',true);" placeholder="添加留言(中文简体)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zhc').value = newStrText;
					break;
				case '英语':
					_id = "_en";
					newStrText = await GoogleTranslateRequest(optionsValue, en, inString);
					console.log("翻译为英语:", newStrText);
	
					if (document.getElementById('comment_textarea_en') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为英语' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=1;openThisAndCloseOtherAllinBoxShrinkage(\'comment_textarea_en\',false);" onClick="" onblur="inBoxonblurID=1;inBoxShrinkage(\'comment_textarea_en\',true);" placeholder="添加留言(英语)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_en').value = newStrText;
					break;
				case '日语':
					_id = "_jp";
					newStrText = await GoogleTranslateRequest(optionsValue, jp, inString);
					console.log("翻译为日语:", newStrText);
	
					if (document.getElementById('comment_textarea_jp') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为日语' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=2;openThisAndCloseOtherAllinBoxShrinkage(\'comment_textarea_jp\',false);" onClick="" onblur="inBoxonblurID=2;inBoxShrinkage(\'comment_textarea_jp\',true);" placeholder="添加留言(日语)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_jp').value = newStrText;
					break;
				case "马新简体[zh-sg]":
					_id = "_zh_sg";
					newStrText = await CNTranslateRequest('zh-sg', inString);
					console.log("翻译为马新简体[zh-sg]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_sg') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为马新简体' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=4;openThisAndCloseOtherAllinBoxShrinkage(\'comment_textarea_zh_sg\',false);" onClick="" onblur="inBoxonblurID=4;inBoxShrinkage(\'comment_textarea_zh_sg\',true);" placeholder="添加留言(马新简体)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_sg').value = newStrText;
					break;
				case "繁體中文[zh-hant]":
					_id = "_zh_hant";
					newStrText = await CNTranslateRequest('zh-hant', inString);
					console.log("翻译为繁體中文[zh-hant]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_hant') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为繁體中文' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=5;openThisAndCloseOtherAllinBoxShrinkage(\'comment_textarea_zh_hant\',false);" onClick="" onblur="inBoxonblurID=5;inBoxShrinkage(\'comment_textarea_zh_hant\',true);" placeholder="添加留言(繁體中文)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_hant').value = newStrText;
					break;
				case "繁體中文(香港)[zh-hk]":
					_id = "_zh_hk";
					newStrText = await CNTranslateRequest('zh-hk', inString);
					console.log("翻译为繁體中文(香港)[zh-hk]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_hk') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为繁體中文(香港)' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=6;openThisAndCloseOtherAllinBoxShrinkage(\'comment_textarea_zh_hk\',false);" onClick="" onblur="inBoxonblurID=6;inBoxShrinkage(\'comment_textarea_zh_hk\',true);" placeholder="添加留言(繁體中文(香港))" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_hk').value = newStrText;
					break;
				case "繁體中文(澳门)[zh-mo]":
					_id = "_zh_mo";
					newStrText = await CNTranslateRequest('zh-mo', inString);
					console.log("翻译为繁體中文(香港)[zh-hk]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_mo') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为繁體中文(澳门)' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=7;openThisAndCloseOtherAllinBoxShrinkage(\'comment_textarea_zh_mo\',false);" onClick="" onblur="inBoxonblurID=7;inBoxShrinkage(\'comment_textarea_zh_mo\',true);" placeholder="添加留言(繁體中文(澳门))" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_mo').value = newStrText;
					break;
				case "繁體中文(台湾)[zh-tw]":
					_id = "_zh_tw";
					newStrText = await CNTranslateRequest('zh-tw', inString);
					console.log("翻译为繁體中文(台湾)[zh-tw]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_tw') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为繁體中文(台湾)' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=8;openThisAndCloseOtherAllinBoxShrinkage(\'comment_textarea_zh_tw\',false);" onClick="" onblur="inBoxonblurID=8;inBoxShrinkage(\'comment_textarea_zh_tw\',true);" placeholder="添加留言(繁體中文(台湾))" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_tw').value = newStrText;
					break;
				default:
				g_conf[0].YunStatus = false; //没有运行
					break;
			}
			g_conf[0].isTranslationText = true; //进行了翻译
			g_conf[0].YunStatus = false; //没有运行
	
		}
		commentTextarea_box = document.getElementsByClassName('commentthread_textarea'); /*获取所有输入框*/
		
		var change1;
		var autoTextarea = function(elem, extra, maxHeight) {
			extra = extra || 0;
			var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
				isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
				addEvent = function(type, callback) {
					elem.addEventListener ?
						elem.addEventListener(type, callback, false) :
						elem.attachEvent('on' + type, callback);
				},
				getStyle = elem.currentStyle ? function(name) {
					var val = elem.currentStyle[name];
					if (name === 'height' && val.search(/px/i) !== 1) {
						var rect = elem.getBoundingClientRect();
						return rect.bottom - rect.top -
							parseFloat(getStyle('paddingTop')) -
							parseFloat(getStyle('paddingBottom')) + 'px';
					};
					return val;
				} : function(name) {
					return getComputedStyle(elem, null)[name];
				},
				minHeight = parseFloat(getStyle('height'));
			elem.style.resize = 'none';
		
		change1 = function(e,id) {
						var scrollTop, height,
							padding = 0,
							style = elem.style;
						var obj = document.getElementById('strInBytes');
						var commentText;
						if(id == undefined || id == null)
							commentText = document.getElementById(window.event.target.id);
						else
							commentText = document.getElementById(id);
						var numText = wordCount(commentText.value);
						obj.innerHTML =  "当前字符字节数: <span id='strInBytes_Text'>" + numText + '</span>/999';
						if (wordCount(commentText.value) >= 1000) {
							document.getElementById('strInBytes_Text').style.color = '#FF0000';
							commentText.style.background = '#7b3863';
							if(g_conf[0].isCommentRunStatus == false)/*如果正在留言则不清除(没有留言则清除)*/
								jQuery('#log_head').html('');
							jQuery('#log_head').html("<br><b style='color:#2CD8D6;'>字数超标啦! 请保持在1000字符以下. " + '当前字数:' + numText + '<b>');
							g_conf[0].isWarnInfo = true;
						} else {	
							document.getElementById('strInBytes_Text').style.color = '#32CD32';
							commentText.style.background = '#1b2838';
							if(g_conf[0].isCommentRunStatus == false && g_conf[0].isWarnInfo == true){ /*没有留言并且有警告信息才清除*/
								jQuery('#log_head').html('');
								g_conf[0].isWarnInfo = false;
							}
						}
						if (elem._length === elem.value.length) return;
							elem._length = elem.value.length;
						if (!isFirefox && !isOpera) {
							padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
						};
						scrollTop = document.body.scrollTop || document.documentElement.scrollTop; /*定位到最后*/
						elem.style.height = minHeight + 'px';
						if (elem.scrollHeight >= minHeight) {
							if (maxHeight && elem.scrollHeight > maxHeight) {
								height = maxHeight - padding;
								style.overflowY = 'auto';
							} else {
								height = elem.scrollHeight - padding;
								style.overflowY = 'hidden';
							};
							style.height = height + extra + 'px';
							var nHeight1 = height + extra;
							/*console.log('nHeight1',nHeight1,'newStr',newStr);*/
							/*https://blog.csdn.net/weixin_34281477/article/details/93702604*/
							/*https://www.cnblogs.com/cblogs/p/9293522.html*/
							/*https://www.w3school.com.cn/tiy/t.asp?f=jseg_replace_1*/
							var iIndex;
							for(let i=0;i<arrComment.length;i++)
							{
								if(id == undefined || id == null){
									if(arrComment[i].id == window.event.target.id){
										iIndex = i;
										break;
									}
								}
								else{
									if(arrComment[i].id == id){
										iIndex = i;
										break;
									}
								}
							}
							debugger;
							arrComment[iIndex].height = nHeight1;/*存储*/
							scrollTop += parseInt(style.height) - elem.currHeight;
							if(!isNaN(scrollTop)){
								document.body.scrollTop = scrollTop;
								document.documentElement.scrollTop = scrollTop;
							}
							elem.currHeight = parseInt(style.height);
						}
				};
		};
			inBoxShrinkage('comment_textarea_en',"init");//解决滚动屏幕事件 Cannot set property 'visible' of undefined，传入"init"参数无实际意义，只为了创建arrComment，而不执行收缩功能，防止Cannot read property 'value' of null错误
			inBoxShrinkage('comment_textarea_jp',"init");
			inBoxShrinkage('comment_textarea_zhc',"init");
			inBoxShrinkage('comment_textarea_zh_sg',"init");
			inBoxShrinkage('comment_textarea_zh_hant',"init");
			inBoxShrinkage('comment_textarea_zh_hk',"init");
			inBoxShrinkage('comment_textarea_zh_mo',"init");
			inBoxShrinkage('comment_textarea_zh_tw',"init");
			arrComment[1].height = 0;
			arrComment[1].scrollTop = 0;
			
			arrComment[2].height = 0;
			arrComment[2].scrollTop = 0;
			
			arrComment[3].height = 0;
			arrComment[3].scrollTop = 0;
			
			arrComment[4].height = 0;
			arrComment[4].scrollTop = 0;
			
			arrComment[5].height = 0;
			arrComment[5].scrollTop = 0;
			
			arrComment[6].height = 0;
			arrComment[6].scrollTop = 0;
			
			arrComment[7].height = 0;
			arrComment[7].scrollTop = 0;
			
			arrComment[8].height = 0;
			arrComment[8].scrollTop = 0;
		/*代码位于event.js translationText翻译按钮事件*/
		/*代码位于uiHandler.js 获取输入框和注册的scroll事件*/
		/*代码位于ui.js inBoxShrinkage()判断是否需要重新进行定位*/
	});
	
	jQuery("#setNoLeave").click(async function() { //为选择的好友设置不留言
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selected").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			if(g_conf[0].isNoCommentRunStatus == false)
				jQuery("#log_head1, #log_body1").html("");
			
			var jqobj = jQuery("#search_results .selected");
			
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				g_conf[0].isNoCommentRunStatus = true;
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
				
				var nostrNoOperate = g_conf[0].strNoOperate + "-N";
				
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
			
			
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf(g_conf[0].strNoOperate) != -1 || SpecialName.indexOf(nostrNoOperate) != -1) //检查是否设置了不留言标识
							{
								jQuery("#log_body1")[0].innerHTML +=
									"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置备注! ' + profileID + '  ' + SpecialName + "</a><br>";
								continue;
							}
							name = SpecialName;
							name = name + g_conf[0].strNoOperate; //组合
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							SpecialName = undefined; //就没有备注
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							name = steamName;
							name = name + nostrNoOperate; //组合
						}
					}
				}
				
				console.log("[Debug] name:", name);
			
				(function(i, profileID) {
					var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
			
					jQuery.post(URL, {
						nickname: name,
						sessionid: g_sessionID
					}, function(response) {
						if (response.success === false) {
							jQuery("#log_body1")[0].innerHTML +=
								"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 设置备注失败了! ' + profileID + '  ' + name +
								'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
						} else {
							jQuery("#log_body1")[0].innerHTML +=
								'[' + (i + 1) + '/' + total + '] ' +
								"成功设置备注于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
								profileID + '  ' + name + "</a>" +
								"<a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
								profileID + "\">" + "</a><br>";
						}
					}).fail(function() {
						jQuery("#log_body1")[0].innerHTML +=
							'<span style="color:#DA2626;">[' + (i + 1) + '/' + total + '] ' +
							"无法设置备注于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
							profileID + "\">" +
							profileID + '  ' + name + "</a></span><br>";
					}).always(function() {
						jQuery("#log_head1").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
					});
			
				})(i, profileID);
				await sleep(100);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			g_conf[0].isNoCommentRunStatus = false;
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	});
	
	jQuery("#unsetNoLeave").click(async function() { //为选择的好友取消设置不留言
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selected.selectable").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			if(g_conf[0].isNoCommentRunStatus == false)
				jQuery("#log_head1, #log_body1").html("");
				
			var jqobj = jQuery("#search_results .selected.selectable");
			
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				g_conf[0].isNoCommentRunStatus = true;
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
			
				var nostrNoOperate = g_conf[0].strNoOperate + "-N";
			
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
					
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.lastIndexOf(nostrNoOperate) != -1) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(0,SpecialName.lastIndexOf(nostrNoOperate)); //去掉国籍标识
								name = ""; //去掉备注
							}
							else if (SpecialName.lastIndexOf(g_conf[0].strNoOperate) != -1) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(0,SpecialName.lastIndexOf(g_conf[0].strNoOperate)); //去掉国籍标识
								name = SpecialName; //使用原来的备注
							}else {
								jQuery("#log_body1")[0].innerHTML +=
									"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置国籍不能取消! ' + profileID + '  ' + SpecialName + "</a><br>";
								continue;
							}
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							jQuery("#log_body1")[0].innerHTML +=
								"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有备注不能取消! ' + profileID + '  ' + steamName + "</a><br>";
							continue;
						}
					}
				}
				console.log("[Debug] name:", name);
				(function(i, profileID) {
					var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
			
					jQuery.post(URL, {
						nickname: name,
						sessionid: g_sessionID
					}, function(response) {
						if (response.success === false) {
							jQuery("#log_body1")[0].innerHTML +=
								"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 设置备注失败了! ' + profileID + '  ' + name +
								'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
						} else {
							jQuery("#log_body1")[0].innerHTML +=
								'[' + (i + 1) + '/' + total + '] ' +
								"成功设置备注于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
								profileID + '  ' + name + "</a>" +
								"<a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
								profileID + "\">" + "</a><br>";
						}
					}).fail(function() {
						jQuery("#log_body1")[0].innerHTML +=
							'[' + (i + 1) + '/' + total + '] ' +
							"<span style='color:#DA2626;'>无法设置备注于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
							profileID + "\">" +
							profileID + '  ' + name + "</a></span><br>";
					}).always(function() {
						jQuery("#log_head1").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
					});
			
				})(i, profileID);
				await sleep(1000);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			g_conf[0].isNoCommentRunStatus = false;
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	});
	
	jQuery("#setNationality").click(async function() { //为选择的好友设置国籍标识
		//获取指定的国籍标识
		var options = document.getElementById('nationalitySelectBox'); //获取选中的项目
		var optionsValue = options[options.selectedIndex].value;
		console.log("optionsValue", optionsValue);
		var strNationality = '{' + optionsValue + '}'; //组合国籍标识
		var strSpecialNationality = '{' + optionsValue + '-N}'; //组合格外国籍标识
		//遍历所有选择的好友,
		//对已经设置了备注的好友,添加国籍标识;
		//对没有设置备注的好友,添加格外国籍标识(此国籍标识与原国籍标识都能发送特定语言的留言,
		//但是如果选择的是没有备注不添加称呼,则当做无备注处理; 并且好友会有特殊标识; 在分组中也与原国籍标识会有不同)
		//注意: 国籍标识不会被作为称呼之类的,只作为标识; 为了方便存储数据,所以会添加在备注里
	
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selected").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			if(g_conf[0].isNationalityRunStatus == false)
				jQuery("#log_head1, #log_body1").html("");
			
			var jqobj = jQuery("#search_results .selected");
	
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				g_conf[0].isNationalityRunStatus = true;
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
	
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
	
	
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf('{CN}') != -1 || SpecialName.indexOf('{CN-N}') != -1 ||
								SpecialName.indexOf('{EN}') != -1 || SpecialName.indexOf('{EN-N}') != -1 ||
								SpecialName.indexOf('{JP}') != -1 || SpecialName.indexOf('{JP-N}') != -1 ||
								SpecialName.indexOf('{CN-SG}') != -1 || SpecialName.indexOf('{CN-SG-N}') != -1 ||
								SpecialName.indexOf('{CN-HANT}') != -1 || SpecialName.indexOf('{CN-HANT-N}') != -1 ||
								SpecialName.indexOf('{CN-HK}') != -1 || SpecialName.indexOf('{CN-HK-N}') != -1 ||
								SpecialName.indexOf('{CN-MO}') != -1 || SpecialName.indexOf('{CN-MO-N}') != -1 ||
								SpecialName.indexOf('{CN-TW}') != -1 || SpecialName.indexOf('{CN-TW-N}') != -1
							) //检查是否设置了国籍标识
							{
								if (SpecialName.indexOf('{' + optionsValue + '}') != -1 || SpecialName.indexOf('{' + optionsValue + '-N}') !=
									-1) //是否与待设置的国籍标识相同
								{
									jQuery("#log_body1")[0].innerHTML +=
										"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
										"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置备注! ' + profileID + '  ' + SpecialName + "</a><br>";
									continue;
								} else //重新设置国籍标识
								{
									if (SpecialName.indexOf('-N}') != -1) {
										mode = 1;
									}
									SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
								}
							}
							if (mode == 0) {
								name = strNationality + SpecialName; //组合成为新的名称  国籍标识
							} else if (mode == 1) {
								name = strSpecialNationality + SpecialName; //组合成为新的名称  格外国籍标识
								mode = 0;
							}
	
	
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							SpecialName = undefined; //就没有备注
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							name = strSpecialNationality + steamName; //组合成为新的名称  格外国籍标识
						}
					}
				}
				console.log("[Debug] name:", name);
	
				(function(i, profileID) {
					var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
	
					jQuery.post(URL, {
						nickname: name,
						sessionid: g_sessionID
					}, function(response) {
						if (response.success === false) {
							jQuery("#log_body1")[0].innerHTML +=
								"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 设置备注失败了! ' + profileID + '  ' + name +
								'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
						} else {
							jQuery("#log_body1")[0].innerHTML +=
								'[' + (i + 1) + '/' + total + '] ' +
								"成功设置备注于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
								profileID + '  ' + name + "</a>" +
								"<a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
								profileID + "\">" + "</a><br>";
						}
					}).fail(function() {
						jQuery("#log_body1")[0].innerHTML +=
							'<span style="color:#DA2626;">[' + (i + 1) + '/' + total + '] ' +
							"无法设置备注于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
							profileID + "\">" +
							profileID + '  ' + name + "</a></span><br>";
					}).always(function() {
						jQuery("#log_head1").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
					});
	
				})(i, profileID);
				await sleep(100);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			g_conf[0].isNationalityRunStatus = false;
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	
	});
	
	jQuery("#unsetNationality").click(async function() { //为选择的好友取消国籍标识
		//获取指定的国籍标识
		var options = document.getElementById('nationalitySelectBox'); //获取选中的项目
		var optionsValue = options[options.selectedIndex].value;
		console.log("optionsValue", optionsValue);
		var strNationality = '{' + optionsValue + '}'; //组合国籍标识
		var strSpecialNationality = '{' + optionsValue + '-N}'; //组合格外国籍标识
		//遍历所有选择的好友,
		//对已经设置了备注的好友,添加国籍标识;
		//对没有设置备注的好友,添加格外国籍标识(此国籍标识与原国籍标识都能发送特定语言的留言,
		//但是如果选择的是没有备注不添加称呼,则当做无备注处理; 并且好友会有特殊标识; 在分组中也与原国籍标识会有不同)
		//注意: 国籍标识不会被作为称呼之类的,只作为标识; 为了方便存储数据,所以会添加在备注里
	
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selected.selectable").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			if(g_conf[0].isNationalityRunStatus == false)
				jQuery("#log_head1, #log_body1").html("");
				
			var jqobj = jQuery("#search_results .selected.selectable");
	
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				g_conf[0].isNationalityRunStatus = true;
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
	
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
	
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf('{CN}') != -1 ||
								SpecialName.indexOf('{EN}') != -1 ||
								SpecialName.indexOf('{JP}') != -1 ||
								SpecialName.indexOf('{CN-SG}') != -1 ||
								SpecialName.indexOf('{CN-HANT}') != -1 ||
								SpecialName.indexOf('{CN-HK}') != -1 ||
								SpecialName.indexOf('{CN-MO}') != -1 ||
								SpecialName.indexOf('{CN-TW}') != -1
							) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
								name = SpecialName; //使用原来的备注
							} else if (SpecialName.indexOf('{CN-N}') != -1 ||
								SpecialName.indexOf('{EN-N}') != -1 ||
								SpecialName.indexOf('{JP-N}') != -1 ||
								SpecialName.indexOf('{CN-SG-N}') != -1 ||
								SpecialName.indexOf('{CN-HANT-N}') != -1 ||
								SpecialName.indexOf('{CN-HK-N}') != -1 ||
								SpecialName.indexOf('{CN-MO-N}') != -1 ||
								SpecialName.indexOf('{CN-TW-N}') != -1
							) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
								name = ""; //去掉备注
							} else {
								jQuery("#log_body1")[0].innerHTML +=
									"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置国籍不能取消! ' + profileID + '  ' + SpecialName + "</a><br>";
								continue;
							}
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							jQuery("#log_body1")[0].innerHTML +=
								"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有备注不能取消! ' + profileID + '  ' + steamName + "</a><br>";
							continue;
						}
					}
				}
				console.log("[Debug] name:", name);
				(function(i, profileID) {
					var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
	
					jQuery.post(URL, {
						nickname: name,
						sessionid: g_sessionID
					}, function(response) {
						if (response.success === false) {
							jQuery("#log_body1")[0].innerHTML +=
								"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 设置备注失败了! ' + profileID + '  ' + name +
								'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
						} else {
							jQuery("#log_body1")[0].innerHTML +=
								'[' + (i + 1) + '/' + total + '] ' +
								"成功设置备注于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
								profileID + '  ' + name + "</a>" +
								"<a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
								profileID + "\">" + "</a><br>";
						}
					}).fail(function() {
						jQuery("#log_body1")[0].innerHTML +=
							'[' + (i + 1) + '/' + total + '] ' +
							"<span style='color:#DA2626;'>无法设置备注于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
							profileID + "\">" +
							profileID + '  ' + name + "</a></span><br>";
					}).always(function() {
						jQuery("#log_head1").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
					});
	
				})(i, profileID);
				await sleep(1000);
				//console.log(cur)
			}
			g_conf[0].isNationalityRunStatus = false;
			g_conf[0].YunStatus = false; //没有运行
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	
	});
	
	//---------------------------------------------------------------------------------------------------------------
	await jQuery("#comment_submit").click(async function() { //发送评论给选择的好友
		setTimeout(async ()=>{
			date = new Date();
			startTime = date.getTime();
			
			const total = jQuery("#search_results .selected.selectable").length; //选择的朋友总数
			const msg = jQuery("#comment_textarea").val(); //获取评论内容
			var newMgs = "";
			var mode = 0;
			var SpecialName = undefined;
			var steamName = undefined;
			var name = undefined;
			
			if (total > 0 && msg.length > 0) {
				if(g_conf[0].isCommentRunStatus == false)
					jQuery("#log_head, #log_body").html("");
				
				
				//jQuery(".selected").each(async function(i) {
				var jqobj = jQuery("#search_results .selected.selectable");
				
				for (let i = 0; i < jqobj.length; i++) {
					let cur = jqobj.get(i);
					g_conf[0].YunStatus = true; //正在运行
					g_conf[0].isCommentRunStatus = true;
					//--------------------------------------------------------------------
					SpecialName = undefined;
					steamName = undefined;
		
					if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
						//获取备注
						var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
						SpecialName = undefined;
						if (SpecialNameobj != "undefined") {
							SpecialName = SpecialNameobj[0].innerText; //备注
						}
						//获取steam名称
						steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
						name = steamName;
					} else //否则如果是好友界面
					{
						//获取名称,然后判断是备注还是steam名称
						var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
						var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
						SpecialName = undefined;
						if (SpecialNameobj.length > 0) //安全检查
						{
							if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
							{
								console.log("获取到的是备注");
								SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
								steamName = undefined; //就没有名称
								name = SpecialName;
							} else if (nicknameObj.length == 0) {
								console.log("获取到的是steam名称");
								SpecialName = undefined; //就没有备注
								steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
								name = steamName;
							}
						}
					}
					//--------------------------------------------------------------------
					//判断选择的模式
					if ($("select_islName_checkbox").checked == true) {
						mode = 1;
					}
					else if ($("select_isSpecialName_checkbox").checked == true) {
						mode = 2;
					}
					else if ($("select_isCustom_checkbox").checked == true) {
						mode = 3;
					}
					else //如果都没有选中，则直接发送消息
						mode = 0;
					
					if (mode == 1) { //是否为好友添加称呼 (如果好友没有备注则使用steam名称)
						//判断是否有备注,没有则使用steam名称
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
							
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							newMgs = SpecialName + msg;
						} else {
							console.log("为" + steamName + "添加称呼: " + steamName);
							newMgs = steamName + msg;
						}
					} else if (mode == 2) { //是否为好友添加称呼 (请为好友设置备注为需要的称呼,否则不添加称呼)
						//判断是否有备注,没有则不操作
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
							
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							newMgs = SpecialName + msg;
						} else {
							newMgs = msg;
						}
					} else if (mode == 3) { //是否为好友添加称呼 (请为好友设置备注为需要的称呼,否则不添加称呼)
						//判断是否有备注,没有则不操作
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
							
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							let str = msg;
							newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else {
							let str = msg;
							newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						}
					} else if (mode == 0) { //直接发送内容
						newMgs = msg;
					}
					console.log("[Debug] mode:", mode);
					console.log("[Debug] SpecialName:", SpecialName, "steamName:", steamName);
					console.log("[Debug] newMgs:", newMgs, "msg:", msg);
					//--------------------------------------------------------------------
					let profileID = cur.getAttribute("data-steamid");
		
					if (SpecialName != undefined) {
						if (SpecialName.indexOf(g_conf[0].strNoOperate) != -1) {
							jQuery("#log_body")[0].innerHTML +=
								"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 已跳过留言! ' + profileID + '  ' + name + "</a><br>";
							continue;
						}
					}
					
					(function(i, profileID) {
						//setTimeout(function() {
		
						jQuery.post("//steamcommunity.com/comment/Profile/post/" + profileID + "/-1/", {
							comment: newMgs,
							count: 6,
							sessionid: g_sessionID
						}, function(response) {
							if (response.success === false) {
								jQuery("#log_body")[0].innerHTML +=
									"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 留言失败了! ' + profileID + '  ' + name +
									'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
							} else {
								jQuery("#log_body")[0].innerHTML +=
									'[' + (i + 1) + '/' + total + '] ' +
									"成功发表评论于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
									profileID + '  ' + name + "</a>" +
									"<span> → </span><a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
									profileID  + "#commentthread_Profile_"+ profileID +"_textarea" + "\">" + newMgs + "</a><br>";
							}
						}).fail(function() {
							jQuery("#log_body")[0].innerHTML +=
								'<span style="color:#DA2626;">[' + (i + 1) + '/' + total + '] ' +
								"无法发表评论于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
								profileID + "\">" +
								profileID + '  ' + name + "</a></span><br>";
						}).always(function() {
							jQuery("#log_head").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
						});
		
		
						//}, i * 6000);
		
					})(i, profileID);
					await sleep(g_conf[0].delay * 1000)
					//console.log(cur)
				}
		
		
				date = new Date();
				endTime = date.getTime();
				let time = endTime - startTime;
				//console.log("time",time,endTime,startTime);
				//--------------------------------------------------------------------------------
				//计算出相差天数
				var str = "";
				let days = Math.floor(time / (24 * 3600 * 1000))
				//计算出小时数
				let leave1 = time % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				let hours = Math.floor(leave1 / (3600 * 1000))
				//计算相差分钟数
				let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				let minutes = Math.floor(leave2 / (60 * 1000))
				//计算相差秒数
				let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				//let seconds=Math.round(leave3/1000)
				let seconds = leave3 / 1000
				if (days > 0)
					str += days + "天";
				if (hours > 0)
					str += hours + "小时";
				if (minutes > 0)
					str += minutes + "分钟";
				if (seconds > 0)
					str += seconds + "秒";
				//--------------------------------------------------------------------------------
				jQuery("#log_body")[0].innerHTML +=
					"<b>留言完毕! 用时: <span style='color:#35ff8b;'>" + str + "</span></b><br>";
				//});
				g_conf[0].isCommentRunStatus = false;
				
				g_conf[0].YunStatus = false; //没有运行
		
			} else {
				alert("请确保您输入了一条消息并选择了1个或更多好友。");
			}
		},0);
	});
	
	//---------------------------------------------------------------------------------------------------------------
	await jQuery("#comment_submit_special").click(async function() { //根据国籍发送评论给选择的好友
		
		setTimeout(async()=>{
			date = new Date();
			startTime = date.getTime();
			
			if(g_conf[0].isTranslationText == false){
				layer.alert("这个功能需要配合翻译一起使用，以达到发送不同留言内容的目的.请先进行翻译(选择要翻译的语言，然后点击翻译按钮，修改翻译的文本，然后重新进行尝试!)",{icon: 0});
				return;
			}
			
			const total = jQuery("#search_results .selected.selectable").length; //选择的朋友总数
			const msg = jQuery("#comment_textarea").val(); //获取评论内容
			const msg_CN = jQuery("#comment_textarea_zhc").val(); //获取评论内容
			const msg_EN = jQuery("#comment_textarea_en").val(); //获取评论内容
			const msg_JP = jQuery("#comment_textarea_jp").val(); //获取评论内容
			const msg_CN_SG = jQuery("#comment_textarea_zh_sg").val(); //获取评论内容
			const msg_CN_HANT = jQuery("#comment_textarea_zh_hant").val(); //获取评论内容
			const msg_CN_HK = jQuery("#comment_textarea_zh_hk").val(); //获取评论内容
			const msg_CN_MO = jQuery("#comment_textarea_zh_mo").val(); //获取评论内容
			const msg_CN_TW = jQuery("#comment_textarea_zh_tw").val(); //获取评论内容
			
			var newMgs = "";
			var mode = 0;
			var SpecialName = undefined;
			var steamName = undefined;
			var name = undefined;
				
			if (total > 0 && msg.length > 0) {
				
				debugger
				
				if(g_conf[0].isCommentRunStatus == false)
					jQuery("#log_head, #log_body").html("");
				
				//jQuery(".selected").each(async function(i) {
				//var jqobj = jQuery(".selected");
				//var jqobj = jQuery(".selected[data-steamid]"); //排除掉选择的其他的东西
				var jqobj = jQuery("#search_results .selected.selectable"); //排除掉选择的其他的东西
				
				for (let i = 0; i < jqobj.length; i++) {
					let cur = jqobj.get(i);
					g_conf[0].YunStatus = true; //正在运行
					g_conf[0].isCommentRunStatus = true;
					//--------------------------------------------------------------------
					SpecialName = undefined;
					steamName = undefined;
				
					if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
						//获取备注
						var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
						SpecialName = undefined;
						if (SpecialNameobj != "undefined") {
							SpecialName = SpecialNameobj[0].innerText; //备注
						}
						//获取steam名称
						steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
						name = steamName;
					} else //否则如果是好友界面
					{
						//获取名称,然后判断是备注还是steam名称
						var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
						var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
						SpecialName = undefined;
						if (SpecialNameobj.length > 0) //安全检查
						{
							if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
							{
								console.log("获取到的是备注");
								SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
								steamName = undefined; //就没有名称
								name = SpecialName;
							} else if (nicknameObj.length == 0) {
								console.log("获取到的是steam名称");
								SpecialName = undefined; //就没有备注
								steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
								name = steamName;
							}
						}
					}
					//--------------------------------------------------------------------
					//判断选择的模式
					if ($("select_islName_checkbox").checked == true) {
						mode = 1;
					}
					else if ($("select_isSpecialName_checkbox").checked == true) {
						mode = 2;
					}
					else if ($("select_isCustom_checkbox").checked == true) {
						mode = 3;
					}
					else //如果都没有选中，则直接发送消息
						mode = 0;
				
					var getVA = function(steamName, SpecialName) {
						return steamName == undefined ? steamName : SpecialName;
					};
				
					console.log("DBG 0", steamName, SpecialName, name);
				
					if (mode == 1) { //是否为好友添加称呼 (如果好友没有备注则使用steam名称)
						//判断是否有备注,没有则使用steam名称
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
				
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								newMgs = SpecialName + msg_CN;
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								newMgs = SpecialName + msg_EN;
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								newMgs = SpecialName + msg_JP;
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								newMgs = SpecialName + msg_CN_SG;
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								newMgs = SpecialName + msg_CN_HANT;
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								newMgs = SpecialName + msg_CN_HK;
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								newMgs = SpecialName + msg_CN_MO;
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								newMgs = SpecialName + msg_CN_TW;
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != "")
									newMgs = SpecialName + msg_EN;
								else if (msg_JP != undefined && msg_JP != "")
									newMgs = SpecialName + msg_JP;
								else if (msg_CN != undefined && msg_CN != "")
									newMgs = SpecialName + msg_CN;
								else
									newMgs = SpecialName + msg;
							}
							console.log("DBG 1", steamName, SpecialName, name, strNationality);
							console.log("为" + SpecialName + "添加称呼: " + SpecialName);
							//newMgs = SpecialName + msg;
						} else {
							let strNationality = steamName.slice(0, steamName.indexOf('}') + 1); //提取国籍
							steamName = steamName.slice(steamName.indexOf('}') + 1); //去掉国籍标识
				
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								newMgs = steamName + msg_CN;
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								newMgs = steamName + msg_EN;
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								newMgs = steamName + msg_JP;
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								newMgs = steamName + msg_CN_SG;
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								newMgs = steamName + msg_CN_HANT;
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								newMgs = steamName + msg_CN_HK;
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								newMgs = steamName + msg_CN_MO;
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								newMgs = steamName + msg_CN_TW;
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != "")
									newMgs = steamName + msg_EN;
								else if (msg_JP != undefined && msg_JP != "")
									newMgs = steamName + msg_JP;
								else if (msg_CN != undefined && msg_CN != "")
									newMgs = steamName + msg_CN;
								else
									newMgs = steamName + msg;
							}
							console.log("DBG 2", steamName, SpecialName, name, strNationality);
							console.log("为" + steamName + "添加称呼: " + steamName);
							//newMgs = steamName + msg;
						}
					} else if (mode == 2) { //是否为好友添加称呼 (请为好友设置备注为需要的称呼,否则不添加称呼)
						//判断是否有备注,没有则不操作
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
				
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								newMgs = SpecialName + msg_CN;
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								newMgs = SpecialName + msg_EN;
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								newMgs = SpecialName + msg_JP;
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								newMgs = SpecialName + msg_CN_SG;
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								newMgs = SpecialName + msg_CN_HANT;
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								newMgs = SpecialName + msg_CN_HK;
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								newMgs = SpecialName + msg_CN_MO;
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								newMgs = SpecialName + msg_CN_TW;
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != "")
									newMgs = SpecialName + msg_EN;
								else if (msg_JP != undefined && msg_JP != "")
									newMgs = SpecialName + msg_JP;
								else if (msg_CN != undefined && msg_CN != "")
									newMgs = SpecialName + msg_CN;
								else
									newMgs = SpecialName + msg;
							}
							console.log("DBG 3", steamName, SpecialName, name, strNationality);
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							//newMgs = SpecialName + msg;
						} else {
							let strNationality = steamName.slice(0, steamName.indexOf('}') + 1); //提取国籍
							steamName = steamName.slice(steamName.indexOf('}') + 1); //去掉国籍标识
				
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								newMgs = msg_CN;
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								newMgs = msg_EN;
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								newMgs = msg_JP;
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								newMgs = msg_CN_SG;
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								newMgs = msg_CN_HANT;
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								newMgs = msg_CN_HK;
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								newMgs = msg_CN_MO;
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								newMgs = msg_CN_TW;
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != "")
									newMgs = msg_EN;
								else if (msg_JP != undefined && msg_JP != "")
									newMgs = msg_JP;
								else if (msg_CN != undefined && msg_CN != "")
									newMgs = msg_CN;
								else
									newMgs = msg;
							}
							console.log("DBG 4", steamName, SpecialName, name, strNationality);
							//newMgs = msg;
						}
					} else if (mode == 3) { //是否为好友添加称呼 (请为好友设置备注为需要的称呼,否则不添加称呼)
						//判断是否有备注,没有则不操作
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
							
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								if(msg_CN == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								if(msg_EN == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_EN;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								if(msg_JP == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_JP;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								if(msg_CN_SG == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_SG;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								if(msg_CN_HANT == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_HANT;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								if(msg_CN_HK == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_HK;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								if(msg_CN_MO == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_MO;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								if(msg_CN_TW == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_TW;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != ""){
									let str = msg_EN;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
								}	
								else if (msg_JP != undefined && msg_JP != ""){
									let str = msg_JP;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
								}
								else if (msg_CN != undefined && msg_CN != ""){
									let str = msg_CN;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
								}
								else{
									let str = msg;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
								}
							}
							console.log("DBG 3", steamName, SpecialName, name, strNationality);
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							//newMgs = SpecialName + msg;
						} else {
							let strNationality = steamName.slice(0, steamName.indexOf('}') + 1); //提取国籍
							steamName = steamName.slice(steamName.indexOf('}') + 1); //去掉国籍标识
						
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								if(msg_CN == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								if(msg_EN == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_EN;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								if(msg_JP == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_JP;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								if(msg_CN_SG == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_SG;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								if(msg_CN_HANT == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_HANT;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								if(msg_CN_HK == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_HK;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								if(msg_CN_MO == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_MO;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								if(msg_CN_TW == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_TW;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != ""){
									let str = msg_EN;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
								}	
								else if (msg_JP != undefined && msg_JP != ""){
									let str = msg_JP;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
								}
								else if (msg_CN != undefined && msg_CN != ""){
									let str = msg_CN;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
								}
								else{
									let str = msg;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
								}
							}
							console.log("DBG 4", steamName, SpecialName, name, strNationality);
							//newMgs = msg;
						}
					} else if (mode == 0) { //直接发送内容
						let strNationality = name.slice(0, name.indexOf('}') + 1); //提取国籍
						name = name.slice(name.indexOf('}') + 1); //去掉国籍标识
				
						if (strNationality == "{CN}" || strNationality == "{CN-N}") {
							newMgs = msg_CN;
						} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
							newMgs = msg_EN;
						} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
							newMgs = msg_JP;
						} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
							newMgs = msg_CN_SG;
						} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
							newMgs = msg_CN_HANT;
						} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
							newMgs = msg_CN_HK;
						} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
							newMgs = msg_CN_MO;
						} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
							newMgs = msg_CN_TW;
						} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
						{
							if (msg_EN != undefined && msg_EN != "")
								newMgs = msg_EN;
							else if (msg_JP != undefined && msg_JP != "")
								newMgs = msg_JP;
							else if (msg_CN != undefined && msg_CN != "")
								newMgs = msg_CN;
							else
								newMgs = msg;
						}
						console.log("DBG 5", steamName, SpecialName, name, strNationality);
						//ewMgs = msg;
					}
					console.log("[Debug] mode:", mode);
					console.log("[Debug] SpecialName:", SpecialName, "steamName:", steamName);
					console.log("[Debug] newMgs:", newMgs, "msg:", msg);
					//--------------------------------------------------------------------
					let profileID = cur.getAttribute("data-steamid");
					
					if (SpecialName != undefined) {
						if (SpecialName.indexOf(g_conf[0].strNoOperate) != -1) {
							jQuery("#log_body")[0].innerHTML +=
								"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 已跳过留言! ' + profileID + '  ' + name + "</a><br>";
							continue;
						}
					}
					
					(function(i, profileID) {
						//setTimeout(function() {
				
						jQuery.post("//steamcommunity.com/comment/Profile/post/" + profileID + "/-1/", {
							comment: newMgs,
							count: 6,
							sessionid: g_sessionID
						}, function(response) {
							if (response.success === false) {
								jQuery("#log_body")[0].innerHTML +=
									"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 留言失败了! ' + profileID + '  ' + name +
									'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
							} else {
								jQuery("#log_body")[0].innerHTML +=
									'[' + (i + 1) + '/' + total + '] ' +
									"成功发表评论于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
									profileID + '  ' + name + "</a>" +
									"<span> → </span><a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
									profileID + "#commentthread_Profile_"+ profileID +"_textarea" + "\">" + newMgs + "</a><br>";
							}
						}).fail(function() {
							jQuery("#log_body")[0].innerHTML +=
								'[' + (i + 1) + '/' + total + '] ' +
								"<span style='color:#DA2626;'>无法发表评论于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
								profileID + "\">" +
								profileID + '  ' + name + "</a></span><br>";
						}).always(function() {
							jQuery("#log_head").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
						});
						
						
						//}, i * 6000);
				
					})(i, profileID);
					await sleep(g_conf[0].delay * 1000)
					//console.log(cur)
				}
				
				
				date = new Date();
				endTime = date.getTime();
				let time = endTime - startTime;
				//console.log("time",time,endTime,startTime);
				//--------------------------------------------------------------------------------
				//计算出相差天数
				var str = "";
				let days = Math.floor(time / (24 * 3600 * 1000))
				//计算出小时数
				let leave1 = time % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				let hours = Math.floor(leave1 / (3600 * 1000))
				//计算相差分钟数
				let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				let minutes = Math.floor(leave2 / (60 * 1000))
				//计算相差秒数
				let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				//let seconds=Math.round(leave3/1000)
				let seconds = leave3 / 1000
				if (days > 0)
					str += days + "天";
				if (hours > 0)
					str += hours + "小时";
				if (minutes > 0)
					str += minutes + "分钟";
				if (seconds > 0)
					str += seconds + "秒";
				//--------------------------------------------------------------------------------
				jQuery("#log_body")[0].innerHTML +=
					"<b>留言完毕! 用时: <span style='color:#35ff8b;'>" + str + "</span></b><br>";
				//});
				g_conf[0].isCommentRunStatus = false;
				
				g_conf[0].YunStatus = false; //没有运行
				
			} else {
				alert("请确保您输入了一条消息并选择了1个或更多好友。");
			}
		},0);
	});
	
	var GroupMode = 0; //分组标志 0没有分组 1是国籍 2是离线时间
	
	jQuery("#NationalityGroup").click(async function() { //按国籍进行高亮分组
		//1.遍历所有好友,针对不同国籍进行上色
		//2.对好友进行排序
	
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selectable").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			jQuery("#log_head, #log_body").html("");
			
			var jqobj = jQuery("#search_results .selectable");
	
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
	
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
	
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf('{CN}') != -1 ||
								SpecialName.indexOf('{EN}') != -1 ||
								SpecialName.indexOf('{JP}') != -1 ||
								SpecialName.indexOf('{CN-SG}') != -1 ||
								SpecialName.indexOf('{CN-HANT}') != -1 ||
								SpecialName.indexOf('{CN-HK}') != -1 ||
								SpecialName.indexOf('{CN-MO}') != -1 ||
								SpecialName.indexOf('{CN-TW}') != -1
							) //检查是否设置了国籍标识
							{
								if (SpecialName.indexOf('{CN}') != -1) {
									cur.style.background = "#66cc";
								} else if (SpecialName.indexOf('{EN}') != -1) {
									cur.style.background = "#0C7FB2";
								} else if (SpecialName.indexOf('{JP}') != -1) {
									cur.style.background = "#008080";
								} else if (SpecialName.indexOf('{CN-SG}') != -1) {
									cur.style.background = "#808000";
								} else if (SpecialName.indexOf('{CN-HANT}') != -1) {
									cur.style.background = "#ae7844";
								} else if (SpecialName.indexOf('{CN-HK}') != -1) {
									cur.style.background = "#649115";
								} else if (SpecialName.indexOf('{CN-MO}') != -1) {
									cur.style.background = "#0f965b";
								} else if (SpecialName.indexOf('{CN-TW}') != -1) {
									cur.style.background = "#173eac";
								}
							} else if (SpecialName.indexOf('{CN-N}') != -1 ||
								SpecialName.indexOf('{EN-N}') != -1 ||
								SpecialName.indexOf('{JP-N}') != -1 ||
								SpecialName.indexOf('{CN-SG-N}') != -1 ||
								SpecialName.indexOf('{CN-HANT-N}') != -1 ||
								SpecialName.indexOf('{CN-HK-N}') != -1 ||
								SpecialName.indexOf('{CN-MO-N}') != -1 ||
								SpecialName.indexOf('{CN-TW-N}') != -1
							) //检查是否设置了国籍标识
							{
								if (SpecialName.indexOf('{CN-N}') != -1) {
									cur.style.background = "#66cc";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{EN-N}') != -1) {
									cur.style.background = "#0C7FB2";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{JP-N}') != -1) {
									cur.style.background = "#008080";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-SG-N}') != -1) {
									cur.style.background = "#808000";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-HANT-N}') != -1) {
									cur.style.background = "#ae7844";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-HK-N}') != -1) {
									cur.style.background = "#649115";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-MO-N}') != -1) {
									cur.style.background = "#0f965b";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-TW-N}') != -1) {
									cur.style.background = "#173eac";
									cur.style.borderColor = "#FF00FF";
								}
							} else {
								//设置了备注没有设置国籍
								cur.style.background = "#188038";
							}
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							//jQuery("#log_body")[0].innerHTML +=
							//	"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
							//	"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有备注不能取消! ' + profileID + '  ' + steamName + "</a><br>";
							//continue;
						}
					}
				}
				console.log("[Debug] name:", SpecialName);
				//await sleep(1000);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			//window.location.reload(true); //强制从服务器重新加载当前页面
		}
	
	
	});
	
	await jQuery("#NationalitySortGroup").click(async function() { //按国籍进行排序分组
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selectable").length; //所有的朋友总数
		jQuery("#log_head, #log_body").html("");
		var jqobj = jQuery("#search_results .selectable"); //所有的朋友
	
	
		var child_CN, child_EN, child_JP, child_CN_SG, child_CN_HANTd, child_CN_HK, child_CN_MO, child_CN_TW;
		if (GroupMode != 1) {
			var mainFriendObj;
			if (GroupMode == 2) { //节点已经被模式2处理过
				//备份和处理
				if (document.getElementById("search_results1") == null) { //没有被模式1处理过
					mainFriendObj = document.getElementById("search_results0"); //获取原节点
					var newCopyObj = mainFriendObj.cloneNode(true);
					var mainFriendObj1 = document.getElementById("search_results"); //获取之前模式的节点
					mainFriendObj1.style.display = "none"; //之前模式的节点隐藏
					mainFriendObj1.id = "search_results2"; //之前模式的节点
					mainFriendObj1.className = "profile_friends search_results2"; //之前模式的节点
					newCopyObj.style.display = ""; //克隆的原节点取消隐藏(显示)
					newCopyObj.id = "search_results"; //克隆的原节点
					newCopyObj.className = "profile_friends search_results"; //克隆的原节点
					mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
				} else { //被模式1处理过
					var obj = document.getElementById("search_results1");
					var mainFriendObj1 = document.getElementById("search_results"); //获取之前模式的节点
					mainFriendObj = document.getElementById("search_results0"); //获取原节点
					mainFriendObj1.style.display = "none"; //之前模式的节点隐藏
					mainFriendObj1.id = "search_results2"; //之前模式的节点
					mainFriendObj1.className = "profile_friends search_results2"; //之前模式的节点
					obj.style.display = ""; //取消隐藏(显示)
					obj.id = "search_results"; //节点
					obj.className = "profile_friends search_results"; //节点
				}
	
			} else { //节点还没有被动过
				//备份和处理
				mainFriendObj = document.getElementById("search_results"); //获取原节点
				var newCopyObj = mainFriendObj.cloneNode(true);
				newCopyObj.style.display = "none"; //克隆的原节点隐藏
				newCopyObj.id = "search_results0"; //克隆的原节点
				newCopyObj.className = "profile_friends search_results0"; //克隆的原节点
				mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
	
	
			}
			// //备份和处理
			// var mainFriendObj = document.getElementById("search_results"); //获取原节点
			// var newCopyObj = mainFriendObj.cloneNode(true);
			// newCopyObj.style.display = "none"; //隐藏
			// mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
	
			var StateObj = mainFriendObj.getElementsByClassName("state_block");
			for (let i = 0; i < StateObj.length; i++) {
				StateObj[i].style.display = "none"; //隐藏状态条
			}
	
			//创建新盒子和克隆分组节点
			console.log("开始分组...");
			child_CN = document.createElement('div'); //创建
			child_CN.id = "Firend_CN";
			child_CN.style.display = "flex";
			child_CN.style.flex = "1 100%";
			child_CN.style.flexFlow = "row wrap";
			child_CN.style.margin = "8px 0px 0px 0px";
			// child_CN.style.justifyContent = "space-start";
			mainFriendObj.appendChild(child_CN);
	
			child_EN = child_CN.cloneNode(true); //克隆
			child_EN.id = "Firend_EN";
			mainFriendObj.appendChild(child_EN);
	
			child_JP = child_EN.cloneNode(true); //克隆
			child_JP.id = "Firend_JP";
			mainFriendObj.appendChild(child_JP);
	
			child_CN_SG = child_EN.cloneNode(true); //克隆
			child_CN_SG.id = "Firend_CN_SG";
			mainFriendObj.appendChild(child_CN_SG);
	
			child_CN_HANTd = child_EN.cloneNode(true); //克隆
			child_CN_HANTd.id = "Firend_CN_HANTd";
			mainFriendObj.appendChild(child_CN_HANTd);
	
			child_CN_HK = child_EN.cloneNode(true); //克隆
			child_CN_HK.id = "Firend_CN_HK";
			mainFriendObj.appendChild(child_CN_HK);
	
			child_CN_MO = child_EN.cloneNode(true); //克隆
			child_CN_MO.id = "Firend_CN_MO";
			mainFriendObj.appendChild(child_CN_MO);
	
			child_CN_TW = child_EN.cloneNode(true); //克隆
			child_CN_TW.id = "Firend_CN_TW";
			mainFriendObj.appendChild(child_CN_TW);
	
			//-------------------------------------------------
	
			var newGroupTitle = StateObj[0].cloneNode(true); //克隆
			newGroupTitle.style.display = ""; //去除隐藏样式
			newGroupTitle.innerText = "CN";
			child_CN.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "EN";
			child_EN.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "JP";
			child_JP.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_SG";
			child_CN_SG.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_HANTd";
			child_CN_HANTd.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_HK";
			child_CN_HK.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_MO";
			child_CN_MO.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_TW";
			child_CN_TW.appendChild(newGroupTitle);
	
			//遍历所有节点,向盒子里添加节点
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
	
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
	
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							//console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf('{CN}') != -1 || SpecialName.indexOf('{CN-N}') != -1) { //检查是否设置了国籍标识
								child_CN.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{EN}') != -1 || SpecialName.indexOf('{EN-N}') != -1) {
								child_EN.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{JP}') != -1 || SpecialName.indexOf('{JP-N}') != -1) {
								child_JP.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-SG}') != -1 || SpecialName.indexOf('{CN-SG-N}') != -1) {
								child_CN_SG.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-HANT}') != -1 || SpecialName.indexOf('{CN-HANT-N}') != -1) {
								child_CN_HANT.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-HK}') != -1 || SpecialName.indexOf('{CN-HK-N}') != -1) {
								child_CN_HK.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-MO}') != -1 || SpecialName.indexOf('{CN-MO-N}') != -1) {
								child_CN_MO.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-TW}') != -1 || SpecialName.indexOf('{CN-TW-N}') != -1) {
								child_CN_TW.appendChild(SpecialNameobj[0].parentNode);
							} else {
								// jQuery("#log_body")[0].innerHTML +=
								// 	"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								// 	"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置国籍不能取消! ' + profileID + '  ' + SpecialName + "</a><br>";
								// continue;
							}
						} else if (nicknameObj.length == 0) {
							//console.log("获取到的是steam名称");
							// steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							// jQuery("#log_body")[0].innerHTML +=
							// 	"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
							// 	"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有备注不能取消! ' + profileID + '  ' + steamName + "</a><br>";
							// continue;
						}
					}
				}
				//console.log("[Debug] name:", name);
			}
			GroupMode = 1;
		}
	
	});
	
	await jQuery("#OfflineTimeGroup").click(async function() { //按在线时间进行排序分组
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selectable.offline").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			jQuery("#log_head, #log_body").html("");
			var jqobj = jQuery("#search_results .selectable.offline"); //选择离线的好友
			var ArrOfflineTime = [];
	
			if (GroupMode != 2) {
				var mainFriendObj;
				if (GroupMode == 1) { //节点已经被模式1处理过
					//备份和处理
					if (document.getElementById("search_results2") == null) { //没有被模式2处理过
						mainFriendObj = document.getElementById("search_results0"); //获取原节点
						var newCopyObj = mainFriendObj.cloneNode(true);
						var mainFriendObj1 = document.getElementById("search_results"); //获取之前模式的节点
						mainFriendObj1.style.display = "none"; //之前模式的节点隐藏
						mainFriendObj1.id = "search_results1"; //之前模式的节点
						mainFriendObj1.className = "profile_friends search_results1"; //之前模式的节点
						newCopyObj.style.display = ""; //克隆的原节点取消隐藏(显示)
						newCopyObj.id = "search_results"; //克隆的原节点
						newCopyObj.className = "profile_friends search_results"; //克隆的原节点
						mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
					} else { //被模式2处理过
						var obj = document.getElementById("search_results2");
						var mainFriendObj1 = document.getElementById("search_results"); //获取之前模式的节点
						mainFriendObj = document.getElementById("search_results0"); //获取原节点
						mainFriendObj1.style.display = "none"; //之前模式的节点隐藏
						mainFriendObj1.id = "search_results1"; //之前模式的节点
						mainFriendObj1.className = "profile_friends search_results1"; //之前模式的节点
						obj.style.display = ""; //取消隐藏(显示)
						obj.id = "search_results"; //节点
						obj.className = "profile_friends search_results"; //节点
					}
				} else { //节点还没有被动过
					//备份和处理
					mainFriendObj = document.getElementById("search_results"); //获取原节点
					var newCopyObj = mainFriendObj.cloneNode(true);
					newCopyObj.style.display = "none"; //克隆的原节点隐藏
					newCopyObj.id = "search_results0"; //克隆的原节点
					newCopyObj.className = "profile_friends search_results0"; //克隆的原节点
					mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
	
	
				}
	
				var StateObj = mainFriendObj.getElementsByClassName("state_block");
				for (let i = 0; i < StateObj.length; i++) {
					StateObj[i].style.display = "none"; //隐藏状态条
				}
				//创建新盒子和克隆分组节点
				console.log("开始分组...");
				child_Offline = document.createElement('div'); //创建
				child_Offline.id = "Firend_Offline";
				child_Offline.style.display = "flex";
				child_Offline.style.flex = "1 100%";
				child_Offline.style.flexFlow = "row wrap";
				child_Offline.style.margin = "8px 0px 0px 0px";
				// child_Offline.style.justifyContent = "space-start";
				mainFriendObj.appendChild(child_Offline);
	
				child_Online = child_Offline.cloneNode(true); //克隆
				child_Online.id = "Firend_Online";
				mainFriendObj.appendChild(child_Online);
	
				child_InGame = child_Offline.cloneNode(true); //克隆
				child_InGame.id = "Firend_InGame";
				mainFriendObj.appendChild(child_InGame);
	
				//-------------------------------------------------
	
				var newGroupTitle = StateObj[0].cloneNode(true); //克隆
				newGroupTitle.style.display = ""; //去除隐藏样式
				newGroupTitle.innerText = "Offline";
				child_Offline.appendChild(newGroupTitle);
	
				newGroupTitle = newGroupTitle.cloneNode(true); //克隆
				newGroupTitle.innerText = "Online";
				child_Online.appendChild(newGroupTitle);
	
				newGroupTitle = newGroupTitle.cloneNode(true); //克隆
				newGroupTitle.innerText = "InGame";
				child_InGame.appendChild(newGroupTitle);
	
				for (let i = 0; i < jqobj.length; i++) {
					let cur = jqobj.get(i);
					let profileID = cur.getAttribute("data-steamid");
					//--------------------------------------------------------------------
					SpecialName = undefined;
					steamName = undefined;
	
					if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
						//获取备注
						var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
						SpecialName = undefined;
						if (SpecialNameobj != "undefined") {
							SpecialName = SpecialNameobj[0].innerText; //备注
						}
						//获取steam名称
						steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
						name = steamName;
					} else //否则如果是好友界面
					{
						//获取名称,然后判断是备注还是steam名称
						var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
						var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
						SpecialName = undefined;
	
						var OfflineTime = SpecialNameobj[0].getElementsByClassName("friend_last_online_text");
						var strOfflineTime = "";
	
						var nYear = "0",
							nMonth = "0",
							nDay = "0",
							nHours = "0",
							nMinutes = "0",
							nSeconds = "0";
						var strData = "";
						if (OfflineTime.length > 0) //找到了
						{
							strOfflineTime = OfflineTime[0].innerText.slice(5); //去掉‘上次在线’字符串
							var strOfflineTimeArr = strOfflineTime.split(' ');
							strOfflineTimeArr[strOfflineTimeArr.length - 1] = strOfflineTimeArr[strOfflineTimeArr.length - 1].slice(0,
								-1); //去掉最后的‘前’字符串
							//console.log("strOfflineTime",strOfflineTime,strOfflineTimeArr);
							for (let i = 0; i < strOfflineTimeArr.length; i += 2) {
								if (strOfflineTimeArr[i + 1] == "年")
									nYear = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "月")
									nMonth = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "天")
									nDay = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "小时")
									nHours = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "分钟")
									nMinutes = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "秒")
									nSeconds = strOfflineTimeArr[i];
							}
							strData = nYear + '/' + nMonth + '/' + nDay + ' ' + nHours + ':' + nMinutes + ':' + nSeconds;
							//console.info("strData",strData);
	
							var hzWeek = new Array("日", "一", "二", "三", "四", "五", "六", "日");
	
							function cweekday(wday) {
								return hzWeek[wday];
							}
	
							function calaDay() { //计算时间差: 一个是当前时间，一个是相差的时间，就都转为秒数进行相减，再还原时间
								var date = new Date();
								ddd = parseInt(nDay); //转数字后取对应负数
								//ttt = new Date(y, m - 1, d).getTime() + ddd * 24000 * 3600;
								ttt = date.getTime() + ~(ddd * 86400);
								theday = new Date();
								theday.setTime(ttt);
								//document.getElementById("result1").innerHTML = theday.getFullYear() + "年" + (1 + theday.getMonth()) + "月" + theday.getDate() + "日" + "星期" + cweekday(theday.getDay());
								return theday.getTime(); //获取对应的时间戳
							}
							
							function calbHMS() { //计算时间差: 一个是当前时间，一个是相差的时间，就都转为秒数进行相减，再还原时间
								var date = new Date();
								var date1 = new Date();
								var s = nHours * 3600 + nMinutes * 60 + nSeconds;
								// y2 = date.getYear();
								// m2 = date.getMonth();
								// d2 = date.getDay();
								date1.setTime(date.getTime() + ~s);
								// y3 = document.getElementById("SY3").value;
								// m3 = document.getElementById("SM3").value;
								// d3 = document.getElementById("SD3").value;
								// day2 = new Date(y2, m2 - 1, d2);
								// day3 = new Date(y3, m3 - 1, d3);
								//document.getElementById("result2").innerHTML = (day3 - day2) / 86400000;
								return date1.getTime();
							}
	
							var nS = 0;
							if (nDay > 0) {
								nS = calaDay()
								//console.log("calaDay(nDay):",nS);
							} else {
								nS = calbHMS()
								//console.log("calbHMS()",nS);
							}
							ArrOfflineTime.push([nS, i]);
						}
	
	
						//SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
						//创建离线区和在线区
	
						//遍历所有的好友,找到离线的好友,解析字符串,装入Date对象 //6个数字指定年、月、日、小时、分钟、秒(0)  //没有的就写0
						//获取毫秒数 dateObject.getTime()   或者用   Date.parse(datestring)
						// var d=new Date("5/05/11 1:10:0");
						// document.write("从 1970/01/01 至今已有：" + d.getTime() + " 毫秒。");
						// document.write("从 1970/01/01 至今已有：" + Date.parse("5/05/11 1:10:0") + " 毫秒。");
	
						//存储在二维数组里，一个是毫秒数，一个是数组下标
						//对秒数进行升序排序，然后取下标，对指定好友依次添加
					}
					//console.log("[Debug] name:", name);
				} //for
				
				//console.log(ArrOfflineTime);
				ArrOfflineTime.sort(function(a, b) {
					if (a[0] > b[0])
						return 1;
					if (a[0] < b[0])
						return -1;
					return 0;
				}); //对时间戳排序
				//console.log(ArrOfflineTime);
	
				//遍历二维数组，然后取下标，对指定好友依次添加
				for (let i = 0; i < ArrOfflineTime.length; i++) {
					child_Offline.appendChild(jqobj[ArrOfflineTime[i][1]]); //.getElementsByClassName("friend_block_content").parentNode
				}
				//将游戏中和在线的好友也添加到分组里
				var jqobj1 = jQuery("#search_results .selectable.online"); //选择在线的好友
				var jqobj2 = jQuery("#search_results .selectable.in-game"); //选择游戏中的好友
				var jqobj3 = jQuery("#search_results .selectable.golden"); //选择金色的好友
				for (let i = 0; i < jqobj3.length; i++) {
					var strGame = jqobj3[i].getElementsByClassName("friend_small_text")[0].innerText;
					var game = strGame.replace(/^\s+|\s+$/g, ""); //去除两边的空格
					//console.log("strGame");
					if (game == "") {
						//console.log("在线");
						child_Online.appendChild(jqobj3[i]);
					} else {
						//console.log(game);
						child_InGame.appendChild(jqobj3[i]);
					}
				}
				for (let i = 0; i < jqobj1.length; i++) {
					child_Online.appendChild(jqobj1[i]);
				}
				for (let i = 0; i < jqobj2.length; i++) {
					child_InGame.appendChild(jqobj2[i]);
				}
				GroupMode = 2;
			}
		}
	});
	
	await jQuery("#ShowFriendData").click(async function() { //显示好友详细数据(不可用)
		traverseAllFriend(); //遍历所有好友
	
	});
}

(async()=>{
	var ui = new UI();
	gc_ui = ui;
	if(await ui.initUI() != false){
		await ui.createUI();
	}
})();