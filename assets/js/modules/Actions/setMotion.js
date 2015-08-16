define(['Actions', 'User', 'myCards','mana'],function(Actions, User, myCards, mana){

	var action = {
		run: function(login){

			console.log('setMotion: ' + login);
			User.currentMotion = login;
			Actions.exec('motionMsg');
			Actions.exec('setTimer');
			if (User.meCurrent()) {
				myCards.arena.enableAll();
				Actions.exec('getCard');
				mana.add();
			};
		}
	}

	return action;
})