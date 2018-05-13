require('dotenv').config();

const transporter = require("./transporterGmail");
const path = require("path");


const sendMail = (to, mensaje, from = "fiestit@gmail.com") => {

  return transporter
    .sendMail({
      from: `"Welcome" <${from}>`,
      to,
      subject: "🎉 Confirmar registro en Fiestit 🎉", // Asunto
      text: mensaje
    })
    .then(info => console.log(info));
};

module.exports = sendMail;