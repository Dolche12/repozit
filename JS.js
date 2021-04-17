'use strict';

let money = +prompt('Ваш месячный доход?', '50000'),
period = 5,
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет:, такси:, коммуналка:'),
deposit = confirm('Есть ли у вас депозит в банке? (Ок-да, Отмена-нет)'),
expenses1 = prompt('Введите обязательную статью расходов?', 'Транспорт'),
amount1 = prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?', 'Продукты'),
amount2 = prompt('Во сколько это обойдется?'),
budgetMonth = money - amount2 - amount1,
mission = prompt('Цель заработать :', '15000')*1,
budgetDay = budgetMonth/30,
accumulatedMonth = getAccumulatedMonth();
  console.log (typeof money);
  console.log (typeof addExpenses);
  console.log (typeof deposit);
  console.log (addExpenses.length);
  console.log('Период равен ' + period + ' месяцев');
  console.log('Цель заработать : ' + mission + ' рублей');
  console.log(addExpenses);
  console.log(addExpenses.toLowerCase().split(', '));
  console.log('Бюджет на месяц : ' + budgetMonth + ' рублей');
  console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth) + ' месяцев(-a)');
  console.log('Бюджет на день : ' + Math.floor(budgetDay) + ' рублей');

       if (budgetDay === 1200) {
        console.log('У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!');
    } else if (budgetDay === 600) {
        console.log('У вас почти средний уровень дохода, но немного не хватает...');
    } else if (budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay < 1200 && budgetDay > 600) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay < 0) {
        console.log('Что то пошло не так');
    } else {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    }

    /*

    Урок 4

    */

    function getExpensesMonth (){
      return amount1 + amount2;
    }
    
    function getAccumulatedMonth (moneyMonth, ExpensesMonth){
      return moneyMonth - ExpensesMonth;
    }

    //  console.log('Накопления за месяц: ', getAccumulatedMonth(money, getExpensesMonth()))

    function getTargetMonth (Miss, budgetmonth){
      return Math.ceil(miss / budgetmonth);
    }
    



