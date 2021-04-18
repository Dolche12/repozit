'use strict';

let money = +prompt('Ваш месячный доход?', '50000'),
period = 5,
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет:, такси:, коммуналка:'),
deposit = confirm('Есть ли у вас депозит в банке? (Ок-да, Отмена-нет)'),
expenses = [],
mission = +prompt('Цель заработать :', '150000'),
ExpensesMonth = getExpensesMonth (),
accumulatedMonth = getAccumulatedMonth(money, ExpensesMonth), // Переменная, которая присваевает работу двух функций с callback(-ом)
budgetDay = accumulatedMonth / 30;

  /*
          Функции
  */
            function getExpensesMonth (){           //Функция, которая возвращает сумму всех расходов за месяц
            let sum = 0;
            for (let i = 0; i < 2; i++) {
                expenses[i] = prompt('Введите обязательную статью расходов');
                sum += function (){
                    let n = 0;
                    do {
                        n = +prompt('Во сколько это обойдется?');
                    } while (!isNumber(n));
                    return n;
                }
            }
            return sum;
        }
            function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
            }

          function getAccumulatedMonth (moneyMonth, expensesMonth){    //Функция, которая возвращает накопления за месяц
            return moneyMonth - expensesMonth;
          }
      
          function getTargetMonth (miss, callback){    //Функция, которая возвращает результат деления округляя в большую сторону
            return Math.ceil(miss / callback);
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
        
        const b = getTargetMonth(mission, accumulatedMonth);
  /*
          Основная часть программы
  */            //
    showTypeOf(money);               //
    showTypeOf(addExpenses);         //Вызов функций
    showTypeOf(deposit);             //
    console.log('Расходы за месяц: ' + ExpensesMonth); 
    console.log('Возможные расходы: ' + addExpenses.split(', '));
    console.log(getTargetMonth(mission, accumulatedMonth));
    if (b >= 0){
        console.log('Цель будет достигнута за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев(-a)');
    }  else { 
            console.log('Цель не будет достигнута');
    }
    console.log('Бюджет на день : ' + Math.floor(budgetDay) + ' рублей');
    getStatusIncome();
    console.log(mission); 