const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        min:[2,"Minimum two length is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        min:[3,"Minimum 3 character of email address is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        min:[3,"Minimum 3 characher of password is required"]
    },
    created_at:{
        type:Date,
        immutable:true,
        default:Date.now
    }
},{
    versionKey:false,
    collection:"users"
});

module.exports = mongoose.model("users",UserSchema);