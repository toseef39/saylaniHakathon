// const nodemailer = require('nodemailer');
// require('dotenv').config();

// //nodemailer config

// const transporter = nodemailer.createTransport({
//     host: 'mail.alertysmart.com',
//     port: 587,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// module.exports = transporter;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    auth: {
        user: "ibtasamofficial@gmail.com",
        pass: "vcvk eepn jtsz rrsz",
    }
});

module.exports = transporter