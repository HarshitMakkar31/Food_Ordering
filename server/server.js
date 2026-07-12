require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Food = require('./models/Food');
const seedData = require('./seedData');

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : '*';

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5001;

async function start() {
  await connectDB();

  const count = await Food.countDocuments();
  if (count === 0) {
    await Food.insertMany(seedData);
    console.log(`Auto-seeded ${seedData.length} food items`);
  }

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start();
