var WebSocketServer= require('ws').Server,
	wss = new WebSocketServer({ port:8000});

	//广播
	wss.broadcast = function broadcast(s,ws){
		wss.clients.forEach(function each(client){
			if(s == 1){
				client.send(ws.name+":"+ws.msg)	
			}else if(s == 0){
				client.send(ws+"退出聊天室")
			}
		});
	}
	wss.on('connection',function(ws){
		ws.send('你是第'+wss.clients.size+'在线的')
		//发送消息
		ws.on('message',function(jsonstr,flags){
			var obj = eval('('+jsonstr+')');
			this.user = obj
			if(typeof this.user.msg != 'underfined'){
				wss.broadcast(1,obj)
			}
		})
		ws.on('close',function(close){
			try{
				wss.broadcast(0,this.user.name)
			}catch(e){
				console.log("刷新页面")
			}
		})
	})