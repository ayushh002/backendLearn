const mongoose = require('mongoose');

const url = 'mongodb+srv://ayushh002:Anshuman%401104@codingclub.4tygwex.mongodb.net/backend';

async function main(){

    await mongoose.connect(url);

}

module.exports = main;