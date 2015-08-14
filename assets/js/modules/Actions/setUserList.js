define(['userList'],function(userList){

	var action = {
		run: function(list){
			for(key in list){
				userList.push({
					name:key
				});
			}
		}
	}

	return action;
})