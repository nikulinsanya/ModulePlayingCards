define(['Modal', 'app', 'User'],function(Modal, app, User){

	var action = {
		run: function(opponentLogin){

			Modal.close();
			User.save();
			app.fight();
			
		}
	}

	return action;
})