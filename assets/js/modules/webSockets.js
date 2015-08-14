define(["Actions", "Modal"],function(Actions, Modal){
	console.log('webSockets required');

	// Config
	var server = 'ws://localhost:8000';
	socket = new WebSocket(server);		

	socket.onopen = function (e){
		console.log('Соединение установлено с ' + server);
	}
	socket.onclose = function (e){
		console.log('Соединение прервано!');
		Modal.box('Соединение прервано!');
	}
	socket.onmessage = function (e){
		if (typeof e.data === "string"){
			var request = JSON.parse(e.data);
			Actions.exec(request.function,request.args);
		};
	}

	return socket;
})