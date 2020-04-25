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

function addNewModule(id, newScript){
	var styleElement = document.getElementById(id);
	
	if (!styleElement) {
		styleElement = document.createElement('script');
		styleElement.type = 'module';
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

async function getResourceByURL(resourceURL,retDataMode){ //获取URL对应的资源数据
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
				
				if(retDataMode == true)
					retData = response.responseText;
				else
					retData = response;
				
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
