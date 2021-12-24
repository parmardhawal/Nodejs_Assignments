const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const User = require("../Models/users");
const verifyToken = require("../Models/verifyToken");

// One hour
const {MAX_AGE = 1000 * 60 * 60 * 1} = process.env;

router.post("/login",async (req,res)=>{

    const {email,password:plainTextPassword} = req.body;

    // Verify whether user is existed or not...
    const user = await User.findOne({email:email});
    console.log(user);

    if(!user)
    {
        return res.status(400).json({message:"Invalid username/Password",status:false});
    }

    // Compare plainTextPassword with hash...
    if(!(await bcrypt.compare(plainTextPassword,user.password)))
    {
        return res.status(400).json({message:"Invalid password",status:false});
    }

    const token = jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET);

    res.cookie("jwt_token",token,{httpOnly:true,secure:true,maxAge:MAX_AGE});

    return res.status(200).json({message:"Got the token",data:token,status:true});
});

router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../Views/Users/index.html"));
});

router.get("/create",(req,res)=>{
    res.sendFile(path.join(__dirname,"../Views/Users/create.html"));
});

router.post("/create",async (req,res)=>{
    const existed = await User.findOne({email:req.body.email});

    if(existed)
    {
       return res.status(400).json({message:"Email is already existed",status:false});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    var user = new User({
        firstname :req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:hashPassword
    });

    await user.save().then(result=>{
        console.log(result);
        return res.status(200).json({message:"Account has been created...",status:true});
    }).catch(err=>{
        return res.status(400).json({message:"Unable to create an account...",status:false});
    });

    // return res.status(200).json({message:"Account has been created...",status:true});

    /* res.status(200).json({message:"Okay",status:true});*/
});

router.get("/test",(req,res)=>{

    if(!req.cookies.jwt_token)
    {
        res.clearCookie("jwt_token");
        return res.redirect("login");
    }
    res.sendFile(path.join(__dirname,"../Views/Users/test.html"));
});


router.post("/action",verifyToken,(req,res)=>{
    res.status(200).json({message:"Success",status:true});
});

module.exports = router;