define(['Actions'],function(Actions){

	var action = {
		run: function(){

			Actions.exec('send',"getUsers");

		}
	}

	return action;
})