'use strict';
  /*
          Функции
  */
    function getRandomInt(max) {                 //Функция для создания случайного значения 
        return Math.floor(Math.random() * max);
    }


    function isNumbe(n) {                               //Функция которая возвращает результат проверки числа n на конечность, на тип number 
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function start() {                    //Запуск игры 
        let randomInt = getRandomInt (100);     // присваивание переменной функции для статичности 
       console.log(randomInt);
        function game () {                      //начало основного кода
            let num = prompt('Угадай число от 1 до 100 (для выхода из игры нажмите "отмена")');
            if (num === null) {                     // проверка на чистое поле 
               alert('Конец игры!')
               return;
            } 
            if (isNumber(num)) {                                          //Код на проверку значения num(Введённого пользователем) и randomInt(Случайного значения);
                if (randomInt > num) {
                    alert('Загаданное число больше');
                    game();
                }else if (randomInt < num) {
                    alert('Загаданное число меньше');
                    game();
                }else {
                    if (confirm('Вы выйграли !! Хотите сыграть ещё?')) {
                        start();
                    } else {
                        alert('Конец игры!');
                        return;
                        }
                }
            } else {                                                    //Если введённое значение не число 
                alert('Введите число!');
                game();
            }
        }
        game();                              //Запуск основного кода программы 
    }
/*
        Основная часть 
*/

start();