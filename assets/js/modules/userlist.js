define(['Matreshka', 'Actions', 'User', 'jquery'],function(Matreshka, Actions, User, $){

	/////////// Список юзеров
	var listModel = Matreshka.Class({ // Модель списка
		'extends': Matreshka.Object,
		constructor: function(data){
			this.jset(data);
			this.on('render',function(){
				this.bindNode('name',':sandbox .name',Matreshka.binders.innerHTML());
				this.bindNode('name',':sandbox',{
					setValue: function(name){
						if (name == User.login) {
							$(this).addClass('me');
						}
					}
				});
				this.bindNode('letsFight',':sandbox .fightButton');
				this.on('click::letsFight',function(){
					Actions.exec('figthRequest',this.name);
				});
			});
		}
	});
	var listArray = Matreshka.Class({ // Класс списка
		'extends': Matreshka.Array,
		Model: listModel,
		itemRenderer: '<li class="player collection-item dismissable"><span class="name"></span><span class="fightButton secondary-content"></span></li>',
		constructor: function(){
			this.bindNode('sandbox','#players'); // Засовываем в песочницу
		}
	});
	var userList = new listArray; // Экземпляр класса списка


	return userList;
})