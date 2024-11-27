const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB подключен: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Ошибка подключения к базе данных: ${error.message}`);
    process.exit(1); // Завершаем процесс, если не удается подключиться к базе
  }
};

module.exports = connectDB;
