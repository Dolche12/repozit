let money=200000, 
income='80000', 
addExpenses='Интернет: 2000, Такси: 6000, Коммуналка: 8000', 
deposit=true, 
mission='50000', 
period=6,
budgetDay = money/30;
console.log(typeof money );
console.log(typeof income );
console.log(typeof deposit );
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission+ " рублей");
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);