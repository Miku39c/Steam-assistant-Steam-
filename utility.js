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

var func_PageRefreshAndCloseWarn = function(event){
	event.returnValue = '当前脚本正在运行中，您确定要离开吗?';
};
function setPageRefreshAndCloseWarn(mode){ //设置页面刷新和关闭警告
	if (mode) {
		window.addEventListener("beforeunload", func_PageRefreshAndCloseWarn, true);
	} else{
		window.removeEventListener("beforeunload", func_PageRefreshAndCloseWarn, true)
	}
}
//setPageRefreshAndCloseWarn(true); //设置页面刷新和关闭警告
//setPageRefreshAndCloseWarn(false); //取消设置页面刷新和关闭警告
//-----------------------------------------------------------------------------------
var func_autoPageRefreshAndCloseWarn = function(event){
	if(g_conf[0].YunStatus == true){
		if(g_conf[0].isAddYunBreakWarn == true){
			event.returnValue = '当前脚本正在运行中，您确定要离开吗?';
		}
	}
};
function autoSetPageRefreshAndCloseWarn(mode){ //自动判断状态并设置页面刷新和关闭警告
	if (mode) {
		window.addEventListener("beforeunload", func_autoPageRefreshAndCloseWarn, true);
	} else{
		window.removeEventListener("beforeunload", func_autoPageRefreshAndCloseWarn, true)
	}
}
//autoSetPageRefreshAndCloseWarn(true); //自动判断状态并设置页面刷新和关闭警告
//autoSetPageRefreshAndCloseWarn(false); //取消自动判断状态并设置页面刷新和关闭警告

function getLoginStatus(){
	if(g_steamID == false)
		return false; //没有登陆
	else if(typeof g_steamID == "string" && g_steamID.indexOf('7656119')==0)
		return true; //成功登陆
}
//-------------------------------------------------------------------------------------------------------------
var key_mode = 0;
var index_arr = [2];
index_arr[0] = undefined;
index_arr[1] = undefined;
function addFriendMultipleSelectionMode(){ //添加好友多选模式
	document.getElementById("search_text_box").blur(); //搜索框取消获得的焦点
	
	jQuery("#search_results .selectable").click(function(e) {
		var id = jQuery(this).attr("id"); //id
		var index = jQuery(this).index(); //下标
		//console.log(id,index);//得到点击的a标签的title值
		
		switch (key_mode){
			case 0:
				index_arr[0] = index-2;
				//console.log(index_arr[0]);
				break;
			case 1: //~ 反选
				break;
			case 2: //alt 重新选择
				break;
			case 3: //shift 好友快速多选模式
				if(index_arr[0] == undefined)
					index_arr[0] = index-2;
				else if(index_arr[0] == index-2){ //同一个元素
					
				}
				else{
					//取消选择文字
					document.selection && document.selection.empty && ( document.selection.empty(), 1)
					|| window.getSelection && window.getSelection().removeAllRanges();
					//遍历并选择之间的内容
					index_arr[1] = index-2;
					var obj = jQuery("#search_results .selectable");
					for (let i = index_arr[0]; i < index_arr[1]; i++) {
						obj[i].getElementsByClassName("select_friend_checkbox")[0].checked = true; //选中
					}
					console.log("好友快速多选已完成!",index_arr[0],index_arr[1]);
					//index_arr[0] = undefined;
					//index_arr[1] = undefined;
				}
				break;
			default:
				break;
		}
	}); //选择的朋友总数
	
	document.addEventListener("keydown", function(e){ //~ 反选
		//console.log(e.keyCode);
		//console.log(e.shiftKey,e.altKey);
		if(e.keyCode == 192){
			key_mode = 1;
			//console.log("~ down");
			
			var obj = jQuery("#search_results .selectable");
			for (let i = 0; i < obj.length; i++) {
				var bool = obj[i].getElementsByClassName("select_friend_checkbox")[0].checked;
				obj[i].getElementsByClassName("select_friend_checkbox")[0].checked = !bool; //全部取消选中
			}
			console.log("~ 反选");
			return false;
		}
	}, false);
	//-----------------------------------------------------------------------------------
	shortcut.add("Esc",function() { //alt 重新选择
		key_mode = 2;
		//console.log("Alt");
		
		var obj = jQuery("#search_results .selectable");
		for (let i = 0; i < obj.length; i++) {
			obj[i].getElementsByClassName("select_friend_checkbox")[0].checked = false; //全部取消选中
		}
		console.log("Esc 重新选择");
	}, {
		'type':'keydown', //事件
		'propagate':false, //是否支持冒泡
		'disable_in_input':false, //是否在输入框内有效
		'target':document, //作用范围
	});
	//-----------------------------------------------------------------------------------
	shortcut.add("Shift",function() { //shift 好友快速多选模式
		key_mode = 3;
		//console.log("Shift");
	}, {
		'type':'keydown', //事件
		'propagate':false, //是否支持冒泡
		'disable_in_input':false, //是否在输入框内有效
		'target':document, //作用范围
	});
	//-----------------------------------------------------------------------------------
	document.addEventListener("keyup", function(e){
		//console.log(e.keyCode);
		//console.log(e.shiftKey,e.altKey);
		if(e.keyCode == 192){
			key_mode = 0;
			//console.log("~ UP");
			return false;
		}
		else if(e.keyCode == 27){
			key_mode = 0;
			//console.log("Esc UP");
			return false;
		}
		else if(e.keyCode == 16){
			key_mode = 0;
			//console.log("Shift UP");
			return false;
		}
	}, false);
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

