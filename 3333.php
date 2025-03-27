<?php

    session_start();
// в этом файле обрабатывается ГОСТЕВОЙ ВХОД пользователя


include "db.php";



// гостевой вход
$data = $_POST;
if( isset($data['do_guest']) ){
    $errors = array();

    $_SESSION['guest'] = [
        "id_user" => "666",
        "login" =>  "guest_#007",
        "avatar" =>  "img/ava_guest.png",
        "wins_alesha"  =>  0,
        "defeats_alesha"  => 0,
        "wins_megamind"  =>  0,
        "defeats_megamind"  =>  0,
        "wins_supermind"  =>  0,
        "defeats_supermind"  =>  0,
        "total_score_victories"  =>  0,
        "total_score_defeats"  =>  0,
    ];

    // echo  $_SESSION['user']['avatar'];
    echo  $_SESSION['guest']['login'];
    echo  $_SESSION['guest']['total_score_defeats'];
// //Переадресовываем на страницу с игрой (index)
            header("location: index.php");
}
?>
<pre>

<?php  
        print_r($_SESSION['guest']);
?>
</pre>
