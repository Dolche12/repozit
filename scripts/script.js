'use strict'

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

if (localStorage.getItem('todo')){
    todoData = JSON.parse(localStorage.getItem('todo'));
}
const render = function() {

    todoList.textContent = '';
    todoCompleted.textContent = '';



 todoData.forEach(function(item, i){
       const li =  document.createElement('li');
       li.classList.add('todo-item');

       li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
       '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
       '</div>';

       if (item.completed){
           todoCompleted.append(li);
       } else {
           todoList.append(li);
       }

       const btntodoComplete = li.querySelector('.todo-complete'),
       btntodoRemove = li.querySelector('.todo-remove');


       btntodoRemove.addEventListener('click', function(){
           if (i === 1 ){
               localStorage.removeItem('todo')
           }
            todoData.splice(i-1, 1);
            render();
       });

       btntodoComplete.addEventListener('click', function(){
           item.completed = !item.completed;
           render();
       });
       i++;
       localStorage.setItem('todo', JSON.stringify(todoData));
 });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    if (headerInput.value){
    const newTodo = {
        value: headerInput.value,
        completed: false
    }
    todoData.push(newTodo);
    render();
    headerInput.value = ''
    };
});


render();