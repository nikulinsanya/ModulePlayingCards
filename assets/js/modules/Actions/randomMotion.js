define(['Actions'],function(Actions){

	var action = {
		run: function(){

			Actions.exec('send', 'getRandomMotion');
			Actions.exec('getCard', 3);

		}
	}

	return action;
})