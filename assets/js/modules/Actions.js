define(["socket"],function(socket){
	console.log('Actions required');

	// Config
	var path = 'modules/Actions/';

	var Actions = {
		exec: function(){
			var args = Array.prototype.slice.call(arguments);
			var actionName = args.shift();

			require([path + actionName],function(action){
				action.run.apply(action,args);
				console.log(actionName + ' required');
			});	
		}
	}

	return Actions;
})