<?php



$password = "Your_password";
$salt = md5(uniqid());


for($i = 0; $i < 100000; $i++) {
    $password = hash('sha256', $password);
}

echo $password;


echo $salt.','.hash('sha256',$salt.$password);




















