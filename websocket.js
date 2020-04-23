// //https://blog.csdn.net/CaptainJava/article/details/102853088
// 		class Socket {
// 			constructor(arg) {
// 				this.websocket = null;
// 				//判断当前浏览器是否支持WebSocket
// 				if ('WebSocket' in window) {
// 					websocket = new WebSocket("ws://"+window.location.host+"/websocket/memberstatus");
// 				} else {
// 					alert('Dont support websocket')
// 				}
// 			}
// 			//连接发生错误的回调方法
// 			this.websocket.onerror = function () {
// 				console.log("error");
// 			};
			
// 			//连接成功建立的回调方法
// 			this.websocket.onopen = function () {
// 				console.log("open");
// 			};
			
// 			//接收到消息的回调方法
// 			this.websocket.onmessage = function (event) {
// 				var obj = JSON.parse(event.data);
// 				if(obj && "memberstatus"==obj.type){
// 					// console.log(obj.data)
// 					table.reload('test', {
// 						elem: '#test'
// 						,data: JSON.parse(obj.data)
// 					});
// 				}
// 			};
			
// 			//连接关闭的回调方法
// 			this.websocket.onclose = function () {
// 				console.log("close");
// 			};
// 		}
		
// 		//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
// 		window.onbeforeunload = function () {
// 			websocket.close();
// 		};

// 		//关闭连接
// 		function closeWebSocket() {
// 			websocket.close();
// 			window.clearInterval(intervalId);
// 		}

// 		//发送消息
// 		function send() {
// 			var message = document.getElementById('text').value;
// 			websocket.send(message);
// 		}