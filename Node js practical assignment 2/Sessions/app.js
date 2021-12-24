const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const path = require("path");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const FileStore = require("session-file-store")(session);

const SESSION_HOUR = 1000*2 * 60 * 60;

const {
    PORT = 3000,
    SOME_SECRET = "You know this is a secret",
    SESSION_NAME = "connect.sid",
    SESSION_LIFE = SESSION_HOUR,
    NODE_ENV = "development",
} = process.env;

const IN_PROD = NODE_ENV === "production";

// Middleware 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"assets")));
app.set("view engine","ejs");

// session setting 
app.use(session({
    store:new FileStore,
    secret:SOME_SECRET,
    name:SESSION_NAME,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: SESSION_LIFE,
        secure:IN_PROD,
        sameSite:true
    }
}));

app.get("/login",(req,res)=>{
    res.render("index",{
        title:"Login"
    });
})

app.post("/send",(req,res)=>{
    const username = "Dhawal@gmail.com";
    const password = "123456";

    if(username==req.body.email && password==req.body.password)
    {
        req.session.username = req.body.email;
        res.redirect("/home");
    }
    else
    {
        res.status(400).json({message:"Invalid username or password",status:false});
    }

});

app.get("/home",(req,res)=>{

    if(req.session.username)
    {
        req.session.reload((err)=>{
            res.render("home",{
                title:"Home",
                username:req.session.username
            });
        });
    }
    else
    {
        res.redirect("/login");
    }

    
});

app.get("/logout",(req,res)=>{
    if(req.session.username!="")
    {
        req.session.destroy(()=>{
            console.log(`Session destroyed...`);
        });
    }

    res.redirect("/login");
});

mongoose.connect(process.env.db_url,{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>{
    // Listening to server...
    app.listen(PORT,()=>{
        console.log(`Server is listening to PORT: ${PORT}`);
    });
}).catch(err=>{
    console.log(`Something went wrong while connecting to db...`);
})

const db = mongoose.connection;
db.once("open",()=>console.log("Connected to DB..."));