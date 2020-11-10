const nodemailer = require('nodemailer');

const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: "jolie.klein17@ethereal.email",
    pass: "xuySgMquAdWkdkkYDx"
  }
};

module.exports = nodemailer.createTransport(mailConfig);
