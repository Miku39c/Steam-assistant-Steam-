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
//var ai = new intelligenceAI();
//ai.getWeather('北京');

class SteamDB
{
	getProfilesInfo()
	{
		
	}
	
	
}

//-------------------------------------------------------------------------------------------------------------
var waitStatus_getGameDiscountsInfoBysteamDB = true; //等待状态
var returnData__getGameDiscountsInfoBysteamDB;
async function getGameDiscountsInfoBysteamDB() //获取游戏折扣信息(SteamDB)
{
	waitStatus_getGameDiscountsInfoBysteamDB = true;
	var baseURL = "https://steamdb.info/upcoming/free/";
	var requestURL = baseURL;

	//console.log("requestURL: ",requestURL);

	GM_xmlhttpRequest({
		method: 'GET',
		url: requestURL,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
			//'Accept': 'application/atom+xml,application/xml,text/xml',
			//"Content-Type": "application/x-www-form-urlencoded",
		},
		onload: function(response) {
			if (response.status === 200) {
				console.log('请求成功!', response.responseText);

				var retData = "";
				// for (var j = 0; j < JSON_jsObj[0].length; j++) {
				// 	if (JSON_jsObj[0][j][0] != null) {
				// 		retData += JSON_jsObj[0][j][0]; //组合每一句翻译
				// 	}
				// }
				// returnData = retData; //存储数据
				//console.log('谷歌翻译:',retData);
				//waitStatus_getGameDiscountsInfoBysteamDB = false; //不等待

			} else {
				console.log('请求失败!');
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('请求错误!', err);
		}
	});

	while (waitStatus_getGameDiscountsInfoBysteamDB) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	return returnData;
}

function initUI(gameInfo){ //初始化UI
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

async function GameFreeInfoHelper(){ //游戏免费信息助手
	let data = "";
	//data = await getGameDiscountsInfoBysteamDB();
	initUI(data); //初始化UI

	console.log("GameFreeInfoHelper success!");
}