const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Убедитесь, что название правильно
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const cors = require('cors');
app.use(cors());

// Подключение к базе данных
connectDB();

// Настройка middleware
app.use(express.json());

// Маршруты
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
