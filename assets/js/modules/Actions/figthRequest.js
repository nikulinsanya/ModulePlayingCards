define(['Actions'],function(Actions){

	var action = {
		run: function(opponentLogin){

			Actions.exec('send', "figthRequest", opponentLogin);

		}
	}

	return action;
})