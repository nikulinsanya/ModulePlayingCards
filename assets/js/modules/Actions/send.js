define(['socket'],function(socket){

	var socketInfo = {};

	var action = {
		run: function(method, args){
			args = args || '';
			socketInfo.method = method;
			socketInfo.args = args;
			socket.send(JSON.stringify(socketInfo));
		}
	}

	return action;
})