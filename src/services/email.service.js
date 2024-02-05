const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token, host) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `${host}/newpassword?token=${token}`;

  const text = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title> Air Hotel </title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="" />
  <meta name="keywords" content="" />
  <meta name="author" content="" />
  <link rel="stylesheet" type="text/css" href="">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

    *,body{
      font-family: 'Poppins', sans-serif;
    }
    table tr td,
    table tr td p{
      vertical-align: top;
    }
    button:focus{
      outline: none;
    }

</style>
</head>
<body class="" style="background:#fff;">
    <table width="600" style="background: #F8F8F8;font-family: 'Poppins';margin:0 auto;padding:0px 0px;" cellspacing="0">
      <tr>
        <td style="width:100%;position: relative;clear: both;text-align: center;padding: 40px 20px 20px 20px;background:#FF179C;">
          <img src="https://www.godsend.com/img/logo-icon.f83f6185.svg" alt="" style="width:130px;height: 130px;margin-bottom:-85px;position: relative;background-color: #ffffff;border-radius: 50%;object-fit: scale-down;">
        </td>
      </tr>
      <tr>
        <td style="padding:60px 40px 100px 40px;text-align: left;">
          <h6 style="color: #1E1142;font-weight: 500;font-size: 20px;margin:0px 0px 16px 0px;">Hello!</h6>
          <p style="color: #717972;font-size: 16px;font-weight: 400;margin-bottom: 35px;margin-top:0rem;line-height: 28px;">
          Hello! We
          received information that you
          forgot your password. No
          worries, you can reset your
          Air Hotel password by
          clicking the link below. Your
          email is: ${to}
          (This link is valid for 24 hours).
          If you didn't request a
          password reset, feel free to
          ignore this email and we wish
          you a good day! All the best,
          GOD SEND Team
          </p>
          <a href=${resetPasswordUrl} type="button" style="font-weight: 500;text-transform: uppercase;border-radius: 4px;background: #FF179C;color:white;padding: 10px;cursor: pointer;outline: none;border: none;">reset Password</a>
        </td>
      </tr>
      <tr>
        <td style="padding:0px 40px 0px 40px;text-align: center;background-color: #F8F8F8;">
            <table style="width: 100%;border-top: 1px solid #EEEEEE;padding: 10px 0px;">
              <tr>
                <td style="text-align: left;">
                  <h6 style="font-size:14px;font-weight: 700;color: #1E1142;margin: 0px;">The Air Hotel Team</h6>
                  <a href="JavaScript:Void(0);" style="color: #717972;font-size: 10px;font-weight: 400;text-decoration: none;">info@Air Hotel.com</a>
                </td>
              </tr>
            </table>
        </td>
      </tr>
    </table>
</body>
</html>
`;

  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token, host) => {
  const subject = 'Email Verification';

  const verificationEmailUrl = `${host}/verifyemail?token=${token}`;
  const text = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title> Air Hotel </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <link rel="stylesheet" type="text/css" href="">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">
  
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">  
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
  
      *,body{
        font-family: 'Poppins', sans-serif;
      }
      table tr td,
      table tr td p{
        vertical-align: top;
      }
      button:focus{
        outline: none;
      }
  
  </style>
  </head>
  <body class="" style="background:#fff;">
      <table width="600" style="background: #F8F8F8;font-family: 'Poppins';margin:0 auto;padding:0px 0px;" cellspacing="0">
        <tr>
          <td style="width:100%;position: relative;clear: both;text-align: center;padding: 40px 20px 20px 20px;background:#FF179C;">
            <img src="https://www.godsend.com/img/logo-icon.f83f6185.svg" alt="" style="width:130px;height: 130px;margin-bottom:-85px;position: relative;background-color: #ffffff;border-radius: 50%;object-fit: scale-down;">
          </td>
        </tr>
        <tr>
          <td style="padding:60px 40px 100px 40px;text-align: left;">
            <h6 style="color: #1E1142;font-weight: 500;font-size: 20px;margin:0px 0px 16px 0px;">Hello!</h6>
            <p style="color: #717972;font-size: 16px;font-weight: 400;margin-bottom: 35px;margin-top:0rem;line-height: 28px;">
           
            Welcome to GOD SEND! To 
ensure a safe and secure 
experience in GOD SEND, 
kindly verify your email by 
clicking the link below. 
 You didn’t request for 
email verification? No 
problem! Feel free to ignore 
this email and we wish you a 
good day! Regards, GOD SEND 
Team
            </p>
            <a href=${verificationEmailUrl} type="button" style="font-weight: 500;text-transform: uppercase;border-radius: 4px;background: #FF179C;color:white;padding: 10px;cursor: pointer;outline: none;border: none;">Verify Email</a>
          </td>
        </tr>
        <tr>
          <td style="padding:0px 40px 0px 40px;text-align: center;background-color: #F8F8F8;">
              <table style="width: 100%;border-top: 1px solid #EEEEEE;padding: 10px 0px;">
                <tr>
                  <td style="text-align: left;">
                    <h6 style="font-size:14px;font-weight: 700;color: #1E1142;margin: 0px;">The Air Hotel Team</h6>
                    <a href="JavaScript:Void(0);" style="color: #717972;font-size: 10px;font-weight: 400;text-decoration: none;">info@Air.com</a>
                  </td>
                </tr>
              </table>
          </td>
        </tr>
      </table>
  </body>
  </html>
  `;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail
};
