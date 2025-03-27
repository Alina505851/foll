<?php
    session_start();
// в этом файле обрабатываются результаты игры
include "db.php";


$id_user = $_SESSION['user']['id_user'];

$result2 = $mysql->query("SELECT * FROM `users` WHERE `id_user` = '$id_user'");
$userinf = mysqli_fetch_assoc($result2);

// echo $userinf['login']; // текущие значения

// получем данные и на их остновании перезаписываем и задаем новые значения в сессию
// if(isset($id_user)){


    // $mysql->query("UPDATE `users` SET `wins_alesha` = '1', `total_score_defeats` = '7' WHERE `users`.`id_user`= '$id_user'");
// }



// // прибавить 1 к текущему значению
// $mysql->query("UPDATE `users` SET `wins_alesha` = `wins_alesha` + 1 WHERE `users`.`id_user` = '$id_user'");

// // прибавить 1 к текущему значению ПОБЕД
// $mysql->query("UPDATE `users` SET `total_score_victories` = `total_score_victories` + 1 WHERE `users`.`id_user` = '$id_user'");


// // прибавить 1 к текущему значению ПОРАЖЕНИЙ
// $mysql->query("UPDATE `users` SET `total_score_defeats` = `total_score_defeats` + 1 WHERE `users`.`id_user` = '$id_user'");


if (isset($_SESSION['user'])) {
    
}
  if (isset($_SESSION['guest'])) {
    echo "гостю не положенно";
}


if (isset($_POST['won']) && isset($_POST['opponent_difficulty'])){
    if($_POST['won'] == 1){ // игрок победил
        if($_POST['opponent_difficulty'] == 1){ // алеша
            $mysql->query("UPDATE `users` SET `wins_alesha` = `wins_alesha` + 1 WHERE `users`.`id_user` = '$id_user'");
        }
        if($_POST['opponent_difficulty'] == 2){ // мегамозг
            $mysql->query("UPDATE `users` SET `wins_megamind` = `wins_megamind` + 1 WHERE `users`.`id_user` = '$id_user'");
        }
        if($_POST['opponent_difficulty'] == 3){ // сверхразум
            $mysql->query("UPDATE `users` SET `wins_supermind` = `wins_supermind` + 1 WHERE `users`.`id_user` = '$id_user'");
        }
        $mysql->query("UPDATE `users` SET `total_score_victories` = `total_score_victories` + 1 WHERE `users`.`id_user` = '$id_user'");
    }  
    if($_POST['won'] == 0){ // игрок проиграл
        if($_POST['opponent_difficulty'] == 1){ // алеша
            $mysql->query("UPDATE `users` SET `defeats_alesha` = `defeats_alesha` + 1 WHERE `users`.`id_user` = '$id_user'");
        }
        if($_POST['opponent_difficulty'] == 2){ // мегамозг
            $mysql->query("UPDATE `users` SET `defeats_megamind` = `defeats_megamind` + 1 WHERE `users`.`id_user` = '$id_user'");
        }
        if($_POST['opponent_difficulty'] == 3){ // сверхразум
            $mysql->query("UPDATE `users` SET `defeats_supermind` = `defeats_supermind` + 1 WHERE `users`.`id_user` = '$id_user'");
        }
        $mysql->query("UPDATE `users` SET `total_score_defeats` = `total_score_defeats` + 1 WHERE `users`.`id_user` = '$id_user'");
    }  



    $result2 = $mysql->query("SELECT * FROM `users` WHERE `id_user` = '$id_user'");
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


//   echo "ggg";
  echo json_encode( $_SESSION['user']);
  
  // json_encode($result2);
   







}






