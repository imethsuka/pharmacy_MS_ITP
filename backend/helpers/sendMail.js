
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "sethsiripharmacypro@gmail.com",
    pass: "qxqhlxsysbeuiphf",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text,html) {
  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: ' sethsiripharmacypro@gmail.com', // sender address
    to, // list of receivers
    subject,
    text,
    html
  });
  }

  export default sendMail;