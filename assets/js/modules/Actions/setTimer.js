define(['Actions', 'User'],function(Actions, User){

	// Config
	var pause = 120000;
	var timer = document.getElementById('timer');
	var nextButton = document.getElementById('next');

	var action = {
		run: function(){

			if (User.meCurrent()){
				timer.classList.add('active');
				nextButton.classList.add('active');

				tMotion = setTimeout(function(){
						Actions.exec('reMotion');
					},pause);
				nextButton.onclick = function(){
					clearTimeout(tMotion);
					Actions.exec('reMotion');
				}
			}
			else{
				timer.classList.remove('active');
				nextButton.classList.remove('active');
			}

		}
	}

	return action;
})