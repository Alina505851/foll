<?php
 session_start();
include "db.php";

   
  if (isset($_SESSION['user']) || (isset($_SESSION['guest']))) {
    header('location: index.php'); // Редирект, если сессия существует
  }
  
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Добро пожаловать в игру Дурак</title>
    <link rel="icon" href="img/6.ico" type="image/x-icon">
    <!-- стили CSS -->
    <link rel="stylesheet" href="css/style_reg.css" />
    <!-- jquery -->
    <script src="js/jquery-3.6.0.min.js"></script>
    <!-- анимация -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>


    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Underdog&display=swap" rel="stylesheet">

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
    </style>


</head>

<section>
    <!-- меню входа -->
    <div id="entrance__wrapper">
        <!-- обертка с рамкой -->
        <div id="entrance__wrap">
            <!-- блок -->
            <div id="entrance">
                <!-- стобец 1 из 3 -->
                <div class="entrance__btn__wrap__column">
                    <div class="entrance__btn" id="registration">
                        <h2 class="entrance__btn__h2">Регистрация</h2>
                        <p class="entrance__btn__p">Только имя и пароль</p>
                    </div>

                    <div class="entrance__btn" id="enter">
                        <h2 class="entrance__btn__h2">Войти</h2>
                        <p class="entrance__btn__p">Если вы уже зарегистрированы</p>
                    </div>

                </div><!-- стобец 2 из 3 скрытый -->

 
  
                <div class="entrance__btn__wrap__column" id="retractable" >
                    <div class="entrance__drop" id="registration__block" >
                        <form action="/1111.php" method="POST">
                            <p>
                            <p class="p__form">Имя пользователя:</p> 
                         <input type="text"  name="login__reg" id="login__reg" class="entry__input" value="<?php echo $_SESSION['reg_log'];?>">
                        </p>
                            <p>
                            <p class="p__form">Пароль</p>
                            <input type="password" name="password__reg" id="password__reg"   class="entry__input"
                                value="<?php echo  $_SESSION['reg_pass'];?>">
                            </p> 
                            <p>
                            <p class="p__form">Повторите Пароль</p>
                            <input type="password" name="password_2" id="password_2" class="entry__input"
                                value="">
                            </p>
                            <div class="error_box">
                            <?php
                            if ($_SESSION['message']) {
                                echo '<p class="msg"> ' . $_SESSION['message'] . ' </p>';
                                                }
                                        unset($_SESSION['message']);
                                            ?>
                            </div>
                            <button type="submit" class="custom-btn btn-2" id="reg" name="do_signup">Зарегистрироваться</button>
                        </form>
                    </div>


                    <!-- внутренности входа -->
                    <div class="entrance__drop" id="enter__block">
                        <form action="/2222.php" method="POST">
                            <p>
                            <p class="p__form">Имя пользователя</p>
                            <input type="text" name="login_log" class="entry__input" value="">
                            </p>
                            <!-- <div class="error_box">
                            </div> -->
                            <p>
                            <p class="p__form">Пароль</p>
                            <input type="password" class="entry__input" name="password_log" value="">
                            </p>
                            <div class="error_box">
                            <?php
                            if ($_SESSION['message_2']) {
                                echo '<p class="msg"> ' . $_SESSION['message_2'] . ' </p>';
                                                }
                                        unset($_SESSION['message_2']);
                                            ?>
                            </div>
                            <p>
                                <button type="submit" class="custom-btn btn-2" name="do_login">Войти</button>
                            </p>
                        </form>
                    </div>

                    <!-- внутренности гостевого входа -->
                    <div class="entrance__drop" id="guest__block">
                        <h2 class="h__guest"> Вход как Гость</h2>
                        <div id="guest__block__limiter">
                            <p class="p__guest">
                                Профиль будет доступен только в этой вкладке браузера. Вы сможете получать
                                достижения и
                                настраивать внешний вид, но ваш прогресс будет утерян при закрытии браузера.
                                Гостевой профиль
                                теряется
                                при закрытии браузера и не может быть восстановлен.</p>
                        </div>
                        <form action="/3333.php"  method="POST">
                            <input type='text' name="do_guest" style="display: none;" value="Продолжить">
                             <button type="submit" id="go_guest" class="custom-btn btn-2" name="do_guest">Продолжить</button>
                                </form>
                       
                        
                    </div>
                </div>


                <!-- стобец 3 из 3 -->
                <div class="entrance__btn__wrap__column">
                    <div class="entrance__btn" id="vk">
                        <a href="https://oauth.vk.com/authorize?client_id=<?=ID?>&display=page&redirect_uri=<?=URL?>&scope=photos&response_type=code&v=5.131"
                            target="_blank">
                            <h2 class="entrance__btn__h2">Вход через вк </h2>
                            <img src="img/vk1.png" alt="">
                        </a>
                    </div>


                    <div class="entrance__btn" id="guest">
                        <h2 class="entrance__btn__h2">Играть как гость</h2>
                        <p class="entrance__btn__p">Без регистрации</p>
                    </div>


                </div>
            </div>
        </div>
    </div>
</section>

<script type="text/javascript" src="js/entrance.js"></script>
</body>

</html>