define(['Actions'],function(Actions){

	var action = {
		run: function(){

			Actions.exec('send', 'reMotion');

		}
	}

	return action;
})