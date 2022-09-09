const nodemailer = require("nodemailer");

async function sendMail(to, code) {
    if(!to.length) return
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "muxammadazizramziddinov@gmail.com",
            pass: "svsvkhbjkofrasmq",
        },
    });

    await transporter.sendMail({
        from: `Web chat <muxammadaziramziddion@gmail.com>`,
        to, 
        subject: `Enter the code to register`,
        html: `
            Code: ${code}
        `,
    });
}

module.exports = sendMail