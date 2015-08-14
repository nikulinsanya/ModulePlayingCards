define(['Actions'],function(Actions){

	var Modal = {
		close: function(){
			var rm = document.getElementById('msgBox');
			if (rm != null) {
				rm.parentNode.removeChild(rm);
			};
		},
		box: function(content){
			var rm = document.getElementById('msgBox');
			if (rm) rm.parentNode.removeChild(rm);
			node = document.createElement('div');
			node.innerHTML = content;
			node.setAttribute("id", "msgBox");
			document.body.appendChild(node);
			return document.getElementById("msgBox");
		},
		cancelable: function(content, callback){
			var box = this.box(content);
			box.innerHTML += '<div class="cancel button waves-effect waves-light btn"><i class="material-icons left">error</i>Отмена</div>';

			box.getElementsByClassName('cancel')[0].onclick = function(){
				callback.apply(callback);
			};
		},
		yn: function(content, callbackY, callbackN, acceptText, cancelText){
			var acceptText = acceptText || 'Да';
			var cancelText = cancelText || 'Нет';
			var box = this.box(content);
			box.innerHTML += '<div class="accept button waves-effect waves-light btn"><i class="material-icons left">done</i>' + acceptText + '</div><div class="waves-effect waves-light btn cancel button"><i class="material-icons right">error</i>' + cancelText + '</div>';

			var buttons = box.getElementsByClassName('button');
			for (var i = buttons.length - 1; i >= 0; i--) {
				if (buttons[i].classList.contains("accept")){
					buttons[i].onclick = function(){
						callbackY.apply(callbackY);
					}
				}else{
					buttons[i].onclick = function(){
						callbackN.apply(callbackN);
					}	
				}
			};
		},
		prompt: function(content, callback, placeholder, buttonText){
			var callback = callback || 'console.log';
			var placeholder = placeholder || '';
			var buttonText = buttonText || 'Ok';
			var box = this.box(content);
			box.innerHTML += '<input type="text" placeholder="' + placeholder + '" class="modalInput"><div class="waves-effect waves-light btn button"><i class="material-icons right">done</i>' + buttonText + '</div>';
			var propmtInput = box.getElementsByClassName('modalInput')[0];
			propmtInput.focus();

			var clckFoo = function(){
				var value = propmtInput.value;
				callback.apply(callback,[value]);
				Modal.close();
			};

			box.getElementsByClassName('button')[0].onclick = clckFoo;
			propmtInput.onkeypress = function(e){
				if(e.keyCode === 13) clckFoo();
			};
		},
		tBox: function(msg, time){
			var time = time || 3000;
			this.box(msg);
			var tt = setTimeout(function(){
				Modal.close();
				clearTimeout(tt);
			},time); 
		}
	}

	return Modal;
})