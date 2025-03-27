<?php

    session_start();
// в этом файле обрабатывается регистрация пользователя
include "db.php";




$data = $_POST;
$_SESSION['reg_log'] = $data['login__reg'];
$_SESSION['reg_pass'] = $data['password__reg'];
if( isset($data['do_signup']) ){
	//здесь делаем проверки на пустоту логина

	if (trim($data['login__reg']) =='') {
        $_SESSION['message'] = 'Введите логин !';
	}
	//здесь делаем проверки на пустоту пароля
	if ($data['password__reg'] =='') {
		$_SESSION['message'] = 'Введите пароль !';
	}
    //здесь делаем проверки кол-во символов в пароле
    if(strlen($data["password__reg"]) < 5 || strlen($data["password__reg"]) > 25){
        $_SESSION['message'] = 'Пароль не должен содержать больше 5 символов и меньше 25 символов!';
    }
	if ($data['password_2'] !=$data['password__reg']) {
		$_SESSION['message'] = 'Пароли не одинаковы !';
	}
	$login =$_POST['login__reg']; 
	$pass =$_POST['password__reg'];

	$result1 = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'");
	$user1 = $result1->fetch_assoc(); // Конвертируем в массив
	if(!empty($user1)){
        $_SESSION['message'] = "Данный логин уже используется!";
	}
	$hash = password_hash($pass, PASSWORD_DEFAULT);
	//здесь регистрируем
	if (empty($_SESSION['message'])) 
	{	
        $mysql->query("INSERT INTO `users` (`id_user`, `id_vk`, `login`, `password`, `avatar`, `wins_alesha`, `defeats_alesha`, `wins_megamind`, `defeats_megamind`, `wins_supermind`, `defeats_supermind`, `total_score_victories`, `total_score_defeats`) VALUES (NULL, NULL, '$login', '$hash', NULL, '0', '0', '0', '0', '0', '0', '0', '0')");
        $result2 = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'");
    
        $user = mysqli_fetch_assoc($result2);
        $_SESSION['user'] = [
            "id_user" => $user['id_user'],
            "login" =>  $user['login'],
            "avatar" =>  $user['avatar'],
            "wins_alesha"  =>  $user['wins_alesha'],
            "defeats_alesha"  =>  $user['defeats_alesha'],
            "wins_megamind"  =>  $user['wins_megamind'],
            "defeats_megamind"  =>   $user['defeats_megamind'],
            "wins_supermind"  =>  $user['wins_supermind'],
            "defeats_supermind"  =>  $user['defeats_supermind'],
            "total_score_victories"  =>  $user['total_score_victories'],
            "total_score_defeats"  =>  $user['total_score_defeats'],
        ];
            // //Переадресовываем на страницу с игрой (index)
            header('Location: ../index.php');
    } else{
        header('Location: ../reg.php');
    }
} 


?>




<pre>

<?php  
        print_r($user);
?>
</pre>
