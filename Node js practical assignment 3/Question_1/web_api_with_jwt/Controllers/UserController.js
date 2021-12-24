const express = require("express");
const router = express.Router();
const Users = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login",async (req,res)=>{
    const {email,password:plainTextPassword} = req.body;

    const user = await Users.findOne({email});

    if(!user)
    {
        return res.status(406).json({message:"Email is not registered",status:false});
    }

    if(plainTextPassword===undefined)
    {
        return res.status(406).json({message:"Password is required",status:false});
    }

    const validPassword = await bcrypt.compare(plainTextPassword,user.password);

    if(!validPassword) return res.status(406).json({message:"Password is not valid",status:false});

    const token = jwt.sign({_id:user._id,email:user.email},process.env.SECRET_TOKEN);

    res.header("auth-token",token).send(token);

});

router.get("/",async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456",salt);

    res.end(hashedPassword);
});

router.post("/register",async (req,res)=>{
    
    const {name,email,password:plainTextPassword} = req.body;

    const emailExisted = await Users.findOne({email});

    if(emailExisted)
    {
        return res.status(401).json({message:"Email is already existed",status:false});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword,salt);

    const user = new Users({
        name,email,password:hashedPassword
    });

    await user.save().then((result)=>{
        res.status(200).json({message:"User registered...",status:true,result});
    }).catch((err)=>{
        res.status(406).json({message:"Unable to register the user...",status:false,err});
    });

});

module.exports = router;