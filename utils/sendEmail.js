const nodemailer = require('nodemailer')

const sendEmail = async () =>{

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 5000,
        auth: {
            user: 'hilario46@ethereal.email',
            pass: 'xSMDm95uQZk9utRh6U'
        }
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
}

module.exports = sendEmail;