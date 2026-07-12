require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Food = require('./models/Food');
const seedData = require('./seedData');

async function run() {
  await connectDB();
  await Food.deleteMany({});
  await Food.insertMany(seedData);
  console.log(`Seeded ${seedData.length} food items`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
