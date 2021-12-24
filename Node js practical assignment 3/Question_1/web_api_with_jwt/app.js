const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const {PORT = 3000} = process.env;
const User = require("./Controllers/UserController");
const Posts = require("./Controllers/PostController");

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening to PORT ${PORT}`);
    })
}).catch((err)=>{
    console.log(`${err}\n Something went wrong.....`);
});

const db = mongoose.connection;
db.once("open",()=>console.log("Connected to DB!"));

app.use(express.json());
app.use(express.urlencoded({extended:false})); 

app.use("/api/user",User);
app.use("/api/posts",Posts);