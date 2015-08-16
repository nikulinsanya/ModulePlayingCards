define(['Actions', 'myCards', 'opCards'],function(Actions, myCards, opCards){

	var action = {
		run: function(args){

			args.agressor.attacking(args.victim);
			console.log(args.agressor);
			Actions.exec('send', 'attacking', {
				agressor: args.agressor.getIndex(),
				victim: args.victim.getIndex()
			});


		}
	}

	return action;
})