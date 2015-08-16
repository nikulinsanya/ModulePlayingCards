define(['Matreshka', 'jquery', 'Actions', 'User', 'mana'],function(Matreshka, $, Actions, User, mana){
	
	var myCards = {};

	// var heart = $('#icons #heart').html();
	// var attack = $('#icons #attack').html();
	// var diamond = $('#icons #diamond').html();

	var heart = '';
	var attack = '';
	var diamond = '';

	/////////// Карты в моей руке
	var myCardsModel = Matreshka.Class({ // Модель списка
		'extends': Matreshka.Object,
		constructor: function(data){
			this.jset(data);
			this.on('render',function(){
				this.bindNode('name',':sandbox .title',Matreshka.binders.innerHTML());
				this.bindNode('attack',':sandbox .attack .value',Matreshka.binders.innerHTML());
				this.bindNode('health',':sandbox .health .value',Matreshka.binders.innerHTML());
				this.bindNode('mana',':sandbox .mana .value',Matreshka.binders.innerHTML());
				this.bindNode('picture',':sandbox .picture',{
					setValue: function(v){
						this.innerHTML = '<img src="img/' + v + '">'
					}
				});
				this.on('click::sandbox',function(){ // Клик по карте в руке
					if(!User.meCurrent() || myCards.arena.length >= 7) return;
					if(!mana.spend(this.mana)) return;
					myCards.arena.push(this);
					myCards.hand.splice(myCards.hand.indexOf(this),1);
					Actions.exec('send', 'putCard',this.toJSON());
				});
			});
		}
	});
	var myCardsArray = Matreshka.Class({ // Класс списка
		'extends': Matreshka.Array,
		Model: myCardsModel,
		itemRenderer: '<div class="card">'
						+'<div class="title"></div>'
						+'<div class="health"><div class="svg">' + heart + '</div><div class="value"></div></div>'
						+'<div class="attack"><div class="svg">' + attack + '</div><div class="value"></div></div>'
						+'<div class="mana"><div class="svg">' + diamond + '</div><div class="value"></div></div>'
						+'<div class="picture"></div>'
						+'</div>',
		constructor: function(){
			this.bindNode('sandbox','#myhand'); // Засовываем в песочницу
		},
		add: function(card){
			this.push({ 
				name: card.title,
				attack: card.attack,
				health: card.health,
				picture: card.picture,
				mana: card.mana
			});
		}
	});





	/////////// Мои карты на арене
	var myArenaCardsModel = Matreshka.Class({ // Модель списка
		'extends': Matreshka.Object,
		constructor: function(data){
			this.jset(data);
			this.enable = 'disable';
			this.on('render',function(){
				this.bindNode('name',':sandbox .title',Matreshka.binders.innerHTML());
				this.bindNode('attack',':sandbox .attack .value',Matreshka.binders.innerHTML());
				this.bindNode('health',':sandbox .health .value',Matreshka.binders.innerHTML());
				this.bindNode('health',':sandbox',{
					setValue: function(v){
						if (v < 1){
							this.className += ' die';
							var iot = myCards.arena.indexOf(this);
							setTimeout(function(){
								myCards.arena.splice(iot,1);
							},2000);
						};
					}
				});
				this.bindNode('picture',':sandbox .picture',{
					setValue: function(v){
						this.innerHTML = '<img src="img/' + v + '">'
					}
				});
				this.bindNode('class',':sandbox',{ // Свойство class объекта 
					on: 'click',
					getValue: function(){
						return this.className;
					},
					setValue: function(v){ // Когда устанавливаешь: this.class = value
						this.className = v;
					},
					initialize: function(){
						$(this).on('click',function(){
							if ($(this).attr('enable') == 'disable') return;
							if ($(this).hasClass('active')) {
								$(this).removeClass('active');
								return false;
							}
							$('#myUnits .active').removeClass('active');
							$(this).addClass('active');
							readyToAttack = myCards.arena.indexOf($(this));
						});
					}
				});
				this.bindNode('enable',':sandbox', {
					getValue: function(){
						return $(this).attr('enable');
					},
					setValue: function(v){
						$(this).attr('enable', v);
					}
				});
			});
		},
		attacking: function(victim){
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
			return myCards.arena.indexOf(this);
		}
	});
	var myArenaCardsArray = Matreshka.Class({ // Класс списка
		'extends': Matreshka.Array,
		Model: myArenaCardsModel,
		itemRenderer: '<div class="card">'
						+'<div class="title"></div>'
						+'<div class="health"><div class="svg">' + heart + '</div><div class="value"></div></div>'
						+'<div class="attack"><div class="svg">' + attack + '</div><div class="value"></div></div>'
						+'<div class="picture"></div>'
						+'</div>',
		constructor: function(){
			this.bindNode('sandbox','#myUnits'); // Засовываем в песочницу
			this.on( 'remove', function( evt ) {
			    console.log( 'evt.removed');
			    console.log( evt.removed );
			});
		},
		enableAll: function(){
			this.each(function( card, index ) {
				card.enable = 'enable';
			});
		}
	});


	myCards.hand = new myCardsArray; // Экземпляр класса списка
	myCards.arena = new myArenaCardsArray; // Экземпляр класса списка

	return myCards;
})