/****************************************
 * Module will be used for sending emails
 * **************************************/
const nodemailer = require("nodemailer");

async function notificationEmail(message) {
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
        html: `<!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Ethio-EU Portal Notification</title>
            <style>
            /* -------------------------------------
                INLINED WITH htmlemail.io/inline
            ------------------------------------- */
            /* -------------------------------------
                RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
            @media only screen and (max-width: 620px) {
              table[class=body] h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
              }
              table[class=body] p,
                    table[class=body] ul,
                    table[class=body] ol,
                    table[class=body] td,
                    table[class=body] span,
                    table[class=body] a {
                font-size: 16px !important;
              }
              table[class=body] .wrapper,
                    table[class=body] .article {
                padding: 10px !important;
              }
              table[class=body] .content {
                padding: 0 !important;
              }
              table[class=body] .container {
                padding: 0 !important;
                width: 100% !important;
              }
              table[class=body] .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }
              table[class=body] .btn table {
                width: 100% !important;
              }
              table[class=body] .btn a {
                width: 100% !important;
              }
              table[class=body] .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
              }
            }
        
            /* -------------------------------------
                PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
            @media all {
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                line-height: 100%;
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
              .btn-primary table td:hover {
                background-color: #34495e !important;
              }
              .btn-primary a:hover {
                background-color: #34495e !important;
                border-color: #34495e !important;
              }
            }
            </style>
          </head>
          <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
            <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
        
                    <!-- START CENTERED WHITE CONTAINER -->
                    <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">ET - EU Notification</span>
                    <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
        
                      <!-- START MAIN CONTENT AREA -->
                      <tr>
                        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                            <tr>
                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: bold; margin: 0; Margin-bottom: 15px; color: rgb(24, 143, 190); font-size: 18px;">ET - EU Notification</p>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${message.head}</p>
                                <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                  <tbody>
                                    <tr>
                                      <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                  
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <section style="font-family: sans-serif; font-size: 14sectionx; font-weight: normal; margin: 0; Margin-bottom: 15px;">${message.body}</section>
                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${message.footer}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    <!-- END MAIN CONTENT AREA -->
                    </table>
        
                    <!-- START FOOTER -->
                    <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                        <tr>
                          <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                            <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Ethio-EU Portal</span>
                            <br> Visit our <a href="https://hahucomputers.com/education" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">website</a>.
                            <br>  <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Phone: +251942323576</span>
                            <br>  <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Email: sales@hahucomputers.com</span>
                            <br>
                            <br> Developed by: <a href="https://hahucomputers.com/" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">hahu computer engineering</a>.
                          </td>
                        </tr>
         
                      </table>
                    </div>
                    <!-- END FOOTER -->
        
                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>
        `
    };


    await  smtpTransport.sendMail(mailOptions, function(err, msg) {

      //  console.log(msg, err);
        if (err) {
            return err
        }

       
        return msg;
    })



}

module.exports = notificationEmail;