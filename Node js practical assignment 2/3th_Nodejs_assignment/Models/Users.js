const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstname:{
        type:String,
        required:[true,"First name is required"]
    },
    lastname:{
        type:String,
        required:[true,"Last name is required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    created_at:{
        type:Date,
        default:Date.now    
    }
});

module.exports = mongoose.model("users",UserSchema);