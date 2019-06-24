let config = require('../utils/config');
let nodemailer = require('nodemailer');
let authMailer = require('./creds');
let template = require('../templateEmail/template');

console.log(__dirname);

module.exports = {
  sendMessage: async (req, res, express) => {

  //  console.log(JSON.stringify(req.body));

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let message = req.body.message;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: authMailer.user,
        pass: authMailer.pass
      }
    });

    var mailOptions = {
      from: email,
      to: 'footfem.app@gmail.com',
      subject: 'New message from FootFem web app !',
      text: message,
      html: template.mailFormat(firstName, lastName, email, message),
      attachments:[
        {
          filename: 'logo-FootFem.gif',
          path: '../Footfem-server/templateEmail/logo-FootFem.gif',
          cid:'logo-FootFem'
        }
      ]
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }
}
