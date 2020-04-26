function addRemoveFriendRemind(){ /*添加删除好友提醒*/
	let obj = document.getElementsByClassName("manage_action btnv6_lightblue_blue btn_medium");
	for (let i = 0; i < obj.length; i++) {
		let funcText = obj[i].onclick.toString();
		if(funcText.indexOf("ExecFriendAction('remove', 'friends/all')") != -1) //是否是移除好友按钮
		{
			obj[i].onclick = ()=>{
				ShowConfirmDialog('您点击了移除好友按钮', '是否要移除选择的好友?','移除好友').done( function(){
					console.log("移除好友");
					ExecFriendAction('remove', 'friends/all');
					}).fail( function(){
					console.log("取消移除好友");
					});
			}
			return 1;
		}
	}
	return 0;
}

function getLoginStatus(){
	if(g_steamID == false)
		return false; //没有登陆
	else if(typeof g_steamID == "string" && g_steamID.indexOf('7656119')==0)
		return true; //成功登陆
}

//-------------------------------------------------------------------------------------------------------------
// API
function getCityCodeByEnglishName(cityEnglishName) {
	if (g_arrCityList == undefined)
		return null;

	for (let i = 0; i < g_arrCityList.length; i++) {
		if (g_arrCityList[i][1].length == cityEnglishName.length &&
			g_arrCityList[i][1].toLowerCase() == cityEnglishName.toLowerCase()) {
			return g_arrCityList[i][0];
		}
	}
	return null;
}

function getCityCodeByChinsesName(cityChinseshName) {
	if (g_arrCityList == undefined)
		return null;

	for (let i = 0; i < g_arrCityList.length; i++) {
		if (g_arrCityList[i][3].length == cityChinseshName.length &&
			g_arrCityList[i][3].toLowerCase() == cityChinseshName.toLowerCase()) {
			return g_arrCityList[i][0];
		}
	}
	return null;
}

function getCityChinsesNameByEnglishName(cityEnglishName) {
	if (g_arrCityList == undefined)
		return null;

	for (let i = 0; i < g_arrCityList.length; i++) {
		if (g_arrCityList[i][1].length == cityEnglishName.length &&
			g_arrCityList[i][1].toLowerCase() == cityEnglishName.toLowerCase()) {
			return g_arrCityList[i][3];
		}
	}
	return null;
}
//-------------------------------------------------------------------------------------------------------------
//RGB
function countRgbColor(r, g, b) //计算RGB渐变颜色
{
	var color;
	//var color = '#' + to2string(r) +  'ffff';
	//console.log(color);
	//return color;
	while (true) {
		switch (RGBindex) {
			case 0: //红
				if (RGBr == 0 & RGBg == 0 & RGBb == 0) {
					RGBr = 0xFF; //红
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 1;
					continue; //重新开始
				}
				break;
			case 1: //红->黄
				if (RGBg != 0xFF) {
					RGBg += 3; //红->黄
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 2;
					continue; //重新开始
				}
				break;
			case 2: //黄->绿
				if (RGBr != 0x00) //黄
				{
					RGBr -= 3; //黄->绿
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 3;
					continue; //重新开始
				}
				break;
			case 3: //绿->蓝(天蓝)
				if (RGBb != 0xFF) {
					if (RGBg > 0xBF) {
						RGBg -= 3;
					}
					RGBb += 3;
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 4;
					continue; //重新开始
				}
				break;
			case 4: //蓝(天蓝)->蓝(深蓝)
				if (RGBg != 0x00) {
					RGBg -= 3;
					color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
					//console.log("color:" + color);
					return color;
				} else {
					RGBindex = 5;
					continue; //重新开始
				}
				break;
			case 5: //蓝(深蓝)->紫
				if (RGBr < 0x80 || RGBb > 0x80) {
					if (RGBr < 0x80) {
						RGBr += 3;
						color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
						//console.log("color:" + color);
						return color;
					} else if (RGBb > 0x80) {
						RGBb -= 3;
						color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
						//console.log("color:" + color);
						return color;
					}

				} else {
					RGBindex = 6;
					continue; //重新开始
				}
				break;
			case 6: //紫->红
				if (RGBr != 0xFF || RGBb != 0x00) {
					if (RGBr < 0xFF) {
						RGBr += 3;
						color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
						//console.log("color:" + color);
						return color;
					} else if (RGBb > 0x00) {
						RGBb -= 3;
						color = '#' + to2string(RGBr) + to2string(RGBg) + to2string(RGBb);
						//console.log("color:" + color);
						return color;
					}

				} else //继续RGB
				{
					RGBindex = 1;
					continue; //重新开始
				}

				break;
			case 7:
				console.log("end!!!");
				break;
			default:
				console.log("[countRgbColor()-switch(RGBindex):] 未定义异常!")
				break;
		}
	}
	//红 #FF0000
	//黄 #FFFF00
	//绿 #00FF00
	//蓝 #00BFFF #0000FF
	//紫 #800080

}
// function setRgb() //设置RGB渐变颜色
// {
// 	var loginBox = document.getElementById("LoginBaseBox");
// 	loginBox.style.background = countRgbColor(0,0,0);
// }
// var tiSysCallback_runRGB = setInterval(function(){runRGB();}, 22); //[启动定时器] 每秒回调函数 // 11 16 22 30
//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------