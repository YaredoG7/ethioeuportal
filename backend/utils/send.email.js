/****************************************
 * Module will be used for sending emails
 * **************************************/
const nodemailer = require("nodemailer");


async function sendMail(message) {
    // the mail provoder details will be changed
    let smtpTransport = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: "automation.engineer@hahucomputers.com",
          pass: "HahuSales123#"
        } 
    });

    let mailOptions = {
        to: message.to,
        from: 'automation.engineer@hahucomputers.com',
        subject: message.subject,
        text: message.text,
        html: message.html
    };


    await  smtpTransport.sendMail(mailOptions, function(err, msg) {

        if (err) {
            return err
        }
        return msg;
    })



}

module.exports = sendMail;