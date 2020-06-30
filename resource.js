/**
 * resource.js
 * @file 资源类，负责获取重要的网络资源 [依赖网络和CDN的可用性]
 * @file 此类也用于构建程序基本运行环境(获取必要的库文件)
 */
 
class resource {
	constructor(arg) {
		
	}
	async init(type){
		if(type) //第一次加载才需要加载资源
			await this._loadResource(type);  //加载资源
	}
	
	async _loadResource(type){ //加载资源
		//提前加载资源，等待所有资源加载完毕后直接运行，以最大程序缩减脚本初始化等待的时间
		if(type) //第一次加载才需要加载基础资源
			await this._loadBaseResources(); //加载基础资源
	}
	
	async _loadBaseResources(){ //加载基础资源
		let arr = [];
		var arrjsData = new Array(5);
		
		arr.push(new Promise(async function (resolve, reject){
			if(document.readyState == "loading"){
				document.addEventListener("DOMContentLoaded", function(event) {
					//console.log("DOM fully loaded and parsed");
					// if(gc_menu_friends_ui.loadProgress < 9) //资源是否已经加载完毕(已缓存)，如果加载完成则不需要显示加载UI
					// {
					// 	gc_menu_friends_ui.showLoadUI();
					// 	gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
					// 	gc_menu_friends_ui.isDomLoaded = true;
					// }
					resolve('DOM fully loaded') // 数据处理完成
					// reject('失败') // 数据处理出错
				});
			}
			else{ //document.readyState == "interactive" || document.readyState == "complete"
				resolve('DOM advance loaded(possible)') // 数据处理完成
			}
		}));
		
		debugger
		
		var resList = getResConfByID("BaseResources"); //通过资源id获取对应的资源列表, 返回资源列表数组 resInfo
		for (let i = 0; i < resList.length; i++) { //遍历所有的资源
			var resChildList = resList[i].res;
			for (let j = 0; j < resChildList.length; j++) { //遍历每个资源的res
				
				if(resChildList[j].isFight == true){
					
				}
				else{
					switch (resChildList[j].resMode){
						case _RESMODE.res_Tampermonkey:
							arr.push(new Promise(async function (resolve, reject){
								var resData = GM_getResourceText(resChildList[j].sourceInfo[0]);
								if(_RESTYPE.res_css == resChildList[j].resType){
									if(resChildList[j].onSucceed != null && typeof(resChildList[j].onSucceed) === 'function')
										resData = resChildList[j].onSucceed(resData);
									addNewStyle(resList[i].resName, resData);
								}
								else if(_RESTYPE.res_js == resChildList[j].resType){
									if(resChildList[j].onSucceed != null && typeof(resChildList[j].onSucceed) === 'function')
										resData = resChildList[j].onSucceed(resData);
									addNewScript(resList[i].resName, resData);
								}
							
								resolve(resList[i].resName) // 数据处理完成
								// reject('失败') // 数据处理出错
							}));
							break;
						case _RESMODE.res_CDN:
							arr.push(new Promise(async function (resolve, reject){
								let URLs =  resChildList[j].sourceInfo;
								var resData;
								for (let i = 0; i < URLs.length; i++) {
									//loadjscssFile("https://www.layuicdn.com/layui-v2.5.6/layui.all.js","js");
									resData = await getResourceByURL(URLs[i],true); //
								}
								//console.log("数据获取成果",resData);
								if(_RESTYPE.res_css == resChildList[j].resType){
									if(resChildList[j].onSucceed != null && typeof(resChildList[j].onSucceed) === 'function')
										resData = resChildList[j].onSucceed(resData);
									addNewStyle(resList[i].resName, resData);
								}
								else if(_RESTYPE.res_js == resChildList[j].resType){
									if(resChildList[j].onSucceed != null && typeof(resChildList[j].onSucceed) === 'function')
										resData = resChildList[j].onSucceed(resData);
									addNewScript(resList[i].resName, resData);
								}
								
								resolve(resList[i].resName) // 数据处理完成
								// reject('失败') // 数据处理出错
							}));
							break;
						case _RESMODE.res_LocalVariables:
							arr.push(new Promise(async function (resolve, reject){
								if(_RESTYPE.res_css == resChildList[j].resType){
									if(resChildList[j].onSucceed != null && typeof(resChildList[j].onSucceed) === 'function')
										eval(resChildList[j].sourceInfo[0]) = resChildList[j].onSucceed( eval(resChildList[j].sourceInfo[0]) );
									addNewStyle(resList[i].resName, eval(resChildList[j].sourceInfo[0]));
								}
								else if(_RESTYPE.res_js == resChildList[j].resType){
									if(resChildList[j].onSucceed != null && typeof(resChildList[j].onSucceed) === 'function')
										eval(resChildList[j].sourceInfo[0]) = resChildList[j].onSucceed( eval(resChildList[j].sourceInfo[0]) );
									addNewScript(resList[i].resName, eval(resChildList[j].sourceInfo[0]));
								}
								resolve(resList[i].resName) // 数据处理完成
								// reject('失败') // 数据处理出错
							}));
							break;
						default:
							
							break;
					}
				}
			}
		}
		
		
		// arr.push(new Promise(async function (resolve, reject){
		// 	// //var cssData = await getResourceByURL("https://www.layuicdn.com/layui-v2.5.6/css/layui.css",true);
		// 	// //addNewStyle('layui_style',cssData);
		// 	// loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/layui.css",null, "css");
		// 	let css = GM_getResourceText('css_layui');
		// 	addNewStyle('css_layui',css);
		// 	resolve('css_layui') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	// loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9", "layuicss-laydate", "css");
		// 	let css = GM_getResourceText('css_laydate');
		// 	addNewStyle('css_laydate',css);
		// 	resolve('css_laydate') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	// loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/layer.css?v=3.1.1", "layuicss-layer", "css");
		// 	let css = GM_getResourceText('css_layer');
		// 	addNewStyle('css_layer',css);
		// 	resolve('css_layer') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	// loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/code.css", "layuicss-skincodecss", "css");
		// 	let css = GM_getResourceText('css_layui_Modules');
		// 	addNewStyle('css_layui_Modules',css);
		// 	resolve('css_layui_Modules') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	// //font-awesome
		// 	// loadjscssFile("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css", "css");
		// 	let css = GM_getResourceText('css_fontAwesome');
		// 	addNewStyle('css_fontAwesome',css);
		// 	resolve('css_fontAwesome') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
			
		//0.基本环境-加载css
		arr.push(new Promise(function (resolve, reject){
		
			addNewStyle('styles_js1',
				"/*layui.css*/\
				@font-face {\
				font-family: layui-icon;\
				src: url(https://www.layuicdn.com/layui-v2.5.6/font/iconfont.eot?v=256);\
				src: url(https://www.layuicdn.com/layui-v2.5.6/font/iconfont.eot?v=256#iefix) format('embedded-opentype'),url(https://www.layuicdn.com/layui-v2.5.6/font/iconfont.woff2?v=256) format('woff2'),url(https://www.layuicdn.com/layui-v2.5.6/font/iconfont.woff?v=256) format('woff'),url(https://www.layuicdn.com/layui-v2.5.6/font/iconfont.ttf?v=256) format('truetype'),url(https://www.layuicdn.com/layui-v2.5.6/font/iconfont.svg?v=256#layui-icon) format('svg')\
				}\
				/*layer.css?v=3.1.1*/\
				.layui-layer-load {\
					background: url(https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/loading-1.gif) center center no-repeat #eee\
				}\
				\
				.layui-layer-ico {\
					background: url(https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/icon.png) no-repeat\
				}\
				\
				.layui-layer-loading .layui-layer-content {\
					width: 60px;\
					height: 24px;\
					background: url(https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/loading-0.gif) no-repeat\
				}\
				\
				.layui-layer-loading .layui-layer-loading1 {\
					width: 37px;\
					height: 37px;\
					background: url(https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/loading-1.gif) no-repeat\
				}\
				\
				.layui-layer-ico16,.layui-layer-loading .layui-layer-loading2 {\
					width: 32px;\
					height: 32px;\
					background: url(https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/loading-2.gif) no-repeat\
				}\
				\
				.layui-layer-iconext {\
					background: url(https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/icon-ext.png) no-repeat\
				}\
				/*font-awesome.min.css*/\
				@font-face{\
					font-family:'FontAwesome';src:url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0');src:url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'),url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'),url('https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');font-weight:normal;font-style:normal\
				}\
				"
			); /* 覆盖layui的css字体加载路径，改为在线资源路径而不是相对路径 */
		
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
			//gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
			resolve('css') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		
		// //1.基本环境-加载js到页面上，方便调试
		// arr.push(new Promise(async function (resolve, reject){
		// 	let js = GM_getResourceText('JS_highstock')
		// 	addNewScript('JS_highstock',js);
		// 	resolve('JS_highstock') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	let js = GM_getResourceText('JS_highstock_exporting')
		// 	addNewScript('JS_highstock_exporting',js);
		// 	resolve('JS_highstock_exporting') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	let js = GM_getResourceText('JS_highstock_oldie')
		// 	addNewScript('JS_highstock_oldie',js);
		// 	resolve('JS_highstock_oldie') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	let js = GM_getResourceText('JS_highstock_networkgraph')
		// 	addNewScript('JS_highstock_networkgraph',js);
		// 	resolve('JS_highstock_networkgraph') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	let js = GM_getResourceText('JS_highstock_zh_CN')
		// 	addNewScript('JS_highstock_zh_CN',js);
		// 	resolve('JS_highstock_zh_CN') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	let js = GM_getResourceText('JS_layui');
		// 	//对 o.prototype.addcss 打补丁，使其直接return this, 而不是去加载css, css通过脚本欲加载的资源手动添加
		// 	var findStr = 'layui.link(n.dir+"css/"+e,t,o)';
		// 	var index = js.indexOf(findStr); //查找代补丁代码的位置
		// 	var fixJS = js.slice(0,index); //提取 代补丁代码前部分
		// 	fixJS += 'this'; //添加 补丁代码
		// 	fixJS += js.slice(index+findStr.length); //提取 代补丁代码后部分
		// 	addNewScript('JS_layui',fixJS);
		// 	resolve('JS_layui') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	let js = GM_getResourceText('JS_localforage');
		// 	addNewScript('JS_localforage',js);
		// 	resolve('JS_localforage') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		
		// arr.push(new Promise(async function (resolve, reject){
		// 	//loadjscssFile("https://www.layuicdn.com/layui-v2.5.6/layui.all.js","js");
		// 	var jsData = await getResourceByURL("https://www.layuicdn.com/layui-v2.5.6/layui.all.js",true); //
		// 	//console.log("数据获取成果",jsData);
		// 	addNewScript('layui_Script', jsData);
		// 	//console.log("layui_Script success.");
		// 	gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
		// 	resolve('layui') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	//loadjscssFile("https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js","js");
		// 	var jsData = await getResourceByURL("https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js",true);
		// 	//console.log("数据获取成果",jsData);
		// 	addNewScript('localforage_Script', jsData);
		// 	//console.log("localforage_Script success.");
		// 	gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
		// 	resolve('localforage') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	//loadjscssFile("https://code.highcharts.com.cn/highstock/highstock.js","js");
		// 	var jsData = await getResourceByURL("https://code.highcharts.com.cn/highstock/highstock.js",true);
		// 	//console.log("数据获取成果",jsData);
		// 	addNewScript('highstock_Script', jsData);
		// 	//console.log("highstock_Script success.");
		// 	gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
		// 	resolve('highstock') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	//loadjscssFile("https://code.highcharts.com.cn/highcharts/modules/exporting.js","js");
		// 	arrjsData[1] = await getResourceByURL("https://code.highcharts.com.cn/highcharts/modules/exporting.js",true);
		// 	//console.log("数据获取成果",jsData);
		// 	resolve('highcharts exporting') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	//loadjscssFile("https://code.highcharts.com.cn/highcharts/modules/oldie.js","js");
		// 	arrjsData[2] = await getResourceByURL("https://code.highcharts.com.cn/highcharts/modules/oldie.js",true);
		// 	//console.log("数据获取成果",jsData);
		// 	resolve('highcharts oldie') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	//loadjscssFile("https://code.highcharts.com.cn/highcharts/modules/networkgraph.js","js");
		// 	arrjsData[3] = await getResourceByURL("https://code.highcharts.com.cn/highcharts/modules/networkgraph.js",true);
		// 	//console.log("数据获取成果",jsData);
		// 	resolve('highcharts networkgraph') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		// arr.push(new Promise(async function (resolve, reject){
		// 	//loadjscssFile("https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js","js");
		// 	arrjsData[4] = await getResourceByURL("https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js",true);
		// 	//console.log("数据获取成果",jsData);
		// 	resolve('highcharts zh_CN') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		
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
			addNewStyle('styles1_js',fs_css); /* 选择的文本 */
			
			injectJS();
			
			//gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
			resolve('css js') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		
		// arr.push(new Promise(async function (resolve, reject){
		// 	addNewStyle('css_jquery_localizationTool',jquery_localizationTool); /* 选择的文本 */
			
		// 	let js = GM_getResourceText('Jquery_localizationtool');
		// 	addNewScript('js_jquery_localizationTool',js);
			
		// 	//gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
		// 	resolve('jquery localizationTool') // 数据处理完成
		// 	// reject('失败') // 数据处理出错
		// }));
		
		let res = await Promise.all(arr);
		
		// addNewScript('highcharts_exporting_Script', arrjsData[1]);
		// //console.log("highcharts_exporting_Script success.");
		// gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
		
		// addNewScript('highcharts_oldie_Script', arrjsData[2]);
		// //console.log("highcharts_oldie_Script success.");
		// gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
		
		// addNewScript('highcharts_networkgraph_Script', arrjsData[3]);
		// //console.log("highcharts_networkgraph_Script success.");
		// gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
		
		// addNewScript('highcharts_zh_CN_Script', arrjsData[4]);
		// //console.log("highcharts_zh_CN_Script success.");
		// gc_menu_friends_ui.loadTextChange(true); //改变当前加载进度
		
		// if(!gc_menu_friends_ui.remoreLoadUI()){//移除加载UI
		// 	console.log("remoreLoadUI() 失败!");
		// }
		console.log("ret:",res);
	}
	
	async _loadDrawResources(){ //加载绘制资源
		let arr = [];
		var arrjsData = new Array(5);
			
		arr.push(new Promise(async function (resolve, reject){
			let js = GM_getResourceText('JS_draw');
			addNewScript('JS_draw',js);
			resolve('JS_draw') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			let js = GM_getResourceText('JS_animate');
			addNewScript('JS_animate',js);
			resolve('JS_animate') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			let js = GM_getResourceText('JS_sound');
			addNewScript('JS_sound',js);
			resolve('JS_sound') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			let js = GM_getResourceText('JS_render');
			addNewScript('JS_render',js);
			resolve('JS_render') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		arr.push(new Promise(async function (resolve, reject){
			let js = GM_getResourceText('JS_multithreading');
			addNewScript('JS_multithreading',js);
			resolve('JS_multithreading') // 数据处理完成
			// reject('失败') // 数据处理出错
		}));
		
		let res = await Promise.all(arr);
		
		console.log("ret:",res);
	}
}

