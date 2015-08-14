define(['Actions','Modal'],function(Actions, Modal){

	var action = {
		run: function(msg){
			Modal.prompt(msg, this.callback, 'Логин');
		},
		callback: function(login){
			console.log('Login: ' + login);
			Actions.exec('send',"loginQuery",login);
		}
	}

	return action;
})