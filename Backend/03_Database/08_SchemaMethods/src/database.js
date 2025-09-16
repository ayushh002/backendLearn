const mongoose = require('mongoose');

// Import dotenv
require('dotenv').config();

const url = process.env.DB_CONNECTION_STRING;

async function main(){

    await mongoose.connect(url);

}

module.exports = main;