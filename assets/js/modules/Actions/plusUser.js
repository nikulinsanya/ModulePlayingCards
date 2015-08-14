define(['userList'],function(userList){

	var action = {
		run: function(name){

			name = name || 'unNamed';
			userList.push({
				name:name
			});

		}
	}

	return action;
})