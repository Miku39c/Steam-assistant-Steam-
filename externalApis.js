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

class SteamData
{
	getProfilesInfo()
	{
		
	}
	
	
}