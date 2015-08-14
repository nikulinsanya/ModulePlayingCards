define(['Actions','Modal'],function(Actions, Modal){

	var action = {
		run: function(opponentLogin){

			Modal.cancelable('<p>Ожидание ответа от игрока <b>' + opponentLogin + '</b></p>', this.callback);

		},
		callback: function(){

			Actions.exec("send", "modalClose");
			Modal.close();

		}
	}

	return action;
})