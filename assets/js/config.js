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
		"materialize" : "libs/materialize",
		"jquery" : "libs/jquery",
		"myCards" : "modules/myCards",
		"opCards" : "modules/opCards"
	}
});

require(['app'],function(app){
	app.menu();
	// app.fight();
});
requirejs(['jquery','materialize']);
requirejs(['rClck']);