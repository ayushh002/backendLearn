console.log("This is Second");

function sum(a,b){
    console.log(a+b);
}

// module.exports = sum;

function sub(a,b){
    console.log(a-b);
}

// Exporting multiple functions
module.exports = {sum,sub};
// module.exports is simply an empty object
// We can also export them like:
// module.exports.sum = sum;
// module.exports.sub = sub;
