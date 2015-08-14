define(['myCards'],function(myCards){

	var action = {
		run: function(card){

			myCards.hand.add(card);

		}
	}

	return action;
})