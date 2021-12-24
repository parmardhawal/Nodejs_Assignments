const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    student_name:{
        type:String,
        required:[true,"Name is required"]
    },
    student_email:{
        type:String,
        unique:true,
        required:[true,"Email is required"]
    },
    student_age:{
        type:Number,
        min:[17,"Age should be more than 17"],
        max:[24,"Age should not be more than 24"],
        required:[true,"Age is required"]
    },
    student_gender:{
        type:String,
        enum:{
            values:["Male","Female"],
            message:`{value} invalid gender`
        }
    },
    student_phone:{
        type:String,
        validate:{
            validator:function(value)
            {
                return /^\d{10}$/.test(value);
            },
            message:entered=>`${entered.student_phone} is not a valid phone number`
        },
        required:[true,"Phone is required"]
    }
});

module.exports = mongoose.model("student",StudentSchema);