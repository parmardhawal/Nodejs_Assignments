const express = require("express");
const app = express();
const path = require("path");
const {PORT = 3000} = process.env;
const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,path.join(__dirname,"uploads"))
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
});

const maxFileSize = 10 * 1024 * 1024;

const upload = multer({
    storage:storage,
    fileFilter:(req,file,callback)=>{
        if(file.mimetype=="image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png")
        {
            callback(null,true);
        }
        else
        {
            callback(null,false);
            return callback(new Error("Only .png,.jpeg,.jpg images are allowed.."));
        }
    },
    limits:maxFileSize

}).array("images",12);

const single = multer({
    storage:storage,
    fileFilter:(req,file,callback)=>{
        if(file.mimetype=="image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png")
        {
            callback(null,true);
        }
        else
        {
            callback(null,false);
            return callback(new Error("Only .png,.jpeg,.jpg images are allowed.."));
        }
    },
    limits:maxFileSize

}).single("images");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"assets")));

app.use(express.urlencoded({extended:false}));

app.get("/application",(req,res)=>{
    res.render("index",{
        title:"Multiple File Upload"
    });
});

app.post("/sendFile",upload,(req,res)=>{

    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError)
        {
            // Error i.e. occured while uploading(Multer error);
            res.status(400).json({err,message:"File upload failed....",status:false});
        }
        else if(err)
        {
           //Incase error come...
           res.status(400).json({message:"Sorry bro, an unknow error is ocurred..",status:false});
        }
        res.status(200).json({message:"Files have been uploaded successfully",status:true});
    });
});

app.get("/single",(req,res)=>{
    res.render("single",{
        title:"File Upload App"
    });
});

app.post("/sendSingleFile",single,(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError)
        {
            // Error i.e. occured while uploading(Multer error);
            res.status(400).json({err,message:"File upload failed....",status:false});
        }
        else if(err)
        {
            console.log(err);
            //Incase error come...
            res.status(400).json({message:"Sorry bro, an unknow error is ocurred..",status:false});
        }
        res.status(200).json({message:"File has been uploaded...",status:true});
    });
});

app.listen(PORT,()=>{
   console.log(`Server is listening to PORT: ${PORT}`); 
});