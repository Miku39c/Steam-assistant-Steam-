//-------------------------------------------------------------------------------------------------------------
function getUserLocation(profileID) //获取用户位置()
{
	var name = document.getElementsByClassName("header_real_name ellipsis")[0].getElementsByTagName("bdi")[0].innerText;
	var str = document.getElementsByClassName("header_real_name ellipsis")[0].innerText;
	var index = str.indexOf(name);
	var strLocation = "";
	var arrLocation = [];
	if( index != -1)
	{
		strLocation = str.slice(index+name.length); //裁剪，获取地址位置字符串
		strLocation = strLocation.replace(/\s+/g,""); //去除所有的空格
		if(strLocation == "")
		{
			return null; //没有获取到数据
		}
		arrLocation = strLocation.split(',');
	}
	console.log("arrLocation",arrLocation);
	for (let i = arrLocation.length-1; i >= 0; i--) {
		console.log(arrLocation[i]);
		return arrLocation;
	}
}
// var ret = getUserLocation();
// if(ret != null)
// {
// 	if(ret>1)
// 	{
// 		getCityChinsesNameByEnglishName(ret[0]);
// 	}
// }

function getUserCommentData(profileID) //获取用户的评论的大数据(用户64位id)
{
	var date = new Date();
	
	jQuery.post("//steamcommunity.com/comment/Profile/post/" + profileID + "/-1/", {
		comment: newMgs,
		count: 6,
		sessionid: g_sessionID
	}, function(response) {
		if (response.success === false) {
			jQuery("#log_body")[0].innerHTML +=
				"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
				"\">" + '[' + (i + 1) + '/' + total + '] 留言失败了! ' + profileID + '  ' + name +
				'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
		} else {
			jQuery("#log_body")[0].innerHTML +=
				'[' + (i + 1) + '/' + total + '] ' +
				"成功发表评论于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
				profileID + '  ' + name + "</a>" +
				"<span> → </span><a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
				profileID + "\">" + newMgs + "</a><br>";
		}
	}).fail(function() {
		jQuery("#log_body")[0].innerHTML +=
			'[' + (i + 1) + '/' + total + '] ' +
			"<span style='color:#DA2626;'>无法发表评论于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
			profileID + "\">" +
			profileID + '  ' + name + "</a></span><br>";
	}).always(function() {
		jQuery("#log_head").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
	});
}

function setSaveUserCommentData(profileID,str) //设置已保存的用户评论数据
{
	
}

function getSaveUserCommentData(profileID) //获取已保存的用户评论数据
{
	
}


// var jqobj;

// function traverseAllFriend() //遍历所有好友
// {
// 	function concurrentPoll() {
// 		this.tasks = []; // 任务队列  
// 		this.max = 100; // 最大并发数  
// 		setTimeout(() => { // 函数主体执行完后立即执行  
// 			this.run()
// 		}, 0);
// 	}
// 	concurrentPoll.prototype.addTask = function(task) { // 原型添加任务方法  
// 		this.tasks.push(task)
// 	}
// 	concurrentPoll.prototype.run = function() { // 原型任务运行方法  
// 		if (this.tasks.length == 0) { // 判断是否还有任务  
// 			return
// 		}
// 		var min = Math.min(this.tasks.length, this.max); // 取任务个数与最大并发数最小值  
// 		for (var i = 0; i < min; i++) {
// 			this.max--; // 执行最大并发递减  
// 			var task = this.tasks.shift(); // 从数组头部取任务  
// 			task().then((res) => { // 重：此时可理解为，当for循环执行完毕后异步请求执行回调,此时max变为0  
// 				console.log(res)
// 			}).catch((err) => {
// 				console.log(err)
// 			}).finally(() => { // 重：当所有请求完成并返回结果后，执行finally回调，此回调将按照for循环依次执行，此时max为0.  
// 				this.max++; // 超过最大并发10以后的任务将按照任务顺序依次执行。此处可理解为递归操作。  
// 				this.run();
// 			})
// 		}
// 	}
// 	var poll = new concurrentPoll(); // 实例
// 	//并发多个相同任务

// 	jqobj = jQuery(".selectable[data-steamid]"); //选择所有好友
// 	//for (let i = 0; i < jqobj.length; i++) {
// 	for (let i = 0; i < 1; i++) {
// 		let cur = jqobj.get(i);
// 		let profileID = cur.getAttribute("data-steamid");
// 		poll.addTask(function() {
// 			return new Promise(
// 				function(resolve, reject) {
// 					// 一段耗时的异步操作
// 					getProfilesInfo(resolve, reject, i, profileID);
// 				})
// 		})
// 	}
// 	console.log("完毕!");

// 	// for (let i=0; i<23; i++) { // 数据模拟  
// 	//   poll.addTask(function () {  
// 	//   return new Promise(  
// 	//   function (resolve, reject) {  
// 	//   // 一段耗时的异步操作
// 	//   getProfilesInfo(resolve, reject,i,"76561198818854009");
// 	//   })})
// 	//   }


// 	// poll.addTask(async function () {  

// 	// 	//let arr = [fun(0),fun(1),fun(2)];
// 	// 	let arr = [];
// 	// 	for (var i=0; i<13; i++) { // 数据模拟
// 	// 		//arr.push(fun(i));
// 	// 		arr.push(new Promise(function (resolve, reject){getProfilesInfo(i,"76561198818854009");}));
// 	// 	}
// 	// 	let res = await Promise.all(arr);
// 	//  return res;
// 	//  // new Promise(
// 	//  //  function (resolve, reject) {  
// 	//  //  // 一段耗时的异步操作
// 	//  //  getProfilesInfo("76561198818854009");
// 	//  //  resolve('成功') // 数据处理完成  
// 	//  //  // reject('失败') // 数据处理出错
// 	//  //  })

// 	//  })

// }

// var waitStatus1 = []; //等待状态
// var returnData1 = []; //返回数据
// async function getgetProfilesID(i, profileID) {
// 	let URL = "https://steamcommunity.com/profiles/" + profileID + "/";

// 	if (waitStatus1.length == 0)
// 		waitStatus1.length = jqobj.length; //设置数组长度

// 	if (returnData1.length == 0)
// 		returnData1.length = jqobj.length; //设置数组长度

// 	//waitStatus1.push([profileID,true]); //开始等待
// 	waitStatus1[i] = [profileID, true]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
// 	//console.log("getgetProfilesID() i:",i,"waitStatus1:",waitStatus1);

// 	jQuery.ajax({
// 		type: "Get", //请求方式
// 		//async: false,
// 		//contentType: "application/json;charset=UTF-8",//请求的媒体类型
// 		url: URL, //请求地址
// 		// headers: {
// 		// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
// 		// 	//'Accept': 'application/atom+xml,application/xml,text/xml',
// 		// 	//"Content-Type": "application/x-www-form-urlencoded",
// 		// },
// 		//data: JSON.stringify(list),				//数据，json字符串
// 		success: function(result) { //请求成功
// 			let Data = result;
// 			//console.log("请求成功了!",Data);
// 			let nIstart = Data.indexOf('StartTradeOffer(');
// 			let nIend = Data.indexOf(');', nIstart);
// 			let AccountID = Data.slice(nIstart + 'StartTradeOffer('.length + 1, nIend - 1);
// 			nIstart = Data.indexOf('"steamid":"');
// 			nIend = Data.indexOf('",', nIstart);
// 			let profileID = Data.slice(nIstart + '"steamid":"'.length, nIend);
// 			console.log("getgetProfilesID() i:", i, "AccountID:", AccountID, "profileID:", profileID);

// 			for (let i = 0; i < waitStatus1.length; i++) {
// 				if (waitStatus1[i][0] == profileID) //是否是同一个用户
// 				{
// 					if (waitStatus1[i][1] == false) //这个用户是否已经获取过了(测试多个相同用户信息的获取)
// 						continue;
// 					waitStatus1[i][1] = false;
// 					//returnData1.push(AccountID); //存储数据
// 					returnData1[i] = AccountID; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
// 					//console.log("getgetProfilesID() 成功存储数据 AccountID:",AccountID);
// 					return;
// 					//console.log("waitStatus1[i][1] break",i,waitStatus1[i][1]);
// 				}
// 			}
// 			console.log("getgetProfilesID 数据错误!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// 			console.log("waitStatus1:", waitStatus1, 'returnData1:', returnData1);
// 			console.log('profileID:', profileID, 'AccountID:', AccountID);
// 			return;
// 			//console.log("DBG!",nIstart,nIend);
// 		},
// 		error: function(e) { //请求失败，包含具体的错误信息
// 			console.log("请求失败了!", e.status);
// 			console.log("请求失败了!", e.responseText);
// 		}
// 	});
// 	//console.log("getgetProfilesID() i:",i,"waitStatus1:",waitStatus1);
// 	while (waitStatus1[i][1]) //强制等待异步函数执行完毕后再执行
// 	{
// 		//console.log("wait...",i,waitStatus1[i][1]);
// 		await sleep(50); //延迟0.1秒
// 	}
// 	//console.log("waitStatus1[i][1]:",waitStatus1[i][1],"returnData1[i]:",returnData1[i]);
// 	return returnData1[i];

// 	// jQuery.get(URL, {
// 	// 	// "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
// 	// 	// // "Content-Type": "application/x-www-form-urlencoded", //非常重要
// 	// 	// "Accept-Encoding": "gzip, deflate, br",
// 	// 	// "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
// 	// 	// "Cache-Control": "max-age=0",
// 	// 	// "Connection": "keep-alive",
// 	// 	// "Cookie": "sessionid=6f84a0f48cddb56ad66394b6; steamCountry=HK%7Cda7daa2682f7a361e594f8dad55fe9df; timezoneOffset=28800,0",
// 	// 	// "Host": "steamcommunity.com",
// 	// 	// "Upgrade-Insecure-Requests": "1",
// 	// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
// 	// }, function(response) {
// 	// 	if (response.status === 200) {
// 	// 		console.log("获取失败!",response.responseText);
// 	// 	} else {
// 	// 		console.log("获取成功!",response.responseText);
// 	// 	}
// 	// }).fail(function() {
// 	// 	console.log("无法获取!");
// 	// }).always(function() {
// 	// 	//console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
// 	// });


// 	// GM_xmlhttpRequest({
// 	// 	method: 'GET',
// 	// 	url: URL,
// 	// 	headers: {
// 	// 		'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
// 	// 		//'Accept': 'application/atom+xml,application/xml,text/xml',
// 	// 		//"Content-Type": "application/x-www-form-urlencoded",
// 	// 	},
// 	// 	onload: function(response) {
// 	// 		if (response.status === 200) {
// 	// 			console.log('请求成功!',response.responseText);
// 	// 			//var JSON_jsObj = JSON_processing_parsing_JsObj(response.responseText);
// 	// 			//遍历[0][0]数组就可以取得翻译后的文本,原始数据,原始数据的拼音
// 	// 			//[2]是检查出的语言
// 	// 			//遍历[5]可以取得两种翻译,原始数据和原始数据的长度
// 	// 			//遍历[8]可以得到原始语言和翻译语言
// 	// 			//for (var i = 0; i < JSON_jsObj.length; i++) {
// 	// 			//	for (var j = 0; j < JSON_jsObj[i].length; j++) {
// 	// 			//		for (var k = 0; k < JSON_jsObj[i][j].length; k++) {
// 	// 			//			
// 	// 			//		}
// 	// 			//	}
// 	// 			//}
// 	// 			//var retData = "";
// 	// 			//for (var j = 0; j < JSON_jsObj[0].length; j++) {
// 	// 			//	if (JSON_jsObj[0][j][0] != null) {
// 	// 			//		retData += JSON_jsObj[0][j][0]; //组合每一句翻译
// 	// 			//	}
// 	// 			//}
// 	// 			returnData = retData; //存储数据
// 	// 			//console.log('谷歌翻译:',retData);
// 	// 			waitStatus = false; //不等待

// 	// 			//console.log(response);
// 	// 			//console.log(response.responseText);
// 	// 			//if(response.responseText.indexOf('[[["') == 0) //是否是指定的数据格式
// 	// 			//{
// 	// 			//	var retData = response.responseText.slice(4,response.responseText.indexOf('","',4)); //提取翻译后的文本
// 	// 			//	returnData = retData; //存储数据
// 	// 			//	//console.log('谷歌翻译:',retData);
// 	// 			//	waitStatus = false; //不等待
// 	// 			//}
// 	// 		} else {
// 	// 			console.log('请求失败!');
// 	// 			//console.log(response);
// 	// 			//console.log(response.responseText);
// 	// 		}
// 	// 	},
// 	// 	onerror: function(err) {
// 	// 		console.log('请求错误!', err);
// 	// 	}
// 	// });
// }

// var waitStatus = []; //等待状态
// var returnData = []; //返回数据
// async function getProfilesInfo(resolve, reject, i, profileID) {
// 	let joinDate, friendDate;
// 	let str;

// 	if (waitStatus.length == 0)
// 		waitStatus.length = jqobj.length; //设置数组长度

// 	if (returnData.length == 0)
// 		returnData.length = jqobj.length; //设置数组长度

// 	jQuery.ajaxSetup({
// 		cache: false
// 	}); //close AJAX cache

// 	////获取一个数组真实长度
// 	//let arrRealLength = undefined;
// 	//for (let i = 0; i < waitStatus.length; i++) {
// 	//	if(waitStatus[i] == undefined)
// 	//	{
// 	//		arrRealLength = i;
// 	//		break;
// 	//	}
// 	//}
// 	//if(arrRealLength == undefined) //是否为数组最大长度
// 	//	arrRealLength = waitStatus.length;


// 	//waitStatus.push([profileID,true]); //开始等待
// 	waitStatus[i] = [profileID, true]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)

// 	await getgetProfilesID(i, profileID); //

// 	let AccountID = returnData1[i];
// 	//console.log("getProfilesInfo(): AccountID:",AccountID,'i:',i,"returnData[i]:",returnData[i]);
// 	//var AccountID = "242752742";//242752742//858588281

// 	let URL = "https://steamcommunity.com/tradeoffer/new/?partner=" + AccountID;

// 	jQuery.ajax({
// 		type: "Get", //请求方式
// 		//async: false,
// 		//contentType: "application/json;charset=UTF-8",//请求的媒体类型
// 		url: URL, //请求地址
// 		// headers: {
// 		// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
// 		// 	//'Accept': 'application/atom+xml,application/xml,text/xml',
// 		// 	//"Content-Type": "application/x-www-form-urlencoded",
// 		// },
// 		//data: JSON.stringify(list),				//数据，json字符串
// 		success: function(result) { //请求成功
// 			let Data = result;
// 			if (Data.indexOf("抱歉，发生了某种错误：") != -1) //不能正常进行交易,获取不到数据就跳过
// 			{
// 				waitStatus[i][1] = false;
// 				returnData[i] = null; //不返回数据
// 				return;
// 			}
// 			//console.log("请求成功了!",Data);
// 			let nIstart = Data.indexOf('trade_partner_member_since trade_partner_info_text');
// 			if (nIstart == -1) {
// 				nIstart = Data.indexOf('trade_partner_header responsive_trade_offersection top');
// 				let nindex = Data.indexOf('trade_partner_info_text">', nIstart);
// 				let nIend = Data.indexOf('</div>', nindex);
// 				friendDate = Data.slice(nindex + 'trade_partner_info_text">'.length, nIend); //加入Steam的日期
// 				friendDate = friendDate.replace(/^\s+|\s+$/g, ""); //去除左右两边的空格
// 				joinDate = "查询不到";
// 				nIstart = Data.lastIndexOf('g_ulTradePartnerSteamID');
// 				nIindex = Data.indexOf('\'', nIstart);
// 				nIend = Data.indexOf('\'', nIindex + 1);
// 				profileID = Data.slice(nIindex + 1, nIend);
// 				//console.log("profileID",profileID);
// 			} else {
// 				let nIindex = Data.indexOf('>', nIstart);
// 				let nIend = Data.indexOf('</div>', nIindex);
// 				joinDate = Data.slice(nIindex + 1, nIend); //加入Steam的日期
// 				//console.log("joinDate",joinDate);
// 				nIstart = Data.indexOf('trade_partner_info_text');
// 				nIindex = Data.indexOf('>', nIstart);
// 				nIend = Data.indexOf('</div>', nIindex);
// 				friendDate = Data.slice(nIindex + 1, nIend - 1); //成为好友的日期
// 				friendDate = friendDate.replace(/^\s+|\s+$/g, ""); //去除左右两边的空格
// 				//console.log("friendDate",friendDate);
// 				nIstart = Data.lastIndexOf('g_ulTradePartnerSteamID');
// 				nIindex = Data.indexOf('\'', nIstart);
// 				nIend = Data.indexOf('\'', nIindex + 1);
// 				profileID = Data.slice(nIindex + 1, nIend);
// 				//console.log("profileID",profileID);
// 			}

// 			for (let i = 0; i < waitStatus.length; i++) {
// 				if (waitStatus[i][0] == profileID) //是否是同一个用户
// 				{
// 					if (waitStatus[i][1] == false) //这个用户是否已经获取过了(测试多个相同用户信息的获取)
// 						continue;
// 					waitStatus[i][1] = false;
// 					//returnData.push([joinDate,friendDate]); //存储数据
// 					returnData[i] = [joinDate, friendDate]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
// 					//console.log("waitStatus[i][1] break",i,waitStatus[i][1]);
// 					return;
// 				}

// 			}
// 			console.log("getProfilesInfo 数据错误!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// 			console.log("waitStatus:", waitStatus, "returnData:", returnData);
// 			console.log("profileID", profileID);
// 			//console.log("Data",Data);
// 			return;
// 			//console.log("DBG!",nIstart,nIend);
// 		},
// 		error: function(e) { //请求失败，包含具体的错误信息
// 			console.log("请求失败了!", e.status);
// 			console.log("请求失败了!", e.responseText);
// 		}
// 	});

// 	while (waitStatus[i][1]) //强制等待异步函数执行完毕后再执行
// 	{
// 		//console.log("wait...",i,waitStatus[i][1]);
// 		await sleep(50); //延迟0.1秒
// 	}
// 	if (returnData[i] == null) //检查数据有效性
// 	{
// 		console.log("str [" + (i + 1) + "] 不能获取到数据,已跳过: https://steamcommunity.com/profiles/" + profileID);
// 		return;
// 	}
// 	console.log("waitStatus[i][1]:", waitStatus[i][1], "waitStatus[i]:", waitStatus[i]);

// 	str = "加入日期: " + returnData[i][0] + " 成为好友日期: " + returnData[i][1];
// 	console.log("str [" + (i + 1) + ']', str);
// 	resolve('成功') // 数据处理完成
// 	// reject('失败') // 数据处理出错
// 	return str;
// }

// // let arr = [];
// // for (var i=0; i<1; i++) { // 数据模拟
// // 	//arr.push(fun(i));
// // 	arr.push(new Promise(function (resolve, reject){getProfilesInfo(1,2,i,"76561198818854009");}));
// // }
// // let res = await Promise.all(arr);

// // var jqobj = jQuery(".selectable[data-steamid]"); //选择所有好友
// // let arr = [];
// // for (var i=0; i<20; i++) { // 数据模拟
// // let cur = jqobj.get(i);
// // let profileID = cur.getAttribute("data-steamid");
// // 	//arr.push(fun(i));
// // 	//getProfilesInfo(1, 2,i,profileID);
// // 	arr.push(new Promise(function (resolve, reject){getProfilesInfo(1, 2,i,profileID);}));
// // }
// // let res = await Promise.all(arr);

//------------------------------------------------------------------------------------------------------------------------------------------
//好友动态自动点赞和评论
//miku-39

class friendActivity{
	constructor(profileID_Url) { /*构造方法(用户id或者自定义链接)*/
		this.steamCommunityUrl = "https://steamcommunity.com/";
		this.customUrl = "id/";
		this.profileIDUrl = "profiles/";
		this.friendActivitUrl = "/home";
		this.friendActivitOptionUrl = "/blotteredit";
		
		this.startElementsId = "blotter_content";
		this.endElementsId = "blotter_throbber";
		this.jsName = "g_BlotterNextLoadURL";
		this.friendActivityElementsBlockId = "blotter_block";
		
		this.isYun = false;
		
		//游戏评测
		this.UserEvaluationUp = "UserReviewVoteUp"; //用户评价 是 的函数名
		this.UserEvaluationDown = "UserReviewVoteDown"; //用户评价 否 的函数名
		this.UserEvaluationHappy = "UserReviewVoteTag"; //用户评价 欢乐 的函数名
		//上传载图、收藏载图
		//指南添加到收藏夹、发表指南
		//创意工坊物品添加到收藏夹、创意工坊合集添加到收藏夹、发布创意工坊物品 (发布创意工坊合集?? 没有找到相关动态)
		//艺术作品添加到收藏夹、发布艺术作品
		//添加视频、收藏视频
		this.captureUp = "VoteUp"; //用户评价 赞 的函数名
		this.captureDown = "VoteDown"; //用户评价 否 的函数名
		this.captureShare = "ShowSharePublishedFilePopup"; //用户操作 分享 的函数名
		//购买游戏或者DLC
		this.bus = "VoteUpCommentThread"; //用户评价 赞 的函数名 "VoteUpCommentThread('UserReceivedNewGame"
		//发布状态或者游戏状态
		this.status = "VoteUpCommentThread"; //用户评价 赞 的函数名 "VoteUpCommentThread('UserStatusPublished"
		
		//组通知(可留言)，其他的比如 安排活动、选择新的周最佳玩家、晋升一名成员为管理员、添加了一条留言 没有看到过
		this.groupNotificationUp = "RateAnnouncement"; //用户评价 赞
		this.groupNotificationDown = "RateAnnouncement"; //用户评价 否
		
		this.g_bRecoredUpvote = false;
		
		//青睐之光物品发布一则通知?、创意工坊物品发布一则通知? 没有看到过
		//商店鉴赏家 推荐一款新的游戏?(进入页面可留言) 但是不能操作
		//制作一件物品时 ghs 强烈推荐 发布艺术作品之类的
		//在某人的截图中? 发布艺术作品之类的，状态等
		//jQuery(".ugc.has_adult_content img, .ugc.has_adult_content div.imgWallItem")
		
		//去除模糊效果，并显示红色边框，进行标记
		//var obj = jQuery(".ugc.has_adult_content img, .ugc.has_adult_content div.imgWallItem");
		//for (let i = 0; i < obj.length; i++) {
		//	obj[i].style.filter = "none";
		//	obj[i].style.border = "2px red solid";
		//	obj[i].parentNode.parentNode.parentNode.parentNode.style.border = "2px red solid";
		//}
		
		if(isIntNum(profileID_Url)){
			this.profileID_Url = profileID_Url.toString(); //用户id
			this.mode = 0;
			this.Url = this.steamCommunityUrl + this.profileIDUrl + this.profileID_Url;
		}
		else{
			this.profileID_Url = profileID_Url; //自定义链接
			this.mode = 1;
			this.Url = this.steamCommunityUrl + this.customUrl + this.profileID_Url;
		}
	}
	async init(profileID_Url){
		
		if(isIntNum(profileID_Url)){
			this.profileID_Url = profileID_Url.toString(); //用户id
			this.mode = 0;
			this.Url = this.steamCommunityUrl + this.profileIDUrl + this.profileID_Url;
		}
		else{
			this.profileID_Url = profileID_Url; //自定义链接
			this.mode = 1;
			this.Url = this.steamCommunityUrl + this.customUrl + this.profileID_Url;
		}
	}
	
	LogUpvote(){
		if ( !this.g_bRecoredUpvote )
		{
			this.g_bRecoredUpvote = true;
			$J.post( 'https://steamcommunity.com/actions/LogFriendActivityUpvote', {sessionID: g_sessionID} );
		}
	}
	
	VoteUp(item_id){ //有些东西点不了赞
			var options = {
				method: 'post',
				postBody: 'id=' + item_id + '&sessionid=' + g_sessionID,
				onComplete: (function(item_id){
					return function(transport)
					{
						var response = JSON.parse(transport.responseText);
						switch (response.success){
							case 1:
							//debugger
							//console.log("VoteUp() 已经点过赞了!",transport.responseText);
								break;
							case 10:
							//debugger
							//console.log("VoteUp() 点赞完成??",transport.responseText);
								break;
							case 15:
							//debugger
							console.log("VoteUp() 点赞错误!!!",transport.responseText);
								break;
							default: //{"success":20} //{"success":16,"items":[2082593203],"results":{"2082593203":16}}
							debugger
							console.log("VoteUp() ????????????????????????????????????????????????????????????",transport.responseText);
								break;
						}
					}
				}(item_id))
			};
			
			new Ajax.Request(
				'https://steamcommunity.com/sharedfiles/voteup',
				options
			);
			this.LogUpvote();
	}
	
	//home页面 InitializeCommentThread
	
	//rgCommentData['pagesize']
	//var CCommentThread = Class.create
	//initialize: function( type, name, rgCommentData, url, nQuoteBoxHeight )
	
	//function InitializeCommentThread( type, name, rgCommentData, url, nQuoteBoxHeight )
	//this.m_cPageSize
	VoteUpCommentThread(commentthreadid){ //这个函数有不确定性
			let iprefix = commentthreadid.indexOf('_');
			var prefixUrl = commentthreadid.slice(0,iprefix);
			let iowner = commentthreadid.indexOf('_',iprefix+1);
			var ownerUrl = commentthreadid.slice(iprefix+1,iowner);
			var featureUrl = commentthreadid.slice(iowner+1);
			
			this.LogUpvote();
			
			var GetActionURL  = function(action){
				var url = "https://steamcommunity.com/comment/" + prefixUrl + "/" + action + "/";
				url += ownerUrl + '/';
				url += featureUrl + '/';
				return url;
			}
			
			var countValue = 3;
			
			switch (prefixUrl){
				case 'UserReceivedNewGame': //购买游戏或者DLC
					countValue = 3;
					break;
				case 'PublishedFile_Public': //没有测试过是否有这个
					debugger
					countValue = 3;
					break;
				case 'UserStatusPublished': //发布状态或者游戏状态
					countValue = 6;
					break;
				default:
					debugger
					console.log("VoteUpCommentThread() ??????????????????????????????????????????????????");
					break;
			}
			
			var params = {
			vote: 1,
			count: countValue,
			sessionid: g_sessionID,
			feature2: -1,
			newestfirstpagination: true,
			};
			
			new Ajax.Request( GetActionURL( 'voteup' ), {
				method: 'post',
				parameters: params,
				onSuccess: ()=>{
					//console.log("VoteUpCommentThread() 点赞成功!",countValue,commentthreadid)
					},
				onFailure:  ()=>{
					console.log("VoteUpCommentThread() 点赞失败! 与网络通信时出错。请稍后再试。",countValue,commentthreadid)
					},
				onComplete: ()=>{
					//console.log("VoteUpCommentThread() 点赞完毕! 用时",countValue,commentthreadid)
					}
			} );
		}
		
		UserReviewVoteUp(id)
		{
			//debugger
			this.UserReview_Rate( id, true, 'https://steamcommunity.com',
				function( rgResults,recommendationID ) {
					//console.log("UserReviewVoteUp() 点赞成功~",rgResults,recommendationID);
				}
			);
		}
		
		UserReview_Rate(recommendationID, bRateUp, baseURL, callback)
		{
			$J.post( baseURL + '/userreviews/rate/' + recommendationID,{
						'rateup' : bRateUp,
						'sessionid' : g_sessionID
			}).done( function( results,recommendationID ) {
				if ( results.success == 1 )
				{
					callback( results );
				}
				else if ( results.success == 21 )
				{
					ShowAlertDialog( '错误', '您必须先登录以执行该操作。' );
				}
				else if ( results.success == 15 )
				{
					ShowAlertDialog( '错误', '您的帐户没有足够的权限执行此操作。' );
				}
				else if ( results.success == 24 )
				{
					ShowAlertDialog( '错误', '您的帐户不符合使用该功能的要求。<a class="whiteLink" href="https://help.steampowered.com/zh-cn/wizard/HelpWithLimitedAccount" target="_blank" rel="noreferrer">访问 Steam 客服</a>了解更多信息。' );
				}
				else
				{
					ShowAlertDialog( '错误', '在尝试处理您的请求的过程中出现了错误：' + results.success );
				}
			} );
		}
		
	RateAnnouncement(strArguments){
		//解析参数并填充
		var rateURL, gid, bVoteUp, clanID;
		strArguments = strArguments.replace(/'/g, ""); //去除字符串中出现的所有单引号
		strArguments = strArguments.replace(/\s+/g,""); //去除字符串所有的空格
		var arr = strArguments.split(','); //划分为参数
		rateURL = arr[0];
		gid = arr[1];
		if(arr[2]=="true")
			bVoteUp = true;
		else bVoteUp = false;
		clanID = parseInt(arr[3]);
		
		rateURL = rateURL + gid;
		$J.post( rateURL, {
				'voteup' : bVoteUp,
				'clanid' : clanID,
				'sessionid' : g_sessionID
			}
		).done( function( json ) {
			//console.log("RateAnnouncement() 点赞成功.",json);
		} )
		.fail( function( jqxhr ) {
			var responseJSON = jqxhr.responseText.evalJSON();
			switch ( responseJSON.success )
			{
				case 21:
					ShowAlertDialog( '错误', '您必须登录才能执行该操作。' );
					break;
				case 24:
					ShowAlertDialog( '错误',
						'您的帐户不符合使用该功能的要求。<a class="whiteLink" href="https://help.steampowered.com/zh-cn/wizard/HelpWithLimitedAccount" target="_blank" rel="noreferrer">访问 Steam 客服</a>了解更多信息。'
					);
					break;
				case 15:
					ShowAlertDialog( '错误', '您没有执行该操作的权限。' );
					break;
				default:
					ShowAlertDialog( '错误', '在处理您的请求时遇到错误：' + responseJSON.success );
					break;
			}
		} );
		return false;
	}
	
	//g_BlotterNextLoadURL
	//StartLoadingBlotter( g_BlotterNextLoadURL );
	async Run(){ //开始点赞
		var documentData;
		var arrData;
		var nextLoadURL;
		
		var url = this.Url + this.friendActivitUrl;
		this.isYun = true;
		console.log("开始点赞...",url);
		var i = 0;
		while(this.isYun)
		{
			i++;
			if(i==1){
				documentData = await getResourceByURL(url,true);
				//console.log("url:",this.Url,"data:",documentData);
				var index = documentData.indexOf(this.startElementsId); //开始区域 blotter_content
				var endindex = documentData.lastIndexOf(this.endElementsId); //结束区域 blotter_throbber
				var Data = documentData.slice(index,endindex);
				var jsindex = documentData.indexOf(this.jsName,endindex);
				var jsendindex = documentData.indexOf(';',jsindex);
				var jsData = documentData.slice(jsindex,jsendindex);
				nextLoadURL = jsData.slice(jsData.indexOf('\'')+1,jsData.lastIndexOf('\''));
				//console.log("Data:",Data,"nextLoadURL:",nextLoadURL);
				arrData = Data.split(this.friendActivityElementsBlockId);
			}
			//else if ( !response ){
			//	// print out any error for now 现在打印出任何错误
			//	console.log("错误:",transport.responseText);
			//	//$('blotter_content').insert( { bottom: transport.responseText } );
			//}
			else
			{
				documentData = await getResourceByURL(url,false); //获取原始数据
				//console.log("url:",this.Url,"data:",documentData);
				//console.log(documentData);
				this.g_bRecoredUpvote = false;
				
				// load more data
				//var response = documentData.responseJSON;
				if(documentData.responseText == undefined){ //针对请求失败的情况(自实现)
					console.log("请求失败,错误码: 0x1 潜在的网络故障 url:"+ url);
					debugger
					var index = url.lastIndexOf('=');
					nextLoadURL = url.slice(0,index); //提取最前面的链接
					var num = parseInt(url.slice(index+1));s
					nextLoadURL += (num+250);
					url = nextLoadURL;
					continue;
				}
				console.log("documentData.responseText",documentData.responseText);
				var response = JSON.parse(documentData.responseText);
				if ( response && response.success == true && response.blotter_html ){
					// append the new day, having it fade in quickly 补充新的一天，让它迅速消失
					
					// Scan each blotter response for an event ID we've seen before, so we can prune them out 扫描每个吸纸器响应以获取我们之前见过的事件ID，以便我们将其删节
					var html = response.blotter_html;
					arrData = html.split(this.friendActivityElementsBlockId);
					
					//var newDiv = new Element ( 'div' );
					//newDiv.update( html );
					//newDiv.setOpacity(0);
					//$('blotter_content').appendChild( newDiv );
					
					//Blotter_RecordAppImpressions();
					//ApplyAdultContentPreferences();
					
					//new Effect.Appear( newDiv, { duration: .75 }  );
					
					//g_BlotterNextLoadURL = response.next_request;
					nextLoadURL = response.next_request;
					//debugger
					//Blotter_InfiniteScrollingCheckForMoreContent();
					//Blotter_AddHighlightSliders();
				}
				else { //针对请求失败的情况(自实现)
					console.log("请求失败,错误码: 0x2 请求错误 url:"+ url);
					debugger
					var index = url.lastIndexOf('=');
					nextLoadURL = url.slice(0,index); //提取最前面的链接
					var num = parseInt(url.slice(index+1));s
					nextLoadURL += (num+250);
					url = nextLoadURL;
					continue;
				}
			}
			// debugger
			for (let i = 0; i < arrData.length; i++) {
				//console.log(arrData[i]);
				
				var k = arrData[i].lastIndexOf(this.bus); //VoteUpCommentThread('UserReceivedNewGame
				if(k>0)
				{
					var startk = arrData[i].indexOf('(',k);
					var endk = arrData[i].indexOf(')',startk);
					var code = arrData[i].slice(startk+1,endk);
					code = code.replace(/'/g, ""); //去除字符串中出现的所有单引号
					code = code.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
					//console.log("code",code);
					//debugger
					this.VoteUpCommentThread(code); //点赞
					await sleep(50); //延迟0.01秒
					continue;
				}
				
				// var l = arrData[i].lastIndexOf(this.status); //VoteUpCommentThread('UserStatusPublished
				// if(l>0)
				// {
				// 	var startl = arrData[i].indexOf('(',l);
				// 	var endl = arrData[i].indexOf(')',startl);
				// 	var code = arrData[i].slice(startl+1,endl);
				// 	code = code.replace(/'/g, ""); //去除字符串中出现的所有单引号
				// 	code = code.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
				// 	console.log("code",code);
				// 	debugger
				// 	this.VoteUpCommentThread(code); //点赞
				// 	await sleep(50); //延迟0.01秒
				// 	continue;
				// }
				
				var o = arrData[i].lastIndexOf(this.UserEvaluationUp); //UserReviewVoteUp
				if(o>0)
				{
					var starto = arrData[i].indexOf('(',o);
					var endo = arrData[i].indexOf(')',starto);
					var code = arrData[i].slice(starto+1,endo);
					code = code.replace(/'/g, ""); //去除字符串中出现的所有单引号
					code = code.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
					//debugger
					////console.log("code",code);
					this.UserReviewVoteUp(code); //点赞
					await sleep(50); //延迟0.01秒
					continue;
				}
				
				var j = arrData[i].indexOf(this.captureUp); //VoteUp
				if(j>0)
				{
					var startj = arrData[i].indexOf('(',j);
					var endj = arrData[i].indexOf(')',startj);
					var code = arrData[i].slice(startj+1,endj);
					//console.log("code",code);
					//debugger
					if(code.indexOf(',') == -1) //如果不是组点赞则继续点赞，否则继续往后面执行
					{
						this.VoteUp(parseInt(code)); //点赞
						await sleep(50); //延迟0.01秒
						continue;
					}
				}
				
				var getCode = (m)=>{
					var startm = arrData[i].indexOf('(',m);
					var endm = arrData[i].indexOf(')',startm);
					var code = arrData[i].slice(startm+1,endm);
					////console.log("code",code);
					
					var iId = arrData[i].indexOf('id',endm);
					var startId = arrData[i].indexOf('"',iId);
					var endId = arrData[i].indexOf('"',startId+1);
					var idValue = arrData[i].slice(startId+1,endId);
					//console.log("idValue",idValue);
					if(idValue.indexOf('Up') != -1){
						
						return [true,code];
					}
					else if(idValue.indexOf('Down') != -1){
						return [false,code];
					}
					else{
						console.log("组点赞出错!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					}
				}
				
				var m = arrData[i].indexOf(this.groupNotificationUp); //RateAnnouncement
				if(m>0)
				{
					//查找设置
					var ret = getCode(m);
					//debugger
					if(ret[0]==true){
						this.RateAnnouncement(ret[1]); //点赞
						await sleep(50); //延迟0.01秒
					}
					else{
						this.RateAnnouncement(ret[1]); //踩
						await sleep(50); //延迟0.01秒
					}
					continue;
				}
				
			}
			//debugger
			url = nextLoadURL;
			//console.log(url,"点赞完毕! 加载下一个url:", nextLoadURL);
			var index = url.indexOf("?start=")+1;
			var endindex = url.indexOf("&",index);
			if(endindex == -1)
				endindex = url.length;
			var time = url.slice(index + "?start".length,endindex);
			time = parseInt(time);
			var date = new Date(time*1000);
			var year = date.getFullYear();
			var mon = date.getMonth()+1;
			var day = date.getDate();
			var hours = date.getHours();
			var minu = date.getMinutes();
			var sec = date.getSeconds();
			//if(mon<10) mon = "0"+mon;
			//if(day<10) day = "0"+day;
			//if(hours<10) hours = "0"+hours;
			//if(minu<10) minu = "0"+minu;
			//if(sec<10) sec = "0"+sec;
			var str = year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec; //year+"年"+mon+"月"+day +"日"+hours +"时"+minu +"分"+sec+"秒" //date.toLocaleString()
			console.log(url,"点赞完毕! 下一次点赞的内容时间是:", str + " startoffset:",url.slice(url.lastIndexOf("startoffset=") + "startoffset=".length));
		} //while
		var time = url.slice(url.indexOf("=")+1);
		time = parseInt(time);
		var date = new Date(time*1000);
		var year = date.getFullYear();
		var mon = date.getMonth()+1;
		var day = date.getDate();
		var hours = date.getHours();
		var minu = date.getMinutes();
		var sec = date.getSeconds();
		var str = year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
		
		console.log("点赞完毕! 已将"+ str +"这个时间线之后的动态全部点赞完毕!~");
	}
	Stop(){
		console.log("开始停止点赞...");
		this.isYun = false;
	}
	
	async setfriendActivityOption(){
		var url = this.Url + this.friendActivitOptionUrl;
		jQuery.post(url, {
			setting: 1,
			sessionid: g_sessionID,
			"subscription_option[friendadded]": 1,
			"subscriptions[friendadded]": 1,
			"subscription_option[achievementunlocked]": 1,
			"subscriptions[achievementunlocked]": 1,
			"subscription_option[receivednewgame]": 1,
			"subscriptions[receivednewgame]": 1,
			"subscription_option[joinedgroup]": 1,
			"subscriptions[joinedgroup]": 1,
			"subscription_option[createsgroup]": 1,
			"subscriptions[createsgroup]": 1,
			"subscription_option[addedgametowishlist]": 1,
			"subscriptions[addedgametowishlist]": 1,
			"subscription_option[recommendedgame]": 1,
			"subscriptions[recommendedgame]": 1,
			"subscription_option[screenshotpublished]": 1,
			"subscriptions[screenshotpublished]": 1,
			"subscription_option[videopublished]": 1,
			"subscriptions[videopublished]": 1,
			"subscription_option[filefavorited]": 1,
			"subscriptions[filefavorited]": 1,
			"subscription_option[postedannouncement]": 1,
			"subscriptions[postedannouncement]": 1,
			"subscription_option[scheduledevent]": 1,
			"subscriptions[scheduledevent]": 1,
			"subscription_option[selectednewpotw]": 1,
			"subscriptions[selectednewpotw]": 1,
			"subscription_option[promotednewadmin]": 1,
			"subscriptions[promotednewadmin]": 1,
			"subscription_option[receivesgroupcomment]": 1,
			"subscriptions[receivesgroupcomment]": 1,
			"subscription_option[greenlightannouncement]": 1,
			"subscriptions[greenlightannouncement]": 1,
			"subscription_option[workshopannouncement]": 1,
			"subscriptions[workshopannouncement]": 1,
			"subscription_option[curatorrecommendations]": 1,
			"subscriptions[curatorrecommendations]": 1,
			"subscription_option[followingpublishedugc]": 1,
			"subscriptions[followingpublishedugc]": 1,
			"subscription_option[taggedinscreenshot]": 1,
			"subscriptions[taggedinscreenshot]": 1
		}, function(response) {
			if (response.success === false) {
				jQuery("#log_body1")[0].innerHTML +=
					"<a style='color:#ff2c85;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
					"\">" + '[' + (i + 1) + '/' + total + '] 设置备注失败了! ' + profileID + '  ' + name +
					'&nbsp;&nbsp;&nbsp;&nbsp;' + response.error + "</a><br>";
			} else {
				jQuery("#log_body1")[0].innerHTML +=
					'[' + (i + 1) + '/' + total + '] ' +
					"成功设置备注于 <a target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID + "\">" +
					profileID + '  ' + name + "</a>" +
					"<a style='color:#FB7299;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
					profileID + "\">" + "</a><br>";
			}
		}).fail(function() {
			jQuery("#log_body1")[0].innerHTML +=
				'<span style="color:#DA2626;">[' + (i + 1) + '/' + total + '] ' +
				"无法设置备注于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
				profileID + "\">" +
				profileID + '  ' + name + "</a></span><br>";
		}).always(function() {
			jQuery("#log_head1").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
		});
		
	}
	
	setGetActivityInfo(){ //设置动态的内容为指定的数据
		
	}
	setGetActivityAll(){ //设置动态内容为默认(全部)
		
	}
	setFriendActivityInfo(){ //设置指定好友动态为跳过,只给指定好友点赞等等
		
	}
}

class SteamData{
	constructor(arg) {
		this.steamCommunityUrl = "https://steamcommunity.com/";
		this.customUrl = "id/";
		this.profileIDUrl = "profiles/";
		this.commentUrl = "/allcomments"; //GET //https://steamcommunity.com/id/miku-39/allcomments
		this.commentNextUrl = "https://steamcommunity.com/comment/Profile/render/"; //POST //https://steamcommunity.com/comment/Profile/render/76561198373290430/-1/
		// start: 0
		// totalcount: 11596
		// count: 50
		// sessionid: 006825ba8313e097671eb93e
		// feature2: -1
		
		// {
		// 	start: 50,
		// 	totalcount: 11594,
		// 	count: 50,
		// 	sessionid: 006825ba8313e097671eb93e,
		// 	feature2: -1
		// }
		
		// start: 100
		// totalcount: 11595
		// count: 50
		// sessionid: 006825ba8313e097671eb93e
		// feature2: -1
		
		this.statusUrl = "https://steamcommunity.com/actions/GetNotificationCounts"; //GET
		this.userInfoUrl = "https://steamcommunity.com/miniprofile/"; //GET //https://steamcommunity.com/miniprofile/859694761
	}
	getCommentData(){
		var url = this.steamCommunityUrl + this.customUrl + 'miku-39' + this.commentUrl;
		var currentCommentNum = 0; //当前评论数
		var newCurrentCommentNum = 0; //在获取数据时，又出现了新的当前评论数
		
		for (let i = 0; i < currentCommentNum; i++) {
			_getCommentPageData(url,i);
			//解析数据
			
			//存储数据
			
		}
		
	}
	_getCommentPageData(url,nPage){
		var data;
		//获取数据
		
		//解析数据
		
		//完成后
		_updateData();
		return data;
	}
	_updateData(){
		//更新当前评论数
		newCurrentCommentNum = 0;
	}
}

