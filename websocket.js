/**
 * websocket.js
 * @file 网络通信类(套接字) [发送好友消息和接收等需要使用网络通信] <未使用>
 */

// //https://blog.csdn.net/CaptainJava/article/details/102853088
class Socket {
	constructor(arg) {
		this.webSocket = null;
	}
	
	init(url){
		var URL;
		if(url){
			URL = url;
		}
		else{
			URL = "ws://" + window.location.host + "/websocket/message";
		}
		
		//判断当前浏览器是否支持WebSocket
		if ('WebSocket' in window) {
			this.webSocket = new WebSocket(URL);
		} else {
			alert('Dont support websocket!');
			return false;
		}
		
		//连接发生错误的回调方法
		this.webSocket.onerror = function () {
			console.log("webSocket error!");
		};
		
		//连接成功建立的回调方法
		this.webSocket.onopen = function () {
			console.log("webSocket connected.");
		};
		
		//接收到消息的回调方法
		this.webSocket.onmessage = function (event) {
			var obj = JSON.parse(event.data);
			if(obj && "message" == obj.type){
				console.log(obj.data);
				// table.reload('test', {
				// 	elem: '#test'
				// 	,data: JSON.parse(obj.data)
				// });
			}
		};
		
		//连接关闭的回调方法
		this.webSocket.onclose = function () {
			console.log("webSocket close");
		};
		
		//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		window.addEventListener("beforeunload", function(event) {
			this.webSocket.close();
		});
		return true;
	}
	
	//关闭连接
	closeWebSocket() {
		return this.webSocket.close();
	}
	
	//发送消息
	send(message) {
		return this.webSocket.send(message);
	}
}

