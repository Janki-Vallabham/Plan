const express = require('express')
var alert = require('alert')
var bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
const async = require('hbs/lib/async');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const db_name = 'form';
const app = express()
const port = 2001
console.log(__dirname)
const mailer=require('nodemailer')
//static path:the entire public directory is made static
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile('login.html'/*,host_path*/)
})

app.get('/',(req,res)=>{
    res.render('/'/*,host_path*/)
})

app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
// const Data=require("./register");

// create a new user in ourdatabase
// app.post("/register",async(req, res)=>{
//     try{
//         const registerEmployee = new Data({
//             My_name: req.body.My_name,
//             My_email: req.body.My_email,
//             Password: req.body.Password
//         })
//         const register= await registerEmployee.save();
//         res.status(201).render(index);

//     }catch (error) {
//         res.status(400).send(error);
//     }
//     // res.render("register");
// })

const db = client.db(db_name)
app.post('/insert', function (req, res) {
    var name = req.body.My_name
    var email = req.body.My_email
    var pass = req.body.Password
    var dt = {
        "name": name,
        "email": email,
        "password": pass
    }
    db.collection('data').insertOne(dt, function (err, collection) {
        if (err) console.log(err)
        else alert("Your information is recorded")
        let transporter = mailer.createTransport({
 
            // host: 'smtp.gmail.com',
            // port: 587,
            // secure: false, // true for 465, false for other ports
            // requireTLS:true,
            service: 'gmail',
            auth: {
              user: 'charushukla283@gmail.com', // generated ethereal user
              pass: 'dpsjybpczugpzdqk', // generated ethereal password
            },
          });
          let content={
            from: 'charushukla283@gmail.com', // sender address
            to: req.body.My_email, // list of receivers
            subject: "WELCOME TO PLAN IT!!", // Subject line
            html: "<p>Good to have you here!!!.<br><br><br>Thank you for signing up <br>Start your Planner</p> ", // plain text body
          }
        transporter.sendMail(content,(err)=>{
            if(err) console.log(err)
            else console.log('Success')
        })
        // exports.mail_mailer=mailer
        // exports.mail_conn=transporter
        // exports.mail_body=content
        res.redirect('login.html')
        // console.log("Record inserted")
    })

})

app.post("/",async function(req, res){
    try {
        const name=req.body.My_name;
        const email=req.body.My_email;
        const Password=req.body.Password;
        
        console.log(`${name} and password is ${Password}`);
        const username = await db.collection('data').findOne({name:name});
        const useremail = await db.collection('data').findOne({email:email});
        
        //res.send(username);
        console.log(username,Password);
        
        if(username,useremail.password===Password){
            //res.status(201).render("home")
            alert("Login Successful")
            res.redirect("home.html")
            
        }
        else{
            alert("Your information is not matched")
            //res.send("password are not matching")
        }
        

    } catch (error) {
        res.status(400).send("invalid username")
        
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
