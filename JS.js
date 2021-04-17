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
  showTypeOf(money);               //
  showTypeOf(addExpenses);         //Вызов функции
  showTypeOf(deposit);             //
  console.log('Расходы за месяц: ' + getExpensesMonth()); 
  console.log('Возможные расходы: ' + addExpenses.split(', '));
  console.log('Цель будет достигнута за: ' + getTargetMonth(mission, getAccumulatedMonth(money, getExpensesMonth())) + ' месяцев(-a)');
  console.log('Бюджет на день : ' + Math.floor(budgetDay) + ' рублей');
  console.log(getStatusIncome(budgetDay));

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

    function getStatusIncome(budget){   //Функция, которая возвращает описание budget 
    return(budget < 0) ? 'Что то пошло не так' :
     (budget < 600) ? 'Что то пошло не так' :
     (budget === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
     (budget < 1200) ? 'У вас средний уровень дохода' :
     (budget === 1200) ? 'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
     'У вас высокий уровень дохода';
    }
