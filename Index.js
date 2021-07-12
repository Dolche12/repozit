"use strict";

/*
    Урок 10
*/

/*
Используя только файл скрипта (html руками не трогать) выполнить такие действия:
1 Восстановить порядок книг.
2 Заменить картинку заднего фона на другую из папки image
3 Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
4 Удалить рекламу со страницы
5 Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы 
    элементов, поможет dev tools)
+ в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
*/

// Восстановить порядок книг.

const books = document.querySelectorAll('.books'),
book = document.querySelectorAll('.book'),
advertising = document.querySelector('.adv');
//             #1
books[0].prepend(book[2]);
books[0].prepend(book[5]);
books[0].prepend(book[3]);
books[0].prepend(book[4]);
books[0].prepend(book[0]);
books[0].prepend(book[1]);

//const allbooks = document.querySelectorAll('.book');
//             #2
document.querySelector('body').style.backgroundImage = 'url(./image/you-dont-know-js.jpg)'; 
//             #3
books[0].children[2].querySelector('h2').querySelector('a').text = "Книга 3. this и Прототипы Объектов";
//             #4
advertising.remove();
//             #5

const sortChapter = collection => {
    const sortElements = arr => {
        const arrInd = Object.keys(arr).sort((prev, next) => {
            if (arr[prev].textContent > arr[next].textContent) {
                return 1; }
            if (arr[prev].textContent < arr[next].textContent) { 
                return -1; }
            });
        let arrNew = [];
        for (let i = 0; i < arrInd.length; i++){
            arrNew.push(arr[arrInd[i]]);
        }
        return arrNew;
    };

    const elem = collection.querySelectorAll('li');
    let arrChapter = [],
        arrApp = [];
    elem.forEach(el => {
        if (el.textContent.indexOf('Введение') > -1) {
            collection.insertBefore(el, elem[0]);
        }
        if (el.textContent.indexOf('Предисловие') > -1) {
            collection.insertBefore(el, elem[1]);
        }
        if (el.textContent.indexOf('Глава') > -1) { arrChapter.push(el); }
        if (el.textContent.indexOf('Приложение') > -1) { arrApp.push(el); }
    });
    arrChapter = sortElements(arrChapter);
    arrChapter.forEach(el => { collection.appendChild(el); });
    arrApp = sortElements(arrApp);
    arrApp.forEach(el => { collection.appendChild(el); });
};






sortChapter(books[0].children[1].querySelector('ul'));
sortChapter(books[0].children[4].querySelector('ul'));

// В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let child = document.createElement('li');
child.innerText = 'Глава 8: За пределами ES6';
books[0].children[5].querySelector('ul').appendChild(child);
sortChapter(books[0].children[5].querySelector('ul'));

