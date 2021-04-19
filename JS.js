'use strict';

let money;
start();
let period = 5,
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет:, такси:, коммуналка:'),
deposit = confirm('Есть ли у вас депозит в банке? (Ок-да, Отмена-нет)'),
expenses = [],      //Массив для функции getExpensesMonth, для вопросов, как в прошлом уроке, но удобнее
mission = +prompt('Цель заработать :', '150000'),
expensesMonth = getExpensesMonth (),              //Переменная, которая присаевает значение функции getExpensesMonth для упращения кода
accumulatedMonth = getAccumulatedMonth(money, expensesMonth), // Переменная, которая присваевает работу двух функций с callback(-ом) 
budgetDay = accumulatedMonth / 30;

  /*
          Функции
  */
        function start (){
            do {
                money = prompt('Ваш месячный доход?');
            } while (!isNumber(money));
            return +money;
        }

        function getExpensesMonth (){           //Функция, которая возвращает сумму всех расходов за месяц
            let sum = 0;

            for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов');
            sum += (() => {                                                                   //sum = sum + function - так можно описать данную итерацию 
                let n = 0;
                  do {
                    n = +prompt('Во сколько это обойдется?');
                }   while (!isNumber(n));   //Вызов функции isNumber и проверка сразу на число 
                return n;
                })();
            }
            return sum;
        }

        function isNumber(n) {                               //Функция которая возвращает результат проверки числа n на конечность, на тип number 
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function getAccumulatedMonth (moneyMonth, ExpensesMonth){    //Функция, которая возвращает накопления за месяц
                return moneyMonth - ExpensesMonth;
        }
      
        function getTargetMonth (miss, callback){    //Функция, которая возвращает результат деления округляя в !!!меньшую!!! сторону, в меньшую для упрощения проверки условия
            if ((miss / callback) >= 0){                                                             // Проверка функции getTargetMonth на значение 
                return console.log('Цель будет достигнута ');
            }  else { 
                 return console.log('Цель не будет достигнута');
            }
        }
          
        function showTypeOf (a){     //Функция, которая выводит в консоль тип данной переменной 
            console.log(a, typeof(a));
        }
      
        function getStatusIncome(){   //Функция, которая возвращает описание 
            if (budgetDay === 1200) {
                return console.log('У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!');
            } else if (budgetDay === 600) {
                return console.log('У вас почти средний уровень дохода, но немного не хватает...');
            } else if (budgetDay > 1200) {
                return console.log('У вас высокий уровень дохода');
            } else if (budgetDay < 1200 && budgetDay > 600) {
                return console.log('У вас средний уровень дохода');
            } else if (budgetDay < 0) {
                return console.log('Что то пошло не так');
            } else {
                return console.log('К сожалению у вас уровень дохода ниже среднего');
            }
        }


  /*
          Основная часть программы
  */            
    showTypeOf(money);               //
    showTypeOf(addExpenses);         //Вызов функций
    showTypeOf(deposit);             //
    console.log('Расходы за месяц: ' + expensesMonth); 
    console.log('Возможные расходы: ' + addExpenses.split(', '));
    console.log('Бюджет на день : ' + Math.floor(budgetDay) + ' рублей');
    getTargetMonth(mission, expensesMonth);
    getStatusIncome();