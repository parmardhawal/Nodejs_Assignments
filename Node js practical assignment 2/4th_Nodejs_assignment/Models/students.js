const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    student_name:{
        type:String,
        required:[true,"Student name is required"],
    },
    student_email:{
        type:String,
        unique:[true,"Email should be unique"],
        required:[true,"Student Email is required"]
    },
    student_age:{
        type:Number,
        min:[17,"Age should be more than 17"],
        max:[24,"Age should not be more than 24"],
        required:[true,"Student AGE is required"]
    },
    student_gender:{
        type:String,
        enum:{
            values:["Male","Female"],
            message:'{VALUE} invalid Gender'
        },
        required:[true,"Student Gender is required"]
    },
    student_phone:{
        type:String,
        validate:{
            validator:function(value)
            {
                return /^\d{10}$/.test(value);
            },
            message:enterted=>`${entered.student_phone} is not valid Phone number`
        },
        required:[true,"Student Phone is required"]
    },

});

module.exports = mongoose.model("student",StudentSchema);