import nodemailer from "nodemailer";
import { socketIo } from "../../index.mjs";

export async function sendEmail(req,res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'expresslesson1@gmail.com',
            pass: 'viewbcwaezilqwkc'
        }
    });

    var mailOptions = {
        from: 'expresslesson1@gmail.com',
        to: 'sh.alyyew2019@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    socketIo.emit('onMail',mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send(info.response);
        }
    });


}