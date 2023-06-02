const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: message,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = sendEmail;
