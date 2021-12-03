const mailSender = async (email, password) => {
  console.log("email", email);
  console.log("password", password);
  const nodemailer = require("nodemailer");

  //   let mailTransporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "emailfortesting027@gmail.com",
  //       pass: "testing@123.",
  //     },
  //   });

  //   let mailDetails = {
  //     from: "alihamzaarana@gmail.com",
  //     to: email,
  //     subject: "Test mail",
  //     text: "Node.js testing mail for GeeksforGeeks",
  //   };

  //   mailTransporter.sendMail(mailDetails, function (err, data) {
  //     if (err) {
  //       console.log("Error Occurs", err);
  //     } else {
  //       console.log("Email sent successfully", data);
  //     }
  //   });

  //   const nodemailer = require("nodemailer");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      service: "gmail",
      port: 300,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "emailfortesting027@gmail.com", // generated ethereal user
        pass: "testing@123.", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"E-Commerce 👻" <alihamzaarana@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "You are invited to our app ✔", // Subject line
      text: "You are invited to our app", // plain text body
      html: `<b>Youre password is <h3>${password}</h3> </b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};

module.exports = { mailSender };
