'use strict';

let money=prompt('Ваш месячный доход?', '50000'), 
addExpenses=prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет, такси, коммуналка'),
deposit=confirm('Есть ли у вас депозит в банке?(Ок-да,Отмена-нет)'),
period=6,
expenses1 = prompt('Введите обязательную статью расходов?', 'Транспорт'),
amount1 = prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?', 'Продукты'),
amount2 = prompt('Во сколько это обойдется?'),
income=prompt(''),
budgetMonth = money - amount2 - amount1;
console.log(budgetMonth);