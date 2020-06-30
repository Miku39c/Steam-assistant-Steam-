var ExpandUI_QuickNavigationBar_html = '\
/*拓展UI-快捷导航栏的html代码*/\n\
<div style="position: fixed;top: 30%;right: 0;">\n\
	<div class="localTool-1-1 layui-input-block" style="margin-left:0; text-align: center;min-height:0;padding: 2px 0px;background: #282B33;">快捷导航栏</div>\n\
	\n\
	<ul class="layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="margin-right: 10px;">\n\
		<li class="layui-nav-item layui-nav-itemed">\n\
			<a href="javascript:;">好友分组</a>\n\
			<dl class="layui-nav-child">\n\
				<dd><a href="javascript:;">选项一</a></dd>\n\
				<dd><a href="javascript:;">选项二</a></dd>\n\
				<dd><a href="javascript:;">选项三</a></dd>\n\
				<dd><a href="">跳转项</a></dd>\n\
			</dl>\n\
		</li>\n\
		\n\
		<li class="layui-nav-item">\n\
			<a href="javascript:;">功能模块</a>\n\
			<dl class="layui-nav-child">\n\
				<dd><a href="javascript:;">选项一</a></dd>\n\
				<dd><a href="javascript:;">选项二</a></dd>\n\
				<dd><a href="javascript:;">选项三</a></dd>\n\
				<dd><a href="">跳转项</a></dd>\n\
			</dl>\n\
		</li>\n\
		\n\
		<li class="layui-nav-item">\n\
			<a href="javascript:;">其他</a>\n\
			<dl class="layui-nav-child">\n\
				<dd><a href="javascript:;">返回顶部</a></dd>\n\
				<dd><a href="javascript:;">返回底部</a></dd>\n\
				<dd><a href="javascript:;">选项三</a></dd>\n\
				<dd><a href="">跳转项</a></dd>\n\
			</dl>\n\
		</li>\n\
		\n\
		<li class="layui-nav-item">\n\
			<a href="javascript:;">解决方案</a>\n\
			<dl class="layui-nav-child">\n\
				<dd><a href="">移动模块</a></dd>\n\
				<dd><a href="">后台模版</a></dd>\n\
				<dd><a href="">电商平台</a></dd>\n\
			</dl>\n\
		</li>\n\
		\n\
		<li class="layui-nav-item"><a href="">云市场</a></li>\n\
		<li class="layui-nav-item"><a href="">社区</a></li>\n\
	</ul>\n\
</div>\n\
';

var groupUI_html = '\
<div class="layui-tab layui-tab-brief" lay-filter="demo">\n\
	<ul class="layui-tab-title" style="color: #ebebeb;">\n\
		<li class="localTool-2-1 layui-this">留言</li>\n\
		<li>留言设置</li>\n\
		<li>数据分析</li>\n\
		<li>点赞助手</li>\n\
		<li>拓展功能(测试)</li>\n\
		<li>设置</li>\n\
	</ul>\n\
	<div class="layui-tab-content">\n\
	<div class="layui-tab-item layui-show" style="color: #ebebeb;">\n\
	<!----------------------------------------------------------------------------------------------------------------->\n\
	  <div class="commentthread_entry">\n\
			<div class="commentthread_entry_quotebox">\n\
				<!--<textarea class="commentthread_textarea" id="comment_textarea" onfocus="this.focus();this.select();inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>-->\n\
				<textarea class="commentthread_textarea" id="comment_textarea" onfocus="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>\n\
			</div>\n\
			\n\
			<form class="layui-form" action="" lay-filter="example">\n\
				<div id="strInBytes" style="color: #32CD32;display: inline-block;font-family: Consolas;font-size: 16px;">\n\
					<span>当前字符字节数: </span>\n\
					<span id="strInBytes_Text">0</span>\n\
					<span>/999</span>\n\
				</div>\n\
				<div class="layui-inline">\n\
					<label class="layui-form-label" style="width: auto;">文本格式(直接添加或选择文字添加)</label>\n\
					<div class="layui-input-inline">\n\
						<select name="modules" lay-verify="required" lay-search="" id="steamTextStyle">\n\
							<option value="">直接选择或搜索选择</option>\n\
							<option value="1">[h1]标题文字[/h1]</option>\n\
							<option value="2">[b]粗体文本[/b]</option>\n\
							<option value="3">[u]下划线文本[/u]</option>\n\
							<option value="4">[i]斜体文本[/i]</option>\n\
							<option value="5">[strike]删除文本[/strike]</option>\n\
							<option value="6">[spoiler]隐藏文本[/spoiler]</option>\n\
							<option value="7">[noparse]不解析[b]标签[/b][/noparse]</option>\n\
							<option value="8">[url=store.steampowered.com]网站链接[/url]</option>\n\
						</select>\n\
					</div>\n\
					<button type="button" class="layui-btn layui-btn-normal" id="LAY-component-form-getval">添加</button>\n\
				</div>\n\
			</form>\n\
			\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>翻译模块(需要提前设置国籍):</legend>\n\
			</fieldset>\n\
			<div id="translationOptions" style="color:#fff;">\n\
				<span><span>当前语言:</span> \n\
					<select id="origLanguageSelectBox" style="padding: 4px 12px 4px 8px;font-size:12px;outline:0;border: 1px solid #34DEFF;background-color:transparent;color: #66ccff;">\n\
						<option name="auto" value="auto" style="color:#fff;background-color: #3E9AC6;">自动检测</option>\n\
						<option name="zhc" value="zh-CN" style="color:#fff;background-color: #3E9AC6;">中文简体</option>\n\
						<option name="en" value="en" style="color:#fff;background-color: #3E9AC6;">英语</option>\n\
						<option name="jp" value="ja" style="color:#fff;background-color: #3E9AC6;">日语</option>\n\
					</select>\n\
				</span>\n\
				\n\
				<span style="margin-left: 5px;"><span>目标语言: </span>\n\
					<select id="selectBoxID" class="selectBox" multiple="multiple">\n\
						<option value="en">英语</option>\n\
						<option value="ja">日语</option>\n\
						<option value="zh-CN">中文简体</option>\n\
						<option value="zh-sg">马新简体[zh-sg]</option>\n\
						<option value="zh-hant">繁體中文[zh-hant]</option>\n\
						<option value="zh-hk">繁體中文(香港)[zh-hk]</option>\n\
						<option value="zh-mo">繁體中文(澳门)[zh-mo]</option>\n\
						<option value="zh-tw">繁體中文(台湾)[zh-tw]</option>\n\
					</select>\n\
				</span>\n\
				\n\
				<span style="margin-left: 5px;vertical-align: middle;">\n\
					<button id="translationText">翻译</button>\n\
				</span>\n\
			</div>\n\
			\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>添加称呼模块(需要提前设置备注):</legend>\n\
			</fieldset>\n\
			<div class="commentthread_entry_submitlink" style="">\n\
				<span class="isCustom" style="display: block;text-align: left;">\n\
					<!-- 默认为{name}，可以自行修改，好友没有备注则使用steam名称  -->\n\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">自定义称呼模式</span>\n\
					<input class="nameAddType" id="select_isCustom_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\n\
					<span style="margin-left: 5px;vertical-align: middle;">\n\
						<button id="addCustomName">在留言框添加自定义称呼标识符</button>\n\
					</span>\n\
				</span>\n\
				\n\
				<span class="isName" style="display: block;text-align: left;">\n\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为组添加称呼(如果组没有备注则使用steam名称)</span>\n\
					<input class="nameAddType" id="select_islName_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\n\
				</span>\n\
				\n\
				<span class="isSpecialName" style="display: block;text-align: left;">\n\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为组添加称呼(如果组设置有备注则使用，否则不添加称呼)</span>\n\
					<input class="nameAddType" id="select_isSpecialName_checkbox" name="nameAddType"  type="radio" style="vertical-align: middle;margin:2px;">\n\
				</span>\n\
				\n\
				<fieldset class="layui-elem-field layui-field-title" style="padding: 10px 0px;">\n\
				<span style="display: block;text-align: right;">\n\
					<a class="btn_grey_black btn_small_thin" href="javascript:CCommentThread.FormattingHelpPopup( \'Profile\' );">\n\
						<span class="btn_grey_black btn_small_thin_text">格式化帮助</span>\n\
					</a>\n\
					\n\
					<span class="emoticon_container">\n\
						<span class="emoticon_button small" id="emoticonbtn"></span>\n\
					</span>\n\
					\n\
					<span class="btn_green_white_innerfade btn_small" id="comment_submit">\n\
						<span id="comment_submit_text">发送评论给选择的组</span>\n\
					</span>\n\
					\n\
					<span class="btn_green_white_innerfade btn_small" id="comment_submit_special">\n\
						<span id="comment_submit_special_text">根据国籍发送评论给选择的组</span>\n\
					</span>\n\
				</span>\n\
			</div>\n\
		</div>\n\
		<div id="log">\n\
			<span id="log_head"></span>\n\
			<span id="log_body" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/"></span>\n\
		</div>\n\
		<!----------------------------------------------------------------------------------------------------------------->\n\
	  \n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
		<div style="text-align: left;margin: 5px 0px;">\n\
			<span style="margin-left: 5px;vertical-align: middle;">\n\
				<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>设置国籍:</legend>\n\
				</fieldset>\n\
				<div style="color: #67c1f5;">请选择要设置的国籍:</div>\n\
				<select id="nationalitySelectBox" style="padding: 4px 12px 4px 8px;font-size:12px;outline:0;border: 1px solid #34DEFF;background-color:transparent;color: #66ccff;">\n\
					<option name="CN" value="CN" style="color:#fff;background-color: #3E9AC6;">简体中文</option>\n\
					<option name="EN" value="EN" style="color:#fff;background-color: #3E9AC6;">英语</option>\n\
					<option name="JP" value="JP" style="color:#fff;background-color: #3E9AC6;">日语</option>\n\
					<option name="CN-SG" value="CN-SG" style="color:#fff;background-color: #3E9AC6;">马新简体(马来西亚,新加坡)[zh-sg]</option>\n\
					<option name="CN-HANT" value="CN-HANT" style="color:#fff;background-color: #3E9AC6;">繁體中文[zh-hant]</option>\n\
					<option name="CN-HK" value="CN-HK" style="color:#fff;background-color: #3E9AC6;">繁體中文(香港)[zh-hk]</option>\n\
					<option name="CN-MO" value="CN-MO" style="color:#fff;background-color: #3E9AC6;">繁體中文(澳门)[zh-mo]</option>\n\
					<option name="CN-TW" value="CN-TW" style="color:#fff;background-color: #3E9AC6;">繁體中文(台湾)[zh-tw]</option>\n\
				</select>\n\
				<button id="setNationality">为选择的好友设置国籍标识</button>\n\
			</span>\n\
			<span style="margin-left: 5px;vertical-align: top;">\n\
				<button id="unsetNationality">为选择的好友取消国籍标识</button>\n\
			</span>\n\
			<br />\n\
			 <fieldset class="layui-elem-field layui-field-title">\n\
				<legend>设置不留言:</legend>\n\
			 </fieldset>\n\
			<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\n\
				<span>\n\
					<button id="setNoLeave">为选择的好友设置不留言</button>\n\
				</span>\n\
				<span>\n\
					<button id="unsetNoLeave">为选择的好友取消设置不留言</button>\n\
				</span>\n\
			</div>\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>设置留言时间间隔:</legend>\n\
			</fieldset>\n\
			<div id="">只选择日期则过n天后再留言，只选择时间则过x时后再留言(严格模式)，日期和时间都选择了则过n天x时后再留言(严格模式)</div>\n\
			<div id="">这里其实是一个时间差，比如指定的好友3天留言一次，今天是4月10日，你就选择4月13日就行了，这样做方便一点</div>\n\
			<div class="layui-form">\n\
			  <div class="layui-form-item">\n\
				<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\n\
				  <label class="layui-form-label">请选择留言</label> <!--这个是被点击对象，隐藏、不占空间、触发事件-->\n\
				  <div class="layui-input-inline">\n\
					<input type="text" class="layui-input" id="test-limit2" readonly="" placeholder="yyyy-MM-dd">\n\
				  </div>\n\
				</div>\n\
				<div class="layui-inline" style="position: relative;z-index: -1;">\n\
				  <label class="layui-form-label">留言日期差</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\n\
				  <div class="layui-input-inline">\n\
					<input type="text" class="layui-input" id="test-limit1" readonly="" placeholder="yyyy-MM-dd">\n\
				  </div>\n\
				</div>\n\
				\n\
			  </div>\n\
			</div>\n\
			<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\n\
				<span>\n\
					<button id="setTimeInterval">为选择的好友设置留言时间间隔</button>\n\
				</span>\n\
				<span>\n\
					<button id="unsetTimeInterval">为选择的好友取消设置留言时间间隔</button>\n\
				</span>\n\
			</div>\n\
			\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
			   <legend>设置自动留言计划:</legend>\n\
			</fieldset>\n\
			<div class="layui-form">\n\
			  <div class="layui-form-item">\n\
				<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\n\
					<label class="layui-form-label">请选择时间</label>  <!--这个是被点击对象，隐藏、不占空间、触发事件-->\n\
					<div class="layui-input-inline">\n\
						<input type="text" class="layui-input" id="test14" placeholder="H时m分s秒">\n\
					</div>\n\
				</div>\n\
				<div class="layui-inline" style="position: relative;z-index: -1;">\n\
					<label class="layui-form-label">请选择时间</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\n\
					<div class="layui-input-inline">\n\
						<input type="text" class="layui-input" id="test15" placeholder="H时m分s秒">\n\
					</div>\n\
				</div>\n\
			  </div>\n\
			</div>\n\
			\n\
			<table class="layui-hide" id="test" lay-filter="test"></table> <!-- 数据表格 -->\n\
			\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>设置好友分组:</legend>\n\
			</fieldset>\n\
			<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\n\
			\n\
			<form class="layui-form" action="">\n\
			  <div class="layui-form-item">\n\
				<div class="layui-inline">\n\
				  <label class="layui-form-label">分组列表</label>\n\
				  <div class="layui-input-inline">\n\
					<select name="modules" lay-verify="required" lay-search="">\n\
					  <option value="">直接选择或搜索选择</option>\n\
					  <option value="1">分组名称</option>\n\
					  <option value="2">分组名称</option>\n\
					  <option value="3">分组名称</option>\n\
					  <option value="4">分组名称</option>\n\
					  <option value="5">分组名称</option>\n\
					  <option value="6">分组名称</option>\n\
					  <option value="7">分组名称</option>\n\
					  <option value="8">分组名称</option>\n\
					  <option value="9">分组名称</option>\n\
					</select>\n\
				  </div>\n\
				  <button type="button" class="layui-btn" id="editFriendGroup">编辑列表</button>\n\
				</div>\n\
			  </div>\n\
			</form>\n\
			\n\
				<span>\n\
					<button id="addFriendToGroup">为选择的好友添加分组</button>\n\
				</span>\n\
				<span>\n\
					<button id="unaddFriendToGroup">为选择的好友取消添加分组</button>\n\
				</span>\n\
				\n\
				<div class="layui-collapse" lay-filter="test">\n\
				  <div class="layui-colla-item">\n\
					<h2 class="layui-colla-title">分组名称</h2>\n\
					<div class="layui-colla-content">\n\
					  <p>用户</p>\n\
					  <p>用户</p>\n\
					  <p>用户</p>\n\
					</div>\n\
				  </div>\n\
				  <div class="layui-colla-item">\n\
					<h2 class="layui-colla-title">分组名称</h2>\n\
					<div class="layui-colla-content">\n\
					  <p>用户</p>\n\
					  <p>用户</p>\n\
					  </p>\n\
					</div>\n\
				  </div>\n\
				  <div class="layui-colla-item">\n\
					<h2 class="layui-colla-title">分组名称</h2>\n\
					<div class="layui-colla-content">\n\
					  <p>用户</p>\n\
					  <p>用户</p>\n\
					</div>\n\
				  </div>\n\
				  <div class="layui-colla-item">\n\
					<h2 class="layui-colla-title">分组名称</h2>\n\
					<div class="layui-colla-content">\n\
					  <p>用户</p>\n\
					</div>\n\
				  </div>\n\
				</div>\n\
				\n\
			</div>\n\
		</div>\n\
	  <div id="laydateDemo"></div>\n\
	  <div id="log1">\n\
		<span id="log_head1"></span>\n\
		<span id="log_body1" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/"></span>\n\
	  </div>\n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
	  \n\
	  <span style="margin-left: 5px;vertical-align: top;">\n\
		<button id="NationalityGroup">按国籍进行高亮分组</button>\n\
	  </span>\n\
	  <span style="margin-left: 5px;vertical-align: top;">\n\
		<button id="NationalitySortGroup">按国籍进行排序分组(慢)</button>\n\
	  </span>\n\
	  <span style="margin-left: 5px;vertical-align: top;">\n\
		<button id="OfflineTimeGroup">按在线时间进行排序分组</button>\n\
	  </span>\n\
	  <span style="margin-left: 5px;vertical-align: top;">\n\
		<button id="ShowFriendData">显示好友详细数据-不可用</button>\n\
	  </span>\n\
	  <div class="layui-tab" lay-filter="test1">\n\
		<ul class="layui-tab-title">\n\
		  <li class="layui-this" lay-id="11" style="color:#ebebeb;">好友数据统计</li>\n\
		  <li lay-id="22" style="color:#ebebeb;">留言数据统计</li>\n\
		  <li lay-id="33" style="color:#ebebeb;">关系网统计</li>\n\
		  <li lay-id="44" style="color:#ebebeb;">当前配置统计</li>\n\
		  <li lay-id="55" style="color:#ebebeb;">查看好友配置统计</li>\n\
		</ul>\n\
		<div class="layui-tab-content">\n\
			<div class="layui-tab-item layui-show">\n\
				<span>数据表格(汇总所有的数据:id,名称,备注,国籍(语言),等级,好友数量,游戏数量,dlc数量,创意工坊数量,艺术作品数量,动态数量)</span>\n\
				<table class="layui-hide" id="friendStatistics" lay-filter="friendStatistics"></table> <!--数据表格-->\n\
				<div id="container_friendStatistics" style="width: 600px;height:400px;"></div>\n\
			</div>\n\
			<div class="layui-tab-item">\n\
				<span>分为:</span>\n\
				<span>按国籍的饼图(总留言数量)，</span>\n\
				<span>按每天留言数据的折线图(统计所有的留言数据，生成的折线图)，</span>\n\
				<span>按最多留言数据的柱状图(那些好友一天留言数量排行榜/那些好友总留言数量排行榜/累计连续每天留言数量最多)，</span>\n\
				<span>数据表格(汇总所有的数据)</span>\n\
				<div id="container_commentStatistics" style="min-width:400px;height:400px"></div>\n\
			</div>\n\
			<div class="layui-tab-item">\n\
				<span>好友关系网(仅统计共同好友)</span>\n\
				<div id="container_relationshipStatistics" style="min-width: 320px;max-width: 800px;margin: 0 auto;"></div>\n\
			</div>\n\
			<div class="layui-tab-item">\n\
				<span>当前的配置数据和运行状态<span>\n\
				<div id="container_currConfStatistics"></div>\n\
			</div>\n\
			<div class="layui-tab-item">\n\
				<span>对好友设置的配置数据(比如国籍,不留言,留言时间间隔等)</span>\n\
				<div id="container_friConfStatistics"></div>\n\
			</div>\n\
		  </div>\n\
	  </div>\n\
	  \n\
	  <div id="pageDemo"></div>\n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
	  <fieldset class="layui-elem-field">\n\
		<legend>动态点赞助手</legend>\n\
			 <form class="layui-form" action="" lay-filter="example">\n\
				 <div class="layui-form-item" pane="">\n\
					<label class="layui-form-label">总开关</label>\n\
					<div class="layui-input-block">\n\
						<!-- checked="" -->\n\
					  <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest" title="开关" lay-text="开启|关闭" id="friendActivitySwitch">\n\
					</div>\n\
				  </div>\n\
			  </form>\n\
		<div class="layui-field-box">\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
			   <legend>设置点赞内容:</legend>\n\
			</fieldset>\n\
			<form class="layui-form" action="">\n\
				<div class="layui-form-item">\n\
					<label class="layui-form-label">点赞内容:</label>\n\
					<div class="layui-row">\n\
					   <div class="layui-input-block">\n\
							 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
								  <input type="checkbox" name="like[1]" lay-skin="primary" title="朋友发布了状态" checked=""><br>\n\
								  <input type="checkbox" name="like[2]" lay-skin="primary" title="朋友发布了评测" checked=""><br>\n\
								  <input type="checkbox" name="like[3]" lay-skin="primary" title="朋友购买了游戏或者DLC" checked=""><br>\n\
								  <input type="checkbox" name="like[4]" lay-skin="primary" title="组发布了通知" checked=""><br>\n\
								  <input type="checkbox" name="like[5]" lay-skin="primary" title="组发布了活动" checked=""><br>\n\
							 </div>\n\
							<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
								  <input type="checkbox" name="like[6]" lay-skin="primary" title="朋友发布了艺术作品" checked=""><br>\n\
								  <input type="checkbox" name="like[7]" lay-skin="primary" title="朋友发布了创意工坊作品" checked=""><br>\n\
								  <input type="checkbox" name="like[8]" lay-skin="primary" title="朋友发布了指南" checked=""><br>\n\
								  <input type="checkbox" name="like[9]" lay-skin="primary" title="朋友上传了载图" checked=""><br>\n\
								  <input type="checkbox" name="like[10]" lay-skin="primary" title="朋友上传了视频" checked=""><br>\n\
							</div>\n\
							<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
								  <input type="checkbox" name="like[11]" lay-skin="primary" title="朋友收藏了艺术作品" checked=""><br>\n\
								  <input type="checkbox" name="like[12]" lay-skin="primary" title="朋友收藏了创意工坊作品" checked=""><br>\n\
								  <input type="checkbox" name="like[13]" lay-skin="primary" title="朋友收藏了指南" checked=""><br>\n\
								  <input type="checkbox" name="like[14]" lay-skin="primary" title="朋友收藏了载图" checked=""><br>\n\
								  <input type="checkbox" name="like[15]" lay-skin="primary" title="朋友收藏了视频" checked=""><br>\n\
							</div>\n\
					   </div>\n\
					  </div>\n\
				  </div>\n\
			 </form>\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
			   <legend>设置自动点赞模式:</legend>\n\
			</fieldset>\n\
			<form class="layui-form" action="">\n\
				<div class="layui-form-item">\n\
					<label class="layui-form-label">点赞模式:</label>\n\
					<div class="layui-input-block">\n\
					  <input type="checkbox" name="like[1]" lay-skin="primary" title="运行后自动开始点赞" checked=""><br>\n\
					  <input type="checkbox" name="like[2]" lay-skin="primary" title="点赞完成后自动刷新并点赞新动态时间间隔" checked=""><br>\n\
					</div>\n\
				  </div>\n\
			 </form>\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
			   <legend>设置自动点赞时间区间(默认今天~之前所有的动态内容)</legend>\n\
			</fieldset>\n\
			<div class="layui-form">\n\
			  <div class="layui-form-item">\n\
					<div class="layui-inline">\n\
					  <label class="layui-form-label">请选择范围</label>\n\
					  <div class="layui-input-inline">\n\
						<input type="text" class="layui-input" id="test-limit3" readonly="" placeholder=" ~ "> <!--placeholder="yyyy-MM-dd"-->\n\
					  </div>\n\
					</div>\n\
			  </div>\n\
			</div>\n\
			<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">\n\
			  <legend style="color:#66ccff;">点赞进度时间线</legend>\n\
			</fieldset>\n\
			<ul class="layui-timeline">\n\
			  <li class="layui-timeline-item">\n\
				<i class="layui-icon layui-timeline-axis"></i>\n\
				<div class="layui-timeline-content layui-text">\n\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月18日</h3>\n\
				  <p style="color:#fff;">\n\
					<span>已点赞状态x条，点赞发布艺术作品x条，点赞收藏艺术作品x条</span>\n\
					<br><span>已点赞评测x条，点赞发布创意工坊x条，点赞收藏创意工坊x条</span>\n\
					<br><span>已点赞购买状态x条，点赞发布指南x条，点赞收藏指南x条</span>\n\
					<br><span>已点赞组通知x条，点赞上次载图x条，点赞收藏载图x条</span>\n\
					<br><span>已点赞组活动x条，点赞上传视频x条，点赞收藏视频x条</span>\n\
				  </p>\n\
				</div>\n\
			  </li>\n\
			  <li class="layui-timeline-item">\n\
				<i class="layui-icon layui-timeline-axis"></i>\n\
				<div class="layui-timeline-content layui-text">\n\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月16日</h3>\n\
				  <p style="color:#fff;">杜甫的思想核心是儒家的仁政思想，他有"致君尧舜上，再使风俗淳"的宏伟抱负。个人最爱的名篇有：</p>\n\
				  <ul style="color:#fff;">\n\
					<li>《登高》</li>\n\
					<li>《茅屋为秋风所破歌》</li>\n\
				  </ul>\n\
				</div>\n\
			  </li>\n\
			  <li class="layui-timeline-item">\n\
				<i class="layui-icon layui-timeline-axis"></i>\n\
				<div class="layui-timeline-content layui-text">\n\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月15日</h3>\n\
				  <p style="color:#fff;">\n\
					<span>中国人民抗日战争胜利日</span>\n\
					<br><span>常常在想，尽管对这个国家有这样那样的抱怨，但我们的确生在了最好的时代</span>\n\
					<br><span>铭记、感恩</span>\n\
					<br><span>所有为中华民族浴血奋战的英雄将士</span>\n\
					<br><span>永垂不朽</span>\n\
				  </p>\n\
				</div>\n\
			  </li>\n\
			  <li class="layui-timeline-item">\n\
				<i class="layui-icon layui-timeline-axis"></i>\n\
				<div class="layui-timeline-content layui-text">\n\
				  <div class="layui-timeline-title" style="color:#66ccff;">过去</div>\n\
				</div>\n\
			  </li>\n\
			</ul>\n\
		</div>\n\
	  </fieldset>\n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
	  <fieldset class="layui-elem-field">\n\
		<legend>喜加一助手</legend>\n\
		<div class="layui-field-box">\n\
			<!-- <div>是否启动喜加一助手</div> -->\n\
		<form class="layui-form" action="" lay-filter="example">\n\
			<div class="layui-form-item" pane="">\n\
			   <label class="layui-form-label">总开关</label>\n\
			   <div class="layui-input-block">\n\
				<!-- checked="" -->\n\
				 <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest2" title="开关" lay-text="开启|关闭" id="FreeGameSwitch">\n\
			   </div>\n\
			 </div>\n\
		</form>\n\
		<form class="layui-form" action="">\n\
			<div class="layui-form-item">\n\
				<label class="layui-form-label">设置:</label>\n\
				<div class="layui-row">\n\
				   <div class="layui-input-block">\n\
						 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[1]" lay-skin="primary" title="自动获取喜加一信息" checked=""><br>\n\
						 </div>\n\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[6]" lay-skin="primary" title="自动领取喜加一游戏" checked=""><br>\n\
						</div>\n\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[11]" lay-skin="primary" title="置顶显示在上方" checked=""><br>\n\
						</div>\n\
				   </div>\n\
				  </div>\n\
			  </div>\n\
		 </form>\n\
		 \n\
		 <div>设置喜加一数据来源</div>\n\
		 <form class="layui-form" action="">\n\
			<div class="layui-form-item">\n\
				<label class="layui-form-label">设置:</label>\n\
				<div class="layui-row">\n\
				   <div class="layui-input-block">\n\
						 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[1]" lay-skin="primary" title="SteamDB" checked=""><br>\n\
						 </div>\n\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[6]" lay-skin="primary" title="humblebundle" disabled=""><br>\n\
						</div>\n\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[11]" lay-skin="primary" title="fanatical" disabled=""><br>\n\
						</div>\n\
				   </div>\n\
				  </div>\n\
			  </div>\n\
		  </form>\n\
		</div>\n\
	  </fieldset>\n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
		<fieldset class="layui-elem-field">\n\
		  <legend>功能设置</legend>\n\
		  <div class="layui-field-box">\n\
			  \n\
			  <form class="layui-form" action="" lay-filter="example">\n\
				  <div class="layui-form-item" pane="">\n\
					 <label class="layui-form-label">Debug模式</label>\n\
					 <div class="layui-input-block">\n\
													<!-- checked="" -->\n\
					   <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest3" title="开关" lay-text="开启|关闭">\n\
					 </div>\n\
				   </div>\n\
			  </form>\n\
				<div>弹出层</div>\n\
				<div>滑块</div>\n\
				<button type="button" class="layui-btn">导入导出重置当前设置</button>\n\
				<div>弹出层</div>\n\
				\n\
				<div class="layui-upload-drag" id="uploadDemo">\n\
				  <i class="layui-icon"></i>\n\
				  <p>点击上传，或将文件拖拽到此处</p>\n\
				  <div class="layui-hide" id="uploadDemoView">\n\
					<hr>\n\
					<img src="" alt="上传成功后渲染" style="max-width: 100%">\n\
				  </div>\n\
				</div>\n\
		  </div>\n\
		</fieldset>\n\
		\n\
		<fieldset class="layui-elem-field">\n\
			<legend>界面设置</legend>\n\
			<div class="layui-field-box">\n\
				\n\
				<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>语言配置</legend>\n\
				<div id="selectLanguageDropdown" class="localizationTool"></div>\n\
					<button type="button" class="layui-btn">自动检测(简体中文)</button>\n\
					<button type="button" class="layui-btn">简体中文</button>\n\
					<button type="button" class="layui-btn">繁体中文</button>\n\
					<button type="button" class="layui-btn">English</button>\n\
				</fieldset>\n\
				\n\
				<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>主题切换</legend>\n\
					<div>请选择一个主题，然后点击应用</div>\n\
					<button type="button" class="layui-btn">应用主题</button>\n\
				</fieldset>\n\
				\n\
				<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>UI设置</legend>\n\
					<div>预览:</div>\n\
					<div>\n\
					<span>主要字体颜色:<span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all1"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<div>\n\
					<span>主要背景颜色:</span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all2"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<div>\n\
					<span>留言成功字体颜色:<span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all3"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<div>\n\
					<span>留言失败字体颜色:</span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all4"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<div>\n\
					<span>留言发生错误字体颜色:</span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all5"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<button type="button" class="layui-btn">保存为主题</button>\n\
				</fieldset>\n\
				\n\
			</div>\n\
		</fieldset>\n\
		\n\
		<fieldset class="layui-elem-field">\n\
			<legend>关于SteamAssistant(Steam小助手)</legend>\n\
				<div class="layui-field-box">\n\
					<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>程序信息:</legend>\n\
					<div>当前版本:v0.2.3.0</div>\n\
					<div>主程序框架更新时间:2020年4月19日</div>\n\
					<div>common模块:2020年4月19日</div>\n\
					<div>databaseConf模块:2020年4月19日</div>\n\
					<div>externalApis模块:2020年4月19日</div>\n\
					<div>steamApis模块:2020年4月19日</div>\n\
					<div>translateApis模块:2020年4月19日</div>\n\
					<div>Utility模块:2020年4月19日</div>\n\
					<div>UI模块:2020年4月19日</div>\n\
					<div>Event模块:2020年4月19日</div>\n\
					<div>CityList模块:2020年4月19日</div>\n\
					<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>联系作者:</legend>\n\
					<button type="button" class="layui-btn">反馈错误</button>\n\
					<button type="button" class="layui-btn">提交建议</button>\n\
				</div>\n\
		</fieldset>\n\
		\n\
		<div id="sliderDemo" style="margin: 50px 20px;"></div>\n\
	</div>\n\
	\n\
	</div>\n\
</div>\n\
';

var loadUI_Html = '\
<div class="text-wrapper">\n\
	<div class="text part1">\n\
		<div>\n\
			<span class="letter">\n\
				<div class="localTool-3-1 character">L</div>\n\
				<span></span>\n\
			</span>\n\
			\n\
			<span class="letter">\n\
				<div class="character">o</div>\n\
				<span></span>\n\
			</span>\n\
			\n\
			<span class="letter">\n\
				<div class="character">a</div>\n\
				<span></span>\n\
			</span>\n\
			\n\
			<span class="letter">\n\
				<div class="character">d</div>\n\
				<span></span>\n\
			</span>\n\
			\n\
			<span class="letter">\n\
				<div class="character">i</div>\n\
				<span></span>\n\
			</span>\n\
			\n\
			<span class="letter">\n\
				<div class="character">n</div>\n\
				<span></span>\n\
			</span>\n\
			\n\
			<span class="letter">\n\
				<div class="character">g</div>\n\
				<span></span>\n\
			</span>\n\
		</div>\n\
	</div>\n\
	<div class="how-to"><span>正在加载资源中，已完成0/10，请您耐心等待...</span></div>\n\
</div>\n\
';

var mainUI_html = '\
<div class="layui-tab layui-tab-brief" lay-filter="demo">\n\
	<ul class="layui-tab-title" style="color: #ebebeb;">\n\
		<li class="localTool-4-1 layui-this">留言</li>\n\
		<li>留言设置</li>\n\
		<li>数据分析</li>\n\
		<li>点赞助手</li>\n\
		<li>拓展功能(测试)</li>\n\
		<li>设置</li>\n\
	</ul>\n\
	<div class="layui-tab-content">\n\
	<div class="layui-tab-item layui-show" style="color: #ebebeb;">\n\
	<!----------------------------------------------------------------------------------------------------------------->\n\
	  <div class="commentthread_entry">\n\
			<div class="commentthread_entry_quotebox">\n\
				<!--<textarea class="commentthread_textarea" id="comment_textarea" onfocus="this.focus();this.select();inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>-->\n\
				<textarea class="commentthread_textarea" id="comment_textarea" onfocus="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',false);" onClick="" onblur="inBoxonblurID=0;inBoxShrinkage(\'comment_textarea\',true);" placeholder="添加留言" style="overflow: hidden; height: 28px;"></textarea>\n\
			</div>\n\
			\n\
			<form class="layui-form" action="" lay-filter="example">\n\
				<div id="strInBytes" style="color: #32CD32;display: inline-block;font-family: Consolas;font-size: 16px;">\n\
					<span>当前字符字节数: </span>\n\
					<span id="strInBytes_Text">0</span>\n\
					<span>/999</span>\n\
				</div>\n\
				<div class="layui-inline">\n\
					<label class="layui-form-label" style="width: auto;">文本格式(直接添加或选择文字添加)</label>\n\
					<div class="layui-input-inline">\n\
						<select name="modules" lay-verify="required" lay-search="" id="steamTextStyle">\n\
							<option value="">直接选择或搜索选择</option>\n\
							<option value="1">[h1]标题文字[/h1]</option>\n\
							<option value="2">[b]粗体文本[/b]</option>\n\
							<option value="3">[u]下划线文本[/u]</option>\n\
							<option value="4">[i]斜体文本[/i]</option>\n\
							<option value="5">[strike]删除文本[/strike]</option>\n\
							<option value="6">[spoiler]隐藏文本[/spoiler]</option>\n\
							<option value="7">[noparse]不解析[b]标签[/b][/noparse]</option>\n\
							<option value="8">[url=store.steampowered.com]网站链接[/url]</option>\n\
						</select>\n\
					</div>\n\
					<button type="button" class="layui-btn layui-btn-normal" id="LAY-component-form-getval">添加</button>\n\
				</div>\n\
			</form>\n\
			\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>翻译模块(需要提前设置国籍):</legend>\n\
			</fieldset>\n\
			<div id="translationOptions" style="color:#fff;">\n\
				<span><span>当前语言:</span> \n\
					<select id="origLanguageSelectBox" style="padding: 4px 12px 4px 8px;font-size:12px;outline:0;border: 1px solid #34DEFF;background-color:transparent;color: #66ccff;">\n\
						<option name="auto" value="auto" style="color:#fff;background-color: #3E9AC6;">自动检测</option>\n\
						<option name="zhc" value="zh-CN" style="color:#fff;background-color: #3E9AC6;">中文简体</option>\n\
						<option name="en" value="en" style="color:#fff;background-color: #3E9AC6;">英语</option>\n\
						<option name="jp" value="ja" style="color:#fff;background-color: #3E9AC6;">日语</option>\n\
					</select>\n\
				</span>\n\
				\n\
				<span style="margin-left: 5px;"><span>目标语言: </span>\n\
					<select id="selectBoxID" class="selectBox" multiple="multiple">\n\
						<option value="en">英语</option>\n\
						<option value="ja">日语</option>\n\
						<option value="zh-CN">中文简体</option>\n\
						<option value="zh-sg">马新简体[zh-sg]</option>\n\
						<option value="zh-hant">繁體中文[zh-hant]</option>\n\
						<option value="zh-hk">繁體中文(香港)[zh-hk]</option>\n\
						<option value="zh-mo">繁體中文(澳门)[zh-mo]</option>\n\
						<option value="zh-tw">繁體中文(台湾)[zh-tw]</option>\n\
					</select>\n\
				</span>\n\
				\n\
				<span style="margin-left: 5px;vertical-align: middle;">\n\
					<button id="translationText">翻译</button>\n\
				</span>\n\
			</div>\n\
			\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>添加称呼模块(需要提前设置备注):</legend>\n\
			</fieldset>\n\
			<div class="commentthread_entry_submitlink" style="">\n\
				<span class="isCustom" style="display: block;text-align: left;">\n\
					<!-- 默认为{name}，可以自行修改，好友没有备注则使用steam名称  -->\n\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">自定义称呼模式</span>\n\
					<input class="nameAddType" id="select_isCustom_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\n\
					<span style="margin-left: 5px;vertical-align: middle;">\n\
						<button id="addCustomName">在留言框添加自定义称呼标识符</button>\n\
					</span>\n\
				</span>\n\
				\n\
				<span class="isName" style="display: block;text-align: left;">\n\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为好友添加称呼(如果好友没有备注则使用steam名称)</span>\n\
					<input class="nameAddType" id="select_islName_checkbox" name="nameAddType" type="radio" style="vertical-align: middle;margin:2px;">\n\
				</span>\n\
				\n\
				<span class="isSpecialName" style="display: block;text-align: left;">\n\
					<span style="font-size:14px;line-height: 20px;color: #67c1f5 !important;">是否为好友添加称呼(如果好友设置有备注则使用，否则不添加称呼)</span>\n\
					<input class="nameAddType" id="select_isSpecialName_checkbox" name="nameAddType"  type="radio" style="vertical-align: middle;margin:2px;">\n\
				</span>\n\
				\n\
				<fieldset class="layui-elem-field layui-field-title" style="padding: 10px 0px;">\n\
				<span style="display: block;text-align: right;">\n\
					<a class="btn_grey_black btn_small_thin" href="javascript:CCommentThread.FormattingHelpPopup( \'Profile\' );">\n\
						<span class="btn_grey_black btn_small_thin_text">格式化帮助</span>\n\
					</a>\n\
					\n\
					<span class="emoticon_container">\n\
						<span class="emoticon_button small" id="emoticonbtn"></span>\n\
					</span>\n\
					\n\
					<span class="btn_green_white_innerfade btn_small" id="comment_submit">\n\
						<span id="comment_submit_text">发送评论给选择的好友</span>\n\
					</span>\n\
					\n\
					<span class="btn_green_white_innerfade btn_small" id="comment_submit_special">\n\
						<span id="comment_submit_special_text">根据国籍发送评论给选择的好友</span>\n\
					</span>\n\
				</span>\n\
			</div>\n\
		</div>\n\
		<div id="log">\n\
			<span id="log_head"></span>\n\
			<span id="log_body" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/"></span>\n\
		</div>\n\
		<!----------------------------------------------------------------------------------------------------------------->\n\
	  \n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
		<div style="text-align: left;margin: 5px 0px;">\n\
			<span style="margin-left: 5px;vertical-align: middle;">\n\
				<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>设置国籍:</legend>\n\
				</fieldset>\n\
				<div style="color: #67c1f5;">请选择要设置的国籍:</div>\n\
				<select id="nationalitySelectBox" style="padding: 4px 12px 4px 8px;font-size:12px;outline:0;border: 1px solid #34DEFF;background-color:transparent;color: #66ccff;">\n\
					<option name="CN" value="CN" style="color:#fff;background-color: #3E9AC6;">简体中文</option>\n\
					<option name="EN" value="EN" style="color:#fff;background-color: #3E9AC6;">英语</option>\n\
					<option name="JP" value="JP" style="color:#fff;background-color: #3E9AC6;">日语</option>\n\
					<option name="CN-SG" value="CN-SG" style="color:#fff;background-color: #3E9AC6;">马新简体(马来西亚,新加坡)[zh-sg]</option>\n\
					<option name="CN-HANT" value="CN-HANT" style="color:#fff;background-color: #3E9AC6;">繁體中文[zh-hant]</option>\n\
					<option name="CN-HK" value="CN-HK" style="color:#fff;background-color: #3E9AC6;">繁體中文(香港)[zh-hk]</option>\n\
					<option name="CN-MO" value="CN-MO" style="color:#fff;background-color: #3E9AC6;">繁體中文(澳门)[zh-mo]</option>\n\
					<option name="CN-TW" value="CN-TW" style="color:#fff;background-color: #3E9AC6;">繁體中文(台湾)[zh-tw]</option>\n\
				</select>\n\
				<button id="setNationality">为选择的好友设置国籍标识</button>\n\
			</span>\n\
			<span style="margin-left: 5px;vertical-align: top;">\n\
				<button id="unsetNationality">为选择的好友取消国籍标识</button>\n\
			</span>\n\
			<br />\n\
			 <fieldset class="layui-elem-field layui-field-title">\n\
				<legend>设置不留言:</legend>\n\
			 </fieldset>\n\
			<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\n\
				<span>\n\
					<button id="setNoLeave">为选择的好友设置不留言</button>\n\
				</span>\n\
				<span>\n\
					<button id="unsetNoLeave">为选择的好友取消设置不留言</button>\n\
				</span>\n\
			</div>\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>设置留言时间间隔:</legend>\n\
			</fieldset>\n\
			<div id="">只选择日期则过n天后再留言，只选择时间则过x时后再留言(严格模式)，日期和时间都选择了则过n天x时后再留言(严格模式)</div>\n\
			<div id="">这里其实是一个时间差，比如指定的好友3天留言一次，今天是4月10日，你就选择4月13日就行了，这样做方便一点</div>\n\
			<div class="layui-form">\n\
			  <div class="layui-form-item">\n\
				<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\n\
				  <label class="layui-form-label">请选择留言</label> <!--这个是被点击对象，隐藏、不占空间、触发事件-->\n\
				  <div class="layui-input-inline">\n\
					<input type="text" class="layui-input" id="test-limit2" readonly="" placeholder="yyyy-MM-dd">\n\
				  </div>\n\
				</div>\n\
				<div class="layui-inline" style="position: relative;z-index: -1;">\n\
				  <label class="layui-form-label">留言日期差</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\n\
				  <div class="layui-input-inline">\n\
					<input type="text" class="layui-input" id="test-limit1" readonly="" placeholder="yyyy-MM-dd">\n\
				  </div>\n\
				</div>\n\
				\n\
			  </div>\n\
			</div>\n\
			<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\n\
				<span>\n\
					<button id="setTimeInterval">为选择的好友设置留言时间间隔</button>\n\
				</span>\n\
				<span>\n\
					<button id="unsetTimeInterval">为选择的好友取消设置留言时间间隔</button>\n\
				</span>\n\
			</div>\n\
			\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
			   <legend>设置自动留言计划:</legend>\n\
			</fieldset>\n\
			<div class="layui-form">\n\
			  <div class="layui-form-item">\n\
				<div class="layui-inline" style="opacity:0;filter: alpha(opacity=0);position: absolute;z-index: 0;">\n\
					<label class="layui-form-label">请选择时间</label>  <!--这个是被点击对象，隐藏、不占空间、触发事件-->\n\
					<div class="layui-input-inline">\n\
						<input type="text" class="layui-input" id="test14" placeholder="H时m分s秒">\n\
					</div>\n\
				</div>\n\
				<div class="layui-inline" style="position: relative;z-index: -1;">\n\
					<label class="layui-form-label">请选择时间</label> <!--这个是克隆出来的对象，显示，占空间、被覆盖，不触发事件-->\n\
					<div class="layui-input-inline">\n\
						<input type="text" class="layui-input" id="test15" placeholder="H时m分s秒">\n\
					</div>\n\
				</div>\n\
			  </div>\n\
			</div>\n\
			\n\
			<table class="layui-hide" id="test" lay-filter="test"></table> <!-- 数据表格 -->\n\
			\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>设置好友分组:</legend>\n\
			</fieldset>\n\
			<div style="margin-left: 5px;vertical-align: top;margin-top:5px;">\n\
			\n\
			<form class="layui-form" action="">\n\
			  <div class="layui-form-item">\n\
				<div class="layui-inline">\n\
				  <label class="layui-form-label">分组列表</label>\n\
				  <div class="layui-input-inline">\n\
					<select name="modules" lay-verify="required" lay-search="">\n\
					  <option value="">直接选择或搜索选择</option>\n\
					  <option value="1">分组名称</option>\n\
					  <option value="2">分组名称</option>\n\
					  <option value="3">分组名称</option>\n\
					  <option value="4">分组名称</option>\n\
					  <option value="5">分组名称</option>\n\
					  <option value="6">分组名称</option>\n\
					  <option value="7">分组名称</option>\n\
					  <option value="8">分组名称</option>\n\
					  <option value="9">分组名称</option>\n\
					</select>\n\
				  </div>\n\
				  <button type="button" class="layui-btn" id="editFriendGroup">编辑列表</button>\n\
				</div>\n\
			  </div>\n\
			</form>\n\
			\n\
				<span>\n\
					<button id="addFriendToGroup">为选择的好友添加分组</button>\n\
				</span>\n\
				<span>\n\
					<button id="unaddFriendToGroup">为选择的好友取消添加分组</button>\n\
				</span>\n\
				\n\
				<div class="layui-collapse" lay-filter="test">\n\
				  <div class="layui-colla-item">\n\
					<h2 class="layui-colla-title">分组名称</h2>\n\
					<div class="layui-colla-content">\n\
					  <p>用户</p>\n\
					  <p>用户</p>\n\
					  <p>用户</p>\n\
					</div>\n\
				  </div>\n\
				  <div class="layui-colla-item">\n\
					<h2 class="layui-colla-title">分组名称</h2>\n\
					<div class="layui-colla-content">\n\
					  <p>用户</p>\n\
					  <p>用户</p>\n\
					  </p>\n\
					</div>\n\
				  </div>\n\
				  <div class="layui-colla-item">\n\
					<h2 class="layui-colla-title">分组名称</h2>\n\
					<div class="layui-colla-content">\n\
					  <p>用户</p>\n\
					  <p>用户</p>\n\
					</div>\n\
				  </div>\n\
				  <div class="layui-colla-item">\n\
					<h2 class="layui-colla-title">分组名称</h2>\n\
					<div class="layui-colla-content">\n\
					  <p>用户</p>\n\
					</div>\n\
				  </div>\n\
				</div>\n\
				\n\
			</div>\n\
		</div>\n\
	  <div id="laydateDemo"></div>\n\
	  <div id="log1">\n\
		<span id="log_head1"></span>\n\
		<span id="log_body1" style="display:inline-block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; /*超出部分用...代替*/"></span>\n\
	  </div>\n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
	  \n\
	  <span style="margin-left: 5px;vertical-align: top;">\n\
		<button id="NationalityGroup">按国籍进行高亮分组</button>\n\
	  </span>\n\
	  <span style="margin-left: 5px;vertical-align: top;">\n\
		<button id="NationalitySortGroup">按国籍进行排序分组(慢)</button>\n\
	  </span>\n\
	  <span style="margin-left: 5px;vertical-align: top;">\n\
		<button id="OfflineTimeGroup">按在线时间进行排序分组</button>\n\
	  </span>\n\
	  <span style="margin-left: 5px;vertical-align: top;">\n\
		<button id="ShowFriendData">显示好友详细数据-不可用</button>\n\
	  </span>\n\
	  <div class="layui-tab" lay-filter="test1">\n\
		<ul class="layui-tab-title">\n\
		  <li class="layui-this" lay-id="11" style="color:#ebebeb;">好友数据统计</li>\n\
		  <li lay-id="22" style="color:#ebebeb;">留言数据统计</li>\n\
		  <li lay-id="33" style="color:#ebebeb;">关系网统计</li>\n\
		  <li lay-id="44" style="color:#ebebeb;">当前配置统计</li>\n\
		  <li lay-id="55" style="color:#ebebeb;">查看好友配置统计</li>\n\
		</ul>\n\
		<div class="layui-tab-content">\n\
			<div class="layui-tab-item layui-show">\n\
				<span>数据表格(汇总所有的数据:id,名称,备注,国籍(语言),等级,好友数量,游戏数量,dlc数量,创意工坊数量,艺术作品数量,动态数量)</span>\n\
				<table class="layui-hide" id="friendStatistics" lay-filter="friendStatistics"></table> <!--数据表格-->\n\
				<div id="container_friendStatistics" style="width: 600px;height:400px;"></div>\n\
			</div>\n\
			<div class="layui-tab-item">\n\
				<span>分为:</span>\n\
				<span>按国籍的饼图(总留言数量)，</span>\n\
				<span>按每天留言数据的折线图(统计所有的留言数据，生成的折线图)，</span>\n\
				<span>按最多留言数据的柱状图(那些好友一天留言数量排行榜/那些好友总留言数量排行榜/累计连续每天留言数量最多)，</span>\n\
				<span>数据表格(汇总所有的数据)</span>\n\
				<div id="container_commentStatistics" style="min-width:400px;height:400px"></div>\n\
			</div>\n\
			<div class="layui-tab-item">\n\
				<span>好友关系网(仅统计共同好友)</span>\n\
				<div id="container_relationshipStatistics" style="min-width: 320px;max-width: 800px;margin: 0 auto;"></div>\n\
			</div>\n\
			<div class="layui-tab-item">\n\
				<span>当前的配置数据和运行状态</span>\n\
				<div id="container_currConfStatistics"></div>\n\
			</div>\n\
			<div class="layui-tab-item">\n\
				<span>对好友设置的配置数据(比如国籍,不留言,留言时间间隔等)</span>\n\
				<div id="container_friConfStatistics"></div>\n\
			</div>\n\
		  </div>\n\
	  </div>\n\
	  \n\
	  <div id="pageDemo"></div>\n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
	  <fieldset class="layui-elem-field">\n\
		<legend>动态点赞助手</legend>\n\
			 <form class="layui-form" action="" lay-filter="example">\n\
				 <div class="layui-form-item" pane="">\n\
					<label class="layui-form-label">总开关</label>\n\
					<div class="layui-input-block">\n\
						<!-- checked="" -->\n\
					  <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest" title="开关" lay-text="开启|关闭" id="friendActivitySwitch">\n\
					</div>\n\
				  </div>\n\
			  </form>\n\
		<div class="layui-field-box">\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
			   <legend>设置点赞内容:</legend>\n\
			</fieldset>\n\
			<form class="layui-form" action="">\n\
				<div class="layui-form-item">\n\
					<label class="layui-form-label">点赞内容:</label>\n\
					<div class="layui-row">\n\
					   <div class="layui-input-block">\n\
							 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
								  <input type="checkbox" name="like[1]" lay-skin="primary" title="朋友发布了状态" checked=""><br>\n\
								  <input type="checkbox" name="like[2]" lay-skin="primary" title="朋友发布了评测" checked=""><br>\n\
								  <input type="checkbox" name="like[3]" lay-skin="primary" title="朋友购买了游戏或者DLC" checked=""><br>\n\
								  <input type="checkbox" name="like[4]" lay-skin="primary" title="组发布了通知" checked=""><br>\n\
								  <input type="checkbox" name="like[5]" lay-skin="primary" title="组发布了活动" checked=""><br>\n\
							 </div>\n\
							<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
								  <input type="checkbox" name="like[6]" lay-skin="primary" title="朋友发布了艺术作品" checked=""><br>\n\
								  <input type="checkbox" name="like[7]" lay-skin="primary" title="朋友发布了创意工坊作品" checked=""><br>\n\
								  <input type="checkbox" name="like[8]" lay-skin="primary" title="朋友发布了指南" checked=""><br>\n\
								  <input type="checkbox" name="like[9]" lay-skin="primary" title="朋友上传了载图" checked=""><br>\n\
								  <input type="checkbox" name="like[10]" lay-skin="primary" title="朋友上传了视频" checked=""><br>\n\
							</div>\n\
							<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
								  <input type="checkbox" name="like[11]" lay-skin="primary" title="朋友收藏了艺术作品" checked=""><br>\n\
								  <input type="checkbox" name="like[12]" lay-skin="primary" title="朋友收藏了创意工坊作品" checked=""><br>\n\
								  <input type="checkbox" name="like[13]" lay-skin="primary" title="朋友收藏了指南" checked=""><br>\n\
								  <input type="checkbox" name="like[14]" lay-skin="primary" title="朋友收藏了载图" checked=""><br>\n\
								  <input type="checkbox" name="like[15]" lay-skin="primary" title="朋友收藏了视频" checked=""><br>\n\
							</div>\n\
					   </div>\n\
					  </div>\n\
				  </div>\n\
			 </form>\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
			   <legend>设置自动点赞模式:</legend>\n\
			</fieldset>\n\
			<form class="layui-form" action="">\n\
				<div class="layui-form-item">\n\
					<label class="layui-form-label">点赞模式:</label>\n\
					<div class="layui-input-block">\n\
					  <input type="checkbox" name="like[1]" lay-skin="primary" title="运行后自动开始点赞" checked=""><br>\n\
					  <input type="checkbox" name="like[2]" lay-skin="primary" title="点赞完成后自动刷新并点赞新动态时间间隔" checked=""><br>\n\
					</div>\n\
				  </div>\n\
			 </form>\n\
			<fieldset class="layui-elem-field layui-field-title">\n\
			   <legend>设置自动点赞时间区间(默认今天~之前所有的动态内容)</legend>\n\
			</fieldset>\n\
			<div class="layui-form">\n\
			  <div class="layui-form-item">\n\
					<div class="layui-inline">\n\
					  <label class="layui-form-label">请选择范围</label>\n\
					  <div class="layui-input-inline">\n\
						<input type="text" class="layui-input" id="test-limit3" readonly="" placeholder=" ~ "> <!--placeholder="yyyy-MM-dd"-->\n\
					  </div>\n\
					</div>\n\
			  </div>\n\
			</div>\n\
			<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">\n\
			  <legend style="color:#66ccff;">点赞进度时间线</legend>\n\
			</fieldset>\n\
			<ul class="layui-timeline">\n\
			  <li class="layui-timeline-item">\n\
				<i class="layui-icon layui-timeline-axis"></i>\n\
				<div class="layui-timeline-content layui-text">\n\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月18日</h3>\n\
				  <p style="color:#fff;">\n\
					<span>已点赞状态x条，点赞发布艺术作品x条，点赞收藏艺术作品x条</span>\n\
					<br><span>已点赞评测x条，点赞发布创意工坊x条，点赞收藏创意工坊x条</span>\n\
					<br><span>已点赞购买状态x条，点赞发布指南x条，点赞收藏指南x条</span>\n\
					<br><span>已点赞组通知x条，点赞上次载图x条，点赞收藏载图x条</span>\n\
					<br><span>已点赞组活动x条，点赞上传视频x条，点赞收藏视频x条</span>\n\
				  </p>\n\
				</div>\n\
			  </li>\n\
			  <li class="layui-timeline-item">\n\
				<i class="layui-icon layui-timeline-axis"></i>\n\
				<div class="layui-timeline-content layui-text">\n\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月16日</h3>\n\
				  <p style="color:#fff;">杜甫的思想核心是儒家的仁政思想，他有"致君尧舜上，再使风俗淳"的宏伟抱负。个人最爱的名篇有：</p>\n\
				  <ul style="color:#fff;">\n\
					<li>《登高》</li>\n\
					<li>《茅屋为秋风所破歌》</li>\n\
				  </ul>\n\
				</div>\n\
			  </li>\n\
			  <li class="layui-timeline-item">\n\
				<i class="layui-icon layui-timeline-axis"></i>\n\
				<div class="layui-timeline-content layui-text">\n\
				  <h3 class="layui-timeline-title" style="color:#66ccff;">8月15日</h3>\n\
				  <p style="color:#fff;">\n\
					<span>中国人民抗日战争胜利日</span>\n\
					<br><span>常常在想，尽管对这个国家有这样那样的抱怨，但我们的确生在了最好的时代</span>\n\
					<br><span>铭记、感恩</span>\n\
					<br><span>所有为中华民族浴血奋战的英雄将士</span>\n\
					<br><span>永垂不朽</span>\n\
				  </p>\n\
				</div>\n\
			  </li>\n\
			  <li class="layui-timeline-item">\n\
				<i class="layui-icon layui-timeline-axis"></i>\n\
				<div class="layui-timeline-content layui-text">\n\
				  <div class="layui-timeline-title" style="color:#66ccff;">过去</div>\n\
				</div>\n\
			  </li>\n\
			</ul>\n\
		</div>\n\
	  </fieldset>\n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
	  <fieldset class="layui-elem-field">\n\
		<legend>喜加一助手</legend>\n\
		<div class="layui-field-box">\n\
			<!-- <div>是否启动喜加一助手</div> -->\n\
		<form class="layui-form" action="" lay-filter="example">\n\
			<div class="layui-form-item" pane="">\n\
			   <label class="layui-form-label">总开关</label>\n\
			   <div class="layui-input-block">\n\
				<!-- checked="" -->\n\
				 <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest2" title="开关" lay-text="开启|关闭" id="FreeGameSwitch">\n\
			   </div>\n\
			 </div>\n\
		</form>\n\
		<form class="layui-form" action="">\n\
			<div class="layui-form-item">\n\
				<label class="layui-form-label">设置:</label>\n\
				<div class="layui-row">\n\
				   <div class="layui-input-block">\n\
						 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[1]" lay-skin="primary" title="自动获取喜加一信息" checked=""><br>\n\
						 </div>\n\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[6]" lay-skin="primary" title="自动领取喜加一游戏" checked=""><br>\n\
						</div>\n\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[11]" lay-skin="primary" title="置顶显示在上方" checked=""><br>\n\
						</div>\n\
				   </div>\n\
				  </div>\n\
			  </div>\n\
		 </form>\n\
		 \n\
		 <div>设置喜加一数据来源</div>\n\
		 <form class="layui-form" action="">\n\
			<div class="layui-form-item">\n\
				<label class="layui-form-label">设置:</label>\n\
				<div class="layui-row">\n\
				   <div class="layui-input-block">\n\
						 <div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[1]" lay-skin="primary" title="SteamDB" checked=""><br>\n\
						 </div>\n\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[6]" lay-skin="primary" title="humblebundle" disabled=""><br>\n\
						</div>\n\
						<div class="layui-input-block" style="display:inline-block; margin-left:0px; vertical-align:top;">\n\
							  <input type="checkbox" name="like[11]" lay-skin="primary" title="fanatical" disabled=""><br>\n\
						</div>\n\
				   </div>\n\
				  </div>\n\
			  </div>\n\
		  </form>\n\
		</div>\n\
	  </fieldset>\n\
	</div>\n\
	\n\
	<div class="layui-tab-item" style="background-color: rgba(0,0,0,0.2); color: #ebebeb;">\n\
		<fieldset class="layui-elem-field">\n\
		  <legend>功能设置</legend>\n\
		  <div class="layui-field-box">\n\
			  \n\
			  <form class="layui-form" action="" lay-filter="example">\n\
				  <div class="layui-form-item" pane="">\n\
					 <label class="layui-form-label">Debug模式</label>\n\
					 <div class="layui-input-block">\n\
													<!-- checked="" -->\n\
					   <input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest3" title="开关" lay-text="开启|关闭">\n\
					 </div>\n\
				   </div>\n\
			  </form>\n\
				<div>弹出层</div>\n\
				<div>滑块</div>\n\
				<button type="button" class="layui-btn">导入导出重置当前设置</button>\n\
				<div>弹出层</div>\n\
				\n\
				<div class="layui-upload-drag" id="uploadDemo">\n\
				  <i class="layui-icon"></i>\n\
				  <p>点击上传，或将文件拖拽到此处</p>\n\
				  <div class="layui-hide" id="uploadDemoView">\n\
					<hr>\n\
					<img src="" alt="上传成功后渲染" style="max-width: 100%">\n\
				  </div>\n\
				</div>\n\
		  </div>\n\
		</fieldset>\n\
		\n\
		<fieldset class="layui-elem-field">\n\
			<legend>界面设置</legend>\n\
			<div class="layui-field-box">\n\
				\n\
				<fieldset class="layui-elem-field layui-field-title">\n\
				<legend>语言配置</legend>\n\
				<div id="selectLanguageDropdown" class="localizationTool"></div>\n\
					<button type="button" class="layui-btn">自动检测(简体中文)</button>\n\
					<button type="button" class="layui-btn">简体中文</button>\n\
					<button type="button" class="layui-btn">繁体中文</button>\n\
					<button type="button" class="layui-btn">English</button>\n\
				</fieldset>\n\
				\n\
				<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>主题切换</legend>\n\
					<div>请选择一个主题，然后点击应用</div>\n\
					<button type="button" class="layui-btn">应用主题</button>\n\
				</fieldset>\n\
				\n\
				<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>UI设置</legend>\n\
					<div>预览:</div>\n\
					<div>\n\
					<span>主要字体颜色:</span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all1"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<div>\n\
					<span>主要背景颜色:</span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all2"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<div>\n\
					<span>留言成功字体颜色:</span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all3"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<div>\n\
					<span>留言失败字体颜色:</span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all4"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<div>\n\
					<span>留言发生错误字体颜色:</span>\n\
						<span style="margin-left: 30px;">\n\
							<input type="hidden" name="color" value="" id="test-all-input">\n\
							<div id="test-all5"></div>\n\
						</span>\n\
					</div>\n\
					\n\
					<button type="button" class="layui-btn">保存为主题</button>\n\
				</fieldset>\n\
				\n\
			</div>\n\
		</fieldset>\n\
		\n\
		<fieldset class="layui-elem-field">\n\
			<legend>关于SteamAssistant(Steam小助手)</legend>\n\
				<div class="layui-field-box">\n\
					<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>程序信息:</legend>\n\
					<div>当前版本:v0.2.3.0</div>\n\
					<div>主程序框架更新时间:2020年4月19日</div>\n\
					<div>common模块:2020年4月19日</div>\n\
					<div>databaseConf模块:2020年4月19日</div>\n\
					<div>externalApis模块:2020年4月19日</div>\n\
					<div>steamApis模块:2020年4月19日</div>\n\
					<div>translateApis模块:2020年4月19日</div>\n\
					<div>Utility模块:2020年4月19日</div>\n\
					<div>UI模块:2020年4月19日</div>\n\
					<div>Event模块:2020年4月19日</div>\n\
					<div>CityList模块:2020年4月19日</div>\n\
					<fieldset class="layui-elem-field layui-field-title">\n\
					<legend>联系作者:</legend>\n\
					<button type="button" class="layui-btn">反馈错误</button>\n\
					<button type="button" class="layui-btn">提交建议</button>\n\
				</div>\n\
		</fieldset>\n\
		\n\
		<div id="sliderDemo" style="margin: 50px 20px;"></div>\n\
	</div>\n\
	\n\
	</div>\n\
</div>\n\
';

var mainUI_template = '\
<script type="text/html" id="switchTpl">\n\
	<!-- 这里的 checked 的状态只是演示 -->\n\
	<input type="checkbox" name="front" value="{{d.id}}" lay-skin="switch" lay-text="是|否" lay-filter="frontDemo" {{ d.id == 10003 ? \'checked\' : \'\' }}>\n\
</script>\n\
\n\
<script type="text/html" id="checkboxTpl">\n\
	<!-- 这里的 checked 的状态只是演示 -->\n\
	<input type="checkbox" name="lock" value="{{d.id}}" title="锁定" lay-filter="lockDemo" {{ d.id == 10006 ? \'checked\' : \'\' }}>\n\
</script>\n\
';

var winBaseFrame = '\
<div></div>\n\
';

