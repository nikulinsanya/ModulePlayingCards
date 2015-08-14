define([''],function(){

	var user = {
		currentMotion: null,
		resume: function(){
			if (localStorage['PlayingCardsUser'].length) {
				return JSON.parse(localStorage['PlayingCardsUser'])
			}
		},
		save: function(){
			localStorage['PlayingCardsUser'] = JSON.stringify(user);
		},
		meCurrent: function(){
			if (this.currentMotion == this.login) return true;
			return false;
		}
	}

	return user;
})