const express = require("express");
const router = express.Router();
const path = require("path");
const verify = require("../Models/verifyToken");
const Student = require("../Models/students");


router.post("/",verify,async(req,res)=>{
    Student.find().then(result=>{
        if(result)
        {
            res.status(200).json({message:"Record found",data:result,status:true});
        }
        else
        {
            res.status(200).json({message:"No data found",status:false});
        }
    }).catch(err=>{
        res.status(400).json({message:"Unable retrive the data",status:false});
    });
});

router.delete("/:id",verify,async (req,res)=>{

    if(req.params.id!=undefined)
    {
        Student.deleteOne({_id:req.params.id}).then(result=>{
            console.log(result);
            if(result.deletedCount==1)
            {
                res.status(200).json({message:"Record has been deleted...",status:true});
            }
            else
            {
                res.status(200).json({message:"Can't delete the record...",status:false});
            }
            
        }).catch(err=>{
            res.status(400).json({message:"An unknow error is occured...",status:false});
        });
    }
    else
    {
        res.status(200).json({message:"Something went wrong",status:false});
    }

    // res.status(200).json({message:req.params.id,status:false});
});

router.patch("/:id",verify, async (req,res)=>{

    const {student_id,student_name,student_email,student_age,student_gender,student_phone} = req.body;

    await Student.updateOne(
        {_id:req.params.id},
        {
            $set:{
                student_name,
                student_email,
                student_age,
                student_gender,
                student_phone
            }
        }
    ).then(result=>{
        res.status(200).json({message:"Record has been updated...",status:true});
    }).catch(err=>{
        res.status(200).json({message:"An unknown error is occured...",status:false});
    });

});

router.get("/get/:id",verify,async(req,res)=>{
    await Student.findOne({_id:req.params.id}).then(result=>{
        data = '';
        data+=`<div class="modal fade" id="student_edit_modal" role="dialog">`;
        data+=`<div class="modal-dialog modal-lg modal-dialog-centered">`;
        data+=`<div class="modal-content">`;
        
        // Header Start
        data+=`<div class="modal-header">`;
        data+=`<h4 class="modal-title text-center">Edit student</h4>
        <button class="close" type="button" data-dismiss="modal">&times;</button>`;
        data+='</div>';
        // Header End

        // Body Start
        data+=`<div class="modal-body">`;
        
        data+=`<div class="form-group">`;
        data+=`<label for="student_name">Name</label>
        <input type="text" name="student_name" id="student_name" value="${result.student_name}" class="form-control">`;  
        data+='</div>';

        data+=`<div class="form-group">`;
        data+=`<label for="student_email">Email</label>
        <input type="email" name="student_email" id="student_email" value="${result.student_email}" class="form-control">`;  
        data+='</div>';

        data+=`<div class="form-group">`;
        data+=`<label for="student_age">Age</label>
        <input type="number" name="student_age" id="student_age" value="${result.student_age}" class="form-control">`;  
        data+='</div>';

        data+=`<div class="form-group">`;
        data+=`<label for="student_gender">Gender</label>`;
        
        if(result.student_gender=="Male")
        {
            data+=` <input type="radio" name="student_gender" id="student_gender" value="Male" checked>Male
            <input type="radio" name="student_gender" id="student_gender" value="Female">Female`;
        }
        else
        {
            data+=`<input type="radio" name="student_gender" id="student_gender" value="Male">Male
            <input type="radio" name="student_gender" id="student_gender" value="Female" checked>Female`;
        }
        
        data+='</div>';

        data+=`<div class="form-group">`;
        data+=`<label for="student_phone">Phone</label>
        <input type="text" name="student_phone" id="student_phone" value="${result.student_phone}" class="form-control">`;  
        data+='</div>';
        
        data+='</div>';
        // Body End

        // Footer start
        data+=`<div class="modal-footer justify-content-start">
        <button class="btn btn-primary" type="submit">Save Changes</button>
        <button class="btn btn-light cancel_button"  data-dismiss="modal" id="close_edit_form" type="button">Cancel</button>
        </div>`;
        // Footer end

        data+='</div>';
        data+='</div>';
        data+=`</div>`;
        res.status(200).json({message:"Record found...",data,status:true});
    }).catch(err=>{
        res.status(200).json({message:"Something went wrong...",status:false});
    });
});

router.get("/index",(req,res)=>{
    if(!req.cookies.jwt_token)
    {
       res.clearCookie("jwt_token");
       res.redirect("/api/user/login");
    }
    res.sendFile(path.join(__dirname,"../Views/Student/StudentList.html"));
});

router.post("/create", verify ,async(req,res)=>{

    // console.log(req.body);
    // res.status(200).json({message:"Under the development stage",status:false});

    const {student_name,student_email,student_age,student_gender,student_phone} = req.body;

    const existed = await Student.findOne({student_email:student_email});

    if(existed) 
    {
        return res.status(400).json({message:"Student's email is already existed...",status:false});
    }

    const student = new Student({
        student_name,
        student_email,
        student_gender,
        student_age,
        student_phone
    });

    await student.save().then(result=>{
        if(result)
        {
            return res.status(200).json({message:"Record has been inserted...",status:true});
        }
    }).catch(err=>{
        console.log(err);
        return res.status(200).json({message:"Unable to insert the record...",status:false});
    });
    
});

router.get("/logout",(req,res)=>{
    if(req.cookies.jwt_token)
    {
        res.clearCookie("jwt_token");
    }
    res.redirect("/api/user/login");
});

module.exports = router;