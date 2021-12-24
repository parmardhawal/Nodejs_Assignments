const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {MAX_AGE = 1000 * 60 *60 * 10} = process.env;
require("dotenv/config");


router.get("/",(req,res)=>{

    res.cookie("This is my cookie","Cookie bro",{httpOnly:true,secure:true,maxAge:1000*60*60*5});

    res.status(200).json({message:"Working well!!",status:true});
});

router.get("/user",(req,res)=>{

    try{
        const token = req.header("auth_token");

        console.log(`This is my token: ${token}`);
        
        const verified = jwt.verify(token,process.env.SECRET_KEY);

        if(!verified){
            res.status(200).json({message:"User is unauthorized",status:false});
        }

        req.user = verified;
        console.log(req.user);

        res.status(200).json({message:"Authorized",status:true,result:req.user});


    }catch(e){
        res.status(200).json({message:"Unathorized",status:false});
    }
    



});

router.get("/login/:email/:password",async (req,res)=>{
    const email = req.params.email;
    const plainTextPassword = req.params.password;

    const user = await User.findOne({email});
    if(!user) return res.status(200).json({message:"User is not found",status:false});

    const validatePassword = await bcrypt.compare(plainTextPassword,user.password);

    if(!validatePassword) return res.status(200).json({message:"Invalid password",status:false});

    const token = jwt.sign({_id:user._id,email:user.email},process.env.SECRET_KEY);
    

    res.cookie("jwt_token",token,{httpOnly:false,secure:false,sameSite:true,path:"/",maxAge:1000*60*60*5});

    res.send({message:"Success",token});


});

router.post("/login",async (req,res)=>{
    const {email,password:plainTextPassword} = req.body;
    
    const user = await User.findOne({email});
    if(!user) return res.status(200).json({message:"User is not found",status:false});

    const validatePassword = await bcrypt.compare(plainTextPassword,user.password);

    if(!validatePassword) return res.status(200).json({message:"Invalid password",status:false});

    const token = jwt.sign({_id:user._id,email:user.email},process.env.SECRET_KEY);
    

    res.cookie("jwt_token",token,{httpOnly:false,secure:false,sameSite:true,path:"/",maxAge:1000*60*60*5});

    res.send({message:"Success",token});

    // res.header("auth-token").send(token);
    // return res.status(200).json({message:"Logged In",status:true,token:token});
})

router.post("/register",async (req,res)=>{
    const {name,email,password:plainTextPassword} = req.body;
    const userExisted = await User.findOne({email});

    if(userExisted) return res.status(200).json({message:"Email is already registered",status:false});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword,salt);

    const user = new User({
        name,email,password:hashedPassword
    });

    await user.save().then((result)=>{
        console.log("User registered.....");
        res.status(200).json({message:"User has been registered",status:true,result});
    }).catch((err)=>{
        res.status(200).json({message:"Unable to register the user",status:false,err});

    })

});



module.exports = router;