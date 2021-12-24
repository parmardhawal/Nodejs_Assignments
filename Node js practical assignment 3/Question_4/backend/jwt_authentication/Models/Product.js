const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    product_name:{
        required:true,
        type:String,
        min:[3,"Minimum 3 character is required"]

    },
    product_price:{
        required:true,
        type:Number
    },
    product_discount:{
        required:true,
        type:Number
    },
    category:{
        required:true,
        type:String,
        default:"none"
    },
    created_at:{
        type:Date,
        immutable:true,
    },
    updated_at:{
        type:Date,
        default:Date.now
    }

    

},{
    versionKey:false,
    collection:"products"
});

module.exports = mongoose.model("products",ProductSchema);