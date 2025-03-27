<?php
  $mysql = new mysqli('localhost', 'root', '', 'fool');


  $data = $_POST;
  if( isset($data['do_login']) ){
	$errors = array();

    $login =$_POST['login']; 
	$pass =$_POST['password'];


    $result1 = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'");
    // $user = $result1->fetch_assoc();
    if(empty($result1)){
        $errors[3] =  "Пользователь с таким логином не найден!!";
    } 
    if(!empty($result1)){ // если логин найден проверяем пароль
            foreach($result1 as $row){
                $hash =$row['pass'];
        }
        if (password_verify($pass, $hash)) {
            echo   'хеш от этого пароля';
        }
        else {
            $errors[4] =  "Не верный логин или пароль!";
            }
	    }

    // //вход тут
    // if (empty($errors)) 
    // {	
   
    //     echo '<div style = "color: green;">Вы зашли! </div><hr>';
    // } else 
    // {
    //      echo'<div id="errors">'.array_shift($errors). '</div><hr>';
    // }

        }
    
   


	

    





  


?>

















<form action="/login.php" method="POST">
	<p>
		<p><strong>Логин:</strong></p>	
		<input type="text" name="login" value = "">
	</p>
	<p>
		<p><strong>Пароль:</strong></p>	
		<input type="password" name="password" value = "">
	</p>
	<p>
		<button type="submit" name = "do_login">Войти</button>
	</p>
</form>