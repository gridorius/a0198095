<?php 
if(empty($_GET['transition']))echo 
"<html>
<head>
    <meta charset=UTF-8>
    <title>Вход</title>
</head>
<link rel=stylesheet href=../styles/mainCSS.css>
<body>
    <pre hidden>";
    ?>
    <div id="head">Вход</div>
	<form id="relo">
		<input type="text" id="logOrMail" name="logOrMail" placeholder="login" required><br>
		<input type="password" id="password"  name="password" placeholder="password" required><br>
		<div id="reloB" onclick="login.call(this)">Вход</div>
	</form>
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