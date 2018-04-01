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
<div>Groups</div>
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