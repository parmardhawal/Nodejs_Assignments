const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {PORT = 3000} = process.env;
const path = require("path");
const cors = require("cors");
require("dotenv/config");

const UserController = require("./Controllers/UserController");
const StudentController = require("./Controllers/StudentController");


const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.static(path.join(__dirname,"Public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Controller middleware
app.use(cors());
app.use("/api/user",UserController);
app.use("/api/student",StudentController);

mongoose.connect(process.env.db_url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening to PORT ${PORT}`);
    });
})
.catch((err)=>{
    console.log(`An unknown error is occured while connecting to database... ${err}`);
});

const db = mongoose.connection;
db.once("open",()=>console.log(`Connected to DB....`));

