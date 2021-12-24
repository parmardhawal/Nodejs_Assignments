const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const session = require("express-session");

const SESSION_HOUR = 1000 *60 *60 * 2;

const {
    PORT = 3000,
    SOME_SECRET="This is the secret of session",
    SESSION_NAME = "connect.sid",
    SESSION_LIFE = SESSION_HOUR,
    NODE_ENV = "development"
} = process.env;

const IN_PROD = NODE_ENV == "production";

const path = require("path");
const UserController = require("./Controllers/UsersController");
const StudentController = require("./Controllers/StudentController");

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Set static 
app.use(express.static(path.join(__dirname,"Public")));

//Session
app.use(session({
    secret:SOME_SECRET,
    name:SESSION_NAME,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:SESSION_LIFE,
        secure:IN_PROD,
        sameSite:true
    }
}));

//User Controller
app.use("/user",UserController);

//Student Controller
app.use("/student",StudentController);

mongoose.connect(process.env.db_url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening to PORT ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
    console.log(`Can't connect to database....`);
});