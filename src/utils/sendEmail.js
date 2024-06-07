const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendMail = async (to, subject, body) => {
    try {
        console.log("to::",to);
        const mail = {
            from: process.env.SMTP_FROM,
            to,
            subject: subject,
            html: body,
        };
        console.log("mail:::",mail);
        await transporter.sendMail(mail);
    } catch (error) {
        console.log("error?",error);
    }
};

module.exports = sendMail;