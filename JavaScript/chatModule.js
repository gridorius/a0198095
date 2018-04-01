(function(){
	//События
	let messageBlock = document.getElementById('message'); 
	messageBlock.addEventListener('keydown',keyDown);

	//Функции

	function keyDown(e){
			let code = e.keyCode;
			if (code == 13 && e.ctrlKey) {
				send();
			}/*
			if(lastSize != parseInt(getComputedStyle(messageBlock).height)){
				lastSize = (parseInt(messageBlock.style.height)||parseInt(getComputedStyle(messageBlock).height));
				let d = lastSize+15;
				document.getElementById('chat').style.gridTemplateRows = '1fr '+d+'px';
			}*/
	}

	function fillMessages(mess){
			if(mess)mess = JSON.parse(mess);
			let messages = document.getElementById("messages");
			for (let i = 0; i < mess.length; i++) {
				let mes = mess[i];
				let lastMessages = document.getElementsByClassName('messageText');
	
				if (lastMessages.length == 0) {
					let messageContainer = document.createElement('div');
					messageContainer.className = 'messageContainer';
	
					let messageInfoContainer = document.createElement('div');
					messageInfoContainer.className = 'messageInfoContainer';
	
					let messageAuthorName = document.createElement('div');
					messageAuthorName.className = 'messageAuthorName';
					messageAuthorName.innerHTML = mes.login;
	
					let messageDate = document.createElement('div');
					messageDate.className = 'messageDate';
					messageDate.innerHTML = new Date(mes.date).toLocaleTimeString()
	
					let messageText = document.createElement('div');
					messageText.className = 'messageText';
					messageText.dataset.mesId = mes.mesId;
					messageText.dataset.author = mes.login;
					messageText.dataset.date = mes.date;
					messageText.innerHTML = mes.message;
	
					messageContainer.appendChild(messageInfoContainer);
					messageInfoContainer.appendChild(messageAuthorName);
					messageInfoContainer.appendChild(messageDate);
					messageContainer.appendChild(messageText);
					messages.appendChild(messageContainer);
	
					lastMessages = document.getElementsByClassName('messageText');
					if (messages.scrollHeight - messages.clientHeight - messages.scrollTop < 100)
						lastMessages[lastMessages.length - 1].scrollIntoView(false);
				} else {
					let lastMessage = lastMessages[lastMessages.length - 1];
					let timePassesed = (new Date(mes.date) - new Date(lastMessage.dataset.date)) / 1000 / 60;
					if (lastMessage.dataset.author == mes.login && timePassesed < 3) {
	
						let messageText = document.createElement('div');
						messageText.className = 'messageText';
						messageText.dataset.mesId = mes.mesId;
						messageText.dataset.author = mes.login;
						messageText.dataset.date = mes.date;
						messageText.innerHTML = mes.message;
						lastMessage.insertAdjacentElement('afterend', messageText);
	
						lastMessages = document.getElementsByClassName('messageText');
						if (messages.scrollHeight - messages.clientHeight - messages.scrollTop < 100)
							lastMessages[lastMessages.length - 1].scrollIntoView(false);
	
					} else {
						let messageContainer = document.createElement('div');
						messageContainer.className = 'messageContainer';
	
						let messageInfoContainer = document.createElement('div');
						messageInfoContainer.className = 'messageInfoContainer';
	
						let messageAuthorName = document.createElement('div');
						messageAuthorName.className = 'messageAuthorName';
						messageAuthorName.innerHTML = mes.login;
	
						let messageDate = document.createElement('div');
						messageDate.className = 'messageDate';
						messageDate.innerHTML = new Date(mes.date).toLocaleTimeString()
	
						let messageText = document.createElement('div');
						messageText.className = 'messageText';
						messageText.dataset.mesId = mes.mesId;
						messageText.dataset.author = mes.login;
						messageText.dataset.date = mes.date;
						messageText.innerHTML = mes.message;
	
						messageContainer.appendChild(messageInfoContainer);
						messageInfoContainer.appendChild(messageAuthorName);
						messageInfoContainer.appendChild(messageDate);
						messageContainer.appendChild(messageText);
						messages.appendChild(messageContainer);
	
	
						lastMessages = document.getElementsByClassName('messageText');
						if (messages.scrollHeight - messages.clientHeight - messages.scrollTop < 100)
							lastMessages[lastMessages.length - 1].scrollIntoView(false);
					}
				}
			}
	}

	window.loadMessages = function(id, pos, lopID) {
		let data = new FormData();
		data.append("LOADMESSAGES", "true");
		data.append("id", id);
		data.append("pos", pos || 'last');
		data.append("loPID", lopID || 'all');
		let mess = sendXml("../PHP/mainPHP.php","post", data).then(fillMessages);
	}
	
	window.send = function() {
		let mes = document.getElementById('message');
		let text = '';
		for (let i = 0; i < mes.childNodes.length; i++) {
			if (mes.childNodes[i].textContent.trim() != '') text += mes.childNodes[i].textContent.trim() + '<br/>';
		}
		if (text.replace(/<br\/>|\s/g, '') != '') {
			sendMessage(text, document.getElementById('chat').dataset.id);
			mes.innerHTML = '';
			loadMessages(document.getElementById('chat').dataset.id, 'last', getLastID());
		} else mes.innerHTML = '';
	}
	
	function fillChats(chats){
		chats = JSON.parse(chats);
		for (let i = 0; i < chats.length; i++) {
			let div = document.createElement("div");
			div.id = "chat" + chats[i].id;
			div.innerHTML = chats[i].name;
			div.className = "chat";
			div.addEventListener('click', function () {
				let chat = document.getElementById('chat');
				chat.dataset.id = chats[i].id;
				reChat(chats[i].id,chats[i].name);
			});
			document.getElementById("chatlist").appendChild(div);
		}
	}

	window.loadChats = function() {
		let data = new FormData();
		data.append("LOADCHATS", "true");
		sendXml("../PHP/mainPHP.php","post", data).then(fillChats);

	}

	window.updateChat = setInterval(updateMessages, 500);

	function updateMessages(){
		loadMessages(document.getElementById('chat').dataset.id, 'last', getLastID());
	}
	window.sendMessage = function(text, id) {
		let data = new FormData();
		data.append("SENDMESSAGE", "true");
		data.append("message", text);
		data.append("id", id);
		let data2 = 'SENDMESSAGE=' + true + '&message=' + encodeURIComponent(text) + '&id=' + encodeURIComponent(id);
		this.clearInterval(window.updateChat);
		sendXml("../PHP/mainPHP.php","post", data).then(()=>window.updateChat = setInterval(updateMessages, 500));
	}
	
	window.reChat = function(a,b) {
		document.getElementById('chatName').innerHTML = b;
		let messages = document.getElementById("messages");
		messages.innerHTML = '';
		loadMessages(a);
	}
	
	window.getLastID = function() {
		let mess = document.getElementsByClassName('messageText');
		if (mess.length) return mess[mess.length - 1].dataset.mesId;
	}

	let destruct = function(){
		clearInterval(window.updateChat);
		delete window.loadMessages;
		delete window.sen;
		delete window.loadChats;
		delete window.sendMessage;
		delete window.reChat;
		delete window.getLastID;
		delete window.updateChat;
	}

	if(window.destructModule!= undefined){
		window.destructModule.push(destruct);
	}else{
		window.destructModule = [];
		window.destructModule.push(destruct);
	}


	function addElement(tag,parent,properties,position){
		let elem = document.createElement(tag);
		for(let key in properties){
			elem[key] = properties[key];
		}
		if(position==undefined)parend.appendChild(elem);
		else parent.insertAdjacentElement(position,elem);
		return elem;
	}


	//Вызов 

	loadChats();


})();