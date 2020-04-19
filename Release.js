// ==UserScript==
// @name         Steam assistant(Steam小助手)
// @description  WEB端Steam小助手，集合多种功能如Steam批量留言,点赞,好友管理,喜加一...，佛系更新中...欢迎提出您的建议或者共同学习交流
// @namespace    https://www.tampermonkey.net/2222222222222222222222222222
// @namespace    https://greasyfork.org/
// @namespace    Steam Tampermonkey Script
// @icon         http://store.steampowered.com/favicon.ico
// @icon64       http://store.steampowered.com/favicon.ico
// @version      1.2.3.0
// @require      https://cdnjs.cloudflare.com/ajax/libs/echarts/4.3.0/echarts.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js
// @author       Miku39
// @updateURL    https://greasyfork.org/zh-CN/scripts/397073
// @supportURL   https://steamcommunity.com/sharedfiles/filedetails/?id=1993903275
// @include      /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?$/
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @connect      www.deepl.com
// @connect      api.deepl.com
// @connect      translate.google.cn
// @connect      translate.google.com
// @connect      fanyi.baidu.com
// @connect      api.fanyi.baidu.com  //百度通用翻译API HTTP   http://fanyi-api.baidu.com/api/trans/product/prodinfo#0
// @connect      fanyi-api.baidu.com  //百度通用翻译API HTTPS  https://blog.csdn.net/dianfu2892/article/details/101467066
// @connect      fanyi.youdao.com
// @connect      fanyi.so.com
// @connect      fanyi.qq.com
// @connect      fanyi.sogou.com
// @connect      cn.bing.com  //https://cn.bing.com/translator/
// @connect      hjdict.com   //http://www.hjdict.com/app/trans
// @connect      fanyi.dict.cn
// @connect      brushes8.com
// @connect      api.help.bj.cn
// @connect      api.avatardata.cn  //https://www.avatardata.cn/Docs
// @connect      route.showapi.com  //会员/免费 https://www.showapi.com/api/apiList
// @connect      zhaiyan.2cys.com   //宅言API-动漫台词接口 https://www.kancloud.cn/acman/zhaiyanapi/31183
// @connect      api.dongmanxingkong.com  //https://api.dongmanxingkong.com/
// @connect      api.pingcc.cn            //http://api.pingcc.cn/
// @connect      www.dmoe.cc              //http://www.dmoe.cc/
// @connect      api.mz-moe.cn            //https://mz-moe.cn/?p=23
// @connect      www.layuicdn.com
// @noframes
// @run-at document-idle
// ==/UserScript==

var delay = 4; // 设置你的留言时间间隔,单位秒
var strNoOperate = "(不留言)"; //设置你的不留言的标识符: 如果不需要留言,则需在备注中添加这个不留言的标识符
var strRemarkPlaceholder = "{name}"; //设置你的称呼占位符: 同上

//-------------------------------------------------------------------------------------------------------------
// 实用函数集
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function opinion() { //判断页面是pc端还是移动端
	if ((navigator.userAgent.match(
			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		))) {
		return 1; //移动端
	} else {
		return 0; //pc端
	}
}

function JSON_processing_parsing_JsObj(jsonText){ //JSON处理并解析到js对象
	var JSON_jsObj;
	if (jsonText == "")
		return;

	//console.log("待处理数据:");
	//console.log(jsonText);
	JSON_jsObj = JSON.parse(jsonText);
	console.log("解析后数据:");
	console.log(JSON_jsObj);
	return JSON_jsObj;
}


function addNewStyle(id, newStyle) {
	var styleElement = document.getElementById(id);

	if (!styleElement) {
		styleElement = document.createElement('style');
		styleElement.type = 'text/css';
		styleElement.id = id;
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newStyle));
}

function addNewScript(id, newScript) {
	var styleElement = document.getElementById(id);

	if (!styleElement) {
		styleElement = document.createElement('script');
		styleElement.type = 'text/javascript';
		styleElement.id = id;
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	styleElement.appendChild(document.createTextNode(newScript));
}

function loadjscssFile(filePath, filetype) { //动态加载一个js/css文件
	if (filetype == "js") {
		var fileref = document.createElement('script')
		fileref.setAttribute("type", "text/javascript")
		fileref.setAttribute("src", filePath)
	} else if (filetype == "css") {
		var fileref = document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filePath)
	}

	if (typeof fileref != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref); //向元素添加新的子节点，作为最后一个子节点
	}
}

function loadjscssFile_media(filePath,id, filetype) { //动态加载一个js/css文件
	if (filetype == "js") {
		var fileref = document.createElement('script')
		fileref.setAttribute("type", "text/javascript")
		fileref.setAttribute("src", filePath)
	} else if (filetype == "css") {
		var fileref = document.createElement("link")
		if(id != "" || id != null || id != undefined){
			fileref.setAttribute("id", id)
		}
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filePath)
		fileref.setAttribute("media", "all")
	}

	if (typeof fileref != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref); //向元素添加新的子节点，作为最后一个子节点
	}
}

async function getResourceByURL(resourceURL){ //获取URL对应的资源数据
	var retData;
	var waitStatus = true;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: resourceURL,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
			//'Accept': 'application/atom+xml,application/xml,text/xml',
			//"Content-Type": "application/x-www-form-urlencoded",
		},
		onload: function(response) {
			if (response.status === 200) {
				console.log('getResourceByURL()请求成功!');
				
				retData = response.responseText;
				
				//returnData = ; //存储数据
				waitStatus = false; //不等待
			} else {
				console.log('getResourceByURL()请求失败!');
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('getResourceByURL()请求错误!', err);
		}
	});
	
	while (waitStatus) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	//console.log(retData);
	return retData;
}

async function getResourceByURL_Test(resourceURL){ //获取URL对应的资源数据
	var retData;
	var waitStatus = true;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: resourceURL,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
			//'Accept': 'application/atom+xml,application/xml,text/xml',
			//"Content-Type": "application/x-www-form-urlencoded",
			"Host": "steamcommunity.com",
			"Referer": "https://steamcommunity.com/id/miku-39/",
			"Cookie": document.cookie,
		},
		onload: function(response) {
			if (response.status === 200) {
				console.log('getResourceByURL()请求成功!');
				
				retData = response.responseText;
				
				//returnData = ; //存储数据
				waitStatus = false; //不等待
			} else {
				console.log('getResourceByURL()请求失败!');
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('getResourceByURL()请求错误!', err);
		}
	});
	
	while (waitStatus) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	//console.log(retData);
	return retData;
}



async function getResourceByURL_Test1(resourceURL) {
	var retData;
	var waitStatus = true;
	
	jQuery.ajax({
		type: "Get", //请求方式
		//async: false,
		//contentType: "application/json;charset=UTF-8",//请求的媒体类型
		url: resourceURL, //请求地址
		// headers: {
		// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
		// 	//'Accept': 'application/atom+xml,application/xml,text/xml',
		// 	//"Content-Type": "application/x-www-form-urlencoded",
		// },
		//data: JSON.stringify(list),				//数据，json字符串
		success: function(result) { //请求成功
			retData = result;
			console.log("请求成功了!",retData);
			//let nIstart = Data.indexOf('StartTradeOffer(');
			//let nIend = Data.indexOf(');', nIstart);
			//let AccountID = Data.slice(nIstart + 'StartTradeOffer('.length + 1, nIend - 1);
			//nIstart = Data.indexOf('"steamid":"');
			//nIend = Data.indexOf('",', nIstart);
			//let profileID = Data.slice(nIstart + '"steamid":"'.length, nIend);
			//console.log("getgetProfilesID() i:", i, "AccountID:", AccountID, "profileID:", profileID);

			// for (let i = 0; i < waitStatus1.length; i++) {
			// 	if (waitStatus1[i][0] == profileID) //是否是同一个用户
			// 	{
			// 		if (waitStatus1[i][1] == false) //这个用户是否已经获取过了(测试多个相同用户信息的获取)
			// 			continue;
			// 		waitStatus1[i][1] = false;
			// 		//returnData1.push(AccountID); //存储数据
			// 		returnData1[i] = AccountID; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
			// 		//console.log("getgetProfilesID() 成功存储数据 AccountID:",AccountID);
			// 		return;
			// 		//console.log("waitStatus1[i][1] break",i,waitStatus1[i][1]);
			// 	}
			// }
			// console.log("getgetProfilesID 数据错误!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			// console.log("waitStatus1:", waitStatus1, 'returnData1:', returnData1);
			// console.log('profileID:', profileID, 'AccountID:', AccountID);
			return;
			//console.log("DBG!",nIstart,nIend);
		},
		error: function(e) { //请求失败，包含具体的错误信息
			console.log("请求失败了!", e.status);
			console.log("请求失败了!", e.responseText);
		}
	});
	//console.log("getgetProfilesID() i:",i,"waitStatus1:",waitStatus1);
	while (waitStatus) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(50); //延迟0.1秒
	}
	//console.log("waitStatus1[i][1]:",waitStatus1[i][1],"returnData1[i]:",returnData1[i]);
	return retData;

	// jQuery.get(URL, {
	// 	// "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	// 	// // "Content-Type": "application/x-www-form-urlencoded", //非常重要
	// 	// "Accept-Encoding": "gzip, deflate, br",
	// 	// "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
	// 	// "Cache-Control": "max-age=0",
	// 	// "Connection": "keep-alive",
	// 	// "Cookie": "sessionid=6f84a0f48cddb56ad66394b6; steamCountry=HK%7Cda7daa2682f7a361e594f8dad55fe9df; timezoneOffset=28800,0",
	// 	// "Host": "steamcommunity.com",
	// 	// "Upgrade-Insecure-Requests": "1",
	// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
	// }, function(response) {
	// 	if (response.status === 200) {
	// 		console.log("获取失败!",response.responseText);
	// 	} else {
	// 		console.log("获取成功!",response.responseText);
	// 	}
	// }).fail(function() {
	// 	console.log("无法获取!");
	// }).always(function() {
	// 	//console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
	// });


	// GM_xmlhttpRequest({
	// 	method: 'GET',
	// 	url: URL,
	// 	headers: {
	// 		'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
	// 		//'Accept': 'application/atom+xml,application/xml,text/xml',
	// 		//"Content-Type": "application/x-www-form-urlencoded",
	// 	},
	// 	onload: function(response) {
	// 		if (response.status === 200) {
	// 			console.log('请求成功!',response.responseText);
	// 			//var JSON_jsObj = JSON_processing_parsing_JsObj(response.responseText);
	// 			//遍历[0][0]数组就可以取得翻译后的文本,原始数据,原始数据的拼音
	// 			//[2]是检查出的语言
	// 			//遍历[5]可以取得两种翻译,原始数据和原始数据的长度
	// 			//遍历[8]可以得到原始语言和翻译语言
	// 			//for (var i = 0; i < JSON_jsObj.length; i++) {
	// 			//	for (var j = 0; j < JSON_jsObj[i].length; j++) {
	// 			//		for (var k = 0; k < JSON_jsObj[i][j].length; k++) {
	// 			//			
	// 			//		}
	// 			//	}
	// 			//}
	// 			//var retData = "";
	// 			//for (var j = 0; j < JSON_jsObj[0].length; j++) {
	// 			//	if (JSON_jsObj[0][j][0] != null) {
	// 			//		retData += JSON_jsObj[0][j][0]; //组合每一句翻译
	// 			//	}
	// 			//}
	// 			returnData = retData; //存储数据
	// 			//console.log('谷歌翻译:',retData);
	// 			waitStatus = false; //不等待

	// 			//console.log(response);
	// 			//console.log(response.responseText);
	// 			//if(response.responseText.indexOf('[[["') == 0) //是否是指定的数据格式
	// 			//{
	// 			//	var retData = response.responseText.slice(4,response.responseText.indexOf('","',4)); //提取翻译后的文本
	// 			//	returnData = retData; //存储数据
	// 			//	//console.log('谷歌翻译:',retData);
	// 			//	waitStatus = false; //不等待
	// 			//}
	// 		} else {
	// 			console.log('请求失败!');
	// 			//console.log(response);
	// 			//console.log(response.responseText);
	// 		}
	// 	},
	// 	onerror: function(err) {
	// 		console.log('请求错误!', err);
	// 	}
	// });
}

//-------------------------------------------------------------------------------------------------------------
// 多选下拉框
(function($) {
	$.fn.ySelect = function(options) {
		var defaultOptions = {
			placeholder: '请选择',
			numDisplayed: 4,
			overflowText: '{n} selected',
			searchText: '搜索',
			showSearch: true
		}
		if (typeof options == 'string') {
			var settings = options;
		} else {
			var settings = $.extend(true, {}, defaultOptions, options);
		}

		function ySelect(select, settings) {
			this.$select = $(select);
			this.settings = settings;
			this.create();
		}
		ySelect.prototype = {
			create: function() {
				var multiple = this.$select.is('[multiple]') ? ' multiple' : '';
				this.$select.wrap('<div class="fs-wrap' + multiple + '"></div>');
				this.$select.before('<div class="fs-label-wrap"><div class="fs-label">' + this.settings.placeholder +
					'</div><span class="fs-arrow"></span></div>');
				this.$select.before('<div class="fs-dropdown hidden"><div class="fs-options"></div></div>');
				this.$select.addClass('hidden');
				this.$wrap = this.$select.closest('.fs-wrap');
				this.reload();
			},
			reload: function() {
				if (this.settings.showSearch) {
					var search = '<div class="fs-search"><input type="search" placeholder="' + this.settings.searchText +
						'" /><span class="fs-selectAll"><i class="fa fa-check-square-o"></i></span></div>';
					this.$wrap.find('.fs-dropdown').prepend(search);
				}
				var choices = this.buildOptions(this.$select);
				this.$wrap.find('.fs-options').html(choices);
				this.reloadDropdownLabel();
			},
			destroy: function() {
				this.$wrap.find('.fs-label-wrap').remove();
				this.$wrap.find('.fs-dropdown').remove();
				this.$select.unwrap().removeClass('hidden');
			},
			buildOptions: function($element) {
				var $this = this;
				var choices = '';
				$element.children().each(function(i, el) {
					var $el = $(el);
					if ('optgroup' == $el.prop('nodeName').toLowerCase()) {
						choices += '<div class="fs-optgroup">';
						choices += '<div class="fs-optgroup-label">' + $el.prop('label') + '</div>';
						choices += $this.buildOptions($el);
						choices += '</div>';
					} else {
						var selected = $el.is('[selected]') ? ' selected' : '';
						choices += '<div class="fs-option' + selected + '" data-value="' + $el.prop('value') +
							'"><span class="fs-checkbox"><i></i></span><div class="fs-option-label">' + $el.html() + '</div></div>';
					}
				});
				return choices;
			},
			reloadDropdownLabel: function() {
				var settings = this.settings;
				var labelText = [];
				this.$wrap.find('.fs-option.selected').each(function(i, el) {
					labelText.push($(el).find('.fs-option-label').text());
				});
				if (labelText.length < 1) {
					labelText = settings.placeholder;
				} else if (labelText.length > settings.numDisplayed) {
					labelText = settings.overflowText.replace('{n}', labelText.length);
				} else {
					labelText = labelText.join(', ');
				}
				this.$wrap.find('.fs-label').html(labelText);
				this.$select.change();
			},
			setwrap: function() {
				return "123";
			},
		}
		return this.each(function() {
			var data = $(this).data('ySelect');
			if (!data) {
				data = new ySelect(this, settings);
				$(this).data('ySelect', data);
			}
			if (typeof settings == 'string') {
				data[settings]();
			}
		});
	}
	window.ySelect = {
		'active': null,
		'idx': -1
	};

	function setIndexes($wrap) {
		$wrap.find('.fs-option:not(.hidden)').each(function(i, el) {
			$(el).attr('data-index', i);
			$wrap.find('.fs-option').removeClass('hl');
		});
		$wrap.find('.fs-search input').focus();
		window.ySelect.idx = -1;
	}

	function setScroll($wrap) {
		var $container = $wrap.find('.fs-options');
		var $selected = $wrap.find('.fs-option.hl');
		var itemMin = $selected.offset().top + $container.scrollTop();
		var itemMax = itemMin + $selected.outerHeight();
		var containerMin = $container.offset().top + $container.scrollTop();
		var containerMax = containerMin + $container.outerHeight();
		if (itemMax > containerMax) {
			var to = $container.scrollTop() + itemMax - containerMax;
			$container.scrollTop(to);
		} else if (itemMin < containerMin) {
			var to = $container.scrollTop() - containerMin - itemMin;
			$container.scrollTop(to);
		}
	}
	$(document).on('click', '.fs-selectAll', function() {
		$(this).parent().next().find('.fs-option.selected').click();
		$(this).parent().next().find('.fs-option').click();
		$(this).addClass('selected');
	});
	$(document).on('click', '.fs-selectAll.selected', function() {
		$(this).parent().next().find('.fs-option.selected').click();
		$(this).removeClass('selected');
	});
	$(document).on('click', '.fs-option', function() {
		var $wrap = $(this).closest('.fs-wrap');
		if ($wrap.hasClass('multiple')) {
			var selected = [];
			$(this).toggleClass('selected');
			$wrap.find('.fs-option.selected').each(function(i, el) {
				selected.push($(el).attr('data-value'));
			});
		} else {
			var selected = $(this).attr('data-value');
			$wrap.find('.fs-option').removeClass('selected');
			$(this).addClass('selected');
			$wrap.find('.fs-dropdown').hide();
		}
		$wrap.find('select').val(selected);
		$wrap.find('select').ySelect('reloadDropdownLabel');
		$wrap.find('select').ySelect('setwrap');
	});
	$(document).on('keyup', '.fs-search input', function(e) {
		if (40 == e.which) {
			$(this).blur();
			return;
		}
		var $wrap = $(this).closest('.fs-wrap');
		var keywords = $(this).val();
		$wrap.find('.fs-option, .fs-optgroup-label').removeClass('hidden');
		if ('' != keywords) {
			$wrap.find('.fs-option').each(function() {
				var regex = new RegExp(keywords, 'gi');
				if (null === $(this).find('.fs-option-label').text().match(regex)) {
					$(this).addClass('hidden');
				}
			});
			$wrap.find('.fs-optgroup-label').each(function() {
				var num_visible = $(this).closest('.fs-optgroup').find('.fs-option:not(.hidden)').length;
				if (num_visible < 1) {
					$(this).addClass('hidden');
				}
			});
		}
		setIndexes($wrap);
	});
	$(document).on('click', function(e) {
		var $el = $(e.target);
		var $wrap = $el.closest('.fs-wrap');
		if (0 < $wrap.length) {
			if ($el.hasClass('fs-label') || $el.hasClass('fs-arrow')) {
				window.ySelect.active = $wrap;
				var is_hidden = $wrap.find('.fs-dropdown').hasClass('hidden');
				$('.fs-dropdown').addClass('hidden');
				if (is_hidden) {
					$wrap.find('.fs-dropdown').removeClass('hidden');
				} else {
					$wrap.find('.fs-dropdown').addClass('hidden');
				}
				setIndexes($wrap);
			}
		} else {
			$('.fs-dropdown').addClass('hidden');
			window.ySelect.active = null;
		}
	});
	$(document).on('keydown', function(e) {
		var $wrap = window.ySelect.active;
		if (null === $wrap) {
			return;
		} else if (38 == e.which) {
			e.preventDefault();
			$wrap.find('.fs-option').removeClass('hl');
			if (window.ySelect.idx > 0) {
				window.ySelect.idx--;
				$wrap.find('.fs-option[data-index=' + window.ySelect.idx + ']').addClass('hl');
				setScroll($wrap);
			} else {
				window.ySelect.idx = -1;
				$wrap.find('.fs-search input').focus();
			}
		} else if (40 == e.which) {
			e.preventDefault();
			var last_index = $wrap.find('.fs-option:last').attr('data-index');
			if (window.ySelect.idx < parseInt(last_index)) {
				window.ySelect.idx++;
				$wrap.find('.fs-option').removeClass('hl');
				$wrap.find('.fs-option[data-index=' + window.ySelect.idx + ']').addClass('hl');
				setScroll($wrap);
			}
		} else if (32 == e.which || 13 == e.which) {
			$wrap.find('.fs-option.hl').click();
		} else if (27 == e.which) {
			$('.fs-dropdown').addClass('hidden');
			window.ySelect.active = null;
		}
	});
	$.fn.ySelectedValues = function(splitString) {
		var result = "";
		var $selects = this.find("option:selected");
		for (var i = 0; i < $selects.length; i++) {
			result += $selects[i].value + ((i == $selects.length - 1) ? "" : splitString);
		}
		return result;
	}
	$.fn.ySelectedTexts = function(splitString) {
		var result = "";
		var $selects = this.find("option:selected");
		for (var i = 0; i < $selects.length; i++) {
			result += $selects[i].text + ((i == $selects.length - 1) ? "" : splitString);
		}
		return result;
	}
})(jQuery);
//-------------------------------------------------------------------------------------------------------------
function WriteLog() {
	// eslint-disable-next-line no-console
	console.log('%c[SteamDB]%c', 'color:#2196F3; font-weight:bold;', '', ...arguments);
}
//console.log("%c百度2020校园招聘简历提交：http://dwz.cn/XpoFdepe", "color:red"))
//color:#00a1d6

//-------------------------------------------------------------------------------------------------------------
//Arguments实用函数
class Arguments {
	static getArgumentsAllValue(argumentsObj) { //解析函数的参数并进行合并为字符串
		let str = "";
		for (let i = 0; i < argumentsObj.length; i++) {
			str += argumentsObj[i] + " ";
		}
		return str;
	}
	static getArgumentsAllValue_noFunction(argumentsObj) { //解析函数的参数并进行合并为字符串
		let str = "";
		for (let i = 0; i < argumentsObj.length; i++) {
			if (typeof argumentsObj[i] == 'function') { //如果是函数则跳过
				continue;
			}
			str += argumentsObj[i] + " ";
		}
		return str;
	}
	static getArgumentsAllValueByDebug(argumentsObj) { //解析函数的参数并进行合并为字符串 //返回数组[track,str]
		let str = "";
		let track = "";
		console.log(arguments);
		//console.log(arguments.callee.name);
		for (let i = 0; i < argumentsObj.length; i++) {
			if (typeof argumentsObj[i] == 'number') { //如果是数字则转为字符串
				//argumentsObj[i] = argumentsObj[i].toString();
				str += argumentsObj[i] + " ";
				continue;
			}
			let s = argumentsObj[i].match(/\s*[A-Za-z\$\_][A-Za-z\$\_\.0-9]+\s*\(/);
			if (s != null) {
				if (null != s[0]) { //提取出' 函数名 ('这样的字符串
					track = s[0].slice(0, -1); //去掉最后的(，得到函数名
					let s1 = argumentsObj[i].replace(/\s*[A-Za-z\$\_][A-Za-z\$\_\.0-9]+\s*\(/, ""); //从字符串中删除函数名，然后剩下的部分
					str += s1.slice(1, s1.length) + " "; //去掉最前面的)，得到提示信息
					continue;
				}
			}
			str += argumentsObj[i] + " ";
		}
		return [track, str];
	}
}

//-------------------------------------------------------------------------------------------------------------
//调试类
class Log {
	constructor(moduleName, isDEBUG = true) { /*构造方法(模块名称,调试状态)*/ //默认开启调试
		this.m_moduleNamel = moduleName; //设置模块名称
		this.isDEBUG = isDEBUG; //设置调试状态
	}
	setDebugStatus(isDEBUG) { //设置调试状态(调试状态) //控制是否进行调试输出
		this.isDEBUG = isDEBUG;
	}
	clear() { //清除控制台输出
		console.clear();
	}
	test(strTestInfo) { //用于对Log类进行输出测试
		if (strTestInfo == undefined)
			strTestInfo = "默认测试内容";
		log.out("模块名称:", this.m_moduleNamel);
		log.out("是否开启调试:", this.isDEBUG);
		log.debug(strTestInfo);
		log.info(strTestInfo);
		log.warn(strTestInfo);
		log.error(strTestInfo);
		log.fatal(strTestInfo);
	}
	out(strLog) { //直接输出，不受调试状态的影响
		console.log('%c[' + this.m_moduleNamel + ' out]%c' + Arguments.getArgumentsAllValue(arguments),
			'color:#000000; font-weight:bold;', 'color:#000000;');
	}
	//两种版本
	//log.debug("getArgumentsAllValueByDebug() 111");
	//log.debug(getArgumentsAllValueByDebug,"111");
	debug($funcName, $strDebugInfo) {
		//var This = this;
		//debugger;
		let fontStyle =
			'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
		let titleStyle = 'padding: 2px 6px; border-radius: 3px 0 0 3px; background: #606060;color: #fff;' + fontStyle;
		let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #1475b2;color: #fff;' + fontStyle;
		let arr;
		if (typeof $funcName == 'function') { //
			if (this.isDEBUG) {
				debugger;
				console.log($funcName);
				$funcName = '.' + $funcName.name;

				arr = Arguments.getArgumentsAllValue_noFunction(arguments);
				console.log('%c[' + this.m_moduleNamel + ' Debug-B]%c' + $funcName + '%c' + arr,
					'color:#2196F3; font-weight:bold;', titleStyle, contentStyle);
			}
		} else {
			if (this.isDEBUG) {
				arr = Arguments.getArgumentsAllValueByDebug(arguments);
				console.log('%c[' + this.m_moduleNamel + ' Debug-A]%c' + arr[0] + '%c' + arr[1],
					'color:#2196F3; font-weight:bold;', titleStyle, contentStyle);
			}
		}
	}
	info($strLogInfo) {
		if (this.isDEBUG) {
			let fontStyle =
				'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
			let titleStyle = 'padding: 2px 6px; border-radius: 3px 0 0 3px; background: #606060;color: #fff;' + fontStyle;
			let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #42c02e;color: #fff;' + fontStyle;
			let arr = Arguments.getArgumentsAllValueByDebug(arguments);

			console.log('%c[' + this.m_moduleNamel + ' Info]%c' + arr[0] + '%c' + arr[1], 'color:#00edc3; font-weight:bold;',
				titleStyle, contentStyle);
		}
	}
	warn($strWarnInfo) {
		if (this.isDEBUG) {
			let fontStyle =
				'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
			let titleStyle = 'padding: 2px 6px; border-radius: 3px 0 0 3px; background: #606060;color: #fff;' + fontStyle;
			let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #ff7800;color: #fff;' + fontStyle;
			let arr = Arguments.getArgumentsAllValueByDebug(arguments);

			console.log('%c[' + this.m_moduleNamel + ' Warn]%c' + arr[0] + '%c' + arr[1], 'color:#ffa800; font-weight:bold;',
				titleStyle, contentStyle);
		}
	}
	error($strErrInfo) {
		if (this.isDEBUG) {
			let fontStyle =
				'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
			let titleStyle = 'padding: 2px 6px; border-radius: 3px 0 0 3px; background: #606060;color: #fff;' + fontStyle;
			let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #ff00a2;color: #fff;' + fontStyle;
			let arr = Arguments.getArgumentsAllValueByDebug(arguments);

			console.trace('%c[' + this.m_moduleNamel + ' Error]%c' + arr[0] + '%c' + arr[1], 'color:#ff00c0; font-weight:bold;',
				titleStyle, contentStyle);
		}
	}
	fatal($strFatalInfo) {
		if (this.isDEBUG) {
			let fontStyle =
				'font-family:-apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;';
			let titleStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #606060;color: #fff;' + fontStyle;
			let contentStyle = 'padding: 2px 6px; border-radius: 0 3px 3px 0; background: #ff5252;color: #fff;' + fontStyle;
			let arr = Arguments.getArgumentsAllValueByDebug(arguments);

			console.trace('%c[' + this.m_moduleNamel + ' Fatal]%c' + arr[0] + '%c' + arr[1], 'color:#ff0000; font-weight:bold;',
				titleStyle, contentStyle);
		}
	}
}
var log = new Log("Sophie");
//log.test("Arguments.getArgumentsAllValueByDebug() successed!");
//log.debug("Arguments.getArgumentsAllValueByDebug() 111");
//log.debug(Arguments.getArgumentsAllValueByDebug, "111");
//-------------------------------------------------------------------------------------------------------------
// 翻译API
/*-------------------------------------------------*/
var b = function(a, b) {
	for (var d = 0; d < b.length - 2; d += 3) {
		var c = b.charAt(d + 2),
			c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
			c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
		a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
	}
	return a
}
var tk = function(a, TKK) {
	for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
		var c = a.charCodeAt(f);
		128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(
			f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] =
			c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
	}
	a = h;
	for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
	a = b(a, "+-3^+b+-f");
	a ^= Number(e[1]) || 0;
	0 > a && (a = (a & 2147483647) + 2147483648);
	a %= 1E6;
	return a.toString() + "." + (a ^ h)
}
/*-------------------------------------------------*/
// 翻译语言
var auto = "auto"; //自动检测
var zhc = "zh-CN"; //中文简体
var zht = "zh-TW"; //中文繁体
var en = "en"; //英语
var jp = "ja"; //日语

var waitStatus = true; //等待状态
var waitStatus_cn = true; //等待状态
var returnData;
var returnData_cn;
async function GoogleTranslateRequest(origLanguage, newLanguage, strText) {
	waitStatus = true;

	var _tkk = "439786.2762026697";
	var _tk = tk(strText, _tkk);
	//console.log("_tk:",_tk);

	//需要拼接的url序列
	var baseURL = "https://translate.google.cn/translate_a/single?";
	var client = "client=" + "webapp";
	var sl = "&sl=" + origLanguage; //待翻译的原始语言      //默认为auto,即自动检测语言
	var tl = "&tl=" + newLanguage; //需要翻译成什么语言    //默认为zh-CN,即默认翻译为中文
	var hl = "&hl=" + zhc;
	var dt1 = "&dt=at&";
	var dt2 = "dt=bd&";
	var dt3 = "dt=ex&";
	var dt4 = "dt=ld&";
	var dt5 = "dt=md&";
	var dt6 = "dt=qca&";
	var dt7 = "dt=rw&";
	var dt8 = "dt=rm&";
	var dt9 = "dt=ss&";
	var dt0 = "dt=t&";
	var dt = "dt=gt&"; //del
	var otf = "otf=2&"; //1
	var ssel = "ssel=0&";
	var tsel = "tsel=4&"; //0
	var xid = "xid=1782844&";
	var kc = "kc=1&"; //8 //2
	var Tk = "tk=" + _tk;
	var q = "&q=" + encodeURI(strText);

	var requestURL = baseURL + client + sl + tl + hl + dt1 + dt2 + dt3 + dt4 + dt5 + dt6 + dt7 + dt8 + dt9 + dt0 + dt +
		otf +
		ssel + tsel + xid + kc + Tk + q;

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
				console.log('请求成功!');
				var JSON_jsObj = JSON_processing_parsing_JsObj(response.responseText);
				//遍历[0][0]数组就可以取得翻译后的文本,原始数据,原始数据的拼音
				//[2]是检查出的语言
				//遍历[5]可以取得两种翻译,原始数据和原始数据的长度
				//遍历[8]可以得到原始语言和翻译语言
				//for (var i = 0; i < JSON_jsObj.length; i++) {
				//	for (var j = 0; j < JSON_jsObj[i].length; j++) {
				//		for (var k = 0; k < JSON_jsObj[i][j].length; k++) {
				//			
				//		}
				//	}
				//}
				var retData = "";
				for (var j = 0; j < JSON_jsObj[0].length; j++) {
					if (JSON_jsObj[0][j][0] != null) {
						retData += JSON_jsObj[0][j][0]; //组合每一句翻译
					}
				}
				returnData = retData; //存储数据
				//console.log('谷歌翻译:',retData);
				waitStatus = false; //不等待

				//console.log(response);
				//console.log(response.responseText);
				//if(response.responseText.indexOf('[[["') == 0) //是否是指定的数据格式
				//{
				//	var retData = response.responseText.slice(4,response.responseText.indexOf('","',4)); //提取翻译后的文本
				//	returnData = retData; //存储数据
				//	//console.log('谷歌翻译:',retData);
				//	waitStatus = false; //不等待
				//}
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

	while (waitStatus) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	return returnData;
	// jQuery.ajax({
	// 	url: URL,
	// 	type: "GET",
	// 	dataType: "jsonp", //指定服务器返回的数据类型
	// 	jsonp: "callback", //Jquery生成验证参数的名称
	// 	processData: false,
	// 	success: function (data) {
	// 		//var result = JSON.stringify(data); //json对象转成字符串
	// 		console.log("GET成功!",data);
	// 	},
	// 	error: function(XMLHttpRequest, textStatus, errorThrown) {
	// 	alert(XMLHttpRequest.status);
	// 	alert(XMLHttpRequest.readyState);
	// 	alert(textStatus);
	// 	}
	// });



	// jQuery.get(URL,function(response,status,xhr){
	// 	if (response.success === false) {

	// 		console.log("GET失败了!",response);
	// 	} else {

	// 		console.log("GET成功!",response);
	// 	}
	// },"json");


	// jQuery.post(URL, {
	// 	comment: newMgs,
	// 	count: 6,
	// 	sessionid: g_sessionID
	// }, function(response) {
	// 	if (response.success === false) {
	// 		console.log("留言失败了!");
	// 	} else {
	// 		console.log("成功发表评论于");
	// 	}
	// }).fail(function() {
	// 	console.log("无法发表评论于");
	// }).always(function() {
	// 	console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
	// });
}


async function CNTranslateRequest(newLanguage, strText) {
	waitStatus_cn = true;

	var baseURL = "https://brushes8.com/zhong-wen-jian-ti-fan-ti-zhuan-huan";

	GM_xmlhttpRequest({
		method: 'POST',
		url: baseURL,
		data: "data=" + encodeURI(strText) +
			"&dochineseconversion=" + "1" +
			"&variant=" + newLanguage +
			"&submit=" + encodeURI("开始转换 (Ctrl + Enter)"),
		headers: {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"Content-Type": "application/x-www-form-urlencoded", //非常重要
			"User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
		},
		onload: function(response) {
			if (response.status === 200) {
				console.log('请求成功!');
				var findStr = '<label for="response">转换结果: </label><br /><textarea id="response" rows="15" cols="150">';
				var retData = response.responseText.slice(response.responseText.lastIndexOf(findStr) + findStr.length);
				returnData_cn = retData; //存储数据
				//console.log('谷歌翻译:',retData);
				waitStatus_cn = false; //不等待
			} else {
				console.log('请求失败!', response);
				//console.log(response);
				//console.log(response.responseText);
			}
		},
		onerror: function(err) {
			console.log('请求错误!', err);
		}
	});

	while (waitStatus_cn) //强制等待异步函数执行完毕后再执行
	{
		console.log("wait...");
		await sleep(100); //延迟0.1秒
	}
	return returnData_cn;
}

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

//-------------------------------------------------------------------------------------------------------------
// steam api
function setRemarks(profileID, remarkName) {
	var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
	jQuery.post(URL, {
		nickname: remarkName,
		sessionid: g_sessionID
	}, function(response) {
		if (response.success === false) {
			console.log("设置备注失败了!");
		} else {
			console.log("成功设置备注于");
		}
	}).fail(function() {
		console.log("无法设置备注于");
	}).always(function() {
		//console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
	});
}
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


var jqobj;

function traverseAllFriend() //遍历所有好友
{
	function concurrentPoll() {
		this.tasks = []; // 任务队列  
		this.max = 100; // 最大并发数  
		setTimeout(() => { // 函数主体执行完后立即执行  
			this.run()
		}, 0);
	}
	concurrentPoll.prototype.addTask = function(task) { // 原型添加任务方法  
		this.tasks.push(task)
	}
	concurrentPoll.prototype.run = function() { // 原型任务运行方法  
		if (this.tasks.length == 0) { // 判断是否还有任务  
			return
		}
		var min = Math.min(this.tasks.length, this.max); // 取任务个数与最大并发数最小值  
		for (var i = 0; i < min; i++) {
			this.max--; // 执行最大并发递减  
			var task = this.tasks.shift(); // 从数组头部取任务  
			task().then((res) => { // 重：此时可理解为，当for循环执行完毕后异步请求执行回调,此时max变为0  
				console.log(res)
			}).catch((err) => {
				console.log(err)
			}).finally(() => { // 重：当所有请求完成并返回结果后，执行finally回调，此回调将按照for循环依次执行，此时max为0.  
				this.max++; // 超过最大并发10以后的任务将按照任务顺序依次执行。此处可理解为递归操作。  
				this.run();
			})
		}
	}
	var poll = new concurrentPoll(); // 实例
	//并发多个相同任务

	jqobj = jQuery(".selectable[data-steamid]"); //选择所有好友
	//for (let i = 0; i < jqobj.length; i++) {
	for (let i = 0; i < 1; i++) {
		let cur = jqobj.get(i);
		let profileID = cur.getAttribute("data-steamid");
		poll.addTask(function() {
			return new Promise(
				function(resolve, reject) {
					// 一段耗时的异步操作
					getProfilesInfo(resolve, reject, i, profileID);
				})
		})
	}
	console.log("完毕!");

	// for (let i=0; i<23; i++) { // 数据模拟  
	//   poll.addTask(function () {  
	//   return new Promise(  
	//   function (resolve, reject) {  
	//   // 一段耗时的异步操作
	//   getProfilesInfo(resolve, reject,i,"76561198818854009");
	//   })})
	//   }


	// poll.addTask(async function () {  

	// 	//let arr = [fun(0),fun(1),fun(2)];
	// 	let arr = [];
	// 	for (var i=0; i<13; i++) { // 数据模拟
	// 		//arr.push(fun(i));
	// 		arr.push(new Promise(function (resolve, reject){getProfilesInfo(i,"76561198818854009");}));
	// 	}
	// 	let res = await Promise.all(arr);
	//  return res;
	//  // new Promise(
	//  //  function (resolve, reject) {  
	//  //  // 一段耗时的异步操作
	//  //  getProfilesInfo("76561198818854009");
	//  //  resolve('成功') // 数据处理完成  
	//  //  // reject('失败') // 数据处理出错
	//  //  })

	//  })

}

var waitStatus1 = []; //等待状态
var returnData1 = []; //返回数据
async function getgetProfilesID(i, profileID) {
	let URL = "https://steamcommunity.com/profiles/" + profileID + "/";

	if (waitStatus1.length == 0)
		waitStatus1.length = jqobj.length; //设置数组长度

	if (returnData1.length == 0)
		returnData1.length = jqobj.length; //设置数组长度

	//waitStatus1.push([profileID,true]); //开始等待
	waitStatus1[i] = [profileID, true]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
	//console.log("getgetProfilesID() i:",i,"waitStatus1:",waitStatus1);

	jQuery.ajax({
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
			let Data = result;
			//console.log("请求成功了!",Data);
			let nIstart = Data.indexOf('StartTradeOffer(');
			let nIend = Data.indexOf(');', nIstart);
			let AccountID = Data.slice(nIstart + 'StartTradeOffer('.length + 1, nIend - 1);
			nIstart = Data.indexOf('"steamid":"');
			nIend = Data.indexOf('",', nIstart);
			let profileID = Data.slice(nIstart + '"steamid":"'.length, nIend);
			console.log("getgetProfilesID() i:", i, "AccountID:", AccountID, "profileID:", profileID);

			for (let i = 0; i < waitStatus1.length; i++) {
				if (waitStatus1[i][0] == profileID) //是否是同一个用户
				{
					if (waitStatus1[i][1] == false) //这个用户是否已经获取过了(测试多个相同用户信息的获取)
						continue;
					waitStatus1[i][1] = false;
					//returnData1.push(AccountID); //存储数据
					returnData1[i] = AccountID; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
					//console.log("getgetProfilesID() 成功存储数据 AccountID:",AccountID);
					return;
					//console.log("waitStatus1[i][1] break",i,waitStatus1[i][1]);
				}
			}
			console.log("getgetProfilesID 数据错误!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			console.log("waitStatus1:", waitStatus1, 'returnData1:', returnData1);
			console.log('profileID:', profileID, 'AccountID:', AccountID);
			return;
			//console.log("DBG!",nIstart,nIend);
		},
		error: function(e) { //请求失败，包含具体的错误信息
			console.log("请求失败了!", e.status);
			console.log("请求失败了!", e.responseText);
		}
	});
	//console.log("getgetProfilesID() i:",i,"waitStatus1:",waitStatus1);
	while (waitStatus1[i][1]) //强制等待异步函数执行完毕后再执行
	{
		//console.log("wait...",i,waitStatus1[i][1]);
		await sleep(50); //延迟0.1秒
	}
	//console.log("waitStatus1[i][1]:",waitStatus1[i][1],"returnData1[i]:",returnData1[i]);
	return returnData1[i];

	// jQuery.get(URL, {
	// 	// "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	// 	// // "Content-Type": "application/x-www-form-urlencoded", //非常重要
	// 	// "Accept-Encoding": "gzip, deflate, br",
	// 	// "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
	// 	// "Cache-Control": "max-age=0",
	// 	// "Connection": "keep-alive",
	// 	// "Cookie": "sessionid=6f84a0f48cddb56ad66394b6; steamCountry=HK%7Cda7daa2682f7a361e594f8dad55fe9df; timezoneOffset=28800,0",
	// 	// "Host": "steamcommunity.com",
	// 	// "Upgrade-Insecure-Requests": "1",
	// 	'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
	// }, function(response) {
	// 	if (response.status === 200) {
	// 		console.log("获取失败!",response.responseText);
	// 	} else {
	// 		console.log("获取成功!",response.responseText);
	// 	}
	// }).fail(function() {
	// 	console.log("无法获取!");
	// }).always(function() {
	// 	//console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
	// });


	// GM_xmlhttpRequest({
	// 	method: 'GET',
	// 	url: URL,
	// 	headers: {
	// 		'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
	// 		//'Accept': 'application/atom+xml,application/xml,text/xml',
	// 		//"Content-Type": "application/x-www-form-urlencoded",
	// 	},
	// 	onload: function(response) {
	// 		if (response.status === 200) {
	// 			console.log('请求成功!',response.responseText);
	// 			//var JSON_jsObj = JSON_processing_parsing_JsObj(response.responseText);
	// 			//遍历[0][0]数组就可以取得翻译后的文本,原始数据,原始数据的拼音
	// 			//[2]是检查出的语言
	// 			//遍历[5]可以取得两种翻译,原始数据和原始数据的长度
	// 			//遍历[8]可以得到原始语言和翻译语言
	// 			//for (var i = 0; i < JSON_jsObj.length; i++) {
	// 			//	for (var j = 0; j < JSON_jsObj[i].length; j++) {
	// 			//		for (var k = 0; k < JSON_jsObj[i][j].length; k++) {
	// 			//			
	// 			//		}
	// 			//	}
	// 			//}
	// 			//var retData = "";
	// 			//for (var j = 0; j < JSON_jsObj[0].length; j++) {
	// 			//	if (JSON_jsObj[0][j][0] != null) {
	// 			//		retData += JSON_jsObj[0][j][0]; //组合每一句翻译
	// 			//	}
	// 			//}
	// 			returnData = retData; //存储数据
	// 			//console.log('谷歌翻译:',retData);
	// 			waitStatus = false; //不等待

	// 			//console.log(response);
	// 			//console.log(response.responseText);
	// 			//if(response.responseText.indexOf('[[["') == 0) //是否是指定的数据格式
	// 			//{
	// 			//	var retData = response.responseText.slice(4,response.responseText.indexOf('","',4)); //提取翻译后的文本
	// 			//	returnData = retData; //存储数据
	// 			//	//console.log('谷歌翻译:',retData);
	// 			//	waitStatus = false; //不等待
	// 			//}
	// 		} else {
	// 			console.log('请求失败!');
	// 			//console.log(response);
	// 			//console.log(response.responseText);
	// 		}
	// 	},
	// 	onerror: function(err) {
	// 		console.log('请求错误!', err);
	// 	}
	// });
}

var waitStatus = []; //等待状态
var returnData = []; //返回数据
async function getProfilesInfo(resolve, reject, i, profileID) {
	let joinDate, friendDate;
	let str;

	if (waitStatus.length == 0)
		waitStatus.length = jqobj.length; //设置数组长度

	if (returnData.length == 0)
		returnData.length = jqobj.length; //设置数组长度

	jQuery.ajaxSetup({
		cache: false
	}); //close AJAX cache

	////获取一个数组真实长度
	//let arrRealLength = undefined;
	//for (let i = 0; i < waitStatus.length; i++) {
	//	if(waitStatus[i] == undefined)
	//	{
	//		arrRealLength = i;
	//		break;
	//	}
	//}
	//if(arrRealLength == undefined) //是否为数组最大长度
	//	arrRealLength = waitStatus.length;


	//waitStatus.push([profileID,true]); //开始等待
	waitStatus[i] = [profileID, true]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)

	await getgetProfilesID(i, profileID); //

	let AccountID = returnData1[i];
	//console.log("getProfilesInfo(): AccountID:",AccountID,'i:',i,"returnData[i]:",returnData[i]);
	//var AccountID = "242752742";//242752742//858588281

	let URL = "https://steamcommunity.com/tradeoffer/new/?partner=" + AccountID;

	jQuery.ajax({
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
			let Data = result;
			if (Data.indexOf("抱歉，发生了某种错误：") != -1) //不能正常进行交易,获取不到数据就跳过
			{
				waitStatus[i][1] = false;
				returnData[i] = null; //不返回数据
				return;
			}
			//console.log("请求成功了!",Data);
			let nIstart = Data.indexOf('trade_partner_member_since trade_partner_info_text');
			if (nIstart == -1) {
				nIstart = Data.indexOf('trade_partner_header responsive_trade_offersection top');
				let nindex = Data.indexOf('trade_partner_info_text">', nIstart);
				let nIend = Data.indexOf('</div>', nindex);
				friendDate = Data.slice(nindex + 'trade_partner_info_text">'.length, nIend); //加入Steam的日期
				friendDate = friendDate.replace(/^\s+|\s+$/g, ""); //去除左右两边的空格
				joinDate = "查询不到";
				nIstart = Data.lastIndexOf('g_ulTradePartnerSteamID');
				nIindex = Data.indexOf('\'', nIstart);
				nIend = Data.indexOf('\'', nIindex + 1);
				profileID = Data.slice(nIindex + 1, nIend);
				//console.log("profileID",profileID);
			} else {
				let nIindex = Data.indexOf('>', nIstart);
				let nIend = Data.indexOf('</div>', nIindex);
				joinDate = Data.slice(nIindex + 1, nIend); //加入Steam的日期
				//console.log("joinDate",joinDate);
				nIstart = Data.indexOf('trade_partner_info_text');
				nIindex = Data.indexOf('>', nIstart);
				nIend = Data.indexOf('</div>', nIindex);
				friendDate = Data.slice(nIindex + 1, nIend - 1); //成为好友的日期
				friendDate = friendDate.replace(/^\s+|\s+$/g, ""); //去除左右两边的空格
				//console.log("friendDate",friendDate);
				nIstart = Data.lastIndexOf('g_ulTradePartnerSteamID');
				nIindex = Data.indexOf('\'', nIstart);
				nIend = Data.indexOf('\'', nIindex + 1);
				profileID = Data.slice(nIindex + 1, nIend);
				//console.log("profileID",profileID);
			}

			for (let i = 0; i < waitStatus.length; i++) {
				if (waitStatus[i][0] == profileID) //是否是同一个用户
				{
					if (waitStatus[i][1] == false) //这个用户是否已经获取过了(测试多个相同用户信息的获取)
						continue;
					waitStatus[i][1] = false;
					//returnData.push([joinDate,friendDate]); //存储数据
					returnData[i] = [joinDate, friendDate]; //存储数据到对应的位置(受网络影响,响应顺序可能会不同)
					//console.log("waitStatus[i][1] break",i,waitStatus[i][1]);
					return;
				}

			}
			console.log("getProfilesInfo 数据错误!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			console.log("waitStatus:", waitStatus, "returnData:", returnData);
			console.log("profileID", profileID);
			//console.log("Data",Data);
			return;
			//console.log("DBG!",nIstart,nIend);
		},
		error: function(e) { //请求失败，包含具体的错误信息
			console.log("请求失败了!", e.status);
			console.log("请求失败了!", e.responseText);
		}
	});

	while (waitStatus[i][1]) //强制等待异步函数执行完毕后再执行
	{
		//console.log("wait...",i,waitStatus[i][1]);
		await sleep(50); //延迟0.1秒
	}
	if (returnData[i] == null) //检查数据有效性
	{
		console.log("str [" + (i + 1) + "] 不能获取到数据,已跳过: https://steamcommunity.com/profiles/" + profileID);
		return;
	}
	console.log("waitStatus[i][1]:", waitStatus[i][1], "waitStatus[i]:", waitStatus[i]);

	str = "加入日期: " + returnData[i][0] + " 成为好友日期: " + returnData[i][1];
	console.log("str [" + (i + 1) + ']', str);
	resolve('成功') // 数据处理完成
	// reject('失败') // 数据处理出错
	return str;
}

// let arr = [];
// for (var i=0; i<1; i++) { // 数据模拟
// 	//arr.push(fun(i));
// 	arr.push(new Promise(function (resolve, reject){getProfilesInfo(1,2,i,"76561198818854009");}));
// }
// let res = await Promise.all(arr);

// var jqobj = jQuery(".selectable[data-steamid]"); //选择所有好友
// let arr = [];
// for (var i=0; i<20; i++) { // 数据模拟
// let cur = jqobj.get(i);
// let profileID = cur.getAttribute("data-steamid");
// 	//arr.push(fun(i));
// 	//getProfilesInfo(1, 2,i,profileID);
// 	arr.push(new Promise(function (resolve, reject){getProfilesInfo(1, 2,i,profileID);}));
// }
// let res = await Promise.all(arr);

//------------------------------------------------------------------------------------------------------------------------------------------
//好友动态自动点赞和评论
//miku-39

function isIntNum(val){
    var regPos = /^\d+$/; // 非负整数
    if(regPos.test(val)){
        return true;
    }else{
        return false;
    }
}

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
		
		//游戏评测
		this.UserEvaluationUp = "UserReviewVoteUp"; //用户评价 是 的函数名
		this.UserEvaluationDown = "UserReviewVoteDown"; //用户评价 否 的函数名
		this.UserEvaluationHappy = "UserReviewVoteTag"; //用户评价 欢乐 的函数名
		//上传载图、收藏载图
		//指南添加到收藏夹、发表指南
		//创意工坊物品添加到收藏夹、创意工坊合集添加到收藏夹、发布创意工坊物品
		//艺术作品添加到收藏夹、发布艺术作品、
		//上传视频、
		this.captureUp = "VoteUp"; //用户评价 赞 的函数名
		this.captureDown = "VoteDown"; //用户评价 否 的函数名
		this.captureShare = "ShowSharePublishedFilePopup"; //用户操作 分享 的函数名
		//购买游戏或者DLC
		this.bus = "VoteUpCommentThread('UserReceivedNewGame"; //用户评价 赞 的函数名
		//发布状态或者游戏状态
		this.status = "VoteUpCommentThread('UserStatusPublished"; //用户评价 赞 的函数名
		
		//组通知(可留言)，其他的比如 安排活动、选择新的周最佳玩家、晋升一名成员为管理员、添加了一条留言 没有看到过
		this.groupNotificationUp = "RateAnnouncement( 'https://steamcommunity.com/groups/wearefanatical/announcements/rate/', '3415360277957401578', true, 4264294 );"; //用户评价 赞
		this.groupNotificationDown = "RateAnnouncement( 'https://steamcommunity.com/groups/wearefanatical/announcements/rate/', '3415360277957401578', false, 4264294 );"; //用户评价 否
		
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
	
	VoteUp(item_id){
			var options = {
				method: 'post',
				postBody: 'id=' + item_id + '&sessionid=' + g_sessionID,
				onComplete: (function(item_id){
					return function(transport)
					{
						console.log("点赞完成!");
					}
				}(item_id))
			};
			new Ajax.Request(
				'https://steamcommunity.com/sharedfiles/voteup',
				options
			);
			//$J.post( 'https://steamcommunity.com/actions/LogFriendActivityUpvote', {sessionID: g_sessionID} );
	}
	
	VoteUpCommentThread(commentthreadid){ //这个函数有不确定性
			let iprefix = commentthreadid.indexOf('_');
			var prefixUrl = commentthreadid.slice(0,iprefix);
			let iowner = commentthreadid.indexOf('_',iprefix+1);
			var ownerUrl = commentthreadid.slice(iprefix+1,iowner);
			var featureUrl = commentthreadid.slice(iowner+1);
			
			//$J.post( 'https://steamcommunity.com/actions/LogFriendActivityUpvote', {sessionID: g_sessionID} );
			
			var GetActionURL  = function(action){
				var url = "https://steamcommunity.com/comment/UserReceivedNewGame/" + action + "/";
				url += ownerUrl + '/';
				url += featureUrl + '/';
				return url;
			}
			
			var params = {
			vote: 1,
			count: 3,
			sessionid: g_sessionID,
			feature2: -1,
			newestfirstpagination: true,
			};
			
			new Ajax.Request( GetActionURL( 'voteup' ), {
				method: 'post',
				parameters: params,
				onSuccess: ()=>{console.log("点赞成功!")},
				onFailure:  ()=>{console.log("点赞失败! 与网络通信时出错。请稍后再试。")},
				onComplete: ()=>{console.log("点赞完毕! 用时")}
			} );
		}
		
		UserReviewVoteUp( id )
		{
			UserReview_Rate( id, true, 'https://steamcommunity.com',
				function( rgResults ) {
					console.log("点赞成功~");
				}
			);
		}
		
		UserReview_Rate( recommendationID, bRateUp, baseURL, callback )
		{
			$J.post( baseURL + '/userreviews/rate/' + recommendationID,{
						'rateup' : bRateUp,
						'sessionid' : g_sessionID
			}).done( function( results ) {
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
		
	
	async Run(){ //开始点赞
		var url = this.Url + this.friendActivitUrl;
		console.log("开始点赞...",url);
		var documentData = await getResourceByURL(url);
		//console.log("url:",this.Url,"data:",documentData);
		var index = documentData.indexOf(this.startElementsId);
		var endindex = documentData.lastIndexOf(this.endElementsId);
		var Data = documentData.slice(index,endindex);
		var jsindex = documentData.indexOf(this.jsName,endindex);
		var jsendindex = documentData.indexOf(';',jsindex);
		var jsData = documentData.slice(jsindex,jsendindex);
		var nextLoadURL = jsData.slice(jsData.indexOf('\'')+1,jsData.lastIndexOf('\''));
		console.log("Data:",Data,"nextLoadURL:",nextLoadURL);
		var arrData = Data.split(this.friendActivityElementsBlockId);
		debugger
		for (let i = 1; i < arrData.length; i++) {
			//console.log(arrData[i]);
			
			var k = arrData[i].lastIndexOf(this.bus);
			if(k>0)
			{
				var startk = arrData[i].indexOf('(',k);
				var endk = arrData[i].indexOf(')',startk);
				var code = arrData[i].slice(startk+1,endk);
				console.log("code",code);
				continue;
			}
			
			var l = arrData[i].lastIndexOf(this.status);
			if(l>0)
			{
				var startl = arrData[i].indexOf('(',k);
				var endl = arrData[i].indexOf(')',startl);
				var code = arrData[i].slice(startl+1,endl);
				console.log("code",code);
				continue;
			}
			
			var j = arrData[i].lastIndexOf(this.captureUp);
			if(j>0)
			{
				var startj = arrData[i].indexOf('(',j);
				var endj = arrData[i].indexOf(')',startj);
				var code = arrData[i].slice(startj+1,endj);
				console.log("code",code);
				continue;
			}
			
			var o = arrData[i].lastIndexOf(this.UserEvaluationUp);
			if(o>0)
			{
				var starto = arrData[i].indexOf('(',o);
				var endo = arrData[i].indexOf(')',starto);
				var code = arrData[i].slice(starto+1,endo);
				console.log("code",code);
				continue;
			}
			
			var m = arrData[i].lastIndexOf(this.groupNotificationUp);
			if(m>0)
			{
				var startm = arrData[i].indexOf('(',k);
				var endm = arrData[i].indexOf(')',startm);
				var code = arrData[i].slice(startm+1,endm);
				console.log("code",code);
				continue;
			}
			
		}
		
		
		console.log("点赞完毕!");
	}
	Stop(){
		console.log("开始停止点赞...");
		
		console.log("点赞已停止!");
	}
	setGetActivityInfo(){ //设置动态的内容为指定的数据
		
		
	}
	setGetActivityAll(){ //设置动态内容为默认(全部)
		
	}
	setFriendActivityInfo(){ //设置指定好友动态为跳过,只给指定好友点赞等等
		
	}
}

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
//-------------------------------------------------------------------------------------------------------------
function loadResources()
{
	loadjscssFile("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css", "css");
	//loadjscssFile("https://www.layuicdn.com/layui-v2.5.6/css/layui.css","css");
	
	addNewStyle('styles_js0',
		'a {\
	    color:#ebebeb;\
	    text-decoration: none;\
	    }\
	    a:hover {\
	    color: #aaa\
	    }'
	); /* 覆盖layui的css样式 */
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
//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------

var gc_friAct = null;

class UI {
	constructor(arg) {

	}
	async initUI() {
		addNewStyle('styles_js',
			'::selection {color:#000;background: #35d5ff;}\
						#addFriendToGroup,#unaddFriendToGroup,#setTimeInterval,#unsetTimeInterval,#setNoLeave,#unsetNoLeave,#addCustomName,#translationText,#setNationality,#unsetNationality,#NationalityGroup,#NationalitySortGroup,#OfflineTimeGroup,#ShowFriendData {font-family: "Motiva Sans", Sans-serif;font-weight: 300;\
						padding: 2px 5px;border:0;outline:0;border-radius: 2px;color: #67c1f5 !important;background: rgba(0, 0, 0, 0.5 );}\
						.persona.offline, a.persona.offline, .persona.offline.a {color:#ccc;}\
						.persona, a.persona, .persona a, .friend_status_offline, .friend_status_offline div, .friend_status_offline a {color:#ccc;}\
						.player_nickname_hint {color:#ccc;}\
						#addFriendToGroup:hover,#unaddFriendToGroup:hover,#setTimeInterval:hover,#unsetTimeInterval:hover,#setNoLeave:hover,#unsetNoLeave:hover,#addCustomName:hover,#translationText:hover,#setNationality:hover,#unsetNationality:hover,#NationalityGroup:hover,#NationalitySortGroup:hover,#OfflineTimeGroup:hover,#ShowFriendData:hover {background-color: #0a6aa1;color: #fff !important;cursor: pointer;}'
		); /* 选择的文本 */
		addNewStyle('styles1_js',
			'.fs-wrap {\
											position: relative;\
											display: inline-block;\
											vertical-align: bottom;\
											width: 200px;\
											margin: 3px;\
											font-size: 12px;\
											line-height: 1\
										}\
										.fs-label-wrap {\
											position: relative;\
											border: 1px solid #34DEFF;\
											cursor: default;\
											color: #66ccff;\
											border-radius: 4px;\
											box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075)\
										}\
										.fs-label-wrap,\
										.fs-dropdown {\
											-webkit-user-select: none;\
											-moz-user-select: none;\
											-ms-user-select: none;\
											user-select: none\
										}\
										.fs-label-wrap .fs-label {\
											padding: 4px 22px 4px 8px;\
											text-overflow: ellipsis;\
											white-space: nowrap;\
											overflow: hidden;\
											cursor: pointer\
										}\
										.fs-arrow {\
											width: 0;\
											height: 0;\
											border-left: 4px solid transparent;\
											border-right: 4px solid transparent;\
											border-top: 6px solid #fff;\
											position: absolute;\
											top: 0;\
											right: 4px;\
											bottom: 0;\
											margin: auto;\
											cursor: pointer\
										}\
										.fs-dropdown {\
											position: absolute;\
											background-color: #3E9AC6;\
											border: 1px solid #000;\
											width: 100%;\
											z-index: 1000;\
											border-radius: 4px\
										}\
										.fs-dropdown .fs-options {\
											max-height: 200px;\
											overflow: auto\
										}\
										\
										.fs-search input {\
											width: 90%;\
											padding: 2px 4px;\
											border: 0\
											outline: 0;\
										}\
										.fs-selectAll {\
											float: right;\
											cursor: pointer;\
											margin-top: 4px;\
											height: auto\
										}\
										.fs-selectAll.selected {\
											float: right;\
											cursor: pointer;\
											margin-top: 4px;\
											height: auto;\
											color: green\
										}\
										.fs-selectAll:hover {\
											background-color: #35d5ff\
										}\
										.fs-option,\
										.fs-search,\
										.fs-optgroup-label {\
											padding: 6px 8px;\
											border-bottom: 1px solid #eee;\
											cursor: default\
										}\
										.fs-option {cursor: pointer}\
										.fs-option.hl {\
											background-color: #f5f5f5\
										}\
										.fs-wrap.multiple .fs-option {\
											position: relative;\
											padding-left: 30px\
										}\
										.fs-wrap.multiple .fs-checkbox {\
											position: absolute;\
											display: block;\
											width: 30px;\
											top: 0;\
											left: 0;\
											bottom: 0\
										}\
										.fs-wrap.multiple .fs-option .fs-checkbox i {\
											position: absolute;\
											margin: auto;\
											left: 0;\
											right: 0;\
											top: 0;\
											bottom: 0;\
											width: 14px;\
											height: 14px;\
											border: 1px solid #aeaeae;\
											border-radius: 4px;\
											background-color: #fff\
										}\
										.fs-wrap.multiple .fs-option.selected .fs-checkbox i {\
											background-color: #11a911;\
											border-color: transparent;\
											background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAABMSURBVAiZfc0xDkAAFIPhd2Kr1WRjcAExuIgzGUTIZ/AkImjSofnbNBAfHvzAHjOKNzhiQ42IDFXCDivaaxAJd0xYshT3QqBxqnxeHvhunpu23xnmAAAAAElFTkSuQmCC);\
											background-repeat: no-repeat;\
											background-position: center\
										}\
										.fs-wrap .fs-option:hover {\
											background: #48E3FF;\
											border-radius: 4px;\
											margin-left: 2px;\
											margin-right: 2px\
										}\
										.fs-optgroup-label {font-weight: 700}\
										.hidden {display: none}\
										.fs-options::-webkit-scrollbar {width: 6px}\
										.fs-options::-webkit-scrollbar-track {\
											-webkit-border-radius: 2em;\
											-moz-border-radius: 2em;\
											border-radius: 2em;\
											-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);\
											background: rgba(0, 0, 0, .1)}\
										.fs-options::-webkit-scrollbar-thumb {\
											-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);\
											background: rgba(0, 0, 0, .2);\
											-webkit-border-radius: 2em;\
											-moz-border-radius: 2em;\
											border-radius: 2em\
										}'
		); /* 选择的文本 */

		addNewScript('styles_Script',
			"\
						function wordCount(data) {\
							var intLength = 0;\
							for (var i = 0; i < data.length; i++) {\
								if ((data.charCodeAt(i) < 0) || (data.charCodeAt(i) > 255))\
									intLength = intLength + 3;\
								else\
									intLength = intLength + 1;\
							}\
							return intLength;\
						}\
						var comment_textareaHeight = [];\
						function inBoxShrinkage(id,type){\
						var index = -1;\
						var iArr;\
						for(let i=0;i<comment_textareaHeight.length;i++)\
						{\
							index = comment_textareaHeight[i].indexOf(id);\
							if(index != -1)\
							{\
								iArr = i; /*记录旧节点的下标*/\
								console.log('记录旧节点的下标','iArr',iArr);\
								break;\
							}\
						}\
						if(index == -1)\
						{\
							comment_textareaHeight.push(id + ':0'); /*没有找到则是新的节点,就添加*/\
							iArr = comment_textareaHeight.length - 1 ; /*设置新节点的下标*/\
							console.log('没有找到则是新的节点,就添加','comment_textareaHeight',comment_textareaHeight,'iArr',iArr);\
						}\
						var nHeight = parseFloat(comment_textareaHeight[iArr].slice(comment_textareaHeight[iArr].lastIndexOf(':')+1)); /*裁切字符串获取下标*/\
						if(nHeight==0)/*第一次,没有指定的样式*/\
						{\
							nHeight = document.getElementById('comment_textarea').scrollHeight + 'px'; /*对于每个节点使用当前高度*/\
						}\
						/*console.log(parseFloat(comment_textareaHeight[iArr].slice(comment_textareaHeight[iArr].lastIndexOf(':')+1)),'nHeight',nHeight);*/\
						var commentText = document.getElementById(id);if (type == true){commentText.removeEventListener('propertychange', change, false);\
						commentText.removeEventListener('input', change, false);commentText.removeEventListener('focus', change, false);\
						commentText.scrollTop = 0;document.body.scrollTop = 0;commentText.style.height = '28px';} else if (type == false){autoTextarea(commentText);\
						commentText.style.height = nHeight + 'px';}\
						}\
						var change;\
						var autoTextarea = function(elem, extra, maxHeight) {\
							extra = extra || 0;\
							var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,\
								isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),\
								addEvent = function(type, callback) {\
									elem.addEventListener ?\
										elem.addEventListener(type, callback, false) :\
										elem.attachEvent('on' + type, callback);\
								},\
								getStyle = elem.currentStyle ? function(name) {\
									var val = elem.currentStyle[name];\
									if (name === 'height' && val.search(/px/i) !== 1) {\
										var rect = elem.getBoundingClientRect();\
										return rect.bottom - rect.top -\
											parseFloat(getStyle('paddingTop')) -\
											parseFloat(getStyle('paddingBottom')) + 'px';\
									};\
									return val;\
								} : function(name) {\
									return getComputedStyle(elem, null)[name];\
								},\
								minHeight = parseFloat(getStyle('height'));\
							elem.style.resize = 'none';\
							change = function(e,id) {\
								var scrollTop, height,\
									padding = 0,\
									style = elem.style;\
								var obj = document.getElementById('strInBytes');\
								console.log(id);\
								if(id == undefined || id == null)\
									var commentText = document.getElementById(window.event.target.id);\
								else\
									var commentText = document.getElementById(id);\
								var numText = wordCount(commentText.value);\
								obj.innerHTML =  \"当前字符字节数: <span id='strInBytes_Text'>\" + numText + '</span>/999';\
								if (wordCount(commentText.value) >= 1000) {\
									document.getElementById('strInBytes_Text').style.color = '#FF0000';\
									commentText.style.background = '#7b3863';\
									jQuery('#log_head, #log_body').html('');\
									jQuery('#log_head').html(\"<br><b style='color:#2CD8D6;'>字数超标啦! 请保持在1000字符以下. \" + '当前字数:' + numText + '<b>');\
								} else {\
									document.getElementById('strInBytes_Text').style.color = '#32CD32';\
									commentText.style.background = '#1b2838';\
									jQuery('#log_head, #log_body').html('');\
								}\
								if (elem._length === elem.value.length) return;\
								elem._length = elem.value.length;\
								if (!isFirefox && !isOpera) {\
									padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));\
								};\
								scrollTop = document.body.scrollTop || document.documentElement.scrollTop; /*定位到最后*/\
								elem.style.height = minHeight + 'px';\
								if (elem.scrollHeight > minHeight) {\
									if (maxHeight && elem.scrollHeight > maxHeight) {\
										height = maxHeight - padding;\
										style.overflowY = 'auto';\
									} else {\
										height = elem.scrollHeight - padding;\
										style.overflowY = 'hidden';\
									};\
									style.height = height + extra + 'px';\
									var nHeight1 = height + extra;\
									var newStr = nHeight1.toString();\
									/*console.log('nHeight1',nHeight1,'newStr',newStr);*/\
									/*https://blog.csdn.net/weixin_34281477/article/details/93702604*/\
									/*https://www.cnblogs.com/cblogs/p/9293522.html*/\
									/*https://www.w3school.com.cn/tiy/t.asp?f=jseg_replace_1*/\
									var iIndex;\
									for(let i=0;i<comment_textareaHeight.length;i++)\
									{\
										if(id == undefined || id == null)\
										{\
											if(comment_textareaHeight[i].indexOf(window.event.target.id)==0)\
											{\
												iIndex = i;\
												break;\
											}\
										}\
										else\
										{\
											if(comment_textareaHeight[i].indexOf(id)==0)\
											{\
												iIndex = i;\
												break;\
											}\
										}\
									}\
									/*console.log(window.event.target.id,comment_textareaHeight,'iIndex',iIndex);*/\
									/*console.log('2 comment_textareaHeight[iIndex]',comment_textareaHeight[iIndex]);*/\
									comment_textareaHeight[iIndex] = comment_textareaHeight[iIndex].replace(/:(.*)/,\"$':\");/*删除:和后面所有的字符串并添加:*/\
									/*console.log('3 comment_textareaHeight[iIndex]',comment_textareaHeight[iIndex]);*/\
									comment_textareaHeight[iIndex] += newStr;/*存储*/\
									/*console.log('存储','comment_textareaHeight',comment_textareaHeight);*/\
									scrollTop += parseInt(style.height) - elem.currHeight;\
									/*document.body.scrollTop = scrollTop;*/\
									/*document.documentElement.scrollTop = scrollTop;*/\
									elem.currHeight = parseInt(style.height);\
								};\
							};\
							addEvent('propertychange', change);\
							addEvent('input', change);\
							addEvent('focus', change);\
							change();\
							};\
							function closeAllinBoxShrinkage(){\
								inBoxShrinkage('comment_textarea',true);\
								inBoxShrinkage('comment_textarea_zhc',true);\
								inBoxShrinkage('comment_textarea_en',true);\
								inBoxShrinkage('comment_textarea_jp',true);\
								inBoxShrinkage('comment_textarea_zh_sg',true);\
								inBoxShrinkage('comment_textarea_zh_hant',true);\
								inBoxShrinkage('comment_textarea_zh_hk',true);\
								inBoxShrinkage('comment_textarea_zh_mo',true);\
								inBoxShrinkage('comment_textarea_zh_tw',true);\
							}\
							var inBoxonblurID = 0;\
							function addEmojiEvent(emojiCode)\
							{\
								switch (inBoxonblurID){\
									case 0:\
										let inObj = document.getElementById('comment_textarea');\
										inObj.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea'); /*统计翻译后的文字长度*/\
										break;\
									case 1:\
										let inObj1 = document.getElementById('comment_textarea_en');\
										inObj1.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea_en'); /*统计翻译后的文字长度*/\
										break;\
									case 2:\
										let inObj2 = document.getElementById('comment_textarea_jp');\
										inObj2.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea_jp'); /*统计翻译后的文字长度*/\
										break;\
									case 3:\
										let inObj3 = document.getElementById('comment_textarea_zhc');\
										inObj3.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea_zhc'); /*统计翻译后的文字长度*/\
										break;\
									case 4:\
										let inObj4 = document.getElementById('comment_textarea_zh_sg');\
										inObj4.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea_zh_sg'); /*统计翻译后的文字长度*/\
										break;\
									case 5:\
										let inObj5 = document.getElementById('comment_textarea_zh_hant');\
										inObj5.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea_zh_hant'); /*统计翻译后的文字长度*/\
										break;\
									case 6:\
										let inObj6 = document.getElementById('comment_textarea_zh_hk');\
										inObj6.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea_zh_hk'); /*统计翻译后的文字长度*/\
										break;\
									case 7:\
										let inObj7 = document.getElementById('comment_textarea_zh_mo');\
										inObj7.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea_zh_mo'); /*统计翻译后的文字长度*/\
										break;\
									case 8:\
										let inObj8 = document.getElementById('comment_textarea_zh_tw');\
										inObj8.value += ':' + emojiCode + ':'; /*添加表情*/\
										if(change != undefined)\
											change(null, 'comment_textarea_zh_tw'); /*统计翻译后的文字长度*/\
										break;\
									default:\
										break;\
								}}\
								"
		);

		addNewScript('Utility_Script',
			'\
				function emojiFix() { /*修复表情*/\
					console.log("表情开始修复...");\
					let obj = document.getElementsByClassName("emoticon_popup es_emoticons")[0];\
					if (obj != undefined) {\
						obj.style.position = "relative";\
						obj.style.zIndex = "999";\
					}\
				\
					let obj1 = document.getElementsByClassName("emoticon_popup_ctn")[0];\
					if (obj1 != undefined) {\
						obj1.style.zIndex = "999";\
					}\
				\
					let emojiObjArrs = document.getElementsByClassName("emoticon_option");\
					if (emojiObjArrs.length > 0) {\
						for (let i in emojiObjArrs) {\
							emojiObjArrs[i].onclick = function() {\
								addEmojiEvent(emojiObjArrs[i].getAttribute(\'data-emoticon\'));\
							}\
						}\
						console.log("表情修复完毕!");\
					}\
					/*console.log("修复表情错误!");*/\
				}\
				\
				function dvWidthFix() { /*用于修复PC端留言提示内容溢出导致布局发生错误的问题*/\
					$("subpage_container").style.width = "calc(100% - 280px)";\
				}\
				'
		);

		//0.基本环境-加载css
		loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/layui.css",null, "css");
		loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9", "layuicss-laydate", "css");
		loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/layer.css?v=3.1.1", "layuicss-layer", "css");
		loadjscssFile_media("https://www.layuicdn.com/layui-v2.5.6/css/modules/code.css", "layuicss-skincodecss", "css");
		//var cssData = await getResourceByURL("https://www.layuicdn.com/layui-v2.5.6/css/layui.css");
		//addNewStyle('layui_style',cssData);
		//console.log(layui.layer);

		//1.基本环境-加载js到页面上，方便调试
		//loadjscssFile("https://www.layuicdn.com/layui-v2.5.6/layui.all.js","js");
		var jsData = await getResourceByURL("https://www.layuicdn.com/layui-v2.5.6/layui.all.js");
		//console.log("数据获取成果",jsData);
		addNewScript('layui_Script', jsData);

		loadResources();
	}
	async createUI() {

		jQuery("#manage_friends").after(
			'<div class="layui-tab layui-tab-brief" lay-filter="demo">\
			  <ul class="layui-tab-title">\
			    <li class="layui-this">留言</li>\
			    <li>留言设置</li>\
			    <li>数据分析</li>\
				<li>动态助手</li>\
				<li>拓展功能(测试)</li>\
			    <li>设置</li>\
			  </ul>\
			  <div class="layui-tab-content">\
			    <div class="layui-tab-item layui-show">\
				  <!----------------------------------------------------------------------------------------------------------------->\
				  <div class="commentthread_entry">\
				  		<div class="commentthread_entry_quotebox">\
				  			<textarea class="commentthread_textarea" id="comment_textarea" onfocus="this.focus();this.select();inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>\
				  		</div>\
				  		<div id="strInBytes" style="color: #32CD32;">当前字符字节数: <span id="strInBytes_Text">0</span>/999</div>\
				  		<fieldset class="layui-elem-field layui-field-title">\
				  		  <legend>翻译模块(需要提前设置国籍):</legend>\
						</fieldset>\
						<div id="translationOptions" style="color:#fff;">\
				  								<span>当前语言: \
				  									<select id="origLanguageSelectBox" style="padding: 4px 12px 4px 8px;font-size:12px;outline:0;border: 1px solid #34DEFF;background-color:transparent;color: #66ccff;">\
				  										<option name="auto" value="auto" style="color:#fff;background-color: #3E9AC6;">自动检测</option>\
				  										<option name="zhc" value="zh-CN" style="color:#fff;background-color: #3E9AC6;">中文简体</option>\
				  										<option name="en" value="en" style="color:#fff;background-color: #3E9AC6;">英语</option>\
				  										<option name="jp" value="ja" style="color:#fff;background-color: #3E9AC6;">日语</option>\
				  									</select>\
				  								</span>\
				  								<span style="margin-left: 5px;">目标语言: \
				  									<select id="selectBoxID" class="selectBox" multiple="multiple">\
				  										<option value="en">英语</option>\
				  										<option value="ja">日语</option>\
				  										<option value="zh-CN">中文简体</option>\
				  										<option value="zh-sg">马新简体[zh-sg]</option>\
				  										<option value="zh-hant">繁體中文[zh-hant]</option>\
				  										<option value="zh-hk">繁體中文(香港)[zh-hk]</option>\
				  										<option value="zh-mo">繁體中文(澳门)[zh-mo]</option>\
				  										<option value="zh-tw">繁體中文(台湾)[zh-tw]</option>\
				  									</select>\
				  								</span>\
				  								<span style="margin-left: 5px;vertical-align: middle;">\
				  									<button id="translationText">翻译</button>\
				  								</span>\
				  							</div>\
											<fieldset class="layui-elem-field layui-field-title">\
											  <legend>添加称呼模块(需要提前设置备注):</legend>\
											</fieldset>\
				  		<div class="commentthread_entry_submitlink" style="">\
				  			<span class="isCustom" style="display: block;text-align: left;">\
				  				<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">自定义称呼模式 (默认为{name}, 可以自行修改, 好友没有备注则使用steam名称)</span>\
				  				<input class="nameAddType" id="select_isCustom_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\
								<span style="margin-left: 5px;vertical-align: middle;">\
									<button id="addCustomName">在留言框添加自定义称呼标识符</button>\
								</span>\
				  			</span>\
				  			<span class="isName" style="display: block;text-align: left;">\
				  				<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为好友添加称呼 (如果好友没有备注则使用steam名称)</span>\
				  				<input class="nameAddType" id="select_islName_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\
				  			</span>\
				  			<span class="isSpecialName" style="display: block;text-align: left;">\
				  				<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为好友添加称呼 (如果好友设置有备注则使用,否则不添加称呼)</span>\
				  				<input class="nameAddType" id="select_isSpecialName_checkbox" name="nameAddType"  type="radio" style="vertical-align: middle;margin:2px;">\
				  			</span>\
							<fieldset class="layui-elem-field layui-field-title" style="padding: 10px 0px;">\
				  			<span style="display: block;text-align: right;">\
								<a class="btn_grey_black btn_small_thin" href="javascript:CCommentThread.FormattingHelpPopup( \'Profile\' );">\
									<span>格式化帮助</span>\
								</a>\
								<span class="emoticon_container">\
									<span class="emoticon_button small" id="emoticonbtn"></span>\
								</span>\
								<span class="btn_green_white_innerfade btn_small" id="comment_submit">\
									<span>发送评论给选择的好友</span>\
								</span>\
								<span class="btn_green_white_innerfade btn_small" id="comment_submit_special">\
									<span>根据国籍发送评论给选择的好友</span>\
								</span>\
							</span>\
				  		</div>\
				  	</div>\
				  	<div id="log">\
				  		<span id="log_head"></span>\
				  		<span id="log_body" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/"></span>\
				  	</div>\
					<!----------------------------------------------------------------------------------------------------------------->\
				  \
			    </div>\
				\
			    <div class="layui-tab-item">\
					<div style="text-align: left;margin: 5px 0px;">\
						<span style="margin-left: 5px;vertical-align: middle;">\
							<fieldset class="layui-elem-field layui-field-title">\
							  <legend>设置国籍:</legend>\
						    </fieldset>\
							<div style="color: #67c1f5;">请选择要设置的国籍:</div>\
							<select id="nationalitySelectBox" style="padding: 4px 12px 4px 8px;font-size:12px;outline:0;border: 1px solid #34DEFF;background-color:transparent;color: #66ccff;">\
								<option name="CN" value="CN" style="color:#fff;background-color: #3E9AC6;">简体中文</option>\
								<option name="EN" value="EN" style="color:#fff;background-color: #3E9AC6;">英语</option>\
								<option name="JP" value="JP" style="color:#fff;background-color: #3E9AC6;">日语</option>\
								<option name="CN-SG" value="CN-SG" style="color:#fff;background-color: #3E9AC6;">马新简体(马来西亚,新加坡)[zh-sg]</option>\
								<option name="CN-HANT" value="CN-HANT" style="color:#fff;background-color: #3E9AC6;">繁體中文[zh-hant]</option>\
								<option name="CN-HK" value="CN-HK" style="color:#fff;background-color: #3E9AC6;">繁體中文(香港)[zh-hk]</option>\
								<option name="CN-MO" value="CN-MO" style="color:#fff;background-color: #3E9AC6;">繁體中文(澳门)[zh-mo]</option>\
								<option name="CN-TW" value="CN-TW" style="color:#fff;background-color: #3E9AC6;">繁體中文(台湾)[zh-tw]</option>\
							</select>\
							<button id="setNationality">为选择的好友设置国籍标识</button>\
						</span>\
						<span style="margin-left: 5px;vertical-align: top;">\
							<button id="unsetNationality">为选择的好友取消国籍标识</button>\
						</span>\
						<br />\
						 <fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置不留言:</legend>\
						 </fieldset>\
						<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\
							<span>\
								<button id="setNoLeave">为选择的好友设置不留言</button>\
							</span>\
							<span>\
								<button id="unsetNoLeave">为选择的好友取消设置不留言</button>\
							</span>\
						</div>\
						<fieldset class="layui-elem-field layui-field-title">\
						  <legend>设置留言时间间隔:</legend>\
						</fieldset>\
						<div id="">只选择日期则过n天后再留言，只选择时间则过x时后再留言(严格模式)，日期和时间都选择了则过n天x时后再留言(严格模式)</div>\
						<div id="">这里其实是一个时间差，比如指定的好友3天留言一次，今天是4月10日，你就选择4月13日就行了，这样做方便一点</div>\
						<div class="layui-form">\
						  <div class="layui-form-item">\
							<div class="layui-inline">\
						      <label class="layui-form-label">请选择日期</label>\
						      <div class="layui-input-inline">\
						        <input type="text" class="layui-input" id="test-limit2" readonly="" placeholder="yyyy-MM-dd">\
						      </div>\
						    </div>\
							\
							<div class="layui-inline">\
							   <label class="layui-form-label">请选择时间</label>\
							    <div class="layui-input-inline">\
							      <input type="text" class="layui-input" id="test14" placeholder="H时m分s秒">\
							    </div>\
						   </div>\
						  </div>\
						</div>\
						<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\
							<span>\
								<button id="setTimeInterval">为选择的好友设置留言时间间隔</button>\
							</span>\
							<span>\
								<button id="unsetTimeInterval">为选择的好友取消设置留言时间间隔</button>\
							</span>\
						</div>\
						\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>好友分组:</legend>\
						</fieldset>\
						<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\
						\
						<form class="layui-form" action="">\
						  <div class="layui-form-item">\
						    <div class="layui-inline">\
						      <label class="layui-form-label">分组列表</label>\
						      <div class="layui-input-inline">\
						        <select name="modules" lay-verify="required" lay-search="">\
						          <option value="">直接选择或搜索选择</option>\
						          <option value="1">分组名称</option>\
						          <option value="2">分组名称</option>\
						          <option value="3">分组名称</option>\
						          <option value="4">分组名称</option>\
						          <option value="5">分组名称</option>\
						          <option value="6">分组名称</option>\
						          <option value="7">分组名称</option>\
						          <option value="8">分组名称</option>\
						          <option value="9">分组名称</option>\
						        </select>\
						      </div>\
							  <button type="button" class="layui-btn" id="editFriendGroup">编辑列表</button>\
						    </div>\
						  </div>\
						</form>\
						\
							<span>\
								<button id="addFriendToGroup">为选择的好友添加分组</button>\
							</span>\
							<span>\
								<button id="unaddFriendToGroup">为选择的好友取消添加分组</button>\
							</span>\
							\
							<div class="layui-collapse" lay-filter="test">\
							  <div class="layui-colla-item">\
							    <h2 class="layui-colla-title">分组名称</h2>\
							    <div class="layui-colla-content">\
							      <p>用户</p>\
								  <p>用户</p>\
								  <p>用户</p>\
							    </div>\
							  </div>\
							  <div class="layui-colla-item">\
							    <h2 class="layui-colla-title">分组名称</h2>\
							    <div class="layui-colla-content">\
							      <p>用户<br>用户\
								  </p>\
							    </div>\
							  </div>\
							  <div class="layui-colla-item">\
							    <h2 class="layui-colla-title">分组名称</h2>\
							    <div class="layui-colla-content">\
							      <p>用户\
							      <br><br>\
							      用户</p>\
							    </div>\
							  </div>\
							  <div class="layui-colla-item">\
							    <h2 class="layui-colla-title">分组名称</h2>\
							    <div class="layui-colla-content">\
							      <p>用户</p>\
							    </div>\
							  </div>\
							</div>\
							\
						</div>\
					</div>\
			      <div id="laydateDemo"></div>\
				  <div id="log1">\
					<span id="log_head1"></span>\
					<span id="log_body1" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/"></span>\
				  </div>\
			    </div>\
				\
			    <div class="layui-tab-item">\
				  \
				  <span style="margin-left: 5px;vertical-align: top;">\
				  	<button id="NationalityGroup">按国籍进行高亮分组</button>\
				  </span>\
				  <span style="margin-left: 5px;vertical-align: top;">\
				  	<button id="NationalitySortGroup">按国籍进行排序分组(慢)</button>\
				  </span>\
				  <span style="margin-left: 5px;vertical-align: top;">\
				  	<button id="OfflineTimeGroup">按在线时间进行排序分组</button>\
				  </span>\
				  <span style="margin-left: 5px;vertical-align: top;">\
				  	<button id="ShowFriendData">显示好友详细数据(不可用)</button>\
				  </span>\
				  <div style="padding: 5px; background-color: #F2F2F2;">\
				    <div class="layui-row layui-col-space15">\
				      \
				  	<div class="layui-col-md12">\
				        <div class="layui-card">\
				          <div class="layui-card-header">好友数据统计</div>\
				          <div class="layui-card-body">\
				            留言数据统计\
				          </div>\
				        </div>\
				      </div>\
				  	\
				  	<div class="layui-col-md12">\
				  	  <div class="layui-card">\
				  	    <div class="layui-card-header">当前配置统计</div>\
				  	    <div class="layui-card-body">\
				  	      查看好友配置统计\
				  	    </div>\
				  	  </div>\
				  	</div>\
				  	\
				    </div>\
				  </div>\
			      <div id="pageDemo"></div>\
			    </div>\
				\
				<div class="layui-tab-item">\
				  <fieldset class="layui-elem-field">\
				    <legend>动态点赞助手</legend>\
						 <form class="layui-form" action="" lay-filter="example">\
							 <div class="layui-form-item" pane="">\
							    <label class="layui-form-label">总开关</label>\
							    <div class="layui-input-block">\
									<!-- checked="" -->\
							      <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest" title="开关" lay-text="开启|关闭" id="friendActivitySwitch">\
							    </div>\
							  </div>\
						  </form>\
				    <div class="layui-field-box">\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置点赞内容:</legend>\
						</fieldset>\
						<form class="layui-form" action="">\
							<div class="layui-form-item">\
								<label class="layui-form-label">点赞内容:</label>\
								<div class="layui-input-block">\
								  <input type="checkbox" name="like[1]" lay-skin="primary" title="朋友发布了状态" checked=""><br>\
								  <input type="checkbox" name="like[2]" lay-skin="primary" title="朋友收藏了艺术作品" checked=""><br>\
								  <input type="checkbox" name="like[3]" lay-skin="primary" title="朋友收藏了创意工坊作品" checked=""><br>\
								  <input type="checkbox" name="like[4]" lay-skin="primary" title="朋友收藏了指南" checked=""><br>\
								  <input type="checkbox" name="like[5]" lay-skin="primary" title="朋友发布了艺术作品" checked=""><br>\
								  <input type="checkbox" name="like[6]" lay-skin="primary" title="朋友发布了创意工坊作品" checked=""><br>\
								  <input type="checkbox" name="like[7]" lay-skin="primary" title="朋友发布了指南" checked=""><br>\
								  <input type="checkbox" name="like[8]" lay-skin="primary" title="朋友购买了游戏或者" checked=""><br>\
								  <input type="checkbox" name="like[9]" lay-skin="primary" title="朋友上传了载图" checked=""><br>\
								  <input type="checkbox" name="like[10]" lay-skin="primary" title="朋友上传了视频" checked=""><br>\
								  <input type="checkbox" name="like[11]" lay-skin="primary" title="朋友发布了评测" checked=""><br>\
								  <input type="checkbox" name="like[12]" lay-skin="primary" title="组发布了通知" checked=""><br>\
								  <input type="checkbox" name="like[13]" lay-skin="primary" title="组发布了活动" checked=""><br>\
								</div>\
							  </div>\
						 </form>\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置自动点赞模式:</legend>\
						</fieldset>\
						<form class="layui-form" action="">\
							<div class="layui-form-item">\
								<label class="layui-form-label">点赞模式:</label>\
								<div class="layui-input-block">\
								  <input type="checkbox" name="like[1]" lay-skin="primary" title="运行后自动开始点赞" checked=""><br>\
								  <input type="checkbox" name="like[2]" lay-skin="primary" title="点赞完成后自动刷新并点赞新动态时间间隔" checked=""><br>\
								</div>\
							  </div>\
						 </form>\
						<fieldset class="layui-elem-field layui-field-title">\
						   <legend>设置自动点赞时间线:</legend>\
						</fieldset>\
						<div class="layui-form">\
						  <div class="layui-form-item">\
							    <div class="layui-inline">\
							      <label class="layui-form-label">请选择范围</label>\
							      <div class="layui-input-inline">\
							        <input type="text" class="layui-input" id="test-limit3" readonly="" placeholder=" ~ "> <!--placeholder="yyyy-MM-dd"-->\
							      </div>\
							    </div>\
						  </div>\
						</div>\
							<div>今天-之前7天的动态内容:</div>\
				    </div>\
				  </fieldset>\
				</div>\
				\
			    <div class="layui-tab-item">\
			      <fieldset class="layui-elem-field">\
			        <legend>喜加一助手</legend>\
			        <div class="layui-field-box">\
						<div>是否启动喜加一助手</div>\
						<div>自动获取喜加一信息</div>\
						<div>自动领取喜加一游戏</div>\
						<div>设置喜加一数据来源</div>\
			        </div>\
			      </fieldset>\
			    </div>\
				\
			    <div class="layui-tab-item">\
					<fieldset class="layui-elem-field">\
					  <legend>功能设置</legend>\
					  <div class="layui-field-box">\
						  \
						  <form class="layui-form" action="" lay-filter="example">\
							 <div class="layui-form-item" pane="">\
							    <label class="layui-form-label">喜加一助手</label>\
							    <div class="layui-input-block">\
									<!-- checked="" -->\
							      <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest2" title="开关" lay-text="开启|关闭">\
							    </div>\
							  </div>\
							  <div class="layui-form-item" pane="">\
							     <label class="layui-form-label">Debug模式</label>\
							     <div class="layui-input-block">\
							  									<!-- checked="" -->\
							       <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest3" title="开关" lay-text="开启|关闭">\
							     </div>\
							   </div>\
						  </form>\
							<div>弹出层</div>\
							<div>滑块</div>\
							<button type="button" class="layui-btn">导入导出重置当前设置</button>\
							<div>弹出层</div>\
							\
							<div class="layui-upload-drag" id="uploadDemo">\
							  <i class="layui-icon"></i>\
							  <p>点击上传，或将文件拖拽到此处</p>\
							  <div class="layui-hide" id="uploadDemoView">\
							    <hr>\
							    <img src="" alt="上传成功后渲染" style="max-width: 100%">\
							  </div>\
							</div>\
					  </div>\
					</fieldset>\
					\
					<fieldset class="layui-elem-field">\
					  <legend>界面设置</legend>\
					  <div class="layui-field-box">\
						 <fieldset class="layui-elem-field layui-field-title">\
						   <legend>语言配置</legend>\
						    <button type="button" class="layui-btn">自动检测(简体中文)</button>\
						 	<button type="button" class="layui-btn">简体中文</button>\
							<button type="button" class="layui-btn">繁体中文</button>\
							<button type="button" class="layui-btn">English</button>\
						 </fieldset>\
						  <fieldset class="layui-elem-field layui-field-title">\
						    <legend>主题切换</legend>\
							<div>请选择一个主题，然后点击应用</div>\
							<button type="button" class="layui-btn">应用主题</button>\
						  </fieldset>\
							<fieldset class="layui-elem-field layui-field-title">\
							  <legend>UI设置</legend>\
							  <div>预览:</div>\
							  <div>\
								主要字体颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all1"></div>\
								  </span>\
							  </div>\
							   <div>\
								主要背景颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all2"></div>\
								  </span>\
							  </div>\
							   <div>\
								留言成功字体颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all3"></div>\
								  </span>\
							  </div>\
							   <div>\
								留言失败字体颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all4"></div>\
								  </span>\
							  </div>\
							   <div>\
								留言发生错误字体颜色:\
								  <span style="margin-left: 30px;">\
									<input type="hidden" name="color" value="" id="test-all-input">\
									<div id="test-all5"></div>\
								  </span>\
							  </div>\
							  <button type="button" class="layui-btn">保存为主题</button>\
							</fieldset>\
							\
					  </div>\
					</fieldset>\
					\
					<fieldset class="layui-elem-field">\
					  <legend>关于 Steam assistant(Steam小助手)</legend>\
					  <div class="layui-field-box">\
						  <fieldset class="layui-elem-field layui-field-title">\
						    <legend>程序信息:</legend>\
							<div>当前版本: v0.2.3.0</div>\
							<div>主程序框架更新时间: 2020年4月19日</div>\
							<div>common 模块: 2020年4月19日</div>\
							<div>databaseConf 模块: 2020年4月19日</div>\
							<div>externalApis 模块: 2020年4月19日</div>\
							<div>steamApis 模块: 2020年4月19日</div>\
							<div>translateApis 模块: 2020年4月19日</div>\
							<div>Utility 模块: 2020年4月19日</div>\
							<div>UI 模块: 2020年4月19日</div>\
							<div>Event 模块: 2020年4月19日</div>\
							<div>CityList 模块: 2020年4月19日</div>\
							<fieldset class="layui-elem-field layui-field-title">\
							<legend>联系作者:</legend>\
							<button type="button" class="layui-btn">反馈错误</button>\
							<button type="button" class="layui-btn">提交建议</button>\
							\
					  </div>\
					</fieldset>\
					\
					<div id="sliderDemo" style="margin: 50px 20px;"></div>\
			    </div>\
				\
			  </div>\
			</div>'
		);

		jQuery('.selectBox').ySelect({
			placeholder: '请先选择要翻译为的语言',
			searchText: '搜索~发现新世界~',
			showSearch: true,
			numDisplayed: 4,
			overflowText: '已选中 {n}项',
			isCheck: false
		});

		//单选框选中和取消选中 https://segmentfault.com/q/1010000004945347
		jQuery('.nameAddType').on('click', function() {
			var ischecked = jQuery(this).data('checked');
			if (!ischecked && this.checked) {
				jQuery(this).data('checked', true);
			} else {
				jQuery(this).prop('checked', false);
				jQuery(this).data('checked', false);
			}
			console.log(jQuery(this).data('checked'))
		}).data('checked', jQuery('.nameAddType').get(0).checked);

		//2.构建UI	
		layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider', 'colorpicker', 'form'], function() {
			var $ = layui.$;
			var laydate = layui.laydate //日期
				,
				laypage = layui.laypage //分页
				,
				layer = layui.layer //弹层
				,
				table = layui.table //表格
				,
				carousel = layui.carousel //轮播
				,
				upload = layui.upload //上传
				,
				element = layui.element //元素操作
				,
				slider = layui.slider //滑块
				,
				colorpicker = layui.colorpicker
				,
				form = layui.form;
				;
			//console.log(layui.layer);

			//向世界问个好
			//layer.msg('Hello World');
			//layer.alert('见到你真的很高兴', {icon: 6});
			//layui.layer.alert("text");
			
			 //请选择日期
			  laydate.render({
			    elem: '#test-limit2'
				,trigger: 'click'
			    ,min: 0
			    ,max: 99999
			  });
			  //请选择时间
			  laydate.render({
			      elem: '#test14'
			      ,type: 'time'
			      ,format: 'H时m分s秒'
			    });
			
			//开启全功能
			  colorpicker.render({
			    elem: '#test-all1'
			    ,color: 'rgba(7, 155, 140, 1)'
			    ,format: 'rgb'
			    ,predefine: true
			    ,alpha: true
			    ,done: function(color){
			      $('#test-all-input').val(color); //向隐藏域赋值
			      layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
			      
			      color || this.change(color); //清空时执行 change
			    }
			    ,change: function(color){
			      //给当前页面头部和左侧设置主题色
			      $('.header-demo,.layui-side .layui-nav').css('background-color', color);
			    }
			  });
			  //开启全功能
			    colorpicker.render({
			      elem: '#test-all2'
			      ,color: 'rgba(7, 155, 140, 1)'
			      ,format: 'rgb'
			      ,predefine: true
			      ,alpha: true
			      ,done: function(color){
			        $('#test-all-input').val(color); //向隐藏域赋值
			        layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
			        
			        color || this.change(color); //清空时执行 change
			      }
			      ,change: function(color){
			        //给当前页面头部和左侧设置主题色
			        $('.header-demo,.layui-side .layui-nav').css('background-color', color);
			      }
			    });
				//开启全功能
				  colorpicker.render({
				    elem: '#test-all3'
				    ,color: 'rgba(7, 155, 140, 1)'
				    ,format: 'rgb'
				    ,predefine: true
				    ,alpha: true
				    ,done: function(color){
				      $('#test-all-input').val(color); //向隐藏域赋值
				      layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
				      
				      color || this.change(color); //清空时执行 change
				    }
				    ,change: function(color){
				      //给当前页面头部和左侧设置主题色
				      $('.header-demo,.layui-side .layui-nav').css('background-color', color);
				    }
				  });
				//开启全功能
				  colorpicker.render({
				    elem: '#test-all4'
				    ,color: 'rgba(7, 155, 140, 1)'
				    ,format: 'rgb'
				    ,predefine: true
				    ,alpha: true
				    ,done: function(color){
				      $('#test-all-input').val(color); //向隐藏域赋值
				      layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
				      
				      color || this.change(color); //清空时执行 change
				    }
				    ,change: function(color){
				      //给当前页面头部和左侧设置主题色
				      $('.header-demo,.layui-side .layui-nav').css('background-color', color);
				    }
				  });
				//开启全功能
				  colorpicker.render({
				    elem: '#test-all5'
				    ,color: 'rgba(7, 155, 140, 1)'
				    ,format: 'rgb'
				    ,predefine: true
				    ,alpha: true
				    ,done: function(color){
				      $('#test-all-input').val(color); //向隐藏域赋值
				      layer.tips('给指定隐藏域设置了颜色值：'+ color, this.elem);
				      
				      color || this.change(color); //清空时执行 change
				    }
				    ,change: function(color){
				      //给当前页面头部和左侧设置主题色
				      $('.header-demo,.layui-side .layui-nav').css('background-color', color);
				    }
				  });
				  
				  //监听折叠
				   element.on('collapse(test)', function(data){
				     layer.msg('展开状态：'+ data.show);
				   });
				  
				  //请选择日期
				   laydate.render({
				     elem: '#test-limit3'
					 ,type: 'date'
				  	 ,trigger: 'click'
					 ,range: '~'
				     ,min: -7
				     ,max: 0
					 ,value: '2020-4-12 ~ 2020-4-19'
					 ,isInitValue: true
				   });
				  
				  //监听指定开关
				  form.on('switch(switchTest)', async function(data){
				      layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
				        offset: '6px'
				      });
				      layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis);
					  
					  var customUrl = "miku-39";
					  var profileID = 76561198373290430;
					  
					  if(gc_friAct == null)
					  	gc_friAct = new friendActivity(profileID || customUrl);
					  	
					  if(this.checked == true) //打开了
					  {
					  	await gc_friAct.Run();
					  }
					  else //关闭了
					  {
					  	gc_friAct.Stop();
					  }
					  
				    });
				  	
				  
				  //但是，如果你的HTML是动态生成的，自动渲染就会失效
				  //因此你需要在相应的地方，执行下述方法来进行渲染
				  form.render();
				  
				  element.render('collapse');
		});

		//-------------------------------------------------------------------------------------------------------------------------------
		if (opinion() == 0) { //判断页面是pc端还是移动端
			dvWidthFix();
		}
		ToggleManageFriends();

		console.log("GameFreeInfoHelper call...");
		GameFreeInfoHelper(); //游戏免费信息助手

		var Obj = new CEmoticonPopup($J('#emoticonbtn'), $J('#commentthread_Profile_0_textarea'));
		//ShowAlertDialog( 'Community Ban & Delete Comments', 'You do not have permissions to view this or you are not logged in.' );
		//ShowConfirmDialog('您点击了移除好友按钮', '是否要移除选择的好友?','移除好友');

		setTimeout(async function() {
			Obj.LoadEmoticons();
			CEmoticonPopup.sm_deferEmoticonsLoaded.done(function() {
				async function a() {
					//console.log("loadDone");
					if (!Obj.m_$Popup)
						Obj.BuildPopup();
					else
						PositionEmoticonHover(Obj.m_$Popup, Obj.m_$EmoticonButton);
					await emojiFix();
				}
				a();
			});
		}, 0);
		console.log("注册所有的事件...");
		await registeredAllEvents(); //注册所有的事件
		addRemoveFriendRemind(); /*添加删除好友提醒*/
	}
	async private_saveUIConfFile() {

	}
	async private_readUIConfFile() {

	}
}
async function registeredAllEvents() //注册所有的事件
{
	jQuery("#addCustomName").click(async function() {
		var inString = document.getElementById("comment_textarea");
		inString.value += strRemarkPlaceholder;
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
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
				
				var nostrNoOperate = strNoOperate + "-N";
				
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
							if (SpecialName.indexOf(strNoOperate) != -1 || SpecialName.indexOf(nostrNoOperate) != -1) //检查是否设置了不留言标识
							{
								jQuery("#log_body1")[0].innerHTML +=
									"<a style='color:#00ffd8;' target='_blank' href=\"http://steamcommunity.com/profiles/" + profileID +
									"\">" + '[' + (i + 1) + '/' + total + '] 已跳过, 没有设置备注! ' + profileID + '  ' + SpecialName + "</a><br>";
								continue;
							}
							name = SpecialName;
							name = name + strNoOperate; //组合
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
				//--------------------------------------------------------------------
				SpecialName = undefined;
				steamName = undefined;
			
				var nostrNoOperate = strNoOperate + "-N";
			
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
							else if (SpecialName.lastIndexOf(strNoOperate) != -1) //检查是否设置了国籍标识
							{
								SpecialName = SpecialName.slice(0,SpecialName.lastIndexOf(strNoOperate)); //去掉国籍标识
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
							'" onfocus="this.focus();this.select();closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zhc\',false);" onClick="" onblur="inBoxonblurID=3;inBoxShrinkage(\'comment_textarea_zhc\',true);" placeholder="添加留言(中文简体)" style="overflow: hidden; height: 28px;"></textarea>\
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
							'" onfocus="this.focus();this.select();closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_en\',false);" onClick="" onblur="inBoxonblurID=1;inBoxShrinkage(\'comment_textarea_en\',true);" placeholder="添加留言(英语)" style="overflow: hidden; height: 28px;"></textarea>\
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
							'" onfocus="this.focus();this.select();closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_jp\',false);" onClick="" onblur="inBoxonblurID=2;inBoxShrinkage(\'comment_textarea_jp\',true);" placeholder="添加留言(日语)" style="overflow: hidden; height: 28px;"></textarea>\
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
							'" onfocus="this.focus();this.select();closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_sg\',false);" onClick="" onblur="inBoxonblurID=4;inBoxShrinkage(\'comment_textarea_zh_sg\',true);" placeholder="添加留言(马新简体)" style="overflow: hidden; height: 28px;"></textarea>\
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
							'" onfocus="this.focus();this.select();closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_hant\',false);" onClick="" onblur="inBoxonblurID=5;inBoxShrinkage(\'comment_textarea_zh_hant\',true);" placeholder="添加留言(繁體中文)" style="overflow: hidden; height: 28px;"></textarea>\
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
							'" onfocus="this.focus();this.select();closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_hk\',false);" onClick="" onblur="inBoxonblurID=6;inBoxShrinkage(\'comment_textarea_zh_hk\',true);" placeholder="添加留言(繁體中文(香港))" style="overflow: hidden; height: 28px;"></textarea>\
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
							'" onfocus="this.focus();this.select();closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_mo\',false);" onClick="" onblur="inBoxonblurID=7;inBoxShrinkage(\'comment_textarea_zh_mo\',true);" placeholder="添加留言(繁體中文(澳门))" style="overflow: hidden; height: 28px;"></textarea>\
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
							'" onfocus="this.focus();this.select();closeAllinBoxShrinkage();inBoxShrinkage(\'comment_textarea_zh_tw\',false);" onClick="" onblur="inBoxonblurID=8;inBoxShrinkage(\'comment_textarea_zh_tw\',true);" placeholder="添加留言(繁體中文(台湾))" style="overflow: hidden; height: 28px;"></textarea>\
								</div>'
						);
					}
					document.getElementById('comment_textarea_zh_tw').value = newStrText;
					if (change != undefined)
						change(null, 'comment_textarea_zh_tw'); //统计翻译后的文字长度
					break;
				default:
					break;
			}
	
	
	
	
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
			window.location.reload(true); //强制从服务器重新加载当前页面
		}
	
	});
	
	//---------------------------------------------------------------------------------------------------------------
	await jQuery("#comment_submit").click(async function() {
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
						newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
					} else {
						let str = msg;
						newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
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
					if (SpecialName.indexOf(strNoOperate) != -1) {
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
				await sleep(delay * 1000)
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
	
		} else {
			alert("请确保您输入了一条消息并选择了1个或更多好友。");
		}
	});
	
	//---------------------------------------------------------------------------------------------------------------
	await jQuery("#comment_submit_special").click(async function() {
		date = new Date();
		startTime = date.getTime();
	
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
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
							if(msg_EN == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_EN;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
							if(msg_JP == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_JP;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
							if(msg_CN_SG == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_SG;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
							if(msg_CN_HANT == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_HANT;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
							if(msg_CN_HK == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_HK;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
							if(msg_CN_MO == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_MO;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
							if(msg_CN_TW == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_TW;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
						} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
						{
							if (msg_EN != undefined && msg_EN != ""){
								let str = msg_EN;
								newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							}	
							else if (msg_JP != undefined && msg_JP != ""){
								let str = msg_JP;
								newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							}
							else if (msg_CN != undefined && msg_CN != ""){
								let str = msg_CN;
								newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
							}
							else{
								let str = msg;
								newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),SpecialName); //把占位符全部替换为备注
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
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						} else if (strNationality == "{EN}" || strNationality == "{EN-N}") {
							if(msg_EN == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_EN;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						} else if (strNationality == "{JP}" || strNationality == "{JP-N}") {
							if(msg_JP == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_JP;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						} else if (strNationality == "{CN-SG}" || strNationality == "{CN-SG-N}") {
							if(msg_CN_SG == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_SG;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						} else if (strNationality == "{CN-HANT}" || strNationality == "{CN-HANT-N}") {
							if(msg_CN_HANT == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_HANT;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						} else if (strNationality == "{CN-HK}" || strNationality == "{CN-HK-N}") {
							if(msg_CN_HK == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_HK;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						} else if (strNationality == "{CN-MO}" || strNationality == "{CN-MO-N}") {
							if(msg_CN_MO == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_MO;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						} else if (strNationality == "{CN-TW}" || strNationality == "{CN-TW-N}") {
							if(msg_CN_TW == undefined){
								return alert("您为选择的好友设置的国籍没有对应翻译过的文本，建议在'选择需要翻译的文本'那里的右上角选择全选，现在将停止运行.\n" + "好友名称:"+SpecialName+"国籍:"+strNationality);
							}
							let str = msg_CN_TW;
							newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
						} else //没有设置国籍则默认使用英文,日语,简体中文,原始语言
						{
							if (msg_EN != undefined && msg_EN != ""){
								let str = msg_EN;
								newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							}	
							else if (msg_JP != undefined && msg_JP != ""){
								let str = msg_JP;
								newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							}
							else if (msg_CN != undefined && msg_CN != ""){
								let str = msg_CN;
								newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
							}
							else{
								let str = msg;
								newMgs = str.replace(new RegExp(strRemarkPlaceholder, 'g'),steamName); //把占位符全部替换为steam名称
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
					if (SpecialName.indexOf(strNoOperate) != -1) {
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
				await sleep(delay * 1000)
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
	
		} else {
			alert("请确保您输入了一条消息并选择了1个或更多好友。");
		}
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

async function Main() {
	if (document.URL.lastIndexOf("/friends") == -1 || document.URL.indexOf("https://steamcommunity.com") == -1) {
		alert("请在打开的页面上,在Console(控制台)粘贴运行代码!");
		open("https://steamcommunity.com/my/friends");
	} else {
		var date;
		var startTime = 0,
			endTime = 0;
		
		if (delay < 0) delay = 0;
		
		(async()=>{
		var ui = new UI();
		await ui.initUI();
		await ui.createUI();
		})();
		
	}

}

Main();