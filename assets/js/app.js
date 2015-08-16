define(['socket'],function(socket){
	console.log('app required');

	function loadCss(url, id) {
		var id = id || null;
	    var link = document.createElement("link");
	    link.type = "text/css";
	    link.rel = "stylesheet";
	    link.href = url;
	    if (id) link.id = id;
	    document.getElementsByTagName("head")[0].appendChild(link);
	}

	var app = {
		menu: function(){
			console.log('app menu init');
			loadCss('css/style.min.css');
			require(['Actions', 'Modal'],function(Actions, Modal){
				if (socket.readyState === 1) {
					Actions.exec('loginFailed','Введите желаемый логин (не менее 4 символов)');
				}else{
					Modal.box('Нет соединения с сервером');
				}
			});
		},
		fight: function(){
			console.log('app.fight() init');
			loadCss('css/fight.min.css', 'fightCss');
			var wrapper = document.getElementById('wrapper');
			wrapper.innerHTML = '<div id="opHand"></div>'
								+'<div id="area">'
									+'<div id="timer">'
										+'<div class="bg"></div>'
									+'</div>'
									+'<div id="opUnits">'
										+'<div class="nexus card" data-health="30" id="" data-attack="0">'
											+'<div class="health">'
												+'<div class="svg">'
												+'</div>'
												+'<div class="inner">30</div>'
											+'</div>'
										+'</div>'
										+'<div class="bg"></div>'
									+'</div>'
									+'<div id="myUnits">'
										+'<div class="nexus card" data-health="30" data-attack="0">'
											+'<div class="health">'
												+'<div class="svg">'
												+'</div>'
												+'<div class="inner">30</div>'
											+'</div>'
										+'</div>'
										+'<div class="bg"></div>'
									+'</div>'
									+'<div id="next">Закончить ход</div>'
									+'<ul id="mana" />'
								+'</div>'
								+'<div id="myhand"></div>';
			requirejs(['fight'],function(fight){
				fight.init();
			});
		}
	}

	return app;
})