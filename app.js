/**
 * app.js
 * @file 主程序类
 */

class App{
	constructor(arg) {
		if(gc_res == null) gc_res = new resource();
		if(gc_menu_friends_ui == null) gc_menu_friends_ui = new menu_friends_ui();            //您的好友
		if(gc_menu_friends_invite_ui == null) gc_menu_friends_invite_ui = new menu_friends_invite_ui();     //待处理邀请
		if(gc_menu_shielding_ui == null) gc_menu_shielding_ui = new menu_shielding_ui();          //已屏蔽
		if(gc_menu_gameFriend_ui == null) gc_menu_gameFriend_ui = new menu_gameFriend_ui();         //近期共同游戏的玩家
		if(gc_menu_liveAdmin_ui == null) gc_menu_liveAdmin_ui = new menu_liveAdmin_ui();          //直播版主
		if(gc_menu_following_Players_ui == null) gc_menu_following_Players_ui = new menu_following_Players_ui();  //关注的玩家
		if(gc_menu_groups_ui == null) gc_menu_groups_ui = new menu_groups_ui();             //您的组
		if(gc_menu_groups_invite_ui == null) gc_menu_groups_invite_ui = new menu_groups_invite_ui();      //待处理邀请
		if(gc_exApis == null) gc_exApis = new externalApis();
		
		// if(!gc_steamdb)
		// {
		// 	gc_steamdb = new SteamDB();
		// 	gc_steamdb.getFreeGameInfo();
		// }
		
		// if(!gc_ai)
		// {
		// 	gc_ai = new intelligenceAI();
		// 	gc_ai.getWeather('北京');
		// }
		
		return (async () => {
			await this._runtimeInit(); //运行环境初始化
			return this; // Return the newly-created instance
		}).call(this);
	}
	
	async _runtimeInit(){ //运行环境初始化
		await gc_res.init(true);
	}
	
	_lazyInit(){ //延迟初始化
		var customUrl = "";
		var profileID = getBaseInfo(0);
		if(gc_friAct == null) gc_friAct = new friendActivity(profileID || customUrl);
	}
	
	/* 初始化应用程序
	*/
	async init(type){
		//0.读取错误信息数据库，检查是否需要进行恢复
		
		//1.读取存储数据库
		
		//2.准备基本运行环境
		
		var url = window.location.origin + window.location.pathname; //window.location.href //去除参数和锚点后的url
		//https://steamcommunity.com/id/miku-39/friends?l=english#state_online => https://steamcommunity.com/id/miku-39/friends
		if(g_friendUrlRegExp.test(url)){
			console.log("重新构建UI-您的好友.");
			if(gc_menu_friends_ui && typeof gc_menu_friends_ui.initUI === 'function')
				return await gc_menu_friends_ui.initUI(true); //调用回调s
		}
		
		else if(g_otherUrlRegExp1_1.test(url)){
			console.log("不处理-添加好友.");
			//不处理
			return false;
		}
		else if(g_otherUrlRegExp1_2.test(url)){
			console.log("不处理-好友待处理邀请.");
			//暂时 不处理
			return false;
		}
		else if(g_otherUrlRegExp1_3.test(url)){
			console.log("重新构建UI-已屏蔽.");
			if(gc_menu_shielding_ui && typeof gc_menu_shielding_ui.initUI === 'function')
				return await gc_menu_shielding_ui.initUI(true); //调用回调
		}
		else if(g_otherUrlRegExp1_4.test(url)){
			console.log("不处理-近期共同游戏的玩家.");
			//暂时 不处理
			return false;
		}
		else if(g_otherUrlRegExp1_5.test(url)){
			console.log("重新构建UI-直播版主.");
			if(gc_menu_liveAdmin_ui && typeof gc_menu_liveAdmin_ui.initUI === 'function')
				return await gc_menu_liveAdmin_ui.initUI(true); //调用回调
		}
		
		else if(g_otherUrlRegExp2_1.test(url)){
			console.log("重新构建UI-关注的玩家.");
			if(gc_menu_following_Players_ui && typeof gc_menu_following_Players_ui.initUI === 'function')
				return await gc_menu_following_Players_ui.initUI(true); //调用回调
		}
		else if(g_otherUrlRegExp2_2.test(url)){
			console.log("重新构建UI-您的组.");
			//window.location.reload(false); //重新加载当前页面
			if(gc_menu_groups_ui && typeof gc_menu_groups_ui.initUI === 'function')
				return await gc_menu_groups_ui.initUI(true); //调用回调
		}
		else if(g_otherUrlRegExp2_3.test(url)){
			console.log("不处理UI-组待处理邀请!");
			//window.location.reload(false); //重新加载当前页面
			//暂时 不处理
			return false;
		}
		
		// else if(g_otherUrlRegExp3.test(url)){
		// 	console.log("重新构建UI-您的好友.");
		// if(gc_menu_friends_ui && typeof gc_menu_friends_ui.initUI === 'function')
		// 	return await gc_menu_friends_ui.initUI(true); //调用回调s
		// }
		
		
	}
	/* 运行应用程序
	//方式: 内置, 悬浮窗口 => "internal", "window"
	//语言: 重新设置要加载的语言 ==> 参考 g_languageList 对象
	*/
	async run(){
		//0.前置准备
		
		//1.创建应用程序UI
		
		//2.注册应用程序事件
		// (async()=>{
		// 	console.log("异步加载绘制资源..");
		// 	await gc_res._loadDrawResources();//异步加载绘制资源
		// })();
		
		var url = window.location.origin + window.location.pathname; //window.location.href //去除参数和锚点后的url
		//https://steamcommunity.com/id/miku-39/friends?l=english#state_online => https://steamcommunity.com/id/miku-39/friends
		if(g_friendUrlRegExp.test(url)){
			console.log("重新构建UI-您的好友.");
			if(gc_menu_friends_ui && typeof gc_menu_friends_ui.initUI === 'function')
				return await gc_menu_friends_ui.createUI(); //调用回调
		}
		
		else if(g_otherUrlRegExp1_1.test(url)){
			console.log("不处理-添加好友.");
			//不处理
			return false;
		}
		else if(g_otherUrlRegExp1_2.test(url)){
			console.log("不处理-好友待处理邀请.");
			//暂时 不处理
			return false;
		}
		else if(g_otherUrlRegExp1_3.test(url)){
			console.log("重新构建UI-已屏蔽.");
			if(gc_menu_shielding_ui && typeof gc_menu_shielding_ui.initUI === 'function')
				return await gc_menu_shielding_ui.createUI(); //调用回调
		}
		else if(g_otherUrlRegExp1_4.test(url)){
			console.log("不处理-近期共同游戏的玩家.");
			//暂时 不处理
			return false;
		}
		else if(g_otherUrlRegExp1_5.test(url)){
			console.log("重新构建UI-直播版主.");
			if(gc_menu_liveAdmin_ui && typeof gc_menu_liveAdmin_ui.initUI === 'function')
				return await gc_menu_liveAdmin_ui.createUI(); //调用回调
		}
		
		else if(g_otherUrlRegExp2_1.test(url)){
			console.log("重新构建UI-关注的玩家.");
			if(gc_menu_following_Players_ui && typeof gc_menu_following_Players_ui.initUI === 'function')
				return await gc_menu_following_Players_ui.createUI(); //调用回调
		}
		else if(g_otherUrlRegExp2_2.test(url)){
			console.log("重新构建UI-您的组.");
			//window.location.reload(false); //重新加载当前页面
			if(gc_menu_groups_ui && typeof gc_menu_groups_ui.initUI === 'function')
				return await gc_menu_groups_ui.createUI(); //调用回调
		}
		else if(g_otherUrlRegExp2_3.test(url)){
			console.log("不处理UI-组待处理邀请!");
			//window.location.reload(false); //重新加载当前页面
			//暂时 不处理
			return false;
		}
		
		// else if(g_otherUrlRegExp3.test(url)){
		// 	console.log("重新构建UI-您的好友.");
		// 	gc_menu_friends_ui && typeof gc_menu_friends_ui.initUI === 'function' && return await gc_menu_friends_ui.createUI(); //调用回调s
		// }
	}
	/* 停止应用程序运行
	//级别: 注销当前事件和UI 停止脚本运行, +还原改动, +释放资源  => "stop", "reModify", "releReSource"
	//方式: 内置, 悬浮窗口 => "internal", "window" 
	*/
	stop(rank){
		//
	}
	/* 重新运行应用程序
	//级别: 从缓存重新加载, 从服务器重新加载, 只重新加载,不运行脚本 => "reLoadCache", "reLoadServer", "onlyLoad"
	//方式: 内置, 悬浮窗口 => "internal", "window" 
	*/
	async reRun(rank){
		
	}
	/* 设置显示模式
	//模式: 显示, 隐藏 => "show", "hide"
	//方式: 内置, 悬浮窗口 => "internal", "window" 
	*/
	setShowMode(showMode = "show", showType = "internal"){
		
	}
	/* 设置窗口参数
	//位置: Position: x, y => css单位
	//大小: Size: width, height => css单位
	//背景透明度: 百分比 => 0~1
	//是否描绘边框: bool => true, false
	//是否显示标题栏: bool => true, false
	*/
	reSetWindow(posX, posY, width, height, alpha = 1, isShowBorder = true, isShowTitleBar = true){
		
	}
}

