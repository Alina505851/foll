"use strict";

//  ВХОД



$("#registration__block").hide() //блоки по центру входа скрыты
$("#enter__block").hide()
$("#guest__block").hide()

$("#registration").click(function () {
    // при клике на кнопку ЗАРЕГИСТРИРОВАТЬСЯ выдвигается блок по центру
    $("#enter__block").hide()
    $("#guest__block").hide()
    if ($("#retractable").css("display") == "none") {
        $("#retractable").css("display", "flex")
        $("#entrance").css("animation", "changing_the_size 1s forwards")
        $("#entrance__wrap").css("animation", "changing_the_size_wrap 1s forwards")
        $("#registration__block").show(800)
    } else $("#registration__block").show()
});

$("#enter").click(function () {
    // при клике на кнопку ВХОД выдвигается блок по центру
    $("#guest__block").hide()
    $("#registration__block").hide()
    if ($("#retractable").css("display") == "none") {
        $("#retractable").css("display", "flex")
        $("#entrance").css("animation", "changing_the_size 1s forwards")
        $("#entrance__wrap").css("animation", "changing_the_size_wrap 1s forwards")
        $("#enter__block").show(800)
    } else $("#enter__block").show()
});
$("#vk").click(function () {
    // при клике на кнопку ВКОНТАКТЕ перенаправляется на другую страницу 
});
$("#guest").click(function () {
    // при клике на кнопку ГОСТЬ выдвигается блок по центру
    $("#enter__block").hide();
    $("#registration__block").hide()
    if ($("#retractable").css("display") == "none") {
        $("#retractable").css("display", "flex")
        $("#entrance").css("animation", "changing_the_size 1s forwards")
        $("#entrance__wrap").css("animation", "changing_the_size_wrap 1s forwards")
        $("#guest__block").show(800)
    } else $("#guest__block").show()
});

$("#go_registration").click(function () {
    $("#entrance__wrapper").css("animation", "block_retracted_up 2s forwards")
    $("#entrance__wrap").hide(3000)
    setTimeout(remove_block, 2000)
});

// function remove_block() {
//     // функция отсроченного скрытия блока входа
//     $("#entrance__wrap").css("display", "none")
// }


// $("#reg").click(function () {
//     let lodin_reg = $("#login__reg").val()
//     let password__reg = $("#password__reg").val()
//     let password_2 = $("#password_2").val()
//     $.ajax({
//         url: '/1111.php',
//         type: "POST", //метод отправки
//         dataType: "html", //формат данных
//         data: {
//             'login': lodin_reg,
//             'password__reg': password__reg,
//             'password_2': password_2,
//         },


//         success: function (response) { //Данные отправлены успешно
//             result = $.parseJSON(response);
//             $('#result_form').html('Имя: ' + result.name + '<br>Телефон: ' + result.phonenumber);
//         },
//         error: function (response) { // Данные не отправлены
//             $('#result_form').html('Ошибка. Данные не отправлены.');
//         }
//     });
// });

// $("#reg").click(function () {
//     let lodin_reg = $("#login__reg").val()
//     let password__reg = $("#password__reg").val()
//     let password_2 = $("#password_2").val()


//     $('form').submit(function (e) {
//         e.preventDefault();
//         var data = $('form').serializeArray();
//         $.ajax({
//             type: "POST",
//             url: '1111.php',
//             data: {
//                 'login': lodin_reg,
//                 'password__reg': password__reg,
//                 'password_2': password_2,
//             },
//             success: console.log(1),
//             dataType: "html"
//         });
//     });
// });



