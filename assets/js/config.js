console.log('config required');

requirejs.config({
	paths: {
		"rClck" : "modules/disable_rclck",
		"app" : "app",
		"socket" : "modules/webSockets",
		"Actions" : "modules/Actions",
		"User" : "modules/User",
		"userList" : "modules/userlist",
		"Matreshka" : "libs/matreshka.min",
		"Modal" : "modules/Modal",
		"fight" : "modules/fight",
		"jquery" : "libs/jquery",
		"myCards" : "modules/myCards",
		"opCards" : "modules/opCards",
		"mana" : "modules/mana"
	}
});

require(['app'],function(app){
	app.menu();
});
requirejs(['jquery']);
requirejs(['rClck']);