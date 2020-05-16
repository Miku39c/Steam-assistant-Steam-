/**
 * uiHandler.js
 * @file ui处理程序 [UI与UI事件等相关的处理程序] [用于对ui进行详细的配置] {这些方法的事件处理程序是关于ui本身的，如ui配置、动画、动态图表的配置等}
 */

var commentTextarea_box; /*所有输入框*/

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
	
	//表单取值
	layui.$('#LAY-component-form-getval').on('click', async function(){
		var data = form.val('example');
		//var jsonStr = JSON.stringify(data);
		switch (data.modules){
			case '1':
				await setSelectTextMode(1);
				break;
			case '2':
				await setSelectTextMode(2);
				break;
			case '3':
				await setSelectTextMode(3);
				break;	
			case '4':
				await setSelectTextMode(4);
				break;	
			case '5':
				await setSelectTextMode(5);
				break;	
			case '6':
				await setSelectTextMode(6);
				break;	
			case '7':
				await setSelectTextMode(7);
				break;	
			case '8':
				await setSelectTextMode(8);
				break;	
			default:
				break;
		}
		console.log(data.modules);
		_addIDtoHandleLostfocus(); //添加ID来处理丢失的焦点
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
	_ySelects(jQuery);
	
	jQuery('.selectBox').ySelect({
		placeholder: '请先选择要翻译为的语言',
		searchText: '搜索~发现新世界~',
		showSearch: true,
		numDisplayed: 4,
		overflowText: '已选中 {n}项',
		isCheck: false
	});
	
	//单选框选中和取消选择
	if(jQuery('.nameAddType')[0] != undefined){
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
	}
	
	
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
	ToggleManageFriends(); //展开管理好友列表按钮
	
	add_commentthread_textarea_allSelect(); //添加留言框全选
	
	var Obj = new CEmoticonPopup($J('#emoticonbtn'), $J('#comment_textarea')); //表情相关
	//ShowAlertDialog( 'Community Ban & Delete Comments', 'You do not have permissions to view this or you are not logged in.' );
	//ShowConfirmDialog('您点击了移除好友按钮', '是否要移除选择的好友?','移除好友');
	
	CEmoticonPopup.prototype.GetEmoticonClickClosure = function(strEmoticonName) { //重写，以适配多留言框
	    var _this = this;
	    var strTextToInsert = ':' + strEmoticonName + ':';
	    return function() {
			console.log("表情添加到 "+inBoxonblurID);
			
			let obj;
				switch (inBoxonblurID){
					case 0:
						obj = document.getElementById("comment_textarea");
						break;
					case 1:
						obj = document.getElementById("comment_textarea_en");
						break;
					case 2:
						obj = document.getElementById("comment_textarea_jp");
						break;
					case 3:
						obj = document.getElementById("comment_textarea_zhc");
						break;
					case 4:
						obj = document.getElementById("comment_textarea_zh_sg");
						break;
					case 5:
						obj = document.getElementById("comment_textarea_zh_hant");
						break;
					case 6:
						obj = document.getElementById("comment_textarea_zh_hk");
						break;
					case 7:
						obj = document.getElementById("comment_textarea_zh_mo");
						break;
					case 8:
						obj = document.getElementById("comment_textarea_zh_tw");
						break;
					default:
						break;
				}
			
	        var elTextArea = obj; //设置为指定的留言框
	        if (elTextArea) {
	            var nSelectionStart = elTextArea.selectionStart;
	            elTextArea.value = elTextArea.value.substr(0, nSelectionStart) + strTextToInsert + elTextArea.value.substr(nSelectionStart);
	            elTextArea.selectionStart = nSelectionStart + strTextToInsert.length;
	        }
	
	        obj.focus(); //获取焦点，如果不在视野里，会把镜头拉过去
	
	        _this.DismissPopup(); //关闭表情输入框
	
	        if (window.DismissEmoticonHover)
	            window.setTimeout(DismissEmoticonHover, 1);
	    };
	};
	
	CEmoticonPopup.prototype.BuildPopup = function(){ //重写，以彻底隐藏表情选择框的同时提前加载表情
		this.m_$Popup = $J('<div/>', {'class': 'emoticon_popup_ctn' } );
		this.m_$Popup[0].style.display = "none"; //提前隐藏
	
		var $PopupInner = $J('<div/>', {'class': 'emoticon_popup' } );
		this.m_$Popup.append( $PopupInner );
		var $Content = $J('<div/>', {'class': 'emoticon_popup_content' } );
		$PopupInner.append( $Content );
	
		for( var i = 0; i < CEmoticonPopup.sm_rgEmoticons.length; i++ )
		{
			var strEmoticonName = CEmoticonPopup.sm_rgEmoticons[i].replace( /:/g, '' );
			var strEmoticonURL = 'https://steamcommunity-a.akamaihd.net/economy/emoticon/' + strEmoticonName;
	
			var $Emoticon = $J('<div/>', {'class': 'emoticon_option', 'data-emoticon': strEmoticonName } );
			var $Img = $J('<img/>', {'src': strEmoticonURL, 'class': 'emoticon' } );
			$Emoticon.append( $Img );
	
			$Emoticon.click( this.GetEmoticonClickClosure( strEmoticonName ) );
	
			$Content.append( $Emoticon );
		}
	
		$J(document.body).append( this.m_$Popup );
		PositionEmoticonHover( this.m_$Popup, this.m_$EmoticonButton );
		Obj.DismissPopup(); //关闭表情输入框
	};
	
	setTimeout(async function() {
		Obj.LoadEmoticons();
		CEmoticonPopup.sm_deferEmoticonsLoaded.done(function() {
			(async function () {
				if (!Obj.m_$Popup)
					Obj.BuildPopup(); //重写，以彻底隐藏表情选择框的同时提前加载表情
				else
					PositionEmoticonHover(Obj.m_$Popup, Obj.m_$EmoticonButton);
				//await emojiFix();
				console.log("emoticon loaded Done.");
			})();
		});
	}, 0); //提前加载表情
	
	_addIDtoHandleLostfocus(); //添加ID来处理丢失的焦点
	//屏蔽点下拉框、按钮之类的导致输入框焦点丢失的问题
	document.addEventListener("mousedown", function(e){
		
			if(e.target.id.indexOf("steamTextStyle_1")==0 || e.target.id.indexOf("LAY-component-form-getval")==0 
			|| e.target.id.indexOf("emoticonbtn")==0 || e.target.className.indexOf("emoticon")==0 || e.target.className.indexOf("commentthread_entry_quotebox")==0
			|| e.target.className.indexOf("fs-label")==0  || e.target.id.indexOf("translationText")==0 || e.target.id.indexOf("select_is")==0
			|| e.target.id.indexOf("addCustomName")==0 || e.target.className.indexOf("btn_grey_black btn_small_thin")==0 || e.target.id.indexOf("comment_submit")==0
			){
				//debugger
				//if(e.target.id == "LAY-component-form-getval"){
				e.stopPropagation();
				e.stopImmediatePropagation();
				e.preventDefault();
				//  document.getElementById("LAY-component-form-getval").click();
				return false;
				//}
			}
	      
	}, false); //点击指定区域,输入框不失去焦点
	
	
	/*代码位于event.js translationText翻译按钮事件*/
	/*代码位于uiHandler.js 获取输入框和注册的scroll事件*/
	/*代码位于ui.js inBoxShrinkage()判断是否需要重新进行定位*/
	commentTextarea_box = document.getElementsByClassName('commentthread_textarea'); /*获取所有输入框*/
	inBoxShrinkage('comment_textarea',"init"); //解决滚动屏幕事件 Cannot set property 'visible' of undefined，传入"init"参数无实际意义，只为了创建arrComment，而不执行收缩功能，防止Cannot read property 'value' of null错误
	var getAllOffsetTopByChildEle = (ele)=>{
		var OffsetTopSum = 0;
		var ParentObj;
		var currentObj = ele;
		//debugger
		//while(currentObj != document){
			//OffsetTopSum += currentObj.offsetTop;
			//currentObj = currentObj.parentNode;
			currentObj = currentObj.parentNode;
			OffsetTopSum += currentObj.offsetTop;
			currentObj = currentObj.parentNode;
			OffsetTopSum += currentObj.offsetTop;
			
			//console.log("offsetTop:",currentObj.offsetTop,"scrollTop:",currentObj.scrollTop,"clientTop:",currentObj.clientTop);
		//}
		return OffsetTopSum;
	};
	
	document.addEventListener('scroll',function(){ /*注册事件: 当滚动时，对所有输入框对象可见性进行判断*/
		var visibleBottom = window.scrollY + document.documentElement.clientHeight; /*可见区域底部高度 = 滚动条高度 + 可视窗口高度 (显示窗口的底部坐标)*/
		var visibleTop = window.scrollY; /*可见区域顶部高度 = 页面的滚动条滚动的距离 (显示窗口的顶部坐标)*/
		
		for (var i = 0; i < commentTextarea_box.length; i++) { /*遍历所有元素并进行判断 commentTextarea_box[i].offsetTop*/
			//var centerY = getAllOffsetTopByChildEle(commentTextarea_box[i]) + (commentTextarea_box[i].offsetHeight / 2); /*dom元素的中心坐标 = dom元素到最顶端的高度 + 自身高度的一半*/
			var centerY = getAllOffsetTopByChildEle(commentTextarea_box[i]) - 10; //top
			var centerX = getAllOffsetTopByChildEle(commentTextarea_box[i]) + commentTextarea_box[i].offsetHeight + 20; //bottom
			if(centerY > visibleTop& centerX < visibleBottom){ /*当dom元素的中心坐标的X及Y坐标均大于显示窗口的顶部，且小于显示窗口的底部坐标时，那么就可以判断该坐标在可见区域*/
				arrComment[i].visible = true; /*区域可见*/
				//console.log('第'+i+'个区域可见',centerY,visibleTop,visibleBottom);
			}else{
				arrComment[i].visible = false; /*区域不可见*/
				//console.log('第'+i+'个区域不可见',centerY,visibleTop,visibleBottom);
			}
		}
		//console.log('');
	});
	
	console.log("注册所有的事件...");
	await registeredAllEvents(); //注册所有的事件
	if(!addRemoveFriendRemind()){/*添加删除好友提醒*/
		console.log("添加删除好友提醒失败了~!");
	}
	
}

