const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        min:[3,"Minimum 3 character of name is required"]
    },
    email: {
        type:String,
        required: true,
        unique: true,
        min: 3
    },
    password:{
        type:String,
        required:true,
        min:[4,"Minimum 5 character is required"]        
    },
    created_at:{
        type:Date,
        required:false,
        default:Date.now
    }
},
    {
        versionKey: false,
        collection: "users"
    });

module.exports = mongoose.model("users", UserSchema);