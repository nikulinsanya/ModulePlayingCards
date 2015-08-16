define(['Matreshka', 'jquery', 'myCards', 'Actions'],function(Matreshka, $, myCards, Actions){

	var opCards = {};

	// var heart = $('#icons #heart').html();
	// var attack = $('#icons #attack').html();
	// var diamond = $('#icons #diamond').html();

	var heart = '';
	var attack = '';
	var diamond = '';


	/////////// Карты в руке оппонента
	var opCardsModel = Matreshka.Class({ // Модель списка
		'extends': Matreshka.Object,
		constructor: function(data){}
	});
	var opCardsArray = Matreshka.Class({ // Класс списка
		'extends': Matreshka.Array,
		Model: opCardsModel,
		itemRenderer: '<div class="card" />',
		constructor: function(){
			this.bindNode('sandbox','#opHand'); // Засовываем в песочницу
		},
		add: function(){
			this.push({});
		}
	});


	/////////// Карты противника на арене
	var opArenaCardsModel = Matreshka.Class({ // Модель списка
		'extends': Matreshka.Object,
		constructor: function(data){
			this.jset(data);
			this.on('render',function(){
				this.bindNode('name',':sandbox .title',Matreshka.binders.innerHTML());
				this.bindNode('attack',':sandbox .attack .value',Matreshka.binders.innerHTML());
				this.bindNode('health',':sandbox .health .value',Matreshka.binders.innerHTML());
				this.bindNode('health',':sandbox .health .value',{ // Умирание
					setValue: function(v){
						if (v < 1){
							this.className += ' die';
							var iot = opCards.arena.indexOf(this);
							setTimeout(function(){
								opCards.arena.splice(iot,1);
							},2000);
						};
					}
				});
				this.bindNode('picture',':sandbox .picture',{
					setValue: function(v){
						this.innerHTML = '<img src="img/' + v + '">'
					}
				});
				this.on('click::sandbox',function(){
					if($('#myUnits .active').length){
						var readyToAttack = myCards.arena.filter(this.filterActive);
						if (readyToAttack.length != 1) return false;
						var agressorIndex = myCards.arena.indexOf(readyToAttack[0]);
						Actions.exec('attack', {
							agressor: myCards.arena[agressorIndex],
							victim: this
						});
					}
				});
			});
		},
		filterActive: function(obj){
			var classList = obj.class.split(' ');
			if (classList.indexOf('active') + 1) return true;
			return false;
		},
		attacking: function(victim){
			console.log('opAttacking');
			var agressor = this;

			victim.sandbox.style.zIndex = 5;
			agressor.sandbox.style.zIndex = 10;

			var yPos = victim.sandbox.offsetTop - (agressor.sandbox.offsetTop + $('#opUnits')[0].offsetHeight) + 100;
			var xPos = victim.sandbox.offsetLeft - agressor.sandbox.offsetLeft;

			agressor.sandbox.style.top = yPos + 'px';
			agressor.sandbox.style.left = xPos + 'px';

			var at = setTimeout(function(){
				agressor.sandbox.style.top = 0;
				agressor.sandbox.style.left = 0;
				clearTimeout(at);
			},200); 

			agressor.enable = 'disable';
			victim.health = victim.health - agressor.attack;
			agressor.health = agressor.health - victim.attack;

		},
		getIndex: function(){
			return opCards.arena.indexOf(this);
		}
	});


	var opArenaCardsArray = Matreshka.Class({ // Класс списка
		'extends': Matreshka.Array,
		Model: opArenaCardsModel,
		itemRenderer: '<div class="card">'
						+'<div class="title"></div>'
						+'<div class="health"><div class="svg">' + heart + '</div><div class="value"></div></div>'
						+'<div class="attack"><div class="svg">' + attack + '</div><div class="value"></div></div>'
						+'<div class="picture"></div>'
						+'</div>',
		constructor: function(){
			this.bindNode('sandbox','#opUnits'); // Засовываем в песочницу
		},
		add: function(card){
			card.name = card.title;
			this.push(card);
		},
		getById: function(id){

			var item = this.filter(function(obj){
				console.log(id);
				console.log(obj);
				if(obj.__id == id) return true;
				return false;
			});
			
			return item;
		}
	});


	opCards.hand = new opCardsArray; // Экземпляр класса списка
	opCards.arena = new opArenaCardsArray; // Экземпляр класса списка


	return opCards;
})