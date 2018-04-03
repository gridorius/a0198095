(function(){
	window.sendXml = function(adress,method,data,header) {
		return new Promise(function(resolve,reject){
			let xml = new XMLHttpRequest();
			xml.open(method, adress);
			if (header) xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xml.onreadystatechange = function(){
				if(xml.readyState!=4)return;
				if(xml.status!=200)reject('Ошибка загрузки');
				else resolve(xml.responseText);//,console.log(xml.responseText);
			}
			xml.send(data);
		});
	}

		let destruct = function(){
			delete window.sendXml;
		}
	
		if(window.destructModule!= undefined){
			window.destructModule.push(destruct);
		}else{
			window.destructModule = [];
			window.destructModule.push(destruct);
		}
	
})();