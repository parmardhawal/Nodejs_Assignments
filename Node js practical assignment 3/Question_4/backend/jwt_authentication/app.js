const express = require("express");
const app = express();
const {PORT = 3000} = process.env;
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AUTH = require("./Controllers/AuthController");
const PRODUCT = require("./Controllers/ProductController");

app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200","http://localhost:4200/login","http://localhost:3000","http://localhost:8080"]
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/auth",AUTH);
app.use("/api/products",PRODUCT);

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening to PORT ${PORT}`);
    })
}).catch((err)=>{
    console.log(`${err}\n mongoose error`)
});

const db = mongoose.connection;
db.once("open",()=>console.log(`Connected to db!`));