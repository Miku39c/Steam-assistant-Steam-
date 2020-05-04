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

