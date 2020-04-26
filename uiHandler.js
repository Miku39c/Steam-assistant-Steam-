UI.prototype.uiHandler = async function(){ //UI与UI事件等相关的处理程序
	//2.构建UI
	layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider', 'colorpicker', 'form'], function() {
		var $ = layui.$;
		var laydate = layui.laydate //日期
			,laypage = layui.laypage //分页
			,layer = layui.layer //弹层
			,table = layui.table //表格
			,carousel = layui.carousel //轮播
			,upload = layui.upload //上传
			,element = layui.element //元素操作
			,slider = layui.slider //滑块
			,colorpicker = layui.colorpicker
			,form = layui.form;
		//console.log(layui.layer);
	
		//向世界问个好
		//layer.msg('Hello World');
		//layer.alert('见到你真的很高兴', {icon: 6});
		//layui.layer.alert("text");
		
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 好友数据统计 图表配置
	table.render({
	    elem: '#friendStatistics'
	    //,url:'/demo/table/user/'
	    ,cellMinWidth: 80
	    ,cols: [[
	      {type:'numbers'}
	      ,{type: 'checkbox'}
	      ,{field:'Id', title:'ID', width:100, unresize: true, sort: true}
	      ,{field:'Name', title:'名称', templet: '#usernameTpl'}
	      ,{field:'Remark', title:'备注'}
	      ,{field:'City', title: '国籍(城市)', minWidth:120, sort: true}
		  ,{field:'Lever', title: '等级', minWidth:120, sort: true}
		  ,{field:'Friends', title: '好友数量', minWidth:120, sort: true}
		  ,{field:'Games', title: '游戏数量', minWidth:120, sort: true}
		  ,{field:'DLCs', title: 'dlc数量', minWidth:120, sort: true}
		  ,{field:'Workshops', title: '创意工坊数量', minWidth:120, sort: true}
		  ,{field:'Artworks', title: '艺术作品数量', minWidth:120, sort: true}
		  ,{field:'Activitys', title: '动态数量', minWidth:120, sort: true}
	      ,{field:'front', title:'置顶', width:85, templet: '#switchTpl', unresize: true}
	      ,{field:'lock', title:'是否锁定', width:110, templet: '#checkboxTpl', unresize: true}
	    ]]
		,data: []
	    ,page: true
	  });
	
	//加载数据
	table.reload('friendStatistics', {
		elem: '#friendStatistics'
		,page: true
		,data: [
			{Id: "1"
			,Name: "xxx"
			,Remark: "xx"
			,City: "xx"
			,Lever: "1"
			,Friends: "1"
			,Games: "1"
			,DLCs: '1'
			,Workshops: '1'
			,Artworks: '1'
			,Activitys: '1'
			},
			{Id: "1"
			,Name: "xxx"
			,Remark: "xx"
			,City: "xx"
			,Lever: "1"
			,Friends: "1"
			,Games: "1"
			,DLCs: '1'
			,Workshops: '1'
			,Artworks: '1'
			,Activitys: '1'
			},
			{Id: "1"
			,Name: "xxx"
			,Remark: "xx"
			,City: "xx"
			,Lever: "1"
			,Friends: "1"
			,Games: "1"
			,DLCs: '1'
			,Workshops: '1'
			,Artworks: '1'
			,Activitys: '1'
			},
		]
	});
	
	//监听置顶操作
	form.on('switch(frontDemo)', function(obj){
	  layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
	});
	
	//监听锁定操作
	form.on('checkbox(lockDemo)', function(obj){
	  layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
	});
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 留言数据统计 图表配置
	// Highcharts.setOptions({
	// 		global : {
	// 				useUTC : false
	// 		}
	// });
	// // Create the chart
	// Highcharts.stockChart('container_commentStatistics', {
	// 		chart : {
	// 				events : {
	// 						load : function () {
	// 								// set up the updating of the chart each second
	// 								var series = this.series[0];
	// 								setInterval(function () {
	// 										var x = (new Date()).getTime(), // current time
	// 												y = Math.round(Math.random() * 100);
	// 										series.addPoint([x, y], true, true);
	// 								}, 1000);
	// 						}
	// 				}
	// 		},
	// 		rangeSelector: {
	// 				buttons: [{
	// 						count: 1,
	// 						type: 'minute',
	// 						text: '1M'
	// 				}, {
	// 						count: 5,
	// 						type: 'minute',
	// 						text: '5M'
	// 				}, {
	// 						type: 'all',
	// 						text: 'All'
	// 				}],
	// 				inputEnabled: false,
	// 				selected: 0
	// 		},
	// 		title : {
	// 				text : 'Live random data'
	// 		},
	// 		tooltip: {
	// 				split: false
	// 		},
	// 		exporting: {
	// 				enabled: false
	// 		},
	// 		series : [{
	// 				name : '随机数据',
	// 				data : (function () {
	// 						// generate an array of random data
	// 						var data = [], time = (new Date()).getTime(), i;
	// 						for (i = -999; i <= 0; i += 1) {
	// 								data.push([
	// 										time + i * 1000,
	// 										Math.round(Math.random() * 100)
	// 								]);
	// 						}
	// 						return data;
	// 				}())
	// 		}]
	// });
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// // 关系网统计 图表配置
	// // Add the nodes option through an event call. We want to start with the parent
	// // item and apply separate colors to each child element, then the same color to
	// // grandchildren.
	// Highcharts.addEvent(
	// 	Highcharts.seriesTypes.networkgraph,
	// 	'afterSetOptions',
	// 	function (e) {
	// 		var colors = Highcharts.getOptions().colors,
	// 			i = 0,
	// 			nodes = {};
	// 		e.options.data.forEach(function (link) {
	// 			if (link[0] === 'Proto Indo-European') {
	// 				nodes['Proto Indo-European'] = {
	// 					id: 'Proto Indo-European',
	// 					marker: {
	// 						radius: 20
	// 					}
	// 				};
	// 				nodes[link[1]] = {
	// 					id: link[1],
	// 					marker: {
	// 						radius: 10
	// 					},
	// 					color: colors[i++]
	// 				};
	// 			} else if (nodes[link[0]] && nodes[link[0]].color) {
	// 				nodes[link[1]] = {
	// 					id: link[1],
	// 					color: nodes[link[0]].color
	// 				};
	// 			}
	// 		});
	// 		e.options.nodes = Object.keys(nodes).map(function (id) {
	// 			return nodes[id];
	// 		});
	// 	}
	// );
	// Highcharts.chart('container_relationshipStatistics', {
	// 	chart: {
	// 		type: 'networkgraph',
	// 		height: '100%'
	// 	},
	// 	title: {
	// 		text: 'The Indo-European Laungauge Tree'
	// 	},
	// 	subtitle: {
	// 		text: 'A Force-Directed Network Graph in Highcharts'
	// 	},
	// 	plotOptions: {
	// 		networkgraph: {
	// 			keys: ['from', 'to'],
	// 			layoutAlgorithm: {
	// 				enableSimulation: true
	// 			}
	// 		}
	// 	},
	// 	series: [{
	// 		dataLabels: {
	// 			enabled: true
	// 		},
	// 		data: [
	// 			['Proto Indo-European', 'Balto-Slavic'],
	// 			['Proto Indo-European', 'Germanic'],
	// 			['Proto Indo-European', 'Celtic'],
	// 			['Proto Indo-European', 'Italic'],
	// 			['Proto Indo-European', 'Hellenic'],
	// 			['Proto Indo-European', 'Anatolian'],
	// 			['Proto Indo-European', 'Indo-Iranian'],
	// 			['Proto Indo-European', 'Tocharian'],
	// 			['Indo-Iranian', 'Dardic'],
	// 			['Indo-Iranian', 'Indic'],
	// 			['Indo-Iranian', 'Iranian'],
	// 			['Iranian', 'Old Persian'],
	// 			['Old Persian', 'Middle Persian'],
	// 			['Indic', 'Sanskrit'],
	// 			['Italic', 'Osco-Umbrian'],
	// 			['Italic', 'Latino-Faliscan'],
	// 			['Latino-Faliscan', 'Latin'],
	// 			['Celtic', 'Brythonic'],
	// 			['Celtic', 'Goidelic'],
	// 			['Germanic', 'North Germanic'],
	// 			['Germanic', 'West Germanic'],
	// 			['Germanic', 'East Germanic'],
	// 			['North Germanic', 'Old Norse'],
	// 			['North Germanic', 'Old Swedish'],
	// 			['North Germanic', 'Old Danish'],
	// 			['West Germanic', 'Old English'],
	// 			['West Germanic', 'Old Frisian'],
	// 			['West Germanic', 'Old Dutch'],
	// 			['West Germanic', 'Old Low German'],
	// 			['West Germanic', 'Old High German'],
	// 			['Old Norse', 'Old Icelandic'],
	// 			['Old Norse', 'Old Norwegian'],
	// 			['Old Norwegian', 'Middle Norwegian'],
	// 			['Old Swedish', 'Middle Swedish'],
	// 			['Old Danish', 'Middle Danish'],
	// 			['Old English', 'Middle English'],
	// 			['Old Dutch', 'Middle Dutch'],
	// 			['Old Low German', 'Middle Low German'],
	// 			['Old High German', 'Middle High German'],
	// 			['Balto-Slavic', 'Baltic'],
	// 			['Balto-Slavic', 'Slavic'],
	// 			['Slavic', 'East Slavic'],
	// 			['Slavic', 'West Slavic'],
	// 			['Slavic', 'South Slavic'],
	// 			// Leaves:
	// 			['Proto Indo-European', 'Phrygian'],
	// 			['Proto Indo-European', 'Armenian'],
	// 			['Proto Indo-European', 'Albanian'],
	// 			['Proto Indo-European', 'Thracian'],
	// 			['Tocharian', 'Tocharian A'],
	// 			['Tocharian', 'Tocharian B'],
	// 			['Anatolian', 'Hittite'],
	// 			['Anatolian', 'Palaic'],
	// 			['Anatolian', 'Luwic'],
	// 			['Anatolian', 'Lydian'],
	// 			['Iranian', 'Balochi'],
	// 			['Iranian', 'Kurdish'],
	// 			['Iranian', 'Pashto'],
	// 			['Iranian', 'Sogdian'],
	// 			['Old Persian', 'Pahlavi'],
	// 			['Middle Persian', 'Persian'],
	// 			['Hellenic', 'Greek'],
	// 			['Dardic', 'Dard'],
	// 			['Sanskrit', 'Sindhi'],
	// 			['Sanskrit', 'Romani'],
	// 			['Sanskrit', 'Urdu'],
	// 			['Sanskrit', 'Hindi'],
	// 			['Sanskrit', 'Bihari'],
	// 			['Sanskrit', 'Assamese'],
	// 			['Sanskrit', 'Bengali'],
	// 			['Sanskrit', 'Marathi'],
	// 			['Sanskrit', 'Gujarati'],
	// 			['Sanskrit', 'Punjabi'],
	// 			['Sanskrit', 'Sinhalese'],
	// 			['Osco-Umbrian', 'Umbrian'],
	// 			['Osco-Umbrian', 'Oscan'],
	// 			['Latino-Faliscan', 'Faliscan'],
	// 			['Latin', 'Portugese'],
	// 			['Latin', 'Spanish'],
	// 			['Latin', 'French'],
	// 			['Latin', 'Romanian'],
	// 			['Latin', 'Italian'],
	// 			['Latin', 'Catalan'],
	// 			['Latin', 'Franco-Provençal'],
	// 			['Latin', 'Rhaeto-Romance'],
	// 			['Brythonic', 'Welsh'],
	// 			['Brythonic', 'Breton'],
	// 			['Brythonic', 'Cornish'],
	// 			['Brythonic', 'Cuymbric'],
	// 			['Goidelic', 'Modern Irish'],
	// 			['Goidelic', 'Scottish Gaelic'],
	// 			['Goidelic', 'Manx'],
	// 			['East Germanic', 'Gothic'],
	// 			['Middle Low German', 'Low German'],
	// 			['Middle High German', '(High) German'],
	// 			['Middle High German', 'Yiddish'],
	// 			['Middle English', 'English'],
	// 			['Middle Dutch', 'Hollandic'],
	// 			['Middle Dutch', 'Flemish'],
	// 			['Middle Dutch', 'Dutch'],
	// 			['Middle Dutch', 'Limburgish'],
	// 			['Middle Dutch', 'Brabantian'],
	// 			['Middle Dutch', 'Rhinelandic'],
	// 			['Old Frisian', 'Frisian'],
	// 			['Middle Danish', 'Danish'],
	// 			['Middle Swedish', 'Swedish'],
	// 			['Middle Norwegian', 'Norwegian'],
	// 			['Old Norse', 'Faroese'],
	// 			['Old Icelandic', 'Icelandic'],
	// 			['Baltic', 'Old Prussian'],
	// 			['Baltic', 'Lithuanian'],
	// 			['Baltic', 'Latvian'],
	// 			['West Slavic', 'Polish'],
	// 			['West Slavic', 'Slovak'],
	// 			['West Slavic', 'Czech'],
	// 			['West Slavic', 'Wendish'],
	// 			['East Slavic', 'Bulgarian'],
	// 			['East Slavic', 'Old Church Slavonic'],
	// 			['East Slavic', 'Macedonian'],
	// 			['East Slavic', 'Serbo-Croatian'],
	// 			['East Slavic', 'Slovene'],
	// 			['South Slavic', 'Russian'],
	// 			['South Slavic', 'Ukrainian'],
	// 			['South Slavic', 'Belarusian'],
	// 			['South Slavic', 'Rusyn']
	// 		]
	// 	}]
	// });
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 当前配置统计 图表配置
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 查看好友配置统计 图表配置
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
	
	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
		 //请选择日期
		  laydate.render({
		    elem: '#test-limit2'
			,trigger: 'click'
		    ,min: 0
		    ,max: 99999
			,done: function(value, date){
			  //layer.alert('你选择的日期是：' + value + '<br>获得的对象是' + JSON.stringify(date));
			  var endTime = new Date(date.year,date.month-1,date.date,date.hours,date.minutes,date.seconds,0).getTime(); //选择的时间
			  var startTime = Math.round(new Date()); //现在的时间
			  if(endTime <= startTime)
			  {
				 layer.alert("请选择至少一天的时间差!");
			  	return false;
			  }
			  let time = endTime >= startTime ? endTime - startTime: startTime - endTime; //计算时间差
			 
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
			  //if (days > 0)
			  	str += days + "天";
			  //if (hours > 0)
			  	str += hours + "小时";
			  //if (minutes > 0)
			  	str += minutes + "分钟";
			  //if (seconds > 0)
			  	str += seconds + "秒";
			
			var timeleftStr = "过"+ str +"后再留言";
			var dayStr = "等待"+ (days+1) + "天, ";
			
			  //console.log(str);
			  jQuery('#test-limit1')[0].value = dayStr + timeleftStr;
			}
		  });
		  
		  // //请选择时间
		  // laydate.render({
		  //     elem: '#test14'
		  //     ,type: 'time'
		  //     ,format: 'H时m分s秒'
			 //  ,done: function(value, date){
			 //    //layer.alert('你选择的日期是：' + value + '<br>获得的对象是' + JSON.stringify(date));
				// var endTime = new Date(date.year,date.month-1,date.date,date.hours,date.minutes,date.seconds,0).getTime(); //选择的时间
				//   var startTime = Math.round(new Date()); //现在的时间
				//   if(endTime <= startTime)
				//   {
				// 	 layer.alert("请选择至少一天的时间差!");
				//   	return false;
				//   }
				//   let time = endTime >= startTime ? endTime - startTime: startTime - endTime; //计算时间差
				 
				//   //计算出相差天数
				//   var str = "";
				//   let days = Math.floor(time / (24 * 3600 * 1000))
				//   //计算出小时数
				//   let leave1 = time % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				//   let hours = Math.floor(leave1 / (3600 * 1000))
				//   //计算相差分钟数
				//   let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				//   let minutes = Math.floor(leave2 / (60 * 1000))
				//   //计算相差秒数
				//   let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				//   //let seconds=Math.round(leave3/1000)
				//   let seconds = leave3 / 1000
				//   //if (days > 0)
				//   	str += days + "天";
				//   //if (hours > 0)
				//   	str += hours + "小时";
				//   //if (minutes > 0)
				//   	str += minutes + "分钟";
				//   //if (seconds > 0)
				//   	str += seconds + "秒";
				
				// var timeleftStr = "过"+ str +"后再留言";
				// var dayStr = "等待"+ (days+1) + "天, ";//"过1小时后再留言"
				
				//   //console.log(str);
			 //    jQuery('#test15')[0].value = dayStr + timeleftStr;
			 //  }
		  //   });
		
		        table.render({
		            elem: '#test'
					// ,height: 315 //容器高度
		            // ,url:'memberStatus?search=1'
		            ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
		            ,data: []
		            // ,autoSort: false //取消自动排序
		            ,cols: [
		                [
		                // {field:'id', title: 'ID', align: 'center',sort: true}
		                ,{field:'memberName', title: 'ID', align: 'center',sort: true, width: '8%'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
		                ,{field:'team', title: '名称', align: 'center', sort: true,width: '12%'} //单元格内容水平居中
		                ,{field:'deviceCode', title: '留言时间', align: 'center',width: '17%',sort: true} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
		                // ,{field:'hp', title: '血量', align: 'center',sort: true}
		                ,{field:'hp', title: '待留言好友', align: 'center',width: '18%',sort: true}
		                ,{field:'hitedNumber', title: '留言内容', align: 'center',width: '15%',sort: true}
		                ,{field:'hitNumber', title: '已执行次数', align: 'center',width: '10%',sort: true}
		                ,{field:'rePlenishBullet', title: '备注', align: 'center',width: '10%',sort: true}
		                ,{field:'reviveNum', title: '设置', align: 'center',width: '10%',sort: true},
		            ]
						]//标题栏 //设置表头
		            ,done:function (res,currentCount) {
		                element.render()
		            }
		        });
				
		 //监听单元格编辑
		   table.on('edit(test3)', function(obj){
		     var value = obj.value //得到修改后的值
		     ,data = obj.data //得到所在行所有键值
		     ,field = obj.field; //得到字段
		     layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
		   });
		
		table.reload('test', {
			elem: '#test'
			,page: true
			,data: [
				{memberName: "1"
				,team: "留言1"
				,deviceCode: "2020-5-1"
				,hp: "All"
				,hitedNumber: "早安安"
				,hitNumber: "0"
				,rePlenishBullet: "无"
				,reviveNum: '<button type="button" class="layui-btn" id="editFriendGroup" style="height: 28px;line-height: 28px;width: 100%;padding: 0px;">属性</button>'
				},
				{memberName: "1"
				,team: "留言1"
				,deviceCode: "2020-5-1"
				,hp: "All"
				,hitedNumber: "早安安"
				,hitNumber: "0"
				,rePlenishBullet: "无"
				,reviveNum: '<button type="button" class="layui-btn" id="editFriendGroup" style="height: 28px;line-height: 28px;width: 100%;padding: 0px;">属性</button>'
				},
				{memberName: "1"
				,team: "留言1"
				,deviceCode: "2020-5-1"
				,hp: "All"
				,hitedNumber: "早安安"
				,hitNumber: "0"
				,rePlenishBullet: "无"
				,reviveNum: '<button type="button" class="layui-btn" id="editFriendGroup" style="height: 28px;line-height: 28px;width: 100%;padding: 0px;">属性</button>'
				},
			]
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