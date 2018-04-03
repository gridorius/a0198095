//События

window.addEventListener('resize', function (e) {
	alignmentContent();
});

//функции


function checkConnection(src){
	for(key in document.scripts){
		if(document.scripts[key].src!=undefined){
			if(document.scripts[key].src.search(src)>=0)return true;
		}
	}
}

function loaderOFF() {
	document.getElementById('loader').style.opacity = 0;
	setTimeout(() => document.getElementById('loader').style.display = 'none', 1000)
}

function addScript(src) {
	for(key in document.scripts){
		if(document.scripts[key].src!=undefined){
			if(document.scripts[key].src.search(src)>=0)return;
		}
	}
	let obj = {
		load: function () {}
	};
	let script = document.createElement('script');
	script.src = src;
	script.async = false;
	document.head.appendChild(script);
	script.onload = function(){obj.load();}
	return obj;
}

function connectModules(src) {
	let load = {
		load: function () {}
	};
	let arg = [];
	let modules = src.split(',');
	if (window.modules == undefined) {
		window.modules = [];
	}
	if (modules.findIndex(elem => elem.src == src) < 0) next(modules, 0);

	function next(m, i) {
		if (m[i] == undefined) {
			load.load(arg);
			return;
		}
		add(modules[i]).load = function (sk) {
			arg.push(sk);
			next(modules, ++i)
		};
	}

	function add(src) {
		let l = {
			load: function () {}
		};
		let script = document.createElement('script');
		script.src = '../JavaScript/' + src + 'Module.js';
		script.async = false;
		document.head.appendChild(script);
		script.onload = function () {
			l.load(script);
			window.modules[window.modules.push({
				src: src,
				link: script,
			}) - 1].destroy = window.destructModule[window.destructModule.length - 1]
		};
		return l;
	}
	return load;
}

function disconnectModule(src) {
	for (let i = 0; i < window.modules.length; i++) {
		if (window.modules[i].src == src) {
			let module = window.modules[i];
			(module.link.parentNode.removeChild(module.link));
			module.destroy();
			window.modules.splice(i, 1);
		}
	}
}

function getLocation() {
	let masAdres = location.href.split('/');
	return masAdres[masAdres.length - 1] == '' ? masAdres[masAdres.length - 2] : masAdres[masAdres.length - 1];
}

function alignmentContent() {
	let container = document.getElementById('container');
	let w = document.body.clientWidth;
	let h = document.body.clientHeight;
	let left = (w - parseInt(getComputedStyle(container).width)) / 2;
	let height = h - 60 ;
	container.style.left = left < 0 ? 0 + 'px' : left + 'px';
	container.style.height = height + 'px';
}

function exit(){
	let data = new FormData();
		data.append("EXIT", "true");
		sendXml("../PHP/mainPHP.php","post",data);
}

//Вызов
connectModules('xml,transition').load = function () {
	alignmentContent();
	setTimeout(loaderOFF, 1000);
}
document.getElementById('exitB').addEventListener('click',exit);