'use strict';

let money;
start();
let appData = {
    income: {}, // Статья доп дохода
    addIncome: [],
    expenses: {}, // список обязательных статей расходов
    addExpenses: [], // строка с перечислением дополнительных расходов
    deposit: false, // надичие депозита в банке
    mission: 50000, // желаемая цель (Какую сумму хотите накопить)
    period: 3,
    budget: +money, // Доход за месяц
    budgetDay: 0, // Дневной бюджет (доход за месяц / 30)
    budgetMonth: 0,
    expensesMonth: 0, //Расходы 
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'интернет, такси, коммуналка');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            appData.expenses[prompt('Введите обязательную статью расходов?')] = (() => {
                let n = 0;
                do {
                    n = prompt('Во сколько это обойдется?');
                } while (!isNumber(n));
                return +n;
            })();
        }
        console.log(23);
    },
    getExpensesMonth: function() {                           //Функция для подсчёта расходов
        appData.expensesMonth = 0;
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {                                  //Функция для подсчёта средств на месяц  и, соотвественно, на день
        if (!appData.budget) {
            appData.budget = 0;
        }
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {    
        if ((appData.mission / appData.budgetMonth) >= 0){                              // Проверка функции getTargetMonth на значение 
            return console.log('Цель будет достигнута за ' + Math.ceil(appData.mission / appData.budgetMonth) + ' Месяца');
        }  else { 
             return console.log('Цель не будет достигнута');
        }
    },
    getStatusIncome: function (){                 //Функция, которая возвращает описание 
        if (appData.budget === 1200) {
            return console.log('У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!');
        } else if (appData.budget === 600) {
            return console.log('У вас почти средний уровень дохода, но немного не хватает...');
        } else if (appData.budget > 1200) {
            return console.log('У вас высокий уровень дохода');
        } else if (appData.budget < 1200 && appData.budget > 600) {
            return console.log('У вас средний уровень дохода');
        } else if (appData.budget < 0) {
            return console.log('Что то пошло не так');
        } else {
            return console.log('К сожалению у вас уровень дохода ниже среднего');
        }
    }
};
  /*
          Функции
  */
        function start (){
            do {
                money = prompt('Ваш месячный доход?');
            } while (!isNumber(money));
            return +money;
        }

        function isNumber(n) {                               //Функция которая возвращает результат проверки числа n на конечность, на тип number 
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
  /*
          Основная часть программы
  */      
          appData.getExpensesMonth();           //Вычисление расходов
          appData.getBudget();                  //Функция для подсчёта средств на месяц  и, соотвественно, на день
          appData.asking();                     //Комплексный ввод переменных

          console.log(appData.expensesMonth);
          appData.getTargetMonth();      //Функция, которая выводит в консоль значение о цели 
          appData.getStatusIncome();     //Функция, которая выводит в консоль описание дохода
          console.log('Наша программа включает в себя данные: ');
          for (let key in appData) {                                    //Вывод всех свойств и их значений из объекта appData
              console.log(key, appData[key]);
          }