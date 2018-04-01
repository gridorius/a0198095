<?php
header('Content-Type:text/html; charset=utf-8');

function registration(){
	if(checkVar(array('login','email','password','pol','date_of_birth'))){
	$link = connectDB('a0198095_aofg');
	$login = mysqli_real_escape_string($link,$_POST['login']);
	$email = mysqli_real_escape_string($link,$_POST['email']);
	$password = $_POST['password'];
	$password = hash ("sha256",$password);
	$date_birth = mysqli_real_escape_string($link,$_POST['date_of_birth']);
	$pol = mysqli_real_escape_string($link,$_POST['pol']);
	$registration_date = date("Y-m-d");
	$errors = array();
	$query = "INSERT INTO all_users_aofg VALUES
	(null,'$login','$email','$password','$registration_date','$date_birth','$pol')";
	if(sendQuery($link,$query)){
		$query = "INSERT INTO chat_user SELECT 1,user_id FROM all_users_aofg WHERE login = '$login' AND password='$password'";
		sendQuery($link,$query);
	}
	if(mysqli_error($link)!='')$errors[] = mysqli_error($link);
	if(count($errors)!=0)echo json_encode($errors);
	}
}

function login(){
	if(checkVar(array('logOrMail','password'))){
	$errors = array();
	$link = connectDB("a0198095_aofg");
	$logOrMail = mysqli_real_escape_string($link,$_POST['logOrMail']);
	$password = $_POST['password'];
	$password = hash ("sha256",$password);
	$query = "SELECT * FROM all_users_aofg WHERE (Email='$logOrMail' OR login = '$logOrMail') AND password='$password'";
	$result = mysqli_query($link,$query);
	$rows = mysqli_num_rows($result);
	if(mysqli_error($link)!='')$errors[] = mysqli_error($link);
	if($rows!=0){
		$user = mysqli_fetch_object($result);
		$userJSON = json_encode($user);
		setcookie("user",$userJSON,time()+3600000,"/");
	}else{
		$errors[] = "not user";
	}
		if(count($errors)!=0)echo json_encode($errors);
	}
}

function RegLog($link,$login,$password){
	$query = "SELECT * FROM all_users_aofg WHERE login = '$login' AND password='$password'";
	$result = mysqli_query($link,$query);
	if($rows!=0){
		$user = mysqli_fetch_object($result);
		$userJSON = json_encode($user);
		setcookie("user",$userJSON,time()+3600000,"/");
	}
}

function loadChats(){
	$link = connectDB("a0198095_aofg");
	$user = json_decode($_COOKIE['user']);
	$ID = mysqli_real_escape_string($link,$user->user_id);
	$query = 
	"SELECT CASE WHEN a.f = 1 THEN 
	(SELECT login FROM all_users_aofg WHERE user_id = 
	(SELECT user_id FROM chat_user WHERE chat_id = a.id AND NOT user_id = a.uid))
	ELSE a.name END as name,a.id as id 
	FROM (SELECT user_id as uid,t2.id as id, t2.name as name, t2.friendly as f 
	FROM chat_user t1 INNER JOIN chats t2 ON t1.chat_id = t2.id WHERE user_id='$ID')a";
	$result = mysqli_query($link,$query);
	$chats = array();
	for($i = 0;$i<mysqli_num_rows($result);$i++){
		$chat = mysqli_fetch_object($result);
		$chats[]=$chat;
	}
	echo json_encode($chats);
}

function sendMessage(){
	$link = connectDB("a0198095_aofg");
	$message = mysqli_real_escape_string($link,$_POST['message']);
	$id = mysqli_real_escape_string($link,$_POST['id']);
	$date = date("Y-m-d H:i:s");
	$user = json_decode($_COOKIE['user']);
	$login = mysqli_real_escape_string($link,$user->login);
	$password = mysqli_real_escape_string($link,$user->password);
	$query = "INSERT INTO chats_messages SELECT null as id,'$id' as chat_id,'$message' as message ,user_id,'$date' as date 
	FROM all_users_aofg WHERE login='$login' AND password='$password'";
	mysqli_query($link,$query);
}

function loadMessages(){
	$link = connectDB("a0198095_aofg");
	$id = mysqli_real_escape_string($link,$_POST['id']);
	$pos = mysqli_real_escape_string($link,$_POST['pos']);
	$loPID = mysqli_real_escape_string($link,$_POST['loPID']);
	if($loPID!='all'){
		$query = "SELECT id as mesId,b.user_id as id,b.login as login,a.message as message,a.date as date
		FROM chats_messages a INNER JOIN all_users_aofg b ON  a.sender_id = b.user_id 
		WHERE chat_id='$id' AND id>'$loPID'   ORDER BY mesId ASC ";
	}else{
		$query = "SELECT id as mesId,b.user_id as id,b.login as login,a.message as message, a.date as date
		FROM chats_messages a INNER JOIN all_users_aofg b ON  a.sender_id = b.user_id 
		WHERE chat_id='$id' ORDER BY mesId ASC ";
	}	
	$result = mysqli_query($link,$query);
	if($result){
	$messages = array();
	for($i =0;$i<mysqli_num_rows($result);$i++){
		$message = mysqli_fetch_object($result);
		$messages[] = $message;
	}
	if(count($messages)!=0)echo json_encode($messages);
	}else{
		echo "false";
	}
}

function connectDB($DB){
	$link = mysqli_connect("localhost","a0198095_grido","ndjqgfgrf",$DB);
	if(!$link)echo "не удалось подключиться к базе данных";
	mysqli_set_charset($link,"utf8");
	return $link;
}

function sendQuery($DB,$QUERY,$RT='object'){
	$result = mysqli_query($DB,$QUERY);
	return $result;
}


function checkVar($mas){
	for($i=0;$i<count($mas);$i++){
		if(empty($_REQUEST[$mas[$i]])){
			 break; 
			 return false;}
		//if(empty($_REQUEST[$mas[$i]])) return ;
	}
	return true;
}

function checkSQL(){
	foreach($_POST as $key=>$value){
		if(preg_match('/select|union|inner|join/i',$value,$sp)){
			if(count($sp)!=0)echo json_encode($sp);
			return FALSE;
		}
	}
	return true;
}

function exitUser(){
	echo 1;
	setcookie("user",'',time()-1000,"/");
}

//Main

if(checkSQL()){
if(!empty($_POST['REGISTRATION']))registration();
if(!empty($_POST['LOGIN']))login();
if(!empty($_POST['LOADCHATS']))loadChats();
if(!empty($_POST['SENDMESSAGE']))sendMessage();
if(!empty($_POST['LOADMESSAGES']))loadMessages();
if(!empty($_POST['EXIT']))exitUser();
}

?>