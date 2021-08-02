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

const AppData = function() {


};


const appData = new AppData();

console.log(AppData)






  /*
          Основная часть программы
  */     
    const foo = appData.start.bind(appData);
    appData.blockStart();

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
