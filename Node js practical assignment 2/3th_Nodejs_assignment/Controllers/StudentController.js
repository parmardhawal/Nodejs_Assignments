const express = require("express");
const router = express.Router();
const path = require("path");
const Student = require("../Models/Student");
const verify = require("../Models/Verify");

router.get("/",verify, async (req,res)=>{ 
    await Student.find().then(result=>{
        var data = {
            title:"Student List",
            username:req.session.username,
            result
        };

        res.render("../views/Students/index",{
            data
        });

    }).catch(err=>{
        console.log("Error while fetching the record..");
    });   
});

router.get("/edit/:student_id",verify,async (req,res)=>{

    const _id = req.params.student_id;
    
    var student;

    await Student.findOne({_id}).then((result)=>{
        student=result;
    }).catch((err)=>{
        return res.status(400).json({message:"Bad Request",status:false});
    });

    if(student==null)
    {
        res.redirect("/student");
    }
    else
    {
        var data = {
            title: `Edit ${student.student_name}`,
            student,
        }

        res.render("../Views/Students/update",{
            data
        });

    }
});

router.get("/remove/:student_id",verify,async (req,res)=>{
    const _id = req.params.student_id;
    await Student.deleteOne({_id}).then(result=>{
        res.redirect("/student");
    }).catch(err=>{
        res.status(400).json({message:"Something went wrong...",status:false});
    });
});

router.post("/insert",verify,async (req,res)=>{
    
    const {student_name,student_email,student_age,student_gender,student_phone} = req.body;

    const student = new Student({
        student_name,student_email,student_age,student_gender,student_phone
    });

    await student.save().then(result=>{
    }).catch(err=>{
        console.log(err);
    }); 

    return res.redirect("/student");

});

router.post("/save",verify,async (req,res)=>{

    const {_id,student_name,student_email,student_age,student_gender,student_phone} = req.body;

    Student.updateOne({_id},{$set:{
        student_name,student_email,student_age,student_gender,student_phone
    }}).then(result=>{
        console.log(result);
        return res.redirect("/student");
    }).catch(err=>{
        console.log(err);
        res.status(400).json({message:"Something went wrong",status:false});
    });
    
});

router.get("/logout",(req,res)=>{
    if(req.session.username!=="")
    {
        req.session.destroy(()=>{
            console.log(`Logged out...`);
        });
    }
    res.redirect("/user/login");
});

module.exports = router;