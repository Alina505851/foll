<?
//Инициализируем сессию:
session_start();
include "db.php";
if (!$_GET['code']){
exit('error code');
}

var_dump($_GET['code']);

include 'config.php';
//https://dev.vk.com/api/access-token/authcode-flow-community#5.%20%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20access_token
$token = json_decode(file_get_contents('http://oauth.vk.com/access_token?client_id='.ID.'&client_secret='.SECRET.'&redirect_uri='.URL.'&code='.$_GET['code']), true);

if (!$token){
exit('error tokenlol');
}

echo'<pre>';
var_dump($token); //Выводим информацию о аккаунте 
echo'</pre>';
//https://dev.vk.com/method/users.get
$data = json_decode(file_get_contents('https://api.vk.com/method/users.get?access_token='.$token['access_token'].'&user_ids='.$token['user_id'].'&fields=first_name,photo_200_orig&name_case=nom&v=5.131'), true);

if (!$data){
exit('error data');
}

echo'<pre>';
var_dump($data); //Выводим информацию о аккаунте
echo'</pre>';


$idvk =$data["response"][0]["id"]; 
$login =$data["response"][0]["first_name"]; 

var_dump($login);
$avatar =$data["response"][0]["photo_200_orig"]; 
var_dump($avatar);

$_SESSION['login'] = $login;
$_SESSION['idvk'] = $idvk;
$_SESSION['avatar'] = $avatar;
echo'<pre>';
echo $_SESSION['login'];
echo'</pre>';



echo'<pre>';
echo $_SESSION['avatar'];
echo'</pre>';

echo'<pre>';
echo $_SESSION['idvk'];
echo'</pre>';

//$mysql->query("INSERT INTO `kkk` (`www`)VALUES(`$idvk`)");
//$mysql->close();




// $result2 = $mysql->query("SELECT * FROM `users` WHERE `id_vk` = '$idvk'");
// $user2 = $result2->fetch_assoc();
// if(empty($user2)){
//     // надо регать в бд нового пользователя
// } 
// if(!empty($user2)){ // если логин найден то выводим инфу и записываем в сессии
//         foreach($result2 as $row){
//             $hash =$row['password']; // password
//     }
















$result1 = $mysql->query("SELECT * FROM `users` WHERE `id_vk` = '$idVk'");
	$user1 = $result1->fetch_assoc(); // Конвертируем в массив
	if(!empty($user1)){ //нашли этого пользователя
      echo "нашли";
        $mysql->query("INSERT INTO `avatars` (`filename`)VALUES('$avatar')");// вдруг аву поменял
	}
    else{
         echo "не нашли";
         $mysql->query("INSERT INTO `users` (`id_user`, `id_vk`, `login`, `password`, `avatar`, `wins_alesha`, `defeats_alesha`, `wins_megamind`, `defeats_megamind`, `wins_supermind`, `defeats_supermind`, `total_score_victories`, `total_score_defeats`) VALUES (NULL, '$idVk', '$login', NULL, '$avatar', '0', '0', '0', '0', '0', '0', '0', '0')");
        // $mysql->query("INSERT INTO `users` (`login`, `id_vk`)VALUES('$login', '$idVk')");
        // $mysql->query("INSERT INTO `avatars` (`filename`)VALUES('$avatar')");//  ава
    }




?>


<img src="<?=$avatar ?>" alt="" style="width: 70px; height:70px">
<img src="<?=$_SESSION['avatar'] ?>" alt="" style="width: 70px; height:70px">