let num = 266219,
a = num.toString().split(''),
mul = a[0],
rezult;
for (let i=1; i<a.length; i++){
     mul *= a[i];
} 
console.log(mul);
rezult = mul ** 3;
rezult = rezult.toString().split(''),
console.log(rezult[0]+rezult[1]);