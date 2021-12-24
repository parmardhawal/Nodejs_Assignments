const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/Users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.get("/create",(req,res)=>{
    res.render("../Views/Users/Create",{
        title:"Create"
    });
});

router.get("/login",(req,res)=>{
    res.render("../Views/Users/Login",{
        title:"Login"
    });
});

router.post("/login",async (req,res)=>{
    const {email,password:plainTextPassword} = req.body;
    
    const user = await User.findOne({email});

    // Check user is existed or not
    if(!user)
    {
        return res.status(200).json({message:"Invalid Username/Password",status:false});
    }

    // Compare plainTextPassword with hash...
    if(!await bcrypt.compare(plainTextPassword,user.password))
    {
        return res.status(200).json({message:"Invalid password",status:false});
    }

    const token = jwt.sign({
        id:user.id,
        email:user.email
    },process.env.JWT_SECRET);

    req.session.username = user.email;
    req.session.token = token;

    res.status(200).json({message:"Got the token",status:true});

});

router.post("/create",async (req,res)=>{
    const {firstname,lastname,email,password:plainTextPassword} = req.body;
    
    //Check email is existed or not
    const existed = await User.findOne({email});

    if(existed)
    {
        return res.status(200).json({message:"Email is already existed...",status:false})
    }
   
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(plainTextPassword,salt);

    console.log(hashPassword);

    const user = new User({
        firstname,
        lastname,
        email,
        password:hashPassword
    });

    await user.save().then((result)=>{
        if(result)
        {
            res.status(200).json({message:"Account has been created...",status:true});
        }
    }).catch(err=>{
        res.status(400).json({message:"Bad Request",status:false});
    })
    
    // res.status(200).json({message:"Under the development stage...",status:false});

});

module.exports = router;