<?php  
  session_start();
  // в этом файле обрабатывается ГОСТЕВОЙ ВХОД пользователя
  include "db.php";


  if (!isset($_SESSION['user']) && (!isset($_SESSION['guest']))) {
    header('location: reg.php'); // Редирект, если сессия не существует
  }


  if (!isset($_SESSION['user']) && (isset($_SESSION['guest']))) {
    $player_ava = $_SESSION['guest']['avatar'];
    $player_name = $_SESSION['guest']['login'];
    $level = 0;
    // echo "вошел гость";
    if(!isset($player_ava)){
      // echo "нет авы";
    }
    // echo $player_name;
    // echo $player_ava;
    
  } else{
    // echo "вошел пользователь";
    $level = 1;
    $player_name = $_SESSION['user']['login'];
    $player_ava = $_SESSION['user']['avatar'];
    $player_id = $_SESSION['user']['id_user'];
    if(!isset($player_ava)){
      echo "нет авы";
      $player_ava = "img/ava_standart.png";
    }
    // echo $player_name;
  }








?>









<?php
error_reporting(0);
 
$msg = "";
// If upload button is clicked ...
if (isset($_POST['upload'])) { // загрузка фотки не робит но возможно понадобится
 
    $filename = $_FILES["uploadfile"]["name"];
    $tempname = $_FILES["uploadfile"]["tmp_name"];
    $folder = "./img/" . $filename;
 
    $db = mysqli_connect("localhost", "root", "", "cm25474_fool");
 
 
    $id= $_SESSION['id'];
    $result3 = $mysql->query("SELECT * FROM `users` WHERE `id_user` = '$id'");

    // Get all the submitted data from the form
    $sql = "INSERT INTO users (avatars) VALUES ('$filename')";
    // Execute query
    mysqli_query($db, $sql);
 
    // Now let's move the uploaded image into the folder: image
    if (move_uploaded_file($tempname, $folder)) {
        echo "<h3>  Image uploaded successfully!</h3>";
    } else {
        echo "<h3>  Failed to upload image!</h3>";
    }
}
?>




<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Дурак</title>
  <link rel="icon" href="img/image203.ico" type="image/x-icon">
  <!-- стили CSS -->
  <link rel="stylesheet" href="css/style_game.css" />
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

<body>

  <section>
    <nav>
      <div class="hamburger"></div>
      <input id="menu__toggle" type="checkbox" />
      <label class="menu__btn" for="menu__toggle">
        <span></span>
      </label>
    </nav>
    <div id="result_wrap">
      <!-- прозрачный блок в котором лежат конфети -->
      <img id="confetti_left" class="hidden" src="img/confetti_1.png">
      <img id="confetti_right" class="hidden" src="img/confetti_2.png">
    </div>
    <div id="result">
      <div class="result_text">
        <h2 class="result_title">Тестовый заголовок</h2>
      </div>
      <div id="result_line">
        <table border='1' class="tab">
          <tr>
            <td>Побед над Алешей</td>
            <td>Побед над Мегамозгом</td>
            <td>Побед над Сверхразумом</td>

          </tr>
          <?php
           if (!isset($_SESSION['user']) && (isset($_SESSION['guest']))) { // гость
            echo '<tr>' .
            "<td>{$_SESSION['guest']['wins_alesha']}</td>" .
            "<td>{$_SESSION['guest']['wins_megamind']}</td>" .
            "<td>{$_SESSION['guest']['wins_supermind']}</td>" .
            '</tr>';
          } else{ // пользователь
            // $sql = mysqli_query($link, 'SELECT `ID`, `fio`, `telefon`, `data_obrashenia`, `nom_avto`, `status` FROM `klient`');
            $result2 = $mysql->query("SELECT `wins_alesha`, `defeats_alesha`, `wins_megamind`, `defeats_megamind`, `wins_supermind`, `defeats_supermind` FROM `users` WHERE `id_user` = '$player_id'");
            while ($result3 = mysqli_fetch_array($result2)) {
            echo '<tr>' .
            "<td>{$result3['wins_alesha']}</td>" . 
            "<td>{$result3['wins_megamind']}</td>" .    
            "<td>{$result3['wins_supermind']}</td>" .
            '</tr>';
          }
        }
            ?>

<table border='1' class="tab">
          <tr>
            <td>Поражений АЛЕША</td> 
            <td>Поражений МЕГАМОЗГ</td>
            <td>Поражений СВЕРХРАЗУМ</td>
          </tr>
          <?php
           if (!isset($_SESSION['user']) && (isset($_SESSION['guest']))) { // гость
            echo '<tr>' .
            "<td>{$_SESSION['guest']['defeats_alesha']}</td>" .
            "<td>{$_SESSION['guest']['defeats_megamind']}</td>" .
            "<td>{$_SESSION['guest']['defeats_supermind']}</td>" .
            '</tr>';

          } else{ // пользователь
            // $sql = mysqli_query($link, 'SELECT `ID`, `fio`, `telefon`, `data_obrashenia`, `nom_avto`, `status` FROM `klient`');
            $result2 = $mysql->query("SELECT `wins_alesha`, `defeats_alesha`, `wins_megamind`, `defeats_megamind`, `wins_supermind`, `defeats_supermind` FROM `users` WHERE `id_user` = '$player_id'");
            while ($result3 = mysqli_fetch_array($result2)) {
            echo '<tr>' .
            "<td>{$result3['defeats_alesha']}</td>" .
            "<td>{$result3['defeats_megamind']}</td>" .
            "<td>{$result3['defeats_supermind']}</td>" .
            '</tr>';
          }
        }
        ?>
        </table>
     
    

        <p>Общее число сыгранных игр: </p>
        <p>Общее число побед: </p>
        <p>Общее число поражений: </p>

        <p>Вы побеждаете в 75% игр!</p>


      </div>
      <div id="result_btn">
        <div class="btn__bottom__bottom new_game_button">
          <p class="menu_bottom_p">Новая игра</p>
          <div id="anim"></div>
          <div id="anim_2"></div>
        </div>

      </div>


    </div>



    <div id="rules">
      <div id="rules_text_header">
        <h1>
          Правила
        </h1>
        <hr>
      </div>
      <div id="rules_text_p">
        <p>
          Колода тщательно тасуется, снимать необязательно и каждому игроку сдается по 6 карт. Колода, которая
          осталась, кладется по центру стола. Верхняя карта с колоды снимается, открывается и кладется под колоду. Эта
          карта определяет козырную масть в игре. В первой игре ходит первым игрок, у которого имеется младший козырь,
          если козыря нет, то карты раздаются заново. Первый игрок может сделать первый ход с любой своей карты. Игрок
          ходит картой к игроку слева от себя и
          этот игрок должен отбить эту карту. Для того, чтобы отбить необходимо, положить карту старшего значения той
          же
          масти. Если карта, которую необходимо отбить не является козырем, то можно отбить ее козырем. Если эта карта
          козырь, то соответственно отбить ее можно, козырной картой старшего значения. Если игрок, который
          отбивается,
          отобьет все выложенную карту, то обе карты идут в отбой, откладываются в закрытую стопку и участия в игре не
          принимают. Если игрок, который отбивается, не отобьет все выложенную карту, то он забирает обе карты себе.
          После чего все игроки, у которых карт менее шести добирают карты из колоды до шести, первым берет игрок,
          который делал первый ход, затем берет карту игрок, который отбивался. Таким образом, игра идет до тех пор,
          пока не останется один игрок с картами на руках. Этот игрок считается проигравшим и зовется «дураком».
        </p>
      </div>
      <div id="understand_rules_button">
        <p class="menu_bottom_p">Понятно</p>
      </div>
    </div>
    <!-- Меню которое раскрывается при клике на бургер -->
    <div id="menu">
      <div id="open-closed"></div>
      <div id="menu_top">
        <div class="menu_top_wrapper_one">

          <div class="menu_top_wrapper_block">
            <div id="profile_header" class="menu_top_wrapper_block_header">
              <p class="menu_top_p">Профиль </p>
            </div>
            <div id="profile_body" class="menu_top_wrapper_block_body">
    
              <div class="photo_setting_wrap"  <?php if ($level === 0){ echo 'style="display:none;"'; } ?>>
                <div class="player_photo_setting">
                  <div id="player_photo_setting_img">
                    
                    <img src="<?php  echo $_SESSION['user']['avatar'];  ?>">
                  </div>
                </div>
                <div class="player_photo_setting">
                  <form method="POST" id="player_photo_setting_form_pic" action="ava.php" enctype="multipart/form-data">
                    <input type="file" id="input__photo_setting" name="uploadfile" value="" />
                    <div>
                      <div id="col">
                      <input type="file" multiple="multiple" accept=".txt,image/*">
                     
                        <!-- <button type="submit" id="button__photo_setting" name="upload"> -->
                        <a href="#" class="upload_files button">Загрузить</a>
                        <!-- </button> -->
                      </div>
                    </div>
                  </form>
                  <div id="display-image">
                     
                  </div>
                </div>
              </div>
                  <div class="photo_setting_wrap_guest" <?php if ($level === 0){ echo 'style="display:flex;"'; } ?>>>  
                    <h1 class="photo_setting_wrap_h1">
                     Для настройки профиля необходимо <a href="logout.php" class="logout">авторизироваться!</a>
                    </h1>
                </div>
             
              <div class="photo_setting_wrap"  <?php if ($level === 0){ echo 'style="display:none;"'; } ?>>
                <form action="logout.php" id="player_photo_setting_form_log_exit" method="post">
                  <h4 class="profile_h">Выйти из аккаунта</h4>
                  <button id="profile_exit" class="btn btn_profile"><a href="logout.php" class="logout">Выход</a></button><br>
                </form>
              </div>
            </div>
          </div>


          <div class="menu_top_wrapper_block">
            <div id="mode_header" class="menu_top_wrapper_block_header">
              <p class="menu_top_p">Режим игры </p>
            </div>
            <div id="mode_body" class="menu_top_wrapper_block_body">
              <div class="radio_body_line">
                <label for="simple" class="l-radio">
                  <input type="radio" id="simple" value="1" checked="checked" name="complexity">
                  <span>Простой</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="medium" class="l-radio">
                  <input type="radio" id="medium" value="2" name="complexity">
                  <span>Средний</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="hard" class="l-radio">
                  <input type="radio" id="hard" value="3" name="complexity">
                  <span>Сложный</span>
                </label>
              </div>
            </div>
          </div>

          <div class="menu_top_wrapper_block">
            <div id="background_header" class="menu_top_wrapper_block_header">
              <p class="menu_top_p"> Фон </p>
            </div>
            <div id="background_body" class="menu_top_wrapper_block_body">
              <div class="background_body_line">
                <div class="block_mini" id="background_one"></div>
                <div class="block_mini" id="background_two"></div>
                <div class="block_mini" id="background_three"></div>
              </div>
              <div class="background_body_line">
                <div class="block_mini" id="background_four"></div>
                <div class="block_mini" id="background_five"></div>
                <div class="block_mini" id="background_six"></div>
              </div>
              <div class="background_body_line">
                <div class="block_mini" id="background_seven"></div>
                <div class="block_mini" id="background_eight"></div>
                <div class="block_mini" id="background_nine"></div>
              </div>
              <div class="background_body_line">
                <div class="block_mini" id="background_ten"></div>
                <div class="block_mini" id="background_eleven"></div>
                <div class="block_mini" id="background_twelve"></div>
              </div>
            </div>
          </div>


          <div class="menu_top_wrapper_block">
            <div id="face_header" class="menu_top_wrapper_block_header">
              <p class="menu_top_p">Лицо карт </p>
            </div>
            <div id="face_body" class="menu_top_wrapper_block_body">
              <div class="radio_body_line">
                <label for="face_zero" class="l-radio">
                  <input type="radio" id="face_zero" value="0" checked="checked" name="face">
                  <span>Стандартное</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="face_one" class="l-radio">
                  <input type="radio" id="face_one" value="1" name="face">
                  <span>Вар 1</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="face_two" class="l-radio">
                  <input type="radio" id="face_two" value="2" name="face">
                  <span>Вар 2</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="face_three" class="l-radio">
                  <input type="radio" id="face_three" value="3" name="face">
                  <span>Вар 3</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="face_four" class="l-radio">
                  <input type="radio" id="face_four" value="4" name="face">
                  <span>Вар 4</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="face_five" class="l-radio">
                  <input type="radio" id="face_five" value="5" name="face">
                  <span>Вар 5</span>
                </label>
              </div>
            </div>
          </div>
        </div>


        <div class="menu_top_wrapper_two">
          <div class="menu_top_wrapper_block">
            <div id="achievements_header" class="menu_top_wrapper_block_header">
              <p class="menu_top_p">Достижения </p>
            </div>
            <div id="achievements_body" class="menu_top_wrapper_block_body">

              <div id="achievements_body_line_one" class="achievements_body_line">
                <!-- фото достижения -->
                <div id="achievements_pic_one" class="achievements_pic">

                </div>
                <!-- описание достижения -->
                <div id="achievements_desc_one" class="achievements_desc">
                  <div id="achievements_desc_one_text" class="achievements_desc_text">
                    <p>Описание достижения и как его получить</p>
                  </div>
                  <div id="achievements_desc_one_date" class="achievements_desc_date">
                    <p>полученно: <span>10.10.2010</span></p>
                  </div>
                </div>
              </div>
              <div id="achievements_body_line_two" class="achievements_body_line">
                <!-- фото достижения -->
                <div id="achievements_pic_two" class="achievements_pic">

                </div>
                <!-- описание достижения -->
                <div id="achievements_desc_two" class="achievements_desc">
                  <div id="achievements_desc_two_text" class="achievements_desc_text">
                    <p>Одержите победу над мегамозгом</p>
                  </div>
                  <div id="achievements_desc_two_date" class="achievements_desc_date">
                    <p>полученно: <span>20.07.2020</span></p>
                  </div>
                </div>
              </div>
              <div id="achievements_body_line_three" class="achievements_body_line">
                <!-- фото достижения -->
                <div id="achievements_pic_three" class="achievements_pic">

                </div>
                <!-- описание достижения -->
                <div id="achievements_desc_three" class="achievements_desc">

                </div>
              </div>
              <div id="achievements_body_line_four" class="achievements_body_line">
                <!-- фото достижения -->
                <div id="achievements_pic_four" class="achievements_pic">

                </div>
                <!-- описание достижения -->
                <div id="achievements_desc_four" class="achievements_desc">

                </div>
              </div>
              <div id="achievements_body_line_five" class="achievements_body_line">
                <!-- фото достижения -->
                <div id="achievements_pic_five" class="achievements_pic">

                </div>
                <!-- описание достижения -->
                <div id="achievements_desc_five" class="achievements_desc">

                </div>
              </div>


            </div>
          </div>


          <div class="menu_top_wrapper_block">
            <div id="sorting_header" class="menu_top_wrapper_block_header">
              <p class="menu_top_p">Сортировка карт</p>
            </div>
            <div id="sorting_body" class="menu_top_wrapper_block_body">
              <div class="radio_body_line">
                <label for="sorting_zero" class="l-radio">
                  <input type="radio" id="sorting_zero" value="0" checked="checked" name="sorting">
                  <span>Без сортировки</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="sorting_one" class="l-radio">
                  <input type="radio" id="sorting_one" value="1" name="sorting">
                  <span>По масти</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="sorting_two" class="l-radio">
                  <input type="radio" id="sorting_two" value="2" name="sorting">
                  <span>По значению</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="sorting_three" class="l-radio">
                  <input type="radio" id="sorting_three" value="3" name="sorting">
                  <span>По значению (козырь справа)</span>
                </label>
              </div>
            </div>
          </div>


          <div class="menu_top_wrapper_block">
            <div id="design_header" class="menu_top_wrapper_block_header">
              <p class="menu_top_p">Дизайн стола </p>
            </div>
            <div id="design_body" class="menu_top_wrapper_block_body">
              <div class="design_body_line">
                <div class="block_mini" id="design_one"></div>
                <div class="block_mini" id="design_two"></div>
                <div class="block_mini" id="design_three"></div>
              </div>
              <div class="design_body_line">
                <div class="block_mini" id="design_four"></div>
                <div class="block_mini" id="design_five"></div>
                <div class="block_mini" id="design_six"></div>
              </div>
              <div class="design_body_line">
                <div class="block_mini" id="design_seven"></div>
                <div class="block_mini" id="design_eight"></div>
                <div class="block_mini" id="design_nine"></div>
              </div>>
            </div>
          </div>



          <div class="menu_top_wrapper_block">
            <div id="shirt_header" class="menu_top_wrapper_block_header">
              <p class="menu_top_p">Рубашка карт </p>
            </div>
            <div id="shirt_body" class="menu_top_wrapper_block_body">
              <div class="radio_body_line">
                <label for="shirt_zero" class="l-radio">
                  <input type="radio" id="shirt_zero" value="0" checked="checked" name="shirt">
                  <span>Стандартная</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="shirt_one" class="l-radio">
                  <input type="radio" id="shirt_one" value="1" name="shirt">
                  <span>Вар 1</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="shirt_two" class="l-radio">
                  <input type="radio" id="shirt_two" value="2" name="shirt">
                  <span>Вар 2</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="shirt_three" class="l-radio">
                  <input type="radio" id="shirt_three" value="3" name="shirt">
                  <span>Вар 3</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="shirt_four" class="l-radio">
                  <input type="radio" id="shirt_four" value="4" name="shirt">
                  <span>Вар 4</span>
                </label>
              </div>
              <div class="radio_body_line">
                <label for="shirt_five" class="l-radio">
                  <input type="radio" id="shirt_five" value="5" name="shirt">
                  <span>Вар 5</span>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div id="menu_bottom">
        <!-- <div id="feedback_button_wrap"></div> -->
        <div class="menu_bottom_wrapper">
        <div class="btn__bottom__bottom" id="sound_button">
            <input id="jcp-volume" type="range" min="0" max="10" value="5" step="0.1" />
          </div>
          <div class="btn__bottom__bottom new_game_button" >
            <p class="menu_bottom_p">Новая игра</p>
            <div id="anim"></div>
            <div id="anim_2"></div>
          </div>

          <div id="rules_button" class="btn__bottom__bottom">
            <p class="menu_bottom_p">Правила игры</p>
          </div>
        </div>
      </div>
    </div>



    <div id="table">

    <div class="table__wrapper" id="table__wrapper__left">
        <div id="deck__wrapper">
          <p class="deck__p">КАРТ: <span id="quantity_deck"> 24</span></p>
          <div id="deck">
          </div><!-- Козырь  -->
          <div id="trump_suit">
          </div>
          <div class="anim_card"></div>
          <div class="anim_card"></div>
          <div class="anim_card"></div>
          <div class="anim_card"></div>
          <div id="trump">
          </div>
        </div>
      </div>


      <div class="table__wrapper" id="table__wrapper__center">
        <!-- ВЕЕР КОМПА -->
        <div class="opponent_window">
          <!-- верхняя часть -->
          <div id="opponent__info">
            <div id="opponent__name__wrap">
              <div id="opponent__name"> АЛЁША </div>
            </div>
            <div id="opponent__photo">
            </div>
          </div>
          <!-- нижня часть блока -->
          <div class="opponent_hand">
            <div class="shirt"></div>
            <div class="shirt"></div>
            <div class="shirt"></div>
            <div class="shirt"></div>
            <div class="shirt"></div>
            <div class="shirt"></div>
          </div>
        </div>
        <!-- текст который говорит комп -->
        <!-- <div class="bubble speech">Сейчас посмотрю чем могу отбиться</div> -->
        <!-- <div class="bubble speech">Поздравляю.... </div>
          <div class="bubble speech">Хи-хи! Я победил.</div>
          <div class="bubble speech">Беру!</div>
          <div class="bubble speech">Пасс!</div>
          <div class="bubble speech">Хмм.. Бито!</div>
          <div class="bubble speech">Мне больше нечего подкинуть...</div>
          <div class="bubble speech">Забирай!</div>
          <div class="bubble speech">Ой, кажется я положил козырную карту. Ну ладно.</div>
          <div class="bubble speech">Я хожу первый!</div>
          <div class="bubble speech">Сейчас твой ход!</div>
          <div class="bubble speech">Похоже, вселенная удостоила тебя права делать превый ход.</div>
          <div class="bubble speech">Ну чтож, я хожу первый.</div>
          <div class="bubble speech">Забираю!</div>
          <div class="bubble speech">Сегодня удача не на моей стороне....</div> -->
          <div class="bubble speech"></div>



        <div id="game_zone">
          <div class="line" id="line_one">
            <div class="cell" id="cell_one">
              <!-- <div class="card_table"></div> -->
            </div>
            <div class="cell" id="cell_two">
              <!-- <div class="card_table"></div> -->
            </div>
            <div class="cell" id="cell_three">
              <!-- <div class="card_table"></div> -->
            </div>
          </div>
          <div class="line" id="line_two">
            <div class="cell" id="cell_four">
              <!-- <div class="card_table"></div> -->
            </div>
            <div class="cell" id="cell_five">
              <!-- <div class="card_table"></div> -->
            </div>
            <div class="cell" id="cell_six">
              <!-- <div class="card_table"></div> -->
            </div>
          </div>
        </div>


        <div id="player__interface">
          <div id="player__info">
        
            <div id="player__photo" style="background-image:  url(..//<?php echo $player_ava; ?>)">
            <img id="player__photo_img" src="">
            </div>
            <div id="player__name__wrap">
              <div id="player__name"><?php echo $player_name; ?></div>
            </div>
          </div>
          <div class="hand" id="hand__player">
            <div class="my_card"></div>
            <div class="my_card"></div>
            <div class="my_card"></div>
            <div class="my_card"></div>
            <div class="my_card"></div>
            <div class="my_card"></div>
          </div>
          <div id="btn_pass_wrap">
            <div class="button_game" id="btn_pass">ПАСС </div>
            <div class="button_game" id="btn_bito">БИТО </div>
            <div class="button_game" id="btn_bery">БЕРУ </div>
          </div>
        </div>
      </div>
      <div class="table__wrapper" id="table__wrapper__right">
        <div id="bito"></div>
      </div>
    </div>
  </section>
  <script type="text/javascript" src="js/script.js"></script>
  <script type="text/javascript" src="js/settings.js"></script>
  <script type="text/javascript" src="js/anim.js"></script>
</body>

</html>
<script>
(function($){

var files; // переменная. будет содержать данные файлов

// заполняем переменную данными файлов, при изменении значения file поля
$('input[type=file]').on('change', function(){
	files = this.files;
});


// обработка и отправка AJAX запроса при клике на кнопку upload_files
$('.upload_files').on( 'click', function( event ){

	event.stopPropagation(); // остановка всех текущих JS событий
	event.preventDefault();  // остановка дефолтного события для текущего элемента - клик для <a> тега

	// ничего не делаем если files пустой
	if( typeof files == 'undefined' ) return;

	// создать данные файлов в подходящем для отправки формате
	var data = new FormData();
	$.each( files, function( key, value ){
		data.append( key, value );
	});

	// переменная идентификатор запроса
	data.append( 'my_file_upload', 1 );

	let answer

	// AJAX запрос
	$.ajax({
		url         : './ava.php',
		type        : 'POST',
		data        : data,
		cache       : false,
		dataType    : 'json',
		// отключаем обработку передаваемых данных, пусть передаются как есть
		processData : false,
		// отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
		contentType : false,
		// функция успешного ответа сервера
		success     : function( respond, status, jqXHR ){
			// ОК
			if( typeof respond.error === 'undefined' ){
				transliterate(files[0].name)
				console.log(answer); // имя файла в транслите
        $('#player_photo_setting_img img').attr("src",'uploads/' + answer + ' ?>');
        $("#player__photo").css('background-image','uploads/' + answer + ' ?>'); // не маеняется
			}
			// error
			else {
				console.log('ОШИБКА: ' + respond.error );
			}
		},
		// функция ошибки ответа сервера
		error: function( jqXHR, status, errorThrown ){
			console.log( 'ОШИБКА AJAX запроса: ' + status, jqXHR );
		}
		

	});

function transliterate(word){
    answer = ""
      , a = {};

   a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="'";
   a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="'";
   a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="a";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
   a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
   a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="'";a["Б"]="B";a["Ю"]="YU";
   a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="'";a["б"]="b";a["ю"]="yu";

   for (i in word){
     if (word.hasOwnProperty(i)) {
       if (a[word[i]] === undefined){
         answer += word[i];
       } else {
         answer += a[word[i]];
       }
     }
   }
   return answer;
}
});


})(jQuery)
</script>