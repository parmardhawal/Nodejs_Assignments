const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname:{
        type:String,
        required:[true,"First name is required"]
    },
    lastname:{
        type:String,
        require:[true,"Last name is required"]
    },
    email:{
        type:String,
        unique:true,
        require:[true,"Email is requied"]
    },
    password:{
        type:String,
        require:[true,"Password is required"]
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("users",UserSchema);