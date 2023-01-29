express= require("express");
mongoose = require("mongoose");
app = express();
const path = require('path');
const static_path = path.join(__dirname);

app.use(express.static (static_path));
mongoose.connect("mongodb://localhost:27017/form",function(){
    console.log("Database connected");
});

app.get('/',(req,res)=>{
    res.render('/'/*,host_path*/)
})

stdsSchema= mongoose.Schema({
    "name": {type:String},
    "email": {type:String},
    "password": {type:String}
});

stdsModel= mongoose.model("stds",stdsSchema);
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get("/",function(req,res){
    stdsModel.find(function(req,res){
        res.send(data);
        res.end();

    })
})

app.get("/insert",function(req,res){
    console.log(req.query.My_name);
    obj={ "name" :req.query.My_name,
     "email":req.query.My_email,
     "password":req.query.Password
    };

    data = new stdsModel(obj);
    data.save();
    res.send("Successsful");
});

// app.post("/",async function(req, res){
//     try {
//         const name=req.body.Myname;
//         const pass=req.body.Pass_word;
        
//         console.log(`${name} and password is ${pass}`)
//         const username = await Data.findOne({name:name});
//         res.send(username.pass);
//         console.log(username);
        

//     } catch (error) {
//         res.status(400).send("invalid username")
        
//     }
// })

app.post("/",async function(req, res){
    try {
        const name=req.body.My_name;
        const pass=req.body.Password;
        
        console.log(`${name} and password is ${pass}`);
        const username = await stds.findOne({name:name});
        res.send(username.pass);
        console.log(username);
        
        if(username.pass === pass){
            res.status(201).render("index.html")
        }else{
            res.send("password are not matching")
        }
        

    } catch (error) {
        res.status(400).send("invalid username")
        
    }
})

app.listen(2002);