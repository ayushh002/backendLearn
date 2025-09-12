// This is an asynchronous file reading operation handled by Libuv, which then requests the OS
// to read the file.
// Libuv does not itself read the file — it manages the asynchronous behavior and delegates 
// the task to the OS using threads or system calls. The OS does the actual file access.
// When the OS finishes the operation, it notifies Libuv, which then triggers the callback.

const fs = require('fs'); // fs - file system - an existing module in node js 

console.log("Before Read");

fs.readFile('./06_BACKEND/01_NodeJs/03_LibuvNodeJs/data.json',"utf-8",(err, res)=>{
    console.log(res); // prints <Buffer 7b 0d 0a .... without using utf-8
    // const data = JSON.parse(res);
    // console.log(data);
})
// We can also make it synchronous in this way (not preffered)
const data = fs.readFileSync('./06_BACKEND/01_NodeJs/03_LibuvNodeJs/data.json', 'utf-8')
console.log(data);

console.log("After Read");
