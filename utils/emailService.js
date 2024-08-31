const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
        
          const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: options.to,
            subject: options.subject,
            text: options.text,
          }; 
          await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
    }catch(error){
        console.log(error);
    }
};

module.exports = sendEmail;