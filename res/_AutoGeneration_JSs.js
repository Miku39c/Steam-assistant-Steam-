/**
 * JS_library.js
 * @file 此文件存储注入到主页面上的js代码 [一般来说是主页面代码需要 或者 方便控制台进行调试]
 */

function wordCount(data) {
	var intLength = 0;
	for (var i = 0; i < data.length; i++) {
		if ((data.charCodeAt(i) < 0) || (data.charCodeAt(i) > 255))
			intLength = intLength + 3;
		else
			intLength = intLength + 1;
	}
	return intLength;
}

//var arrComment = []; /*id文本框的id, height文本框的高度, scrollTop存储收缩状态下的进度条, visible可见性*/
function inBoxShrinkage(id,type,mode = true){ /*参数: string 要伸缩的文本框id,boolean 是收缩还是伸展,boolean 需不需要重置滚动条(默认重置)*/
	var iArr = -1;
	for(let i=0;i<arrComment.length;i++){
		if(arrComment[i].id == id){
			iArr = i; /*记录旧节点的下标*/
			/*console.log('记录旧节点的下标','iArr',iArr);*/
			break;
		}
	}
	if(iArr == -1){
		arrComment.push( {id: id, height: 0, scrollTop: 0, visible: true} ); /*没有找到则是新的节点,就添加*/
		iArr = arrComment.length - 1 ; /*设置新节点的下标*/
	}
	var nHeight = arrComment[iArr].height; /*裁切字符串获取下标*/
	if(nHeight==0){ /*第一次,没有指定的样式*/
		nHeight = document.getElementById('comment_textarea').scrollHeight + 'px'; /*对于每个节点使用当前高度*/
	}
	var commentText = document.getElementById(id);
	if (type == true){
		commentText.removeEventListener('propertychange', change, false);
		commentText.removeEventListener('input', change, false);
		commentText.removeEventListener('focus', change, false);
		commentText.scrollTop = 0;
		
		/*代码位于event.js translationText翻译按钮事件*/
		/*代码位于uiHandler.js 获取输入框和注册的scroll事件*/
		/*代码位于ui.js inBoxShrinkage()判断是否需要重新进行定位*/
		/*https://blog.csdn.net/zhengbo0/article/details/7629506*/
		/*https://www.jb51.net/article/104047.htm*/
		/*如果留言框文本过长超过页面显示范围 或者 文本框不可见时，就重新进行定位 */
		if((mode && arrComment[iArr].height > document.documentElement.clientHeight) || (mode && arrComment[iArr].visible == false)){
			document.body.scrollTop = arrComment[iArr].scrollTop;
			document.documentElement.scrollTop = arrComment[iArr].scrollTop;
			console.log('重新进行定位');
		}
		commentText.style.height = '28px';
	}
	else if (type == false){
		autoTextarea(commentText);
		if(mode){
			arrComment[iArr].scrollTop = document.documentElement.scrollTop; /*设置 存储收缩状态下的进度条*/
		}
		commentText.style.height = nHeight + 'px';
	}
	else if (type == 'test'){
		if(mode){
			arrComment[iArr].scrollTop = document.documentElement.scrollTop; /*设置 存储收缩状态下的进度条*/
		}
		commentText.style.height = nHeight + 'px';
	}
}

var change;
var autoTextarea = function autoTextarea(elem, extra, maxHeight) {
	extra = extra || 0;
	var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
		isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
		addEvent = function(type, callback) {
			elem.addEventListener ?
				elem.addEventListener(type, callback, false) :
				elem.attachEvent('on' + type, callback);
		},
		getStyle = elem.currentStyle ? function(name) {
			var val = elem.currentStyle[name];
			if (name === 'height' && val.search(/px/i) !== 1) {
				var rect = elem.getBoundingClientRect();
				return rect.bottom - rect.top -
					parseFloat(getStyle('paddingTop')) -
					parseFloat(getStyle('paddingBottom')) + 'px';
			};
			return val;
		} : function(name) {
			return getComputedStyle(elem, null)[name];
		},
		minHeight = parseFloat(getStyle('height'));
	elem.style.resize = 'none';
	
	change = function(e,id) {
			var scrollTop, height,
				padding = 0,
				style = elem.style;
			var obj = document.getElementById('strInBytes');
			var commentText;
			if(id == undefined || id == null)
				commentText = document.getElementById(window.event.target.id);
			else
				commentText = document.getElementById(id);
			var numText = wordCount(commentText.value);
			obj.innerHTML =  "当前字符字节数: <span id='strInBytes_Text'>" + numText + '</span>/999';
			if (wordCount(commentText.value) >= 1000) {
				document.getElementById('strInBytes_Text').style.color = '#FF0000';
				commentText.style.background = '#7C243E';
				if(g_conf[0].isCommentRunStatus == false)/*如果正在留言则不清除(没有留言则清除)*/
					jQuery('#log_head').html('');
				jQuery('#log_head').html("<br><b style='color:#2CD8D6;'>字数超标啦! 请保持在1000字符以下. " + '当前字数:' + numText + '<b>');
				g_conf[0].isWarnInfo = true;
			} else {
				document.getElementById('strInBytes_Text').style.color = '#32CD32';
				commentText.style.background = '#1b2838';
				if(g_conf[0].isCommentRunStatus == false && g_conf[0].isWarnInfo == true){ /*没有留言并且有警告信息才清除*/
					jQuery('#log_head').html('');
					g_conf[0].isWarnInfo = false;
				}
			}
			if (elem._length === elem.value.length) return;
				elem._length = elem.value.length;
			if (!isFirefox && !isOpera) {
				padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
			};
			scrollTop = document.body.scrollTop || document.documentElement.scrollTop; /*定位到最后*/
			elem.style.height = minHeight + 'px';
			if (elem.scrollHeight >= minHeight) {
				if (maxHeight && elem.scrollHeight > maxHeight) {
					height = maxHeight - padding;
					style.overflowY = 'auto';
				} else {
					height = elem.scrollHeight - padding;
					style.overflowY = 'hidden';
				};
				style.height = height + extra + 'px';
				var nHeight1 = height + extra;
				/*console.log('nHeight1',nHeight1,'newStr',newStr);*/
				/*https://blog.csdn.net/weixin_34281477/article/details/93702604*/
				/*https://www.cnblogs.com/cblogs/p/9293522.html*/
				/*https://www.w3school.com.cn/tiy/t.asp?f=jseg_replace_1*/
				var iIndex;
				for(let i=0;i<arrComment.length;i++)
				{
					if(id == undefined || id == null){
						if(arrComment[i].id == window.event.target.id){
							iIndex = i;
							break;
						}
					}
					else{
						if(arrComment[i].id == id){
							iIndex = i;
							break;
						}
					}
				}
				
				arrComment[iIndex].height = nHeight1;/*存储*/
				scrollTop += parseInt(style.height) - elem.currHeight;
				if(!isNaN(scrollTop)){
					document.body.scrollTop = scrollTop;
					document.documentElement.scrollTop = scrollTop;
				}
				elem.currHeight = parseInt(style.height);
			};
	};
	addEvent('propertychange', change);
	addEvent('input', change);
	/*addEvent('focus', change);*/
	change();
};

function openThisAndCloseOtherAllinBoxShrinkage(id,type){ /*打开这个，关闭其他所有的inBoxShrinkage*/
	inBoxShrinkage(id,type); /*展开*/
	if(id != 'comment_textarea' && document.getElementById('comment_textarea') != null)
		inBoxShrinkage('comment_textarea',true,false);
	if(id != 'comment_textarea_en' && document.getElementById('comment_textarea_en') != null)
		inBoxShrinkage('comment_textarea_en',true,false);
	if(id != 'comment_textarea_jp' && document.getElementById('comment_textarea_jp') != null)
		inBoxShrinkage('comment_textarea_jp',true,false);
	if(id != 'comment_textarea_zhc' && document.getElementById('comment_textarea_zhc') != null)
		inBoxShrinkage('comment_textarea_zhc',true,false);
	if(id != 'comment_textarea_zh_sg' && document.getElementById('comment_textarea_zh_sg') != null)
		inBoxShrinkage('comment_textarea_zh_sg',true,false);
	if(id != 'comment_textarea_zh_hant' && document.getElementById('comment_textarea_zh_hant') != null)
		inBoxShrinkage('comment_textarea_zh_hant',true,false);
	if(id != 'comment_textarea_zh_hk' && document.getElementById('comment_textarea_zh_hk') != null)
		inBoxShrinkage('comment_textarea_zh_hk',true,false);
	if(id != 'comment_textarea_zh_mo' && document.getElementById('comment_textarea_zh_mo') != null)
		inBoxShrinkage('comment_textarea_zh_mo',true,false);
	if(id != 'comment_textarea_zh_tw' && document.getElementById('comment_textarea_zh_tw') != null)
		inBoxShrinkage('comment_textarea_zh_tw',true,false);
}

var inBoxonblurID = 0;
function addEmojiEvent(emojiCode)
{
	switch (inBoxonblurID){
		case 0:
			let inObj = document.getElementById('comment_textarea');
			inObj.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea'); /*统计翻译后的文字长度*/
			break;
		case 1:
			let inObj1 = document.getElementById('comment_textarea_en');
			inObj1.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea_en'); /*统计翻译后的文字长度*/
			break;
		case 2:
			let inObj2 = document.getElementById('comment_textarea_jp');
			inObj2.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea_jp'); /*统计翻译后的文字长度*/
			break;
		case 3:
			let inObj3 = document.getElementById('comment_textarea_zhc');
			inObj3.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea_zhc'); /*统计翻译后的文字长度*/
			break;
		case 4:
			let inObj4 = document.getElementById('comment_textarea_zh_sg');
			inObj4.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea_zh_sg'); /*统计翻译后的文字长度*/
			break;
		case 5:
			let inObj5 = document.getElementById('comment_textarea_zh_hant');
			inObj5.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea_zh_hant'); /*统计翻译后的文字长度*/
			break;
		case 6:
			let inObj6 = document.getElementById('comment_textarea_zh_hk');
			inObj6.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea_zh_hk'); /*统计翻译后的文字长度*/
			break;
		case 7:
			let inObj7 = document.getElementById('comment_textarea_zh_mo');
			inObj7.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea_zh_mo'); /*统计翻译后的文字长度*/
			break;
		case 8:
			let inObj8 = document.getElementById('comment_textarea_zh_tw');
			inObj8.value += ':' + emojiCode + ':'; /*添加表情*/
			if(change != undefined)
				change(null, 'comment_textarea_zh_tw'); /*统计翻译后的文字长度*/
			break;
		default:
			break;
	}
}
//----------------------------------------------------------------------------------------
function emojiFix() { /*修复表情*/
	console.log("表情开始修复...");
	let obj = document.getElementsByClassName("emoticon_popup es_emoticons")[0];
	if (obj != undefined) {
		obj.style.position = "relative";
		obj.style.zIndex = "999";
	}

	let obj1 = document.getElementsByClassName("emoticon_popup_ctn")[0];
	if (obj1 != undefined) {
		obj1.style.zIndex = "999";
	}

	let emojiObjArrs = document.getElementsByClassName("emoticon_option");
	if (emojiObjArrs.length > 0) {
		for (let i in emojiObjArrs) {
			emojiObjArrs[i].onclick = function() {
				addEmojiEvent(emojiObjArrs[i].getAttribute('data-emoticon'));
			}
		}
		console.log("表情修复完毕!");
	}
	/*console.log("修复表情错误!");*/
}

function dvWidthFix() { /*用于修复PC端留言提示内容溢出导致布局发生错误的问题*/
	$("subpage_container").style.width = "calc(100% - 280px)";
}

function deleteSelectText(){ /*删除选择的文本*/
	window.getSelection().deleteFromDocument(); /*删除选择的文本*/
}

var _ySelectsObj;
function _ySelects($) {
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
				_ySelectsObj = data;
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
}


/* 预定义的资源模式 */
const _RESMODE = {
	res_Tampermonkey: "Tampermonkey-Res",
	res_CDN: "CDN-CommonRequest",
	res_LocalVariables: "JS-LocalVariables"
};

/* 预定义的资源类型 */
const _RESTYPE = {
	res_css: "css",
	res_js: "js",
	res_json: "json"
};

/**
 * 通过资源id获取对应的资源列表, 返回资源列表数组 resInfo
 * @param {String} strResID 资源id
 */
function getResConfByID(strResID){
	if(_resConf){
		for (let i = 0; i < _resConf.length; i++) {
			if(_resConf[i].resID == strResID)
				return _resConf[i].resInfo;
		}
		return new Error("[sophie] not find strResID.");
	}
	else{
		throw new Error("[sophie] _resConf is undefined.");
	}
}

function patchJS_layui(resData){
	//对 o.prototype.addcss 打补丁，使其直接return this, 而不是去加载css, css通过脚本欲加载的资源手动添加
	var findStr = 'layui.link(n.dir+"css/"+e,t,o)';
	var index = resData.indexOf(findStr); //查找代补丁代码的位置
	var fixJS = resData.slice(0,index); //提取 代补丁代码前部分
	fixJS += 'this'; //添加 补丁代码
	fixJS += resData.slice(index+findStr.length); //提取 代补丁代码后部分
	return fixJS;
}

/* 不存在绝对的资源加载优先级，代码控制加载先后顺序，采用遍历指定资源id的形式去加载资源，同一资源id下的不同资源加载采用争抢模式 */
/* 也可以手动设置是否需要进行资源加载速度测试，从而从当前最优资源加载途径进行加载 */
const _resConf = [
	{
		resID: "BaseResources", //资源唯一id
		resInfo: [     //资源相关信息
			{
				resName: "css_layui",        //资源名称
				resDescription: "layui库所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_layui"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/css/layui.css",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/css/layui.css",
							"https://cdn.90so.net/layui/2.5.6/css/layui.css",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_laydate",        //资源名称
				resDescription: "layui库(laydate组件)所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_laydate"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9",
							"https://cdn.90so.net/layui/2.5.6/css/modules/laydate/default/laydate.css?v=5.0.9",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_layer",        //资源名称
				resDescription: "layui库(layer组件)所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_layer"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/css/modules/layer/default/layer.css?v=3.1.1",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/css/modules/layer/default/layer.css?v=3.1.1",
							"https://cdn.90so.net/layui/2.5.6/css/modules/layer/default/layer.css?v=3.1.1",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_layui_Modules",        //资源名称
				resDescription: "layui库(组件)所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_layui_Modules"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/css/modules/code.css",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/css/modules/code.css",
							"https://cdn.90so.net/layui/2.5.6/css/modules/code.css",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_fontAwesome",        //资源名称
				resDescription: "fontAwesome库所需的css", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["css_fontAwesome"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_css,
						isFight: false,
						sourceInfo: [
							"https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css",
							"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
							"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highstock/highstock.js",
							"https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.1.0/highstock.min.js",
							"https://cdn.bootcdn.net/ajax/libs/highcharts/8.1.0/highstock.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock_exporting",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock_exporting"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highcharts/modules/exporting.js",
							"https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.1.0/modules/exporting.min.js",
							"https://cdn.bootcdn.net/ajax/libs/highcharts/8.1.0/modules/exporting.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock_oldie",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock_oldie"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highcharts/modules/oldie.js",
							"https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.1.0/modules/oldie.src.min.js",
							"https://cdn.bootcdn.net/ajax/libs/highcharts/8.1.0/modules/oldie.js",
						],
						onSucceed: null ,//如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock_networkgraph",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock_networkgraph"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highcharts/modules/networkgraph.js",
							"https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.1.0/modules/networkgraph.min.js",
							"https://cdn.bootcdn.net/ajax/libs/highcharts/8.1.0/modules/networkgraph.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_highstock_zh_CN",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_highstock_zh_CN"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_layui",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_layui"],
						onSucceed: patchJS_layui //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://www.layuicdn.com/layui-v2.5.6/layui.all.js",
							"https://cdnjs.cloudflare.com/ajax/libs/layui/2.5.6/layui.all.min.js",
							"https://cdn.90so.net/layui/2.5.6/layui.all.js",
						],
						onSucceed: patchJS_layui //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "JS_localforage",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["JS_localforage"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js",
							"https://cdn.90so.net/localforage/1.7.3/localforage.min.js",
							"https://cdn.bootcdn.net/ajax/libs/localforage/1.7.3/localforage.min.js",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "css_jquery_localizationTool",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_LocalVariables,
						resType: _RESTYPE.res_css,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["jquery_localizationTool_css"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "js_jquery_localizationTool",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resMode: _RESMODE.res_Tampermonkey,
						resType: _RESTYPE.res_js,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: ["Jquery_localizationtool"],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resMode: _RESTYPE.res_CDN,
						resType: _RESTYPE.res_js,
						isFight: false,
						sourceInfo: [
							"https://greasyfork.org/scripts/403927-jquery-localizationtool-js/code/jquerylocalizationTooljs.js?version=808323",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			}
		]
	},
	{
		resID: "ExpandResources", //资源唯一id
		resInfo: [     //资源相关信息
			{
				resName: "",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resType: _RESTYPE.res_Tampermonkey,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resType: _RESTYPE.res_CDN,
						isFight: false,
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resType: _RESTYPE.res_Tampermonkey,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resType: _RESTYPE.res_CDN,
						isFight: false,
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			},
			{
				resName: "",        //资源名称
				resDescription: "", //资源描述
				res: [ //资源信息: 为了保证最大可用性, 资源可以从多种途径加载, 越前的资源加载优先级越高
					{
						resType: _RESTYPE.res_Tampermonkey,
						isFight: false, // 同一个资源下，可以手动设置是否需要启动争抢模式，谁先加载完就使用谁的
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					},
					{
						resType: _RESTYPE.res_CDN,
						isFight: false,
						sourceInfo: [
							"",
							"",
						],
						onSucceed: null //如果获取资源成功后的回调函数(立刻触发，可用于取消加载资源，资源检查等)
					}
				]
			}
		]
	}
];


function injectJS(){
	var funcCode = "";
	funcCode += wordCount.toString() + "\n\n";
	funcCode += "var arrComment = []; /*id文本框的id, height文本框的高度, scrollTop存储收缩状态下的进度条, visible可见性*/" + "\n";
	funcCode += inBoxShrinkage.toString() + "\n\n";
	funcCode += "var change;" + "\n";
	funcCode += autoTextarea.toString() + "\n\n";
	funcCode += openThisAndCloseOtherAllinBoxShrinkage.toString() + "\n\n";
	funcCode += "var inBoxonblurID = 0;" + "\n";
	funcCode += addEmojiEvent.toString() + "\n\n";
	addNewScript('styles_Script',funcCode);
	
	var funcCode = "";
	funcCode += emojiFix.toString() + "\n\n";
	funcCode += dvWidthFix.toString() + "\n\n";
	funcCode += deleteSelectText.toString() + "\n\n";
	funcCode += _ySelects.toString() + "\n\n";
	addNewScript('Utility_Script',funcCode);
}

