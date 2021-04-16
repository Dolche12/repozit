'use strict';

let money = prompt('Ваш месячный доход?', '50000') * 1,
period = 5;
  console.log (typeof money);
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет:, такси:, коммуналка:');
  console.log (typeof addExpenses);
let deposit = confirm('Есть ли у вас депозит в банке? (Ок-да, Отмена-нет)');
  console.log (typeof deposit);

    console.log (addExpenses.length);
    console.log('Период равен ' + period + ' месяцев');


let expenses1 = prompt('Введите обязательную статью расходов?', 'Транспорт'),
amount1 = prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?', 'Продукты'),
amount2 = prompt('Во сколько это обойдется?'),
budgetMonth = money - amount2 - amount1,
mission = prompt('Цель заработать :', '15000')*1;
  console.log('Цель заработать : ' + mission + ' рублей');

  console.log(addExpenses);
  console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = budgetMonth/30;
  console.log('Бюджет на месяц : ' + budgetMonth + ' рублей');

       if ( Math.ceil(mission / budgetMonth ) > 0) {
         console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth) + ' месяцев(-a)');
       }  else if ( Math.ceil(mission / budgetMonth) == 0 ) {
            console.log('Цель будет достигнута в этом месяце!');
       }     else if ( Math.ceil(mission / budgetMonth) < 0 ) {
               console.log('Что-то пошло не так');
       }

  console.log('Бюджет на день : ', Math.floor(budgetDay));
   if ( budgetDay > 1200 ) {
       console.log('У вас высокий уровень дохода!');
   }  else if ( 600 <= budgetDay <= 1200 ) {
         console.log ('У вас средний уровень дохода');
   }       else if ( 0 <= budgetDay < 600 ) {
             console.log ('К сожалению у вас уровень дохода ниже среднего');
   }           else if ( budgetDay < 0 ) {
                 console.log('Что-то пошло не так');
   }