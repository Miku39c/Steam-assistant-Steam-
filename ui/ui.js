/**
 * ui.js
 * @file ui类 [用于创建、设置、销毁各个模块相对的ui]
 */

//UI处理逻辑:
//您的好友			普通UI	        添加将选择的玩家添加到指定分组的选项
//添加好友					不处理
//待处理邀请			精简版普通UI-1	添加将选择的玩家添加到指定分组的选项
//已屏蔽				精简版普通UI-2
//近期共同游戏的玩家	精简版普通UI-3	添加将选择的玩家添加到指定分组的选项
//直播版主				版主UI
//关注的玩家			精简版普通UI-0	添加将选择的玩家添加到指定分组的选项
//关注的游戏...				不处理，因为会覆盖当前页面
//您的组				组留言UI-1			添加将选择的组添加到指定分组的选项
//待处理邀请			组留言UI-2			添加将选择的组添加到指定分组的选项
//查找组...					不处理，因为会覆盖当前页面
//创建组...					不处理，因为会覆盖当前页面

/**
 * UI类，此类需要根据需要进行重写来实现
 * @class
 * @classdesc UI类
 * @abstract 必须在继承的子类中实现
 */
class UI {
	constructor(arg) {
		this.loadProgress = 0; //加载进度
		this.isDomLoaded = false; //dom是否加载完毕
		registeMenu(); //注册脚本快捷菜单
		//registeNotification(); //注册事件完成通知
	}
	
	showLoadUI(){ //
		
		addNewStyle('styles_loading',load_cssCode);
		
		var obj = document.getElementsByClassName("v6 game_bg responsive_page")[0]; //body
		var objElement = document.createElement('div');
		objElement.id="loadingUI" //<div id="loadingUI">\ //</div>
		objElement.style = loadUI_css;
		objElement.innerHTML = loadUI_Html;
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
	
	async initUI(type) { //type: true: 第一次加载, false: 再加载
		
		(async()=>{
			await autoGetImgAndSetBackgroundImg(0,false,5000,0); //加载背景图片
		})();
		
		jQuery(".icon_item.icon_all_friends")[0].style.color ="#66ccff"; //您的好友
		jQuery(".icon_item.icon_blocked_friends")[0].style.color ="#66ccff"; //已屏蔽
		jQuery(".icon_item.icon_all_friends")[1].style.color ="#66ccff"; //直播版主
		jQuery(".icon_item.icon_all_following")[0].style.color ="#66ccff"; //关注的玩家
		jQuery(".icon_item.icon_all_groups")[0].style.color ="#66ccff"; //您的组	
		
	}
	async createUI() {
		//好友数据统计里的置顶和是否锁定的模板
		jQuery("#manage_friends").after(mainUI_template);
	}
	
	async reCreateUI(){
		if(await gc_menu_friends_ui.initUI(false) != false){
			await gc_menu_friends_ui.createUI();
		}
	}
	f
	async private_saveUIConfFile() {
	
	}
	async private_readUIConfFile() {
	
	}
}


var isReCreateUi = ()=>{ //是否重新创建Ui(url正则表达式,回调函数)
				var url = window.location.origin + window.location.pathname; //window.location.href //去除参数和锚点后的url
				var _fn = ()=>{
					_ySelects(jQuery);
					g_conf[0].YunStatus = false; /*当前运行状态(比如正在留言中之类的就是正在运行)*/
					g_conf[0].isTranslationText = false; /*是否进行了翻译*/
					g_conf[0].isWarnInfo = false; /*是否出现警告信息(如果没有则不需要清空)*/
					g_conf[0].isCommentRunStatus = false; /*是否正在留言*/
					g_conf[0].isNationalityRunStatus = false; /*是否正在设置国籍*/
					g_conf[0].isNoCommentRunStatus = false; /*是否正在设置不留言*/
					g_conf[0].isTimeIntervalRunStatus = false; /*是否正在设置留言时间间隔*/
					g_conf[0].isAutoCommentRunStatus = false; /*是否正在设置自动留言计划*/
					g_conf[0].isFriendToGroupRunStatus = false; /*是否正在设置好友分组*/
				};
				//https://steamcommunity.com/id/miku-39/friends?l=english#state_online => https://steamcommunity.com/id/miku-39/friends
				if(g_friendUrlRegExp.test(url)){
					_fn();
					console.log("重新构建UI-您的好友.");
					gc_menu_friends_ui && typeof gc_menu_friends_ui.reCreateUI === 'function' && gc_menu_friends_ui.reCreateUI(); //调用回调
				}
				
				else if(g_otherUrlRegExp1_1.test(url)){
					_fn();
					console.log("不处理-添加好友.");
					//不处理
					return;
				}
				else if(g_otherUrlRegExp1_2.test(url)){
					_fn();
					console.log("不处理-好友待处理邀请.");
					//暂时 不处理
					return;
				}
				else if(g_otherUrlRegExp1_3.test(url)){
					_fn();
					console.log("重新构建UI-已屏蔽.");
					gc_menu_shielding_ui && typeof gc_menu_shielding_ui.reCreateUI === 'function' && gc_menu_shielding_ui.reCreateUI(); //调用回调
					return;
				}
				else if(g_otherUrlRegExp1_4.test(url)){
					_fn();
					console.log("不处理-近期共同游戏的玩家.");
					//暂时 不处理
					return;
				}
				else if(g_otherUrlRegExp1_5.test(url)){
					_fn();
					console.log("重新构建UI-直播版主.");
					gc_menu_liveAdmin_ui && typeof gc_menu_liveAdmin_ui.reCreateUI === 'function' && gc_menu_liveAdmin_ui.reCreateUI(); //调用回调
					return;
				}
				
				else if(g_otherUrlRegExp2_1.test(url)){
					_fn();
					console.log("重新构建UI-关注的玩家.");
					gc_menu_following_Players_ui && typeof gc_menu_following_Players_ui.reCreateUI === 'function' && gc_menu_following_Players_ui.reCreateUI(); //调用回调
					return;
				}
				else if(g_otherUrlRegExp2_2.test(url)){
					//_fn();
					//console.log("重新构建UI-您的组.");
					window.location.reload(false); //重新加载当前页面
					//gc_menu_groups_ui && typeof gc_menu_groups_ui.reCreateUI === 'function' && gc_menu_groups_ui.reCreateUI(); //调用回调
					return;
				}
				else if(g_otherUrlRegExp2_3.test(url)){
					_fn();
					console.log("不处理UI-组待处理邀请!");
					//window.location.reload(false); //重新加载当前页面
					//暂时 不处理
					return;
				}
				
				// else if(g_otherUrlRegExp3.test(url)){
				// 	console.log("重新构建UI-您的好友.");
				// 	gc_menu_friends_ui && typeof gc_menu_friends_ui.reCreateUI === 'function' && gc_menu_friends_ui.reCreateUI(); //调用回调
				// }
			};

