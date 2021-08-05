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
    this.income = {}, // Статья доп дохода
    this.addIncome = [],
    this.expenses = {}, // список обязательных статей расходов
    this.addExpenses = [], // строка с перечислением дополнительных расходов
    this.deposit = false, // надичие депозита в банке
    this.budget = 0, // Доход за месяц
    this.budgetDay = 0, // Дневной бюджет (доход за месяц / 30)
    this.budgetMonth = 0,
    this.incomeMonth = 0,
    this.expensesMonth = 0, //Расходы 
    this.percentDeposit = 0,
    this.moneyDeposit = 0;
};

AppData.prototype.blockinput = function (disabled = true) {
    document.querySelectorAll('input[type=text]').forEach(function(item){
        item.disabled = disabled;
    });
};

AppData.prototype.start = function() {
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
};
AppData.prototype.reset = function() {
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
};
AppData.prototype.addExpensesBlock = function(){
    let cloneExspensesItem = expensesItems[0].cloneNode(true);
        cloneExspensesItem.querySelector('.expenses-title').value = '';
        cloneExspensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExspensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3 ) expensesAdd.style.display = 'none';
};
AppData.prototype.addIcomeBlock = function(){
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    cloneIncomeItems.querySelector('.income-title').value = '';
    cloneIncomeItems.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3 ) incomeAdd.style.display = 'none';
};
AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', '); 
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
            _this.addExpenses.push(item);
        }
    })
};
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
       let itemValue = item.value.trim();
       if (itemValue !== ''){
        _this.addIncome.push(itemValue);
       } 
    });
};
AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){
        let ItemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
        if (ItemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[ItemExpenses] = +cashExpenses;
        }

    });
};
AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value,
        cashIcome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIcome !== ''){
            _this.incomeMonth += +cashIcome;
        }
    });
};
AppData.prototype.getBudget = function() {                                  //Функция для подсчёта средств на месяц  и, соотвественно, на день
    const _this = this;
    if (!_this.budget) {
        _this.budget = 0;
    }
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {    
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {                 //Функция, которая возвращает описание 
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
};
AppData.prototype.getInfoDeposit = function() {
    const _this = this;
    if(this.deposit){
        do {
            _this.percentDeposit = prompt('Какой годовой процент?', '10');
        } while (!isNumber(_this.percentDeposit));

        do {
            _this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while (!isNumber(_this.moneyDeposit));
    }
};
AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.changePeriodSelect = function(event) {
    document.querySelector('.period-amount').textContent = event.target.value;
    incomePeriodValue.value = appData.calcSavedMoney();
};
AppData.prototype.blockStart = function() {
    start.disabled = !salaryAmount.value.trim();
};
AppData.prototype.eventsListeners = function () {
    const _this = this;
    const foo = appData.start.bind(appData);
    this.blockStart();

    expensesAdd.addEventListener('click', this.addExpensesBlock);
    incomeAdd.addEventListener('click', this.addIcomeBlock);
    periodSelect.addEventListener('input', this.changePeriodSelect);
    salaryAmount.addEventListener('input', this.blockStart);
    start.addEventListener('click', foo);
    };




const appData = new AppData();
appData.eventsListeners();

