const User = require('../models/User');
const { sendVerificationEmail, sendResetPasswordEmail } = require('../utils/mailer');

// Регистрация пользователя
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send('Пользователь с таким email уже существует.');

  const newUser = new User({ email, password });
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  newUser.verificationCode = verificationCode;

  await newUser.save();
  sendVerificationEmail(email, verificationCode);
  
  res.status(201).send('Пользователь зарегистрирован. Проверьте почту для подтверждения.');
};

// Подтверждение почты
exports.verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('Пользователь не найден.');
  if (user.verificationCode !== verificationCode) return res.status(400).send('Неверный код.');

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.send('Почта подтверждена!');
};

// Тапалка (монеты)
exports.tap = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('Пользователь не найден.');
  if (!user.isVerified) return res.status(400).send('Почта не подтверждена.');

  user.coins += 1;
  await user.save();

  res.send(`Вы заработали 1 монету. Всего монет: ${user.coins}`);
};

// Восстановление пароля
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('Пользователь не найден.');

  const resetPasswordCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordCode = resetPasswordCode;
  await user.save();

  sendResetPasswordEmail(email, resetPasswordCode);
  res.send('Письмо с кодом восстановления отправлено на вашу почту.');
};

// Сброс пароля
exports.resetPassword = async (req, res) => {
  const { email, resetPasswordCode, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Пользователь не найден.');
  if (user.resetPasswordCode !== resetPasswordCode) return res.status(400).send('Неверный код.');

  user.password = newPassword;
  user.resetPasswordCode = null;
  await user.save();

  res.send('Пароль успешно изменен.');
};
