//保存了全局配置信息的对象，支持多用户，第0个默认为当前的用户配置信息(运行时读取到第0个，非长期存储)，从第1个开始是存储的用户长期配置信息表
var g_conf = [
	{autoLogin: 1 //没有登录时是否自动跳转到登录页面 //点击确定跳转，点击关闭不跳转
	,delay: 4 // 设置你的留言时间间隔,单位秒
	,strNoOperate: "(不留言)" //设置你的不留言的标识符: 如果不需要留言,则需在备注中添加这个不留言的标识符
	,strRemarkPlaceholder: "{name}" //设置你的称呼占位符: 同上
	,steamID: ""
	}
]// g_conf[0].

//只读类型的默认配置信息对象
const default_conf = {
	autoLogin: 1
	,delay: 4
	,strNoOperate: "(不留言)"
	,strRemarkPlaceholder: "{name}"
	,steamID: ""
}

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
	var length = g_conf.push(default_conf); //添加默认配置信息作为新配置信息
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
	g_conf[i].autoLogin = default_conf.autoLogin;
	g_conf[i].delay = default_conf.delay;
	g_conf[i].strNoOperate = default_conf.strNoOperate;
	g_conf[i].strRemarkPlaceholder = default_conf.strRemarkPlaceholder;
	g_conf[i].steamID = default_conf.steamID;
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