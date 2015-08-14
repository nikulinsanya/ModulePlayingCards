define(['Actions','Modal'],function(Actions, Modal){

	var action = {
		run: function(opponentLogin){

			Modal.yn('<p>Приглашение от игрока <b>' + opponentLogin + '</b></p>', this.Y, this.N, 'Принять', 'Отклонить');
			
		},
		Y: function(){
			Actions.exec("send", "fightAccepted");
			Modal.close();
		},
		N: function(){
			Actions.exec("send", "modalClose");
			Modal.close();			
		}
	}

	return action;
})