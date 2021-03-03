//O código cria um novo array copiando o primeiro, porem multiplicando os numeros ímpares
let numeros = [3,2,11,20,8,7];
let novosNumeros = numeros.map(item => item % 2 ? item * 2 : item);
console.log(novosNumeros);

//mesmo código escrito de outro jeito
let numeros = [3,2,11,20,8,7];
let novosNumeros = numeros.map((item)=> (item%2 +1 ) * item);
console.log(novosNumeros);