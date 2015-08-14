define(['opCards'],function(opCards){

	var action = {
		run: function(){

			opCards.hand.add();

		}
	}

	return action;
})