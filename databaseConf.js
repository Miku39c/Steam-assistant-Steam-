/**
 * @file 数据库类 和 程序所需的数据结构 和 一些全局变量
 */
 
 //----------------------------------------------------------------------------------------------------------------------------------------------------
 //模块: databaseConf.js class DB -> ui.js UI::initUI()
 /* 全局数据库对象 */
 var g_db,g_db1,g_db2,g_db3,g_db4;
 //----------------------------------------------------------------------------------------------------------------------------------------------------
 //模块: databaseConf.js -> ui.js UI::initUI()
 /* 判断是否是目标运行页面的正则 */
 //您的好友
 const g_friendUrlRegExp = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?$/;
 //添加好友
 const g_otherUrlRegExp1_1 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/add?\/?$/;
 //待处理邀请
 const g_otherUrlRegExp1_2 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/pending?\/?$/;
 //已屏蔽
 const g_otherUrlRegExp1_3 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/blocked?\/?$/;
 //近期共同游戏的玩家
 const g_otherUrlRegExp1_4 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/coplay?\/?$/;
 //直播版主
 const g_otherUrlRegExp1_5 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/broadcast_moderator?\/?$/;
 //关注的玩家
 const g_otherUrlRegExp2_1 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/following\/?$/;
 //您的组
 const g_otherUrlRegExp2_2 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/groups\/?$/;
 //待处理邀请
 const g_otherUrlRegExp2_3 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/groups\/pending\/?$/;
 
 const g_otherUrlRegExp3 = /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?([A-Za-z0-9$/-_.+!*'(),])+$/;
 //----------------------------------------------------------------------------------------------------------------------------------------------------
 //模块: databaseConf.js -> ui.js UI::initUI()
 /* 判断是否是目标变量的正则 */
 const g_steamId64RegExp = /7656119[0-9]{10}/;
 //----------------------------------------------------------------------------------------------------------------------------------------------------
 //模块: externalApis.js class intelligenceAI, class SteamDB, class friendActivity, class UI, class externalApis, class App
 /* 全局对象 */
 var gc_res = null;
 
 
 var gc_ai = null;
 var gc_steamdb = null;
 var gc_friAct = null;
 var gc_menu_friends_ui = null;           //您的好友
 var gc_menu_friends_invite_ui = null;    //待处理邀请
 var gc_menu_shielding_ui = null;         //已屏蔽
 var gc_menu_gameFriend_ui = null;        //近期共同游戏的玩家
 var gc_menu_liveAdmin_ui = null;         //直播版主
 var gc_menu_following_Players_ui = null; //关注的玩家
 var gc_menu_groups_ui = null;            //您的组
 var gc_menu_groups_invite_ui = null;     //待处理邀请
 var gc_exApis = null;
 var gc_app = null;
 //----------------------------------------------------------------------------------------------------------------------------------------------------
 //模块: utility.js -> registeMenu() 和 unRegisteMenu()使用
 /* 全局对象 */
 var g_arrMenuID = [5];
 
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
	,is_Debug: true /*是否是调试模式(总开关，是否显示调试输出，显示当前运行状态)*/\n\
	,isTrackRunStatus: true /*是否跟踪运行状态(更详细的调试输出，可控型只显示错误警告 到 变量级)*/\n\
	,isAddYunBreakWarn: true /*是否添加运行中断警告*/\n\
	\n\
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
	}\n\
];/* g_conf[0].*/\n\
\n\
/*ui配置相关信息*/\n\
var g_uiConf = {\n\
	isShowQuickNavigationBar: false /*是否显示快速导航栏*/\n\
	,isShow_menu_friend: true /*好友列表*/\n\
	,isShow_menu_activity: true /*动态列表*/\n\
	,isShow_menu_registerKey: true /*激活key*/\n\
	,isShow_menu_redeemWalletCode: true /*充值key*/\n\
	,isShow_menu_steamdbFree: true /*SteamDB预告*/\n\
};/* g_uiConf.*/\n\
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

//-------------------------------------------------------------------------------------------------------------
//数据库
class DB{
	constructor(){
		this.DBstore = []; //数据库存储数组(多实例)
		this.DBindex = 0;  //当前数据库索引
		
		if(arguments.length == 1){
			this._constructor(arguments[0]);
		}else if(arguments.length == 2){
			this._constructor(arguments[0],arguments[1]);
		}
	}
	_constructor(DBConfig,isTest = true){ //默认创建新的数据库 //数据库配置,是否启用测试
		if(isTest == true)
			this.Test();
		this.initAndCreateNewDBInstance(DBConfig);
	}
	use(DBname){ //指定要使用的数据库
		for (let i = 0; i < this.DBstore.length; i++) {
			if(DBname == DBstore[i]._dbInfo.name){
				this.DBindex = i;
				return DBstore[i];
			}
		}
		return null;
	}
	async initCurrentDBInstance(DBConfig){ //单数据库 //初始化当前数据库实例
		var obj;
		if(typeof DBConfig == "object"){
			localforage.config(DBConfig);
			this.DBindex = this.DBstore.push(obj) -1; //
			obj = localforage;
		}else{
			console.log("参数不合法，请检查...");
		}
		
		await obj.ready().then(function() {
			// 当 localforage 将指定驱动初始化完成时，此处代码运行
			console.log("数据库初始化成功! 当前使用的是: "+ localforage.driver());
		}).catch(function (e) {
			// 当没有可用的驱动时，ready()将会失败
			console.log("数据库初始化失败(没有可用的驱动)! " + e); // No available storage method found.
		});
		return obj;
	}
	initAndCreateNewDBInstance(DBConfig){ //多数据库 //初始化并创建新的数据库实例
		var obj;
		if(typeof DBConfig == "object"){
			obj = localforage.createInstance(DBConfig);
			this.DBindex = this.DBstore.push(obj) -1; //
		}else{
			console.log("参数不合法，请检查...");
		}
		return obj;
	}
	async dropDBInstance(name){ //删除数据库实例
		await localforage.dropInstance({
		  name: name
		}).then(function() {
			//console.log('删除数据库成功!');
		});
	}
	async Read(key){ //读取数据
		var data;
		await this.DBstore[this.DBindex].getItem(key).then(function(value) {
			// 当离线仓库中的值被载入时，此处代码运行
			//console.log("数据读取成功. "+ value);
			data = value;
		}).catch(function(err) {
			// 当出错时，此处代码运行
			console.log("数据读取失败! "+ err);
		});
		return data;
	}
	async ReadAll(){ //读取所有数据(迭代)，返回包含所有数据的数组
		var data = [];
		await this.DBstore[this.DBindex].iterate(function(value, key, iterationNumber) {
			// 此回调函数将对所有 key/value 键值对运行
			//console.log([key, value]);
			data.push([key, value]);
		}).then(function() {
			//console.log("读取所有数据成功."+ [key, value]);
		}).catch(function(err) {
			// 当出错时，此处代码运行
			console.log("读取所有数据失败!"+ err);
		});
		return data;
	}
	async Write(key,value){ //写入数据
		var status = true;
		// 不同于 localStorage，你可以存储非字符串类型
		await this.DBstore[this.DBindex].setItem(key, value).then(function(value) {
			//console.log("数据写入成功. "+ value);
		}).catch(function(err) {
			// 当出错时，此处代码运行
			status = false;
			console.log("数据写入失败! "+ err);
		});
		return status;
	}
	async Remove(key){ //删除数据
		var status = true;
		await this.DBstore[this.DBindex].removeItem(key).then(function() {
			// 当值被移除后，此处代码运行
			//console.log('删除数据成功.');
		}).catch(function(err) {
			// 当出错时，此处代码运行
			status = false;
			console.log('删除数据失败!'+ err);
		});
		return status;
	}
	async RemoveAll(){ //删除所有数据(重置数据库->删除后数据库是空的)
		var status = true;
		await this.DBstore[this.DBindex].clear().then(function() {
			// 当数据库被全部删除后，此处代码运行
			//console.log('删除所有数据成功!');
		}).catch(function(err) {
			// 当出错时，此处代码运行
			status = false;
			console.log('删除所有数据失败!'+ err);
		});
		return status;
	}
	async getLength(){ //获取已存储的所有数据总条数(长度)
		var length;
		await this.DBstore[this.DBindex].length().then(function(numberOfKeys) {
			// 输出数据库的大小
			//console.log(numberOfKeys);
			length = numberOfKeys;
		}).catch(function(err) {
			// 当出错时，此处代码运行
			console.log(err);
		});
		return length;
	}
	async getKeyNameByIndex(index){ //通过下标(index)获取对应的Key名 //此方法很怪异，于是进行重写
		// var name;
		// await this.DBstore[this.DBindex].key(index).then(function(keyName) {
		// 	// key 名
		// 	//console.log(keyName);
		// 	name = keyName;
		// }).catch(function(err) {
		// 	// 当出错时，此处代码运行
		// 	console.log("getKeyNameByIndex()失败!" + err);
		// });
		// return name;
		
		var arr_name = await this.getAllKeyName();
		if(index < 0 || index >= arr_name.length){
			console.log("getKeyNameByIndex()失败! 参数不正确: " +index);
			return null;
		}
		return arr_name[index];
	}
	async getAllKeyName(){ // 返回 包含所有 key 名的数组
		var key;
		await this.DBstore[this.DBindex].keys().then(function(keys) {
			// console.log(keys);
			key = keys;
		}).catch(function(err) {
		    // 当出错时，此处代码运行
		    console.log("getAllKeyName()失败!" + err);
		});
		return key;
	}
	Test(){ //测试当前浏览器的数据库支持情况
		if(localforage.supports(localforage.INDEXEDDB) == true){
			console.log("当前浏览器支持 IndexedDB.");
		}else{
			console.log("当前浏览器不支持 IndexedDB!");
		}
		
		if(localforage.supports(localforage.WEBSQL) == true){
			console.log("当前浏览器支持 WEBSQL.");
		}else{
			console.log("当前浏览器不支持 WEBSQL!");
		}
		
		if(localforage.supports(localforage.LOCALSTORAGE) == true){
			console.log("当前浏览器支持 LOCALSTORAGE.");
		}else{
			console.log("当前浏览器不支持 LOCALSTORAGE!");
		}
	}
}


//---------------------------------------------------------------------------------------
// class GameId {
//     static parseId(id) {
//         if (!id) { return null; }
        
//         let intId = parseInt(id);
//         if (!intId) { return null; }
        
//         return intId;
//     }
    
//     static getAppid(text) {
//         if (!text) { return null; }

//         if (text instanceof HTMLElement) {
//             let appid = text.dataset.dsAppid;
//             if (appid) return GameId.parseId(appid);
//             text = text.href;
//             if (!text) return null;
//         }

//         // app, market/listing
//         let m = text.match(/(?:store\.steampowered|steamcommunity)\.com\/(?:app|market\/listings)\/(\d+)\/?/);
//         return m && GameId.parseId(m[1]);
//     }
    
//     static getSubid(text) {
//         if (!text) { return null; }

//         if (text instanceof HTMLElement) {
//             let subid = text.dataset.dsPackageid;
//             if (subid) return GameId.parseId(subid);
//             text = text.href;
//             if (!text) return null;
//         }
        
//         let m = text.match(/(?:store\.steampowered|steamcommunity)\.com\/sub\/(\d+)\/?/);
//         return m && GameId.parseId(m[1]);
//     }

//     static getBundleid(text) {
//         if (!text) { return null; }

//         if (text instanceof HTMLElement) {
//             let bundleid = text.dataset.dsBundleid;
//             if (bundleid) return GameId.parseId(bundleid);
//             text = text.href;
//             if (!text) return null;
//         }

//         let m = text.match(/(?:store\.steampowered|steamcommunity)\.com\/bundle\/(\d+)\/?/);
//         return m && GameId.parseId(m[1]);
//     }

//     static trimStoreId(storeId) {
//         return Number(storeId.slice(storeId.indexOf('/') + 1));
//     }
    
//     static getAppidImgSrc(text) {
//         if (!text) { return null; }
//         let m = text.match(/(steamcdn-a\.akamaihd\.net\/steam|steamcommunity\/public\/images)\/apps\/(\d+)\//);
//         return m && GameId.parseId(m[2]);
//     }
    
//     static getAppidUriQuery(text) {
//         if (!text) { return null; }
//         let m = text.match(/appid=(\d+)/);
//         return m && GameId.parseId(m[1]);
//     }
    
//     static getAppids(text) {
//         let regex = /(?:store\.steampowered|steamcommunity)\.com\/app\/(\d+)\/?/g;
//         let res = [];
//         let m;
//         while ((m = regex.exec(text)) != null) {
//             let id = GameId.parseId(m[1]);
//             if (id) {
//                 res.push(id);
//             }
//         }
//         return res;
//     }
    
//     static getAppidFromId(text) {
//         if (!text) { return null; }
//         let m = text.match(/game_(\d+)/);
//         return m && GameId.parseId(m[1]);
//     }
    
//     static getAppidFromGameCard(text) {
//         if (!text) { return null; }
//         let m = text.match(/\/gamecards\/(\d+)/);
//         return m && GameId.parseId(m[1]);
//     }
// }

// // todo use https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage
// class LocalStorage {
//     static get(key, defaultValue) {
//         let item = localStorage.getItem(key);
//         if (!item) return defaultValue;
//         try {
//             return JSON.parse(item);
//         } catch (err) {
//             return defaultValue;
//         }
//     }
    
//     static set(key, value) {
//         localStorage.setItem(key, JSON.stringify(value));
//     }

//     static has(key) {
//         return localStorage.getItem(key) !== null;
//     }
    
//     static remove(key) {
//         localStorage.removeItem(key);
//     }
    
//     static keys() {
//         let result = [];
//         for (let i = localStorage.length - 1; i >= 0; --i) {
//             result.push(localStorage.key(i));
//         }
//         return result;
//     }
    
//     static clear() {
//         localStorage.clear();
//     }
// }


// class SyncedStorage {
//     /**
//      * browser.storage.sync limits
//      * QUOTA_BYTES = 102400 // 100KB
//      * QUOTA_BYTES_PER_ITEM = 8192 // 8KB
//      * MAX_ITEMS = 512
//      * MAX_WRITE_OPERATIONS_PER_HOUR = 1800
//      * MAX_WRITE_OPERATIONS_PER_MINUTE = 120
//      */
//     static has(key) {
//         return Object.prototype.hasOwnProperty.call(this.cache, key);
//     }
//     static get(key) {
//         if (typeof this.cache[key] == 'undefined') {
//             if (typeof this.defaults[key] == 'undefined') {
//                 console.warn(`Unrecognized SyncedStorage key '${key}'`);
//             }
//             return this.defaults[key];
//         }
//         return this.cache[key];
//     }

//     static set(key, value) {
//         this.cache[key] = value;
//         return this.adapter.set({ [key]: value, });
//         // this will throw if MAX_WRITE_*, MAX_ITEMS, QUOTA_BYTES* are exceeded
//     }

//     static import(entries) {
//         for (let [key, value] of Object.entries(entries)) {
//             this.cache[key] = value;
//         }
//         return this.adapter.set(entries);
//     }

//     static remove(key) {
//         if (typeof this.cache[key]) {
//             delete this.cache[key];
//         }
//         return this.adapter.remove(key);
//         // can throw if MAX_WRITE* is exceeded
//     }

//     static keys(prefix='') {
//         return Object.keys(this.cache).filter(k => k.startsWith(prefix));
//     }

//     static entries() {
//         return Object.entries(this.cache);
//     }

//     static clear() {
//         this.cache = {};
//         return this.adapter.clear();
//         // can throw if MAX_WRITE* is exceeded
//     }

//     // load whole storage and make local copy
//     static async init() {
//         browser.storage.onChanged.addListener(changes => {
//             for (let [key, { newValue: val, }] of Object.entries(changes)) {
//                 this.cache[key] = val;
//             }
//             if (typeof ContextMenu === "function" && Object.keys(changes).some(key => key.startsWith("context_"))) {
//                 ContextMenu.update();
//             }
//         });

//         let storage = await this.adapter.get(null);
//         Object.assign(this.cache, storage);

//         return this.cache;
//     }
//     static then(onDone, onCatch) {
//         return this.init().then(onDone, onCatch);
//     }

//     static async quota() {
//         let maxBytes = this.adapter.QUOTA_BYTES;
//         let bytes = await this.adapter.getBytesInUse();
//         return bytes / maxBytes; // float 0.0 (0%) -> 1.0 (100%)
//     }
// }
// SyncedStorage.adapter = browser.storage.sync || browser.storage.local;
// SyncedStorage.cache = {};
// SyncedStorage.defaults = {
//     'language': "english",

//     'version': Info.version,
//     'version_show': true,

//     'highlight_owned_color': "#00ce67",
//     'highlight_wishlist_color': "#0491bf",
//     'highlight_coupon_color': "#a26426",
//     'highlight_inv_gift_color': "#800040",
//     'highlight_inv_guestpass_color': "#513c73",
//     'highlight_notinterested_color': "#4f4f4f",
//     'highlight_collection_color': "#856d0e",
//     'highlight_waitlist_color': "#4c7521",

//     'tag_owned_color': "#00b75b",
//     'tag_wishlist_color': "#0383b4",
//     'tag_coupon_color': "#c27120",
//     'tag_inv_gift_color': "#b10059",
//     'tag_inv_guestpass_color': "#65449a",
//     'tag_notinterested_color': "#4f4f4f",
//     'tag_collection_color': "#856d0e",
//     'tag_waitlist_color': "#4c7521",

//     'highlight_owned': true,
//     'highlight_wishlist': true,
//     'highlight_coupon': false,
//     'highlight_inv_gift': false,
//     'highlight_inv_guestpass': false,
//     'highlight_notinterested': false,
//     'highlight_excludef2p': false,
//     'highlight_notdiscounted': false,
//     'highlight_collection': true,
//     'highlight_waitlist': true,

//     'tag_owned': false,
//     'tag_wishlist': false,
//     'tag_coupon': false,
//     'tag_inv_gift': false,
//     'tag_inv_guestpass': false,
//     'tag_notinterested': true,
//     'tag_collection': false,
//     'tag_waitlist': false,
//     'tag_short': false,

//     'hide_owned': false,
//     'hide_ignored': false,
//     'hide_dlcunownedgames': false,
//     'hide_wishlist': false,
//     'hide_cart': false,
//     'hide_notdiscounted': false,
//     'hide_mixed': false,
//     'hide_negative': false,
//     'hide_priceabove': false,
//     'priceabove_value': "",
//     'hidetmsymbols': false,

//     'showlowestprice': true,
//     'showlowestprice_onwishlist': true,
//     'showlowestpricecoupon': true,
//     'showallstores': true,
//     'stores': [],
//     'override_price': "auto",
//     'showregionalprice': "mouse",
//     'regional_countries': ["us", "gb", "ru", "br", "au", "jp"],

//     'show_es_homepagetabs': true,
//     'showmarkettotal': false,
//     'showsteamrepapi': true,
//     'showmcus': true,
//     'showoc': true,
//     'showhltb': true,
//     'showyoutube': true,
//     'showtwitch': true,
//     'showpcgw': true,
//     'showcompletionistme': false,
//     'showprotondb': false,
//     'showviewinlibrary': false,
//     'showsteamcardexchange': false,
//     'showitadlinks': true,
//     'showsteamdb': true,
//     'showbartervg': false,
//     'showastatslink': true,
//     'showyoutubegameplay': true,
//     'showyoutubereviews': true,
//     'showwsgf': true,
//     'exfgls': true,

//     'customize_apppage': {
//         "recentupdates": true,
//         "reviews": true,
//         "about": true,
//         "contentwarning": true,
//         "steamchart": true,
//         "steamspy": true,
//         "surveys": true,
//         "sysreq": true,
//         "legal": true,
//         "morelikethis": true,
//         "recommendedbycurators": true,
//         "customerreviews": true
//     },

//     'customize_frontpage': {
//         "featuredrecommended": true,
//         "specialoffers": true,
//         "trendingamongfriends": true,
//         "discoveryqueue": true,
//         "browsesteam": true,
//         "curators": true,
//         "morecuratorrecommendations": true,
//         "recentlyupdated": true,
//         "fromdevelopersandpublishersthatyouknow": true,
//         "popularvrgames": true,
//         "homepagetabs": true,
//         "gamesstreamingnow": true,
//         "under": true,
//         "updatesandoffers": true,
//         "homepagesidebar": true
//     },

//     //'show_keylol_links': false, // not in use, option is commented out
//     'show_package_info': false,
//     'show_steamchart_info': true,
//     'show_steamspy_info': true,
//     'show_early_access': true,
//     'show_alternative_linux_icon': false,
//     'show_itad_button': false,
//     'skip_got_steam': false,

//     'hideaboutlinks': false,
//     'installsteam': "show",
//     'openinnewtab': false,
//     'keepssachecked': false,
//     'showemptywishlist': true,
//     'showusernotes': true,
//     'showwishliststats': true,
//     'user_notes': {},
//     'replaceaccountname': true,
//     'showfakeccwarning': true,
//     'showlanguagewarning': true,
//     'showlanguagewarninglanguage': "english",
//     'homepage_tab_selection': "remember",
//     'homepage_tab_last': null,
//     'send_age_info': true,
//     'mp4video': false,
//     'horizontalscrolling': true,
//     'showsupportinfo': true,
//     'showdrm': true,
//     'regional_hideworld': false,
//     'showinvnav': true,
//     'quickinv': true,
//     'quickinv_diff': -0.01,
//     'community_default_tab': "",
//     'showallachievements': false,
//     'showallstats': true,
//     'showachinstore': true,
//     'showcomparelinks': false,
//     'hideactivelistings': false,
//     'showlowestmarketprice': true,
//     'hidespamcomments': false,
//     'spamcommentregex': "[\\u2500-\\u25FF]",
//     'wlbuttoncommunityapp': true,
//     'removeguideslanguagefilter': false,
//     'disablelinkfilter': false,
//     'showallfriendsthatown': false,
//     'sortfriendsby': "default",
//     'sortreviewsby': "default",
//     'sortgroupsby': "default",
//     'show1clickgoo': true,
//     'show_profile_link_images': "gray",
//     'profile_steamrepcn': true,
//     'profile_steamgifts': true,
//     'profile_steamtrades': true,
//     'profile_bartervg': true,
//     'profile_steamrep': true,
//     'profile_steamdbcalc': true,
//     'profile_astats': true,
//     'profile_backpacktf': true,
//     'profile_astatsnl': true,
//     'profile_steamid': true,
//     'profile_custom_link': [
//         { 'enabled': true, 'name': "Google", 'url': "google.com/search?q=[ID]", 'icon': "www.google.com/images/branding/product/ico/googleg_lodp.ico", },
//     ],
//     'group_steamgifts': true,
//     'steamcardexchange': true,
//     'purchase_dates': true,
//     'show_badge_progress': true,
//     'show_coupon': true,
//     'show_wishlist_link': true,
//     'show_wishlist_count': true,
//     'show_progressbar': true,
//     'show_backtotop': false,

//     'profile_showcase_twitch': true,
//     'profile_showcase_own_twitch': false,
//     'profile_showcase_twitch_profileonly': false,

//     'itad_import_library': false,
//     'itad_import_wishlist': false,
//     'add_to_waitlist': false,

//     'context_steam_store': false,
//     'context_steam_market': false,
//     'context_itad': false,
//     'context_bartervg': false,
//     'context_steamdb': false,
//     'context_steamdb_instant': false,
//     'context_steam_keys': false,
// };


// class ExtensionResources {
//     static getURL(pathname) {
//         return browser.runtime.getURL(pathname);
//     }

//     static get(pathname) {
//         return fetch(ExtensionResources.getURL(pathname));
//     }

//     static getJSON(pathname) {
//         return ExtensionResources.get(pathname).then(r => r.json());
//     }
//     static getText(pathname) {
//         return ExtensionResources.get(pathname).then(r => r.text());
//     }
// }

// /**
//  * DOMPurify setup
//  * @see https://github.com/cure53/DOMPurify
//  */
// (async function() {
//     let allowOpenInNewTab = SyncedStorage.defaults.openinnewtab;
//     try {
//         await SyncedStorage;
//         allowOpenInNewTab = SyncedStorage.get("openinnewtab");
//     } catch(e) {
//         console.error(e);
//     }

//     /**
//      * NOTE FOR ADDON REVIEWER:
//      * We are modifying default DOMPurify settings to allow other protocols in URLs
//      * and to allow links to safely open in new tabs.
//      *
//      * We took the original Regex and aded chrome-extension://, moz-extension:// and steam://
//      * First two are needed for linking local resources from extension,
//      * steam:// protocol is used by Steam store to open their own client (e.g. when you want to launch a game).
//      * 
//      * The addition of the `target` attribute to the allowed attributes is done in order to be able to open links in a new tab.
//      * We only allow target="_blank" while adding rel="noreferrer noopener" to prevent child window to access window.opener
//      * as described in https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
//      */

//     let purifyConfig = {
//         ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|chrome-extension|moz-extension|steam):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
//     };

//     if (allowOpenInNewTab) {
//         purifyConfig.ADD_ATTR = ["target"];

//         DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
//             if (data.attrName === "target") {
//                 if (data.attrValue === "_blank") {
//                     node.setAttribute("rel", "noreferrer noopener");
//                 } else {
//                     data.keepAttr = false;
//                 }
//             }
//         });
//     }

//     DOMPurify.setConfig(purifyConfig);
// })();


// class Language {
//     static getCurrentSteamLanguage() {
//         if (this._currentSteamLanguage != null) {
//             return this._currentSteamLanguage;
//         }

//         let nodes = document.querySelectorAll("script[src]");
//         let re = /(?:\?|&(?:amp;)?)l=([^&]+)/;
//         for (let n of nodes) {
//             let src = n.getAttribute("src");
//             let match = src.match(re);
//             if (match) {
//                 this._currentSteamLanguage = match[1];
//                 return this._currentSteamLanguage;
//             }
//         }

//         // In a Content Context, we can check for a cookie
//         if (typeof CookieStorage != 'undefined') {
//             this._currentSteamLanguage = CookieStorage.get("Steam_Language") || null;
//         }

//         return this._currentSteamLanguage;
//     }

//     static getLanguageCode(language) {
//         let code = Language.languages[language];
//         return code ? code : "en";
//     }

//     static isCurrentLanguageOneOf(array) {
//         return array.includes(Language.getCurrentSteamLanguage());
//     }
// }
// Language._currentSteamLanguage = null;
// Language.languages = {
//     "english": "en",
//     "bulgarian": "bg",
//     "czech": "cs",
//     "danish": "da",
//     "dutch": "nl",
//     "finnish": "fi",
//     "french": "fr",
//     "greek": "el",
//     "german": "de",
//     "hungarian": "hu",
//     "italian": "it",
//     "japanese": "ja",
//     "koreana": "ko",
//     "norwegian": "no",
//     "polish": "pl",
//     "portuguese": "pt-PT",
//     "brazilian": "pt-BR",
//     "russian": "ru",
//     "romanian": "ro",
//     "schinese": "zh-CN",
//     "spanish": "es-ES",
//     "latam": "es-419",
//     "swedish": "sv-SE",
//     "tchinese": "zh-TW",
//     "thai": "th",
//     "turkish": "tr",
//     "ukrainian": "ua",
//     "vietnamese": "vi",
// };

  
// class Localization {
//     static loadLocalization(code) {
//         return ExtensionResources.getJSON(`/localization/${code}/strings.json`);
//     }

//     static init() {
//         if (Localization._promise) { return Localization._promise; }

//         let currentSteamLanguage = Language.getCurrentSteamLanguage();
//         let storedSteamLanguage = SyncedStorage.get("language");
//         if (currentSteamLanguage === null) {
//             currentSteamLanguage = storedSteamLanguage;
//         } else {
//             if (currentSteamLanguage !== storedSteamLanguage) {
//                 storedSteamLanguage = currentSteamLanguage;
//                 SyncedStorage.set("language", currentSteamLanguage);
//                 Background.action("clearpurchases");
//             }
//         }

//         function deepAssign(target, source) {
//             // Object.assign() but deep-assigning objects recursively
//             for (let [key, val] of Object.entries(source)) {
//                 if (target[key] === undefined) {
//                     console.warn("The key %s doesn't exist in the English localization file", key);
//                     continue;
//                 }
//                 if (typeof val === "object") {
//                     deepAssign(target[key], val);
//                 } else if (val !== "") {
//                     target[key] = val;
//                 }
//             }
//             return target;
//         }

//         let local = Language.getLanguageCode(currentSteamLanguage);
//         let codes = ["en",];
//         if (local !== null && local !== "en") {
//             codes.push(local);
//         }
//         Localization._promise = Promise.all(
//             codes.map(lc => Localization.loadLocalization(lc))
//         ).then(function([english, local]) {
//             Localization.str = english;
//             if (local) {
//                 deepAssign(Localization.str, local);
//             }
//             return Localization.str;
//         });
//         return Localization._promise;
//     }

//     static then(onDone, onCatch) {
//         return Localization.init().then(onDone, onCatch);
//     }

//     static getString(key) {
//         // Source: http://stackoverflow.com/a/24221895
//         let path = key.split('.').reverse();
//         let current = Localization.str;

//         while (path.length) {
//             if (typeof current !== 'object') {
//                 return undefined;
//             } else {
//                 current = current[path.pop()];
//             }
//         }
//         return current;
//     }
// }
// Localization._promise = null;

// Localization.init();

