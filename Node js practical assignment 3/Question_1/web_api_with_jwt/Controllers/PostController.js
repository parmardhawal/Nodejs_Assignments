const express = require("express");
const VerifyToken = require("../Middlewares/VerifyToken");
const router = express.Router();

router.get("/testing_post",(req,res)=>{
    res.status(200).json({message:"Worked...."});
});

router.post("/",VerifyToken,(req,res)=>{
    res.status(200).json({message:"Now use can post the data",status:true,sendBy:req.user._id})    
});

module.exports = router;