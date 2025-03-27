"use strict"
// запустить загрузку игры сразу же при открытии страницы
window.onload = function () {
    startGame()

}




$("#btn_pass").hide()
$("#btn_bito").hide()
$("#btn_bery").hide()

$("#cell_two").hide()
$("#cell_three").hide()
$("#cell_four").hide()
$("#cell_five").hide()
$("#cell_six").hide()
$("#line_two").hide()


// АУДИО
let sound_distribution_card_1 = new Audio('..//audio/distribution_of_cards.mp3')
let sound_distribution_card_2 = new Audio('..//audio/distribution_of_cards_(2).mp3')
let sound_distribution_card_3 = new Audio('..//audio/distribution_of_cards_(3).mp3')
let sound_distribution_card_4 = new Audio('..//audio/distribution_of_cards_(4).mp3')
let sound_distribution_card_5 = new Audio('..//audio/distribution_of_cards_(5).mp3')
let sound_distribution_card_6 = new Audio('..//audio/distribution_of_cards_(6).mp3')
let sound_put_card = new Audio('..//audio/put_card_on_the_table.mp3')


let sound_won = new Audio('..//audio/game-won.mp3')
let sound_lost = new Audio('..//audio/game-lost.mp3')



let mixСards = [] //размешанная колода созданных карт
let player_hand //карты в руке игрока
let opponent_hand //карты в руке противника
let deck //колода
let bito //бито
let trump //козырная карта
let suitt //маасть козыря
let trumpVal //значение козыря
let whose // чей ход
let won // выйграл ли игрок



let currentThrownCard = [] // текущая кинутая карта
let cellOne = [] //первая ячейка в которую попадаеет карта кинутая на стол 
let cellTwo = [] //вторая ячейка в которую попадаеет карта кинутая на стол 


let table = [] // все кинутые на стол карты
let countOpponentCard = 0 // количество карт которые комп подкинул на стол когда ходиь первый
let countPlayerCard = 0 // количество карт которые  ИГРОК подкинул на стол когда бьется
let matche1 // сюда попадают карты которые компьютер может подложить на стол
let matche2 // сюда попадают карты которые ИГРОК может подложить на стол
let computer_fight_back = [] // массив, в который попадают карты которыми комп может отбиться

let opponent_difficulty // уровень сложности противника
opponent_difficulty_level() // фотка и имя противника 
// let opponent_difficulty = 3    



let face // какое лицо у карт выбрано
let sorting // какая сортировка используется
let general_background_img //ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ ФОНА
let shirt_img //ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ РУБАШКИ КАРТ
let deck_img //ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ РУБАШКИ КОЛОДЫ
let bito_img //ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ РУБАШКИ БИТО
let table_img //ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ СТОЛА
let my_card_img //ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ КАРТ В РУКЕ ИГРОКА
let card_table_img //ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ ДЛЯ КАРТ НА СТОЛЕ





// ПЕРЕМЕННЫЕ СВЕРХРАЗУМА
let supermind_deck // карты из всей колоды которые держит в голове СВЕРХРАЗУМ

let condition = 0 // состояния противника (смена фото и речь)







function startGame() {
    // создание обьекта с картами
    let cards = []
    class Card {
        constructor(val, suit) { // значение, масть
            this.val = val
            this.suit = suit
        }
    }
    class trumppp extends Card {
        constructor(val, suit) { // значение, масть
            super(val, suit)
        }
    }

    for (var i = 0; i < 9; i++) { //черви
        cards[i] = new Card(i + 6, 0)
    }
    for (var i = 9; i < 18; i++) { //буби
        cards[i] = new Card(i - 3, 1)
    }
    for (var i = 18; i < 27; i++) { //крести 
        cards[i] = new Card(i - 12, 2)
    }
    for (var i = 27; i < 36; i++) { //пики
        cards[i] = new Card(i - 21, 3)
    }


    //  РАЗМЕШИВАЕМ КАРТЫ
    for (var i = 0; i < 36; i++) {
        mixСards[i] = cards.splice(Math.floor(Math.random() * cards.length), 1)[0]
    }



    supermind_deck = mixСards.slice(0) // колода сверхразума в уме


    trump = mixСards.splice(0, 1) // козырная карта
    suitt = trump[0].suit // узнаем масть козыря
    trumpVal = trump[0].val // узнаем номинал козырной карты
    trump = new trumppp(trump[0].val, trump[0].suit) // козырную карту делаем козырем


    for (var i = 0; i < 35; i++) {
        if (mixСards[i].suit === suitt) {
            mixСards[i] = new trumppp(mixСards[i].val, mixСards[i].suit) // все козырные карты делаем козырями
        }
    }


    opponent_hand = mixСards.splice(0, 6) // карты в руке оппонента
    player_hand = mixСards.splice(0, 6) // карты в руке игрока
    deck = mixСards.splice(0, 23) // оставшаяся колода


    // supermind_deck = supermind_deck.filter(e => !~opponent_hand.indexOf(e))


    const result = supermind_deck.filter(x => !opponent_hand.some(y => x.val === y.val && x.suit === y.suit))
    // console.log(result)


    // for (var i = 0; i < supermind_deck; i++) {
    //     if(supermind_deck[i].val == opponent_hand[0].val && supermind_deck[i].suit == opponent_hand[0].val){

    //     }
    // }
    // console.log(supermind_deck)

    // console.log("козырь")
    // console.log(trump)
    console.log("карты в руке компа")
    console.log(opponent_hand)
    // console.log("карты в руке игрока")
    // console.log(player_hand)
    // console.log("колода")
    // console.log(deck)

    // косметическая очистка
    hide_buttons_and_cells()
    $("#game_zone .card_table").detach() // убрать все карты со стола

    // очистка переменных
    table = [] // все кинутые на стол карты
    countOpponentCard = 0 // количество карт которые комп подкинул на стол когда ходиь первый
    countPlayerCard = 0 // количество карт которые  ИГРОК подкинул на стол когда бьется
    currentThrownCard = [] // текущая кинутая карта
    cellOne = [] //первая ячейка в которую попадаеет карта кинутая на стол 
    cellTwo = [] //вторая ячейка в которую попадаеет карта кинутая на стол 
    condition = 0 // состояния противника (смена фото и речь)
    // player_takes = false

    function arrayMin(player_hand) { // вычисляем наименьшую козрную карту игрока
        return player_hand.reduce(function (p, v) {
            return (p.suit == suitt ? p : v) // если да, то принимает условие 1, если нет то 2
        })
    }

    function arrayMin2(opponent_hand) { // вычисляем наименьшую козрную карту противника
        return opponent_hand.reduce(function (p, v) {
            return (p.suit == suitt ? p : v)
        })
    }

    let minPlayerTrump = arrayMin(player_hand) //минимальная козырная (или нет) карта ИГРОКА
    let minOpponentTrump = arrayMin2(opponent_hand) //минимальная козырная (или нет) карта ПРОТИВНИКА
    openingTrump() //открытие козырной карты
    openingPlayer_hand()
    firstStep() //выясняем кто ходит первый
    function firstStep() { //кто ходит первый
        if (minPlayerTrump.suit != minOpponentTrump.suit) { //если масти минимальной карты не равны 
            if (minPlayerTrump.suit != suitt && minOpponentTrump.suit != suitt) {
                startGame()
            }
            if (minPlayerTrump.suit != suitt) {
                return false
            }
            if (minOpponentTrump.suit != suitt) {
                return true
            }
        } else if (minPlayerTrump.suit == minOpponentTrump.suit && minPlayerTrump.val < minOpponentTrump.val) {
            return true
        } else if (minPlayerTrump.suit == minOpponentTrump.suit && minPlayerTrump.val > minOpponentTrump.val) {
            return false
        }
    }
    whose = firstStep()
    green_red() //поменять цвет тому кто ходит
    // algorithm()
    setTimeout(algorithm_delay, 2000);
}

function algorithm_delay() {
    algorithm()

}

setTimeout(algorithm_delay, 7000);



function update() {
    $.get("achievements.php", function (data) {
        console.log(data)
        // $("#result").html(data);
        // $("#jjjjj").load('user.php?wins_alesha=wins_alesha');
        window.setTimeout(update, 3000);
        $("#kkkkkkkk").html("<?php echo $_SESSION['user']['wins_alesha'];?>");
    });
}
// update()

function algorithm() {

    // $('#result').show(); //  показать блок с результатами
    // // $('.result_title').text("Поражение!")
    // // конфети открываются
    // $("#confetti_left").fadeIn(800);
    // $("#confetti_right").fadeIn(800);
    // // конфети закрываются
    // $("#confetti_right").fadeOut(4000);
    // $("#confetti_left").fadeOut(4000);

    $('#result').show()
    won = 1
    $.ajax({ // добавляем в бд результаты матча 
        url: '/after_the_game.php',
        method: 'post',
        dataType: 'html',
        data: {
            won: won,
            opponent_difficulty: opponent_difficulty
        },
        success: function (data) {
            if (won == 1) {
                if (opponent_difficulty == 1) {
                    console.log("побдил алешку")
                }
                if (opponent_difficulty == 2) {
                    console.log("побдил мегамозга")

                }
                if (opponent_difficulty == 3) {
                    console.log("побдил сверхразум")
                }
            }
            if (won == 0) {
                if (opponent_difficulty == 1) {
                    console.log("проиграл алешку")
                }
                if (opponent_difficulty == 2) {
                    console.log("проиграл мегамозга")

                }
                if (opponent_difficulty == 3) {
                    console.log("проиграл сверхразум")
                }
            }





            // $(".tab_1 tr").append("<td>" + data[0] + " </td>");
            // $(".tab_1 tr").append("<td>" + data[1] + " </td>");
            // });
        }
    })

    if (trump.length == 0) {
        if (opponent_hand.length == 0 && player_hand.length != 0) {
            condition = 6
            get_speech()
            sound_lost.play()
            $('#result').show()
            won = 0
            $.ajax({ // добавляем в бд результаты матча 
                url: '/after_the_game.php',
                method: 'post',
                dataType: 'html',
                data: {
                    won: won,
                    opponent_difficulty: opponent_difficulty
                },
                success: function (data) {

                }
            });
            // alert("выйграл комп")
            $('.result_title').text("Поражение!")
        }
        if (player_hand.length == 0 && opponent_hand.length != 0) {
            condition = 5
            get_speech()
            sound_won.play()
            $('#result').show()
            // won = 1
            // $.ajax({ // добавляем в бд результаты матча 
            //     url: '/after_the_game.php',
            //     method: 'post',
            //     dataType: 'html',
            //     data: {
            //         won: won,
            //         opponent_difficulty: opponent_difficulty
            //     },
            //     success: (data) => {
            //         let json = JSON.parse(data);
            //         json.forEach(element => {
            //             // console.log(element['name']);
            //             // console.log(element['price']);
            //             // <tr>
            //             //     <td>Поражений АЛЕША</td>
            //             //     <td>Поражений МЕГАМОЗГ</td>
            //             //     <td>Поражений СВЕРХРАЗУМ</td>
            //             //   </tr>
            //             $(".tab_1 tr").append("<td>" + element['defeats_supermind'] + " </td>");
            //         });
            //     }
            // })
            // alert("выйграл игрок")
            $('.result_title').text("Победа!")
        }
    }

    if (whose == true) { // игрок
        playerMove()
    }
    if (whose == false) { // комп
        if (opponent_difficulty == 1) {
            computerMove_level_1()
        }
        if (opponent_difficulty == 2) {
            computerMove_level_2()
        }
        if (opponent_difficulty == 3) {
            computerMove_level_3()
        }
    }







    function computerMove_level_1() { // АЛЁША
        $('#hand__player .my_card').removeClass('move')
        if (table.length === 0 && countOpponentCard === 0) { // если еще не кинули на стол карту
            if ((condition != 22) && (condition != 12)) { // менять если не первый ход
                condition = 1
                get_speech()
            }
            // подкидываем первую карту на стол РАНДОМНО
            function arrayRandElement(opponent_hand) { // выбираем рандомную карту из массива
                var rand = Math.floor(Math.random() * opponent_hand.length)
                return opponent_hand[rand]
            }
            let randomEl // рандомный элемент из руки компа которым он походит
            randomEl = arrayRandElement(opponent_hand)
            cellOne = randomEl // добавляем в первую ячейку этот элемент
            cellTwo = undefined
            countOpponentCard++ // счетчик кинутых компом на стол карт
            let indexRandomEl = opponent_hand.indexOf(randomEl)
            if (indexRandomEl > -1) {
                opponent_hand.splice(indexRandomEl, 1) // удаляем из руки карту которую кинули на стол
            }
            $('.shirt').eq(0).remove()
            rearrangingCards_copm()
            sound_put_card.play()
            cellAppend() //добавляем карту в нужную ячейку
            opening_cards_on_table_cellONE() //открываем карты
            stepInGames() //записываем итерацию
        }
        if (countOpponentCard == countPlayerCard) {
            $("#btn_pass").hide()
        }
        if (table.length != 0 && countOpponentCard > countPlayerCard) { // комп кинул карту а игрок ее не отбил
            $('#hand__player').on('click', '.my_card', function () {
                if (whose === false && table.length != 0 && countOpponentCard > countPlayerCard) {
                    if ($(this).hasClass('hint')) {
                        player_throws_cards_on_the_table($(this));
                    }
                }
            })
        }
        // if (table.length != 0 && countPlayerCard > 0 && player_takes == true) { //попытка сделать чтобы комп докидывал карты после бито
        //     if (matche1 != '') {
        //         alert("Комп ДОЛЖЕН СЕЙЧАС докинуть еще!! Инфа из хода компа")
        //         for (var i = 0; i < opponent_hand.length; i++) {
        //             if (opponent_hand[i] == matche1[0]) {
        //                 let j = table.length
        //                 cellOne = opponent_hand[i]
        //                 opponent_hand.splice([i], 1) // удаляем из руки карту которую кинули на стол
        //                 table[j] = cellOne
        //                 console.log(opponent_hand)
        //                 console.log(table)
        //                 cellTwo = undefined
        //                 player_takes == false
        //                 countOpponentCard++
        //                 return
        //             }
        //         }
        //         if (cellOne != '') {
        //             cellAppend()
        //             showCells()
        //             cellOne = undefined
        //         }

        //         stepInGames()
        //     }
        // }
        if (table.length != 0 && countOpponentCard == countPlayerCard && countOpponentCard < 6) { // если игрок уже отбился и комп кинул меньше 6 карт на стол
            if (matche1.length != 0) {
                // alert("продолжаем этот ход")
                if (countOpponentCard == 3) {
                    condition = 10
                    get_speech()
                }
                for (var i = 0; i < opponent_hand.length; i++) {
                    if (opponent_hand[i] == matche1[0]) {
                        cellOne = opponent_hand[i] // переназначить
                        opponent_hand.splice([i], 1) // удаляем из руки карту которую кинули на стол
                        $('.shirt').eq(0).remove()
                        rearrangingCards_copm()
                        sound_put_card.play()
                        cellTwo = undefined // обнулить 
                        countOpponentCard++
                    }
                }
                cellAppend()
                showCells()
                stepInGames()
                // if (matche1.length != 0) {
                //     alert("Комп еще имеет карты коtрые может докинуть")
                // }
            }
            if (matche1.length === 0) { //  нечего больше ему подкинуть
                if (condition != 13) {
                    condition = 13
                    get_speech()
                }
                // alert("нечего подкинуть значит надо в бито 1")
                setTimeout(send_everything_to_bito, 1000) //  анимация ухода карт со стола в бито 
                // whose = true
                setTimeout(comp_said_bito, 3000) // очистка массивов
            }
        }
        if (countOpponentCard == 6 && countOpponentCard == countPlayerCard) { // если комп уже кинул больше 6 карт 
            // alert("можно отправлять все в бито 2")
            if (condition != 13) {
                condition = 13
                get_speech()
            }
            setTimeout(send_everything_to_bito, 1000); //  анимация ухода карт со стола в бито 
            // whose = true
            setTimeout(comp_said_bito, 3000); // очистка массивов
        }
    }








    function comp_said_bito() {
        send_everything_to_bito()
        let b = table.length
        bito = table.splice(0, b)
        table = []
        console.log("бито:")
        console.log(bito)
        $("#hand__player .my_card").removeClass('hint')
        setTimeout(function () {
            $("#game_zone .card_table").detach()
            hide_buttons_and_cells()
            add_cards()
            whose = true
        }, 2000);
        countOpponentCard = 0
        countPlayerCard = 0
        cellOne = undefined
        cellTwo = undefined
        // дать задержку
        setTimeout(stroke_transmission_delay, 3000);
    }



    function player_throws_cards_on_the_table(thisObj) { // ходит комп а игрок отбивается (кладет карту)
        thisObj.removeClass('hint')
        let index = thisObj.index()
        currentThrownCard = player_hand.splice(index, 1) // добавляем на стол элемент соответсвующий номеру 
        cellTwo = currentThrownCard[0]
        if (countPlayerCard == 0) {
            thisObj.detach().appendTo("#cell_one").removeClass('my_card').addClass('card_table').removeAttr("style")
            let $cell_one_reverse_annim = $('#cell_one .card_table').eq(1)
            gsap.from($cell_one_reverse_annim, {
                y: 500,
                x: 20,
                opacity: 0,
                duration: 1
            })
            sound_put_card.play()
        }
        if (countPlayerCard == 1) {
            thisObj.detach().appendTo("#cell_two").removeClass('my_card').addClass('card_table').removeAttr("style")
            let $cell_two_reverse_annim = $('#cell_two .card_table').eq(1)
            gsap.from($cell_two_reverse_annim, {
                y: 500,
                x: -80,
                opacity: 0,
                duration: 1
            })
            sound_put_card.play()
        }
        if (countPlayerCard == 2) {
            thisObj.detach().appendTo("#cell_three").removeClass('my_card').addClass('card_table').removeAttr("style")
            let $cell_three_reverse_annim = $('#cell_three .card_table').eq(1)
            gsap.from($cell_three_reverse_annim, {
                y: 500,
                x: -130,
                opacity: 0,
                duration: 1
            })
            sound_put_card.play()
        }
        if (countPlayerCard == 3) {
            thisObj.detach().appendTo("#cell_four").removeClass('my_card').addClass('card_table').removeAttr("style")
            let $cell_four_reverse_annim = $('#cell_four .card_table').eq(1)
            gsap.from($cell_four_reverse_annim, {
                y: 500,
                x: 80,
                opacity: 0,
                duration: 1
            })
            sound_put_card.play()
        }
        if (countPlayerCard == 4) {
            thisObj.detach().appendTo("#cell_five").removeClass('my_card').addClass('card_table').removeAttr("style")
            let $cell_five_reverse_annim = $('#cell_five .card_table').eq(1)
            gsap.from($cell_five_reverse_annim, {
                y: 500,
                x: 80,
                opacity: 0,
                duration: 1
            })
            sound_put_card.play()
        }
        if (countPlayerCard == 5) {
            thisObj.detach().appendTo("#cell_six").removeClass('my_card').addClass('card_table').removeAttr("style")
            let $cell_six_reverse_annim = $('#cell_six .card_table').eq(1)
            gsap.from($cell_six_reverse_annim, {
                y: 500,
                x: -80,
                opacity: 0,
                duration: 1
            })
            sound_put_card.play()
        }
        $(".my_card").css('background-image', localStorage.getItem("cards_face"))
        $("#trump").css('background-image', localStorage.getItem("cards_face"))
        $(".card_table").css('background-image', localStorage.getItem("cards_face"))
        openingPlayer_hand()
        rearrangingCards()
        countPlayerCard++
        stepInGames()
        computerMove_level_1()
        algorithm()
    }







    function computerMove_level_2() { //  МЕГАМОЗГ
        $('#hand__player .my_card').removeClass('move')
        if (table.length === 0 && countOpponentCard === 0) {
            if ((condition != 22) && (condition != 12)) { // менять если не первый ход
                condition = 1
                get_speech()
            }
            sortOpponent(opponent_hand) // отсортировать карты от меньших к большим 
            // подкидываем первую карту на стол НАИМЕНЬШУЮ
            cellOne = opponent_hand[0] // добавляем в первую ячейку этот элемент
            opponent_hand.splice(0, 1)
            cellTwo = undefined
            countOpponentCard++ // счетчик кинутых компом на стол карт
            $('.shirt').eq(0).remove()
            rearrangingCards_copm()
            sound_put_card.play()
            cellAppend() //добавляем карту в нужную ячейку
            opening_cards_on_table_cellONE() //открываем карты
            stepInGames() //записываем итерацию
        }
        if (countOpponentCard == countPlayerCard) {
            $("#btn_pass").hide()
        }
        if (table.length != 0 && countOpponentCard > countPlayerCard) { // комп кинул карту а игрок ее не отбил
            $('#hand__player').on('click', '.my_card', function () {
                if (whose === false && table.length != 0 && countOpponentCard > countPlayerCard) {
                    if ($(this).hasClass('hint')) {
                        // alert("Ходит комп а я бьюсь этой картой")
                        player_throws_cards_on_the_table($(this));
                    }
                }
            })
        }
        if (table.length != 0 && countOpponentCard == countPlayerCard && countOpponentCard < 6) { // если игрок уже отбился и комп кинул меньше 6 карт на стол
            if (matche1.length != 0) {
                // alert("продолжаем этот ход")
                for (var i = 0; i < opponent_hand.length; i++) {
                    if (opponent_hand[i] == matche1[0]) {
                        if (opponent_hand[i].suit == suitt && deck.length > 6) { // если может подкинуть козырь но карт в колоде больше 6, то не будет
                            condition = 15
                            get_speech()
                            matche1 = ''
                            // return
                        }
                        if (opponent_hand[i].suit != suitt || opponent_hand[i].suit == suitt && deck.length < 6) {
                            if (countOpponentCard == 3) {
                                condition = 10
                                get_speech()
                            }
                            cellOne = opponent_hand[i] // переназначить
                            opponent_hand.splice([i], 1) // удаляем из руки карту которую кинули на стол
                            $('.shirt').eq(0).remove()
                            rearrangingCards_copm()
                            sound_put_card.play()
                            cellTwo = undefined // обнулить 
                            countOpponentCard++
                        }
                        cellAppend()
                        showCells()
                        stepInGames()
                    }
                }
            }
            if (matche1.length === 0) { //  нечего больше ему подкинуть
                if (condition != 13 && condition != 15) {
                    condition = 13
                    get_speech()
                }

                // alert("нечего подкинуть значит надо в бито 1")
                setTimeout(send_everything_to_bito, 1000); //  анимация ухода карт со стола в бито 
                // whose = true
                setTimeout(comp_said_bito, 3000); // очистка массивов
            }
        }
        if (countOpponentCard == 6 && countOpponentCard == countPlayerCard) { // если комп уже кинул больше 6 карт 
            // alert("можно отправлять все в бито 2")
            if (condition != 13) {
                condition = 13
                get_speech()
            }
            setTimeout(send_everything_to_bito, 1000); //  анимация ухода карт со стола в бито 
            // whose = true
            setTimeout(comp_said_bito, 3000); // очистка массивов
        }
    }


    let supermind_table // на столе
    let supermind_player_definitely // точно есть у игрока
    let supermind_player_maybe // возможно  есть у игрока

    let supermind_bito // бито 


    // let supermind_deck // карты из всей колоды которые держит в голове СВЕРХРАЗУМ

    // supermind_deck = deck.slice(0)



    // supermind_deck = [...array1, ...array2]
    // supermind_deck = supermind_deck.filter(function (el) {
    //     return !opponent_hand.includes(el)
    // })

    supermind_deck = supermind_deck.filter(e => !~opponent_hand.indexOf(e))
    // console.log(supermind_deck)
    // if (supermind_player_definitely.length == player_hand.length) {




    // for (var i = 0; i < opponent_hand.length; i++) { // перебираем все карты в руке компа
    //     let card_being_checked = opponent_hand[i] // карта которую проверяем сейчас
    //     for (var i = 0; i < player_hand.length; i++) {
    //         if (card_being_checked.suit === player_hand[i].suit && player_hand[i].val > card_being_checked.val || player_hand[i].suit === suitt && card_being_checked.suit != suitt || card_being_checked.suit === suitt && player_hand[i].suit === suitt && card_being_checked.val < player_hand[i].val) {
    //             // массив которым могут отбить 
    //             let mass = []
    //             mass = opponent_hand[i]
    //             console.log(mass)
    //         }
    //     }
    // }
    // }








    function computerMove_level_3() { // СВЕРХРАЗУМ
        $('#hand__player .my_card').removeClass('move')
        if (table.length === 0 && countOpponentCard === 0) { // если еще не кинули на стол карту
            if ((condition != 22) && (condition != 12)) { // менять если не первый ход
                condition = 1
                get_speech()
            }
            sortOpponent(opponent_hand) // отсортировать карты от меньших к большим 
            // подкидываем первую карту на стол НАИМЕНЬШУЮ


            // сюда вставить проверку карт которые точно есть у игрока 
            cellOne = opponent_hand[0] // добавляем в первую ячейку этот элемент
            opponent_hand.splice(0, 1)
            cellTwo = undefined
            countOpponentCard++ // счетчик кинутых компом на стол карт
        }
        $('.shirt').eq(0).remove()
        rearrangingCards_copm()
        sound_put_card.play()
        cellAppend() //добавляем карту в нужную ячейку
        opening_cards_on_table_cellONE() //открываем карты
        stepInGames() //записываем итерацию
        if (countOpponentCard == countPlayerCard) {
            $("#btn_pass").hide()
        }
        if (table.length != 0 && countOpponentCard > countPlayerCard) { // комп кинул карту а игрок ее не отбил
            $('#hand__player').on('click', '.my_card', function () {
                if (whose === false && table.length != 0 && countOpponentCard > countPlayerCard) {
                    if ($(this).hasClass('hint')) {
                        // alert("Ходит комп а я бьюсь этой картой")
                        player_throws_cards_on_the_table($(this));
                    }
                }
            })
        }
        if (table.length != 0 && countOpponentCard == countPlayerCard && countOpponentCard < 6) { // если игрок уже отбился и комп кинул меньше 6 карт на стол
            if (matche1.length != 0) {
                // alert("продолжаем этот ход")
                for (var i = 0; i < opponent_hand.length; i++) {
                    if (opponent_hand[i] == matche1[0]) {
                        // if (opponent_hand[i].suit == suitt && deck.length > 6) { // если может подкинуть козырь но карт в колоде больше 6, то не будет
                        //     condition = 15
                        //     get_speech()
                        //     matche1 = ''
                        // }
                        if (opponent_hand[i].suit != suitt || opponent_hand[i].suit == suitt && deck.length < 6) {
                            if (countOpponentCard == 3) {
                                condition = 10
                                get_speech()
                            }
                            cellOne = opponent_hand[i] // переназначить
                            opponent_hand.splice([i], 1) // удаляем из руки карту которую кинули на стол
                            $('.shirt').eq(0).remove()
                            rearrangingCards_copm()
                            sound_put_card.play()
                            cellTwo = undefined // обнулить 
                            countOpponentCard++
                        }
                        cellAppend()
                        showCells()
                        stepInGames()
                    }
                }
            }
            if (matche1.length === 0) { //  нечего больше ему подкинуть
                if (condition != 13 && condition != 15) {
                    condition = 13
                    get_speech()
                }
                // alert("нечего подкинуть значит надо в бито 1")
                setTimeout(send_everything_to_bito, 1000); //  анимация ухода карт со стола в бито 
                whose = true
                setTimeout(comp_said_bito, 3000); // очистка массивов
            }
        }
        if (countOpponentCard == 6 && countOpponentCard == countPlayerCard) { // если комп уже кинул больше 6 карт 
            // alert("можно отправлять все в бито 2")
            if (condition != 13) {
                condition = 13
                get_speech()
            }
            setTimeout(send_everything_to_bito, 1000); //  анимация ухода карт со стола в бито 
            whose = true
            setTimeout(comp_said_bito, 3000); // очистка массивов
        }
    }



























































    // function computerMove() { // СТАРЫЙ ВАРИАНТ
    //     $('#hand__player .my_card').removeClass('move')
    //     if (table.length === 0 && countOpponentCard === 0) { // если еще не кинули на стол карту
    //         if (opponent_difficulty == 1) { // простой алгоритм
    //             // подкидываем первую карту на стол РАНДОМНО
    //             function arrayRandElement(opponent_hand) { // выбираем рандомную карту из массива
    //                 var rand = Math.floor(Math.random() * opponent_hand.length)
    //                 return opponent_hand[rand]
    //             }
    //             let randomEl // рандомный элемент из руки компа которым он походит
    //             randomEl = arrayRandElement(opponent_hand)
    //             cellOne = randomEl // добавляем в первую ячейку этот элемент
    //             cellTwo = undefined
    //             countOpponentCard++ // счетчик кинутых компом на стол карт
    //             let indexRandomEl = opponent_hand.indexOf(randomEl)
    //             if (indexRandomEl > -1) {
    //                 opponent_hand.splice(indexRandomEl, 1) // удаляем из руки карту которую кинули на стол
    //             }
    //         }
    //         if (opponent_difficulty == 2) { //средний алгорим
    //             sortOpponent(opponent_hand) // отсортировать карты от меньших к большим 
    //             // подкидываем первую карту на стол НАИМЕНЬШУЮ
    //             cellOne = opponent_hand[0] // добавляем в первую ячейку этот элемент
    //             opponent_hand.splice(0, 1)
    //             cellTwo = undefined
    //             countOpponentCard++ // счетчик кинутых компом на стол карт
    //         }
    //         if (opponent_difficulty == 3) { //средний алгорим
    //             sortOpponent(opponent_hand) // отсортировать карты от меньших к большим 
    //             // подкидываем первую карту на стол НАИМЕНЬШУЮ
    //             cellOne = opponent_hand[0] // добавляем в первую ячейку этот элемент
    //             opponent_hand.splice(0, 1)
    //             cellTwo = undefined
    //             countOpponentCard++ // счетчик кинутых компом на стол карт
    //         }
    //         cellAppend() //добавляем карту в нужную ячейку
    //         opening_cards_on_table_cellONE() //открываем карты
    //         stepInGames() //записываем итерацию
    //     }
    //     if (countOpponentCard == countPlayerCard) {
    //         $("#btn_pass").hide()
    //     }
    //     if (table.length != 0 && countOpponentCard > countPlayerCard) { // комп кинул карту а игрок ее не отбил
    //         $('#hand__player').on('click', '.my_card', function () {
    //             if (whose === false && table.length != 0 && countOpponentCard > countPlayerCard) {
    //                 if ($(this).hasClass('hint')) {
    //                     // alert("Ходит комп а я бьюсь этой картой")
    //                     $(this).removeClass('hint')
    //                     let index = $(this).index()
    //                     currentThrownCard = player_hand.splice(index, 1) // добавляем на стол элемент соответсвующий номеру 
    //                     cellTwo = currentThrownCard[0]
    //                     if (countPlayerCard == 0) {
    //                         $(this).detach().appendTo("#cell_one")
    //                     }
    //                     if (countPlayerCard == 1) {
    //                         $(this).detach().appendTo("#cell_two")
    //                     }
    //                     if (countPlayerCard == 2) {
    //                         $(this).detach().appendTo("#cell_three")
    //                     }
    //                     if (countPlayerCard == 3) {
    //                         $(this).detach().appendTo("#cell_four")
    //                     }
    //                     if (countPlayerCard == 4) {
    //                         $(this).detach().appendTo("#cell_five")
    //                     }
    //                     if (countPlayerCard == 5) {
    //                         $(this).detach().appendTo("#cell_six")
    //                     }
    //                     $(this).removeClass('my_card').addClass('card_table').removeAttr("style")
    //                     openingPlayer_hand()
    //                     rearrangingCards()
    //                     countPlayerCard++
    //                     stepInGames()
    //                     computerMove()
    //                     algorithm()
    //                 }
    //             }
    //         })
    //     }
    //     if (table.length != 0 && countOpponentCard == countPlayerCard && countOpponentCard < 6) { // если игрок уже отбился и комп кинул меньше 6 карт на стол
    //         if (matche1.length != 0) {
    //             // alert("продолжаем этот ход")
    //             for (var i = 0; i < opponent_hand.length; i++) {
    //                 if (opponent_hand[i] == matche1[0]) {
    //                     if (opponent_difficulty == 1) { // ПРОСТОЙ
    //                         cellOne = opponent_hand[i] // переназначить
    //                         opponent_hand.splice([i], 1) // удаляем из руки карту которую кинули на стол
    //                         console.log(cellOne)
    //                         console.log(opponent_hand)
    //                         console.log(matche1)
    //                         cellTwo = undefined // обнулить 
    //                         countOpponentCard++
    //                     }
    //                     if (opponent_difficulty == 2) { // СРЕДНИЙ
    //                         if (opponent_hand[i].suit == suitt) { // если может подкинуть козырь, то не будет
    //                             matche1 = ''
    //                             return
    //                         }
    //                         if (opponent_hand[i].suit != suitt) {
    //                             cellOne = opponent_hand[i] // переназначить
    //                             opponent_hand.splice([i], 1) // удаляем из руки карту которую кинули на стол
    //                             console.log(cellOne)
    //                             console.log(opponent_hand)
    //                             console.log(matche1)
    //                             cellTwo = undefined // обнулить 
    //                             countOpponentCard++
    //                         }
    //                     }
    //                     // if (opponent_difficulty == 3) { // СЛОЖНЫЙ

    //                     // }
    //                     cellAppend()
    //                     showCells()
    //                     stepInGames()
    //                 }
    //             }
    //         }
    //         if (matche1.length === 0) { //  нечего больше ему подкинуть
    //             alert("нечего подкинуть значит надо в бито 1")
    //             // pass_move === 1
    //             let b = table.length
    //             bito = table.splice(0, b)
    //             table = []
    //             console.log("бито:")
    //             console.log(bito)
    //             $("#hand__player .my_card").removeClass('hint')
    //             $("#game_zone .card_table").detach()
    //             add_cards()
    //             $("#btn_pass").hide()
    //             $("#btn_bito").hide()
    //             $("#btn_bery").hide()
    //             // скрыть все ячейки
    //             $("#cell_two").hide()
    //             $("#cell_three").hide()
    //             $("#cell_four").hide()
    //             $("#cell_five").hide()
    //             $("#cell_six").hide()
    //             $("#line_two").hide()
    //             countOpponentCard = 0
    //             countPlayerCard = 0
    //             whose = true
    //             cellOne = undefined
    //             cellTwo = undefined
    //             green_red()
    //             stepInGames()
    //             algorithm()
    //         }
    //     }
    //     if (countOpponentCard == 6 && countOpponentCard == countPlayerCard) { // если комп уже кинул больше 6 карт 
    //         alert("можно отправлять все в бито 2")
    //         let b = table.length
    //         bito = table.splice(0, b)
    //         table = []
    //         $("#game_zone .card_table").detach()
    //         add_cards()
    //         $("#btn_pass").hide()
    //         $("#btn_bito").hide()
    //         $("#btn_bery").hide()
    //         // скрыть все ячейки
    //         $("#cell_two").hide()
    //         $("#cell_three").hide()
    //         $("#cell_four").hide()
    //         $("#cell_five").hide()
    //         $("#cell_six").hide()
    //         $("#line_two").hide()
    //         countOpponentCard = 0
    //         countPlayerCard = 0
    //         cellOne = undefined
    //         cellTwo = undefined
    //         // передать ход
    //         whose = true
    //         green_red()
    //         algorithm()
    //     }
    // }

    function computerResponse() {
        if (computer_fight_back.length === 0 && cellOne != undefined) {
            // alert("Компу нечем отбиться, он будет брать")
            if (condition != 11) {
                condition = 4
                get_speech()
            }
            $("#btn_bito").hide()
            $("#btn_pass").show()
            if (matche2.length != 0) {
                $('#hand__player').on('click', '.my_card', function () {
                    if (whose == true && computer_fight_back.length === 0) {
                        // alert("ходит игрок и компу нечем отбиться а мне еще есть что докинуть")
                        if ($(this).hasClass('hint')) {
                            $(this).removeClass('hint')
                            let index = $(this).index()
                            currentThrownCard = player_hand.splice(index, 1) // добавляем на стол элемент соответсвующий номеру 
                            let i = table.length
                            table[i] = currentThrownCard[0]
                            showCells()
                            if (countPlayerCard == 1) {
                                $(this).detach().appendTo("#cell_two").removeClass('my_card').addClass('card_table').removeAttr("style")
                                let $cell_two_reverse_annim = $('#cell_two .card_table').eq(0)
                                gsap.from($cell_two_reverse_annim, {
                                    y: 500,
                                    x: -80,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            if (countPlayerCard == 2) {
                                $(this).detach().appendTo("#cell_three").removeClass('my_card').addClass('card_table').removeAttr("style")
                                let $cell_three_reverse_annim = $('#cell_three .card_table').eq(0)
                                gsap.from($cell_three_reverse_annim, {
                                    y: 500,
                                    x: -130,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            if (countPlayerCard == 3) {
                                $(this).detach().appendTo("#cell_four").removeClass('my_card').addClass('card_table').removeAttr("style")
                                let $cell_four_reverse_annim = $('#cell_four .card_table').eq(0)
                                gsap.from($cell_four_reverse_annim, {
                                    y: 500,
                                    x: 80,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            if (countPlayerCard == 4) {
                                $(this).detach().appendTo("#cell_five").removeClass('my_card').addClass('card_table').removeAttr("style")
                                let $cell_five_reverse_annim = $('#cell_five .card_table').eq(0)
                                gsap.from($cell_five_reverse_annim, {
                                    y: 500,
                                    x: 80,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            if (countPlayerCard == 5) {
                                $(this).detach().appendTo("#cell_six").removeClass('my_card').addClass('card_table').removeAttr("style")
                                let $cell_six_reverse_annim = $('#cell_six .card_table').eq(0)
                                gsap.from($cell_six_reverse_annim, {
                                    y: 500,
                                    x: -80,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
                            // $(this).removeClass('my_card').addClass('card_table').removeAttr("style")
                            openingPlayer_hand()
                            rearrangingCards()
                            countPlayerCard++
                            console.log(table)
                        }
                    }
                })
            }
            $("#btn_pass").click(function () { // комп забирает карты
                $(".my_card").removeClass('hint')
                // вставить анимацию загреба карт компом
                send_everything_to_comp()


                setTimeout(function () {
                    $("#game_zone .card_table").detach() // убрать все карты со стола 
                    hide_buttons_and_cells()
                }, 2000);


                for (var i = 0; i < table.length; i++) { // добавить в руку компу карты 
                    $(".opponent_hand").append('<div class ="shirt"></div>')
                }


                for (var i = 0; i < table.length; i++) { // очистить массив стол и наполнить массив руку игрока
                    opponent_hand.push(table[i])
                }

                table = []
                add_cards()
                rearrangingCards_copm()
                countOpponentCard = 0
                countPlayerCard = 0
                cellOne = undefined
                cellTwo = undefined
                whose = true
                setTimeout(delay_xod, 3000);
                return
            })
        }
        if (computer_fight_back.length != 0) {
            // alert("щас будем биться")
            condition = 8 // комп нашел чем отбиться
            get_speech()
            if (computer_fight_back.length != 0) {
                setTimeout(function () {
                    for (var i = 0; i < opponent_hand.length; i++) {
                        if (computer_fight_back[0] === opponent_hand[i]) {
                            cellTwo = opponent_hand[i] // переназначить
                            opponent_hand.splice([i], 1) // удаляем из руки карту которую кинули на стол
                            console.log(cellTwo)
                            console.log(opponent_hand)
                            cellAppend()
                            opening_cards_on_table()
                            $('.shirt').eq(0).remove()
                            rearrangingCards_copm()
                            sound_put_card.play()
                            countOpponentCard++
                            $("#btn_bito").show()
                            stepInGames()
                            algorithm()
                        }
                    }
                }, 1000)
            }
        }
        return
    }

    function playerMove() {
        $('#hand__player .my_card').addClass('move')
        if (table.length === 0 && countPlayerCard === 0) {
            $('#hand__player .my_card').addClass('hint')
        }
        $('#hand__player').on('click', '.move', function () {
            if (whose === true) {
                // alert("кликнули. ходит игрок и он будет класть эту карту на стол")
                if (table.length === 0 && countPlayerCard === 0) { // если еще не кинули на стол карту 
                    if (condition != 33) {
                        condition = 2
                        get_speech()
                    }
                    // $('#hand__player .my_card').addClass('move hint')
                    // $('#hand__player .my_card').addClass('hint')
                    let index = $(this).index()
                    currentThrownCard = player_hand.splice(index, 1) // добавляем на стол элемент соответсвующий номеру 
                    cellOne = currentThrownCard[0]
                    cellTwo = undefined
                    $(this).detach().appendTo("#cell_one")
                    sound_put_card.play()
                    $(this).removeClass('my_card').addClass('card_table').removeAttr("style").removeClass('move').removeClass('hint')
                    let $cell_one_reverse_annim = $('#cell_one .card_table').eq(0)
                    gsap.from($cell_one_reverse_annim, {
                        y: 500,
                        x: 20,
                        opacity: 0,
                        duration: 1
                    })
                    $(".card_table").css('background-image', localStorage.getItem("cards_face"))
                    openingPlayer_hand()
                    rearrangingCards()
                    countPlayerCard++
                    condition = 7 // задумчивый
                    get_speech()

                    stepInGames()
                    setTimeout(computerResponse, 3000)
                    // computerResponse()
                    return
                }
                if (countPlayerCard === countOpponentCard) { // если комп отбился
                    if (countPlayerCard < 6 && matche2.length != 0) { // если игрок кинул меньше 6 карт и ему еще есть что докинуть
                        if ($(this).hasClass("hint")) {
                            let index = $(this).index()
                            currentThrownCard = player_hand.splice(index, 1) // добавляем на стол элемент соответсвующий номеру 
                            cellOne = currentThrownCard[0]
                            cellTwo = undefined
                            showCells()
                            if (countPlayerCard > 2) {
                                condition = 9
                                get_speech()
                            }
                            if (countPlayerCard == 1) {
                                $(this).detach().appendTo("#cell_two").removeClass('my_card').addClass('card_table').removeAttr("style").removeClass('hint').removeClass('move')
                                let $cell_two_reverse_annim = $('#cell_two .card_table').eq(0)
                                gsap.from($cell_two_reverse_annim, {
                                    y: 500,
                                    x: -80,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            if (countPlayerCard == 2) {
                                $(this).detach().appendTo("#cell_three").removeClass('my_card').addClass('card_table').removeAttr("style").removeClass('hint').removeClass('move')
                                let $cell_three_reverse_annim = $('#cell_three .card_table').eq(0)
                                gsap.from($cell_three_reverse_annim, {
                                    y: 500,
                                    x: -130,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            if (countPlayerCard === 3) {
                                $(this).detach().appendTo("#cell_four").removeClass('my_card').addClass('card_table').removeAttr("style").removeClass('hint').removeClass('move')
                                let $cell_four_reverse_annim = $('#cell_four .card_table').eq(0)
                                gsap.from($cell_four_reverse_annim, {
                                    y: 500,
                                    x: 80,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            if (countPlayerCard === 4) {
                                $(this).detach().appendTo("#cell_five").removeClass('my_card').addClass('card_table').removeAttr("style").removeClass('hint').removeClass('move')
                                let $cell_five_reverse_annim = $('#cell_five .card_table').eq(0)
                                gsap.from($cell_five_reverse_annim, {
                                    y: 500,
                                    x: 80,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            if (countPlayerCard === 5) {
                                $(this).detach().appendTo("#cell_six").removeClass('my_card').addClass('card_table').removeAttr("style").removeClass('hint').removeClass('move')
                                let $cell_six_reverse_annim = $('#cell_six .card_table').eq(0)
                                gsap.from($cell_six_reverse_annim, {
                                    y: 500,
                                    x: -80,
                                    opacity: 0,
                                    duration: 1
                                })
                            }
                            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
                            sound_put_card.play()
                            openingPlayer_hand()
                            rearrangingCards()
                            countPlayerCard++
                            stepInGames()
                            setTimeout(computerResponse, 2000)
                        }
                        if (countPlayerCard == 6 || matche2.length == 0) { // если игрок уже кинул на стол 6 карт или ему больше нечего подложить
                            $("#btn_pass").hide()
                            $("#btn_bery").hide()
                            $("#btn_bito").show()
                        }
                    }
                }
            }
        })
    }
}




function stepInGames() {
    class iteration { // создание итерации
        el1 = 'подкидываемая'
        el2 = 'покрывающая'
        constructor(el1, el2) { // cellOne , cellTwo
            this.el1 = el1 // cellOne это та карта, которую комп выбрал чтобы кинуть на стол
            this.el2 = el2 // cellTwo это та карта, на которую кликнул игрок когда отбивался
        }

        validation_comp() { // ЧЕМ ИГРОК МОЖЕТ ОТБИТЬСЯ
            if (this.el1 != undefined && this.el2 === undefined) { // если есть карта которую нужно отбить
                $(".my_card").removeClass('hint') // удалить подсветку из предыдущей итерации
                for (var i = 0; i < player_hand.length; i++) { // перебираем все карты в руке игрока
                    if (this.el1.suit === player_hand[i].suit && player_hand[i].val > this.el1.val || player_hand[i].suit === suitt && this.el1.suit != suitt || this.el1.suit === suitt && player_hand[i].suit === suitt && this.el1.val < player_hand[i].val) {
                        let ind = i + 1
                        // если находим карту которой игрок может отбиться 
                        $(".my_card:nth-child(" + ind + ")").addClass('hint') // подсветить карты которыми игрок может отбиться
                    }
                }
                $("#btn_bery").show() // показать кнопку взять
            }
        }

        add() { // добавить карты в массив стол
            if (this.el1 != undefined && this.el2 != undefined) { // если есть две карты, то записываем обе
                for (var i = 0; i < 1; i++) { // записываем каждую итерацию в массив table, где буду храниться все итерации
                    table.push(iterat1.el1)
                    table.push(iterat1.el2)
                }
            }
            if (this.el1 != undefined && this.el2 == undefined) { // если есть только одна карта, то записываем только ее
                table.push(iterat1.el1)
            }
            table = unDuplicateArraySingleValues(table) // очистить стол от повторяющихся значений
        }


        validation_player() { // чем может отбиться комп
            if (table.length > 1) {
                computer_fight_back = []
            }
            if (this.el1 != undefined && this.el2 == undefined) {
                for (var i = 0; i < opponent_hand.length; i++) { // перебираем все карты в руке компа
                    if (this.el1.suit === opponent_hand[i].suit && opponent_hand[i].val > this.el1.val || opponent_hand[i].suit === suitt && this.el1.suit != suitt || this.el1.suit === suitt && opponent_hand[i].suit === suitt && this.el1.val < opponent_hand[i].val) {
                        computer_fight_back.push(opponent_hand[i])
                    }
                }
                computer_fight_back = $.grep(computer_fight_back, n => n == 0 || n)
                if (opponent_difficulty == 1) { //  АЛЁША
                    if (computer_fight_back.length != 0) {
                        if (this.el1.val == 11 || this.el1.val == 12 || this.el1.val == 13) {
                            computer_fight_back = []
                            condition = 11
                            get_speech()
                        }
                    }
                }
                if (opponent_difficulty == 2) { //  МЕГАМОЗГ
                    if (computer_fight_back.length != 0) {
                        sortOpponent(computer_fight_back)
                        if (computer_fight_back[0].suit == suitt && deck.length > 6) {
                            condition = 15
                            get_speech()
                            computer_fight_back = []
                        }
                        if (this.el1.suit == suitt && deck.length > 6) {
                            computer_fight_back = []
                        }
                    }
                }
                console.log(computer_fight_back)
            }
        }


        search_what_can_throw() { // определяем что еще может подкинуть комп
            if (this.el1 != undefined && this.el2 != undefined) { // || player_takes == true
                matche1 = opponent_hand.filter(function (v) {
                    return table.some(function (v2) {
                        return v.val == v2.val && v.suit != v2.suit
                    })
                })
                if (opponent_difficulty == 1) { //  АЛЁША
                    if (matche1 != 0) {
                        Alyoshas_love_for_the_cards(matche1)
                    }
                }
                if (opponent_difficulty == 2) { //  МЕГАМОЗГ
                    if (matche1 != 0) {
                        if (matche1[0].suit == suitt && deck.length > 6) {
                            condition = 15
                            get_speech()
                            matche1 = []
                        }
                    }
                }
                console.log(`что может докинуть комп`)
                console.log(matche1)
            }

        }
        search_what_can_throw2() { // определяем что еще может подкинуть игрок
            $(".my_card").removeClass('hint') // удалить подсветку из предыдущей итерации
            matche2 = player_hand.filter(function (v) {
                return table.some(function (v2) {
                    return v.val == v2.val && v.suit != v2.suit
                })
            })
            if (matche2.length != 0) {
                for (var i = 0; i < player_hand.length; i++) {
                    if (player_hand[i] == matche2[0]) {
                        let ind = i + 1
                        $(".my_card:nth-child(" + ind + ")").addClass('hint') // подсветить карты которые игрок может докинуть на стол
                    }
                    if (matche2.length == 2) {
                        if (player_hand[i] == matche2[1]) {
                            let ind = i + 1
                            $(".my_card:nth-child(" + ind + ")").addClass('hint') // подсветить карты которые игрок может докинуть на стол
                        }
                    }
                    if (matche2.length == 3) {
                        if (player_hand[i] == matche2[2]) {
                            let ind = i + 1
                            $(".my_card:nth-child(" + ind + ")").addClass('hint') // подсветить карты которые игрок может докинуть на стол
                        }
                    }
                    if (matche2.length == 4) {
                        if (player_hand[i] == matche2[3]) {
                            let ind = i + 1
                            $(".my_card:nth-child(" + ind + ")").addClass('hint') // подсветить карты которые игрок может докинуть на стол
                        }
                    }
                    if (matche2.length == 5) {
                        if (player_hand[i] == matche2[4]) {
                            let ind = i + 1
                            $(".my_card:nth-child(" + ind + ")").addClass('hint') // подсветить карты которые игрок может докинуть на стол
                        }
                    }
                }
            }
        }
    }


    const iterat1 = new iteration(cellOne, cellTwo) // создаем итерацию в которую записываем карты
    // alert("Запускаем проверку чем отбиться")
    if (whose === false) { // ходит комп
        // if (player_takes == true && cellOne != undefined) { // если игрок забирает и комп докидывает и докинул
        //     cellOne != undefined
        // }
        if (cellOne != undefined) {
            iterat1.validation_comp() // проверяем чем игрок может отбиться в каждой итерации
        }
        // если кинули хоть одну карту то записываем ее в стол
        if (table.length === 0 || cellOne != undefined) {
            iterat1.add()
        }

        if (table.length === 0 && countPlayerCard > 0) { // если стол пока пуст, но игрок уже отбился
            iterat1.add() //записываем в стол
            // console.log("ниже выводится стол в который должна добавиться итерация с двумя картами")
            // console.log(table)
        }

        if (table.length > 1) { // проверка что комп может доложить
            iterat1.search_what_can_throw()
        }

        // if (player_takes == true) { // если игрок забирает
        //     iterat1.search_what_can_throw()
        //     alert("запустили алгоритм")
        //     algorithm()
        // }


    }

    if (whose === true) { // ходит игрок
        // если кинули хоть одну карту то записываем ее в стол
        if (table.length === 0 || cellOne != undefined) {
            iterat1.add()
        }
        if (cellOne != undefined) { // если есть что отбивать то
            iterat1.validation_player() // проверяем чем комп может отбиться в каждой итерации
        }

        if (table.length > 0) {
            iterat1.search_what_can_throw2()
        }
    }
}

function Alyoshas_love_for_the_cards(arr) { // функция любви алеши к картам номиналом 11,12,13
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].val == 11 || arr[i].val == 12 || arr[i].val == 13) { // если может подкинуть валет даму король, то не будет
            let choice_rand = Math.floor(Math.random() * (4 - 1 + 1)) + 1
            console.log(choice_rand)
            if (choice_rand == 1 || choice_rand == 2 || choice_rand == 3) {
                arr.splice(i, 1)
            } else if (choice_rand == 4) {
                return
            }
        }
    }
}

function Megamind_protects_trump_cards(arr) {
    // for (var i = 0; i < arr.length; i++) {
    sortOpponent(arr)

    // computer_fight_back = computer_fight_back.filter(function (v) {
    //     return table.some(function (v2) {
    //         return v.val == v2.val
    //     })
    // })

    // if (arr[0].suit == suitt && deck.length >= 6) {
    //     arr.shift()
    //     arr.splice(0, 1)
    //     const item = arr.splice(1, 1)[0] // получаем элемент, который надо перенести и удаляем его из массива
    //     arr.splice(arr.length, 1, item) // добавляем элемент в конец
    // }
}



























function cellAppend() { // в какую ячейку кинуть карту компу + анимация полета
    if (whose === false) { // комп
        if ($('#cell_one').children().length === 0) {
            $("#cell_one").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_one_reverse_annim = $('#cell_one .card_table').eq(0)
            gsap.from($cell_one_reverse_annim, {
                y: -400,
                x: -40,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_one').children().length > 0 && $('#cell_two').children().length === 0) {
            $("#cell_two").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_two_reverse_annim = $('#cell_two .card_table').eq(0)
            gsap.from($cell_two_reverse_annim, {
                y: -400,
                x: -80,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_two').children().length > 0 && $('#cell_three').children().length === 0) {
            $("#cell_three").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_three_reverse_annim = $('#cell_three .card_table').eq(0)
            gsap.from($cell_three_reverse_annim, {
                y: -400,
                x: -200,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_three').children().length > 0 && $('#cell_four').children().length === 0) {
            $("#cell_four").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_four_reverse_annim = $('#cell_four .card_table').eq(0)
            gsap.from($cell_four_reverse_annim, {
                y: -600,
                x: -40,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_four').children().length > 0 && $('#cell_five').children().length === 0) {
            $("#cell_five").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_five_reverse_annim = $('#cell_five .card_table').eq(0)

            gsap.from($cell_five_reverse_annim, {
                y: -600,
                x: -80,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_five').children().length > 1 && $('#cell_six').children().length === 0) {
            $("#cell_six").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_six_reverse_annim = $('#cell_six .card_table').eq(0)
            gsap.from($cell_six_reverse_annim, {
                y: -600,
                x: -200,
                opacity: 0,
                duration: 1
            })
            return
        }
    }
    if (whose === true) { // игрок
        if ($('#cell_one').children().length == 1) {
            $("#cell_one").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_one_reverse_annim = $('#cell_one .card_table').eq(1)
            gsap.from($cell_one_reverse_annim, {
                y: -400,
                x: -40,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_one').children().length == 2 && $('#cell_two').children().length == 1) {
            $("#cell_two").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_two_reverse_annim = $('#cell_two .card_table').eq(1)
            gsap.from($cell_two_reverse_annim, {
                y: -400,
                x: -80,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_two').children().length == 2 && $('#cell_three').children().length == 1) {
            $("#cell_three").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_three_reverse_annim = $('#cell_three .card_table').eq(1)
            gsap.from($cell_three_reverse_annim, {
                y: -400,
                x: -200,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_three').children().length == 2 && $('#cell_four').children().length == 1) {
            $("#cell_four").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_four_reverse_annim = $('#cell_four .card_table').eq(1)
            gsap.from($cell_four_reverse_annim, {
                y: -600,
                x: -40,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_four').children().length == 2 && $('#cell_five').children().length == 1) {
            $("#cell_five").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_five_reverse_annim = $('#cell_five .card_table').eq(1)
            gsap.from($cell_five_reverse_annim, {
                y: -600,
                x: -80,
                opacity: 0,
                duration: 1
            })
            return
        }
        if ($('#cell_five').children().length == 2 && $('#cell_six').children().length == 1) {
            $("#cell_six").append('<div class ="card_table"></div>')
            $(".card_table").css('background-image', localStorage.getItem("cards_face"))
            let $cell_six_reverse_annim = $('#cell_six .card_table').eq(1)
            gsap.from($cell_six_reverse_annim, {
                y: -600,
                x: -200,
                opacity: 0,
                duration: 1
            })
            return
        }
    }
}

function unDuplicateArraySingleValues(array) { // чистка массива от повторов
    // Проверка, что это не пустой массив
    if ((Array.isArray(array) || array instanceof Array) &&
        array.length) {
        // Возвращает массив уникальных значений
        return array.reduce((resArr, currValue) => {
            return resArr.includes(currValue) ? resArr : [...resArr, currValue]
        }, [])
    } else {
        // Это не заполненный массив,
        // возвращаем переданное без изменений
        return array
    }
}
$("#btn_bery").click(function () {
    // player_takes = true // игрок забирает
    // анимация загребания карт
    send_everything_to_player() // анимация (игрок забирает карты)
    condition = 3
    get_speech()
    stepInGames()
    setTimeout(function () {
        $("#game_zone .card_table").detach() // убрать все карты со стола
        hide_buttons_and_cells()
    }, 2000);
    for (var i = 0; i < table.length; i++) { // очистить массив стол и наполнить массив руку игрока
        player_hand.push(table[i])
        $("#hand__player").append('<div class ="my_card"></div>')
    }
    table = []
    rearrangingCards() // скорректировать веер 
    openingPlayer_hand() // переоткрыть карты игрока
    $(".my_card").removeClass('hint')
    add_cards()
    countOpponentCard = 0
    countPlayerCard = 0
    cellOne = undefined
    cellTwo = undefined
    // задержка перед передаче хода
    function make_move_with_delay() {
        whose = false
        condition = 12
        get_speech()
        setTimeout(delay_xod, 3000);
    }
    setTimeout(make_move_with_delay, 2000);
})

function delay_xod() { // убрать если буду делать задержку перед ходом
    algorithm()
}



$("#btn_bito").click(function () {
    send_everything_to_bito()
    let b = table.length
    bito = table.splice(0, b)
    table = []
    setTimeout(function () {
        $("#game_zone .card_table").detach()
        hide_buttons_and_cells()
    }, 2000);
    add_cards()
    countOpponentCard = 0
    countPlayerCard = 0
    computer_fight_back = []
    cellOne = undefined
    cellTwo = undefined
    // передать ход
    whose = false
    setTimeout(stroke_transmission_delay, 3000);
})

function stroke_transmission_delay() {
    green_red()
    algorithm()
}

function hide_buttons_and_cells() { // скрыть все ячейки (кроме 1) и кнопки
    $("#btn_pass").hide()
    $("#btn_bito").hide()
    $("#btn_bery").hide()
    // скрыть все ячейки
    $("#cell_two").hide()
    $("#cell_three").hide()
    $("#cell_four").hide()
    $("#cell_five").hide()
    $("#cell_six").hide()
    $("#line_two").hide()
}




function add_cards() { // добавить карты игрокам. вставлять перед передачей хода другому игроку
    function add_cards_to_pl() {
        if (player_hand.length < 6) {
            if (deck.length == 0 && trump.length != 0) { //если колода пуста то выдать козырь
                give_the_card_to_the_player() // анимация раздачи карт игроку
                player_hand.push(trump)
                trump = ''
                $("#trump").hide()
                // скрыть козырную карту
                $("#hand__player").append('<div class ="my_card"></div>')
            }
            if (deck.length != 0) { // если колода не пуста то дать карту из колоды
                give_the_card_to_the_player() // анимация раздачи карт игроку
                for (var i = player_hand.length; i < 6; i++) {
                    player_hand.push(deck.pop()) //дать одну карту игроку из КОЛОДЫ
                }
                $('#hand__player .my_card').addClass('move')
            }
        }
    }

    function add_cards_to_opp() {
        if (opponent_hand.length < 6) {
            if (deck.length === 0 && trump.length != 0) { //если колода пуста то выдать козырь
                give_the_card_to_the_computer() // анимация раздачи карт компьютеру
                opponent_hand.push(trump)
                $("#trump").hide()
                trump = ''
            }
            if (deck.length != 0) {
                for (var i = opponent_hand.length; i < 6; i++) {
                    give_the_card_to_the_computer() // анимация раздачи карт компьютеру
                    opponent_hand.push(deck.pop()) //дать одну карту игроку из КОЛОДЫ
                    $(".opponent_hand").append('<div class ="shirt"></div>')
                    rearrangingCards_copm()
                }
            }
            if (opponent_difficulty == 2 || opponent_difficulty == 3) { // если уровень сложности 2 или 3 сортировать карты
                sortOpponent(opponent_hand)
            }
        }
    }
    if (whose === true) {
        add_cards_to_pl() // добавить карты игроку
        setTimeout(function () {
            add_cards_to_opp() //добавить карты компу
        }, 500)
    }
    if (whose === false) {
        add_cards_to_opp() //добавить карты компу
        setTimeout(function () {
            add_cards_to_pl() // добавить карты игроку
        }, 500)
    }
    if (deck.length == 0 && trump.length != 0) {
        $("#deck").hide()
        $(".deck__p").hide()
        $("#trump").css("margin-left", "25px")
        $(".anim_card").hide()
    }

    if (deck.length == 0 && trump.length == 0) {
        $("#deck").hide()
        $(".deck__p").hide()
        $("#trump_suit").css("display", "flex")
        if (suitt == 0) { //черви
            $("#trump_suit").css("background-image", "url(..//img/hearts.svg)")
        }
        if (suitt == 1) { //буби
            $("#trump_suit").css("background-image", "url(..//img/diamonds.svg)")
        }
        if (suitt == 2) { //крести
            $("#trump_suit").css("background-image", "url(..//img/clubs.svg)")
        }
        if (suitt == 3) { //трефы
            $("#trump_suit").css("background-image", "url(..//img/spades.svg)")
        }
        return
    }
    let quantity_deck = deck.length
    if (trump.length == 1) {
        quantity_deck + 1
    }
    document.getElementById("quantity_deck").innerHTML = quantity_deck
    console.log(opponent_hand)
}




// let sound_distribution_card = new Audio('..//audio/distribution_of_cards.mp3')
// sound_distribution_card.play()

// function playSound() {
//     let sound_distribution_card = new Audio('..//audio/distribution_of_cards.mp3')
//     sound_distribution_card.play()
// }

function give_the_card_to_the_player() { // дать карты ИГРОКУ (анимация)
    let how_many_cards_to_add = 6 - player_hand.length
    // let how_many_cards_to_add = 3
    function player_card_animation_delay() { // задержка анимации для второй карты
        $('.anim_card').eq(1).addClass('to_player')
    }

    if (how_many_cards_to_add == 1) {
        sound_distribution_card_1.play()
        $('.anim_card').eq(0).addClass('to_player')
    }
    if (how_many_cards_to_add == 2) {
        sound_distribution_card_2.play()
        $('.anim_card').eq(0).addClass('to_player')
        setTimeout(player_card_animation_delay, 500);
    }
    if (how_many_cards_to_add == 3) {
        sound_distribution_card_3.play()
        $('.anim_card').eq(0).addClass('to_player').addClass('a_it_c_2')
        setTimeout(player_card_animation_delay, 500);
    }
    if (how_many_cards_to_add == 4) {
        sound_distribution_card_4.play()
        $('.anim_card').eq(0).addClass('to_player').addClass('a_it_c_2')
        $('.anim_card').eq(1).addClass('a_it_c_2')
        setTimeout(player_card_animation_delay, 500);
    }
    if (how_many_cards_to_add == 5) {
        sound_distribution_card_5.play()
        $('.anim_card').eq(0).addClass('to_player').addClass('a_it_c_3')
        $('.anim_card').eq(3).addClass('a_it_c_2')
        setTimeout(player_card_animation_delay, 500);
    }
    if (how_many_cards_to_add == 6) {
        sound_distribution_card_6.play()
        $('.anim_card').eq(0).addClass('to_player').addClass('a_it_c_3')
        $('.anim_card').eq(1).addClass('a_it_c_3')
        setTimeout(player_card_animation_delay, 500);
    }

    setTimeout(remo, 6000);

    function remo() {
        $('.anim_card').removeClass('to_player to_comp a_it_c_3 a_it_c_2')
    }

    setTimeout(function () {
        for (var i = 0; i < how_many_cards_to_add; i++) {
            $("#hand__player").append('<div class ="my_card"></div>')
        }
        rearrangingCards()
        openingPlayer_hand()
    }, 1700)
}

function give_the_card_to_the_computer() { // дать карты КОМПЬЮТЕРУ (анимация)
    let how_many_cards_to_add = 6 - opponent_hand.length
    // let how_many_cards_to_add = 6

    function comp_card_animation_delay() { // задержка анимации для второй карты
        $('.anim_card').eq(3).addClass('to_comp')
    }

    if (how_many_cards_to_add == 1) {
        sound_distribution_card_1.play()
        $('.anim_card').eq(2).addClass('to_comp')
    }
    if (how_many_cards_to_add == 2) {
        sound_distribution_card_2.play()
        $('.anim_card').eq(2).addClass('to_comp')
        setTimeout(comp_card_animation_delay, 500);
    }
    if (how_many_cards_to_add == 3) {
        sound_distribution_card_3.play()
        $('.anim_card').eq(2).addClass('to_comp').addClass('a_it_c_2')
        setTimeout(comp_card_animation_delay, 500);
    }
    if (how_many_cards_to_add == 4) {
        sound_distribution_card_4.play()
        $('.anim_card').eq(2).addClass('to_comp').addClass('a_it_c_2')
        $('.anim_card').eq(3).addClass('a_it_c_2')
        setTimeout(comp_card_animation_delay, 500);
    }
    if (how_many_cards_to_add == 5) {
        sound_distribution_card_5.play()
        $('.anim_card').eq(2).addClass('to_comp').addClass('a_it_c_3')
        $('.anim_card').eq(3).addClass('a_it_c_2')
        setTimeout(comp_card_animation_delay, 500);
    }
    if (how_many_cards_to_add == 6) {
        sound_distribution_card_6.play()
        $('.anim_card').eq(2).addClass('to_comp').addClass('a_it_c_3')
        $('.anim_card').eq(3).addClass('a_it_c_3')
        setTimeout(comp_card_animation_delay, 500);
    }

    setTimeout(remo, 6000);

    function remo() {
        $('.anim_card').removeClass('to_player to_comp a_it_c_3 a_it_c_2')
    }

    // setTimeout(function () {
    //     rearrangingCards_copm()
    // }, 1700)

    // setTimeout(function () {
    //     rearrangingCards_copm()
    // }, 4000)
}













function showCells() { // раздвижение ячеек в зависимости от длинны массива с картами на столе
    if (whose === false) { // комп
        if (countOpponentCard == 2) {
            $("#cell_two").show(800)
            opening_cards_on_table_cellTWO()
            return
        }
        if (countOpponentCard == 3) {
            $("#cell_three").show(800)
            opening_cards_on_table_cellTHREE()
            return
        }
        if (countOpponentCard == 4) {
            $("#line_two").show(40)
            $("#cell_four").show(800)
            opening_cards_on_table_cellFOUR()
            return
        }
        if (countOpponentCard == 5) {
            $("#cell_five").show(800)
            opening_cards_on_table_cellFIVE()
            return
        }
        if (countOpponentCard == 6) {
            $("#cell_six").show(800)
            opening_cards_on_table_cellSIX()
            return
        }
    }
    if (whose === true) { //игрок
        if (countPlayerCard == 1) {
            $("#cell_two").show(800)
            return
        }
        if (countPlayerCard == 2) {
            $("#cell_three").show(800)
            return
        }
        if (countPlayerCard == 3) {
            $("#line_two").show(40)
            $("#cell_four").show(800)
            return
        }
        if (countPlayerCard == 4) {
            $("#cell_five").show(800)
            return
        }
        if (countPlayerCard == 5) {
            $("#cell_six").show(800)
            return
        }
    }
}

function opening_cards_on_table() { //открыть карты на столе в первой ячейке
    let h = []
    let k = []
    let cell
    if (countPlayerCard == 1) {
        cell = $("#cell_one .card_table:nth-child(2)")
    }
    if (countPlayerCard == 2) {
        cell = $("#cell_two .card_table:nth-child(2)")
    }
    if (countPlayerCard == 3) {
        cell = $("#cell_three .card_table:nth-child(2)")
    }
    if (countPlayerCard == 4) {
        cell = $("#cell_four .card_table:nth-child(2)")
    }
    if (countPlayerCard == 5) {
        cell = $("#cell_five .card_table:nth-child(2)")
    }
    if (countPlayerCard == 6) {
        cell = $("#cell_six .card_table:nth-child(2)")
    }
    for (var i = 0; i < 1; i++) {
        h[i] = cellTwo.suit
        k[i] = cellTwo.val
        // масти 
        if (h[i] === 0) {
            cell.addClass('hearts')
        }
        if (h[i] === 1) {
            cell.addClass('diamonds')
        }
        if (h[i] === 2) {
            cell.addClass('clubs')
        }
        if (h[i] === 3) {
            cell.addClass('spades')
        }
        // значения 
        if (k[i] === 6) {
            cell.addClass('six')
        }
        if (k[i] === 7) {
            cell.addClass('seven')
        }
        if (k[i] === 8) {
            cell.addClass('eight')
        }
        if (k[i] === 9) {
            cell.addClass('nine')
        }
        if (k[i] === 10) {
            cell.addClass('ten')
        }
        if (k[i] === 11) {
            cell.addClass('eleven')
        }
        if (k[i] === 12) {
            cell.addClass('twelve')
        }
        if (k[i] === 13) {
            cell.addClass('thirteen')
        }
        if (k[i] === 14) {
            cell.addClass('fourteen')
        }
    }
}

function opening_cards_on_table_cellONE() { //открыть карты на столе в первой ячейке
    let h = []
    let k = []
    $("#cell_one .card_table").removeClass("hearts diamonds clubs spades")
    $("#cell_one .card_table").removeClass("six seven eight nine ten eleven twelve thirteen fourteen")
    for (var i = 0; i < 1; i++) {
        let ind = [i + 1]
        h[i] = cellOne.suit
        k[i] = cellOne.val
        // масти 
        if (h[i] === 0) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('hearts')
        }
        if (h[i] === 1) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('diamonds')
        }
        if (h[i] === 2) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('clubs')
        }
        if (h[i] === 3) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('spades')
        }
        // значения 
        if (k[i] === 6 || k[i] === 16) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('six')
        }
        if (k[i] === 7 || k[i] === 17) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('seven')
        }
        if (k[i] === 8 || k[i] === 18) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('eight')
        }
        if (k[i] === 9 || k[i] === 19) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('nine')
        }
        if (k[i] === 10 || k[i] === 20) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('ten')
        }
        if (k[i] === 11 || k[i] === 21) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('eleven')
        }
        if (k[i] === 12 || k[i] === 22) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('twelve')
        }
        if (k[i] === 13 || k[i] === 23) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('thirteen')
        }
        if (k[i] === 14 || k[i] === 24) {
            $("#cell_one .card_table:nth-child(" + ind + ")").addClass('fourteen')
        }
    }
}

function opening_cards_on_table_cellTWO() { //открыть карты на столе во второй ячейке
    let h = []
    let k = []
    $("#cell_two .card_table").removeClass("hearts diamonds clubs spades")
    $("#cell_two .card_table").removeClass("six seven eight nine ten eleven twelve thirteen fourteen")
    for (var i = 0; i < 1; i++) {
        let ind = [i + 1]
        h[i] = cellOne.suit
        k[i] = cellOne.val
        // масти 
        if (h[i] === 0) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('hearts')
        }
        if (h[i] === 1) {
            $("#cell_two  .card_table:nth-child(" + ind + ")").addClass('diamonds')
        }
        if (h[i] === 2) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('clubs')
        }
        if (h[i] === 3) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('spades')
        }
        // значения 
        if (k[i] === 6 || k[i] === 16) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('six')
        }
        if (k[i] === 7 || k[i] === 17) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('seven')
        }
        if (k[i] === 8 || k[i] === 18) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('eight')
        }
        if (k[i] === 9 || k[i] === 19) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('nine')
        }
        if (k[i] === 10 || k[i] === 20) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('ten')
        }
        if (k[i] === 11 || k[i] === 21) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('eleven')
        }
        if (k[i] === 12 || k[i] === 22) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('twelve')
        }
        if (k[i] === 13 || k[i] === 23) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('thirteen')
        }
        if (k[i] === 14 || k[i] === 24) {
            $("#cell_two .card_table:nth-child(" + ind + ")").addClass('fourteen')
        }
    }
}

function opening_cards_on_table_cellTHREE() { //открыть карты на столе в третьей ячейке
    let h = []
    let k = []
    $("#cell_three .card_table").removeClass("hearts diamonds clubs spades")
    $("#cell_three .card_tables").removeClass("six seven eight nine ten eleven twelve thirteen fourteen")
    for (var i = 0; i < 1; i++) { // 
        let ind = [i + 1]
        h[i] = cellOne.suit
        k[i] = cellOne.val
        // масти 
        if (h[i] === 0) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('hearts')
        }
        if (h[i] === 1) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('diamonds')
        }
        if (h[i] === 2) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('clubs')
        }
        if (h[i] === 3) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('spades')
        }
        // значения 
        if (k[i] === 6 || k[i] === 16) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('six')
        }
        if (k[i] === 7 || k[i] === 17) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('seven')
        }
        if (k[i] === 8 || k[i] === 18) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('eight')
        }
        if (k[i] === 9 || k[i] === 19) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('nine')
        }
        if (k[i] === 10 || k[i] === 20) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('ten')
        }
        if (k[i] === 11 || k[i] === 21) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('eleven')
        }
        if (k[i] === 12 || k[i] === 22) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('twelve')
        }
        if (k[i] === 13 || k[i] === 23) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('thirteen')
        }
        if (k[i] === 14 || k[i] === 24) {
            $("#cell_three .card_table:nth-child(" + ind + ")").addClass('fourteen')
        }
    }
}

function opening_cards_on_table_cellFOUR() { //открыть карты на столе в четвертой ячейке
    let h = []
    let k = []
    $("#cell_four .card_table").removeClass("hearts diamonds clubs spades")
    $("#cell_four .card_tables").removeClass("six seven eight nine ten eleven twelve thirteen fourteen")
    for (var i = 0; i < 1; i++) { // 
        let ind = [i + 1]
        h[i] = cellOne.suit
        k[i] = cellOne.val
        // масти 
        if (h[i] === 0) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('hearts')
        }
        if (h[i] === 1) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('diamonds')
        }
        if (h[i] === 2) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('clubs')
        }
        if (h[i] === 3) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('spades')
        }
        // значения 
        if (k[i] === 6 || k[i] === 16) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('six')
        }
        if (k[i] === 7 || k[i] === 17) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('seven')
        }
        if (k[i] === 8 || k[i] === 18) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('eight')
        }
        if (k[i] === 9 || k[i] === 19) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('nine')
        }
        if (k[i] === 10 || k[i] === 20) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('ten')
        }
        if (k[i] === 11 || k[i] === 21) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('eleven')
        }
        if (k[i] === 12 || k[i] === 22) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('twelve')
        }
        if (k[i] === 13 || k[i] === 23) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('thirteen')
        }
        if (k[i] === 14 || k[i] === 24) {
            $("#cell_four .card_table:nth-child(" + ind + ")").addClass('fourteen')
        }
    }
}

function opening_cards_on_table_cellFIVE() { //открыть карты на столе в пятой ячейке
    let h = []
    let k = []
    $("#cell_five .card_table").removeClass("hearts diamonds clubs spades")
    $("#cell_five .card_tables").removeClass("six seven eight nine ten eleven twelve thirteen fourteen")
    for (var i = 0; i < 1; i++) { // 
        let ind = [i + 1]
        h[i] = cellOne.suit
        k[i] = cellOne.val
        // масти 
        if (h[i] === 0) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('hearts')
        }
        if (h[i] === 1) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('diamonds')
        }
        if (h[i] === 2) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('clubs')
        }
        if (h[i] === 3) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('spades')
        }
        // значения 
        if (k[i] === 6 || k[i] === 16) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('six')
        }
        if (k[i] === 7 || k[i] === 17) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('seven')
        }
        if (k[i] === 8 || k[i] === 18) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('eight')
        }
        if (k[i] === 9 || k[i] === 19) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('nine')
        }
        if (k[i] === 10 || k[i] === 20) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('ten')
        }
        if (k[i] === 11 || k[i] === 21) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('eleven')
        }
        if (k[i] === 12 || k[i] === 22) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('twelve')
        }
        if (k[i] === 13 || k[i] === 23) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('thirteen')
        }
        if (k[i] === 14 || k[i] === 24) {
            $("#cell_five .card_table:nth-child(" + ind + ")").addClass('fourteen')
        }
    }
}

function opening_cards_on_table_cellSIX() { //открыть карты на столе в шестой ячейке
    let h = []
    let k = []
    $("#cell_six .card_table").removeClass("hearts diamonds clubs spades")
    $("#cell_six .card_tables").removeClass("six seven eight nine ten eleven twelve thirteen fourteen")
    for (var i = 0; i < 1; i++) { // 
        let ind = [i + 1]
        h[i] = cellOne.suit
        k[i] = cellOne.val
        // масти 
        if (h[i] === 0) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('hearts')
        }
        if (h[i] === 1) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('diamonds')
        }
        if (h[i] === 2) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('clubs')
        }
        if (h[i] === 3) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('spades')
        }
        // значения 
        if (k[i] === 6 || k[i] === 16) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('six')
        }
        if (k[i] === 7 || k[i] === 17) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('seven')
        }
        if (k[i] === 8 || k[i] === 18) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('eight')
        }
        if (k[i] === 9 || k[i] === 19) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('nine')
        }
        if (k[i] === 10 || k[i] === 20) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('ten')
        }
        if (k[i] === 11 || k[i] === 21) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('eleven')
        }
        if (k[i] === 12 || k[i] === 22) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('twelve')
        }
        if (k[i] === 13 || k[i] === 23) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('thirteen')
        }
        if (k[i] === 14 || k[i] === 24) {
            $("#cell_six .card_table:nth-child(" + ind + ")").addClass('fourteen')
        }
    }
}


function green_red() { //поменять цвет тому кто ходит
    if (whose == true) { // игрок
        if (condition === 0) {
            condition = 33
        }

        $("#player__photo").css('border-color', 'rgb(88, 203, 88)')
        $("#player__name__wrap").css('background-color', 'rgb(88, 203, 88)')
        $("#opponent__photo").css('border-color', 'red')
        $("#opponent__name__wrap").css('background-color', 'red')
    }
    if (whose == false) { //комп
        if (condition === 0) {
            condition = 22
        }
        $("#player__photo").css('border-color', 'red')
        $("#player__name__wrap").css('background-color', 'red')
        $("#opponent__photo").css('border-color', 'rgb(88, 203, 88)')
        $("#opponent__name__wrap").css('background-color', 'rgb(88, 203, 88)')
    }
    get_speech()
}

function openingPlayer_hand() { // функция открытия карт игрока
    sorting_func()
    let h = []
    let k = []
    $("#hand__player .my_card").removeClass("hearts diamonds clubs spades")
    $("#hand__player .my_card").removeClass("six seven eight nine ten eleven twelve thirteen fourteen")
    for (var i = 0; i < player_hand.length; i++) { // 
        let ind = [i + 1]
        h[i] = player_hand[i].suit
        k[i] = player_hand[i].val
        // масти 
        if (h[i] === 0) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('hearts')
        }
        if (h[i] === 1) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('diamonds')
        }
        if (h[i] === 2) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('clubs')
        }
        if (h[i] === 3) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('spades')
        }
        // значения 
        if (k[i] === 6 || k[i] === 16) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('six')
        }
        if (k[i] === 7 || k[i] === 17) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('seven')
        }
        if (k[i] === 8 || k[i] === 18) {
            $(".my_card:nth-child(" + ind + ")").addClass('eight')
        }
        if (k[i] === 9 || k[i] === 19) {
            $(".my_card:nth-child(" + ind + ")").addClass('nine')
        }
        if (k[i] === 10 || k[i] === 20) {
            $(".my_card:nth-child(" + ind + ")").addClass('ten')
        }
        if (k[i] === 11 || k[i] === 21) {
            $(".my_card:nth-child(" + ind + ")").addClass('eleven')
        }
        if (k[i] === 12 || k[i] === 22) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('twelve')
        }
        if (k[i] === 13 || k[i] === 23) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('thirteen')
        }
        if (k[i] === 14 || k[i] === 24) {
            $("#hand__player .my_card:nth-child(" + ind + ")").addClass('fourteen')
        }
    }
}

function rearrangingCards() { // функция изменения веера карт игрока
    $(".my_card").css('background-image', localStorage.getItem("cards_face"))
    let quantity = $('#hand__player .my_card').length
    for (var i = 1; i < 37; i++) {
        if (quantity == 6) { // если 6 карт
            $(".my_card:first-child").css("transform", "rotate(325deg)")
            $(".my_card:nth-child(2)").css("transform", "rotate(338deg)")
            $(".my_card:nth-child(3)").css("transform", "rotate(351deg)")
            $(".my_card:nth-child(4)").css("transform", "rotate(3deg)")
            $(".my_card:nth-child(5)").css("transform", "rotate(15deg)")
            $(".my_card:last-child").css("transform", "rotate(27deg)")
        }
        if (quantity < 6) { // если карт меньше 6
            if (quantity == 1) {
                $(".my_card:first-child").css("transform", "rotate(355deg)") // 355 = 0 
            }
            if (quantity == 2) {
                $(".my_card:first-child").css("transform", "rotate(347deg)")
                $(".my_card:last-child").css("transform", "rotate(3deg)") // 16
            }
            if (quantity == 3) {
                $(".my_card:first-child").css("transform", "rotate(337.5deg)")
                $(".my_card:nth-child(2)").css("transform", "rotate(355deg)") //  17.5
                $(".my_card:last-child").css("transform", "rotate(12.5deg)")
            }
            if (quantity == 4) {
                $(".my_card:first-child").css("transform", "rotate(333deg)")
                $(".my_card:nth-child(2)").css("transform", "rotate(348deg)") // 12
                $(".my_card:nth-child(3)").css("transform", "rotate(5deg)")
                $(".my_card:last-child").css("transform", "rotate(21deg)")
            }
            if (quantity == 5) {
                $(".my_card:first-child").css("transform", "rotate(325deg)")
                $(".my_card:nth-child(2)").css("transform", "rotate(340.5deg)") // 15.5 
                $(".my_card:nth-child(3)").css("transform", "rotate(356deg)")
                $(".my_card:nth-child(4)").css("transform", "rotate(11.5deg)")
                $(".my_card:last-child").css("transform", "rotate(27deg)")
            }
        }
        if (quantity > 6 && quantity == i) { // если карт больше 6
            // console.log(quantity)
            let yyy = i + 1
            for (var j = 1; j < yyy; j++) {
                let uuu = 62 / (quantity - 1)
                let ppp = (uuu * j) + 325
                let jj = j + 1
                $(".my_card:nth-child(" + jj + ")").css("transform", "rotate(" + ppp + "deg)")
            }
            $(".my_card:first-child").css("transform", "rotate(325deg)")
        }
    }
}

function openingTrump() { // функция открытия козырной карты
    // доделать когда разберусь с локальной переменной карт
    // if (face = 0) {
    //     $("#trump").css("background-image", "url(..//img/card_standart_150x100.svg)")
    // }
    // if (face = 1) {
    //     $("#trump").css("background-image", "url(..//img/card_1.svg)")
    // }
    // if (face = 2) {
    //     $("#trump").css("background-image", "url(..//img/card_2.svg)")
    // }
    // if (face = 3) {
    //     $("#trump").css("background-image", "url(..//img/card_3.svg)")
    // }
    // if (face = 4) {
    //     $("#trump").css("background-image", "url(..//img/card_4.svg)")
    // }
    // if (face = 5) {
    //     $("#trump").css("background-image", "url(..//img/card_5.svg)")
    // }

    $("#trump").removeClass()
    if (suitt === 0) {
        $("#trump").addClass('hearts')
    }
    if (suitt === 1) {
        $("#trump").addClass('diamonds')
    }
    if (suitt === 2) {
        $("#trump").addClass('clubs')
    }
    if (suitt === 3) {
        $("#trump").addClass('spades')
    }
    if (trumpVal === 6) {
        $("#trump").addClass('six')
    }
    if (trumpVal === 7) {
        $("#trump").addClass('seven')
    }
    if (trumpVal === 8) {
        $("#trump").addClass('eight')
    }
    if (trumpVal === 9) {
        $("#trump").addClass('nine')
    }
    if (trumpVal === 10) {
        $("#trump").addClass('ten')
    }
    if (trumpVal === 11) {
        $("#trump").addClass('eleven')
    }
    if (trumpVal === 12) {
        $("#trump").addClass('twelve')
    }
    if (trumpVal === 13) {
        $("#trump").addClass('thirteen')
    }
    if (trumpVal === 14) {
        $("#trump").addClass('fourteen')
    }
}


function sorting_func() { // сортировка карт в зависимости от выбора в настройках
    if (sorting == 0 || localStorage.getItem('sorting_loc') == 0) { // без сортировки
        player_hand.sort(function () {
            return Math.random() - 0.5
        })
    }
    if (sorting == 1 || localStorage.getItem('sorting_loc') == 1) {
        //сортировка карт по матям черви буби крести пики(РАБОТАЕТ)
        player_hand.sort(function (a, b) {
            return a.suit - b.suit
        })
    }
    if (sorting == 2 || localStorage.getItem('sorting_loc') == 2) {
        player_hand.sort(function (a, b) {
            return a.val - b.val
        })
    }

    if (sorting == 3 || localStorage.getItem('sorting_loc') == 3) {
        //сортировка карт от меньших к большим (козырь справа)
        for (var i = 0; i < player_hand.length; i++) {
            if (player_hand[i].suit == suitt) {
                player_hand[i].val += 10
            }
        }
        player_hand.sort((prev, next) => prev.val - next.val);
        for (var i = 0; i < player_hand.length; i++) {
            if (player_hand[i].suit == suitt) {
                player_hand[i].val -= 10
            }
        }
    }
}

function sortOpponent(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].suit == suitt) {
            arr[i].val += 10
        }
    }
    arr.sort((prev, next) => prev.val - next.val)
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].suit == suitt) {
            arr[i].val -= 10
        }
    }
}









function rearrangingCards_copm() { // изменение веера карт у компа
    let quantitycomp = opponent_hand.length
    var count = $('.shirt').length
    // alert(count);
    // alert(quantitycomp);
    if (quantitycomp != count) {
        for (var i = 0; i < quantitycomp; i++) {
            $('.shirt').remove()

        }
        for (var i = 0; i < quantitycomp; i++) {
            $(".opponent_hand").append('<div class ="shirt"></div>')
        }


    }

    // let quantitycomp = $('.shirt').length
    for (var i = 1; i < 37; i++) {
        if (quantitycomp == 6) { // если 6 карт
            $(".shirt:first-child").css("transform", "rotate(325deg)")
            $(".shirt:nth-child(2)").css("transform", "rotate(338.5deg)")
            $(".shirt:nth-child(3)").css("transform", "rotate(351deg)")
            $(".shirt:nth-child(4)").css("transform", "rotate(3deg)")
            $(".shirt:nth-child(5)").css("transform", "rotate(15deg)")
            $(".shirt:last-child").css("transform", "rotate(27deg)")
        }
        if (quantitycomp < 6) { // если карт меньше 6
            if (quantitycomp == 1) {
                $(".shirt:first-child").css("transform", "rotate(356deg)")
            }
            if (quantitycomp == 2) {
                $(".shirt:first-child").css("transform", "rotate(7deg)")
                $(".shirt:last-child").css("transform", "rotate(346deg)")
            }
            if (quantitycomp == 3) {
                $(".shirt:first-child").css("transform", "rotate(11deg)")
                $(".shirt:nth-child(2)").css("transform", "rotate(354deg)")
                $(".shirt:last-child").css("transform", "rotate(337deg)")
            }
            if (quantitycomp == 4) {
                $(".shirt:first-child").css("transform", "rotate(14deg)")
                $(".shirt:nth-child(2)").css("transform", "rotate(3deg)")
                $(".shirt:nth-child(3)").css("transform", "rotate(349deg)")
                $(".shirt:last-child").css("transform", "rotate(337deg)")
            }
            if (quantitycomp == 5) {
                $(".shirt:first-child").css("transform", "rotate(325deg)")
                $(".shirt:nth-child(2)").css("transform", "rotate(340.5deg)")
                $(".shirt:nth-child(3)").css("transform", "rotate(356deg)")
                $(".shirt:nth-child(4)").css("transform", "rotate(8deg)")
                $(".shirt:last-child").css("transform", "rotate(25deg)")
            }
        }
        if (quantitycomp > 6 && quantitycomp == i) { // если карт больше 6
            let yyy = i + 1
            for (var j = 1; j < yyy; j++) {
                let uuu = 62 / (quantitycomp - 1)
                let ppp = (uuu * j) + 325
                let jj = j + 1
                $(".shirt:nth-child(" + jj + ")").css("transform", "rotate(" + ppp + "deg)")
            }
            $(".shirt:first-child").css("transform", "rotate(325deg)")
        }
    }
}



























// $(".bubble").hide()
// let condition = 7
get_speech()



function get_speech() {
    let rand_photo
    $(".bubble").show(700)
    if (opponent_difficulty == 1) { //    АЛЁША
        switch (condition) {
            case 1: // дали ход компу
                $('.bubble').text("Ура! наконец - то мой ход!")
                rand_photo = Math.floor(Math.random() * (4 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_1_' + rand_photo + '.png)')
                break
            case 2: //  дали ход  игроку
                $('.bubble').text("Сейчас твой ход!")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_2_' + rand_photo + '.png)')
                break
            case 3: // игрок берет
                $('.bubble').text("Забирай!")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_3_' + rand_photo + '.png)')
                break
            case 4: // комп берет
                $('.bubble').text("Беру!")
                rand_photo = Math.floor(Math.random() * (4 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_4_' + rand_photo + '.png)')
                break
            case 5: // игрок выйграл
                $('.bubble').text("Эээх... Ты победил.")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_5_' + rand_photo + '.png)')
                break
            case 6: // комп выйграл
                $('.bubble').text("Хи-хи! Я победил.")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_6_' + rand_photo + '.png)')
                break
            case 7: // игрок кинул карту и комп думает
                $('.bubble').text("Сейчас посмотрю чем я могу отбиться!")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_7_' + rand_photo + '.png)')
                break
            case 8: // комп нашел чем отбиться
                $('.bubble').text("Отбиваюсь!")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_8_' + rand_photo + '.png)')
                break
            case 9: // игрок дал несколько карт на стол
                $('.bubble').text("Ой, как много карт!")
                rand_photo = Math.floor(Math.random() * (7 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_9_' + rand_photo + '.png)')
                break
            case 10: // комп дал несколько карт игроку
                $('.bubble').text("Хи - хи. Я уже почти выйграл?")
                rand_photo = Math.floor(Math.random() * (2 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_10_' + rand_photo + '.png)')
                break
            case 11: // эта карта такая красивая, я возьму.
                $('.bubble').text("Эта карта такая красивая, я возьму!")
                rand_photo = Math.floor(Math.random() * (2 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_11_' + rand_photo + '.png)')
                break
            case 12: // повторно дали ход компу после кнопки БЕРУ
                $('.bubble').text("Снова мой ход!")
                rand_photo = Math.floor(Math.random() * (4 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_1_' + rand_photo + '.png)')
                break
            case 13: // Комп сказал бито
                $('.bubble').text("Бито!")
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_7_2.png)')
                break
            case 22: // ПЕРВЫЙ ХОД КОМПЬЮТЕРА
                $('.bubble').text("Я хожу первый!")
                rand_photo = Math.floor(Math.random() * (4 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_1_' + rand_photo + '.png)')
                break
            case 33: // ПЕРВЫЙ ХОД ИГРОКА
                $('.bubble').text("Ты ходишь первый!")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/simple_2_' + rand_photo + '.png)')
                break


        }
    }
    if (opponent_difficulty == 2) { //    МЕГАМОЗГ
        switch (condition) {
            case 1: // дали ход компу
                $('.bubble').text("Сейчас мой ход...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_1_' + rand_photo + '.png)')
                break
            case 2: //  дали ход  игроку
                $('.bubble').text("Ходи...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_2_' + rand_photo + '.png)')
                break
            case 3: // игрок берет
                $('.bubble').text("Все карты со стола отправляются к тебе...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_3_' + rand_photo + '.png)')
                break
            case 4: // комп берет
                $('.bubble').text("Придется забрать себе карты...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_4_' + rand_photo + '.png)')
                break
            case 5: // игрок выйграл
                $('.bubble').text("Тебе повезло, но я отыграюсь...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_5_' + rand_photo + '.png)')
                break
            case 6: // комп выйграл
                $('.bubble').text("Победа за мной...")
                rand_photo = Math.floor(Math.random() * (2 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_6_' + rand_photo + '.png)')
                break
            case 7: // игрок кинул карту и комп думает
                $('.bubble').text("Хммм, чем же отбить...")
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_7_1.png)')
                break
            case 8: // комп нашел чем отбиться
                $('.bubble').text("Пожалуй, отобьюсь этой картой...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_8_' + rand_photo + '.png)')
                break
            case 9: // игрок дал несколько карт на стол
                $('.bubble').text("Зря...")
                rand_photo = Math.floor(Math.random() * (4 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_9_' + rand_photo + '.png)')
                break
            case 10: // комп дал несколько карт игроку
                $('.bubble').text("Чую запах скорой победы...")
                rand_photo = Math.floor(Math.random() * (2 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_10_' + rand_photo + '.png)')
                break
            case 12: // повторно дали ход компу после кнопки БЕРУ
                $('.bubble').text("Что ж, я хожу еще раз...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_1_' + rand_photo + '.png)')
                break
            case 13: // комп сказал БИТО
                $('.bubble').text("Похоже, что бито...")
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_13_1.png)')
                break

            case 15: // комп сберег козырную карту
                $('.bubble').text("Пожалуй сберегу козырь. Ой, прости, просто мысли в слух...")
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_15_1.png)')
                break

            case 22: // дали ход компу
                $('.bubble').text("Мой ход будет первым...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_1_' + rand_photo + '.png)')
                break
            case 33: //  дали ход  игроку
                $('.bubble').text("Твой ход будет первым...")
                rand_photo = Math.floor(Math.random() * (3 - 1 + 1)) + 1
                $('#opponent__photo').css("background-image", 'url(..//img//emotions/medium_2_' + rand_photo + '.png)')
                break
        }
    }
    if (opponent_difficulty == 3) { //    СВЕРХРАЗУМ
        switch (condition) {
            case 1: // дали ход компу
                $('.bubble').text("Сейчас мой ход...")
                break
            case 2: //  дали ход  игроку
                $('.bubble').text("Ходи...")
                break
            case 3: // игрок берет
                $('.bubble').text("Все карты со стола отправляются к тебе...")
                break
            case 4: // комп берет
                $('.bubble').text("Придется забрать себе карты...")
                break
            case 5: // игрок выйграл
                $('.bubble').text("Тебе повезло, но я отыграюсь...")
                break
            case 6: // комп выйграл
                $('.bubble').text("Победа за мной...")
                break
            case 7: // игрок кинул карту и комп думает
                $('.bubble').text("Хммм, чем же отбить...")
                break
            case 8: // комп нашел чем отбиться
                $('.bubble').text("Пожалуй, отобьюсь этой картой...")
                break
            case 9: // игрок дал несколько карт на стол
                $('.bubble').text("Зря...")
                break
            case 10: // комп дал несколько карт игроку
                $('.bubble').text("Чую запах скорой победы...")
                break
            case 12: // повторно дали ход компу после кнопки БЕРУ
                $('.bubble').text("Что ж, я хожу еще раз...")
                break
            case 13: // комп сказал БИТО
                $('.bubble').text("Похоже, что бито...")
                break

            case 22: // дали первый ход компу
                $('.bubble').text("Вселенная решила, что я буду ходить первый.")

                break
            case 33: //  дали первый ход  игроку
                $('.bubble').text("Вселенная удостоила тебя права делать первый ход.")
                break
        }
    }
    setTimeout(function () {
        $(".bubble").hide(700)
        // alert("Кончилось")
    }, 3000);
}










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




function send_everything_to_player() { // анимация (игрок забирает карты)
    // отлет карт в руку игроку если он забирает
    var length = 0;
    $('#table .cell').each(function () {
        if ($(this).position().top > 0) {
            length++
        }
    })
    var offsetHeight = document.getElementById('game_zone').offsetHeight
    var offsetWidth = document.getElementById('game_zone').clientWidth
    let height_shift = (offsetHeight / length) / 2
    if (length == 1) {
        gsap.to(".card_table", {
            duration: 2,
            y: 700,
        });
    }
    if (length == 2) {
        let width_shift = (offsetWidth / length) / 2
        var tl = gsap.timeline()
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 20
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            x: -width_shift + 20
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
    }
    if (length == 3) {
        let width_shift = (offsetWidth / length)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 20
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 20
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
    }
    if (length == 4) {
        let width_shift = (offsetWidth / length)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift + 50
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
    }
    if (length == 5) {
        let width_shift = (offsetWidth / 2)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 100,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 100,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift - 25,
            x: (width_shift / 2) - 40
        });
        gsap.to("#cell_five .card_table", {
            duration: 0.5,
            y: -height_shift + 10,
            x: (-width_shift / 2) + 50
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_five .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
    }
    if (length == 6) {
        let width_shift = (offsetWidth / 2)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 100,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 100,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift - 25,
            x: (width_shift / 3) + 120
        });
        gsap.to("#cell_five .card_table", {
            duration: 0.5,
            y: -height_shift + 10
        });
        gsap.to("#cell_six .card_table", {
            duration: 0.5,
            y: -height_shift - 10,
            x: (-width_shift / 3) - 80
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_five .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
        gsap.to("#cell_six .card_table", {
            duration: 2,
            y: 700,
            delay: 0.5,
        });
    }
}

function send_everything_to_comp() { //  анимация (комп забирает карты)
    // отлет карт в руку игроку если он забирает
    var length = 0;
    $('#table .cell').each(function () {
        if ($(this).position().top > 0) {
            length++
        }
    })
    var offsetHeight = document.getElementById('game_zone').offsetHeight
    var offsetWidth = document.getElementById('game_zone').clientWidth
    let height_shift = (offsetHeight / length) / 2
    if (length == 1) {
        gsap.to(".card_table", {
            duration: 2,
            y: -700,
        });
    }
    if (length == 2) {
        let width_shift = (offsetWidth / length) / 2
        var tl = gsap.timeline()
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 20
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            x: -width_shift + 20
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
    }
    if (length == 3) {
        let width_shift = (offsetWidth / length)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 20
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 20
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
    }
    if (length == 4) {
        let width_shift = (offsetWidth / length)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift + 50
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
    }
    if (length == 5) {
        let width_shift = (offsetWidth / 2)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 100,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 100,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift - 25,
            x: (width_shift / 2) - 40
        });
        gsap.to("#cell_five .card_table", {
            duration: 0.5,
            y: -height_shift + 10,
            x: (-width_shift / 2) + 50
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_five .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
    }
    if (length == 6) {
        let width_shift = (offsetWidth / 2)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 100,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 100,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift - 25,
            x: (width_shift / 3) + 120
        });
        gsap.to("#cell_five .card_table", {
            duration: 0.5,
            y: -height_shift + 10
        });
        gsap.to("#cell_six .card_table", {
            duration: 0.5,
            y: -height_shift - 10,
            x: (-width_shift / 3) - 80
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_five .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
        gsap.to("#cell_six .card_table", {
            duration: 2,
            y: -700,
            delay: 0.5,
        });
    }
}


function send_everything_to_bito() { // карты со стола внешне уходят в бито
    // отлет карт в бито
    var length = 0;
    $('#table .cell').each(function () {
        if ($(this).position().top > 0) {
            length++
        }
    })
    var offsetHeight = document.getElementById('game_zone').offsetHeight;
    var offsetWidth = document.getElementById('game_zone').clientWidth;
    let height_shift = (offsetHeight / length) / 2
    if (length == 1) {
        gsap.to(".card_table", {
            duration: 2,
            x: 850,
            opacity: 0
        });
    }
    if (length == 2) {
        let width_shift = (offsetWidth / length) / 2
        var tl = gsap.timeline();
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 20
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            x: -width_shift + 20
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            x: 1380,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            x: 1000,
            delay: 0.5,
            opacity: 0
        });
    }
    if (length == 3) {
        let width_shift = (offsetWidth / length)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 20
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 20
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            x: 1300,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            x: 1000,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            x: 700,
            delay: 0.5,
            opacity: 0
        });
    }
    if (length == 4) {
        let width_shift = (offsetWidth / length)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift + 50
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            x: 1300,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            x: 1000,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            x: 700,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            x: 1000,
            y: -100,
            delay: 0.5,
            opacity: 0
        });
    }
    if (length == 5) {
        let width_shift = (offsetWidth / 2)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 100,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 100,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift - 25,
            x: (width_shift / 2) - 40
        });
        gsap.to("#cell_five .card_table", {
            duration: 0.5,
            y: -height_shift + 10,
            x: (-width_shift / 2) + 50
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            x: 1300,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            x: 1000,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            x: 700,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            x: 1100,
            y: -100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_five .card_table", {
            duration: 2,
            x: 800,
            y: -100,
            delay: 0.5,
            opacity: 0
        });
    }
    if (length == 6) {
        let width_shift = (offsetWidth / 2)
        gsap.to("#cell_one .card_table", {
            duration: 0.5,
            x: width_shift - 100,
            y: height_shift + 10
        });
        gsap.to("#cell_two .card_table", {
            duration: 0.5,
            y: height_shift - 50
        });
        gsap.to("#cell_three .card_table", {
            duration: 0.5,
            x: -width_shift + 100,
            y: height_shift + 10
        });
        gsap.to("#cell_four .card_table", {
            duration: 0.5,
            y: -height_shift - 25,
            x: (width_shift / 3) + 120
        });
        gsap.to("#cell_five .card_table", {
            duration: 0.5,
            y: -height_shift + 10
        });
        gsap.to("#cell_six .card_table", {
            duration: 0.5,
            y: -height_shift - 10,
            x: (-width_shift / 3) - 80
        });
        gsap.to("#cell_one .card_table", {
            duration: 2,
            x: 1300,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_two .card_table", {
            duration: 2,
            x: 1000,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_three .card_table", {
            duration: 2,
            x: 700,
            y: 100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_four .card_table", {
            duration: 2,
            x: 1200,
            y: -100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_five .card_table", {
            duration: 2,
            x: 900,
            y: -100,
            delay: 0.5,
            opacity: 0
        });
        gsap.to("#cell_six .card_table", {
            duration: 2,
            x: 700,
            y: -100,
            delay: 0.5,
            opacity: 0
        });
    }
}