<?php
ini_set('session.gc_maxlifetime', 432000); //сессия длится 5 дней
session_start();
// в этом файле обрабатывается авторизация (вход) пользователя
include "db.php";




$data = $_POST;
if( isset($data['do_login']) ){
    $login =$_POST['login_log']; 
	$pass =$_POST['password_log'];

    $result2 = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'");
    $user2 = $result2->fetch_assoc();
    if(empty($user2)){
        $_SESSION['message_2'] =  "Пользователь с таким логином не найден!!";
        header('location: reg.php'); // Редирект
    } 
    if(!empty($user2)){ // если логин найден проверяем пароль
            foreach($result2 as $row){
                $hash =$row['password']; // password
        }
        if (password_verify($pass, $hash)) {
          
            // setcookie("login", $user2['login'], time()+60*60*24*30);
            // setcookie("avatar", $user2['avatar'], time()+60*60*24*30);
        $_SESSION['user'] = [
            "id_user" => $user2['id_user'],
            "login" =>  $user2['login'],
            "avatar" =>  $user2['avatar'],
            "wins_alesha"  =>  $user2['wins_alesha'],
            "defeats_alesha"  =>  $user2['defeats_alesha'],
            "wins_megamind"  =>  $user2['wins_megamind'],
            "defeats_megamind"  =>   $user2['defeats_megamind'],
            "wins_supermind"  =>  $user2['wins_supermind'],
            "defeats_supermind"  =>  $user2['defeats_supermind'],
            "total_score_victories"  =>  $user2['total_score_victories'],
            "total_score_defeats"  =>  $user2['total_score_defeats'],
        ];

        // echo  $_SESSION['user']['total_score_defeats'];
        // echo  $_SESSION['user']['total_score_victories'];
            //Переадресовываем на страницу с игрой (index)
            header("location: index.php");
        }
        else {
            $_SESSION['message_2'] =  "Не верный логин или пароль!";
            header('Location: ../reg.php');
        }
	}
}

?>




<pre>

<?php  
        print_r($user2);
?>
</pre>
