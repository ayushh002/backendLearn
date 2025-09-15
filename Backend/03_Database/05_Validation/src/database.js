const mongoose = require('mongoose');

const url = 'mongodb+srv://ayushh002:userPassword@codingclub.4tygwex.mongodb.net/backend';

async function main(){

    await mongoose.connect(url);

}


module.exports = main;
