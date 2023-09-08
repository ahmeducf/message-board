const mongoose = require('mongoose');
const debug = require('debug')('message-board:mongoose');

require('dotenv').config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;
mongoose.set('strictQuery', false);

async function connectDB() {
  try {
    await mongoose.connect(connectionString);
    debug('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { connectDB };
