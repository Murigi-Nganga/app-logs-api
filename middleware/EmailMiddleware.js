const nodemailer = require('nodemailer')
const DevModel =  require('../models/DevModel')

async function sendEmail(fatalLog) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_APP_PASSWORD
    }
  });

  const devEmails = (await DevModel.find({}, { email: 1 }))
                    .map(emailDataObj => emailDataObj.email)

  // Define the email options
  let mailOptions = {
    from: `"App Logs Monitor" <${process.env.SENDER_EMAIL}>`, // sender address
    to: devEmails, // list of receivers
    subject: 'Fatal log',

    text: `Hello Dev,\n\nI hope you are having a good day.\n
    There\'s a fatal error (high risk) that has occured. This needs urgent attention \
    so that customers continue to enjoy services well. \
    \nHere are the details of the fatal error:\
    \nType of log: ${fatalLog.typeOfLog}\
    \nMicroservice: ${fatalLog.microservice}\
    \nMessage: ${fatalLog.message}\
    \nScreen: ${fatalLog.screen}\
    \nos: ${fatalLog.os}\
    \n\nBest regards,\nApp Logs Monitor`, // plain text body

    html: `<p>Hello Dev,</p>
        <p>I hope you are having a good day.</p>
        <p>There\'s a fatal error (high risk) that has occured. This needs urgent attention \
        so that customers continue to enjoy services well.</p> <br>
        Here are the details of the fatal error: <br>
        Type of log: ${fatalLog.typeOfLog}<br>
        Microservice: ${fatalLog.microservice}<br>
        Message: ${fatalLog.message}<br>
        Screen: ${fatalLog.screen}<br>
        OS: ${fatalLog.os}<br>
        <p>Best regards,
        <br>
        App Logs Monitor</p>` // html body
  };

  // Send the email
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
  
}

module.exports = {
    sendEmail: sendEmail
}
