const mongoose = require('mongoose');

async function connectMongo() {
  try {
    await mongoose.connect('mongodb://localhost:27017/purrfect_studies');
    console.log('Connected to local MongoDB successfully.');
  } catch (error) {
    console.error('Error connecting to local MongoDB:', error);
  }
}

module.exports = connectMongo;