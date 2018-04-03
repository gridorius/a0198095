(function () {

    window.addEventListener('popstate', function (e) {
        transition(e.state);
    });

    window.transition = function (loc, flag) {
        if (getLocation() != loc) {
            sendXml('../' + loc + '?transition=' + encodeURIComponent('true'), 'get', '').then(function (req) {
                document.getElementById('content').innerHTML = req;
                if (flag) history.pushState(loc, '','../' +  loc +'/' );
                switch (loc) {
                    case 'login':
                        loc = "Вход"
                        break;
                    case 'registration':
                        loc = "Регистрация"
                        break;
                    case 'profile':
                        loc = "Профиль"
                        break;
                    case 'friends':
                        loc = "Друзья"
                        break;
                    case 'groups':
                        loc = "Группы"
                        break;
                    case 'chats':
                        loc = "Чаты"
                        break;
                }
                document.getElementsByTagName('title')[0].innerHTML = loc;
                transitionLoader();
            });
        }
    }
    window.transitionLoader = function () {
        if (getLocation() != 'registration'&& getLocation() != 'login')if(document.cookie=='')location.href = '../registration/';
        if (getLocation() == 'registration' || getLocation() == 'login'){
            document.getElementById('exitB').hidden = true;
            if(document.cookie!='')location.href = '../profile/';
        }
        else this.document.getElementById('exitB').hidden = false;
        if (getLocation() == 'chats') {
            connectModules('chat,resizeControl').load=function(){
                resizeContoll(document.getElementById('message'), function (e) {
		        	document.getElementById('chat').style.gridTemplateRows = '40px 1fr ' + (e.h + 20) + 'px 5px';
	        	});
            }
        } else if (window.modules != undefined) disconnectModule('chat');
        if (getLocation() == 'login') {
            connectModules('login');
        } else if (window.modules != undefined) disconnectModule('login');
        if (getLocation() == 'registration') {
            connectModules('registration');
        } else if (window.modules != undefined) disconnectModule('registration');
        if (getLocation() == 'profile') {
            if (checkConnection('../libraries/jquery.cookie.js')) {
                let user = JSON.parse($.cookie("user"));
                $("#nick").html(user.login);
                $("name").html(user.login);
                if (user.pol == 1) {
                    $("surname").html("Мужчина");
                } else {
                    $("surname").html("Девушка");
                }
                $("age").html(user.date_of_birth);

                var photo;
                if (!photo) {
                    document.getElementById("USER_photo").style.backgroundImage = "../resurses/url(none-photo.jpg)";
                }
            } else addScript('../libraries/JQuery-min.js').load = function () {
                addScript('../libraries/jquery.cookie.js').load = function () {
                    let user = JSON.parse($.cookie("user"));
                    $("#nick").html(user.login);
                    $("name").html(user.login);
                    if (user.pol == 1) {
                        $("surname").html("Мужчина");
                    } else {
                        $("surname").html("Девушка");
                    }
                    $("age").html(user.date_of_birth);

                    var photo;
                    if (!photo) {
                        document.getElementById("USER_photo").style.backgroundImage = "../resurses/url(none-photo.jpg)";
                    }
                }
            }
        }
        if (getLocation() == 'Registration') {
            connectModules('registration');
        }
    }

    let destruct = function () {
        delete window.transition;
        delete window.transitionLoader;
    }

    if (window.destructModule != undefined) {
        window.destructModule.push(destruct);
    } else {
        window.destructModule = [];
        window.destructModule.push(destruct);
    }

    //Вызов
    transitionLoader();
})();