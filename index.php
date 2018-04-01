<?php
if(empty($_COOKIE['user']))header('location:registration');
else header('location:profile');
?>