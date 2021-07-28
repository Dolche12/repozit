let buttonStart = document.getElementById('start'),
incomeAdd = document.getElementsByTagName('button')[0],
expensesAdd = document.getElementsByTagName('button')[1],
check = document.querySelector('#deposit-check'),
additionalIncomeItem = document.querySelector('.additional_income-item'),
budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0],
budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0],
expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0],
additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value'),
additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0],
incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0],
targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0],
salaryAmount = document.querySelector('.salary-amount'),
incomeItems = document.querySelector('.income-items'),
expensesItems = document.querySelectorAll('.expenses-items'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select')
additionalExpensesItem = document.querySelector('.additional_expenses-item');

function isNumber(n) {                               //Функция которая возвращает результат проверки числа n на конечность, на тип number 
    return !isNaN(parseFloat(n)) && isFinite(n);
};
 
function string() {                      //Функция на изменение стоки
   let arr = [];                                
    for (let key of appData.addExpenses){
       let g;
       g = key.split('');
       g[0] = g[0].toUpperCase();
       g = g.join('');
       arr.push(g);
    }
  arr = arr.join(', ');
  appData.addExpenses = arr;
}

let appData = {
    income: {}, // Статья доп дохода
    addIncome: [],
    expenses: {}, // список обязательных статей расходов
    addExpenses: [], // строка с перечислением дополнительных расходов
    deposit: false, // надичие депозита в банке
    mission: 50000, // желаемая цель (Какую сумму хотите накопить)
    period: 3,
    budget: 0, // Доход за месяц
    budgetDay: 0, // Дневной бюджет (доход за месяц / 30)
    budgetMonth: 0,
    expensesMonth: 0, //Расходы 
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        if (salaryAmount.value === ''){
            alert('Ошибка, поле "Меячный доход" должно быть заполнено');
            return;
        }
        appData.budget = salaryAmount.value;
        appData.getExpenses();

        appData.getExpensesMonth();
        appData.getBudget();


        appData.showResult();
        appData.getAddExpenses();
    },
    addExpensesBlock: function(){
        let cloneExspensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExspensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3 ) expensesAdd.style.display = 'none';
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let ItemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
            if (ItemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[ItemExpenses] = +cashExpenses;
            }

        });
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', '); 
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },
    asking: function() {
        if (confirm('Есть ли у вас дополнительный источник заработка?')){
            let itemIncome,
            cashIncome;

            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            } while (!isNaN(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            } while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }
            let addExpenses;

            do {
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'интернет, такси, коммуналка');
            } while (!isNaN(addExpenses));
              appData.addExpenses = addExpenses.toLowerCase().split(', ');
              appData.deposit = confirm('Есть ли у вас депозит в банке?');


    },
    getExpensesMonth: function() {                           //Функция для подсчёта расходов
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
    getStatusIncome: function () {                 //Функция, которая возвращает описание 
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
    },
    getInfoDeposit: function() {
        if(appData.deposit){
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};

  /*
          Основная часть программы
  */     
    buttonStart.addEventListener('click', appData.start);
    expensesAdd.addEventListener('click', appData.addExpensesBlock);
     
    console.log(appData);
          /*
          appData.asking();                    //Комплексный ввод переменных
          appData.getExpensesMonth();           //Вычисление расходов
          appData.getBudget();                  //Функция для подсчёта средств на месяц  и, соотвественно, на день
          appData.getInfoDeposit();             //Функция для определения значения percentDeposit и moneyDeposit
          string();                             //Функция на изменение строки 

          console.log(appData.expensesMonth); //Вычисление расходов
          appData.getTargetMonth();      //Функция, которая выводит в консоль значение о цели 
          appData.getStatusIncome();     //Функция, которая выводит в консоль описание дохода
          console.log('Наша программа включает в себя данные: ');
          for (let key in appData) {                                    //Вывод всех свойств и их значений из объекта appData
              console.log(key, appData[key]);
          }

          console.dir(appData.income);          //Доп доход
          console.dir(appData.expenses);        //список обязательных статей расходов
          console.log('Годовой процент депозита: ' + appData.percentDeposit);
          console.log('Сумма депозита: ' + appData.moneyDeposit);
          console.log(appData.addExpenses);                     //Изменённый массив addExpenses

*/
