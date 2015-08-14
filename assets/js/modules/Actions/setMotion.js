define(['Actions', 'User', 'myCards'],function(Actions, User, myCards){

	var action = {
		run: function(login){

			console.log('setMotion: ' + login);
			User.currentMotion = login;
			Actions.exec('motionMsg');
			Actions.exec('setTimer');
			if (User.meCurrent()) {
				myCards.arena.enableAll();
			};
		}
	}

	return action;
})