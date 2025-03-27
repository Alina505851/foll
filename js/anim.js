"use strict";







$("#bito").click(function () {

    // // отлет карт в бито
    // var length = 0;

    // $('#table .cell').each(function () {
    //     if ($(this).position().top > 0) {
    //         length++
    //     }
    // })
    // // console.log(length);

    // var offsetHeight = document.getElementById('game_zone').offsetHeight;
    // var offsetWidth = document.getElementById('game_zone').clientWidth;

    // let height_shift = (offsetHeight / length) / 2

    // if (length == 1) {
    //     gsap.to(".card_table", {
    //         duration: 2,
    //         x: 850,
    //         opacity: 0
    //     });
    // }

    // if (length == 2) {
    //     let width_shift = (offsetWidth / length) / 2
    //     var tl = gsap.timeline();
    //     gsap.to("#cell_one .card_table", {
    //         duration: 0.5,
    //         x: width_shift - 20
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 0.5,
    //         x: -width_shift + 20
    //     });

    //     gsap.to("#cell_one .card_table", {
    //         duration: 2,
    //         x: 1380,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 2,
    //         x: 1000,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    // }
    // if (length == 3) {
    //     let width_shift = (offsetWidth / length)
    //     gsap.to("#cell_one .card_table", {
    //         duration: 0.5,
    //         x: width_shift - 20
    //     });
    //     gsap.to("#cell_three .card_table", {
    //         duration: 0.5,
    //         x: -width_shift + 20
    //     });

    //     gsap.to("#cell_one .card_table", {
    //         duration: 2,
    //         x: 1300,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 2,
    //         x: 1000,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_three .card_table", {
    //         duration: 2,
    //         x: 700,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    // }
    // if (length == 4) {
    //     let width_shift = (offsetWidth / length)
    //     gsap.to("#cell_one .card_table", {
    //         duration: 0.5,
    //         x: width_shift,
    //         y: height_shift + 10
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 0.5,
    //         y: height_shift - 50
    //     });
    //     gsap.to("#cell_three .card_table", {
    //         duration: 0.5,
    //         x: -width_shift,
    //         y: height_shift + 10
    //     });
    //     gsap.to("#cell_four .card_table", {
    //         duration: 0.5,
    //         y: -height_shift + 50
    //     });

    //     gsap.to("#cell_one .card_table", {
    //         duration: 2,
    //         x: 1300,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 2,
    //         x: 1000,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_three .card_table", {
    //         duration: 2,
    //         x: 700,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_four .card_table", {
    //         duration: 2,
    //         x: 1000,
    //         y: -100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    // }
    // if (length == 5) {
    //     let width_shift = (offsetWidth / 2)
    //     gsap.to("#cell_one .card_table", {
    //         duration: 0.5,
    //         x: width_shift - 100,
    //         y: height_shift + 10
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 0.5,
    //         y: height_shift - 50
    //     });
    //     gsap.to("#cell_three .card_table", {
    //         duration: 0.5,
    //         x: -width_shift + 100,
    //         y: height_shift + 10
    //     });
    //     gsap.to("#cell_four .card_table", {
    //         duration: 0.5,
    //         y: -height_shift - 25,
    //         x: (width_shift / 2) - 40
    //     });
    //     gsap.to("#cell_five .card_table", {
    //         duration: 0.5,
    //         y: -height_shift + 10,
    //         x: (-width_shift / 2) + 50
    //     });

    //     gsap.to("#cell_one .card_table", {
    //         duration: 2,
    //         x: 1300,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 2,
    //         x: 1000,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_three .card_table", {
    //         duration: 2,
    //         x: 700,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_four .card_table", {
    //         duration: 2,
    //         x: 1100,
    //         y: -100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_five .card_table", {
    //         duration: 2,
    //         x: 800,
    //         y: -100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    // }
    // if (length == 6) {
    //     let width_shift = (offsetWidth / 2)
    //     gsap.to("#cell_one .card_table", {
    //         duration: 0.5,
    //         x: width_shift - 100,
    //         y: height_shift + 10
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 0.5,
    //         y: height_shift - 50
    //     });
    //     gsap.to("#cell_three .card_table", {
    //         duration: 0.5,
    //         x: -width_shift + 100,
    //         y: height_shift + 10
    //     });
    //     gsap.to("#cell_four .card_table", {
    //         duration: 0.5,
    //         y: -height_shift - 25,
    //         x: (width_shift / 3) + 120
    //     });
    //     gsap.to("#cell_five .card_table", {
    //         duration: 0.5,
    //         y: -height_shift + 10
    //     });
    //     gsap.to("#cell_six .card_table", {
    //         duration: 0.5,
    //         y: -height_shift - 10,
    //         x: (-width_shift / 3) - 80
    //     });

    //     gsap.to("#cell_one .card_table", {
    //         duration: 2,
    //         x: 1300,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_two .card_table", {
    //         duration: 2,
    //         x: 1000,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_three .card_table", {
    //         duration: 2,
    //         x: 700,
    //         y: 100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_four .card_table", {
    //         duration: 2,
    //         x: 1200,
    //         y: -100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_five .card_table", {
    //         duration: 2,
    //         x: 900,
    //         y: -100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    //     gsap.to("#cell_six .card_table", {
    //         duration: 2,
    //         x: 700,
    //         y: -100,
    //         delay: 0.5,
    //         opacity: 0
    //     });
    // }
});

$("#deck").click(function () {

    // $("#deck .shirt").animate({
    //     left: 100,
    //     top: -100,
    // })
    // $("#deck .shirt").animate({
    //     left: 200,
    //     top: -200,
    // })
    // $("#add_move").css("animation", "add_cards_to_opp 5s forwards")
})

// if (opponent_difficulty == 1) {
//     // алеша
//     // <div id="opponent__photo">
//     document.getElementById("opponent__name").innerHTML = Алёша;
// }
// if (opponent_difficulty == 2) {
//     document.getElementById("opponent__name").innerHTML = Средничек;
// }
// if (opponent_difficulty == 3) {
//     document.getElementById("opponent__name").innerHTML = Умник;
// }