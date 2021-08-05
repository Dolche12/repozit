'use strict'


/*
1) Привязать контекст вызова функции start к appData 
2) В нашем объекте везде использовать this как ссылку на объект appData (где это возможно)
3) Проверить работу кнопок плюс и input-range (исправить если что-то не работает)
4) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать, 
после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить, на которую 
навешиваем событие и выполнение метода reset
Метод reset должен всю программу возвращать в исходное состояние
*/


let buttonStart = document.getElementById('start'),
incomeAdd = document.getElementsByTagName('button')[0],
expensesAdd = document.getElementsByTagName('button')[1],
check = document.querySelector('#deposit-check'),
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0],
budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0],
expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0],
additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0],
incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0],
targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0],
salaryAmount = document.querySelector('.salary-amount'),
expensesItems = document.querySelectorAll('.expenses-items'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
incomeItems = document.querySelectorAll('.income-items'),
incomeTitle = document.querySelector('.income-title'),
incomeAmount = document.querySelector('.income-amount');

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
    budget: 0, // Доход за месяц
    budgetDay: 0, // Дневной бюджет (доход за месяц / 30)
    budgetMonth: 0,
    incomeMonth: 0,
    expensesMonth: 0, //Расходы 
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        appData.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome(); 
        this.getBudget();
        this.showResult();


        if (start.textContent === 'Рассчитать'){
            this.blockinput();
            start.textContent = 'Cбросить';
        }else{
            start.textContent = 'Рассчитать';
            this.reset();
        }

    },
    reset: function() {
        for (let i = incomeItems.length - 1; i > 0; i--) {
        incomeItems[0].parentNode.removeChild(incomeItems[i]);
        }
        for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[0].parentNode.removeChild(expensesItems[i]);
        }
        this.blockinput(false);
        incomeAdd.style.display = '';
        expensesAdd.style.display = '';
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.value = '';
        });
        appData.income = {}; // Статья доп дохода
        appData.addIncome = [];
        appData.expenses = {}; // список обязательных статей расходов
        appData.addExpenses = []; // строка с перечислением дополнительных расходов
        appData.deposit = false; // надичие депозита в банке
        appData.budget = 0; // Доход за месяц
        appData.budgetDay = 0; // Дневной бюджет (доход за месяц / 30)
        appData.budgetMonth = 0;
        appData.incomeMonth = 0;
        appData.expensesMonth = 0; //Расходы 
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
        this.getBudget();
        periodSelect.value = document.querySelector('.period-amount').textContent = 1;
        this.blockStart();
    },
    blockinput: function(disabled = true){
        document.querySelectorAll('input[type=text]').forEach(function(item){
            item.disabled = disabled;
        });
    },
    addExpensesBlock: function(){
        let cloneExspensesItem = expensesItems[0].cloneNode(true);
        cloneExspensesItem.querySelector('.expenses-title').value = '';
        cloneExspensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExspensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3 ) expensesAdd.style.display = 'none';
    },
    addIcomeBlock: function(){
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        cloneIncomeItems.querySelector('.income-title').value = '';
        cloneIncomeItems.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3 ) incomeAdd.style.display = 'none';
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', '); 
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
           let itemValue = item.value.trim();
           if (itemValue !== ''){
            appData.addIncome.push(itemValue);
           } 
        });
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
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value,
            cashIcome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIcome !== ''){
                appData.incomeMonth += +cashIcome;
            }
        });
    },
    getBudget: function() {                                  //Функция для подсчёта средств на месяц  и, соотвественно, на день
        if (!appData.budget) {
            appData.budget = 0;
        }
        appData.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        appData.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function() {    
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function () {                 //Функция, которая возвращает описание 
        if (this.budget === 1200) {
            return console.log('У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!');
        } else if (this.budget === 600) {
            return console.log('У вас почти средний уровень дохода, но немного не хватает...');
        } else if (this.budget > 1200) {
            return console.log('У вас высокий уровень дохода');
        } else if (this.budget < 1200 && this.budget > 600) {
            return console.log('У вас средний уровень дохода');
        } else if (this.budget < 0) {
            return console.log('Что то пошло не так');
        } else {
            return console.log('К сожалению у вас уровень дохода ниже среднего');
        }
    },
    getInfoDeposit: function() {
        if(this.deposit){
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    changePeriodSelect: function(event) {
        document.querySelector('.period-amount').textContent = event.target.value;
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    blockStart: function(){
    start.disabled = !salaryAmount.value.trim();
    },
};

  /*
          Основная часть программы
  */     
    appData.blockStart();
    const foo = appData.start.bind(appData);

    expensesAdd.addEventListener('click', appData.addExpensesBlock);
    incomeAdd.addEventListener('click', appData.addIcomeBlock);
    periodSelect.addEventListener('input', appData.changePeriodSelect);
    salaryAmount.addEventListener('input', appData.blockStart);
    start.addEventListener('click', foo);
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
