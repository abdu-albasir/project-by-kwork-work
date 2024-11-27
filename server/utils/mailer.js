const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Функция отправки письма с кодом подтверждения
exports.sendVerificationEmail = (email, code) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Подтверждение почты',
    text: `Ваш код подтверждения: ${code}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log('Email sent: ' + info.response);
  });
};

// Функция отправки письма с кодом восстановления пароля
exports.sendResetPasswordEmail = (email, code) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Восстановление пароля',
    text: `Ваш код восстановления пароля: ${code}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log('Email sent: ' + info.response);
  });
};
