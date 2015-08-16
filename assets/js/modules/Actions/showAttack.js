define(['opCards', 'myCards'],function(opCards, myCards){

	var action = {
		run: function(args){

			var agressor = opCards.arena[args.agressor];
			var victim = myCards.arena[args.victim];
			agressor.attacking(victim);

		}
	}

	return action;
})