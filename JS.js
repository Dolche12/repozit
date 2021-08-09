class first {
    hello (){
        console.log('Я метод родителя');
    };
};

class second extends first{
    hello2() {
        super.hello();
        console.log('А я метод родителя')
    }
};
const car = new second;
car.hello2();