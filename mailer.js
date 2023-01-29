const mailer=require('nodemailer')
//console.log(mailer)
let transporter = mailer.createTransport({
 
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS:true,
    auth: {
      user: 'charushukla283@gmail.com', // generated ethereal user
      pass: 'dpsjybpczugpzdqk', // generated ethereal password
    },
  });
  let content={
    from: 'charushukla283@gmail.com', // sender address
    to: "charushukla283@gmail.com", // list of receivers
     // list of receivers
    subject: "Confirmation mail", // Subject line
    html: "<p style='color:red'>How are you</p> ", // plain text body
  }
transporter.sendMail(content,(err)=>{
    if(err) console.log(err)
    else console.log('Success')
})
// exports.mail_mailer=mailer
// exports.mail_conn=transporter
// exports.mail_body=content