(function(){
let monitoringResizeElemenst = {};

window.resizeContoll = function(elem, func) {
	monitoringResizeElemenst[elem.id] = {
		elem: elem,
		lastStatus: {
			w: getComputedStyle(elem).width,
			h: getComputedStyle(elem).height
		},
		func: func
	};
}
window.checkResize = function() {
	if(window.checkResize!=undefined)requestAnimationFrame(checkResize);
	for (let key in monitoringResizeElemenst) {
		let w = parseInt(monitoringResizeElemenst[key].elem.style.width) ||
			parseInt(getComputedStyle(monitoringResizeElemenst[key].elem).width);
		let h = parseInt(monitoringResizeElemenst[key].elem.style.height) ||
			parseInt(getComputedStyle(monitoringResizeElemenst[key].elem).height);
		if (monitoringResizeElemenst[key].lastStatus.w != w || monitoringResizeElemenst[key].lastStatus.h != h) {
			monitoringResizeElemenst[key].func({target:monitoringResizeElemenst[key].elem,w,h});
			monitoringResizeElemenst[key].lastStatus.w = w;
			monitoringResizeElemenst[key].lastStatus.h = h;
		}
	}
}

window.removeResizeContoll = function(elem){
	for (let key in monitoringResizeElemenst){
		if(monitoringResizeElemenst[key].elem == elem){
			delete monitoringResizeElemenst[key];
		}
	}
}



let destruct = function(){
    delete window.resizeContoll;
    delete window.checkResize;
}

if(window.destructModule!= undefined){
    window.destructModule.push(destruct);
}else{
    window.destructModule = [];
    window.destructModule.push(destruct);
}


checkResize();


})();