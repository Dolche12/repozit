'use strict';

let money=prompt('Ваш месячный доход?', '50000')*1;
console.log (typeof money);
let addExpenses=prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет, такси, коммуналка');
console.log (typeof addExpenses);
let deposit=confirm('Есть ли у вас депозит в банке?(Ок-да,Отмена-нет)');
console.log (typeof deposit);
let expenses1 = prompt('Введите обязательную статью расходов?', 'Транспорт');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?', 'Продукты');
let amount2 = prompt('Во сколько это обойдется?');
let budgetMonth = money - amount2 - amount1;
let mission=prompt('Цель заработать :', '15000')*1;
console.log (typeof money);
let budgetDay = budgetMonth/30;
  console.log(budgetMonth);
  console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth)+ ' месяцев');
  console.log('Бюджет на день :',Math.floor(budgetDay));
   if (budgetDay > 1200){
       console.log('У вас высокий уровень дохода!');
   }else if(600 <= budgetDay <= 1200){
       console.log ('У вас средний уровень дохода');
   }else if(0 <= budgetDay < 600){
       console.log ('К сожалению у вас уровень дохода ниже среднего');
   }else if(budgetDay < 0){
       console.log('Что-то пошло не так');
   }