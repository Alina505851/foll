<?php
  $mysql = new mysqli('localhost', 'root', '', 'fool');
//   if($mysql)
// echo 'Соединение установлено.';
// else
// die('Ошибка подключения к серверу баз данных.');


 

$data = $_POST;
if( isset($data['do_signup']) ){
	//здесь делаем проверки на пустоту логина
	$errors = array();
	if (trim($data['login']) =='') {
		$errors[] = 'Введите логин !';
	}

	if ($data['password'] =='') {
		$errors[] = 'Введите пароль !';
	}
	// if ($data['password'] > 5) {
	// 	$errors[] = 'Пароль должен содержать больше 5 символов!';
	// }
	
	if ($data['password_2'] !=$data['password']) {
		$errors[] = 'Пароли не одинаковы !';
	}
	$login =$_POST['login']; 
	$pass =$_POST['pass'];

	$result1 = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'");
	$user1 = $result1->fetch_assoc(); // Конвертируем в массив
	if(!empty($user1)){
	$errors[] = "Данный логин уже используется!";
	}
	
	$hash = password_hash($pass, PASSWORD_DEFAULT);
	// $verifiPwd = password_verify($pass, $hash);
	

	//здесь регистрируем
	if (empty($errors)) 
	{	
		$mysql->query("INSERT INTO `users` (`login`, `pass`)VALUES('$login', '$hash')");
		$mysql->close();
		echo '<div style = "color: green;">Вы успешно зарегистрированы! </div><hr>';
	} else 
	{
		echo'<div id="errors">'.array_shift($errors). '</div><hr>';
	}
}
?>






                            <form action="/signup.php" method="POST">
	<p>
		<p><strong>Ваш Логин:</strong></p>	
		<input type="text" name="login" value = "<?php echo @$data['login'];?>">
	</p>
	<p>
		<p><strong>Ваш Пароль:</strong></p>	
		<input type="password" name="password" value = "<?php echo @$data['password'];?>">
	</p>
	
	<p>
		<p><strong>Повторите Пароль:</strong></p>	
		<input type="password" name="password_2" value = "<?php echo @$data['password'];?>">
	</p>
	<p>
		<button type="submit" name = "do_signup">Зарегистрироваться</button>
	</p>
</form>