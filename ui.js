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
			layer.msg('Hello World');
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
