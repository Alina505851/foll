<?php 
// include "db.php"; // убрать, возможно не понадобится
session_start();
unset($_SESSION['user']);
unset($_SESSION['guest']);
//Перебрасываем после выхода
header('Location: reg.php'); //reg.php
?>





