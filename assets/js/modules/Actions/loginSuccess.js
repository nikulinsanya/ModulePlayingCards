define(['Actions', 'User'],function(Actions, User){

	var action = {
		run: function(login){

			User.login = login;
			Actions.exec('getUsers');

		}
	}

	return action;
})