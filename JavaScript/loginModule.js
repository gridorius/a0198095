(function(){
	window.login = function() {
		let form = this.parentElement;
		let data = new FormData(form);
		data.append("LOGIN", "true");
		sendXml("../PHP/mainPHP.php","post", data).then(function(req){
			if (req == '') location.href = '../profile/';
			else {
				req = JSON.parse(req);
				let errorText = '';
				for (let i = 0; i < req.length; i++)
					errorText += req[i] + '\n';
				alert(errorText);
			}
		});
	}

	let destruct = function(){
		delete window.login;
	}

	if(window.destructModule!= undefined){
		window.destructModule.push(destruct);
	}else{
		window.destructModule = [];
		window.destructModule.push(destruct);
	}
})();