const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");

router.get("/",async(req,res)=>{
    await Product.find().exec().then((result)=>{
        res.status(200).json({message:"Ok",status:true,result});
    }).catch((err)=>{
        res.status(200).json({message:"Unable to fetch the record",status:false,err})
    });
});

router.post("/",async (req,res)=>{
    const {product_name,product_price,product_discount,category} = req.body;

    const product = new Product({
        product_name,product_price,product_discount,category
    });

    await product.save().then((result)=>{
        res.status(200).json({message:"Record has been saved",status:true,result});
    }).catch((err)=>{
        res.status(200).json({message:"Unable to fetch the record",status:false,err});
    })

});

router.get("/:id",async (req,res)=>{
    const _id = req.params.id;

    await Product.find({_id}).exec().then((result)=>{
        res.status(200).json({message:"Ok",status:true,result});
    }).catch((err)=>{
        res.status(200).json({message:"Unable to fetch the record",status:false,err})
    });

});

router.put("/:id",async (req,res)=>{
    const _id = req.params.id;

    const {product_name,product_price,product_discount,category} = req.body;

    await Product.findByIdAndUpdate(_id,{product_name,product_price,product_discount,category},{new:true}).exec().then((result)=>{
        res.status(200).json({message:"Ok",status:true,result});
    }).catch((err)=>{
        res.status(200).json({message:"Unable to update the record",status:false,err})
    });

});

router.delete("/:id",async (req,res)=>{
    const _id = req.params.id;
    await Product.findByIdAndRemove(_id).exec().then((result)=>{
        res.status(200).json({message:"Record has been deleted",status:true,result})
    }).catch((err)=>{
        res.status(200).json({message:"Unable to delete the record",status:false,err})
    });
})

module.exports = router;
