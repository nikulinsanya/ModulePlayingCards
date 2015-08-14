define(['opCards'],function(opCards){

	var action = {
		run: function(card){

			opCards.arena.add(card);

		}
	}

	return action;
})