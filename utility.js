/**
 * utility.js
 * @file 存储实用程序 [存储脚本相关的一些函数] [也作为临时的代码功能测试区]
 */

function _addIDtoHandleLostfocus(){ //添加ID来处理丢失的焦点
		var parentObj = document.getElementById("steamTextStyle").parentNode;
		Obj = parentObj.getElementsByTagName('input');
		for (let i = 0; i < Obj.length; i++) {
			Obj[i].id = "steamTextStyle_1";
		}
		Obj = parentObj.getElementsByTagName('dl');
		for (let i = 0; i < Obj.length; i++) {
			Obj[i].id = "steamTextStyle_1";
		}
		Obj = parentObj.getElementsByTagName('dd');
		for (let i = 0; i < Obj.length; i++) {
			Obj[i].id = "steamTextStyle_1";
		}
}

function registeMenu(){ //注册脚本快捷菜单
	if(g_uiConf.isShow_menu_friend){
		g_arrMenuID[0] = GM_registerMenuCommand("好友列表", function(){
			window.open("https://steamcommunity.com/my/friends", "_blank");
		});
	}
	if(g_uiConf.isShow_menu_activity){
		g_arrMenuID[1] = GM_registerMenuCommand("动态列表", function(){
			window.open("https://steamcommunity.com/my/home", "_blank");
		});
	}
	if(g_uiConf.isShow_menu_registerKey){
		g_arrMenuID[2] = GM_registerMenuCommand("激活key", function(){
			window.open("https://store.steampowered.com/account/registerkey", "_blank");
		});
	}
	if(g_uiConf.isShow_menu_redeemWalletCode){
		g_arrMenuID[3] = GM_registerMenuCommand("充值key", function(){
			window.open("https://store.steampowered.com/account/redeemwalletcode", "_blank");
		});
	}
	if(g_uiConf.isShow_menu_steamdbFree){
		g_arrMenuID[4] = GM_registerMenuCommand("SteamDB预告", function(){
			window.open("https://steamdb.info/upcoming/free/", "_blank");
		});
	}
}

function unRegisteMenu(){ //取消注册脚本快捷菜单
	GM_unregisterMenuCommand(g_arrMenuID[0]);
	GM_unregisterMenuCommand(g_arrMenuID[1]);
	GM_unregisterMenuCommand(g_arrMenuID[2]);
	GM_unregisterMenuCommand(g_arrMenuID[3]);
	GM_unregisterMenuCommand(g_arrMenuID[4]);
}


function registeNotification(){ //注册事件完成通知
	var options = {
		text: "文本.",
		title: "标题!",
		image: "https://steamcommunity-a.akamaihd.net/public/shared/images/responsive/share_steam_logo.png",
		ondone: function() {
			console.log("完成.");
		},
		onclick: function() {
			console.log("点击.");
		}
	}
	GM_notification(options);
}

function setPageRefreshAndCloseWarn(mode){ //设置页面刷新和关闭警告
	var func_PageRefreshAndCloseWarn = function(event){
		event.returnValue = '当前脚本正在运行中，您确定要离开吗?';
	};
	
	if (mode) {
		window.addEventListener("beforeunload", func_PageRefreshAndCloseWarn, true);
	} else{
		window.removeEventListener("beforeunload", func_PageRefreshAndCloseWarn, true)
	}
}
//setPageRefreshAndCloseWarn(true); //设置页面刷新和关闭警告
//setPageRefreshAndCloseWarn(false); //取消设置页面刷新和关闭警告

function autoSetPageRefreshAndCloseWarn(mode){ //自动判断状态并设置页面刷新和关闭警告
	var func_autoPageRefreshAndCloseWarn = function(event){
		if(g_conf[0].YunStatus == true){
			if(g_conf[0].isAddYunBreakWarn == true){
				event.returnValue = '当前脚本正在运行中，您确定要离开吗?';
			}
		}
	};
	
	if (mode) {
		window.addEventListener("beforeunload", func_autoPageRefreshAndCloseWarn, true);
	} else{
		window.removeEventListener("beforeunload", func_autoPageRefreshAndCloseWarn, true)
	}
}
//autoSetPageRefreshAndCloseWarn(true); //自动判断状态并设置页面刷新和关闭警告
//autoSetPageRefreshAndCloseWarn(false); //取消自动判断状态并设置页面刷新和关闭警告
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
function setBackgroundImg(imgFilePath,type){ //设置背景图片
	if(jQuery("#backgroundIMG")[0] == undefined)
			jQuery("body").prepend('<div id="backgroundIMG">背景图</div>');
	
	if(type == "img"){
			var css = "background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('"+ imgFilePath +"') no-repeat fixed;background-size: cover; width: 100%;";
			//var css = "background: rgba(0,0,0,0) url('"+ imgFilePath +"') no-repeat fixed;background-size: cover; width: 100%;";
			var other_css = "position: absolute; z-index: -1; height:100%;";
			var opacity_css = "opacity:1;filter: alpha(opacity=100)";
			jQuery("#backgroundIMG")[0].style = css + other_css + opacity_css;
			
			document.body.style.background = "none"; //去除原背景
			
			jQuery(".friends_header_bg")[0].style.background = "none"; //去除 上面那层蓝色背景图片
			jQuery("#global_header")[0].style.background = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))"; //设置 最上面设置黑色区域透明度
			jQuery(".content")[0].style.background = "none"; //去除 最上面黑色区域
			
			var obj = jQuery(".profile_friends.title_bar")[0];
			if(obj != undefined)
				obj.style.background = "linear-gradient(rgba(1, 94, 128, 0.6), rgba(1, 94, 128, 0.6))"; //设置 管理好友列表那块的透明度
	}else if(type == "bin"){
		jQuery("#backgroundIMG").attr("src", "data:" + imageType + ";base64," + data);
	}
}

function setBackgroundImgCarousel(arr_img,timeInterval){ //设置背景图片轮播(图片路径,时间间隔)
	//URL()存的图片网络地址 修改背景图  就改这个地址 必须要网络地址噢噢噢(注意这里没有[img][/img]) 壁纸 可以在这找  https://www.enterdesk.com/zhuomianbizhi/dongmankatong/dongmanrenwu/
	
	var x = 0;        //记录当前第几张轮播图
	setBackgroundImg(arr_img[x++],"img");
	setInterval(()=>{
		if (x >= arr_img.length) x = 0;
		setBackgroundImg(arr_img[x++],"img");
	}, timeInterval);
}

async function getNetImgBysourceID(sourceID){
	var data,obj,imgFilePath;
	if(sourceID==0){
		data = await gc_exApis.getDataByApiList(1,0,"json");
		if(data.indexOf('{')!=0){
			console.log("服务器返回了错误的数据，尝试重新请求: "+ data);
			return getNetImgBysourceID(sourceID);
		}
		obj = JSON.parse(data); //JSON处理并解析到js对象
		if(obj.code == 200){
			imgFilePath = obj.imgurl;
		}
	}
	else if(sourceID==1){
		data = await gc_exApis.getDataByApiList(2,0,"json");
		if(data.indexOf('{')!=0){
			console.log("服务器返回了错误的数据，尝试重新请求: "+ data);
			return getNetImgBysourceID(sourceID);
		}
		obj = JSON.parse(data); //JSON处理并解析到js对象
		if(obj.code == 200){
			imgFilePath = obj.imgurl;
		}
	}
	return imgFilePath;
}

async function binImgDatatoBase64(res){ //二进制图片数据转base64编码后直接显示
	var arr = res.responseHeaders.split('\r\n');
	var arr1 = [];
	for (let i = 0; i < arr.length; i++) {
		var str1 = arr[i].slice(0,arr[i].indexOf(':'));
		var str2 = arr[i].slice(arr[i].indexOf(':') +1);
		arr1.push([str1,str2]);
	}
	
	var getResponseHeader = (name)=>{
		for (let i = 0; i < arr1.length; i++) {
			if(arr1[i][0] == name){
				return arr1[i][1];
			}
		}
	};
	
	var imageType = getResponseHeader("content-type");
	var blob = new Blob([res.response], { type: imageType });
	var reader = new FileReader();
	var imgBase64 = reader.readAsDataURL(blob);
	reader.addEventListener("load", function () {
		console.log(reader.result);
		setBackgroundImg(reader.result,"img");
	}, false);
	var imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
	
	
	//setBackgroundImg(imageUrl,"img");
	
	// var uInt8Array = new Uint8Array(res.response);
	// var i = uInt8Array.length;
	// var binaryString = new Array(i);
	// while (i--) {
	//     binaryString[i] = String.fromCharCode(uInt8Array[i]);
	// }
	// var data = binaryString.join('');
	// debugger
	// var imageType = res.getResponseHeader("Content-Type");
	
	//setBackgroundImg(imgFilePath,"bin");
}

async function binImgDatatoBlob(){ //二进制图片数据转Blob对象
	
}


async function autoGetImgAndSetBackgroundImg(sourceID,mode,timeInterval,maxImgNumber){ //来源id, 模式:true轮播,false不轮播, 时间间隔(不轮播就无效), 最大图片轮播数量(不轮播就无效)
	var arr_img = [];
	var imgFilePath;
	
	if(mode == true){
		imgFilePath = await getNetImgBysourceID(sourceID);
		arr_img[0] = imgFilePath;
		
		if(maxImgNumber > 0){
			setTimeout(async()=>{
				for (let i = 0; i < maxImgNumbers; i++) {
					imgFilePath = await getNetImgBysourceID(sourceID);
					arr_img.push(imgFilePath)
				}
			}, 0);
			setBackgroundImgCarousel(arr_img,timeInterval);
		}else{
			setBackgroundImg(imgFilePath,"img");
			setInterval(async()=>{
					imgFilePath = await getNetImgBysourceID(sourceID);
					setBackgroundImg(imgFilePath,"img");
			}, timeInterval);
		}
	}else if(mode == false){
		imgFilePath = await getNetImgBysourceID(sourceID);
		//var jsData = await getResourceByURL(imgFilePath,false);
		//binImgDatatoBase64(jsData);
		setBackgroundImg(imgFilePath,"img");
	}
	//gc_exApis.getDataByApiList(0);
	//gc_exApis.getDataByApiList(1,0,"json");
	//gc_exApis.getDataByApiList(1,0);
	//gc_exApis.getDataByApiList(2,0,"json");
	//gc_exApis.getDataByApiList(2,0);
	//gc_exApis.getDataByApiList(2,1,"二维码文本");
	//gc_exApis.getDataByApiList(3,0,"","Miku");
	//gc_exApis.getDataByApiList(3,1,"","Miku");
	//gc_exApis.getDataByApiList(3,2,"","Miku");
	//gc_exApis.getDataByApiList(3,3,"","Miku");
	//gc_exApis.getDataByApiList(4,0);
	//gc_exApis.getDataByApiList(4,1,1);
	//gc_exApis.getDataByApiList(4,2,"Miku");
	//gc_exApis.getDataByApiList(4,3);
	//gc_exApis.getDataByApiList(4,4);
}

//-------------------------------------------------------------------------------------------------------------
//导入和导出配置文件(包括脚本配置和UI配置)，导入: 选择您的导入类型(全覆盖/仅覆盖脚本配置/仅覆盖UI配置/仅导入UI配置)

function downFile(type,data,fileName) {
	var elementA = document.createElement('a');
	
	if(type == "json") //json对象
		elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(data));
	else if(type == "text") //文本
		elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
	else if(type == "bin") //二进制数据
		elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
	else{
		alert("不支持的数据类型!!");
		elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
	}
	//if(fileName == undefined) fileName = new Date();
	elementA.setAttribute('download', + new Date() + ".data");
	elementA.style.display = 'none';
	document.body.appendChild(elementA);
	elementA.click();
	document.body.removeChild(elementA);
}
//downFile("json",g_conf,"SteamAssistant");

//设置透明 https://www.52pojie.cn/thread-763424-1-1.html
//background: rgba(229, 241, 240,0);
//background: transparent;
//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

