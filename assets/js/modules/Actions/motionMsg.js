define(['User', 'Modal'],function(User, Modal){

	var action = {
		run: function(){

			var msg = 'Ходит игрок ' + User.currentMotion;
			if (User.meCurrent()) msg = 'Ваш ход';
			Modal.tBox(msg);
			
		}
	}

	return action;
})