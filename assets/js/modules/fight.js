define(['Actions'],function(Actions){

	var fight = {
		init: function(){
			Actions.exec('randomMotion');
		}
	}

	return fight;
})