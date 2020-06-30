//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * UI类 - 已屏蔽 模块 UI具体实现
 * @class
 * @classdesc UI类 - 已屏蔽 模块 UI具体实现
 * @extends UI
 */
class menu_shielding_ui extends UI {
	constructor(arg) {
		super();
	}
	
	async initUI(type) { //type: true: 第一次加载, false: 再加载
	
		super.initUI();
	
		// 设置数据库
		// var db = new DB();
		// db.Test();
		// db.initAndCreateNewDBInstance({
		// 	driver: [localforage.WEBSQL,
		// 			localforage.INDEXEDDB,
		// 			localforage.LOCALSTORAGE],
		// 	name: 'Steam assistant-Conf',
		// 	size: 10485760 //10mb
		// });
		
		g_db = new DB({ //设置
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Conf',
			size: 10485760 //10mb
		},true);
		
		g_db1 = new DB({ //拓展功能
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Expand',
			size: 10485760 //10mb
		},false);
		
		g_db2 = new DB({ //动态助手
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Activity',
			size: 1073741824 //1gb
		},false);
		
		g_db3 = new DB({ //数据分析
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Friend',
			size: 1073741824 //1gb
		},false);
		
		g_db4 = new DB({ //留言设置
			driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
			name: 'Steam assistant-Comment',
			size: 104857600 //100mb
		},false);
		
		await g_db.Write('g_conf',g_conf); //写入
		await g_db.Write('g_uiConf',g_uiConf); //写入
		//debugger
		//var data = await g_db.getAllKeyName();
		//console.log("data",data);
		//var data = await g_db.getKeyNameByIndex(1);
		//console.log("data",data);
		//var data = await g_db.getLength();
		//console.log("data",data);
		
		var data = await g_db.Read('g_conf'); //读取
		console.log("data",data);
		var data = await g_db.Read('g_uiConf'); //读取
		console.log("data",data);
		//var data = await g_db.ReadAll(); //读取所有数据
		//console.log("data",data);
		//await g_db.Remove('g_conf'); //删除数据
		//var data = await g_db.ReadAll(); //读取所有数据
		//console.log("data",data);
		//await g_db.RemoveAll(); //删除所有数据
		//var data = await g_db.ReadAll(); //读取所有数据
		//console.log("data",data);
		//if(data.length == 0){
		//	console.log("没有数据!");
		//}
		
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
		
		if(type){ //第一次加载才需要监听这些事件
			
			//1.监听url中的hash变化  //window.location.hash='state_online'  =>  https://steamcommunity.com/id/miku-39/friends#state_online //页面不刷新,url改变,定位到指定锚点
			window.addEventListener('hashchange',function(event){
				console.log("1.监听url中的hash变化" + event);
				isReCreateUi(); //是否重新创建Ui
			});
			//2.监听通过history来改变url的事件 //浏览器前进，后退等
			window.addEventListener('popstate', function(event) {
				console.log("2.监听通过history来改变url的事件" + event);
				isReCreateUi(); //是否重新创建Ui
			});
			//3.监听pushState和replaceState行为 //pushState可以监听到本页替换超链接
			var _wr = function(type) {
				var orig = history[type];
				return function() {
					var rv = orig.apply(this, arguments);
					var e = new Event(type);
					e.arguments = arguments;
					window.dispatchEvent(e);
					return rv;
				};
			};
			history.pushState = _wr('pushState');
			history.replaceState = _wr('replaceState');
			
			window.addEventListener('replaceState', function(e) {
				console.log('监听到replaceState!');
				isReCreateUi(); //是否重新创建Ui
			});
			window.addEventListener('pushState', function(e) {
				console.log('监听到pushState!');
				var url = window.location.origin + window.location.pathname; //window.location.href //去除参数和锚点后的url 
				//https://steamcommunity.com/id/miku-39/friends?l=english#state_online => https://steamcommunity.com/id/miku-39/friends
				isReCreateUi(); //是否重新创建Ui
			});
		}
		
	}
	async createUI() {
		super.createUI();
		
		//正常html代码
		jQuery("#manage_friends").after(mainUI_html);
		
		if(g_uiConf.isShowQuickNavigationBar){ //是否显示快速导航栏
			//快捷导航栏
			jQuery(".responsive_page_template_content").after(ExpandUI_QuickNavigationBar_html);
		}
		UI.prototype.uiHandler(); //UI与UI事件等相关的处理程序
	}
	
	async reCreateUI(){
		if(await gc_menu_shielding_ui.initUI(false) != false){
			await gc_menu_shielding_ui.createUI();
		}
	}
	
	async private_saveUIConfFile() {
	
	}
	async private_readUIConfFile() {
	
	}
}

