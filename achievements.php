<?php

    session_start();
// в этом файле обрабатывается регистрация пользователя
include "db.php";


$user_id = $_SESSION['user']['id_user'];




if( isset($data['1']) ){


    if ( $user['total_score_victories'] = 1 ) // первая победа
    {
        $ach_id = 1;
        // $mysql->query("INSERT INTO `users_achievements` (`id_user`, `id_achievement`)VALUES ('$user_id', '$ach_id', now()");
       
        // "UPDATE table SET `achievement` = 4"
    } 
    if ( $userp['bank_account'] >= 50000  )
    {
        $ach_id = 2;
       "UPDATE table SET `achievement` = 3";
    }
    if ( $userp['bank_account'] >= 1000 )
    {
        $ach_id = 3;
       "UPDATE table SET `achievement` = 2";
    }
    if ( $userp['bank_account'] >= 1 )
    {
        $ach_id = 4;
       "UPDATE table SET `achievement` = 1";
    }

    // $mysql->query("INSERT INTO `users_achievements` (`id_user`, `id_achievement`)VALUES ('$user_id', '$ach_id', now()");


    $result2 = $mysql->query("SELECT * FROM `users` WHERE `id_user` = '$$user_id'");
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
    echo $_SESSION['user']['wins_alesha'];
    // print_r($_SESSION);
   
}

?>

