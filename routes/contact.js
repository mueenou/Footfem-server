const nodemailer = require("nodemailer");

module.exports = {
  sendMessage: (req, res) => {

    console.log(req.body);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sender@gmail.com',
            pass: 'password'
        }
      });

  }
}
