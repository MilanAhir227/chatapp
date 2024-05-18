const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "milan.cdmi@gmail.com",
    pass: "aawh dueu wbyo gmms",
  },
});

async function nodemailerOtp(to, otp) {
  const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Forget Password OTP</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  border-radius: 10px;
                  padding: 20px;
              }
              h1 {
                  text-align: center;
                  color: #333;
              }
              h2 {
                  text-align: center;
                  color: #333;
              }
              p {
                  color: #666;
                  font-size: 16px;
              }
              .otp {
                  background-color: #f0f0f0;
                  padding: 10px;
                  text-align: center;
                  font-size: 24px;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>SERENE</h1>
              <h2>Forget Password OTP</h2>
              <p>Your One Time Password (OTP) to reset your password is:</p>
              <div class="otp"><b>${otp}</b></div>
              <p>Please use this OTP to proceed with resetting your password.</p>
          </div>
      </body>
      </html>
    `;

  const info = await transporter.sendMail({
    from: '"Serene App"<milanahir227@gmail.com>', // sender address
    to: to, // list of receivers
    subject: "Serene Foreget Password OTP", // Subject line
    text: otp, // plain text body
    html: htmlContent, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = nodemailerOtp;