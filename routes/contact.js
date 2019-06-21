let config = require('../utils/config');

const nodemailer = require("nodemailer");

module.exports = {
  
  sendMessage: async (req, res) => {

    console.log(JSON.stringify(req.body));
    /*let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let message = req.body.message;*/

    // create reusable transporter object using the default SMTP transport
    

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        ...config
      }
    });

    // setup email data with unicode symbols
    /*let mailOptions = {
      from: email,
      to: "support@footfem.fr",
      subject: "New message from FootFem Website !",
      text: message,
      html: '<b>' + message + '</b>',
    }*/

    // send mail with defined transport object
    try {
      const { firstName, lastName, email, message } = req.body
      const messageContent = {
        from: `${firstName} ${lastName} <${email}>`,
        text: message
      } 
      await sendMessage(messageContent)
  
      console.log('done');
    } catch (error) {
      console.log('error', error);
    }
  }
}
