/**
 * websocket.js
 * @file 网络通信类(套接字) [发送好友消息和接收等需要使用网络通信] <未使用>
 */

// //https://blog.csdn.net/CaptainJava/article/details/102853088
class Socket {
	constructor(arg) {
		this.webSocketObj = null;
		this.fRecvCallBack = null;
	}
	/**
	 * @param {String} url 目标通讯url
	 * @param {Function} recvCallBack 接收到数据后的回调函数(处理函数)
	 * @return {Boolean} true: webSocket初始化成功，false: webSocket初始化失败
	 */
	init(url,recvCallBack){
		var URL;
		if(url){
			URL = url;
		}
		else{
			URL = "ws://" + window.location.host + "/websocket/message";
		}
		
		if(recvCallBack){
			this.fRecvCallBack = recvCallBack;
		}
		
		
		//判断当前浏览器是否支持WebSocket
		if ('WebSocket' in window) {
			this.webSocketObj = new WebSocket(URL);
		} else {
			alert('Dont support websocket!');
			return false;
		}
		
		//连接发生错误的回调方法
		this.webSocketObj.onerror = function () {
			console.log("webSocket error!");
		};
		
		//连接成功建立的回调方法
		this.webSocketObj.onopen = function () {
			console.log("webSocket connected.");
		};
		
		//接收到消息的回调方法
		this.webSocketObj.onmessage = function (event) {
			console.log("webSocket收到数据!");
			
			if(this.fRecvCallBack){
				 this.fRecvCallBack();
			}
		};
		
		//连接关闭的回调方法
		this.webSocketObj.onclose = function () {
			console.log("webSocket close");
		};
		
		//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		window.addEventListener("beforeunload", function(event) {
			this.webSocketObj.close();
		});
		return true;
	}
	
	//关闭连接
	close() {
		return this.webSocketObj.close();
	}
	
	//发送消息
	send(message) {
		return this.webSocketObj.send(message);
	}
}

function recvHander(){
	var obj = JSON.parse(event.data);
	if(obj && "message" == obj.type){
		console.log(obj.data);
		// table.reload('test', {
		// 	elem: '#test'
		// 	,data: JSON.parse(obj.data)
		// });
	}
}

function test_websocket(){
	var socket = new Socket();
	socket.init("",recvHander);
	socket.send("Hello!");
	socket.close();
}