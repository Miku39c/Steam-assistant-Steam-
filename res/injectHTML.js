var loadUI_Html = '\
<div class="text-wrapper">\
	<div class="text part1">\
		<div>\
			<span class="letter">\
				<div class="character">L</div> <span></span>\
			</span>\
			\
			<span class="letter">\
				<div class="character">o</div> <span></span>\
			</span>\
			\
			<span class="letter">\
				<div class="character">a</div> <span></span>\
			</span>\
			\
			<span class="letter">\
				<div class="character">d</div> <span></span>\
			</span>\
			\
			<span class="letter">\
				<div class="character">i</div> <span></span>\
			</span>\
			\
			<span class="letter">\
				<div class="character">n</div> <span></span>\
			</span>\
			\
			<span class="letter">\
				<div class="character">g</div> <span></span>\
			</span>\
		</div>\
	</div>\
	<div class="how-to"><span>正在加载资源中，已完成0/10，请您耐心等待...</span></div>\
</div>\
';

var mainUI_template = '\
<script type="text/html" id="switchTpl">\
	<!-- 这里的 checked 的状态只是演示 -->\
	<input type="checkbox" name="front" value="{{d.id}}" lay-skin="switch" lay-text="是|否" lay-filter="frontDemo" {{ d.id == 10003 ? \'checked\' : \'\' }}>\
</script>\
\
<script type="text/html" id="checkboxTpl">\
	<!-- 这里的 checked 的状态只是演示 -->\
	<input type="checkbox" name="lock" value="{{d.id}}" title="锁定" lay-filter="lockDemo" {{ d.id == 10006 ? \'checked\' : \'\' }}>\
</script>\
';

var mainUI_html = '\
<div class="layui-tab layui-tab-brief" lay-filter="demo">\
	<ul class="layui-tab-title" style="color: #ebebeb;">\
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
				<!--<textarea class="commentthread_textarea" id="comment_textarea" onfocus="this.focus();this.select();inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>-->\
				<textarea class="commentthread_textarea" id="comment_textarea" onfocus="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>\
			</div>\
			\
			<form class="layui-form" action="" lay-filter="example">\
				<div id="strInBytes" style="color: #32CD32;display: inline-block;font-family: Consolas;font-size: 16px;">当前字符字节数: <span id="strInBytes_Text">0</span>/999\</div>\
				<div class="layui-inline">\
					<label class="layui-form-label" style="width: auto;">文本格式(直接添加或选择文字添加):</label>\
					<div class="layui-input-inline">\
						<select name="modules" lay-verify="required" lay-search="" id="steamTextStyle">\
							<option value="">直接选择或搜索选择</option>\
							<option value="1">[h1] 标题文字 [/h1]</option>\
							<option value="2">[b] 粗体文本 [/b]</option>\
							<option value="3">[u] 下划线文本 [/u]</option>\
							<option value="4">[i] 斜体文本 [/i]</option>\
							<option value="5">[strike] 删除文本 [/strike]</option>\
							<option value="6">[spoiler] 隐藏文本 [/spoiler]</option>\
							<option value="7">[noparse] 不解析[b]标签[/b] [/noparse]</option>\
							<option value="8">[url=store.steampowered.com] 网站链接 [/url]</option>\
						</select>\
					</div>\
					<button type="button" class="layui-btn layui-btn-normal" id="LAY-component-form-getval">添加</button>\
				</div>\
			</form>\
			\
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
				\
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
				\
				<span style="margin-left: 5px;vertical-align: middle;">\
					<button id="translationText">翻译</button>\
				</span>\
			</div>\
			\
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
				\
				<span class="isName" style="display: block;text-align: left;">\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为好友添加称呼 (如果好友没有备注则使用steam名称)</span>\
					<input class="nameAddType" id="select_islName_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\
				</span>\
				\
				<span class="isSpecialName" style="display: block;text-align: left;">\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为好友添加称呼 (如果好友设置有备注则使用,否则不添加称呼)</span>\
					<input class="nameAddType" id="select_isSpecialName_checkbox" name="nameAddType"  type="radio" style="vertical-align: middle;margin:2px;">\
				</span>\
				\
				<fieldset class="layui-elem-field layui-field-title" style="padding: 10px 0px;">\
				<span style="display: block;text-align: right;">\
					<a class="btn_grey_black btn_small_thin" href="javascript:CCommentThread.FormattingHelpPopup( \'Profile\' );">\
						<span class="btn_grey_black btn_small_thin_text">格式化帮助</span>\
					</a>\
					\
					<span class="emoticon_container">\
						<span class="emoticon_button small" id="emoticonbtn"></span>\
					</span>\
					\
					<span class="btn_green_white_innerfade btn_small" id="comment_submit">\
						<span id="comment_submit_text">发送评论给选择的好友</span>\
					</span>\
					\
					<span class="btn_green_white_innerfade btn_small" id="comment_submit_special">\
						<span id="comment_submit_special_text">根据国籍发送评论给选择的好友</span>\
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
				<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\
				  <label class="layui-form-label">请选择留言</label> <!--这个是被点击对象，隐藏、不占空间、触发事件-->\
				  <div class="layui-input-inline">\
					<input type="text" class="layui-input" id="test-limit2" readonly="" placeholder="yyyy-MM-dd">\
				  </div>\
				</div>\
				<div class="layui-inline" style="position: relative;z-index: -1;">\
				  <label class="layui-form-label">留言日期差</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\
				  <div class="layui-input-inline">\
					<input type="text" class="layui-input" id="test-limit1" readonly="" placeholder="yyyy-MM-dd">\
				  </div>\
				</div>\
				\
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
			   <legend>设置自动留言计划:</legend>\
			</fieldset>\
			<div class="layui-form">\
			  <div class="layui-form-item">\
				<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\
					<label class="layui-form-label">请选择时间</label>  <!--这个是被点击对象，隐藏、不占空间、触发事件-->\
					<div class="layui-input-inline">\
						<input type="text" class="layui-input" id="test14" placeholder="H时m分s秒">\
					</div>\
				</div>\
				<div class="layui-inline" style="position: relative;z-index: -1;">\
					<label class="layui-form-label">请选择时间</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\
					<div class="layui-input-inline">\
						<input type="text" class="layui-input" id="test15" placeholder="H时m分s秒">\
					</div>\
				</div>\
			  </div>\
			</div>\
			\
			<table class="layui-hide" id="test" lay-filter="test"></table> <!-- 数据表格 -->\
			\
			<fieldset class="layui-elem-field layui-field-title">\
				<legend>设置好友分组:</legend>\
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
	  <div class="layui-tab" lay-filter="test1">\
		<ul class="layui-tab-title">\
		  <li class="layui-this" lay-id="11" style="color:#ebebeb;">好友数据统计</li>\
		  <li lay-id="22" style="color:#ebebeb;">留言数据统计</li>\
		  <li lay-id="33" style="color:#ebebeb;">关系网统计</li>\
		  <li lay-id="44" style="color:#ebebeb;">当前配置统计</li>\
		  <li lay-id="55" style="color:#ebebeb;">查看好友配置统计</li>\
		</ul>\
		<div class="layui-tab-content">\
			<div class="layui-tab-item layui-show">\
				分为:\
				数据表格(汇总所有的数据: id,名称,备注,国籍(城市),等级,好友数量,游戏数量,dlc数量,创意工坊数量,艺术作品数量,动态数量)\
				<table class="layui-hide" id="friendStatistics" lay-filter="friendStatistics"></table> <!--数据表格-->\
				<div id="container_friendStatistics" style="width: 600px;height:400px;"></div>\
			</div>\
			<div class="layui-tab-item">\
				分为:\
				按国籍的饼图(总留言数量)\
				按每天留言数据的折线图(统计所有的留言数据，生成的折线图)\
				按最多留言数据的柱状图(那些好友一天留言数量排行榜/那些好友总留言数量排行榜/累计连续每天留言数量最多)\
				数据表格(汇总所有的数据)\
				<div id="container_commentStatistics" style="min-width:400px;height:400px"></div>\
			</div>\
			<div class="layui-tab-item">\
				好友关系网(仅统计共同好友)\
				<div id="container_relationshipStatistics" style="min-width: 320px;max-width: 800px;margin: 0 auto;"></div>\
			</div>\
			<div class="layui-tab-item">\
				当前的配置数据和运行状态\
				<div id="container_currConfStatistics"></div>\
			</div>\
			<div class="layui-tab-item">\
				对好友设置的配置数据(比如国籍,不留言,留言时间间隔等)\
				<div id="container_friConfStatistics"></div>\
			</div>\
		  </div>\
	  </div>\
	  \
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
					<div class="layui-row">\
					   <div class="layui-input-block">\
							 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
								  <input type="checkbox" name="like[1]" lay-skin="primary" title="朋友发布了状态" checked=""><br>\
								  <input type="checkbox" name="like[2]" lay-skin="primary" title="朋友发布了评测" checked=""><br>\
								  <input type="checkbox" name="like[3]" lay-skin="primary" title="朋友购买了游戏或者DLC" checked=""><br>\
								  <input type="checkbox" name="like[4]" lay-skin="primary" title="组发布了通知" checked=""><br>\
								  <input type="checkbox" name="like[5]" lay-skin="primary" title="组发布了活动" checked=""><br>\
							 </div>\
							<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
								  <input type="checkbox" name="like[6]" lay-skin="primary" title="朋友发布了艺术作品" checked=""><br>\
								  <input type="checkbox" name="like[7]" lay-skin="primary" title="朋友发布了创意工坊作品" checked=""><br>\
								  <input type="checkbox" name="like[8]" lay-skin="primary" title="朋友发布了指南" checked=""><br>\
								  <input type="checkbox" name="like[9]" lay-skin="primary" title="朋友上传了载图" checked=""><br>\
								  <input type="checkbox" name="like[10]" lay-skin="primary" title="朋友上传了视频" checked=""><br>\
							</div>\
							<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
								  <input type="checkbox" name="like[11]" lay-skin="primary" title="朋友收藏了艺术作品" checked=""><br>\
								  <input type="checkbox" name="like[12]" lay-skin="primary" title="朋友收藏了创意工坊作品" checked=""><br>\
								  <input type="checkbox" name="like[13]" lay-skin="primary" title="朋友收藏了指南" checked=""><br>\
								  <input type="checkbox" name="like[14]" lay-skin="primary" title="朋友收藏了载图" checked=""><br>\
								  <input type="checkbox" name="like[15]" lay-skin="primary" title="朋友收藏了视频" checked=""><br>\
							</div>\
					   </div>\
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
			   <legend>设置自动点赞时间区间(默认今天~之前所有的动态内容)</legend>\
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
			<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">\
			  <legend style="color:#66ccff;">点赞进度时间线</legend>\
			</fieldset>\
			<ul class="layui-timeline">\
			  <li class="layui-timeline-item">\
				<i class="layui-icon layui-timeline-axis"></i>\
				<div class="layui-timeline-content layui-text">\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月18日</h3>\
				  <p style="color:#fff;">\
					已点赞状态x条，点赞发布艺术作品x条，点赞收藏艺术作品x条\
					<br>已点赞评测x条，点赞发布创意工坊x条，点赞收藏创意工坊x条\
					<br>已点赞购买状态x条，点赞发布指南x条，点赞收藏指南x条\
					<br>已点赞组通知x条，点赞上次载图x条，点赞收藏载图x条\
					<br>已点赞组活动x条，点赞上传视频x条，点赞收藏视频x条\
				  </p>\
				</div>\
			  </li>\
			  <li class="layui-timeline-item">\
				<i class="layui-icon layui-timeline-axis"></i>\
				<div class="layui-timeline-content layui-text">\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月16日</h3>\
				  <p style="color:#fff;">杜甫的思想核心是儒家的仁政思想，他有<em>“致君尧舜上，再使风俗淳”</em>的宏伟抱负。个人最爱的名篇有：</p>\
				  <ul style="color:#fff;">\
					<li>《登高》</li>\
					<li>《茅屋为秋风所破歌》</li>\
				  </ul>\
				</div>\
			  </li>\
			  <li class="layui-timeline-item">\
				<i class="layui-icon layui-timeline-axis"></i>\
				<div class="layui-timeline-content layui-text">\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月15日</h3>\
				  <p style="color:#fff;">\
					中国人民抗日战争胜利日\
					<br>常常在想，尽管对这个国家有这样那样的抱怨，但我们的确生在了最好的时代\
					<br>铭记、感恩\
					<br>所有为中华民族浴血奋战的英雄将士\
					<br>永垂不朽\
				  </p>\
				</div>\
			  </li>\
			  <li class="layui-timeline-item">\
				<i class="layui-icon layui-timeline-axis"></i>\
				<div class="layui-timeline-content layui-text">\
				  <div class="layui-timeline-title" style="color:#66ccff;">过去</div>\
				</div>\
			  </li>\
			</ul>\
		</div>\
	  </fieldset>\
	</div>\
	\
	<div class="layui-tab-item">\
	  <fieldset class="layui-elem-field">\
		<legend>喜加一助手</legend>\
		<div class="layui-field-box">\
			<!-- <div>是否启动喜加一助手</div> -->\
		<form class="layui-form" action="" lay-filter="example">\
			<div class="layui-form-item" pane="">\
			   <label class="layui-form-label">总开关</label>\
			   <div class="layui-input-block">\
				<!-- checked="" -->\
				 <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest2" title="开关" lay-text="开启|关闭" id="FreeGameSwitch">\
			   </div>\
			 </div>\
		</form>\
		<form class="layui-form" action="">\
			<div class="layui-form-item">\
				<label class="layui-form-label">设置:</label>\
				<div class="layui-row">\
				   <div class="layui-input-block">\
						 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[1]" lay-skin="primary" title="自动获取喜加一信息" checked=""><br>\
						 </div>\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[6]" lay-skin="primary" title="自动领取喜加一游戏" checked=""><br>\
						</div>\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[11]" lay-skin="primary" title="置顶显示在上方" checked=""><br>\
						</div>\
				   </div>\
				  </div>\
			  </div>\
		 </form>\
		 \
		 <div>设置喜加一数据来源</div>\
		 <form class="layui-form" action="">\
			<div class="layui-form-item">\
				<label class="layui-form-label">设置:</label>\
				<div class="layui-row">\
				   <div class="layui-input-block">\
						 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[1]" lay-skin="primary" title="SteamDB" checked=""><br>\
						 </div>\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[6]" lay-skin="primary" title="humblebundle" disabled=""><br>\
						</div>\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[11]" lay-skin="primary" title="fanatical" disabled=""><br>\
						</div>\
				   </div>\
				  </div>\
			  </div>\
		  </form>\
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
				\
				<fieldset class="layui-elem-field layui-field-title">\
				<legend>语言配置</legend>\
					<button type="button" class="layui-btn">自动检测(简体中文)</button>\
					<button type="button" class="layui-btn">简体中文</button>\
					<button type="button" class="layui-btn">繁体中文</button>\
					<button type="button" class="layui-btn">English</button>\
				</fieldset>\
				\
				<fieldset class="layui-elem-field layui-field-title">\
					<legend>主题切换</legend>\
					<div>请选择一个主题，然后点击应用</div>\
					<button type="button" class="layui-btn">应用主题</button>\
				</fieldset>\
				\
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
					\
					<div>\
					主要背景颜色:\
						<span style="margin-left: 30px;">\
							<input type="hidden" name="color" value="" id="test-all-input">\
							<div id="test-all2"></div>\
						</span>\
					</div>\
					\
					<div>\
					留言成功字体颜色:\
						<span style="margin-left: 30px;">\
							<input type="hidden" name="color" value="" id="test-all-input">\
							<div id="test-all3"></div>\
						</span>\
					</div>\
					\
					<div>\
					留言失败字体颜色:\
						<span style="margin-left: 30px;">\
							<input type="hidden" name="color" value="" id="test-all-input">\
							<div id="test-all4"></div>\
						</span>\
					</div>\
					\
					<div>\
					留言发生错误字体颜色:\
						<span style="margin-left: 30px;">\
							<input type="hidden" name="color" value="" id="test-all-input">\
							<div id="test-all5"></div>\
						</span>\
					</div>\
					\
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
				</div>\
		</fieldset>\
		\
		<div id="sliderDemo" style="margin: 50px 20px;"></div>\
	</div>\
	\
	</div>\
</div>\
';

var ExpandUI_QuickNavigationBar_html = //拓展UI-快捷导航栏的html代码
'<div style="position: fixed;top: 30%;right: 0;">\
	<div class="layui-input-block" style="margin-left:0; text-align: center;min-height:0;padding: 2px 0px;background: #282B33;">快捷导航栏</div>\
	\
	<ul class="layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="margin-right: 10px;">\
		<li class="layui-nav-item layui-nav-itemed">\
			<a href="javascript:;">好友分组</a>\
			<dl class="layui-nav-child">\
				<dd><a href="javascript:;">选项一</a></dd>\
				<dd><a href="javascript:;">选项二</a></dd>\
				<dd><a href="javascript:;">选项三</a></dd>\
				<dd><a href="">跳转项</a></dd>\
			</dl>\
		</li>\
		\
		<li class="layui-nav-item">\
			<a href="javascript:;">功能模块</a>\
			<dl class="layui-nav-child">\
				<dd><a href="javascript:;">选项一</a></dd>\
				<dd><a href="javascript:;">选项二</a></dd>\
				<dd><a href="javascript:;">选项三</a></dd>\
				<dd><a href="">跳转项</a></dd>\
			</dl>\
		</li>\
		\
		<li class="layui-nav-item">\
			<a href="javascript:;">其他</a>\
			<dl class="layui-nav-child">\
				<dd><a href="javascript:;">返回顶部</a></dd>\
				<dd><a href="javascript:;">返回底部</a></dd>\
				<dd><a href="javascript:;">选项三</a></dd>\
				<dd><a href="">跳转项</a></dd>\
			</dl>\
		</li>\
		\
		<li class="layui-nav-item">\
			<a href="javascript:;">解决方案</a>\
			<dl class="layui-nav-child">\
				<dd><a href="">移动模块</a></dd>\
				<dd><a href="">后台模版</a></dd>\
				<dd><a href="">电商平台</a></dd>\
			</dl>\
		</li>\
		\
		<li class="layui-nav-item"><a href="">云市场</a></li>\
		<li class="layui-nav-item"><a href="">社区</a></li>\
	</ul>\
</div>\
';


var groupUI_html = '\
<div class="layui-tab layui-tab-brief" lay-filter="demo">\
	<ul class="layui-tab-title" style="color: #ebebeb;">\
		<li class="layui-this">组留言</li>\
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
				<!--<textarea class="commentthread_textarea" id="comment_textarea" onfocus="this.focus();this.select();inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>-->\
				<textarea class="commentthread_textarea" id="comment_textarea" onfocus="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>\
			</div>\
			\
			<form class="layui-form" action="" lay-filter="example">\
				<div id="strInBytes" style="color: #32CD32;display: inline-block;font-family: Consolas;font-size: 16px;">当前字符字节数: <span id="strInBytes_Text">0</span>/999\</div>\
				<div class="layui-inline">\
					<label class="layui-form-label" style="width: auto;">文本格式(直接添加或选择文字添加):</label>\
					<div class="layui-input-inline">\
						<select name="modules" lay-verify="required" lay-search="" id="steamTextStyle">\
							<option value="">直接选择或搜索选择</option>\
							<option value="1">[h1] 标题文字 [/h1]</option>\
							<option value="2">[b] 粗体文本 [/b]</option>\
							<option value="3">[u] 下划线文本 [/u]</option>\
							<option value="4">[i] 斜体文本 [/i]</option>\
							<option value="5">[strike] 删除文本 [/strike]</option>\
							<option value="6">[spoiler] 隐藏文本 [/spoiler]</option>\
							<option value="7">[noparse] 不解析[b]标签[/b] [/noparse]</option>\
							<option value="8">[url=store.steampowered.com] 网站链接 [/url]</option>\
						</select>\
					</div>\
					<button type="button" class="layui-btn layui-btn-normal" id="LAY-component-form-getval">添加</button>\
				</div>\
			</form>\
			\
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
				\
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
				\
				<span style="margin-left: 5px;vertical-align: middle;">\
					<button id="translationText">翻译</button>\
				</span>\
			</div>\
			\
			<fieldset class="layui-elem-field layui-field-title">\
				<legend>添加称呼模块(需要提前设置备注):</legend>\
			</fieldset>\
			<div class="commentthread_entry_submitlink" style="">\
				<span class="isCustom" style="display: block;text-align: left;">\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">自定义称呼模式 (默认为{name}, 可以自行修改, 称呼为组名称<待完善>)</span>\
					<input class="nameAddType" id="select_isCustom_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\
					<span style="margin-left: 5px;vertical-align: middle;">\
						<button id="addCustomName">在留言框添加自定义称呼标识符</button>\
					</span>\
				</span>\
				\
				<span class="isName" style="display: block;text-align: left;">\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为留言添加称呼 (称呼为组名称<待完善>)</span>\
					<input class="nameAddType" id="select_islName_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\
				</span>\
				\
				<span class="isSpecialName" style="display: block;text-align: left;">\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为留言添加称呼 (称呼为组名称<待完善>)</span>\
					<input class="nameAddType" id="select_isSpecialName_checkbox" name="nameAddType"  type="radio" style="vertical-align: middle;margin:2px;">\
				</span>\
				\
				<fieldset class="layui-elem-field layui-field-title" style="padding: 10px 0px;">\
				<span style="display: block;text-align: right;">\
					<a class="btn_grey_black btn_small_thin" href="javascript:CCommentThread.FormattingHelpPopup( \'Profile\' );">\
						<span class="btn_grey_black btn_small_thin_text">格式化帮助</span>\
					</a>\
					\
					<span class="emoticon_container">\
						<span class="emoticon_button small" id="emoticonbtn"></span>\
					</span>\
					\
					<span class="btn_green_white_innerfade btn_small" id="comment_submit">\
						<span id="comment_submit_text">发送评论给选择的组</span>\
					</span>\
					\
					<span class="btn_green_white_innerfade btn_small" id="comment_submit_special">\
						<span id="comment_submit_special_text">根据国籍发送评论给选择的组</span>\
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
				<button id="setNationality">为选择的组设置国籍标识</button>\
			</span>\
			<span style="margin-left: 5px;vertical-align: top;">\
				<button id="unsetNationality">为选择的组取消国籍标识</button>\
			</span>\
			<br />\
			 <fieldset class="layui-elem-field layui-field-title">\
				<legend>设置不留言:</legend>\
			 </fieldset>\
			<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\
				<span>\
					<button id="setNoLeave">为选择的组设置不留言</button>\
				</span>\
				<span>\
					<button id="unsetNoLeave">为选择的组取消设置不留言</button>\
				</span>\
			</div>\
			<fieldset class="layui-elem-field layui-field-title">\
				<legend>设置留言时间间隔:</legend>\
			</fieldset>\
			<div id="">只选择日期则过n天后再留言，只选择时间则过x时后再留言(严格模式)，日期和时间都选择了则过n天x时后再留言(严格模式)</div>\
			<div id="">这里其实是一个时间差，比如指定的组3天留言一次，今天是4月10日，你就选择4月13日就行了，这样做方便一点</div>\
			<div class="layui-form">\
			  <div class="layui-form-item">\
				<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\
				  <label class="layui-form-label">请选择留言</label> <!--这个是被点击对象，隐藏、不占空间、触发事件-->\
				  <div class="layui-input-inline">\
					<input type="text" class="layui-input" id="test-limit2" readonly="" placeholder="yyyy-MM-dd">\
				  </div>\
				</div>\
				<div class="layui-inline" style="position: relative;z-index: -1;">\
				  <label class="layui-form-label">留言日期差</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\
				  <div class="layui-input-inline">\
					<input type="text" class="layui-input" id="test-limit1" readonly="" placeholder="yyyy-MM-dd">\
				  </div>\
				</div>\
				\
			  </div>\
			</div>\
			<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\
				<span>\
					<button id="setTimeInterval">为选择的组设置留言时间间隔</button>\
				</span>\
				<span>\
					<button id="unsetTimeInterval">为选择的组取消设置留言时间间隔</button>\
				</span>\
			</div>\
			\
			<fieldset class="layui-elem-field layui-field-title">\
			   <legend>设置自动留言计划:</legend>\
			</fieldset>\
			<div class="layui-form">\
			  <div class="layui-form-item">\
				<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\
					<label class="layui-form-label">请选择时间</label>  <!--这个是被点击对象，隐藏、不占空间、触发事件-->\
					<div class="layui-input-inline">\
						<input type="text" class="layui-input" id="test14" placeholder="H时m分s秒">\
					</div>\
				</div>\
				<div class="layui-inline" style="position: relative;z-index: -1;">\
					<label class="layui-form-label">请选择时间</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\
					<div class="layui-input-inline">\
						<input type="text" class="layui-input" id="test15" placeholder="H时m分s秒">\
					</div>\
				</div>\
			  </div>\
			</div>\
			\
			<table class="layui-hide" id="test" lay-filter="test"></table> <!-- 数据表格 -->\
			\
			<fieldset class="layui-elem-field layui-field-title">\
				<legend>设置组分组:</legend>\
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
					<button id="addFriendToGroup">为选择的组添加分组</button>\
				</span>\
				<span>\
					<button id="unaddFriendToGroup">为选择的组取消添加分组</button>\
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
		<button id="ShowFriendData">显示组详细数据(不可用)</button>\
	  </span>\
	  <div class="layui-tab" lay-filter="test1">\
		<ul class="layui-tab-title">\
		  <li class="layui-this" lay-id="11" style="color:#ebebeb;">组数据统计</li>\
		  <li lay-id="22" style="color:#ebebeb;">留言数据统计</li>\
		  <li lay-id="33" style="color:#ebebeb;">关系网统计</li>\
		  <li lay-id="44" style="color:#ebebeb;">当前配置统计</li>\
		  <li lay-id="55" style="color:#ebebeb;">查看组配置统计</li>\
		</ul>\
		<div class="layui-tab-content">\
			<div class="layui-tab-item layui-show">\
				分为:\
				数据表格(汇总所有的数据: id,名称,备注,国籍(城市),等级,好友数量,游戏数量,dlc数量,创意工坊数量,艺术作品数量,动态数量)\
				<table class="layui-hide" id="friendStatistics" lay-filter="friendStatistics"></table> <!--数据表格-->\
				<div id="container_friendStatistics" style="width: 600px;height:400px;"></div>\
			</div>\
			<div class="layui-tab-item">\
				分为:\
				按国籍的饼图(总留言数量)\
				按每天留言数据的折线图(统计所有的留言数据，生成的折线图)\
				按最多留言数据的柱状图(那些好友一天留言数量排行榜/那些好友总留言数量排行榜/累计连续每天留言数量最多)\
				数据表格(汇总所有的数据)\
				<div id="container_commentStatistics" style="min-width:400px;height:400px"></div>\
			</div>\
			<div class="layui-tab-item">\
				好友关系网(仅统计共同好友)\
				<div id="container_relationshipStatistics" style="min-width: 320px;max-width: 800px;margin: 0 auto;"></div>\
			</div>\
			<div class="layui-tab-item">\
				当前的配置数据和运行状态\
				<div id="container_currConfStatistics"></div>\
			</div>\
			<div class="layui-tab-item">\
				对好友设置的配置数据(比如国籍,不留言,留言时间间隔等)\
				<div id="container_friConfStatistics"></div>\
			</div>\
		  </div>\
	  </div>\
	  \
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
					<div class="layui-row">\
					   <div class="layui-input-block">\
							 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
								  <input type="checkbox" name="like[1]" lay-skin="primary" title="朋友发布了状态" checked=""><br>\
								  <input type="checkbox" name="like[2]" lay-skin="primary" title="朋友发布了评测" checked=""><br>\
								  <input type="checkbox" name="like[3]" lay-skin="primary" title="朋友购买了游戏或者DLC" checked=""><br>\
								  <input type="checkbox" name="like[4]" lay-skin="primary" title="组发布了通知" checked=""><br>\
								  <input type="checkbox" name="like[5]" lay-skin="primary" title="组发布了活动" checked=""><br>\
							 </div>\
							<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
								  <input type="checkbox" name="like[6]" lay-skin="primary" title="朋友发布了艺术作品" checked=""><br>\
								  <input type="checkbox" name="like[7]" lay-skin="primary" title="朋友发布了创意工坊作品" checked=""><br>\
								  <input type="checkbox" name="like[8]" lay-skin="primary" title="朋友发布了指南" checked=""><br>\
								  <input type="checkbox" name="like[9]" lay-skin="primary" title="朋友上传了载图" checked=""><br>\
								  <input type="checkbox" name="like[10]" lay-skin="primary" title="朋友上传了视频" checked=""><br>\
							</div>\
							<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
								  <input type="checkbox" name="like[11]" lay-skin="primary" title="朋友收藏了艺术作品" checked=""><br>\
								  <input type="checkbox" name="like[12]" lay-skin="primary" title="朋友收藏了创意工坊作品" checked=""><br>\
								  <input type="checkbox" name="like[13]" lay-skin="primary" title="朋友收藏了指南" checked=""><br>\
								  <input type="checkbox" name="like[14]" lay-skin="primary" title="朋友收藏了载图" checked=""><br>\
								  <input type="checkbox" name="like[15]" lay-skin="primary" title="朋友收藏了视频" checked=""><br>\
							</div>\
					   </div>\
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
			   <legend>设置自动点赞时间区间(默认今天~之前所有的动态内容)</legend>\
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
			<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">\
			  <legend style="color:#66ccff;">点赞进度时间线</legend>\
			</fieldset>\
			<ul class="layui-timeline">\
			  <li class="layui-timeline-item">\
				<i class="layui-icon layui-timeline-axis"></i>\
				<div class="layui-timeline-content layui-text">\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月18日</h3>\
				  <p style="color:#fff;">\
					已点赞状态x条，点赞发布艺术作品x条，点赞收藏艺术作品x条\
					<br>已点赞评测x条，点赞发布创意工坊x条，点赞收藏创意工坊x条\
					<br>已点赞购买状态x条，点赞发布指南x条，点赞收藏指南x条\
					<br>已点赞组通知x条，点赞上次载图x条，点赞收藏载图x条\
					<br>已点赞组活动x条，点赞上传视频x条，点赞收藏视频x条\
				  </p>\
				</div>\
			  </li>\
			  <li class="layui-timeline-item">\
				<i class="layui-icon layui-timeline-axis"></i>\
				<div class="layui-timeline-content layui-text">\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月16日</h3>\
				  <p style="color:#fff;">杜甫的思想核心是儒家的仁政思想，他有<em>“致君尧舜上，再使风俗淳”</em>的宏伟抱负。个人最爱的名篇有：</p>\
				  <ul style="color:#fff;">\
					<li>《登高》</li>\
					<li>《茅屋为秋风所破歌》</li>\
				  </ul>\
				</div>\
			  </li>\
			  <li class="layui-timeline-item">\
				<i class="layui-icon layui-timeline-axis"></i>\
				<div class="layui-timeline-content layui-text">\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月15日</h3>\
				  <p style="color:#fff;">\
					中国人民抗日战争胜利日\
					<br>常常在想，尽管对这个国家有这样那样的抱怨，但我们的确生在了最好的时代\
					<br>铭记、感恩\
					<br>所有为中华民族浴血奋战的英雄将士\
					<br>永垂不朽\
				  </p>\
				</div>\
			  </li>\
			  <li class="layui-timeline-item">\
				<i class="layui-icon layui-timeline-axis"></i>\
				<div class="layui-timeline-content layui-text">\
				  <div class="layui-timeline-title" style="color:#66ccff;">过去</div>\
				</div>\
			  </li>\
			</ul>\
		</div>\
	  </fieldset>\
	</div>\
	\
	<div class="layui-tab-item">\
	  <fieldset class="layui-elem-field">\
		<legend>喜加一助手</legend>\
		<div class="layui-field-box">\
			<!-- <div>是否启动喜加一助手</div> -->\
		<form class="layui-form" action="" lay-filter="example">\
			<div class="layui-form-item" pane="">\
			   <label class="layui-form-label">总开关</label>\
			   <div class="layui-input-block">\
				<!-- checked="" -->\
				 <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest2" title="开关" lay-text="开启|关闭" id="FreeGameSwitch">\
			   </div>\
			 </div>\
		</form>\
		<form class="layui-form" action="">\
			<div class="layui-form-item">\
				<label class="layui-form-label">设置:</label>\
				<div class="layui-row">\
				   <div class="layui-input-block">\
						 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[1]" lay-skin="primary" title="自动获取喜加一信息" checked=""><br>\
						 </div>\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[6]" lay-skin="primary" title="自动领取喜加一游戏" checked=""><br>\
						</div>\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[11]" lay-skin="primary" title="置顶显示在上方" checked=""><br>\
						</div>\
				   </div>\
				  </div>\
			  </div>\
		 </form>\
		 \
		 <div>设置喜加一数据来源</div>\
		 <form class="layui-form" action="">\
			<div class="layui-form-item">\
				<label class="layui-form-label">设置:</label>\
				<div class="layui-row">\
				   <div class="layui-input-block">\
						 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[1]" lay-skin="primary" title="SteamDB" checked=""><br>\
						 </div>\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[6]" lay-skin="primary" title="humblebundle" disabled=""><br>\
						</div>\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\
							  <input type="checkbox" name="like[11]" lay-skin="primary" title="fanatical" disabled=""><br>\
						</div>\
				   </div>\
				  </div>\
			  </div>\
		  </form>\
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
				\
				<fieldset class="layui-elem-field layui-field-title">\
				<legend>语言配置</legend>\
					<button type="button" class="layui-btn">自动检测(简体中文)</button>\
					<button type="button" class="layui-btn">简体中文</button>\
					<button type="button" class="layui-btn">繁体中文</button>\
					<button type="button" class="layui-btn">English</button>\
				</fieldset>\
				\
				<fieldset class="layui-elem-field layui-field-title">\
					<legend>主题切换</legend>\
					<div>请选择一个主题，然后点击应用</div>\
					<button type="button" class="layui-btn">应用主题</button>\
				</fieldset>\
				\
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
					\
					<div>\
					主要背景颜色:\
						<span style="margin-left: 30px;">\
							<input type="hidden" name="color" value="" id="test-all-input">\
							<div id="test-all2"></div>\
						</span>\
					</div>\
					\
					<div>\
					留言成功字体颜色:\
						<span style="margin-left: 30px;">\
							<input type="hidden" name="color" value="" id="test-all-input">\
							<div id="test-all3"></div>\
						</span>\
					</div>\
					\
					<div>\
					留言失败字体颜色:\
						<span style="margin-left: 30px;">\
							<input type="hidden" name="color" value="" id="test-all-input">\
							<div id="test-all4"></div>\
						</span>\
					</div>\
					\
					<div>\
					留言发生错误字体颜色:\
						<span style="margin-left: 30px;">\
							<input type="hidden" name="color" value="" id="test-all-input">\
							<div id="test-all5"></div>\
						</span>\
					</div>\
					\
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
				</div>\
		</fieldset>\
		\
		<div id="sliderDemo" style="margin: 50px 20px;"></div>\
	</div>\
	\
	</div>\
</div>\
';


var winBaseFrame = '\
<div></div>\
';

