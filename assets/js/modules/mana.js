define(['Matreshka'],function(Matreshka){
	
	// var diamond = $('#icons #diamond').html();
	var diamond = '';

	/////////// Карты в моей руке
	var manaModel = Matreshka.Class({ // Модель списка
		'extends': Matreshka.Object,
		constructor: function(data){
			this.jset(data);
			this.on('render',function(){
				this.bindNode('active', ':sandbox', Matreshka.binders.className( 'active' ));
			});
		}
	});


	var manaArray = Matreshka.Class({ // Класс списка
		'extends': Matreshka.Array,
		Model: manaModel,
		itemRenderer: '<li></li>',
		constructor: function(){
			this.bindNode('sandbox','#mana'); // Засовываем в песочницу
		},
		add: function(){
			// Добавить активный кристалл
			if (this.length >= 10) return;
			this.push({active:true});
		},
		spend: function(num){
			var num = num || 0;
			var actives = this.filter(function(obj){
				if (obj.active) return true;
				return false;
			});
			if(actives.length < num) {
				console.log('Недостаточно маны');
				return false;
			}
			// Деактивировать num маны
			for (var i = this.length - 1; i >= this.length - num; i--) {
				this[i].active = false;
			};
			return true;
		},
		setAllActive: function(){
			for (var i = this.length - 1; i >= 0; i--) {
				this[i].active = true;
			};
		}
	});








	var mana = new manaArray; // Экземпляр класса списка

	return mana;
})