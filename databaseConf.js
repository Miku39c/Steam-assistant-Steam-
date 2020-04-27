//保存了全局配置信息的对象，支持多用户，第0个默认为当前的用户配置信息(运行时读取到第0个，非长期存储)，从第1个开始是存储的用户长期配置信息表
var g_conf = [
	{steamID: ""
	,language: "automatic" //语言: 自动检测
	,delay: 4 // 设置你的留言时间间隔,单位秒
	,strNoOperate: "(不留言)" //设置你的不留言的标识符: 如果不需要留言,则需在备注中添加这个不留言的标识符
	,strRemarkPlaceholder: "{name}" //设置你的称呼占位符: 同上
	,autoLogin: 1 //没有登录时是否自动跳转到登录页面 //点击确定跳转，点击关闭不跳转
	,isShowQuickNavigationBar: false //是否显示快速导航栏
	}
]// g_conf[0].

//默认配置信息对象
const g_default_configuration = {
	steamID: ""
	,language: "automatic" //语言: 自动检测
	,delay: 4 // 设置你的留言时间间隔,单位秒
	,strNoOperate: "(不留言)" //设置你的不留言的标识符: 如果不需要留言,则需在备注中添加这个不留言的标识符
	,strRemarkPlaceholder: "{name}" //设置你的称呼占位符: 同上
	,autoLogin: 1 //没有登录时是否自动跳转到登录页面 //点击确定跳转，点击关闭不跳转
	,isShowQuickNavigationBar: false //是否显示快速导航栏
}

//多语言支持-调试信息
const g_debug_info = [
	{
		language: "简体中文"
	},
	{
		language: "English"
	}
]

//多语言支持-UI
const g_languageList = [
	{language: "简体中文"
	,mainName: "Steam小助手"
	,Tabs1: "留言"
	,commentThread_textarea_Placeholder: "添加留言"
	,strInBytes: "当前字符字节数: "
	,translationModule: "翻译模块(需要提前设置国籍):"
	// ,: "当前语言"
	// ,: "自动检测"
	// ,: "中文简体"
	// ,: "英语"
	// ,: "日语"
	// ,: "目标语言:"
	// ,: "请先选择要翻译为的语言"
	// ,: "英语"
	// ,: "日语"
	// ,: "中文简体"
	// ,: "马新简体[zh-sg]"
	// ,: "繁體中文[zh-hant]"
	// ,: "繁體中文(香港)[zh-hk]"
	// ,: "繁體中文(澳门)[zh-mo]"
	// ,: "繁體中文(台湾)[zh-tw]"
	// ,: "翻译"
	// ,: "添加称呼模块(需要提前设置备注):"
	// ,: "自定义称呼模式 (默认为{name}, 可以自行修改, 好友没有备注则使用steam名称)"
	// ,: "在留言框添加自定义称呼标识符"
	// ,: "是否为好友添加称呼 (如果好友没有备注则使用steam名称)"
	// ,: "是否为好友添加称呼 (如果好友设置有备注则使用,否则不添加称呼)"
	// ,: "格式化帮助"
	// ,: "发送评论给选择的好友"
	// ,: "根据国籍发送评论给选择的好友"
	
	,Tabs2: "留言设置"
	// ,: "设置国籍:"
	// ,: "请选择要设置的国籍:"
	// ,: "简体中文"
	// ,: "英语"
	// ,: "日语"
	// ,: "马新简体(马来西亚,新加坡)[zh-sg]"
	// ,: "繁體中文[zh-hant]"
	// ,: "繁體中文(香港)[zh-hk]"
	// ,: "繁體中文(澳门)[zh-mo]"
	// ,: "繁體中文(台湾)[zh-tw]"
	// ,: "为选择的好友设置国籍标识"
	// ,: "为选择的好友取消国籍标识"
	// ,: "设置不留言:"
	// ,: "为选择的好友设置不留言"
	// ,: "为选择的好友取消设置不留言"
	// ,: "设置留言时间间隔:"
	// ,: "只选择日期则过n天后再留言，只选择时间则过x时后再留言(严格模式)，日期和时间都选择了则过n天x时后再留言(严格模式)"
	// ,: "这里其实是一个时间差，比如指定的好友3天留言一次，今天是4月10日，你就选择4月13日就行了，这样做方便一点"
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	,Tabs3: "数据分析"
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	
	,Tabs4: "动态助手"
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	
	,Tabs5: "拓展功能(测试)"
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	
	,Tabs6: "设置",
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	// ,: ""
	
	},
	{language: "English"
	,mainName: "Steam assistant"
	}
]

function fixConfInfo(i,steamID){ //修复配置信息
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

function newUserGuide(steamID){ //新用户引导
	//新手引导
	//console.log("欢迎使用Steam小助手. 当前版本: 更新时间:");
	//显示简短的教程界面
	//console.log("是否进入教程?");
	//console.log("文字教程: 链接到指南 视频教程: 链接");
	//对配置文件进行初始化，将默认设置作为当前用户的配置信息存储到第一格
	var length = g_conf.push(g_default_configuration); //添加默认配置信息作为新配置信息
	g_conf[length-1].steamID = steamID; //设置当前用户的steamID，作为当前用户的配置信息
}

function readUserConfInfoToCurrConfInfo(i){ //读取用户配置信息到当前配置信息处[0]
	g_conf[0].autoLogin = g_conf[i].autoLogin;
	g_conf[0].delay = g_conf[i].delay;
	g_conf[0].strNoOperate = g_conf[i].strNoOperate;
	g_conf[0].strRemarkPlaceholder = g_conf[i].strRemarkPlaceholder;
	g_conf[0].steamID = g_conf[i].steamID;
}

function readConfInfo(steamID){ //读取已保存的对应配置信息
	
	if(g_conf.length == 1){ //说明没有格外的配置信息
		newUserGuide(steamID);
	}
	else
	{
		for (let i = 1; i < g_conf.length; i++) { //遍历所有的配置信息
			if(g_conf[i].steamID == steamID){
				readUserConfInfoToCurrConfInfo(i); //读取用户配置信息到当前配置信息处[0]
				return true;
			}
		}
		//如果没有查找到，则新建用户引导
		newUserGuide(steamID);
		return true;
	}
}

function saveConfInfo(steamID){ //保存最新的配置信息
	if(fixConfInfo(0,steamID)){ //尝试 修复配置信息
		console.log("尝试保存的配置信息无效，已经恢复至默认值. 请检查...");
	}
	//从0号中读取出来，存储到对应的位置
	
}

function initConfInfo(i,steamID){ //配置信息初始化(恢复默认)
	g_conf[i].autoLogin = g_default_configuration.autoLogin;
	g_conf[i].delay = g_default_configuration.delay;
	g_conf[i].strNoOperate = g_default_configuration.strNoOperate;
	g_conf[i].strRemarkPlaceholder = g_default_configuration.strRemarkPlaceholder;
	g_conf[i].steamID = g_default_configuration.steamID;
}

function exportConfInfo(steamID){ //导出配置信息(到文件)
	if(fixConfInfo(0,steamID)){ //尝试 修复配置信息
		console.log("尝试导出的配置信息无效，已经恢复至默认值. 请检查...");
	}
	//从0号中读取出来，导出到文件
	
}

function importConfInfo(steamID){ //导入配置信息(选择文件并读取)
	//从文件中读取配置信息，导入到0号配置
	
	if(fixConfInfo(0,steamID)){ //尝试 修复配置信息
		console.log("尝试导入的配置信息无效，已经恢复至默认值. 请检查...");
	}
	
	//保存配置文件
}