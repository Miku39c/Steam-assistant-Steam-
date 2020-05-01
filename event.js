async function registeredAllEvents() //注册所有的事件
{
	autoSetPageRefreshAndCloseWarn(true); //自动判断状态并设置页面刷新和关闭警告
	addFriendMultipleSelectionMode(); //添加好友多选模式
	
	
	jQuery("#addCustomName").click(async function() {
		var inString = document.getElementById("comment_textarea");
		inString.value += g_conf[0].strRemarkPlaceholder;
		
		document.getElementById("select_isCustom_checkbox").checked = true; //自动选择 自定义称呼模式
	});
	
	//<留言时的时间戳-目标时间戳>
	jQuery("#setTimeInterval").click(async function() {
		
	});
	
	jQuery("#unsetTimeInterval").click(async function() {
		
	});
	
	jQuery("#setNoLeave").click(async function() {
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selected").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			jQuery("#log_head1, #log_body1").html("");
			var jqobj = jQuery("#search_results .selected");
			
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
				
				var nostrNoOperate = g_conf[0].strNoOperate + "-N";
				
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
			
			
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf(g_conf[0].strNoOperate) != -1 || SpecialName.indexOf(nostrNoOperate) != -1) //检查是否设置了不留言标识
							{
								jQuery("#log_body1")[0].innerHTML +=
									"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置备注! ' + profileID + '  ' + SpecialName + "</a><br>";
								continue;
							}
							name = SpecialName;
							name = name + g_conf[0].strNoOperate; //组合
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							SpecialName = undefined; //就没有备注
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							name = steamName;
							name = name + nostrNoOperate; //组合
						}
					}
				}
				
				console.log("[Debug] name:", name);
			
				(function(i, profileID) {
					var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
			
					jQuery.post(URL, {
						nickname: name,
						sessionid: g_sessionID
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
			
				})(i, profileID);
				await sleep(100);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	});
	
	jQuery("#unsetNoLeave").click(async function() {
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selected.selectable").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			jQuery("#log_head1, #log_body1").html("");
			var jqobj = jQuery("#search_results .selected.selectable");
			
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
			
				var nostrNoOperate = g_conf[0].strNoOperate + "-N";
			
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
					
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.lastIndexOf(nostrNoOperate) != -1) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(0,SpecialName.lastIndexOf(nostrNoOperate)); //去掉国籍标识
								name = ""; //去掉备注
							}
							else if (SpecialName.lastIndexOf(g_conf[0].strNoOperate) != -1) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(0,SpecialName.lastIndexOf(g_conf[0].strNoOperate)); //去掉国籍标识
								name = SpecialName; //使用原来的备注
							}else {
								jQuery("#log_body1")[0].innerHTML +=
									"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置国籍不能取消! ' + profileID + '  ' + SpecialName + "</a><br>";
								continue;
							}
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							jQuery("#log_body1")[0].innerHTML +=
								"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有备注不能取消! ' + profileID + '  ' + steamName + "</a><br>";
							continue;
						}
					}
				}
				console.log("[Debug] name:", name);
				(function(i, profileID) {
					var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
			
					jQuery.post(URL, {
						nickname: name,
						sessionid: g_sessionID
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
							'[' + (i + 1) + '/' + total + '] ' +
							"<span style='color:#DA2626;'>无法设置备注于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
							profileID + "\">" +
							profileID + '  ' + name + "</a></span><br>";
					}).always(function() {
						jQuery("#log_head1").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
					});
			
				})(i, profileID);
				await sleep(1000);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	});
	
	
	
	jQuery("#translationText").click(async function() {
		//获取选择的语言
		var selectLanguage = jQuery("#selectBoxID").ySelectedTexts(",");
		var selectLanguageArr = selectLanguage.split(',');
		if (selectLanguageArr.length == 1 && selectLanguageArr[0] == "")
			return;
		console.log("selectLanguageArr", selectLanguageArr);
		//获取输入的内容
		var inString = document.getElementById("comment_textarea").value;
		if (inString == "")
			return;
		console.log("inString", inString);
		//获取原始语言选项
		var options = document.getElementById('origLanguageSelectBox'); //获取选中的项目
		var optionsValue = options[options.selectedIndex].value;
		console.log("optionsValue", optionsValue);
		//遍历选择的语言并创建输入框,然后翻译后设置值
		for (let i = 0; i < selectLanguageArr.length; i++) {
			g_conf[0].YunStatus = true; //正在运行
			
			var _id;
			var newStrText;
			switch (selectLanguageArr[i]) {
				case '中文简体':
					_id = "_zhc";
					newStrText = await GoogleTranslateRequest(optionsValue, zhc, inString);
					console.log("翻译为中文简体:", newStrText);
	
					if (document.getElementById('comment_textarea_zhc') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为中文简体' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=3;closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zhc\',false);" onClick="" onblur="inBoxonblurID=3;inBoxShrinkage(\'comment_textarea_zhc\',true);" placeholder="添加留言(中文简体)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zhc').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_zhc'); //统计翻译后的文字长度
					break;
				case '英语':
					_id = "_en";
					newStrText = await GoogleTranslateRequest(optionsValue, en, inString);
					console.log("翻译为英语:", newStrText);
	
					if (document.getElementById('comment_textarea_en') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为英语' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=1;closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_en\',false);" onClick="" onblur="inBoxonblurID=1;inBoxShrinkage(\'comment_textarea_en\',true);" placeholder="添加留言(英语)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_en').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_en'); //统计翻译后的文字长度
					break;
				case '日语':
					_id = "_jp";
					newStrText = await GoogleTranslateRequest(optionsValue, jp, inString);
					console.log("翻译为日语:", newStrText);
	
					if (document.getElementById('comment_textarea_jp') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为日语' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=2;closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_jp\',false);" onClick="" onblur="inBoxonblurID=2;inBoxShrinkage(\'comment_textarea_jp\',true);" placeholder="添加留言(日语)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_jp').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_jp'); //统计翻译后的文字长度
					break;
				case "马新简体[zh-sg]":
					_id = "_zh_sg";
					newStrText = await CNTranslateRequest('zh-sg', inString);
					console.log("翻译为马新简体[zh-sg]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_sg') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为马新简体' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=4;closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_sg\',false);" onClick="" onblur="inBoxonblurID=4;inBoxShrinkage(\'comment_textarea_zh_sg\',true);" placeholder="添加留言(马新简体)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_sg').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_zh_sg'); //统计翻译后的文字长度
					break;
				case "繁體中文[zh-hant]":
					_id = "_zh_hant";
					newStrText = await CNTranslateRequest('zh-hant', inString);
					console.log("翻译为繁體中文[zh-hant]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_hant') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为繁體中文' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=5;closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_hant\',false);" onClick="" onblur="inBoxonblurID=5;inBoxShrinkage(\'comment_textarea_zh_hant\',true);" placeholder="添加留言(繁體中文)" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_hant').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_zh_hant'); //统计翻译后的文字长度
					break;
				case "繁體中文(香港)[zh-hk]":
					_id = "_zh_hk";
					newStrText = await CNTranslateRequest('zh-hk', inString);
					console.log("翻译为繁體中文(香港)[zh-hk]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_hk') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为繁體中文(香港)' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=6;closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_hk\',false);" onClick="" onblur="inBoxonblurID=6;inBoxShrinkage(\'comment_textarea_zh_hk\',true);" placeholder="添加留言(繁體中文(香港))" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_hk').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_zh_hk'); //统计翻译后的文字长度
					break;
				case "繁體中文(澳门)[zh-mo]":
					_id = "_zh_mo";
					newStrText = await CNTranslateRequest('zh-mo', inString);
					console.log("翻译为繁體中文(香港)[zh-hk]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_mo') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为繁體中文(澳门)' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=7;closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_mo\',false);" onClick="" onblur="inBoxonblurID=7;inBoxShrinkage(\'comment_textarea_zh_mo\',true);" placeholder="添加留言(繁體中文(澳门))" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_mo').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_zh_mo'); //统计翻译后的文字长度
					break;
				case "繁體中文(台湾)[zh-tw]":
					_id = "_zh_tw";
					newStrText = await CNTranslateRequest('zh-tw', inString);
					console.log("翻译为繁體中文(台湾)[zh-tw]:", newStrText);
	
					if (document.getElementById('comment_textarea_zh_tw') == null) {
						jQuery("#translationOptions").after(
							'\
								<div class="commentthread_entry_quotebox">\
									<span>' + '翻译为繁體中文(台湾)' +
							'</span>\
									<textarea class="commentthread_textarea" id="comment_textarea' + _id +
							'" onfocus="inBoxonblurID=8;closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_tw\',false);" onClick="" onblur="inBoxonblurID=8;inBoxShrinkage(\'comment_textarea_zh_tw\',true);" placeholder="添加留言(繁體中文(台湾))" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_tw').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_zh_tw'); //统计翻译后的文字长度
					break;
				default:
				g_conf[0].YunStatus = false; //没有运行
					break;
			}
			g_conf[0].isTranslationText = true; //进行了翻译
			g_conf[0].YunStatus = false; //没有运行
	
		}
	
	});
	
	jQuery("#setNationality").click(async function() {
		//获取指定的国籍标识
		var options = document.getElementById('nationalitySelectBox'); //获取选中的项目
		var optionsValue = options[options.selectedIndex].value;
		console.log("optionsValue", optionsValue);
		var strNationality = '{' + optionsValue + '}'; //组合国籍标识
		var strSpecialNationality = '{' + optionsValue + '-N}'; //组合格外国籍标识
		//遍历所有选择的好友,
		//对已经设置了备注的好友,添加国籍标识;
		//对没有设置备注的好友,添加格外国籍标识(此国籍标识与原国籍标识都能发送特定语言的留言,
		//但是如果选择的是没有备注不添加称呼,则当做无备注处理; 并且好友会有特殊标识; 在分组中也与原国籍标识会有不同)
		//注意: 国籍标识不会被作为称呼之类的,只作为标识; 为了方便存储数据,所以会添加在备注里
	
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selected").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			jQuery("#log_head1, #log_body1").html("");
			var jqobj = jQuery("#search_results .selected");
	
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
	
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
	
	
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf('{CN}') != -1 || SpecialName.indexOf('{CN-N}') != -1 ||
								SpecialName.indexOf('{EN}') != -1 || SpecialName.indexOf('{EN-N}') != -1 ||
								SpecialName.indexOf('{JP}') != -1 || SpecialName.indexOf('{JP-N}') != -1 ||
								SpecialName.indexOf('{CN-SG}') != -1 || SpecialName.indexOf('{CN-SG-N}') != -1 ||
								SpecialName.indexOf('{CN-HANT}') != -1 || SpecialName.indexOf('{CN-HANT-N}') != -1 ||
								SpecialName.indexOf('{CN-HK}') != -1 || SpecialName.indexOf('{CN-HK-N}') != -1 ||
								SpecialName.indexOf('{CN-MO}') != -1 || SpecialName.indexOf('{CN-MO-N}') != -1 ||
								SpecialName.indexOf('{CN-TW}') != -1 || SpecialName.indexOf('{CN-TW-N}') != -1
							) //检查是否设置了国籍标识
							{
								if (SpecialName.indexOf('{' + optionsValue + '}') != -1 || SpecialName.indexOf('{' + optionsValue + '-N}') !=
									-1) //是否与待设置的国籍标识相同
								{
									jQuery("#log_body1")[0].innerHTML +=
										"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
										"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置备注! ' + profileID + '  ' + SpecialName + "</a><br>";
									continue;
								} else //重新设置国籍标识
								{
									if (SpecialName.indexOf('-N}') != -1) {
										mode = 1;
									}
									SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
								}
							}
							if (mode == 0) {
								name = strNationality + SpecialName; //组合成为新的名称  国籍标识
							} else if (mode == 1) {
								name = strSpecialNationality + SpecialName; //组合成为新的名称  格外国籍标识
								mode = 0;
							}
	
	
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							SpecialName = undefined; //就没有备注
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							name = strSpecialNationality + steamName; //组合成为新的名称  格外国籍标识
						}
					}
				}
				console.log("[Debug] name:", name);
	
				(function(i, profileID) {
					var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
	
					jQuery.post(URL, {
						nickname: name,
						sessionid: g_sessionID
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
	
				})(i, profileID);
				await sleep(100);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	
	});
	
	jQuery("#NationalityGroup").click(async function() {
		//1.遍历所有好友,针对不同国籍进行上色
		//2.对好友进行排序
	
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selectable").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			jQuery("#log_head, #log_body").html("");
			var jqobj = jQuery("#search_results .selectable");
	
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
	
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
	
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf('{CN}') != -1 ||
								SpecialName.indexOf('{EN}') != -1 ||
								SpecialName.indexOf('{JP}') != -1 ||
								SpecialName.indexOf('{CN-SG}') != -1 ||
								SpecialName.indexOf('{CN-HANT}') != -1 ||
								SpecialName.indexOf('{CN-HK}') != -1 ||
								SpecialName.indexOf('{CN-MO}') != -1 ||
								SpecialName.indexOf('{CN-TW}') != -1
							) //检查是否设置了国籍标识
							{
								if (SpecialName.indexOf('{CN}') != -1) {
									cur.style.background = "#66cc";
								} else if (SpecialName.indexOf('{EN}') != -1) {
									cur.style.background = "#0C7FB2";
								} else if (SpecialName.indexOf('{JP}') != -1) {
									cur.style.background = "#008080";
								} else if (SpecialName.indexOf('{CN-SG}') != -1) {
									cur.style.background = "#808000";
								} else if (SpecialName.indexOf('{CN-HANT}') != -1) {
									cur.style.background = "#ae7844";
								} else if (SpecialName.indexOf('{CN-HK}') != -1) {
									cur.style.background = "#649115";
								} else if (SpecialName.indexOf('{CN-MO}') != -1) {
									cur.style.background = "#0f965b";
								} else if (SpecialName.indexOf('{CN-TW}') != -1) {
									cur.style.background = "#173eac";
								}
							} else if (SpecialName.indexOf('{CN-N}') != -1 ||
								SpecialName.indexOf('{EN-N}') != -1 ||
								SpecialName.indexOf('{JP-N}') != -1 ||
								SpecialName.indexOf('{CN-SG-N}') != -1 ||
								SpecialName.indexOf('{CN-HANT-N}') != -1 ||
								SpecialName.indexOf('{CN-HK-N}') != -1 ||
								SpecialName.indexOf('{CN-MO-N}') != -1 ||
								SpecialName.indexOf('{CN-TW-N}') != -1
							) //检查是否设置了国籍标识
							{
								if (SpecialName.indexOf('{CN-N}') != -1) {
									cur.style.background = "#66cc";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{EN-N}') != -1) {
									cur.style.background = "#0C7FB2";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{JP-N}') != -1) {
									cur.style.background = "#008080";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-SG-N}') != -1) {
									cur.style.background = "#808000";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-HANT-N}') != -1) {
									cur.style.background = "#ae7844";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-HK-N}') != -1) {
									cur.style.background = "#649115";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-MO-N}') != -1) {
									cur.style.background = "#0f965b";
									cur.style.borderColor = "#FF00FF";
								} else if (SpecialName.indexOf('{CN-TW-N}') != -1) {
									cur.style.background = "#173eac";
									cur.style.borderColor = "#FF00FF";
								}
							} else {
								//设置了备注没有设置国籍
								cur.style.background = "#188038";
							}
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							//jQuery("#log_body")[0].innerHTML +=
							//	"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
							//	"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有备注不能取消! ' + profileID + '  ' + steamName + "</a><br>";
							//continue;
						}
					}
				}
				console.log("[Debug] name:", SpecialName);
				//await sleep(1000);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			//window.location.reload(true); //强制从服务器重新加载当前页面
		}
	
	
	});
	
	jQuery("#unsetNationality").click(async function() {
		//获取指定的国籍标识
		var options = document.getElementById('nationalitySelectBox'); //获取选中的项目
		var optionsValue = options[options.selectedIndex].value;
		console.log("optionsValue", optionsValue);
		var strNationality = '{' + optionsValue + '}'; //组合国籍标识
		var strSpecialNationality = '{' + optionsValue + '-N}'; //组合格外国籍标识
		//遍历所有选择的好友,
		//对已经设置了备注的好友,添加国籍标识;
		//对没有设置备注的好友,添加格外国籍标识(此国籍标识与原国籍标识都能发送特定语言的留言,
		//但是如果选择的是没有备注不添加称呼,则当做无备注处理; 并且好友会有特殊标识; 在分组中也与原国籍标识会有不同)
		//注意: 国籍标识不会被作为称呼之类的,只作为标识; 为了方便存储数据,所以会添加在备注里
	
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selected.selectable").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			jQuery("#log_head1, #log_body1").html("");
			var jqobj = jQuery("#search_results .selected.selectable");
	
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				g_conf[0].YunStatus = true; //正在运行
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
	
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
	
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf('{CN}') != -1 ||
								SpecialName.indexOf('{EN}') != -1 ||
								SpecialName.indexOf('{JP}') != -1 ||
								SpecialName.indexOf('{CN-SG}') != -1 ||
								SpecialName.indexOf('{CN-HANT}') != -1 ||
								SpecialName.indexOf('{CN-HK}') != -1 ||
								SpecialName.indexOf('{CN-MO}') != -1 ||
								SpecialName.indexOf('{CN-TW}') != -1
							) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
								name = SpecialName; //使用原来的备注
							} else if (SpecialName.indexOf('{CN-N}') != -1 ||
								SpecialName.indexOf('{EN-N}') != -1 ||
								SpecialName.indexOf('{JP-N}') != -1 ||
								SpecialName.indexOf('{CN-SG-N}') != -1 ||
								SpecialName.indexOf('{CN-HANT-N}') != -1 ||
								SpecialName.indexOf('{CN-HK-N}') != -1 ||
								SpecialName.indexOf('{CN-MO-N}') != -1 ||
								SpecialName.indexOf('{CN-TW-N}') != -1
							) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
								name = ""; //去掉备注
							} else {
								jQuery("#log_body1")[0].innerHTML +=
									"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置国籍不能取消! ' + profileID + '  ' + SpecialName + "</a><br>";
								continue;
							}
						} else if (nicknameObj.length == 0) {
							console.log("获取到的是steam名称");
							steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							jQuery("#log_body1")[0].innerHTML +=
								"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有备注不能取消! ' + profileID + '  ' + steamName + "</a><br>";
							continue;
						}
					}
				}
				console.log("[Debug] name:", name);
				(function(i, profileID) {
					var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
	
					jQuery.post(URL, {
						nickname: name,
						sessionid: g_sessionID
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
							'[' + (i + 1) + '/' + total + '] ' +
							"<span style='color:#DA2626;'>无法设置备注于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
							profileID + "\">" +
							profileID + '  ' + name + "</a></span><br>";
					}).always(function() {
						jQuery("#log_head1").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
					});
	
				})(i, profileID);
				await sleep(1000);
				//console.log(cur)
			}
			g_conf[0].YunStatus = false; //没有运行
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	
	});
	
	//---------------------------------------------------------------------------------------------------------------
	await jQuery("#comment_submit").click(async function() {
		setTimeout(async ()=>{
			date = new Date();
			startTime = date.getTime();
			
			const total = jQuery("#search_results .selected.selectable").length; //选择的朋友总数
			const msg = jQuery("#comment_textarea").val(); //获取评论内容
			var newMgs = "";
			var mode = 0;
			var SpecialName = undefined;
			var steamName = undefined;
			var name = undefined;
			
			if (total > 0 && msg.length > 0) {
				jQuery("#log_head, #log_body").html("");
				//jQuery(".selected").each(async function(i) {
				var jqobj = jQuery("#search_results .selected.selectable");
				
				for (let i = 0; i < jqobj.length; i++) {
					let cur = jqobj.get(i);
					g_conf[0].YunStatus = true; //正在运行
					//--------------------------------------------------------------------
					SpecialName = undefined;
					steamName = undefined;
		
					if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
						//获取备注
						var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
						SpecialName = undefined;
						if (SpecialNameobj != "undefined") {
							SpecialName = SpecialNameobj[0].innerText; //备注
						}
						//获取steam名称
						steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
						name = steamName;
					} else //否则如果是好友界面
					{
						//获取名称,然后判断是备注还是steam名称
						var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
						var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
						SpecialName = undefined;
						if (SpecialNameobj.length > 0) //安全检查
						{
							if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
							{
								console.log("获取到的是备注");
								SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
								steamName = undefined; //就没有名称
								name = SpecialName;
							} else if (nicknameObj.length == 0) {
								console.log("获取到的是steam名称");
								SpecialName = undefined; //就没有备注
								steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
								name = steamName;
							}
						}
					}
					//--------------------------------------------------------------------
					//判断选择的模式
					if ($("select_islName_checkbox").checked == true) {
						mode = 1;
					}
					else if ($("select_isSpecialName_checkbox").checked == true) {
						mode = 2;
					}
					else if ($("select_isCustom_checkbox").checked == true) {
						mode = 3;
					}
					else //如果都没有选中，则直接发送消息
						mode = 0;
					
					if (mode == 1) { //是否为好友添加称呼 (如果好友没有备注则使用steam名称)
						//判断是否有备注,没有则使用steam名称
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
							
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							newMgs = SpecialName + msg;
						} else {
							console.log("为" + steamName + "添加称呼: " + steamName);
							newMgs = steamName + msg;
						}
					} else if (mode == 2) { //是否为好友添加称呼 (请为好友设置备注为需要的称呼,否则不添加称呼)
						//判断是否有备注,没有则不操作
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
							
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							newMgs = SpecialName + msg;
						} else {
							newMgs = msg;
						}
					} else if (mode == 3) { //是否为好友添加称呼 (请为好友设置备注为需要的称呼,否则不添加称呼)
						//判断是否有备注,没有则不操作
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
							
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							let str = msg;
							newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else {
							let str = msg;
							newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						}
					} else if (mode == 0) { //直接发送内容
						newMgs = msg;
					}
					console.log("[Debug] mode:", mode);
					console.log("[Debug] SpecialName:", SpecialName, "steamName:", steamName);
					console.log("[Debug] newMgs:", newMgs, "msg:", msg);
					//--------------------------------------------------------------------
					let profileID = cur.getAttribute("data-steamid");
		
					if (SpecialName != undefined) {
						if (SpecialName.indexOf(g_conf[0].strNoOperate) != -1) {
							jQuery("#log_body")[0].innerHTML +=
								"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 已跳过留言! ' + profileID + '  ' + name + "</a><br>";
							continue;
						}
					}
					
					(function(i, profileID) {
						//setTimeout(function() {
		
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
								'<span style="color:#DA2626;">[' + (i + 1) + '/' + total + '] ' +
								"无法发表评论于 <a style='color:#DA2626;' target='_blank' href=\"http://steamcommunity.com/profiles/" +
								profileID + "\">" +
								profileID + '  ' + name + "</a></span><br>";
						}).always(function() {
							jQuery("#log_head").html("<br><b>当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.<b>");
						});
		
		
						//}, i * 6000);
		
					})(i, profileID);
					await sleep(g_conf[0].delay * 1000)
					//console.log(cur)
				}
		
		
				date = new Date();
				endTime = date.getTime();
				let time = endTime - startTime;
				//console.log("time",time,endTime,startTime);
				//--------------------------------------------------------------------------------
				//计算出相差天数
				var str = "";
				let days = Math.floor(time / (24 * 3600 * 1000))
				//计算出小时数
				let leave1 = time % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				let hours = Math.floor(leave1 / (3600 * 1000))
				//计算相差分钟数
				let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				let minutes = Math.floor(leave2 / (60 * 1000))
				//计算相差秒数
				let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				//let seconds=Math.round(leave3/1000)
				let seconds = leave3 / 1000
				if (days > 0)
					str += days + "天";
				if (hours > 0)
					str += hours + "小时";
				if (minutes > 0)
					str += minutes + "分钟";
				if (seconds > 0)
					str += seconds + "秒";
				//--------------------------------------------------------------------------------
				jQuery("#log_body")[0].innerHTML +=
					"<b>留言完毕! 用时: <span style='color:#35ff8b;'>" + str + "</span></b><br>";
				//});
				
				g_conf[0].YunStatus = false; //没有运行
		
			} else {
				alert("请确保您输入了一条消息并选择了1个或更多好友。");
			}
		},0);
	});
	
	//---------------------------------------------------------------------------------------------------------------
	await jQuery("#comment_submit_special").click(async function() {
		
		setTimeout(async()=>{
			date = new Date();
			startTime = date.getTime();
			
			if(g_conf[0].isTranslationText == false){
				layer.alert("这个功能需要配合翻译一起使用，以达到发送不同留言内容的目的.请先进行翻译(选择要翻译的语言，然后点击翻译按钮，修改翻译的文本，然后重新进行尝试!)",{icon: 0});
				return;
			}
			
			const total = jQuery("#search_results .selected.selectable").length; //选择的朋友总数
			const msg = jQuery("#comment_textarea").val(); //获取评论内容
			const msg_CN = jQuery("#comment_textarea_zhc").val(); //获取评论内容
			const msg_EN = jQuery("#comment_textarea_en").val(); //获取评论内容
			const msg_JP = jQuery("#comment_textarea_jp").val(); //获取评论内容
			const msg_CN_SG = jQuery("#comment_textarea_zh_sg").val(); //获取评论内容
			const msg_CN_HANT = jQuery("#comment_textarea_zh_hant").val(); //获取评论内容
			const msg_CN_HK = jQuery("#comment_textarea_zh_hk").val(); //获取评论内容
			const msg_CN_MO = jQuery("#comment_textarea_zh_mo").val(); //获取评论内容
			const msg_CN_TW = jQuery("#comment_textarea_zh_tw").val(); //获取评论内容
			
			var newMgs = "";
			var mode = 0;
			var SpecialName = undefined;
			var steamName = undefined;
			var name = undefined;
				
			if (total > 0 && msg.length > 0) {
				jQuery("#log_head, #log_body").html("");
				//jQuery(".selected").each(async function(i) {
				//var jqobj = jQuery(".selected");
				//var jqobj = jQuery(".selected[data-steamid]"); //排除掉选择的其他的东西
				var jqobj = jQuery("#search_results .selected.selectable"); //排除掉选择的其他的东西
				
				for (let i = 0; i < jqobj.length; i++) {
					let cur = jqobj.get(i);
					g_conf[0].YunStatus = true; //正在运行
					//--------------------------------------------------------------------
					SpecialName = undefined;
					steamName = undefined;
				
					if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
						//获取备注
						var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
						SpecialName = undefined;
						if (SpecialNameobj != "undefined") {
							SpecialName = SpecialNameobj[0].innerText; //备注
						}
						//获取steam名称
						steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
						name = steamName;
					} else //否则如果是好友界面
					{
						//获取名称,然后判断是备注还是steam名称
						var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
						var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
						SpecialName = undefined;
						if (SpecialNameobj.length > 0) //安全检查
						{
							if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
							{
								console.log("获取到的是备注");
								SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
								steamName = undefined; //就没有名称
								name = SpecialName;
							} else if (nicknameObj.length == 0) {
								console.log("获取到的是steam名称");
								SpecialName = undefined; //就没有备注
								steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
								name = steamName;
							}
						}
					}
					//--------------------------------------------------------------------
					//判断选择的模式
					if ($("select_islName_checkbox").checked == true) {
						mode = 1;
					}
					else if ($("select_isSpecialName_checkbox").checked == true) {
						mode = 2;
					}
					else if ($("select_isCustom_checkbox").checked == true) {
						mode = 3;
					}
					else //如果都没有选中，则直接发送消息
						mode = 0;
				
					var getVA = function(steamName, SpecialName) {
						return steamName == undefined ? steamName : SpecialName;
					};
				
					console.log("DBG 0", steamName, SpecialName, name);
				
					if (mode == 1) { //是否为好友添加称呼 (如果好友没有备注则使用steam名称)
						//判断是否有备注,没有则使用steam名称
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
				
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								newMgs = SpecialName + msg_CN;
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								newMgs = SpecialName + msg_EN;
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								newMgs = SpecialName + msg_JP;
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								newMgs = SpecialName + msg_CN_SG;
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								newMgs = SpecialName + msg_CN_HANT;
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								newMgs = SpecialName + msg_CN_HK;
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								newMgs = SpecialName + msg_CN_MO;
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								newMgs = SpecialName + msg_CN_TW;
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != "")
									newMgs = SpecialName + msg_EN;
								else if (msg_JP != undefined && msg_JP != "")
									newMgs = SpecialName + msg_JP;
								else if (msg_CN != undefined && msg_CN != "")
									newMgs = SpecialName + msg_CN;
								else
									newMgs = SpecialName + msg;
							}
							console.log("DBG 1", steamName, SpecialName, name, strNationality);
							console.log("为" + SpecialName + "添加称呼: " + SpecialName);
							//newMgs = SpecialName + msg;
						} else {
							let strNationality = steamName.slice(0, steamName.indexOf('}') + 1); //提取国籍
							steamName = steamName.slice(steamName.indexOf('}') + 1); //去掉国籍标识
				
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								newMgs = steamName + msg_CN;
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								newMgs = steamName + msg_EN;
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								newMgs = steamName + msg_JP;
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								newMgs = steamName + msg_CN_SG;
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								newMgs = steamName + msg_CN_HANT;
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								newMgs = steamName + msg_CN_HK;
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								newMgs = steamName + msg_CN_MO;
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								newMgs = steamName + msg_CN_TW;
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != "")
									newMgs = steamName + msg_EN;
								else if (msg_JP != undefined && msg_JP != "")
									newMgs = steamName + msg_JP;
								else if (msg_CN != undefined && msg_CN != "")
									newMgs = steamName + msg_CN;
								else
									newMgs = steamName + msg;
							}
							console.log("DBG 2", steamName, SpecialName, name, strNationality);
							console.log("为" + steamName + "添加称呼: " + steamName);
							//newMgs = steamName + msg;
						}
					} else if (mode == 2) { //是否为好友添加称呼 (请为好友设置备注为需要的称呼,否则不添加称呼)
						//判断是否有备注,没有则不操作
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
				
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								newMgs = SpecialName + msg_CN;
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								newMgs = SpecialName + msg_EN;
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								newMgs = SpecialName + msg_JP;
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								newMgs = SpecialName + msg_CN_SG;
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								newMgs = SpecialName + msg_CN_HANT;
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								newMgs = SpecialName + msg_CN_HK;
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								newMgs = SpecialName + msg_CN_MO;
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								newMgs = SpecialName + msg_CN_TW;
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != "")
									newMgs = SpecialName + msg_EN;
								else if (msg_JP != undefined && msg_JP != "")
									newMgs = SpecialName + msg_JP;
								else if (msg_CN != undefined && msg_CN != "")
									newMgs = SpecialName + msg_CN;
								else
									newMgs = SpecialName + msg;
							}
							console.log("DBG 3", steamName, SpecialName, name, strNationality);
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							//newMgs = SpecialName + msg;
						} else {
							let strNationality = steamName.slice(0, steamName.indexOf('}') + 1); //提取国籍
							steamName = steamName.slice(steamName.indexOf('}') + 1); //去掉国籍标识
				
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								newMgs = msg_CN;
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								newMgs = msg_EN;
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								newMgs = msg_JP;
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								newMgs = msg_CN_SG;
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								newMgs = msg_CN_HANT;
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								newMgs = msg_CN_HK;
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								newMgs = msg_CN_MO;
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								newMgs = msg_CN_TW;
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != "")
									newMgs = msg_EN;
								else if (msg_JP != undefined && msg_JP != "")
									newMgs = msg_JP;
								else if (msg_CN != undefined && msg_CN != "")
									newMgs = msg_CN;
								else
									newMgs = msg;
							}
							console.log("DBG 4", steamName, SpecialName, name, strNationality);
							//newMgs = msg;
						}
					} else if (mode == 3) { //是否为好友添加称呼 (请为好友设置备注为需要的称呼,否则不添加称呼)
						//判断是否有备注,没有则不操作
						if (SpecialName != undefined) {
							let strNationality = SpecialName.slice(0, SpecialName.indexOf('}') + 1); //提取国籍
							SpecialName = SpecialName.slice(SpecialName.indexOf('}') + 1); //去掉国籍标识
							
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								if(msg_CN == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								if(msg_EN == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_EN;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								if(msg_JP == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_JP;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								if(msg_CN_SG == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_SG;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								if(msg_CN_HANT == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_HANT;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								if(msg_CN_HK == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_HK;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								if(msg_CN_MO == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_MO;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								if(msg_CN_TW == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_TW;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != ""){
									let str = msg_EN;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
								}	
								else if (msg_JP != undefined && msg_JP != ""){
									let str = msg_JP;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
								}
								else if (msg_CN != undefined && msg_CN != ""){
									let str = msg_CN;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
								}
								else{
									let str = msg;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
								}
							}
							console.log("DBG 3", steamName, SpecialName, name, strNationality);
							console.log("为" + steamName + "添加称呼: " + SpecialName);
							//newMgs = SpecialName + msg;
						} else {
							let strNationality = steamName.slice(0, steamName.indexOf('}') + 1); //提取国籍
							steamName = steamName.slice(steamName.indexOf('}') + 1); //去掉国籍标识
						
							if (strNationality == "{CN}" || strNationality == "{CN-N}") {
								if(msg_CN == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
								if(msg_EN == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_EN;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
								if(msg_JP == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_JP;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
								if(msg_CN_SG == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_SG;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
								if(msg_CN_HANT == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_HANT;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
								if(msg_CN_HK == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_HK;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
								if(msg_CN_MO == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_MO;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
								if(msg_CN_TW == undefined){
									return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
								}
								let str = msg_CN_TW;
								newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
							{
								if (msg_EN != undefined && msg_EN != ""){
									let str = msg_EN;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
								}	
								else if (msg_JP != undefined && msg_JP != ""){
									let str = msg_JP;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
								}
								else if (msg_CN != undefined && msg_CN != ""){
									let str = msg_CN;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
								}
								else{
									let str = msg;
									newMgs = str.replace(new RegExp(g_conf[0].strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
								}
							}
							console.log("DBG 4", steamName, SpecialName, name, strNationality);
							//newMgs = msg;
						}
					} else if (mode == 0) { //直接发送内容
						let strNationality = name.slice(0, name.indexOf('}') + 1); //提取国籍
						name = name.slice(name.indexOf('}') + 1); //去掉国籍标识
				
						if (strNationality == "{CN}" || strNationality == "{CN-N}") {
							newMgs = msg_CN;
						} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
							newMgs = msg_EN;
						} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
							newMgs = msg_JP;
						} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
							newMgs = msg_CN_SG;
						} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
							newMgs = msg_CN_HANT;
						} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
							newMgs = msg_CN_HK;
						} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
							newMgs = msg_CN_MO;
						} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
							newMgs = msg_CN_TW;
						} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
						{
							if (msg_EN != undefined && msg_EN != "")
								newMgs = msg_EN;
							else if (msg_JP != undefined && msg_JP != "")
								newMgs = msg_JP;
							else if (msg_CN != undefined && msg_CN != "")
								newMgs = msg_CN;
							else
								newMgs = msg;
						}
						console.log("DBG 5", steamName, SpecialName, name, strNationality);
						//ewMgs = msg;
					}
					console.log("[Debug] mode:", mode);
					console.log("[Debug] SpecialName:", SpecialName, "steamName:", steamName);
					console.log("[Debug] newMgs:", newMgs, "msg:", msg);
					//--------------------------------------------------------------------
					let profileID = cur.getAttribute("data-steamid");
					
					if (SpecialName != undefined) {
						if (SpecialName.indexOf(g_conf[0].strNoOperate) != -1) {
							jQuery("#log_body")[0].innerHTML +=
								"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								"\">" + '[' + (i + 1) + '/' + total + '] 已跳过留言! ' + profileID + '  ' + name + "</a><br>";
							continue;
						}
					}
					
					(function(i, profileID) {
						//setTimeout(function() {
				
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
						
						
						//}, i * 6000);
				
					})(i, profileID);
					await sleep(g_conf[0].delay * 1000)
					//console.log(cur)
				}
				
				
				date = new Date();
				endTime = date.getTime();
				let time = endTime - startTime;
				//console.log("time",time,endTime,startTime);
				//--------------------------------------------------------------------------------
				//计算出相差天数
				var str = "";
				let days = Math.floor(time / (24 * 3600 * 1000))
				//计算出小时数
				let leave1 = time % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				let hours = Math.floor(leave1 / (3600 * 1000))
				//计算相差分钟数
				let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				let minutes = Math.floor(leave2 / (60 * 1000))
				//计算相差秒数
				let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				//let seconds=Math.round(leave3/1000)
				let seconds = leave3 / 1000
				if (days > 0)
					str += days + "天";
				if (hours > 0)
					str += hours + "小时";
				if (minutes > 0)
					str += minutes + "分钟";
				if (seconds > 0)
					str += seconds + "秒";
				//--------------------------------------------------------------------------------
				jQuery("#log_body")[0].innerHTML +=
					"<b>留言完毕! 用时: <span style='color:#35ff8b;'>" + str + "</span></b><br>";
				//});
				
				g_conf[0].YunStatus = false; //没有运行
				
			} else {
				alert("请确保您输入了一条消息并选择了1个或更多好友。");
			}
		},0);
		
	});
	
	var GroupMode = 0; //分组标志 0没有分组 1是国籍 2是离线时间
	
	await jQuery("#NationalitySortGroup").click(async function() {
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selectable").length; //所有的朋友总数
		jQuery("#log_head, #log_body").html("");
		var jqobj = jQuery("#search_results .selectable"); //所有的朋友
	
	
		var child_CN, child_EN, child_JP, child_CN_SG, child_CN_HANTd, child_CN_HK, child_CN_MO, child_CN_TW;
		if (GroupMode != 1) {
			var mainFriendObj;
			if (GroupMode == 2) { //节点已经被模式2处理过
				//备份和处理
				if (document.getElementById("search_results1") == null) { //没有被模式1处理过
					mainFriendObj = document.getElementById("search_results0"); //获取原节点
					var newCopyObj = mainFriendObj.cloneNode(true);
					var mainFriendObj1 = document.getElementById("search_results"); //获取之前模式的节点
					mainFriendObj1.style.display = "none"; //之前模式的节点隐藏
					mainFriendObj1.id = "search_results2"; //之前模式的节点
					mainFriendObj1.className = "profile_friends search_results2"; //之前模式的节点
					newCopyObj.style.display = ""; //克隆的原节点取消隐藏(显示)
					newCopyObj.id = "search_results"; //克隆的原节点
					newCopyObj.className = "profile_friends search_results"; //克隆的原节点
					mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
				} else { //被模式1处理过
					var obj = document.getElementById("search_results1");
					var mainFriendObj1 = document.getElementById("search_results"); //获取之前模式的节点
					mainFriendObj = document.getElementById("search_results0"); //获取原节点
					mainFriendObj1.style.display = "none"; //之前模式的节点隐藏
					mainFriendObj1.id = "search_results2"; //之前模式的节点
					mainFriendObj1.className = "profile_friends search_results2"; //之前模式的节点
					obj.style.display = ""; //取消隐藏(显示)
					obj.id = "search_results"; //节点
					obj.className = "profile_friends search_results"; //节点
				}
	
			} else { //节点还没有被动过
				//备份和处理
				mainFriendObj = document.getElementById("search_results"); //获取原节点
				var newCopyObj = mainFriendObj.cloneNode(true);
				newCopyObj.style.display = "none"; //克隆的原节点隐藏
				newCopyObj.id = "search_results0"; //克隆的原节点
				newCopyObj.className = "profile_friends search_results0"; //克隆的原节点
				mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
	
	
			}
			// //备份和处理
			// var mainFriendObj = document.getElementById("search_results"); //获取原节点
			// var newCopyObj = mainFriendObj.cloneNode(true);
			// newCopyObj.style.display = "none"; //隐藏
			// mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
	
			var StateObj = mainFriendObj.getElementsByClassName("state_block");
			for (let i = 0; i < StateObj.length; i++) {
				StateObj[i].style.display = "none"; //隐藏状态条
			}
	
			//创建新盒子和克隆分组节点
			console.log("开始分组...");
			child_CN = document.createElement('div'); //创建
			child_CN.id = "Firend_CN";
			child_CN.style.display = "flex";
			child_CN.style.flex = "1 100%";
			child_CN.style.flexFlow = "row wrap";
			child_CN.style.margin = "8px 0px 0px 0px";
			// child_CN.style.justifyContent = "space-start";
			mainFriendObj.appendChild(child_CN);
	
			child_EN = child_CN.cloneNode(true); //克隆
			child_EN.id = "Firend_EN";
			mainFriendObj.appendChild(child_EN);
	
			child_JP = child_EN.cloneNode(true); //克隆
			child_JP.id = "Firend_JP";
			mainFriendObj.appendChild(child_JP);
	
			child_CN_SG = child_EN.cloneNode(true); //克隆
			child_CN_SG.id = "Firend_CN_SG";
			mainFriendObj.appendChild(child_CN_SG);
	
			child_CN_HANTd = child_EN.cloneNode(true); //克隆
			child_CN_HANTd.id = "Firend_CN_HANTd";
			mainFriendObj.appendChild(child_CN_HANTd);
	
			child_CN_HK = child_EN.cloneNode(true); //克隆
			child_CN_HK.id = "Firend_CN_HK";
			mainFriendObj.appendChild(child_CN_HK);
	
			child_CN_MO = child_EN.cloneNode(true); //克隆
			child_CN_MO.id = "Firend_CN_MO";
			mainFriendObj.appendChild(child_CN_MO);
	
			child_CN_TW = child_EN.cloneNode(true); //克隆
			child_CN_TW.id = "Firend_CN_TW";
			mainFriendObj.appendChild(child_CN_TW);
	
			//-------------------------------------------------
	
			var newGroupTitle = StateObj[0].cloneNode(true); //克隆
			newGroupTitle.style.display = ""; //去除隐藏样式
			newGroupTitle.innerText = "CN";
			child_CN.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "EN";
			child_EN.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "JP";
			child_JP.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_SG";
			child_CN_SG.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_HANTd";
			child_CN_HANTd.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_HK";
			child_CN_HK.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_MO";
			child_CN_MO.appendChild(newGroupTitle);
	
			newGroupTitle = newGroupTitle.cloneNode(true); //克隆
			newGroupTitle.innerText = "CN_TW";
			child_CN_TW.appendChild(newGroupTitle);
	
			//遍历所有节点,向盒子里添加节点
			for (let i = 0; i < jqobj.length; i++) {
				let cur = jqobj.get(i);
				let profileID = cur.getAttribute("data-steamid");
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
	
				if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
					//获取备注
					var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
					SpecialName = undefined;
					if (SpecialNameobj != "undefined") {
						SpecialName = SpecialNameobj[0].innerText; //备注
					}
					//获取steam名称
					steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
					name = steamName;
				} else //否则如果是好友界面
				{
					//获取名称,然后判断是备注还是steam名称
					var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
					var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
					SpecialName = undefined;
	
					if (SpecialNameobj.length > 0) //安全检查
					{
						if (nicknameObj.length > 0) //节点存在则是备注,不存在则是steam名称
						{
							//console.log("获取到的是备注");
							SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
							steamName = undefined; //就没有名称
							if (SpecialName.indexOf('{CN}') != -1 || SpecialName.indexOf('{CN-N}') != -1) { //检查是否设置了国籍标识
								child_CN.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{EN}') != -1 || SpecialName.indexOf('{EN-N}') != -1) {
								child_EN.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{JP}') != -1 || SpecialName.indexOf('{JP-N}') != -1) {
								child_JP.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-SG}') != -1 || SpecialName.indexOf('{CN-SG-N}') != -1) {
								child_CN_SG.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-HANT}') != -1 || SpecialName.indexOf('{CN-HANT-N}') != -1) {
								child_CN_HANT.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-HK}') != -1 || SpecialName.indexOf('{CN-HK-N}') != -1) {
								child_CN_HK.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-MO}') != -1 || SpecialName.indexOf('{CN-MO-N}') != -1) {
								child_CN_MO.appendChild(SpecialNameobj[0].parentNode);
							} else if (SpecialName.indexOf('{CN-TW}') != -1 || SpecialName.indexOf('{CN-TW-N}') != -1) {
								child_CN_TW.appendChild(SpecialNameobj[0].parentNode);
							} else {
								// jQuery("#log_body")[0].innerHTML +=
								// 	"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
								// 	"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置国籍不能取消! ' + profileID + '  ' + SpecialName + "</a><br>";
								// continue;
							}
						} else if (nicknameObj.length == 0) {
							//console.log("获取到的是steam名称");
							// steamName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("\n")); //提取steam名称
							// jQuery("#log_body")[0].innerHTML +=
							// 	"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
							// 	"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有备注不能取消! ' + profileID + '  ' + steamName + "</a><br>";
							// continue;
						}
					}
				}
				//console.log("[Debug] name:", name);
			}
			GroupMode = 1;
		}
	
	});
	
	await jQuery("#OfflineTimeGroup").click(async function() {
		var SpecialName = undefined;
		var steamName = undefined;
		var name = undefined;
		var mode = 0;
		const total = jQuery("#search_results .selectable.offline").length; //选择的朋友总数
		if (total > 0) //选择的朋友总数
		{
			jQuery("#log_head, #log_body").html("");
			var jqobj = jQuery("#search_results .selectable.offline"); //选择离线的好友
			var ArrOfflineTime = [];
	
			if (GroupMode != 2) {
				var mainFriendObj;
				if (GroupMode == 1) { //节点已经被模式1处理过
					//备份和处理
					if (document.getElementById("search_results2") == null) { //没有被模式2处理过
						mainFriendObj = document.getElementById("search_results0"); //获取原节点
						var newCopyObj = mainFriendObj.cloneNode(true);
						var mainFriendObj1 = document.getElementById("search_results"); //获取之前模式的节点
						mainFriendObj1.style.display = "none"; //之前模式的节点隐藏
						mainFriendObj1.id = "search_results1"; //之前模式的节点
						mainFriendObj1.className = "profile_friends search_results1"; //之前模式的节点
						newCopyObj.style.display = ""; //克隆的原节点取消隐藏(显示)
						newCopyObj.id = "search_results"; //克隆的原节点
						newCopyObj.className = "profile_friends search_results"; //克隆的原节点
						mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
					} else { //被模式2处理过
						var obj = document.getElementById("search_results2");
						var mainFriendObj1 = document.getElementById("search_results"); //获取之前模式的节点
						mainFriendObj = document.getElementById("search_results0"); //获取原节点
						mainFriendObj1.style.display = "none"; //之前模式的节点隐藏
						mainFriendObj1.id = "search_results1"; //之前模式的节点
						mainFriendObj1.className = "profile_friends search_results1"; //之前模式的节点
						obj.style.display = ""; //取消隐藏(显示)
						obj.id = "search_results"; //节点
						obj.className = "profile_friends search_results"; //节点
					}
				} else { //节点还没有被动过
					//备份和处理
					mainFriendObj = document.getElementById("search_results"); //获取原节点
					var newCopyObj = mainFriendObj.cloneNode(true);
					newCopyObj.style.display = "none"; //克隆的原节点隐藏
					newCopyObj.id = "search_results0"; //克隆的原节点
					newCopyObj.className = "profile_friends search_results0"; //克隆的原节点
					mainFriendObj.parentNode.appendChild(newCopyObj); //再添加一个新的备份节点
	
	
				}
	
				var StateObj = mainFriendObj.getElementsByClassName("state_block");
				for (let i = 0; i < StateObj.length; i++) {
					StateObj[i].style.display = "none"; //隐藏状态条
				}
				//创建新盒子和克隆分组节点
				console.log("开始分组...");
				child_Offline = document.createElement('div'); //创建
				child_Offline.id = "Firend_Offline";
				child_Offline.style.display = "flex";
				child_Offline.style.flex = "1 100%";
				child_Offline.style.flexFlow = "row wrap";
				child_Offline.style.margin = "8px 0px 0px 0px";
				// child_Offline.style.justifyContent = "space-start";
				mainFriendObj.appendChild(child_Offline);
	
				child_Online = child_Offline.cloneNode(true); //克隆
				child_Online.id = "Firend_Online";
				mainFriendObj.appendChild(child_Online);
	
				child_InGame = child_Offline.cloneNode(true); //克隆
				child_InGame.id = "Firend_InGame";
				mainFriendObj.appendChild(child_InGame);
	
				//-------------------------------------------------
	
				var newGroupTitle = StateObj[0].cloneNode(true); //克隆
				newGroupTitle.style.display = ""; //去除隐藏样式
				newGroupTitle.innerText = "Offline";
				child_Offline.appendChild(newGroupTitle);
	
				newGroupTitle = newGroupTitle.cloneNode(true); //克隆
				newGroupTitle.innerText = "Online";
				child_Online.appendChild(newGroupTitle);
	
				newGroupTitle = newGroupTitle.cloneNode(true); //克隆
				newGroupTitle.innerText = "InGame";
				child_InGame.appendChild(newGroupTitle);
	
				for (let i = 0; i < jqobj.length; i++) {
					let cur = jqobj.get(i);
					let profileID = cur.getAttribute("data-steamid");
					//--------------------------------------------------------------------
					SpecialName = undefined;
					steamName = undefined;
	
					if (document.URL.indexOf("/friends") == -1) { //如果是在个人资料页面
						//获取备注
						var SpecialNameobj = document.getElementsByClassName("nickname"); //nickname
						SpecialName = undefined;
						if (SpecialNameobj != "undefined") {
							SpecialName = SpecialNameobj[0].innerText; //备注
						}
						//获取steam名称
						steamName = document.getElementsByClassName("actual_persona_name")[0].innerText; //steam名称
						name = steamName;
					} else //否则如果是好友界面
					{
						//获取名称,然后判断是备注还是steam名称
						var SpecialNameobj = cur.getElementsByClassName("friend_block_content");
						var nicknameObj = cur.getElementsByClassName("player_nickname_hint");
						SpecialName = undefined;
	
						var OfflineTime = SpecialNameobj[0].getElementsByClassName("friend_last_online_text");
						var strOfflineTime = "";
	
						var nYear = "0",
							nMonth = "0",
							nDay = "0",
							nHours = "0",
							nMinutes = "0",
							nSeconds = "0";
						var strData = "";
						if (OfflineTime.length > 0) //找到了
						{
							strOfflineTime = OfflineTime[0].innerText.slice(5); //去掉‘上次在线’字符串
							var strOfflineTimeArr = strOfflineTime.split(' ');
							strOfflineTimeArr[strOfflineTimeArr.length - 1] = strOfflineTimeArr[strOfflineTimeArr.length - 1].slice(0,
								-1); //去掉最后的‘前’字符串
							//console.log("strOfflineTime",strOfflineTime,strOfflineTimeArr);
							for (let i = 0; i < strOfflineTimeArr.length; i += 2) {
								if (strOfflineTimeArr[i + 1] == "年")
									nYear = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "月")
									nMonth = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "天")
									nDay = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "小时")
									nHours = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "分钟")
									nMinutes = strOfflineTimeArr[i];
								else if (strOfflineTimeArr[i + 1] == "秒")
									nSeconds = strOfflineTimeArr[i];
							}
							strData = nYear + '/' + nMonth + '/' + nDay + ' ' + nHours + ':' + nMinutes + ':' + nSeconds;
							//console.info("strData",strData);
	
							var hzWeek = new Array("日", "一", "二", "三", "四", "五", "六", "日");
	
							function cweekday(wday) {
								return hzWeek[wday];
							}
	
							function calaDay() { //计算时间差: 一个是当前时间，一个是相差的时间，就都转为秒数进行相减，再还原时间
								var date = new Date();
								ddd = parseInt(nDay); //转数字后取对应负数
								//ttt = new Date(y, m - 1, d).getTime() + ddd * 24000 * 3600;
								ttt = date.getTime() + ~(ddd * 86400);
								theday = new Date();
								theday.setTime(ttt);
								//document.getElementById("result1").innerHTML = theday.getFullYear() + "年" + (1 + theday.getMonth()) + "月" + theday.getDate() + "日" + "星期" + cweekday(theday.getDay());
								return theday.getTime(); //获取对应的时间戳
							}
							
							function calbHMS() { //计算时间差: 一个是当前时间，一个是相差的时间，就都转为秒数进行相减，再还原时间
								var date = new Date();
								var date1 = new Date();
								var s = nHours * 3600 + nMinutes * 60 + nSeconds;
								// y2 = date.getYear();
								// m2 = date.getMonth();
								// d2 = date.getDay();
								date1.setTime(date.getTime() + ~s);
								// y3 = document.getElementById("SY3").value;
								// m3 = document.getElementById("SM3").value;
								// d3 = document.getElementById("SD3").value;
								// day2 = new Date(y2, m2 - 1, d2);
								// day3 = new Date(y3, m3 - 1, d3);
								//document.getElementById("result2").innerHTML = (day3 - day2) / 86400000;
								return date1.getTime();
							}
	
							var nS = 0;
							if (nDay > 0) {
								nS = calaDay()
								//console.log("calaDay(nDay):",nS);
							} else {
								nS = calbHMS()
								//console.log("calbHMS()",nS);
							}
							ArrOfflineTime.push([nS, i]);
						}
	
	
						//SpecialName = SpecialNameobj[0].innerText.slice(0, SpecialNameobj[0].innerText.indexOf("*")); //提取备注
						//创建离线区和在线区
	
						//遍历所有的好友,找到离线的好友,解析字符串,装入Date对象 //6个数字指定年、月、日、小时、分钟、秒(0)  //没有的就写0
						//获取毫秒数 dateObject.getTime()   或者用   Date.parse(datestring)
						// var d=new Date("5/05/11 1:10:0");
						// document.write("从 1970/01/01 至今已有：" + d.getTime() + " 毫秒。");
						// document.write("从 1970/01/01 至今已有：" + Date.parse("5/05/11 1:10:0") + " 毫秒。");
	
						//存储在二维数组里，一个是毫秒数，一个是数组下标
						//对秒数进行升序排序，然后取下标，对指定好友依次添加
					}
					//console.log("[Debug] name:", name);
				} //for
				
				//console.log(ArrOfflineTime);
				ArrOfflineTime.sort(function(a, b) {
					if (a[0] > b[0])
						return 1;
					if (a[0] < b[0])
						return -1;
					return 0;
				}); //对时间戳排序
				//console.log(ArrOfflineTime);
	
				//遍历二维数组，然后取下标，对指定好友依次添加
				for (let i = 0; i < ArrOfflineTime.length; i++) {
					child_Offline.appendChild(jqobj[ArrOfflineTime[i][1]]); //.getElementsByClassName("friend_block_content").parentNode
				}
				//将游戏中和在线的好友也添加到分组里
				var jqobj1 = jQuery("#search_results .selectable.online"); //选择在线的好友
				var jqobj2 = jQuery("#search_results .selectable.in-game"); //选择游戏中的好友
				var jqobj3 = jQuery("#search_results .selectable.golden"); //选择金色的好友
				for (let i = 0; i < jqobj3.length; i++) {
					var strGame = jqobj3[i].getElementsByClassName("friend_small_text")[0].innerText;
					var game = strGame.replace(/^\s+|\s+$/g, ""); //去除两边的空格
					//console.log("strGame");
					if (game == "") {
						//console.log("在线");
						child_Online.appendChild(jqobj3[i]);
					} else {
						//console.log(game);
						child_InGame.appendChild(jqobj3[i]);
					}
				}
				for (let i = 0; i < jqobj1.length; i++) {
					child_Online.appendChild(jqobj1[i]);
				}
				for (let i = 0; i < jqobj2.length; i++) {
					child_InGame.appendChild(jqobj2[i]);
				}
				GroupMode = 2;
			}
		}
	});
	await jQuery("#ShowFriendData").click(async function() {
		traverseAllFriend(); //遍历所有好友
	
	});
}