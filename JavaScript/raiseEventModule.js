(function(){
    window.raiseEvent = function(type, elem, params) {
        let ev = new Event(type);
        if (params != undefined) {
            for (let key in params) {
                ev[key] = params[key];
            }
        }
        elem.dispatchEvent(ev);
    }

    let destruct = function(){
		delete window.raiseEvent;
	}

	if(window.destructModule!= undefined){
		window.destructModule.push(destruct);
	}else{
		window.destructModule = [];
		window.destructModule.push(destruct);
	}
})();