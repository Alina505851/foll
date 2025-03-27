"use strict"

showSea()

function showSea() {
    if (!window.sessionStorage.getItem('done')) {
        sessionStorage.setItem('done', 1);
    }
    if (window.sessionStorage.getItem('done') == 1) {
        $("#rules").hide()
    }
}

//  НАСТРОЙКИ

// ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
$(".shirt").css('background-image', localStorage.getItem(".shirt"))
$("#deck").css('background-image', localStorage.getItem("#deck"))
$("#bito").css('background-image', localStorage.getItem("#bito"))
$("#game_zone").css('background-image', localStorage.getItem("#game_zone"))
$("section").css('background-image', localStorage.getItem("section"))
$(".my_card").css('background-image', localStorage.getItem("cards_face"))
$("#trump").css('background-image', localStorage.getItem("cards_face"))
$(".card_table").css('background-image', localStorage.getItem("cards_face"))




// МЕНЮ
$(".menu_top_wrapper_two .menu_top_wrapper_block_body").hide()
$(".menu_top_wrapper_one .menu_top_wrapper_block_body").hide()
$("#menu").hide()
$(".menu__btn").click(function () {
    if ($("#open-closed").css("display") == "block") {
        $("#menu").show(300)
        $("#open-closed").css("display", "none")
    } else if ($("#open-closed").css("display") == "none") {
        $("#menu").hide(300);
        $("#open-closed").css("display", "block")
    }
})

// открытие и закрытие блоков в меню (НАСТРОЙКИ)
$(".menu_top_wrapper_one .menu_top_wrapper_block_header").click(function () { //верхняя часть
    if ($("#anim_2").css("display") == "block") {
        $(".menu_top_wrapper_two .menu_top_wrapper_block").css("animation", "anim__1__1 1s forwards")
        $(".menu_top_wrapper_two .menu_top_wrapper_block_body").css("animation", "anim__2__2 1s forwards")
        $(".menu_top_wrapper_two").css("animation", "anim__3__3 1s forwards")
        $("#anim_2").css("display", "none")
        $(".menu_top_wrapper_one .menu_top_wrapper_block_body").fadeOut(300)
    }
    if ($("#anim").css("display") == "none") {
        $(".menu_top_wrapper_one .menu_top_wrapper_block").css("animation", "anim__1 1s forwards")
        $(".menu_top_wrapper_one .menu_top_wrapper_block_body").css("animation", "anim__2 1s forwards")
        $(".menu_top_wrapper_one").css("animation", "anim__3 1s forwards")
        $("#anim").css("display", "block")
        $(".menu_top_wrapper_one .menu_top_wrapper_block_body").fadeIn(1000)
        $(".menu_top_wrapper_two .menu_top_wrapper_block_body").fadeOut(300)
    } else {
        $(".menu_top_wrapper_one .menu_top_wrapper_block").css("animation", "anim__1__1 1s forwards")
        $(".menu_top_wrapper_one .menu_top_wrapper_block_body").css("animation", "anim__2__2 1s forwards")
        $(".menu_top_wrapper_one").css("animation", "anim__3__3 1s forwards")
        $("#anim").css("display", "none")
        $(".menu_top_wrapper_one .menu_top_wrapper_block_body").fadeOut(300)
    }
})
$(".menu_top_wrapper_two .menu_top_wrapper_block_header").click(function () { //нижняя часть
    if ($("#anim").css("display") == "block") {
        $(".menu_top_wrapper_one .menu_top_wrapper_block_body").css("animation", "anim__2__2 1s forwards")
        $(".menu_top_wrapper_one .menu_top_wrapper_block").css("animation", "anim__1__1 1s forwards")
        $(".menu_top_wrapper_one").css("animation", "anim__3__3 1s forwards")
        $("#anim").css("display", "none")
        $(".menu_top_wrapper_two .menu_top_wrapper_block_body").fadeOut(300)
    }
    if ($("#anim_2").css("display") == "none") {
        $(".menu_top_wrapper_two .menu_top_wrapper_block").css("animation", "anim__1 1s forwards")
        $(".menu_top_wrapper_two .menu_top_wrapper_block_body").css("animation", "anim__2 1s forwards")
        $(".menu_top_wrapper_two").css("animation", "anim__3 1s forwards")
        $("#anim_2").css("display", "block")
        $(".menu_top_wrapper_two .menu_top_wrapper_block_body").fadeIn(1000)
        $(".menu_top_wrapper_one .menu_top_wrapper_block_body").fadeOut(300)
    } else {
        $(".menu_top_wrapper_two .menu_top_wrapper_block").css("animation", "anim__1__1 1s forwards")
        $(".menu_top_wrapper_two .menu_top_wrapper_block_body").css("animation", "anim__2__2 1s forwards")
        $("#anim_2").css("display", "none")
        $(".menu_top_wrapper_two .menu_top_wrapper_block_body").fadeOut(300)
    }
})
$(".new_game_button").click(function () {
    $("#menu").hide(700)
    $("#rules").hide(200)
    $("#result").hide(200)

    startGame()
})

//  ПРОФИЛЬ

//  ДОСТИЖЕНИЯ

//  РЕЖИМ ИГРЫ
$('input[type=radio][name=complexity]').change(function () {
    if (this.value == '1') { //ПРОСТОЙ
        localStorage.setItem('opponent', 1);
    }
    if (this.value == '2') { //СРЕДНИЙ
        localStorage.setItem('opponent', 2);
    }
    if (this.value == '3') { // СЛОЖНЫЙ
        localStorage.setItem('opponent', 3);
    }

    opponent_difficulty_level() // смена имени и фоток противника


    function opponent_difficulty_level() { // смена имени и фоток противника
        opponent_difficulty = localStorage.getItem('opponent')
        if (opponent_difficulty == 1) {
            // поменять имя и главное фото
            // <div id="opponent__photo">
            $("#opponent__photo").css("background-image", "url(..//img/emotions/simple_3_1.png)")
            $("#opponent__name").empty()
            $("#opponent__name").append("<span>" + "АЛЁША" + "</span>");
        }
        if (opponent_difficulty == 2) {
            $("#opponent__photo").css("background-image", "url(..//img/emotions/medium_1_2.png)")
            $("#opponent__name").empty()
            $("#opponent__name").append("<span>" + "МЕГАМОЗГ" + "</span>");
        }
        if (opponent_difficulty == 3) {
            $("#opponent__photo").css("background-image", "url(..//img/emotions/super_mind.gif)")
            $("#opponent__name").empty()
            $("#opponent__name").append("<span>" + "СВЕРХРАЗУМ" + "</span>");
        }
    }
})


//  СОРТИРОВКА КАРТ
$('input[type=radio][name=sorting]').change(function () {
    if (this.value == '0') {
        sorting = 0
        localStorage.setItem('sorting_loc', 0);
    }
    if (this.value == '1') {
        sorting = 1
        localStorage.setItem('sorting_loc', 1);
    }
    if (this.value == '2') {
        sorting = 2
        localStorage.setItem('sorting_loc', 2);
    }
    if (this.value == '3') {
        sorting = 3
        localStorage.setItem('sorting_loc', 3);
    }
    openingPlayer_hand() // переоткрыть карты игроку
})

//  ДИЗАЙН СТОЛА
$("#design_one").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_standard.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})
$("#design_two").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_2.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})
$("#design_three").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_3.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})
$("#design_four").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_4.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})
$("#design_five").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_5.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})
$("#design_six").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_6.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})
$("#design_seven").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_7.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})
$("#design_eight").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_8.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})
$("#design_nine").click(function () {
    $(".design_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("#game_zone").css("background-image", "url(..//img/table_9.png)")
    table_img = $("#game_zone").css('background-image');
    localStorage.setItem("#game_zone", table_img);
})


//  ФОН
$("#background_one").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_standard.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_two").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_2.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_three").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_3.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_four").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_4.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_five").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_5.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_six").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_6.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_seven").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_7.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_eight").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_8.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_nine").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_9.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_ten").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_10.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_eleven").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_11.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})
$("#background_twelve").click(function () {
    $(".background_body_line .block_mini").css("border", "none")
    $(this).css("border", "3px solid #6743ee")
    $("section").css("background-image", "url(..//img/general_background_12.png)")
    general_background_img = $("section").css('background-image');
    localStorage.setItem("section", general_background_img);
})




//  ЛИЦО КАРТ
$('input[type=radio][name=face]').change(function () {
    if (this.value == '0') {
        $(".my_card").css("background-image", "url(..//img/card_standart_150x100.svg)")
        $("#trump").css("background-image", "url(..//img/card_standart_150x100.svg)")
        $(".card_table").css("background-image", "url(..//img/card_standart_150x100.svg)")
        localStorage.setItem("cards_face", "url(..//img/card_standart_150x100.svg)")
    }
    if (this.value == '1') {
        $(".my_card").css("background-image", "url(..//img/card_1.svg)")
        $("#trump").css("background-image", "url(..//img/card_1.svg)")
        $(".card_table").css("background-image", "url(..//img/card_1.svg)")
        localStorage.setItem("cards_face", "url(..//img/card_1.svg)")
    }
    if (this.value == '2') {
        $(".my_card").css("background-image", "url(..//img/card_2.svg)")
        $("#trump").css("background-image", "url(..//img/card_2.svg)")
        $(".card_table").css("background-image", "url(..//img/card_2.svg)")
        localStorage.setItem("cards_face", "url(..//img/card_2.svg)")
    }
    if (this.value == '3') {
        $(".my_card").css("background-image", "url(..//img/card_3.svg)")
        $("#trump").css("background-image", "url(..//img/card_3.svg)")
        $(".card_table").css("background-image", "url(..//img/card_3.svg)")
        localStorage.setItem("cards_face", "url(..//img/card_3.svg)")
    }
    if (this.value == '4') {
        $(".my_card").css("background-image", "url(..//img/card_4.svg)")
        $("#trump").css("background-image", "url(..//img/card_4.svg)")
        $(".card_table").css("background-image", "url(..//img/card_4.svg)")
        localStorage.setItem("cards_face", "url(..//img/card_4.svg)")
    }
    if (this.value == '5') {
        $(".my_card").css("background-image", "url(..//img/card_5.png)")
        $("#trump").css("background-image", "url(..//img/card_5.png)")
        $(".card_table").css("background-image", "url(..//img/card_5.png)")
        localStorage.setItem("cards_face", "url(..//img/card_5.png)")
    }
})



//  РУБАШКА КАРТ
$('input[type=radio][name=shirt]').change(function () {
    if (this.value == '0') {
        $(".shirt").css("background-image", "url(..//img/shirt_standart.svg)")
        $("#deck").css("background-image", "url(..//img/deck_standart.svg)")
        $("#bito").css("background-image", "url(..//img/bito_standard.svg)")
        shirt_img = $(".shirt").css('background-image');
        localStorage.setItem(".shirt", shirt_img);
        deck_img = $("#deck").css('background-image');
        localStorage.setItem("#deck", deck_img);
        bito_img = $("#bito").css('background-image');
        localStorage.setItem("#bito", bito_img);
    }
    if (this.value == '1') {
        $(".shirt").css("background-image", "url(..//img/shirt_1.svg)")
        $("#deck").css("background-image", "url(..//img/deck_1.svg)")
        $("#bito").css("background-image", "url(..//img/bito_1.svg)")
        shirt_img = $(".shirt").css('background-image');
        localStorage.setItem(".shirt", shirt_img);
        deck_img = $("#deck").css('background-image');
        localStorage.setItem("#deck", deck_img);
        bito_img = $("#bito").css('background-image');
        localStorage.setItem("#bito", bito_img);
    }
    if (this.value == '2') {
        $(".shirt").css("background-image", "url(..//img/shirt_2.svg)")
        $("#deck").css("background-image", "url(..//img/deck_2.svg)")
        $("#bito").css("background-image", "url(..//img/bito_2.svg)")
        shirt_img = $(".shirt").css('background-image');
        localStorage.setItem(".shirt", shirt_img);
        deck_img = $("#deck").css('background-image');
        localStorage.setItem("#deck", deck_img);
        bito_img = $("#bito").css('background-image');
        localStorage.setItem("#bito", bito_img);
    }
    if (this.value == '3') {
        $(".shirt").css("background-image", "url(..//img/shirt_3.svg)")
        $("#deck").css("background-image", "url(..//img/deck_3.svg)")
        $("#bito").css("background-image", "url(..//img/bito_3.svg)")
        shirt_img = $(".shirt").css('background-image');
        localStorage.setItem(".shirt", shirt_img);
        deck_img = $("#deck").css('background-image');
        localStorage.setItem("#deck", deck_img);
        bito_img = $("#bito").css('background-image');
        localStorage.setItem("#bito", bito_img);
    }
    if (this.value == '4') {
        $(".shirt").css("background-image", "url(..//img/shirt_4.svg)")
        $("#deck").css("background-image", "url(..//img/deck_4.svg)")
        $("#bito").css("background-image", "url(..//img/bito_4.svg)")
        shirt_img = $(".shirt").css('background-image');
        localStorage.setItem(".shirt", shirt_img);
        deck_img = $("#deck").css('background-image');
        localStorage.setItem("#deck", deck_img);
        bito_img = $("#bito").css('background-image');
        localStorage.setItem("#bito", bito_img);
    }
    if (this.value == '5') {
        $(".shirt").css("background-image", "url(..//img/shirt_5.svg)")
        $("#deck").css("background-image", "url(..//img/deck_5.svg)")
        $("#bito").css("background-image", "url(..//img/bito_5.svg)")
        shirt_img = $(".shirt").css('background-image');
        localStorage.setItem(".shirt", shirt_img);
        deck_img = $("#deck").css('background-image');
        localStorage.setItem("#deck", deck_img);
        bito_img = $("#bito").css('background-image');
        localStorage.setItem("#bito", bito_img);
    }
})


//  МИКШЕР ЗВУКА
$("#jcp-volume").mousemove(function () {
    sound_put_card.volume = parseFloat(this.value / 10);
    sound_distribution_card_1.volume = parseFloat(this.value / 10);
    sound_distribution_card_2.volume = parseFloat(this.value / 10);
    sound_distribution_card_3.volume = parseFloat(this.value / 10);
    sound_distribution_card_4.volume = parseFloat(this.value / 10);
    sound_distribution_card_5.volume = parseFloat(this.value / 10);
    sound_distribution_card_6.volume = parseFloat(this.value / 10);
    sound_won.volume = parseFloat(this.value / 10);
    sound_lost.volume = parseFloat(this.value / 10);
});



$("#rules_button").click(function () {
    $("#rules").show()
    $("#menu").hide(700)
})

$("#understand_rules_button").click(function () {
    $("#rules").hide(200)
})


$('#result').hide()