<?php 
if(empty($_GET['transition']))echo 
"<html>
<head>
    <meta charset=UTF-8>
    <title>Регистрация</title>
</head>
<link rel=stylesheet href=../styles/mainCSS.css>
<body>
    <pre hidden>";
?>
    <div id="head">Регистрация</div>
	<form id="relo">
		<input type="text" id="login" name="login" placeholder="login" pattern="^([А-Яа-яA-Za-z\d])*$" maxlength="10" required><br>
		<input type="email" id="email"  name="email" placeholder="email" required><br>
		<input type="password" id="password" name="password" placeholder="password" maxlength="40"><br>
		<input type="password" id="confirm_password" name="confirm_password" placeholder="confirm password" maxlength="40" required><br>
		<input type="radio" id="m" name="pol" value="1"><label for="m">Муж</label>
		<input type="radio" id="z" name="pol" value="0"><label for="z">Жен</label><br>
		<input type="date" id="date_of_birth" name="date_of_birth" required><br>
		<div id="reloB" onclick="registration.call(this)">Регистрация</div><br>
	</form>
    <a href="../login/">Вход</a>
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