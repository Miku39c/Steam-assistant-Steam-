/* 预定义的资源模式 */
const _RESMODE = {
	res_Tampermonkey: "Tampermonkey-Res",
	res_CDN: "CDN-CommonRequest",
	res_LocalVariables: "JS-LocalVariables"
};

/* 预定义的资源类型 */
const _RESTYPE = {
	res_css: "css",
	res_js: "js",
	res_json: "json"
};

/**
 * 通过资源id获取对应的资源列表, 返回资源列表数组 resInfo
 * @param {String} strResID 资源id
 */
function getResConfByID(strResID){
	if(_resConf){
		for (let i = 0; i < _resConf.length; i++) {
			if(_resConf[i].resID == strResID)
				return _resConf[i].resInfo;
		}
		return new Error("[sophie] not find strResID.");
	}
	else{
		throw new Error("[sophie] _resConf is undefined.");
	}
}

function patchJS_layui(resData){
	//对 o.prototype.addcss 打补丁，使其直接return this, 而不是去加载css, css通过脚本欲加载的资源手动添加
	var findStr = 'layui.link(n.dir+"css/"+e,t,o)';
	var index = resData.indexOf(findStr); //查找代补丁代码的位置
	var fixJS = resData.slice(0,index); //提取 代补丁代码前部分
	fixJS += 'this'; //添加 补丁代码
	fixJS += resData.slice(index+findStr.length); //提取 代补丁代码后部分
	return fixJS;
}

/* 不存在绝对的资源加载优先级，代码控制加载先后顺序，采用遍历指定资源id的形式去加载资源，同一资源id下的不同资源加载采用争抢模式 */
/* 也可以手动设置是否需要进行资源加载速度测试，从而从当前最优资源加载途径进行加载 */
const _resConf = [
	{
		resID: "BaseResources", //资源唯一id
		resInfo: [     //资源相关信息
			{
				resName: "css_layui",        //资源名称
				resDescription: "layui库所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_layui"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/css/layui.css",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/css/layui.css",
							"https://cdn.90so.net/layui/2.5.6/css/layui.css",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_laydate",        //资源名称
				resDescription: "layui库(laydate组件)所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_laydate"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9",
							"https://cdn.90so.net/layui/2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_layer",        //资源名称
				resDescription: "layui库(layer组件)所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_layer"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/layer.css?v=3.1.1",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/css/modules/layer/default/layer.css?v=3.1.1",
							"https://cdn.90so.net/layui/2.5.6/css/modules/layer/default/layer.css?v=3.1.1",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_layui_Modules",        //资源名称
				resDescription: "layui库(组件)所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_layui_Modules"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/css/modules/code.css",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/css/modules/code.css",
							"https://cdn.90so.net/layui/2.5.6/css/modules/code.css",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_fontAwesome",        //资源名称
				resDescription: "fontAwesome库所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_fontAwesome"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css",
							"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
							"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highstock/highstock.js",
							"https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.1.0/highstock.min.js",
							"https://cdn.bootcdn.net/ajax/libs/highcharts/8.1.0/highstock.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock_exporting",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock_exporting"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highcharts/modules/exporting.js",
							"https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.1.0/modules/exporting.min.js",
							"https://cdn.bootcdn.net/ajax/libs/highcharts/8.1.0/modules/exporting.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock_oldie",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock_oldie"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highcharts/modules/oldie.js",
							"https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.1.0/modules/oldie.src.min.js",
							"https://cdn.bootcdn.net/ajax/libs/highcharts/8.1.0/modules/oldie.js",
						],
						onSucceed: null ,//如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock_networkgraph",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock_networkgraph"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highcharts/modules/networkgraph.js",
							"https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.1.0/modules/networkgraph.min.js",
							"https://cdn.bootcdn.net/ajax/libs/highcharts/8.1.0/modules/networkgraph.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock_zh_CN",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock_zh_CN"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_layui",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_layui"],
						onSucceed: patchJS_layui //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/layui.all.js",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/layui.all.min.js",
							"https://cdn.90so.net/layui/2.5.6/layui.all.js",
						],
						onSucceed: patchJS_layui //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_localforage",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_localforage"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js",
							"https://cdn.90so.net/localforage/1.7.3/localforage.min.js",
							"https://cdn.bootcdn.net/ajax/libs/localforage/1.7.3/localforage.min.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_jquery_localizationTool",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_LocalVariables,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["jquery_localizationTool_css"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "js_jquery_localizationTool",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["Jquery_localizationtool"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://greasyfork.org/scripts/403927-jquery-localizationtool-js/code/jquerylocalizationTooljs.js?version=808323",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			}
		]
	},
	{
		resID: "ExpandResources", //资源唯一id
		resInfo: [     //资源相关信息
			{
				resName: "",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resType: _RESTYPE.res_Tampermonkey,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resType: _RESTYPE.res_CDN,
						isFight: false,
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resType: _RESTYPE.res_Tampermonkey,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resType: _RESTYPE.res_CDN,
						isFight: false,
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resType: _RESTYPE.res_Tampermonkey,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resType: _RESTYPE.res_CDN,
						isFight: false,
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			}
		]
	}
];

