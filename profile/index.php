<?php 
if(empty($_GET['transition']))echo 
"<html>
<head>
    <meta charset=UTF-8>
    <title>Профиль</title>
</head>
<link rel=stylesheet href=../styles/mainCSS.css>
<body>
    <pre hidden>";
?>
            <div id="USER">
        <div id="USER_info">
            <div id="USER_photo"></div>
            <div id="USER_name">
                ЛОГИН:<br>
                <name></name><br>ПОЛ:<br>
                <surname></surname>
                <br>
                ДАТА РОЖДЕНИЯ:<br>
                <age></age>
            </div>
        </div>
        <div id="USER_news">
            <div id=nick></div>
            <div id="dop_info">
                <div id="nazv" class="zagolov">Дополнительная информация</div>
            </div>
            <div id="news" class="zagolov">НОВОСТИ</div>
        </div>
    </div>

<?php 
if(empty($_GET['transition']))echo "   
</pre>
<script id=onner>
        let xml = new XMLHttpRequest();
        xml.open('get','../background.html',false);    
        xml.setRequestHeader('Content-Type','text/html');
        xml.send();
        document.body.insertAdjacentHTML('afterbegin',xml.responseText);
        let pre = document.getElementsByTagName('pre')[0];
        document.getElementById('content').innerHTML = pre.innerHTML;
        pre.parentNode.removeChild(pre);
        let script = document.getElementById('onner');
        script.parentNode.removeChild(script);
    </script>
    <script src=../JavaScript/mainJS.js></script>
</body>
</html>";

?>