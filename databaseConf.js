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

