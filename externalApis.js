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

