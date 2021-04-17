'use strict';

let money = +prompt('Ваш месячный доход?', '50000'),
period = 5,
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет:, такси:, коммуналка:'),
deposit = confirm('Есть ли у вас депозит в банке? (Ок-да, Отмена-нет)'),
expenses1 = prompt('Введите обязательную статью расходов?', 'Транспорт'),
amount1 = +prompt('Во сколько это обойдется?',3000),
expenses2 = prompt('Введите обязательную статью расходов?', 'Продукты'),
amount2 = +prompt('Во сколько это обойдется?', 5000),
mission = +prompt('Цель заработать :', '150000'),
accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth()), // Переменная, которая присваевает работу двух функций с callback(-ом)
budgetDay = accumulatedMonth / 30;
  /*
          Функции
  */
          function getExpensesMonth (){           //Функция, которая возвращает сумму всех расходов за месяц
            return amount1 + amount2;
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

  showTypeOf(money);               //
  showTypeOf(addExpenses);         //Вызов функции
  showTypeOf(deposit);             //
  console.log('Расходы за месяц: ' + getExpensesMonth()); 
  console.log('Возможные расходы: ' + addExpenses.split(', '));
  console.log('Цель будет достигнута за: ' + getTargetMonth(mission, getAccumulatedMonth(money, getExpensesMonth())) + ' месяцев(-a)');
  console.log('Бюджет на день : ' + Math.floor(budgetDay) + ' рублей');
  getStatusIncome();