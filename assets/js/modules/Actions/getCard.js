define(['Actions', 'User'],function(Actions, User){

	// Config
	var pause = 2000;

	var action = {
		run: function(num){
			num = num || 1;
			console.log('getCard: ' + num);
			for (var i = 0; i < num; i++){
				setTimeout(function(){
					Actions.exec('send', 'plusCard');
				},pause*i);
			};
			console.log('Игрок добирает карту: ' + User.currentMotion);

		}
	}

	return action;
})