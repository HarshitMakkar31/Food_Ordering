const mongoose = require('mongoose');

async function connectDB() {
  let uri = process.env.MONGO_URI;

  if (!uri) {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mem = await MongoMemoryServer.create();
    uri = mem.getUri();
    console.log('No MONGO_URI set — started in-memory MongoDB for this demo session.');
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
}

module.exports = connectDB;
