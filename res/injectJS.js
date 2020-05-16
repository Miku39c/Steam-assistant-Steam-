/**
 * injectJS.js
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

