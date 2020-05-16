/**
 * steamNetData.js
 * @file 存储利用网络请求来获取steam相关数据的代码 [steam网络数据]
 */

function getBaseInfo(rank){
	var info3 = {
		language: "",
		name: "",
		url: "",
		steamID64: "",
		steamCustomUrl: "",
		accountId: "",
		confInfoObj: null,
		userInfoObj: null
	};
	
	var info2 = {
		language: "",
		name: "",
		url: "",
		steamID64: "",
		steamCustomUrl: "",
		accountId: "",
	};
	
	var info1 = {
		language: "",
		name: "",
		url: "",
		steamID64: "",
		accountId: "",
	};
	
	switch (rank){
		case 0:
		
			if(typeof g_steamID != "undefined" && typeof g_steamID == "string" && g_steamID.test(g_steamId64RegExp))
				return g_steamID;
			else
			{
				var obj = document.getElementById('webui_config');
				if(obj){
					userInfoStr = obj.getAttribute('data-userinfo');
					userInfoObj = JSON.parse(userInfoStr);
					var userInfoObj;
					return userInfoObj.steamid;
				}
			}
			break;
		case 1:
			
			break;
		case 2:
			
			break;
		case 3:
			
			break;
		default:
			break;
	}
	
	// if(g_rgProfileData && typeof g_rgProfileData == "object"){
	// 	info.name = g_rgProfileData.personaname;
	// 	info.url = g_rgProfileData.url;
	// 	info.steamID64 = g_rgProfileData.steamid;
	// }
	// //https://steamcommunity.com/profiles/76561198373290430/edit
	// //<input class="dynInput" type="text" name="customURL" id="customURL" value="miku-39">
	
	// if(g_steamID && typeof g_steamID == "string" && g_steamID.test(g_steamId64RegExp))
	// 	info.steamID64 = g_steamID;
	// else
	// {
	// 	var obj = document.getElementById('webui_config');
	// 	var confInfoStr,userInfoStr;
	// 	var confInfoObj,userInfoObj;
	// 	if(obj){
	// 		confInfoStr = obj.getAttribute('data-config');
	// 		userInfoStr = obj.getAttribute('data-userinfo');
	// 		confInfoObj = JSON.parse(confInfoStr);
	// 		userInfoObj = JSON.parse(userInfoStr);
	// 		info.confInfoObj = confInfoObj;
	// 		info.userInfoObj = userInfoObj;
	// 		info.steamID64 = userInfoObj.steamid
	// 		info.steamCustomUrl = "";
	// 		info.accountId = userInfoObj.accountid;
	// 		info.language = confInfoObj.language;
	// 	}
		
	// }
	
	
}

