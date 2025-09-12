// require('./second');

// console.log("This is First");

// It is known as CJS : CommonJs Module

// Now if we try to run a function from this module which is defined in second.js
// sum(2,4); // It gives an error as by default everything written in a module is private 
// and cannot be accessed through any other module directly without exporting it.


// IIFE(Immediately Invoked Function Expression) wraps all the code of a required module into a 
// function in the main module in this way: 
// (function (){
//     console.log("This is Second");

//     function sum(a,b){
//         return a+b;
//     }
// })(); // Here the function is immediately called after its definition


// // So to call a function we need to first export it from second.js and then use require to store 
// // it in a variable in the main file(first.js file here):


// const sum = require('./second');

// sum(2,4);
// console.log('This is First');



// Using object destructuring for Multiple functions Exports

const {sum,sub} = require('./second');

sum(2,4);
sub(11,8);
console.log('This is First');



